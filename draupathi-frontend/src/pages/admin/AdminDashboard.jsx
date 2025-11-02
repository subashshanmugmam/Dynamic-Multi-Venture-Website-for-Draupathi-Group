import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Eye,
  TrendingUp,
  Calendar,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Globe,
  MessageSquare
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch dashboard stats
      const [statsRes, activityRes, analyticsRes] = await Promise.all([
        fetch('/api/admin/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/admin/dashboard/activity', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/admin/dashboard/analytics', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const [statsData, activityData, analyticsData] = await Promise.all([
        statsRes.json(),
        activityRes.json(),
        analyticsRes.json()
      ]);

      if (statsData.success) setStats(statsData.data);
      if (activityData.success) setRecentActivity(activityData.data);
      if (analyticsData.success) setAnalytics(analyticsData.data);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, change, changeType, icon: _Icon, color, loading }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {loading ? (
            <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          )}
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <TrendingUp className={`w-4 h-4 mr-1 ${
                changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`} />
              <span className={`text-sm font-medium ${
                changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (action) => {
      switch (action) {
        case 'create': return <CheckCircle className="w-4 h-4 text-green-500" />;
        case 'update': return <Activity className="w-4 h-4 text-blue-500" />;
        case 'delete': return <AlertTriangle className="w-4 h-4 text-red-500" />;
        default: return <Clock className="w-4 h-4 text-gray-500" />;
      }
    };

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    };

    return (
      <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex-shrink-0 mt-0.5">
          {getActivityIcon(activity.action)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">
            <span className="font-medium">{activity.user?.name || 'Unknown User'}</span>
            {' '}
            <span className="text-gray-600">{activity.action}d</span>
            {' '}
            <span className="font-medium">{activity.resourceType}</span>
            {activity.resourceName && (
              <>
                {' '}
                <span className="text-gray-600">"{activity.resourceName}"</span>
              </>
            )}
          </p>
          <p className="text-xs text-gray-500 mt-1">{formatTime(activity.createdAt)}</p>
        </div>
      </div>
    );
  };

  if (loading && !stats) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          change={analytics?.userGrowth}
          changeType={analytics?.userGrowth >= 0 ? 'positive' : 'negative'}
          icon={Users}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          loading={loading}
        />
        <StatCard
          title="Total Content"
          value={stats?.totalContent || 0}
          change={analytics?.contentGrowth}
          changeType={analytics?.contentGrowth >= 0 ? 'positive' : 'negative'}
          icon={FileText}
          color="bg-gradient-to-r from-green-500 to-green-600"
          loading={loading}
        />
        <StatCard
          title="Page Views"
          value={stats?.totalViews || 0}
          change={analytics?.viewsGrowth}
          changeType={analytics?.viewsGrowth >= 0 ? 'positive' : 'negative'}
          icon={Eye}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          loading={loading}
        />
        <StatCard
          title="Active Sessions"
          value={stats?.activeSessions || 0}
          icon={Activity}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          loading={loading}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-3">
              {recentActivity.length > 0 ? (
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {recentActivity.map((activity) => (
                    <ActivityItem key={activity._id} activity={activity} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Server</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">CDN</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="flex items-center gap-3 w-full p-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Add User</span>
              </button>
              <button className="flex items-center gap-3 w-full p-3 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all">
                <FileText className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Create Content</span>
              </button>
              <button className="flex items-center gap-3 w-full p-3 text-left rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">View Messages</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Analytics Overview</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{analytics.totalPageViews || 0}</div>
              <div className="text-sm text-gray-600">Total Page Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{analytics.uniqueVisitors || 0}</div>
              <div className="text-sm text-gray-600">Unique Visitors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{analytics.bounceRate || 0}%</div>
              <div className="text-sm text-gray-600">Bounce Rate</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;