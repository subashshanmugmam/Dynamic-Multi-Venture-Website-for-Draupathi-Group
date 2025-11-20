const mongoose = require('mongoose');

// Page/Content Schema for CMS
const contentSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['page', 'blog', 'section'],
    default: 'page'
  },
  
  // Content Fields
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    maxLength: 500
  },
  featuredImage: {
    type: String
  },
  
  // Section-based content (for dynamic sections)
  section: {
    type: String,
    enum: ['home', 'about', 'footer', 'contact', 'ventures', 'it-solutions', 'd-foods'],
    index: true
  },
  key: {
    type: String,
    trim: true,
    index: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed
  },
  
  // Publishing & Status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  
  // Author & Editor
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminUser'
  },
  
  // Categorization
  categories: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  
  // SEO & Metadata
  seo: {
    metaTitle: {
      type: String,
      maxLength: 60
    },
    metaDescription: {
      type: String,
      maxLength: 160
    },
    metaKeywords: [{
      type: String
    }],
    canonicalUrl: {
      type: String
    },
    noIndex: {
      type: Boolean,
      default: false
    }
  },
  
  // Analytics
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    lastViewed: {
      type: Date
    }
  },
  
  // Version Control
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
contentSchema.index({ slug: 1 });
contentSchema.index({ type: 1, status: 1 });
contentSchema.index({ section: 1, key: 1 });
contentSchema.index({ author: 1 });
contentSchema.index({ publishedAt: -1 });
contentSchema.index({ isPublished: 1 });
contentSchema.index({ section: 1, isPublished: 1 });

// Virtual for URL
contentSchema.virtual('url').get(function() {
  if (this.section && this.key) {
    return `/${this.section}#${this.key}`;
  }
  return `/${this.type}/${this.slug}`;
});

// Virtual for reading time
contentSchema.virtual('readingTime').get(function() {
  if (!this.content) return 0;
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// Pre-save middleware
contentSchema.pre('save', function(next) {
  // Auto-generate slug from title if not provided
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
    this.isPublished = true;
  }

  // Sync isPublished with status
  if (this.isModified('status')) {
    this.isPublished = this.status === 'published';
  }

  // Auto-generate SEO fields if not provided
  if (!this.seo.metaTitle && this.title) {
    this.seo.metaTitle = this.title.substring(0, 60);
  }

  if (!this.seo.metaDescription && (this.excerpt || this.content)) {
    const text = this.excerpt || this.content;
    const cleanText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
    this.seo.metaDescription = cleanText.substring(0, 160);
  }

  next();
});

// Static methods
contentSchema.statics.getBySection = function(section, published = true) {
  const query = { section };
  if (published) query.isPublished = true;
  
  return this.find(query).select('-__v').lean();
};

contentSchema.statics.updateContent = function(section, key, value, type = 'text', userId = null) {
  return this.findOneAndUpdate(
    { section, key },
    { 
      value, 
      type, 
      lastModifiedBy: userId,
      $inc: { version: 1 }
    },
    { 
      upsert: true, 
      new: true,
      runValidators: true
    }
  );
};

contentSchema.statics.findPublished = function() {
  return this.find({
    status: 'published',
    $or: [
      { publishedAt: { $lte: new Date() } },
      { publishedAt: { $exists: false } }
    ]
  });
};

contentSchema.statics.findByType = function(type) {
  return this.find({ type });
};

contentSchema.statics.search = function(query) {
  return this.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { content: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ]
  });
};

// Instance methods
contentSchema.methods.incrementViews = function() {
  this.analytics.views += 1;
  this.analytics.lastViewed = new Date();
  return this.save();
};

contentSchema.methods.isVisible = function() {
  return this.status === 'published' && 
         (!this.publishedAt || this.publishedAt <= new Date());
};

module.exports = mongoose.model('Content', contentSchema);