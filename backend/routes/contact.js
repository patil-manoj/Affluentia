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
      'application/pdf'
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
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-__v -ipAddress -userAgent');

    res.json({
      success: true,
      data: contacts
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

export default router;
