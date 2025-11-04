import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  MoreVertical,
  Calendar,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  ToggleLeft,
  ToggleRight,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  Image as ImageIcon
} from 'lucide-react';

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, [searchQuery, statusFilter]);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockBanners = [
        {
          id: 1,
          title: 'Holiday Sale 2024',
          description: 'Get up to 50% off on all products',
          imageUrl: 'https://picsum.photos/1200/400?random=30',
          link: '/products?sale=holiday',
          isActive: true,
          position: 'hero',
          startDate: new Date('2024-12-01'),
          endDate: new Date('2024-12-31'),
          clickCount: 1250,
          impressions: 45000,
          targetAudience: 'all',
          deviceTargeting: ['desktop', 'mobile', 'tablet'],
          priority: 1,
          backgroundColor: '#FF6B6B',
          textColor: '#FFFFFF',
          buttonText: 'Shop Now',
          buttonColor: '#4ECDC4',
          createdAt: new Date('2024-11-15'),
          updatedAt: new Date('2024-11-20')
        },
        {
          id: 2,
          title: 'New Product Launch',
          description: 'Introducing our latest innovation',
          imageUrl: 'https://picsum.photos/800/300?random=31',
          link: '/products/new-launch',
          isActive: true,
          position: 'secondary',
          startDate: new Date('2024-11-01'),
          endDate: new Date('2024-12-15'),
          clickCount: 890,
          impressions: 32000,
          targetAudience: 'premium',
          deviceTargeting: ['desktop', 'mobile'],
          priority: 2,
          backgroundColor: '#4ECDC4',
          textColor: '#2C3E50',
          buttonText: 'Learn More',
          buttonColor: '#FF6B6B',
          createdAt: new Date('2024-10-25'),
          updatedAt: new Date('2024-11-18')
        },
        {
          id: 3,
          title: 'Free Shipping Weekend',
          description: 'Free delivery on orders over $50',
          imageUrl: 'https://picsum.photos/600/200?random=32',
          link: '/shipping-info',
          isActive: false,
          position: 'footer',
          startDate: new Date('2024-10-15'),
          endDate: new Date('2024-10-17'),
          clickCount: 456,
          impressions: 15000,
          targetAudience: 'new-customers',
          deviceTargeting: ['mobile'],
          priority: 3,
          backgroundColor: '#95E1D3',
          textColor: '#2C3E50',
          buttonText: 'Order Now',
          buttonColor: '#F38BA8',
          createdAt: new Date('2024-10-10'),
          updatedAt: new Date('2024-10-18')
        }
      ];

      setBanners(mockBanners);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (bannerId) => {
    try {
      setBanners(banners.map(banner => 
        banner.id === bannerId 
          ? { ...banner, isActive: !banner.isActive }
          : banner
      ));
    } catch (error) {
      console.error('Error toggling banner status:', error);
    }
  };

  const handleDelete = async (bannerId) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        setBanners(banners.filter(banner => banner.id !== bannerId));
      } catch (error) {
        console.error('Error deleting banner:', error);
      }
    }
  };

  const getPositionBadge = (position) => {
    const positions = {
      hero: { color: 'bg-purple-100 text-purple-800', label: 'Hero' },
      secondary: { color: 'bg-blue-100 text-blue-800', label: 'Secondary' },
      sidebar: { color: 'bg-green-100 text-green-800', label: 'Sidebar' },
      footer: { color: 'bg-gray-100 text-gray-800', label: 'Footer' }
    };
    
    const config = positions[position] || positions.hero;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getDeviceIcons = (devices) => {
    const iconMap = {
      desktop: <Monitor className="w-4 h-4" />,
      mobile: <Smartphone className="w-4 h-4" />,
      tablet: <Tablet className="w-4 h-4" />
    };
    
    return (
      <div className="flex space-x-1">
        {devices.map(device => (
          <div key={device} className="text-gray-500" title={device}>
            {iconMap[device]}
          </div>
        ))}
      </div>
    );
  };

  const BannerCard = ({ banner }) => {
    const ctr = banner.impressions > 0 ? ((banner.clickCount / banner.impressions) * 100).toFixed(2) : 0;
    const isExpired = new Date() > new Date(banner.endDate);
    const isScheduled = new Date() < new Date(banner.startDate);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      >
        <div className="relative">
          <img
            src={banner.imageUrl}
            alt={banner.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            {getPositionBadge(banner.position)}
          </div>
          <div className="absolute top-3 right-3 flex space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              banner.isActive && !isExpired 
                ? 'bg-green-100 text-green-800' 
                : isScheduled
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {banner.isActive && !isExpired ? 'Active' : isScheduled ? 'Scheduled' : 'Inactive'}
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleStatus(banner.id);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  banner.isActive 
                    ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {banner.isActive ? (
                  <ToggleRight className="w-4 h-4" />
                ) : (
                  <ToggleLeft className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {banner.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {banner.description}
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>Priority: {banner.priority}</span>
                <span>{banner.targetAudience}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => setEditingBanner(banner)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit Banner"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(banner.id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Banner"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Eye className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-xs font-medium text-blue-600">Impressions</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {banner.impressions.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Zap className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-xs font-medium text-green-600">Clicks</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {banner.clickCount.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <BarChart3 className="w-4 h-4 text-purple-600 mr-1" />
                <span className="text-xs font-medium text-purple-600">CTR</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {ctr}%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {new Date(banner.startDate).toLocaleDateString()} - {new Date(banner.endDate).toLocaleDateString()}
              </span>
            </div>
            {getDeviceIcons(banner.deviceTargeting)}
          </div>
        </div>
      </motion.div>
    );
  };

  const CreateBannerModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingBanner ? 'Edit Banner' : 'Create New Banner'}
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter banner title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter banner description"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position *
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="hero">Hero Banner</option>
                    <option value="secondary">Secondary Banner</option>
                    <option value="sidebar">Sidebar Banner</option>
                    <option value="footer">Footer Banner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Upload banner image</p>
                  <p className="text-xs text-gray-500 mb-4">Recommended: 1200x400px, JPG or PNG</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Select Image
                  </button>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">All Visitors</option>
                  <option value="new-customers">New Customers</option>
                  <option value="returning-customers">Returning Customers</option>
                  <option value="premium">Premium Members</option>
                  <option value="mobile-users">Mobile Users</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Targeting
                </label>
                <div className="space-y-2">
                  {['desktop', 'mobile', 'tablet'].map(device => (
                    <label key={device} className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{device}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    defaultValue="#FF6B6B"
                    className="w-full h-12 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <input
                    type="color"
                    defaultValue="#FFFFFF"
                    className="w-full h-12 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    placeholder="Shop Now"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Color
                  </label>
                  <input
                    type="color"
                    defaultValue="#4ECDC4"
                    className="w-full h-12 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={() => {
              setShowCreateModal(false);
              setEditingBanner(null);
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {editingBanner ? 'Update Banner' : 'Create Banner'}
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
          <p className="text-gray-600 mt-1">Create and manage promotional banners</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Banner
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
              placeholder="Search banners..."
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
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Banners', value: banners.length, icon: Globe, color: 'blue' },
          { label: 'Active Banners', value: banners.filter(b => b.isActive).length, icon: CheckCircle, color: 'green' },
          { label: 'Total Impressions', value: banners.reduce((sum, b) => sum + b.impressions, 0).toLocaleString(), icon: Eye, color: 'purple' },
          { label: 'Total Clicks', value: banners.reduce((sum, b) => sum + b.clickCount, 0).toLocaleString(), icon: Zap, color: 'yellow' }
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

      {/* Banner Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 animate-pulse overflow-hidden">
              <div className="h-48 bg-gray-200" />
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-3" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center py-12">
          <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No banners found</h3>
          <p className="text-gray-600 mb-4">Create your first promotional banner to get started</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Banner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreateModal || editingBanner) && <CreateBannerModal />}
    </div>
  );
};

export default BannerManagement;