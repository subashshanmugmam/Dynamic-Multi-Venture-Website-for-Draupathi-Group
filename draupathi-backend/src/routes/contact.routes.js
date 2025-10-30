const express = require('express');
const router = express.Router();

// Placeholder routes - will be implemented later
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Contact routes - coming soon',
    endpoints: [
      'POST /api/contact/submit - Submit contact form',
      'GET /api/contact/info - Get contact information',
    ]
  });
});

module.exports = router;