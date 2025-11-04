import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Bell,
  Edit3,
  Trash2,
  Eye,
  Send,
  Clock,
  Users,
  Globe,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Megaphone,
  Calendar,
  Target,
  ToggleLeft,
  ToggleRight,
  Archive,
  Pin,
  PinOff
} from 'lucide-react';

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, [searchQuery, statusFilter, typeFilter]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockAnnouncements = [
        {
          id: 1,
          title: 'System Maintenance Scheduled',
          content: 'We will be performing scheduled maintenance on December 15th from 2:00 AM to 4:00 AM EST. During this time, some services may be temporarily unavailable.',
          type: 'maintenance',
          priority: 'high',
          isActive: true,
          isPinned: true,
          targetAudience: 'all',
          scheduledAt: new Date('2024-12-10T10:00:00'),
          expiresAt: new Date('2024-12-16T00:00:00'),
          viewCount: 2450,
          clickCount: 340,
          author: 'System Admin',
          createdAt: new Date('2024-11-25'),
          updatedAt: new Date('2024-12-01'),
          status: 'published'
        },
        {
          id: 2,
          title: 'New Product Launch Event',
          content: 'Join us for the launch of our revolutionary new product line! Special discounts and exclusive access for early adopters.',
          type: 'promotion',
          priority: 'medium',
          isActive: true,
          isPinned: false,
          targetAudience: 'customers',
          scheduledAt: new Date('2024-12-05T09:00:00'),
          expiresAt: new Date('2024-12-25T23:59:59'),
          viewCount: 1890,
          clickCount: 560,
          author: 'Marketing Team',
          createdAt: new Date('2024-11-20'),
          updatedAt: new Date('2024-11-28'),
          status: 'published'
        },
        {
          id: 3,
          title: 'Holiday Office Hours',
          content: 'Please note our modified office hours during the holiday season. Customer support will be available with limited hours.',
          type: 'info',
          priority: 'low',
          isActive: false,
          isPinned: false,
          targetAudience: 'all',
          scheduledAt: new Date('2024-12-20T00:00:00'),
          expiresAt: new Date('2025-01-05T23:59:59'),
          viewCount: 0,
          clickCount: 0,
          author: 'HR Department',
          createdAt: new Date('2024-12-01'),
          updatedAt: new Date('2024-12-01'),
          status: 'draft'
        },
        {
          id: 4,
          title: 'Security Alert: Password Policy Update',
          content: 'Important: We have updated our password policy to enhance security. Please update your passwords to meet the new requirements.',
          type: 'alert',
          priority: 'urgent',
          isActive: true,
          isPinned: true,
          targetAudience: 'users',
          scheduledAt: new Date('2024-11-30T08:00:00'),
          expiresAt: new Date('2024-12-30T23:59:59'),
          viewCount: 3200,
          clickCount: 1200,
          author: 'Security Team',
          createdAt: new Date('2024-11-28'),
          updatedAt: new Date('2024-11-30'),
          status: 'published'
        }
      ];

      setAnnouncements(mockAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (announcementId) => {
    try {
      setAnnouncements(announcements.map(announcement => 
        announcement.id === announcementId 
          ? { ...announcement, isActive: !announcement.isActive }
          : announcement
      ));
    } catch (error) {
      console.error('Error toggling announcement status:', error);
    }
  };

  const handleTogglePin = async (announcementId) => {
    try {
      setAnnouncements(announcements.map(announcement => 
        announcement.id === announcementId 
          ? { ...announcement, isPinned: !announcement.isPinned }
          : announcement
      ));
    } catch (error) {
      console.error('Error toggling pin status:', error);
    }
  };

  const handleDelete = async (announcementId) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        setAnnouncements(announcements.filter(announcement => announcement.id !== announcementId));
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    }
  };

  const getTypeConfig = (type) => {
    const configs = {
      maintenance: { 
        icon: <Clock className="w-4 h-4" />, 
        color: 'bg-orange-100 text-orange-800', 
        label: 'Maintenance' 
      },
      promotion: { 
        icon: <Megaphone className="w-4 h-4" />, 
        color: 'bg-green-100 text-green-800', 
        label: 'Promotion' 
      },
      info: { 
        icon: <Info className="w-4 h-4" />, 
        color: 'bg-blue-100 text-blue-800', 
        label: 'Information' 
      },
      alert: { 
        icon: <AlertCircle className="w-4 h-4" />, 
        color: 'bg-red-100 text-red-800', 
        label: 'Alert' 
      },
      update: { 
        icon: <CheckCircle className="w-4 h-4" />, 
        color: 'bg-purple-100 text-purple-800', 
        label: 'Update' 
      }
    };
    
    return configs[type] || configs.info;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      urgent: { color: 'bg-red-500', label: 'Urgent' },
      high: { color: 'bg-orange-500', label: 'High' },
      medium: { color: 'bg-yellow-500', label: 'Medium' },
      low: { color: 'bg-green-500', label: 'Low' }
    };
    
    return configs[priority] || configs.low;
  };

  const AnnouncementCard = ({ announcement }) => {
    const typeConfig = getTypeConfig(announcement.type);
    const priorityConfig = getPriorityConfig(announcement.priority);
    const isExpired = new Date() > new Date(announcement.expiresAt);
    const isScheduled = new Date() < new Date(announcement.scheduledAt);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3 flex-1">
              {announcement.isPinned && (
                <div className="flex-shrink-0 mt-1">
                  <Pin className="w-4 h-4 text-yellow-500" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}>
                    {typeConfig.icon}
                    <span className="ml-1">{typeConfig.label}</span>
                  </span>
                  <div className={`w-2 h-2 rounded-full ${priorityConfig.color}`} title={`${priorityConfig.label} Priority`} />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    announcement.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {announcement.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {announcement.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {announcement.content}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {announcement.targetAudience}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(announcement.scheduledAt).toLocaleDateString()}
                  </span>
                  <span>by {announcement.author}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => handleTogglePin(announcement.id)}
                className={`p-2 rounded-lg transition-colors ${
                  announcement.isPinned
                    ? 'text-yellow-600 hover:bg-yellow-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title={announcement.isPinned ? 'Unpin' : 'Pin'}
              >
                {announcement.isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleToggleStatus(announcement.id)}
                className={`p-2 rounded-lg transition-colors ${
                  announcement.isActive 
                    ? 'text-green-600 hover:bg-green-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title={announcement.isActive ? 'Deactivate' : 'Activate'}
              >
                {announcement.isActive ? (
                  <ToggleRight className="w-4 h-4" />
                ) : (
                  <ToggleLeft className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setEditingAnnouncement(announcement)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(announcement.id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Eye className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-xs font-medium text-blue-600">Views</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {announcement.viewCount.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Target className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-xs font-medium text-green-600">Clicks</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {announcement.clickCount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Expiry Status */}
          {isExpired && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center text-red-800 text-sm">
                <XCircle className="w-4 h-4 mr-2" />
                <span>This announcement has expired</span>
              </div>
            </div>
          )}
          
          {isScheduled && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center text-yellow-800 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>Scheduled to publish on {new Date(announcement.scheduledAt).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const CreateAnnouncementModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter announcement title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  placeholder="Enter announcement content"
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="info">Information</option>
                    <option value="alert">Alert</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="promotion">Promotion</option>
                    <option value="update">Update</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience *
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">All Users</option>
                  <option value="customers">Customers Only</option>
                  <option value="users">Registered Users</option>
                  <option value="premium">Premium Members</option>
                  <option value="staff">Staff Members</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publish Date *
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pin to top</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Send notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow comments</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Call to Action (Optional)
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Button text (e.g., Learn More)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    placeholder="Button link (e.g., https://example.com)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {editingAnnouncement ? 'Last updated: ' + editingAnnouncement.updatedAt.toLocaleString() : 'Creating new announcement'}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setShowCreateModal(false);
                setEditingAnnouncement(null);
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Save Draft
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {editingAnnouncement ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcement Management</h1>
          <p className="text-gray-600 mt-1">Create and manage system-wide announcements</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Announcement
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="scheduled">Scheduled</option>
              <option value="expired">Expired</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="info">Information</option>
              <option value="alert">Alert</option>
              <option value="maintenance">Maintenance</option>
              <option value="promotion">Promotion</option>
              <option value="update">Update</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Announcements', value: announcements.length, icon: Bell, color: 'blue' },
          { label: 'Active', value: announcements.filter(a => a.isActive).length, icon: CheckCircle, color: 'green' },
          { label: 'Pinned', value: announcements.filter(a => a.isPinned).length, icon: Pin, color: 'yellow' },
          { label: 'Total Views', value: announcements.reduce((sum, a) => sum + a.viewCount, 0).toLocaleString(), icon: Eye, color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Announcements List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 animate-pulse p-6">
              <div className="h-6 bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
              <div className="flex space-x-4">
                <div className="h-12 bg-gray-200 rounded flex-1" />
                <div className="h-12 bg-gray-200 rounded flex-1" />
              </div>
            </div>
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
          <p className="text-gray-600 mb-4">Create your first announcement to keep users informed</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Announcement
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreateModal || editingAnnouncement) && <CreateAnnouncementModal />}
    </div>
  );
};

export default AnnouncementManagement;