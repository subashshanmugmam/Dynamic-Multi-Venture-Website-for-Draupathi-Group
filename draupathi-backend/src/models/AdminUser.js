const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'Please enter a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['super_admin', 'content_manager', 'editor', 'viewer'],
    default: 'viewer',
    required: true
  },
  permissions: [{
    type: String,
    enum: [
      // Content permissions
      'content.read', 'content.create', 'content.update', 'content.delete',
      // Media permissions
      'media.upload', 'media.delete', 'media.manage',
      // Product permissions
      'products.read', 'products.create', 'products.update', 'products.delete',
      // Venture permissions
      'ventures.read', 'ventures.update', 'ventures.manage',
      // Banner permissions
      'banners.read', 'banners.create', 'banners.update', 'banners.delete',
      // Announcement permissions
      'announcements.read', 'announcements.create', 'announcements.update', 'announcements.delete',
      // User management
      'users.read', 'users.create', 'users.update', 'users.delete',
      // Analytics
      'analytics.view', 'analytics.export',
      // Settings
      'settings.read', 'settings.update',
      // System
      'system.backup', 'system.restore', 'system.manage'
    ]
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0,
    max: 5
  },
  lockUntil: Date,
  avatar: {
    type: String,
    default: null
  },
  refreshTokens: [{
    token: String,
    createdAt: { type: Date, default: Date.now },
    expiresAt: Date,
    deviceInfo: String
  }],
  passwordResetToken: String,
  passwordResetExpires: Date,
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
adminUserSchema.index({ email: 1 });
adminUserSchema.index({ role: 1 });
adminUserSchema.index({ isActive: 1 });

// Virtual for checking if account is locked
adminUserSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
adminUserSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
adminUserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to check permissions
adminUserSchema.methods.hasPermission = function(permission) {
  // Super admin has all permissions
  if (this.role === 'super_admin') return true;
  
  // Check if user has specific permission
  return this.permissions.includes(permission);
};

// Method to get role permissions
adminUserSchema.methods.getRolePermissions = function() {
  const rolePermissions = {
    super_admin: ['*'], // All permissions
    content_manager: [
      'content.read', 'content.create', 'content.update', 'content.delete',
      'media.upload', 'media.delete', 'media.manage',
      'products.read', 'products.create', 'products.update', 'products.delete',
      'ventures.read', 'ventures.update', 'ventures.manage',
      'banners.read', 'banners.create', 'banners.update', 'banners.delete',
      'announcements.read', 'announcements.create', 'announcements.update', 'announcements.delete',
      'analytics.view'
    ],
    editor: [
      'content.read', 'content.update',
      'media.upload',
      'products.read', 'products.update',
      'ventures.read'
    ],
    viewer: [
      'content.read',
      'products.read',
      'ventures.read',
      'analytics.view'
    ]
  };
  
  return rolePermissions[this.role] || [];
};

// Method to handle login attempts
adminUserSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
adminUserSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Static method to find by credentials
adminUserSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email, isActive: true }).select('+password');
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  if (user.isLocked) {
    throw new Error('Account is temporarily locked due to too many failed login attempts');
  }
  
  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    await user.incLoginAttempts();
    throw new Error('Invalid credentials');
  }
  
  // Reset login attempts on successful login
  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }
  
  // Update last login
  user.lastLogin = new Date();
  await user.save();
  
  return user;
};

// Method to clean expired refresh tokens
adminUserSchema.methods.cleanExpiredTokens = function() {
  this.refreshTokens = this.refreshTokens.filter(
    tokenObj => tokenObj.expiresAt > new Date()
  );
  return this.save();
};

module.exports = mongoose.model('AdminUser', adminUserSchema);