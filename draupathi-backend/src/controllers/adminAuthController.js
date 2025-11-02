const AdminUser = require('../models/AdminUser');
const jwtService = require('../utils/jwtService');
const ActivityLog = require('../models/ActivityLog');
const { validationResult } = require('express-validator');

// Helper to set refresh token cookie
const setRefreshCookie = (res, token, expiresAt) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt
  };
  res.cookie('refreshToken', token, cookieOptions);
};

exports.login = async (req, res, next) => {
  console.log('🔍 Admin login attempt started');
  
  try {
    const { email, password, remember } = req.body;
    
    console.log('📝 Request data:', { email, hasPassword: !!password });
    
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ 
        success: false, 
        error: 'VALIDATION_ERROR',
        message: 'Email and password are required' 
      });
    }

    console.log('� Finding user by credentials...');
    const user = await AdminUser.findByCredentials(email, password);
    console.log('✅ User authenticated:', user.email);

    console.log('� Generating JWT tokens...');
    const tokens = jwtService.generateTokens(user);
    
    if (!tokens || !tokens.accessToken) {
      throw new Error('Failed to generate authentication tokens');
    }
    
    console.log('✅ Tokens generated successfully');

    console.log('💾 Saving refresh token...');
    // Store refresh token
    user.refreshTokens = user.refreshTokens || [];
    user.refreshTokens.push({ 
      token: tokens.refreshToken, 
      expiresAt: tokens.refreshTokenExpiry, 
      deviceInfo: req.headers['user-agent'] || 'unknown' 
    });
    await user.save();

    console.log('🍪 Setting cookies...');
    // Set refresh token cookie
    setRefreshCookie(res, tokens.refreshToken, tokens.refreshTokenExpiry);

    console.log('📋 Logging activity...');
    // Log successful login
    try {
      await ActivityLog.logActivity({
        userId: user._id,
        action: 'login',
        ipAddress: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        resourceType: 'user',
        resourceId: user._id,
        resourceName: user.name,
        success: true
      });
    } catch (logError) {
      console.log('⚠️ Activity logging failed:', logError.message);
      // Don't fail the login if logging fails
    }

    console.log('🎉 Login successful, sending response');
    
    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions
        },
        tokens: {
          accessToken: tokens.accessToken
        }
      }
    });

  } catch (error) {
    console.error('❌ Admin login error:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    // Handle specific error types
    if (error.message.includes('Invalid credentials')) {
      return res.status(401).json({ 
        success: false, 
        error: 'AUTHENTICATION_ERROR',
        message: 'Invalid email or password' 
      });
    }
    
    if (error.message.includes('locked') || error.message.includes('too many')) {
      return res.status(401).json({ 
        success: false, 
        error: 'ACCOUNT_LOCKED',
        message: 'Account is temporarily locked due to too many failed login attempts' 
      });
    }
    
    // Generic server error
    return res.status(500).json({ 
      success: false, 
      error: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(200).json({ success: true });

    // Remove refresh token from user
    await AdminUser.updateOne({ 'refreshTokens.token': refreshToken }, { $pull: { refreshTokens: { token: refreshToken } } });

    res.clearCookie('refreshToken');

    // Log activity (if user found)
    ActivityLog.logActivity({
      userId: req.user ? req.user._id : null,
      action: 'logout',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown',
      resourceType: 'user',
      resourceName: req.user ? req.user.name : 'unknown',
      success: true
    });

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ success: false, error: 'No refresh token provided' });

    // Verify refresh token
    const decoded = jwtService.verifyRefreshToken(refreshToken);

    // Find user and token
    const user = await AdminUser.findOne({ _id: decoded.userId, 'refreshTokens.token': refreshToken });
    if (!user) return res.status(401).json({ success: false, error: 'Invalid refresh token' });

    // Generate new tokens
    const tokens = jwtService.generateTokens(user);

    // Replace refresh token in DB
    await AdminUser.updateOne({ _id: user._id, 'refreshTokens.token': refreshToken }, { $set: { 'refreshTokens.$.token': tokens.refreshToken, 'refreshTokens.$.expiresAt': tokens.refreshTokenExpiry } });

    // Set cookie
    setRefreshCookie(res, tokens.refreshToken, tokens.refreshTokenExpiry);

    return res.json({ success: true, data: { accessToken: tokens.accessToken } });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, error: 'Unauthorized' });

    const user = await AdminUser.findById(req.user.userId).select('-password -refreshTokens');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    return res.json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};
