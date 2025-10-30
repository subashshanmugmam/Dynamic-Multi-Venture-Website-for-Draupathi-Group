const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Create storage for different types of uploads
const createCloudinaryStorage = (folder = 'draupathi-group', allowedFormats = ['jpg', 'jpeg', 'png', 'webp']) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      allowed_formats: allowedFormats,
      transformation: [
        { width: 1920, height: 1080, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      public_id: (req, file) => {
        const timestamp = Date.now();
        const originalName = file.originalname.split('.')[0];
        return `${originalName}-${timestamp}`;
      },
    },
  });
};

// Storage configurations for different upload types
const storageConfigs = {
  banners: createCloudinaryStorage('draupathi-group/banners'),
  products: createCloudinaryStorage('draupathi-group/products'),
  ventures: createCloudinaryStorage('draupathi-group/ventures'),
  announcements: createCloudinaryStorage('draupathi-group/announcements'),
  general: createCloudinaryStorage('draupathi-group/general'),
  documents: createCloudinaryStorage('draupathi-group/documents', ['pdf', 'doc', 'docx', 'txt']),
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Helper function to get optimized image URL
const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 800,
    height = 600,
    crop = 'fill',
    quality = 'auto:good',
    format = 'auto'
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    fetch_format: format,
    secure: true,
  });
};

// Helper function to get image details
const getImageDetails = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return result;
  } catch (error) {
    console.error('Error getting image details from Cloudinary:', error);
    throw error;
  }
};

module.exports = {
  cloudinary,
  storageConfigs,
  deleteFromCloudinary,
  getOptimizedImageUrl,
  getImageDetails,
};