const jwtService = require('../utils/jwtService');
const AdminUser = require('../models/AdminUser');

// Extract token from header or cookies
function extractToken(req) {
  let token = null;
  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  } else if (req.cookies && req.cookies.refreshToken) {
    // sometimes frontends store access token in cookies named accessToken
    token = req.cookies.refreshToken; // not ideal but fallback
  }
  return token;
}

exports.authenticateAdmin = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({ success: false, error: 'NO_TOKEN' });
    }

    let decoded;
    try {
      decoded = jwtService.verifyAccessToken(token);
    } catch (err) {
      return res.status(401).json({ success: false, error: 'INVALID_TOKEN' });
    }

    const user = await AdminUser.findById(decoded.userId).select('-password -refreshTokens');
    if (!user) {
      return res.status(401).json({ success: false, error: 'USER_NOT_FOUND' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, error: 'ACCOUNT_DEACTIVATED' });
    }

    req.user = {
      userId: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions || user.getRolePermissions()
    };

    next();
  } catch (error) {
    console.error('authenticateAdmin error', error);
    return res.status(500).json({ success: false, error: 'AUTH_ERROR' });
  }
};

// Role based authorization middleware
exports.authorizeAdmin = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, error: 'NO_USER' });
    if (roles.length === 0) return next();
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'INSUFFICIENT_PERMISSIONS' });
    }
    next();
  };
};

// Permission checker
exports.requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, error: 'NO_USER' });
    if (req.user.role === 'super_admin') return next();
    const perms = req.user.permissions || [];
    if (!perms.includes(permission)) return res.status(403).json({ success: false, error: 'INSUFFICIENT_PERMISSIONS' });
    next();
  };
};