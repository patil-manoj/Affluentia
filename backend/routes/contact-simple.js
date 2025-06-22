import express from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Configure multer for file uploads (in-memory storage)
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
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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
  max: 10, // Increased limit for demo
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// In-memory storage for demo (replace with database in production)
const contacts = [];

// Simple validation middleware
const validateContact = (req, res, next) => {
  const { name, email, phone, projectType, message } = req.body;
  
  const errors = [];
  
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!phone || phone.trim().length < 10) {
    errors.push('Please enter a valid phone number');
  }
  
  if (!projectType) {
    errors.push('Project type is required');
  }
  
  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors
    });
  }
  
  next();
};

// @route   POST /api/contact
// @desc    Submit contact form (simplified version)
// @access  Public
router.post('/', contactLimiter, upload.array('files', 10), validateContact, async (req, res) => {
  try {
    const { name, email, phone, projectType, budget, message } = req.body;
    const files = req.files || [];

    // Create contact entry (in-memory for demo)
    const contact = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      projectType,
      budget: budget || '',
      message: message.trim(),
      files: files.map(file => ({
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      })),
      status: 'new',
      createdAt: new Date(),
      ipAddress: req.ip || req.connection.remoteAddress
    };

    // Store in memory
    contacts.push(contact);

    console.log('📧 New contact form submission:', {
      name: contact.name,
      email: contact.email,
      projectType: contact.projectType,
      filesCount: files.length
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully! We will get back to you within 24 hours.',
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        projectType: contact.projectType,
        status: contact.status,
        createdAt: contact.createdAt,
        filesUploaded: files.length
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contacts (for testing)
// @access  Public
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: contacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      projectType: contact.projectType,
      status: contact.status,
      createdAt: contact.createdAt,
      filesCount: contact.files.length
    }))
  });
});

export default router;
