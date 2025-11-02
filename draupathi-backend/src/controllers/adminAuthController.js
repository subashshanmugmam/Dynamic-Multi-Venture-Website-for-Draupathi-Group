const AdminUser = require('../models/AdminUser');
const jwtService = require('../utils/jwtService');
const ActivityLog = require('../models/ActivityLog');

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
  try {
    const { email, password, remember } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await AdminUser.findByCredentials(email, password);

    // Generate tokens
    const tokens = jwtService.generateTokens(user);

    // Store refresh token with metadata
    user.refreshTokens.push({ token: tokens.refreshToken, expiresAt: tokens.refreshTokenExpiry, deviceInfo: req.headers['user-agent'] || 'unknown' });
    await user.save();

    // Set cookie
    setRefreshCookie(res, tokens.refreshToken, tokens.refreshTokenExpiry);

    // Log activity
    ActivityLog.logActivity({
      userId: user._id,
      action: 'login',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown',
      resourceType: 'user',
      resourceId: user._id,
      resourceName: user.name,
      success: true
    });

    return res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions || user.getRolePermissions()
        },
        tokens: {
          accessToken: tokens.accessToken
        }
      }
    });
  } catch (error) {
    next(error);
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
