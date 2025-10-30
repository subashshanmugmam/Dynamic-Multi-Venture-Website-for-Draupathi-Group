const User = require('../models/User');
const { 
  verifyAccessToken, 
  extractTokenFromHeader, 
  extractTokenFromCookies 
} = require('../utils/jwt');

// Middleware to authenticate and authorize requests
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Try to extract token from Authorization header first
    try {
      if (req.headers.authorization) {
        token = extractTokenFromHeader(req.headers.authorization);
      }
    } catch (error) {
      // If header extraction fails, try cookies
      try {
        token = extractTokenFromCookies(req.cookies, 'accessToken');
      } catch (cookieError) {
        return res.status(401).json({
          success: false,
          message: 'Access token is required',
          error: 'NO_TOKEN'
        });
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
        error: 'NO_TOKEN'
      });
    }

    // Verify the token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired access token',
        error: 'INVALID_TOKEN'
      });
    }

    // Find the user
    const user = await User.findById(decoded.userId).select('-password -refreshToken');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated',
        error: 'ACCOUNT_DEACTIVATED'
      });
    }

    // Attach user to request object
    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin
    };

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication',
      error: 'AUTH_ERROR'
    });
  }
};

// Middleware to check if user has required role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'NO_USER'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
        error: 'INSUFFICIENT_PERMISSIONS',
        required: roles,
        current: req.user.role
      });
    }

    next();
  };
};

// Middleware to check if user is admin (any admin level)
const requireAdmin = authorize('admin', 'super-admin');

// Middleware to check if user is super admin
const requireSuperAdmin = authorize('super-admin');

// Optional authentication - doesn't fail if no token provided
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Try to extract token (don't fail if not present)
    try {
      if (req.headers.authorization) {
        token = extractTokenFromHeader(req.headers.authorization);
      } else if (req.cookies.accessToken) {
        token = extractTokenFromCookies(req.cookies, 'accessToken');
      }
    } catch (error) {
      // Token extraction failed, continue without auth
      return next();
    }

    if (!token) {
      return next();
    }

    // Try to verify token
    try {
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.userId).select('-password -refreshToken');
      
      if (user && user.isActive) {
        req.user = {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.isActive,
          lastLogin: user.lastLogin
        };
      }
    } catch (error) {
      // Token verification failed, continue without auth
      console.log('Optional auth token verification failed:', error.message);
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue even if there's an error
  }
};

// Middleware to validate refresh token
const validateRefreshToken = async (req, res, next) => {
  try {
    let refreshToken;

    // Try to extract refresh token from cookies first, then from body
    if (req.cookies && req.cookies.refreshToken) {
      refreshToken = req.cookies.refreshToken;
    } else if (req.body && req.body.refreshToken) {
      refreshToken = req.body.refreshToken;
    }

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required',
        error: 'NO_REFRESH_TOKEN'
      });
    }

    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    console.error('Refresh token validation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during refresh token validation',
      error: 'REFRESH_VALIDATION_ERROR'
    });
  }
};

module.exports = {
  authenticate,
  authorize,
  requireAdmin,
  requireSuperAdmin,
  optionalAuth,
  validateRefreshToken,
};