const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    trim: true,
    match: [
      /^[\+]?[0-9\s\-\(\)]{10,15}$/,
      'Please provide a valid phone number'
    ]
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  venture: {
    type: String,
    required: [true, 'Please specify which venture you are interested in'],
    enum: ['it-solutions', 'irrigations', 'd-foods', 'general'],
    index: true
  },
  subject: {
    type: String,
    trim: true,
    maxlength: [150, 'Subject cannot be more than 150 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  inquiryType: {
    type: String,
    enum: ['general', 'service', 'product', 'support', 'partnership', 'career'],
    default: 'general',
    index: true
  },
  productInterest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  },
  serviceInterest: {
    type: String,
    trim: true
  },
  budget: {
    range: {
      type: String,
      enum: ['under-10k', '10k-50k', '50k-100k', '100k-500k', '500k+', 'not-specified'],
      default: 'not-specified'
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  timeline: {
    type: String,
    enum: ['immediate', '1-month', '1-3-months', '3-6-months', '6+months', 'not-specified'],
    default: 'not-specified'
  },
  source: {
    type: String,
    enum: ['website', 'social-media', 'referral', 'search-engine', 'advertisement', 'other'],
    default: 'website'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    index: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'resolved', 'closed'],
    default: 'new',
    index: true
  },
  isRead: {
    type: Boolean,
    default: false,
    index: true
  },
  isSpam: {
    type: Boolean,
    default: false,
    index: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  referrer: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  responses: [{
    message: {
      type: String,
      required: true
    },
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    respondedAt: {
      type: Date,
      default: Date.now
    },
    method: {
      type: String,
      enum: ['email', 'phone', 'in-person', 'system'],
      default: 'email'
    }
  }],
  followUpDate: {
    type: Date,
    default: null,
    index: true
  },
  notes: [{
    content: {
      type: String,
      required: true
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    isPrivate: {
      type: Boolean,
      default: true
    }
  }],
  analytics: {
    responseTime: {
      type: Number, // Minutes from submission to first response
      default: null
    },
    resolutionTime: {
      type: Number, // Minutes from submission to resolution
      default: null
    }
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
contactSubmissionSchema.index({ venture: 1, status: 1 });
contactSubmissionSchema.index({ isRead: 1, createdAt: -1 });
contactSubmissionSchema.index({ status: 1, priority: -1, createdAt: -1 });
contactSubmissionSchema.index({ assignedTo: 1, status: 1 });
contactSubmissionSchema.index({ followUpDate: 1, status: 1 });
contactSubmissionSchema.index({ email: 1 });
contactSubmissionSchema.index({ createdAt: -1 });

// Virtual for response count
contactSubmissionSchema.virtual('responseCount').get(function() {
  return this.responses.length;
});

// Virtual for is overdue (for follow-up)
contactSubmissionSchema.virtual('isOverdue').get(function() {
  if (!this.followUpDate) return false;
  return this.followUpDate < new Date() && !['resolved', 'closed'].includes(this.status);
});

// Static method to get submissions by venture
contactSubmissionSchema.statics.getByVenture = function(venture, options = {}) {
  const { 
    status, 
    isRead, 
    assignedTo, 
    limit = 20, 
    skip = 0, 
    sort = { createdAt: -1 } 
  } = options;

  const query = { venture, isSpam: false };
  if (status) query.status = status;
  if (typeof isRead === 'boolean') query.isRead = isRead;
  if (assignedTo) query.assignedTo = assignedTo;

  return this.find(query)
    .populate('assignedTo', 'name email')
    .populate('productInterest', 'name slug')
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .lean();
};

// Static method to get unread submissions
contactSubmissionSchema.statics.getUnread = function(venture = null) {
  const query = { isRead: false, isSpam: false };
  if (venture) query.venture = venture;

  return this.find(query)
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 })
    .lean();
};

// Static method to get overdue submissions
contactSubmissionSchema.statics.getOverdue = function() {
  const now = new Date();
  return this.find({
    followUpDate: { $lt: now },
    status: { $nin: ['resolved', 'closed'] },
    isSpam: false
  })
  .populate('assignedTo', 'name email')
  .sort({ followUpDate: 1 })
  .lean();
};

// Static method to get analytics
contactSubmissionSchema.statics.getAnalytics = function(startDate, endDate, venture = null) {
  const matchStage = {
    createdAt: { $gte: startDate, $lte: endDate },
    isSpam: false
  };
  
  if (venture) matchStage.venture = venture;

  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalSubmissions: { $sum: 1 },
        byStatus: {
          $push: {
            status: '$status',
            count: 1
          }
        },
        byVenture: {
          $push: {
            venture: '$venture',
            count: 1
          }
        },
        byInquiryType: {
          $push: {
            inquiryType: '$inquiryType',
            count: 1
          }
        },
        avgResponseTime: { $avg: '$analytics.responseTime' },
        avgResolutionTime: { $avg: '$analytics.resolutionTime' }
      }
    }
  ]);
};

// Method to mark as read
contactSubmissionSchema.methods.markAsRead = function(userId = null) {
  this.isRead = true;
  if (userId) this.assignedTo = userId;
  return this.save({ validateBeforeSave: false });
};

// Method to add response
contactSubmissionSchema.methods.addResponse = function(message, userId, method = 'email') {
  this.responses.push({
    message,
    respondedBy: userId,
    method
  });

  // Calculate response time for first response
  if (this.responses.length === 1 && !this.analytics.responseTime) {
    const responseTime = Math.floor((new Date() - this.createdAt) / (1000 * 60)); // Minutes
    this.analytics.responseTime = responseTime;
  }

  this.status = 'contacted';
  return this.save();
};

// Method to add note
contactSubmissionSchema.methods.addNote = function(content, userId, isPrivate = true) {
  this.notes.push({
    content,
    addedBy: userId,
    isPrivate
  });
  return this.save();
};

// Method to update status
contactSubmissionSchema.methods.updateStatus = function(status, userId = null) {
  const oldStatus = this.status;
  this.status = status;

  // Calculate resolution time
  if (status === 'resolved' && !this.analytics.resolutionTime) {
    const resolutionTime = Math.floor((new Date() - this.createdAt) / (1000 * 60)); // Minutes
    this.analytics.resolutionTime = resolutionTime;
  }

  if (userId) this.assignedTo = userId;

  return this.save({ validateBeforeSave: false });
};

module.exports = mongoose.model('ContactSubmission', contactSubmissionSchema);