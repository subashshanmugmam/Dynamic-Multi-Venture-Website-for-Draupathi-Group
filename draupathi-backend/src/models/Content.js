const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: [true, 'Content section is required'],
    enum: ['home', 'about', 'footer', 'contact', 'ventures', 'it-solutions', 'irrigations', 'd-foods'],
    index: true
  },
  key: {
    type: String,
    required: [true, 'Content key is required'],
    trim: true,
    index: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Content value is required']
  },
  type: {
    type: String,
    enum: ['text', 'html', 'json', 'image', 'array'],
    default: 'text'
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  metadata: {
    title: String,
    description: String,
    tags: [String],
    seoKeywords: [String]
  },
  version: {
    type: Number,
    default: 1
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
contentSchema.index({ section: 1, key: 1 }, { unique: true });
contentSchema.index({ isPublished: 1 });
contentSchema.index({ section: 1, isPublished: 1 });

// Static method to get content by section
contentSchema.statics.getBySection = function(section, published = true) {
  const query = { section };
  if (published) query.isPublished = true;
  
  return this.find(query).select('-__v').lean();
};

// Static method to update content
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

module.exports = mongoose.model('Content', contentSchema);