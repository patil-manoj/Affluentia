import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Contact from '../models/Contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads with disk storage
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const originalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
      cb(null, uniqueSuffix + '-' + originalName);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Maximum 10 files
  },fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 
      'image/png', 
      'image/gif', 
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    // Allow files with extensions even if MIME type is unknown
    const allowedExtensions = ['.dwg', '.skp', '.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    const isAllowed = allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension);
    
    if (!isAllowed) {
      console.log(`❌ File rejected: ${file.originalname} (${file.mimetype})`);
    }
    
    cb(null, isAllowed);
  }
});

// Simple validation middleware
const validateContact = (req, res, next) => {
  const { name, email, phone, projectType, message } = req.body;
  
  // Debug logging
  console.log('📝 Validating contact form data:', {
    name: name ? `"${name}" (${name.trim().length} chars)` : 'missing',
    email: email ? `"${email}"` : 'missing',
    phone: phone ? `"${phone}" (${phone.trim().length} chars)` : 'missing',
    projectType: projectType ? `"${projectType}"` : 'missing',
    message: message ? `message (${message.trim().length} chars)` : 'missing',
    files: req.files ? `${req.files.length} files` : 'no files'
  });
  
  const errors = [];
  
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!phone || typeof phone !== 'string' || phone.trim().length < 10) {
    errors.push('Please enter a valid phone number (at least 10 digits)');
  }
  
  if (!projectType || typeof projectType !== 'string') {
    errors.push('Project type is required');
  } else {
    const validProjectTypes = ['residential', 'commercial', 'interior', 'renovation', 'consultation', 'landscaping', 'other'];
    if (!validProjectTypes.includes(projectType)) {
      errors.push(`Invalid project type. Must be one of: ${validProjectTypes.join(', ')}`);
    }
  }
  
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  if (errors.length > 0) {
    console.log('❌ Validation failed:', errors);
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors
    });
  }
  
  console.log('✅ Validation passed');
  next();
};

// @route   POST /api/contact
// @desc    Submit contact form (simplified version)
// @access  Public
router.post('/', (req, res, next) => {
  upload.array('files', 10)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log('❌ Multer error:', err.message);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum file size is 5MB.',
          errors: ['File size exceeds 5MB limit']
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Maximum 10 files allowed.',
          errors: ['Maximum 10 files allowed']
        });
      }
      return res.status(400).json({
        success: false,
        message: 'File upload error: ' + err.message,
        errors: [err.message]
      });
    } else if (err) {
      console.log('❌ Upload error:', err);
      return res.status(400).json({
        success: false,
        message: 'File upload failed',
        errors: [err.message || 'Unknown file upload error']
      });
    }
    next();
  });
}, validateContact, async (req, res) => {
  try {
    const { name, email, phone, projectType, budget, message } = req.body;
    const files = req.files || [];

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('📝 Database not connected - contact form data:');
      console.log({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        projectType,
        budget: budget || '',
        message: message.trim(),
        filesCount: files.length,
        timestamp: new Date().toISOString()
      });

      return res.status(201).json({
        success: true,
        message: 'Contact form received! We will get back to you within 24 hours.',
        note: 'Running in development mode',
        data: {
          name: name.trim(),
          email: email.trim(),
          projectType,
          timestamp: new Date().toISOString(),
          filesUploaded: files.length
        }
      });
    }    // Create contact entry in MongoDB
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      projectType,
      budget: budget || '',
      message: message.trim(),
      files: files.map(file => ({
        originalName: file.originalname,
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype,
        path: file.path
      })),
      status: 'new',
      ipAddress: req.ip || req.connection.remoteAddress
    });

    // Save to database
    const savedContact = await contact.save();

    console.log('📧 New contact:', {
      id: savedContact._id,
      name: savedContact.name,
      email: savedContact.email,
      projectType: savedContact.projectType
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully! We will get back to you within 24 hours.',
      data: {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        projectType: savedContact.projectType,
        status: savedContact.status,
        createdAt: savedContact.createdAt,
        filesUploaded: files.length
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contacts (for testing)
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        message: 'Database not connected - running in development mode',
        data: []
      });
    }

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('name email phone projectType status createdAt files')
      .limit(50);

    res.json({
      success: true,
      count: contacts.length,
      data: contacts.map(contact => ({
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        projectType: contact.projectType,
        status: contact.status,
        createdAt: contact.createdAt,
        filesCount: contact.files.length
      }))
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get contact by ID
// @access  Public
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
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        projectType: contact.projectType,        budget: contact.budget,
        message: contact.message,
        status: contact.status,
        files: contact.files,
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact details'
    });
  }
});

export default router;
