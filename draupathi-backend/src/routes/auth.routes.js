const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  updateProfile,
  changePassword,
} = require('../controllers/authController');
const {
  authenticate,
  requireSuperAdmin,
  validateRefreshToken,
} = require('../middleware/auth.middleware');
const { validationMiddleware } = require('../middleware/validation.middleware');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('role')
    .optional()
    .isIn(['admin', 'super-admin'])
    .withMessage('Role must be either admin or super-admin'),
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number'),
];

// Routes

// @desc    Register a new admin user (super-admin only)
// @route   POST /api/auth/register
// @access  Private (Super Admin)
router.post('/register', 
  authenticate, 
  requireSuperAdmin,
  registerValidation,
  validationMiddleware,
  register
);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login',
  loginValidation,
  validationMiddleware,
  login
);

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (with valid refresh token)
router.post('/refresh',
  validateRefreshToken,
  refreshToken
);

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout',
  authenticate,
  logout
);

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
router.get('/me',
  authenticate,
  getMe
);

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile',
  authenticate,
  updateProfileValidation,
  validationMiddleware,
  updateProfile
);

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
router.put('/change-password',
  authenticate,
  changePasswordValidation,
  validationMiddleware,
  changePassword
);

module.exports = router;