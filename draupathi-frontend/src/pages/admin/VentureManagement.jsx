import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Filter,
  MoreVertical,
  Building2,
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react';

const VentureManagement = () => {
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVenture, setEditingVenture] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVentures();
  }, [currentPage, searchQuery, filterStatus]);

  const fetchVentures = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockVentures = [
        {
          id: 1,
          name: 'D Foods',
          description: 'Premium organic food products and agricultural solutions',
          category: 'Agriculture',
          status: 'active',
          logo: 'https://picsum.photos/100/100?random=1',
          coverImage: 'https://picsum.photos/800/400?random=1',
          established: '2018',
          employees: 45,
          revenue: '$2.5M',
          locations: ['Chennai', 'Bangalore'],
          createdAt: new Date('2023-01-15'),
          updatedAt: new Date('2024-11-01')
        },
        {
          id: 2,
          name: 'IT Solutions',
          description: 'Cutting-edge technology solutions and software development',
          category: 'Technology',
          status: 'active',
          logo: 'https://picsum.photos/100/100?random=2',
          coverImage: 'https://picsum.photos/800/400?random=2',
          established: '2020',
          employees: 28,
          revenue: '$1.8M',
          locations: ['Chennai', 'Hyderabad'],
          createdAt: new Date('2023-02-10'),
          updatedAt: new Date('2024-10-28')
        },
        {
          id: 3,
          name: 'Irrigation Systems',
          description: 'Modern irrigation and water management solutions',
          category: 'Agriculture',
          status: 'active',
          logo: 'https://picsum.photos/100/100?random=3',
          coverImage: 'https://picsum.photos/800/400?random=3',
          established: '2019',
          employees: 32,
          revenue: '$1.2M',
          locations: ['Chennai', 'Coimbatore'],
          createdAt: new Date('2023-03-05'),
          updatedAt: new Date('2024-10-25')
        }
      ];

      setVentures(mockVentures);
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching ventures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVenture = async (ventureData) => {
    try {
      // API call to create venture
      console.log('Creating venture:', ventureData);
      setShowCreateModal(false);
      fetchVentures();
    } catch (error) {
      console.error('Error creating venture:', error);
    }
  };

  const handleUpdateVenture = async (ventureData) => {
    try {
      // API call to update venture
      console.log('Updating venture:', ventureData);
      setShowEditModal(false);
      setEditingVenture(null);
      fetchVentures();
    } catch (error) {
      console.error('Error updating venture:', error);
    }
  };

  const handleDeleteVenture = async (ventureId) => {
    if (window.confirm('Are you sure you want to delete this venture?')) {
      try {
        // API call to delete venture
        console.log('Deleting venture:', ventureId);
        fetchVentures();
      } catch (error) {
        console.error('Error deleting venture:', error);
      }
    }
  };

  const handleToggleStatus = async (ventureId, currentStatus) => {
    try {
      // API call to toggle venture status
      console.log('Toggling venture status:', ventureId, currentStatus);
      fetchVentures();
    } catch (error) {
      console.error('Error toggling venture status:', error);
    }
  };

  const VentureCard = ({ venture }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative">
        <img
          src={venture.coverImage}
          alt={venture.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            venture.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {venture.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={venture.logo}
              alt={venture.name}
              className="w-12 h-12 rounded-lg object-cover border border-gray-200"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{venture.name}</h3>
              <p className="text-sm text-gray-500">{venture.category}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {venture.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Users className="w-5 h-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-900">{venture.employees}</p>
            <p className="text-xs text-gray-500">Employees</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm font-medium text-gray-900">{venture.revenue}</p>
            <p className="text-xs text-gray-500">Revenue</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Est. {venture.established}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setEditingVenture(venture);
                setShowEditModal(true);
              }}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Venture"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleToggleStatus(venture.id, venture.status)}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title={venture.status === 'active' ? 'Deactivate' : 'Activate'}
            >
              {venture.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleDeleteVenture(venture.id)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Venture"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const CreateVentureModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Venture</h2>
        </div>
        
        <form className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venture Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter venture name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select category</option>
                <option value="agriculture">Agriculture</option>
                <option value="technology">Technology</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="services">Services</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter venture description"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Established Year
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employees
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Venture
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Venture Management</h1>
          <p className="text-gray-600 mt-1">Manage your business ventures and portfolios</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Venture
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search ventures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Ventures Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-xl" />
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-16 bg-gray-200 rounded-lg" />
                  <div className="h-16 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : ventures.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No ventures found</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first venture</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Venture
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventures.map((venture) => (
            <VentureCard key={venture.id} venture={venture} />
          ))}
        </div>
      )}

      {/* Modals */}
      {showCreateModal && <CreateVentureModal />}
    </div>
  );
};

export default VentureManagement;