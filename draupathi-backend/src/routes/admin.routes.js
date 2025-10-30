const express = require('express');
const router = express.Router();

// Placeholder routes - will be implemented later
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Admin routes - coming soon',
    endpoints: [
      'GET /api/admin/dashboard - Admin dashboard analytics',
      'POST /api/admin/content - Update content',
      'GET /api/admin/banners - Manage banners',
      'GET /api/admin/ventures - Manage ventures',
      'GET /api/admin/products - Manage products',
    ]
  });
});

module.exports = router;