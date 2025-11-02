const express = require('express');
const router = express.Router();

const adminAuthController = require('../controllers/adminAuthController');
const adminUserController = require('../controllers/adminUserController');
const adminDashboardController = require('../controllers/adminDashboardController');
const adminContentController = require('../controllers/adminContentController');
const { authenticateAdmin, authorizeAdmin, requirePermission } = require('../middleware/adminAuth.middleware');
const { validationMiddleware } = require('../middleware/validation.middleware');
const { 
  createUserValidation, 
  updateUserValidation, 
  changePasswordValidation, 
  userIdValidation,
  loginValidation 
} = require('../middleware/adminValidation.middleware');

// Authentication routes
router.post('/auth/login', loginValidation, validationMiddleware, adminAuthController.login);
router.post('/auth/refresh', adminAuthController.refresh);
router.post('/auth/logout', authenticateAdmin, adminAuthController.logout);
router.get('/auth/me', authenticateAdmin, adminAuthController.me);

// User Management routes (Protected)
router.get('/users', 
  authenticateAdmin, 
  requirePermission('users.read'), 
  adminUserController.getAllUsers
);

router.get('/users/:id', 
  authenticateAdmin, 
  requirePermission('users.read'), 
  userIdValidation, 
  adminUserController.getUser
);

router.post('/users', 
  authenticateAdmin, 
  requirePermission('users.create'), 
  createUserValidation, 
  adminUserController.createUser
);

router.put('/users/:id', 
  authenticateAdmin, 
  requirePermission('users.update'), 
  updateUserValidation, 
  adminUserController.updateUser
);

router.delete('/users/:id', 
  authenticateAdmin, 
  requirePermission('users.delete'), 
  userIdValidation, 
  adminUserController.deleteUser
);

router.put('/users/:id/toggle-status', 
  authenticateAdmin, 
  requirePermission('users.update'), 
  userIdValidation, 
  adminUserController.toggleUserStatus
);

router.put('/users/:id/change-password', 
  authenticateAdmin, 
  authorizeAdmin('super_admin'), 
  changePasswordValidation, 
  adminUserController.changeUserPassword
);

router.get('/users/:id/activity', 
  authenticateAdmin, 
  requirePermission('users.read'), 
  userIdValidation, 
  adminUserController.getUserActivity
);

// Dashboard routes
router.get('/dashboard/stats', 
  authenticateAdmin, 
  adminDashboardController.getDashboardStats
);

router.get('/dashboard/activity', 
  authenticateAdmin, 
  adminDashboardController.getRecentActivity
);

router.get('/dashboard/analytics', 
  authenticateAdmin, 
  adminDashboardController.getAnalytics
);

router.get('/dashboard/quick-actions', 
  authenticateAdmin, 
  adminDashboardController.getQuickActions
);

// Content Management routes
router.get('/content', 
  authenticateAdmin, 
  requirePermission('content.read'), 
  adminContentController.getAllContent
);

router.get('/content/stats', 
  authenticateAdmin, 
  requirePermission('content.read'), 
  adminContentController.getContentStats
);

router.get('/content/section/:section', 
  authenticateAdmin, 
  requirePermission('content.read'), 
  adminContentController.getContentBySection
);

router.get('/content/:id', 
  authenticateAdmin, 
  requirePermission('content.read'), 
  adminContentController.getContent
);

router.post('/content', 
  authenticateAdmin, 
  requirePermission('content.create'), 
  adminContentController.createContent
);

router.put('/content/:id', 
  authenticateAdmin, 
  requirePermission('content.update'), 
  adminContentController.updateContent
);

router.delete('/content/:id', 
  authenticateAdmin, 
  requirePermission('content.delete'), 
  adminContentController.deleteContent
);

router.put('/content/:id/toggle-publish', 
  authenticateAdmin, 
  requirePermission('content.update'), 
  adminContentController.togglePublishStatus
);

router.put('/content/section/:section/:key', 
  authenticateAdmin, 
  requirePermission('content.update'), 
  adminContentController.updateSectionContent
);

router.post('/content/bulk-actions', 
  authenticateAdmin, 
  requirePermission('content.update'), 
  adminContentController.bulkContentActions
);

// Basic admin root info (protected)
router.get('/', authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    message: 'Admin API Root',
    user: { id: req.user.id, name: req.user.name, role: req.user.role },
    endpoints: {
      auth: [
        'POST /api/admin/auth/login',
        'POST /api/admin/auth/refresh', 
        'POST /api/admin/auth/logout',
        'GET /api/admin/auth/me'
      ],
      users: [
        'GET /api/admin/users',
        'GET /api/admin/users/:id',
        'POST /api/admin/users',
        'PUT /api/admin/users/:id',
        'DELETE /api/admin/users/:id',
        'PUT /api/admin/users/:id/toggle-status',
        'PUT /api/admin/users/:id/change-password',
        'GET /api/admin/users/:id/activity'
      ]
    }
  });
});

module.exports = router;