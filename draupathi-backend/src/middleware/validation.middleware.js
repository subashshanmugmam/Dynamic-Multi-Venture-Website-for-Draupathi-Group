const { validationResult } = require('express-validator');
const { ValidationError } = require('./error.middleware');

// Middleware to handle validation errors
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.param,
      message: error.msg,
      value: error.value
    }));

    const message = errorMessages.map(err => `${err.field}: ${err.message}`).join(', ');
    
    const error = new ValidationError(message);
    error.details = errorMessages;
    
    return next(error);
  }
  
  next();
};

// Custom validation functions

// Validate ObjectId
const validateObjectId = (value, { req }) => {
  const mongoose = require('mongoose');
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error('Invalid ID format');
  }
  return true;
};

// Validate image file
const validateImageFile = (value, { req }) => {
  if (!req.file && !req.files) {
    return true; // Optional file
  }

  const file = req.file || (req.files && req.files[0]);
  if (!file) {
    return true;
  }

  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error('Only JPEG, PNG, and WebP images are allowed');
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB');
  }

  return true;
};

// Validate array of strings
const validateStringArray = (value) => {
  if (!Array.isArray(value)) {
    throw new Error('Must be an array');
  }

  for (const item of value) {
    if (typeof item !== 'string' || item.trim().length === 0) {
      throw new Error('All items must be non-empty strings');
    }
  }

  return true;
};

// Validate URL
const validateUrl = (value) => {
  if (!value) return true; // Optional URL

  try {
    new URL(value);
    return true;
  } catch (error) {
    throw new Error('Invalid URL format');
  }
};

// Validate phone number
const validatePhone = (value) => {
  if (!value) return true; // Optional phone

  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
  if (!phoneRegex.test(value)) {
    throw new Error('Invalid phone number format');
  }

  return true;
};

// Validate slug
const validateSlug = (value) => {
  if (!value) return true; // Slug might be auto-generated

  const slugRegex = /^[a-z0-9-]+$/;
  if (!slugRegex.test(value)) {
    throw new Error('Slug can only contain lowercase letters, numbers, and hyphens');
  }

  return true;
};

// Validate color hex code
const validateHexColor = (value) => {
  if (!value) return true; // Optional color

  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexRegex.test(value)) {
    throw new Error('Invalid hex color format');
  }

  return true;
};

// Validate date range
const validateDateRange = (endDate, { req }) => {
  if (!endDate || !req.body.startDate) {
    return true; // Optional dates
  }

  const start = new Date(req.body.startDate);
  const end = new Date(endDate);

  if (end <= start) {
    throw new Error('End date must be after start date');
  }

  return true;
};

// Sanitize input
const sanitizeInput = (value) => {
  if (typeof value !== 'string') return value;
  
  // Remove HTML tags and trim
  return value.replace(/<[^>]*>/g, '').trim();
};

// Normalize email
const normalizeEmail = (value) => {
  if (typeof value !== 'string') return value;
  return value.toLowerCase().trim();
};

module.exports = {
  validationMiddleware,
  validateObjectId,
  validateImageFile,
  validateStringArray,
  validateUrl,
  validatePhone,
  validateSlug,
  validateHexColor,
  validateDateRange,
  sanitizeInput,
  normalizeEmail,
};