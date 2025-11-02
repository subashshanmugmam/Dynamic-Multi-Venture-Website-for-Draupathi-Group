const AdminUser = require('../models/AdminUser');
const ActivityLog = require('../models/ActivityLog');
const Contact = require('../models/Contact');
const Product = require('../models/Product');
const Venture = require('../models/Venture');
const Banner = require('../models/Banner');

// Get dashboard overview statistics
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Get basic counts
    const [
      totalUsers,
      activeUsers,
      totalContacts,
      unreadContacts,
      totalProducts,
      activeProducts,
      totalBanners,
      activeBanners,
      recentActivity
    ] = await Promise.all([
      AdminUser.countDocuments(),
      AdminUser.countDocuments({ isActive: true }),
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Product.countDocuments(),
      Product.countDocuments({ isPublished: true }),
      Banner.countDocuments(),
      Banner.countDocuments({ isActive: true }),
      ActivityLog.find()
        .populate('userId', 'name email')
        .sort({ timestamp: -1 })
        .limit(10)
    ]);

    // Get activity stats for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyActivity = await ActivityLog.aggregate([
      {
        $match: {
          timestamp: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Get top actions in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const topActions = await ActivityLog.aggregate([
      {
        $match: {
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Get user activity distribution
    const userActivity = await ActivityLog.aggregate([
      {
        $match: {
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: '$userId',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'adminusers',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          name: '$user.name',
          email: '$user.email',
          count: 1
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          users: {
            total: totalUsers,
            active: activeUsers,
            inactive: totalUsers - activeUsers
          },
          contacts: {
            total: totalContacts,
            unread: unreadContacts,
            read: totalContacts - unreadContacts
          },
          products: {
            total: totalProducts,
            published: activeProducts,
            draft: totalProducts - activeProducts
          },
          banners: {
            total: totalBanners,
            active: activeBanners,
            inactive: totalBanners - activeBanners
          }
        },
        activity: {
          recent: recentActivity,
          weekly: weeklyActivity,
          topActions: topActions,
          userActivity: userActivity
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get recent activity feed
exports.getRecentActivity = async (req, res, next) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const activities = await ActivityLog.find()
      .populate('userId', 'name email avatar')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ActivityLog.countDocuments();

    res.json({
      success: true,
      data: {
        activities,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get analytics data for charts
exports.getAnalytics = async (req, res, next) => {
  try {
    const { period = '7d' } = req.query;
    
    let startDate = new Date();
    switch (period) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    // Activity trend
    const activityTrend = await ActivityLog.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { 
              format: period === '24h' ? "%Y-%m-%d %H:00" : "%Y-%m-%d", 
              date: "$timestamp" 
            }
          },
          count: { $sum: 1 },
          uniqueUsers: { $addToSet: "$userId" }
        }
      },
      {
        $project: {
          date: '$_id',
          activity: '$count',
          users: { $size: '$uniqueUsers' }
        }
      },
      {
        $sort: { date: 1 }
      }
    ]);

    // Action distribution
    const actionDistribution = await ActivityLog.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Resource type distribution
    const resourceDistribution = await ActivityLog.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          resourceType: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: '$resourceType',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        period,
        activityTrend,
        actionDistribution,
        resourceDistribution
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get quick actions data
exports.getQuickActions = async (req, res, next) => {
  try {
    const quickActions = [
      {
        title: 'Create User',
        description: 'Add a new admin user',
        icon: 'UserPlus',
        color: 'blue',
        action: 'create-user',
        permission: 'users.create'
      },
      {
        title: 'Upload Media',
        description: 'Add images or documents',
        icon: 'Upload',
        color: 'green',
        action: 'upload-media',
        permission: 'media.upload'
      },
      {
        title: 'Create Product',
        description: 'Add a new product',
        icon: 'Package',
        color: 'purple',
        action: 'create-product',
        permission: 'products.create'
      },
      {
        title: 'Create Banner',
        description: 'Add a new banner',
        icon: 'Image',
        color: 'orange',
        action: 'create-banner',
        permission: 'banners.create'
      },
      {
        title: 'View Contacts',
        description: 'Check form submissions',
        icon: 'Mail',
        color: 'indigo',
        action: 'view-contacts',
        permission: 'content.read'
      },
      {
        title: 'System Settings',
        description: 'Configure system',
        icon: 'Settings',
        color: 'gray',
        action: 'system-settings',
        permission: 'settings.update'
      }
    ];

    // Filter actions based on user permissions
    const userPermissions = req.user.permissions || [];
    const isSuperAdmin = req.user.role === 'super_admin';

    const allowedActions = quickActions.filter(action => 
      isSuperAdmin || userPermissions.includes(action.permission)
    );

    res.json({
      success: true,
      data: { quickActions: allowedActions }
    });
  } catch (error) {
    next(error);
  }
};