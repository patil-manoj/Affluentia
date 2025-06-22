import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Contact from '../models/Contact.js';
import { validateContact } from '../middleware/validation.js';
import { sendContactEmail, sendAutoReply } from '../services/emailService.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Maximum 10 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/dwg',
      'application/x-dwg',
      'model/vnd.sketchup.skp'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not allowed`), false);
    }
  }
});

// Rate limiting for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 contact form submissions per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper function to upload file to Cloudinary
const uploadToCloudinary = (buffer, originalName, mimetype) => {
  return new Promise((resolve, reject) => {
    const resourceType = mimetype.startsWith('image/') ? 'image' : 'raw';
    
    cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: 'affluentia-contacts',
        public_id: `${Date.now()}-${originalName.split('.')[0]}`,
        use_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer);
  });
};

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', contactLimiter, upload.array('files', 10), validateContact, async (req, res) => {
  try {
    const { name, email, phone, projectType, budget, message } = req.body;
    const files = req.files || [];

    // Process file uploads
    const uploadedFiles = [];
    
    if (files.length > 0) {
      for (const file of files) {
        try {
          const result = await uploadToCloudinary(file.buffer, file.originalname, file.mimetype);
          uploadedFiles.push({
            originalName: file.originalname,
            filename: result.public_id,
            url: result.secure_url,
            size: file.size,
            mimetype: file.mimetype,
            uploadedAt: new Date()
          });
        } catch (uploadError) {
          console.error('File upload error:', uploadError);
          // Continue with other files if one fails
        }
      }
    }

    // Create contact entry
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      projectType,
      budget: budget || '',
      message: message.trim(),
      files: uploadedFiles,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || '',
    };

    const contact = new Contact(contactData);
    await contact.save();

    // Send notification email to company
    try {
      await sendContactEmail(contact);
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if email fails
    }

    // Send auto-reply to user
    try {
      await sendAutoReply(contact);
    } catch (emailError) {
      console.error('Failed to send auto-reply email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        projectType: contact.projectType,
        status: contact.status,
        createdAt: contact.createdAt,
        filesUploaded: uploadedFiles.length
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contacts (for admin dashboard)
// @access  Private (would need authentication middleware)
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      projectType, 
      priority,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    
    if (status) query.status = status;
    if (projectType) query.projectType = projectType;
    if (priority) query.priority = priority;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 },
      select: '-__v'
    };

    const contacts = await Contact.find(query)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .lean();

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page: options.page,
          pages: Math.ceil(total / options.limit),
          limit: options.limit,
          total
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact status
// @access  Private
router.put('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    contact.status = status;
    
    if (notes) {
      contact.notes.push({
        content: notes,
        addedBy: 'Admin', // Would use actual user info with auth
        addedAt: new Date()
      });
    }

    await contact.save();

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

// @route   GET /api/contact/stats/dashboard
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats/dashboard', async (req, res) => {
  try {
    const [
      totalContacts,
      newContacts,
      inProgressContacts,
      completedContacts,
      recentContacts,
      projectTypeStats,
      monthlyStats
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Contact.countDocuments({ status: 'in-progress' }),
      Contact.countDocuments({ status: 'completed' }),
      Contact.find().sort({ createdAt: -1 }).limit(5).select('name email projectType createdAt status'),
      Contact.aggregate([
        { $group: { _id: '$projectType', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Contact.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 12 }
      ])
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          total: totalContacts,
          new: newContacts,
          inProgress: inProgressContacts,
          completed: completedContacts
        },
        recentContacts,
        projectTypeStats,
        monthlyStats
      }
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

export default router;
