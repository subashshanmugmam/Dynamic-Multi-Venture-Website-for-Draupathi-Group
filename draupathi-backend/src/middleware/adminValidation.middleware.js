const { body, param } = require('express-validator');

// Validation for creating a new admin user
const createUserValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),

  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),

  body('role')
    .optional()
    .isIn(['super_admin', 'content_manager', 'editor', 'viewer'])
    .withMessage('Invalid role specified'),

  body('permissions')
    .optional()
    .isArray()
    .withMessage('Permissions must be an array'),

  body('permissions.*')
    .optional()
    .isIn([
      'content.read', 'content.create', 'content.update', 'content.delete',
      'media.upload', 'media.delete', 'media.manage',
      'products.read', 'products.create', 'products.update', 'products.delete',
      'ventures.read', 'ventures.update', 'ventures.manage',
      'banners.read', 'banners.create', 'banners.update', 'banners.delete',
      'announcements.read', 'announcements.create', 'announcements.update', 'announcements.delete',
      'users.read', 'users.create', 'users.update', 'users.delete',
      'analytics.view', 'analytics.export',
      'settings.read', 'settings.update',
      'system.backup', 'system.restore', 'system.manage'
    ])
    .withMessage('Invalid permission specified'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value')
];

// Validation for updating an admin user
const updateUserValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),

  body('role')
    .optional()
    .isIn(['super_admin', 'content_manager', 'editor', 'viewer'])
    .withMessage('Invalid role specified'),

  body('permissions')
    .optional()
    .isArray()
    .withMessage('Permissions must be an array'),

  body('permissions.*')
    .optional()
    .isIn([
      'content.read', 'content.create', 'content.update', 'content.delete',
      'media.upload', 'media.delete', 'media.manage',
      'products.read', 'products.create', 'products.update', 'products.delete',
      'ventures.read', 'ventures.update', 'ventures.manage',
      'banners.read', 'banners.create', 'banners.update', 'banners.delete',
      'announcements.read', 'announcements.create', 'announcements.update', 'announcements.delete',
      'users.read', 'users.create', 'users.update', 'users.delete',
      'analytics.view', 'analytics.export',
      'settings.read', 'settings.update',
      'system.backup', 'system.restore', 'system.manage'
    ])
    .withMessage('Invalid permission specified'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value')
];

// Validation for changing user password
const changePasswordValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID'),

  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

// Validation for user ID parameter
const userIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID')
];

// Login validation
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  body('remember')
    .optional()
    .isBoolean()
    .withMessage('Remember must be a boolean value')
];

module.exports = {
  createUserValidation,
  updateUserValidation,
  changePasswordValidation,
  userIdValidation,
  loginValidation
};