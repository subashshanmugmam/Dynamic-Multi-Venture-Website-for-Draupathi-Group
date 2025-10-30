const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Announcement title is required'],
    trim: true,
    maxlength: [150, 'Title cannot be more than 150 characters']
  },
  content: {
    type: String,
    required: [true, 'Announcement content is required'],
    trim: true
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: [250, 'Excerpt cannot be more than 250 characters']
  },
  type: {
    type: String,
    enum: ['info', 'product-launch', 'event', 'milestone', 'update', 'offer'],
    default: 'info',
    index: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
    index: true
  },
  targetVenture: {
    type: String,
    enum: ['all', 'it-solutions', 'irrigations', 'd-foods'],
    default: 'all',
    index: true
  },
  targetAudience: {
    type: String,
    enum: ['public', 'clients', 'partners', 'internal'],
    default: 'public'
  },
  image: {
    url: String,
    publicId: String,
    alt: String
  },
  link: {
    url: String,
    text: {
      type: String,
      default: 'Read More'
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isSticky: {
    type: Boolean,
    default: false
  },
  publishDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  expiryDate: {
    type: Date,
    default: null,
    index: true
  },
  scheduledFor: {
    type: Date,
    default: null,
    index: true
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'published', 'expired'],
    default: 'published',
    index: true
  },
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
announcementSchema.index({ status: 1, publishDate: -1 });
announcementSchema.index({ isActive: 1, publishDate: -1 });
announcementSchema.index({ targetVenture: 1, isActive: 1, publishDate: -1 });
announcementSchema.index({ type: 1, isActive: 1 });
announcementSchema.index({ isSticky: 1, priority: -1, publishDate: -1 });
announcementSchema.index({ expiryDate: 1 });

// Virtual for checking if announcement is currently visible
announcementSchema.virtual('isVisible').get(function() {
  const now = new Date();
  const isPublished = this.status === 'published';
  const isWithinDateRange = this.publishDate <= now && (!this.expiryDate || this.expiryDate >= now);
  return this.isActive && isPublished && isWithinDateRange;
});

// Virtual for time remaining until expiry
announcementSchema.virtual('timeToExpiry').get(function() {
  if (!this.expiryDate) return null;
  const now = new Date();
  const diff = this.expiryDate.getTime() - now.getTime();
  return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0; // Days remaining
});

// Static method to get active announcements
announcementSchema.statics.getActive = function(venture = 'all', limit = 10) {
  const now = new Date();
  const query = {
    isActive: true,
    status: 'published',
    publishDate: { $lte: now },
    $or: [
      { expiryDate: { $gte: now } },
      { expiryDate: null }
    ]
  };

  if (venture !== 'all') {
    query.$or = [
      { targetVenture: venture },
      { targetVenture: 'all' }
    ];
  }

  return this.find(query)
    .sort({ isSticky: -1, priority: -1, publishDate: -1 })
    .limit(limit)
    .populate('author', 'name')
    .lean();
};

// Static method to get recent announcements
announcementSchema.statics.getRecent = function(days = 30, venture = 'all') {
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - days);

  const query = {
    isActive: true,
    status: 'published',
    publishDate: { $gte: dateLimit }
  };

  if (venture !== 'all') {
    query.$or = [
      { targetVenture: venture },
      { targetVenture: 'all' }
    ];
  }

  return this.find(query)
    .sort({ publishDate: -1 })
    .populate('author', 'name')
    .lean();
};

// Static method to get announcements by type
announcementSchema.statics.getByType = function(type, limit = 5) {
  const now = new Date();
  return this.find({
    type,
    isActive: true,
    status: 'published',
    publishDate: { $lte: now },
    $or: [
      { expiryDate: { $gte: now } },
      { expiryDate: null }
    ]
  })
  .sort({ publishDate: -1 })
  .limit(limit)
  .populate('author', 'name')
  .lean();
};

// Method to increment view count
announcementSchema.methods.incrementView = function() {
  this.analytics.views += 1;
  return this.save({ validateBeforeSave: false });
};

// Method to increment click count
announcementSchema.methods.incrementClick = function() {
  this.analytics.clicks += 1;
  return this.save({ validateBeforeSave: false });
};

// Method to increment share count
announcementSchema.methods.incrementShare = function() {
  this.analytics.shares += 1;
  return this.save({ validateBeforeSave: false });
};

// Pre-save middleware to auto-generate excerpt
announcementSchema.pre('save', function(next) {
  if (this.isModified('content') && !this.excerpt) {
    // Strip HTML tags and limit to 250 characters
    const plainText = this.content.replace(/<[^>]*>/g, '');
    this.excerpt = plainText.length > 247 
      ? plainText.substring(0, 247) + '...' 
      : plainText;
  }

  // Auto-update status based on dates
  const now = new Date();
  if (this.scheduledFor && this.scheduledFor <= now && this.status === 'scheduled') {
    this.status = 'published';
    this.publishDate = now;
  } else if (this.expiryDate && this.expiryDate <= now && this.status === 'published') {
    this.status = 'expired';
  }

  next();
});

module.exports = mongoose.model('Announcement', announcementSchema);