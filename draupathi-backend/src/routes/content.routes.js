const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Get all published products
router.get('/products', async (req, res) => {
  try {
    const products = await Content.find({ 
      section: 'products',
      isPublished: true 
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// Get published banners
router.get('/banners', async (req, res) => {
  try {
    const banners = await Content.find({ 
      section: 'banners',
      isPublished: true 
    }).sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: banners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching banners',
      error: error.message
    });
  }
});

// Get published announcements
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Content.find({ 
      section: 'announcements',
      isPublished: true 
    }).sort({ createdAt: -1 }).limit(10);
    
    res.json({
      success: true,
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching announcements',
      error: error.message
    });
  }
});

// Placeholder routes - will be implemented later
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Content API',
    endpoints: [
      'GET /api/content/products - Get all published products',
      'GET /api/content/banners - Get active banners',
      'GET /api/content/announcements - Get announcements',
      'GET /api/content/home - Get home page content',
      'GET /api/content/about - Get about page content',
      'GET /api/content/ventures - Get ventures content',
    ]
  });
});

module.exports = router;