const express = require('express');
const router = express.Router();

// Placeholder routes - will be implemented later
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Content routes - coming soon',
    endpoints: [
      'GET /api/content/home - Get home page content',
      'GET /api/content/about - Get about page content',
      'GET /api/content/ventures - Get ventures content',
      'GET /api/content/banners - Get active banners',
      'GET /api/content/announcements - Get announcements',
    ]
  });
});

module.exports = router;