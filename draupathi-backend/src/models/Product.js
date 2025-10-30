const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
  unit: {
    type: String,
    trim: true
  }
}, { _id: false });

const nutritionSchema = new mongoose.Schema({
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  fiber: Number,
  sugar: Number,
  sodium: Number,
  servingSize: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  ventureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venture',
    required: [true, 'Product must belong to a venture']
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true,
    index: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  specifications: [specificationSchema],
  nutrition: nutritionSchema, // For D Foods products
  price: {
    amount: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    isDisplayed: {
      type: Boolean,
      default: false
    }
  },
  variants: [{
    name: String,
    sku: String,
    price: Number,
    specifications: [specificationSchema],
    images: [String],
    isAvailable: {
      type: Boolean,
      default: true
    }
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  features: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  applications: [{
    type: String,
    trim: true
  }],
  certificates: [{
    name: String,
    image: String,
    issuer: String,
    validUntil: Date
  }],
  downloads: [{
    name: String,
    type: {
      type: String,
      enum: ['brochure', 'manual', 'specification', 'certificate', 'datasheet']
    },
    url: String,
    size: String // e.g., "2.5 MB"
  }],
  availability: {
    isAvailable: {
      type: Boolean,
      default: true
    },
    stock: {
      type: Number,
      default: 0
    },
    minOrderQuantity: {
      type: Number,
      default: 1
    }
  },
  launchInfo: {
    isLaunched: {
      type: Boolean,
      default: true,
      index: true
    },
    launchDate: {
      type: Date,
      default: Date.now
    },
    isNewProduct: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  },
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    inquiries: {
      type: Number,
      default: 0
    },
    downloads: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdBy: {
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

// Compound indexes
productSchema.index({ ventureId: 1, isActive: 1 });
productSchema.index({ ventureId: 1, category: 1 });
productSchema.index({ slug: 1, ventureId: 1 }, { unique: true });
productSchema.index({ 'launchInfo.isLaunched': 1, 'launchInfo.isFeatured': 1 });
productSchema.index({ tags: 1 });
productSchema.index({ createdAt: -1 });

// Virtual for primary image
productSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary || this.images[0] || null;
});

// Static method to get products by venture
productSchema.statics.getByVenture = function(ventureId, options = {}) {
  const {
    category,
    featured = false,
    launched = true,
    active = true,
    limit = 20,
    skip = 0,
    sort = { 'launchInfo.launchDate': -1 }
  } = options;

  const query = { ventureId };
  if (category) query.category = category;
  if (featured) query['launchInfo.isFeatured'] = true;
  if (launched) query['launchInfo.isLaunched'] = true;
  if (active) query.isActive = true;

  return this.find(query)
    .populate('ventureId', 'name slug')
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .lean();
};

// Static method to search products
productSchema.statics.search = function(searchTerm, ventureId = null) {
  const query = {
    $and: [
      {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
          { tags: { $in: [new RegExp(searchTerm, 'i')] } }
        ]
      },
      { isActive: true },
      { 'launchInfo.isLaunched': true }
    ]
  };

  if (ventureId) {
    query.$and.push({ ventureId });
  }

  return this.find(query)
    .populate('ventureId', 'name slug')
    .sort({ 'analytics.views': -1, createdAt: -1 })
    .lean();
};

// Method to increment view count
productSchema.methods.incrementView = function() {
  this.analytics.views += 1;
  return this.save({ validateBeforeSave: false });
};

// Method to increment inquiry count
productSchema.methods.incrementInquiry = function() {
  this.analytics.inquiries += 1;
  return this.save({ validateBeforeSave: false });
};

// Method to increment download count
productSchema.methods.incrementDownload = function() {
  this.analytics.downloads += 1;
  return this.save({ validateBeforeSave: false });
};

// Pre-save middleware to generate slug
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);