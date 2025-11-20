const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Banner title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  subtitle: {
    type: String,
    trim: true,
    maxlength: [200, 'Subtitle cannot be more than 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  image: {
    url: {
      type: String,
      required: [true, 'Banner image is required']
    },
    publicId: String, // For Cloudinary
    alt: String
  },
  link: {
    type: String,
    trim: true,
    match: [
      /^https?:\/\/.*$/,
      'Link must be a valid URL'
    ]
  },
  linkText: {
    type: String,
    trim: true,
    default: 'Learn More'
  },
  order: {
    type: Number,
    default: 0,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: null
  },
  targetVenture: {
    type: String,
    enum: ['all', 'it-solutions', 'd-foods'],
    default: 'all'
  },
  clickCount: {
    type: Number,
    default: 0
  },
  impressions: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for performance
bannerSchema.index({ isActive: 1, order: 1 });
bannerSchema.index({ targetVenture: 1, isActive: 1 });
bannerSchema.index({ startDate: 1, endDate: 1 });

// Virtual for checking if banner is currently active
bannerSchema.virtual('isCurrentlyActive').get(function() {
  const now = new Date();
  const isWithinDateRange = this.startDate <= now && (!this.endDate || this.endDate >= now);
  return this.isActive && isWithinDateRange;
});

// Static method to get active banners
bannerSchema.statics.getActiveBanners = function(venture = 'all') {
  const now = new Date();
  const query = {
    isActive: true,
    startDate: { $lte: now },
    $or: [
      { endDate: { $gte: now } },
      { endDate: null }
    ],
    $or: [
      { targetVenture: venture },
      { targetVenture: 'all' }
    ]
  };

  return this.find(query)
    .sort({ order: 1, createdAt: -1 })
    .populate('createdBy', 'name email')
    .lean();
};

// Method to increment click count
bannerSchema.methods.incrementClick = function() {
  this.clickCount += 1;
  return this.save({ validateBeforeSave: false });
};

// Method to increment impressions
bannerSchema.methods.incrementImpression = function() {
  this.impressions += 1;
  return this.save({ validateBeforeSave: false });
};

module.exports = mongoose.model('Banner', bannerSchema);