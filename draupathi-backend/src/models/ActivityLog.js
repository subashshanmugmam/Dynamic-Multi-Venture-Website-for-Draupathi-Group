const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      // Authentication actions
      'login', 'logout', 'password_change', 'password_reset',
      // Content actions
      'content_create', 'content_update', 'content_delete', 'content_publish', 'content_unpublish',
      // Product actions
      'product_create', 'product_update', 'product_delete', 'product_publish', 'product_unpublish',
      // Media actions
      'media_upload', 'media_delete', 'media_update',
      // Venture actions
      'venture_update', 'service_create', 'service_update', 'service_delete',
      // Banner actions
      'banner_create', 'banner_update', 'banner_delete', 'banner_activate', 'banner_deactivate',
      // Announcement actions
      'announcement_create', 'announcement_update', 'announcement_delete', 'announcement_publish',
      // User management actions
      'user_create', 'user_update', 'user_delete', 'user_activate', 'user_deactivate',
      // Settings actions
      'settings_update', 'theme_update', 'seo_update',
      // System actions
      'backup_create', 'backup_restore', 'cache_clear'
    ]
  },
  resourceType: {
    type: String,
    enum: [
      'content', 'product', 'venture', 'service', 'banner', 'announcement', 
      'media', 'user', 'settings', 'theme', 'seo', 'system'
    ]
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId
  },
  resourceName: {
    type: String // Human-readable name of the resource
  },
  details: {
    type: String // Additional details about the action
  },
  changes: {
    old: mongoose.Schema.Types.Mixed,
    new: mongoose.Schema.Types.Mixed
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  deviceInfo: {
    browser: String,
    os: String,
    device: String
  },
  success: {
    type: Boolean,
    default: true
  },
  errorMessage: String,
  sessionId: String,
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  timestamps: false, // We're using custom timestamp field
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for efficient querying
activityLogSchema.index({ userId: 1, timestamp: -1 });
activityLogSchema.index({ action: 1, timestamp: -1 });
activityLogSchema.index({ resourceType: 1, resourceId: 1 });
activityLogSchema.index({ timestamp: -1 });
activityLogSchema.index({ ipAddress: 1 });

// Virtual to populate user information
activityLogSchema.virtual('user', {
  ref: 'AdminUser',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

// Static method to log activity
activityLogSchema.statics.logActivity = async function(options) {
  const {
    userId,
    action,
    resourceType,
    resourceId,
    resourceName,
    details,
    changes,
    ipAddress,
    userAgent,
    deviceInfo,
    success = true,
    errorMessage,
    sessionId
  } = options;

  try {
    const log = new this({
      userId,
      action,
      resourceType,
      resourceId,
      resourceName,
      details,
      changes,
      ipAddress,
      userAgent,
      deviceInfo,
      success,
      errorMessage,
      sessionId,
      timestamp: new Date()
    });

    await log.save();
    return log;
  } catch (error) {
    // Silently fail logging to avoid breaking main functionality
    console.error('Failed to log activity:', error);
    return null;
  }
};

// Static method to get activity summary
activityLogSchema.statics.getActivitySummary = async function(userId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return await this.aggregate([
    {
      $match: {
        userId: mongoose.Types.ObjectId(userId),
        timestamp: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: '$action',
        count: { $sum: 1 },
        lastActivity: { $max: '$timestamp' }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

// Static method to clean old logs
activityLogSchema.statics.cleanOldLogs = async function(retentionDays = 90) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

  const result = await this.deleteMany({
    timestamp: { $lt: cutoffDate }
  });

  return result.deletedCount;
};

// Method to format for display
activityLogSchema.methods.getDisplayText = function() {
  const actionTexts = {
    'login': 'Logged in',
    'logout': 'Logged out',
    'content_create': `Created ${this.resourceType}`,
    'content_update': `Updated ${this.resourceType}`,
    'content_delete': `Deleted ${this.resourceType}`,
    'product_create': 'Created product',
    'product_update': 'Updated product',
    'product_delete': 'Deleted product',
    'media_upload': 'Uploaded media file',
    'media_delete': 'Deleted media file',
    'banner_create': 'Created banner',
    'banner_update': 'Updated banner',
    'settings_update': 'Updated settings'
  };

  let text = actionTexts[this.action] || this.action;
  
  if (this.resourceName) {
    text += `: ${this.resourceName}`;
  }
  
  return text;
};

// Pre-save middleware to limit collection size (optional)
activityLogSchema.pre('save', async function(next) {
  try {
    // Keep only last 10,000 records to prevent collection from growing too large
    const count = await this.constructor.countDocuments();
    if (count > 10000) {
      const oldestLogs = await this.constructor.find()
        .sort({ timestamp: 1 })
        .limit(count - 10000);
      
      const idsToDelete = oldestLogs.map(log => log._id);
      await this.constructor.deleteMany({ _id: { $in: idsToDelete } });
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);