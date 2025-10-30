const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  image: {
    url: String,
    publicId: String,
    alt: String
  },
  features: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  _id: true
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  image: {
    url: String,
    publicId: String,
    alt: String
  },
  images: [{
    url: String,
    publicId: String,
    alt: String
  }],
  technologies: [{
    type: String,
    trim: true
  }],
  link: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  client: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  team: [{
    name: String,
    role: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  completedAt: {
    type: Date
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  _id: true,
  timestamps: true
});

const ventureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Venture name is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: [true, 'Venture slug is required'],
    unique: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Venture description is required'],
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  logo: {
    url: String,
    publicId: String,
    alt: String
  },
  heroImage: {
    url: String,
    publicId: String,
    alt: String
  },
  colors: {
    primary: {
      type: String,
      default: '#0ea5e9'
    },
    secondary: {
      type: String,
      default: '#22c55e'
    }
  },
  contact: {
    email: String,
    phone: String,
    address: String
  },
  socialLinks: {
    website: String,
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String
  },
  services: [serviceSchema],
  projects: [projectSchema],
  stats: {
    projectsCompleted: {
      type: Number,
      default: 0
    },
    clientsSatisfied: {
      type: Number,
      default: 0
    },
    yearsExperience: {
      type: Number,
      default: 0
    },
    teamSize: {
      type: Number,
      default: 0
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  order: {
    type: Number,
    default: 0,
    index: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
ventureSchema.index({ slug: 1 });
ventureSchema.index({ isActive: 1, order: 1 });

// Virtual for active services
ventureSchema.virtual('activeServices').get(function() {
  return this.services.filter(service => service.isActive)
    .sort((a, b) => a.order - b.order);
});

// Virtual for active projects
ventureSchema.virtual('activeProjects').get(function() {
  return this.projects.filter(project => project.isActive)
    .sort((a, b) => b.completedAt - a.completedAt);
});

// Virtual for featured projects
ventureSchema.virtual('featuredProjects').get(function() {
  return this.projects.filter(project => project.isActive && project.isFeatured)
    .sort((a, b) => b.completedAt - a.completedAt);
});

// Static method to get venture by slug
ventureSchema.statics.getBySlug = function(slug, includeInactive = false) {
  const query = { slug };
  if (!includeInactive) query.isActive = true;
  
  return this.findOne(query)
    .populate('lastModifiedBy', 'name email')
    .lean();
};

// Pre-save middleware to generate slug
ventureSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
  next();
});

module.exports = mongoose.model('Venture', ventureSchema);