import Joi from 'joi';

// Validation schema for contact form
const contactSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required'
    }),
  
  email: Joi.string()
    .trim()
    .email()
    .lowercase()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),
  
  phone: Joi.string()
    .trim()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Please enter a valid phone number',
      'any.required': 'Phone number is required'
    }),
  
  projectType: Joi.string()
    .valid('residential', 'commercial', 'interior', 'renovation', 'consultation', 'landscaping', 'other')
    .required()
    .messages({
      'string.empty': 'Project type is required',
      'any.only': 'Please select a valid project type',
      'any.required': 'Project type is required'
    }),
  
  budget: Joi.string()
    .valid('under-50k', '50k-100k', '100k-250k', '250k-500k', '500k-1m', 'over-1m', '')
    .optional(),
  
  message: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.empty': 'Message is required',
      'string.min': 'Message must be at least 10 characters long',
      'string.max': 'Message cannot exceed 2000 characters',
      'any.required': 'Message is required'
    })
});

// Middleware to validate contact form data
export const validateContact = (req, res, next) => {
  const { error, value } = contactSchema.validate(req.body, {
    abortEarly: false, // Collect all validation errors
    stripUnknown: true // Remove unknown fields
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // Replace request body with validated and sanitized data
  req.body = value;
  next();
};

// Validation schema for updating contact status
const statusUpdateSchema = Joi.object({
  status: Joi.string()
    .valid('new', 'contacted', 'in-progress', 'completed', 'cancelled')
    .required()
    .messages({
      'string.empty': 'Status is required',
      'any.only': 'Please select a valid status',
      'any.required': 'Status is required'
    }),
  
  notes: Joi.string()
    .trim()
    .max(1000)
    .optional()
    .messages({
      'string.max': 'Notes cannot exceed 1000 characters'
    })
});

// Middleware to validate status update
export const validateStatusUpdate = (req, res, next) => {
  const { error, value } = statusUpdateSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  req.body = value;
  next();
};

// Validation for query parameters
const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  status: Joi.string().valid('new', 'contacted', 'in-progress', 'completed', 'cancelled').optional(),
  projectType: Joi.string().valid('residential', 'commercial', 'interior', 'renovation', 'consultation', 'landscaping', 'other').optional(),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').optional(),
  sortBy: Joi.string().valid('createdAt', 'name', 'email', 'status', 'priority').default('createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

// Middleware to validate query parameters
export const validateQuery = (req, res, next) => {
  const { error, value } = querySchema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));

    return res.status(400).json({
      success: false,
      message: 'Invalid query parameters',
      errors
    });
  }

  req.query = value;
  next();
};

export default {
  validateContact,
  validateStatusUpdate,
  validateQuery
};
