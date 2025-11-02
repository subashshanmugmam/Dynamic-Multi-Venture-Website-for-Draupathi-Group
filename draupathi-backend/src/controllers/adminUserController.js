const AdminUser = require('../models/AdminUser');
const ActivityLog = require('../models/ActivityLog');
const { validationResult } = require('express-validator');

// Get all admin users
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, role, isActive } = req.query;
    
    // Build filter
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get users with pagination
    const users = await AdminUser.find(filter)
      .select('-password -refreshTokens -twoFactorSecret')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await AdminUser.countDocuments(filter);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single user
exports.getUser = async (req, res, next) => {
  try {
    const user = await AdminUser.findById(req.params.id)
      .select('-password -refreshTokens -twoFactorSecret');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Create new user
exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, password, role, permissions, isActive } = req.body;

    // Check if email already exists
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    // Create user
    const user = new AdminUser({
      name,
      email,
      password,
      role: role || 'viewer',
      permissions: permissions || [],
      isActive: isActive !== undefined ? isActive : true
    });

    await user.save();

    // Log activity
    await ActivityLog.logActivity({
      userId: req.user.userId,
      action: 'user_create',
      resourceType: 'user',
      resourceId: user._id,
      resourceName: user.name,
      details: `Created new ${user.role} user`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown'
    });

    // Remove sensitive data from response
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshTokens;

    res.status(201).json({
      success: true,
      data: { user: userResponse }
    });
  } catch (error) {
    next(error);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, role, permissions, isActive } = req.body;
    const userId = req.params.id;

    // Find user
    const user = await AdminUser.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prevent self-role change or self-deactivation for super admin
    if (req.user.userId === userId) {
      if (role && role !== user.role && user.role === 'super_admin') {
        return res.status(400).json({
          success: false,
          error: 'Cannot change your own super admin role'
        });
      }
      if (isActive === false && user.role === 'super_admin') {
        return res.status(400).json({
          success: false,
          error: 'Cannot deactivate your own super admin account'
        });
      }
    }

    // Check email uniqueness if email is being changed
    if (email && email !== user.email) {
      const existingUser = await AdminUser.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Email already exists'
        });
      }
    }

    // Track changes for activity log
    const changes = {};
    if (name && name !== user.name) changes.name = { old: user.name, new: name };
    if (email && email !== user.email) changes.email = { old: user.email, new: email };
    if (role && role !== user.role) changes.role = { old: user.role, new: role };
    if (isActive !== undefined && isActive !== user.isActive) {
      changes.isActive = { old: user.isActive, new: isActive };
    }

    // Update user
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (permissions) updateData.permissions = permissions;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedUser = await AdminUser.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password -refreshTokens -twoFactorSecret');

    // Log activity
    await ActivityLog.logActivity({
      userId: req.user.userId,
      action: 'user_update',
      resourceType: 'user',
      resourceId: userId,
      resourceName: updatedUser.name,
      details: `Updated user profile`,
      changes,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown'
    });

    res.json({
      success: true,
      data: { user: updatedUser }
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find user
    const user = await AdminUser.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prevent self-deletion
    if (req.user.userId === userId) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete your own account'
      });
    }

    // Prevent deletion of super admin by non-super admin
    if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        error: 'Only super admin can delete super admin accounts'
      });
    }

    await AdminUser.findByIdAndDelete(userId);

    // Log activity
    await ActivityLog.logActivity({
      userId: req.user.userId,
      action: 'user_delete',
      resourceType: 'user',
      resourceId: userId,
      resourceName: user.name,
      details: `Deleted user account`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown'
    });

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Toggle user status
exports.toggleUserStatus = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await AdminUser.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prevent self-deactivation
    if (req.user.userId === userId && user.isActive) {
      return res.status(400).json({
        success: false,
        error: 'Cannot deactivate your own account'
      });
    }

    const newStatus = !user.isActive;
    user.isActive = newStatus;
    await user.save();

    // Log activity
    await ActivityLog.logActivity({
      userId: req.user.userId,
      action: newStatus ? 'user_activate' : 'user_deactivate',
      resourceType: 'user',
      resourceId: userId,
      resourceName: user.name,
      details: `${newStatus ? 'Activated' : 'Deactivated'} user account`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown'
    });

    res.json({
      success: true,
      data: { 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isActive: user.isActive
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get user activity logs
exports.getUserActivity = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { page = 1, limit = 20 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const logs = await ActivityLog.find({ userId })
      .populate('userId', 'name email')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ActivityLog.countDocuments({ userId });

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Change user password
exports.changeUserPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { newPassword } = req.body;
    const userId = req.params.id;

    const user = await AdminUser.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    user.password = newPassword;
    await user.save();

    // Clear all refresh tokens to force re-login
    user.refreshTokens = [];
    await user.save();

    // Log activity
    await ActivityLog.logActivity({
      userId: req.user.userId,
      action: 'password_change',
      resourceType: 'user',
      resourceId: userId,
      resourceName: user.name,
      details: 'Admin changed user password',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown'
    });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};