const User = require('../models/User');
const { 
  generateTokenPair, 
  verifyRefreshToken, 
  getCookieOptions 
} = require('../utils/jwt');
const { 
  asyncHandler, 
  AuthenticationError, 
  ValidationError, 
  NotFoundError,
  ConflictError 
} = require('../middleware/error.middleware');

// @desc    Register a new admin user (super-admin only)
// @route   POST /api/auth/register
// @access  Private (Super Admin)
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'admin' } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError('User already exists with this email');
  }

  // Validate role
  if (!['admin', 'super-admin'].includes(role)) {
    throw new ValidationError('Invalid role specified');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  // Generate tokens
  const tokens = generateTokenPair(user);

  // Set refresh token in user record
  user.refreshToken = tokens.refreshToken;
  await user.save({ validateBeforeSave: false });

  // Set cookies
  const cookieOptions = getCookieOptions(process.env.NODE_ENV === 'production');
  res.cookie('accessToken', tokens.accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
  res.cookie('refreshToken', tokens.refreshToken, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'Admin user registered successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      },
      tokens: {
        accessToken: tokens.accessToken,
        expiresIn: tokens.expiresIn
      }
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new AuthenticationError('Invalid email or password');
  }

  if (!user.isActive) {
    throw new AuthenticationError('Account is deactivated. Please contact administrator.');
  }

  // Update last login
  await user.updateLastLogin();

  // Generate tokens
  const tokens = generateTokenPair(user);

  // Set refresh token in user record
  user.refreshToken = tokens.refreshToken;
  await user.save({ validateBeforeSave: false });

  // Set cookies
  const cookieOptions = getCookieOptions(process.env.NODE_ENV === 'production');
  res.cookie('accessToken', tokens.accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
  res.cookie('refreshToken', tokens.refreshToken, cookieOptions);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin
      },
      tokens: {
        accessToken: tokens.accessToken,
        expiresIn: tokens.expiresIn
      }
    }
  });
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (with valid refresh token)
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: clientRefreshToken } = req;

  // Verify refresh token
  let decoded;
  try {
    decoded = verifyRefreshToken(clientRefreshToken);
  } catch (error) {
    throw new AuthenticationError('Invalid or expired refresh token');
  }

  // Find user and verify refresh token matches
  const user = await User.findById(decoded.userId).select('+refreshToken');
  
  if (!user || user.refreshToken !== clientRefreshToken) {
    throw new AuthenticationError('Invalid refresh token');
  }

  if (!user.isActive) {
    throw new AuthenticationError('Account is deactivated');
  }

  // Generate new tokens
  const tokens = generateTokenPair(user);

  // Update refresh token in user record
  user.refreshToken = tokens.refreshToken;
  await user.save({ validateBeforeSave: false });

  // Set new cookies
  const cookieOptions = getCookieOptions(process.env.NODE_ENV === 'production');
  res.cookie('accessToken', tokens.accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
  res.cookie('refreshToken', tokens.refreshToken, cookieOptions);

  res.json({
    success: true,
    message: 'Token refreshed successfully',
    data: {
      tokens: {
        accessToken: tokens.accessToken,
        expiresIn: tokens.expiresIn
      }
    }
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  // Clear refresh token from database
  if (req.user) {
    await User.findByIdAndUpdate(req.user.id, {
      $unset: { refreshToken: 1 }
    });
  }

  // Clear cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }

  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    }
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user.id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Check if email is being changed and if it already exists
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('Email already exists');
    }
  }

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        updatedAt: user.updatedAt
      }
    }
  });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ValidationError('Current password and new password are required');
  }

  if (newPassword.length < 6) {
    throw new ValidationError('New password must be at least 6 characters long');
  }

  const user = await User.findById(req.user.id).select('+password');
  
  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Verify current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    throw new AuthenticationError('Current password is incorrect');
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Clear all refresh tokens (force re-login on all devices)
  await User.findByIdAndUpdate(user._id, {
    $unset: { refreshToken: 1 }
  });

  res.json({
    success: true,
    message: 'Password changed successfully. Please log in again.'
  });
});

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  updateProfile,
  changePassword,
};