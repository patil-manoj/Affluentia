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
    .min(10)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.min': 'Please enter a valid phone number',
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
    .optional()
    .allow(''),
  
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

// Validation middleware for contact form
export const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors
    });
  }

  next();
};
