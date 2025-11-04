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
  Package,
  Star,
  DollarSign,
  Tag,
  Image as ImageIcon,
  MoreVertical
} from 'lucide-react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery, filterCategory, filterStatus]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockProducts = [
        {
          id: 1,
          name: 'Premium Basmati Rice',
          description: 'High-quality organic basmati rice sourced from the foothills of Himalayas',
          category: 'D Foods',
          price: 12.99,
          originalPrice: 15.99,
          stock: 150,
          sku: 'DF-RICE-001',
          status: 'published',
          featured: true,
          rating: 4.8,
          reviews: 124,
          image: 'https://picsum.photos/300/300?random=10',
          images: ['https://picsum.photos/300/300?random=10', 'https://picsum.photos/300/300?random=11'],
          tags: ['organic', 'premium', 'basmati'],
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-11-01')
        },
        {
          id: 2,
          name: 'Smart Irrigation Controller',
          description: 'IoT-enabled irrigation system with mobile app control',
          category: 'Irrigation Systems',
          price: 299.99,
          originalPrice: 399.99,
          stock: 45,
          sku: 'IR-CTRL-001',
          status: 'published',
          featured: false,
          rating: 4.6,
          reviews: 89,
          image: 'https://picsum.photos/300/300?random=12',
          images: ['https://picsum.photos/300/300?random=12', 'https://picsum.photos/300/300?random=13'],
          tags: ['iot', 'smart', 'irrigation'],
          createdAt: new Date('2024-02-10'),
          updatedAt: new Date('2024-10-28')
        },
        {
          id: 3,
          name: 'Web Development Package',
          description: 'Complete web development solution for businesses',
          category: 'IT Solutions',
          price: 1999.99,
          originalPrice: 2499.99,
          stock: 0,
          sku: 'IT-WEB-001',
          status: 'draft',
          featured: true,
          rating: 4.9,
          reviews: 56,
          image: 'https://picsum.photos/300/300?random=14',
          images: ['https://picsum.photos/300/300?random=14'],
          tags: ['web', 'development', 'business'],
          createdAt: new Date('2024-03-05'),
          updatedAt: new Date('2024-10-25')
        }
      ];

      setProducts(mockProducts);
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      console.log('Creating product:', productData);
      setShowCreateModal(false);
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      console.log('Updating product:', productData);
      setShowEditModal(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        console.log('Deleting product:', productId);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      console.log('Toggling product status:', productId, currentStatus);
      fetchProducts();
    } catch (error) {
      console.error('Error toggling product status:', error);
    }
  };

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.status === 'published' 
              ? 'bg-green-100 text-green-800' 
              : product.status === 'draft'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {product.status === 'published' ? 'Published' : product.status === 'draft' ? 'Draft' : 'Inactive'}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          {product.featured && (
            <div className="p-1.5 bg-amber-100 rounded-full">
              <Star className="w-3 h-3 text-amber-600 fill-current" />
            </div>
          )}
          <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
            <MoreVertical className="w-3 h-3 text-gray-600" />
          </button>
        </div>
        {product.originalPrice > product.price && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500">{product.category}</p>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-amber-400 fill-current" />
            <span className="text-xs font-medium text-gray-900">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-bold text-gray-900">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center space-x-1">
            <Package className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">Stock: {product.stock}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Tag className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">{product.sku}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
            {product.tags.length > 2 && (
              <span className="text-xs text-gray-500">+{product.tags.length - 2}</span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => {
                setEditingProduct(product);
                setShowEditModal(true);
              }}
              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Edit Product"
            >
              <Edit3 className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleToggleStatus(product.id, product.status)}
              className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
              title={product.status === 'published' ? 'Unpublish' : 'Publish'}
            >
              {product.status === 'published' ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </button>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete Product"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const CreateProductModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Product</h2>
        </div>
        
        <form className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select category</option>
                <option value="d-foods">D Foods</option>
                <option value="irrigation-systems">Irrigation Systems</option>
                <option value="it-solutions">IT Solutions</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="PRD-001"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm font-medium text-gray-700">Featured Product</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">Drop images here or click to upload</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB each</p>
              <input type="file" multiple accept="image/*" className="hidden" />
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
              Create Product
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
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage your products across all ventures</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="d-foods">D Foods</option>
            <option value="irrigation-systems">Irrigation Systems</option>
            <option value="it-solutions">IT Solutions</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-xl" />
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded mb-4" />
                <div className="h-3 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first product</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Modals */}
      {showCreateModal && <CreateProductModal />}
    </div>
  );
};

export default ProductManagement;