import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Search,
  Filter,
  Grid3X3,
  List,
  Download,
  Trash2,
  Edit3,
  Eye,
  Copy,
  FolderPlus,
  Image as ImageIcon,
  Video,
  FileText,
  File,
  MoreVertical,
  Calendar,
  HardDrive
} from 'lucide-react';

const MediaLibrary = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentFolder, setCurrentFolder] = useState('/');
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetchMediaFiles();
  }, [searchQuery, filterType, currentFolder]);

  const fetchMediaFiles = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockFiles = [
        {
          id: 1,
          name: 'hero-banner.jpg',
          type: 'image',
          mimeType: 'image/jpeg',
          size: 2048576, // 2MB
          url: 'https://picsum.photos/800/400?random=20',
          thumbnail: 'https://picsum.photos/300/200?random=20',
          folder: '/banners',
          uploadedBy: 'Admin User',
          createdAt: new Date('2024-10-15'),
          dimensions: { width: 1920, height: 1080 }
        },
        {
          id: 2,
          name: 'product-demo.mp4',
          type: 'video',
          mimeType: 'video/mp4',
          size: 15728640, // 15MB
          url: 'https://picsum.photos/640/360?random=21',
          thumbnail: 'https://picsum.photos/300/200?random=21',
          folder: '/products',
          uploadedBy: 'Admin User',
          createdAt: new Date('2024-10-20'),
          duration: 120 // seconds
        },
        {
          id: 3,
          name: 'company-profile.pdf',
          type: 'document',
          mimeType: 'application/pdf',
          size: 1024000, // 1MB
          url: 'https://picsum.photos/600/800?random=22',
          thumbnail: 'https://picsum.photos/150/200?random=22',
          folder: '/documents',
          uploadedBy: 'Admin User',
          createdAt: new Date('2024-10-25'),
          pages: 12
        },
        {
          id: 4,
          name: 'logo.png',
          type: 'image',
          mimeType: 'image/png',
          size: 512000, // 512KB
          url: 'https://picsum.photos/400/400?random=23',
          thumbnail: 'https://picsum.photos/200/200?random=23',
          folder: '/logos',
          uploadedBy: 'Admin User',
          createdAt: new Date('2024-11-01'),
          dimensions: { width: 512, height: 512 }
        }
      ];

      setMediaFiles(mockFiles);
      
      // Extract unique folders
      const uniqueFolders = [...new Set(mockFiles.map(file => file.folder))];
      setFolders(uniqueFolders);
    } catch (error) {
      console.error('Error fetching media files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (files) => {
    try {
      console.log('Uploading files:', files);
      setShowUploadModal(false);
      fetchMediaFiles();
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleDelete = async (fileIds) => {
    if (window.confirm(`Are you sure you want to delete ${fileIds.length} file(s)?`)) {
      try {
        console.log('Deleting files:', fileIds);
        setSelectedFiles([]);
        fetchMediaFiles();
      } catch (error) {
        console.error('Error deleting files:', error);
      }
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    // Show toast notification
    console.log('URL copied to clipboard');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const MediaCard = ({ file }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
        selectedFiles.includes(file.id) 
          ? 'border-blue-500 shadow-md' 
          : 'border-gray-200'
      }`}
      onClick={() => {
        if (selectedFiles.includes(file.id)) {
          setSelectedFiles(selectedFiles.filter(id => id !== file.id));
        } else {
          setSelectedFiles([...selectedFiles, file.id]);
        }
      }}
    >
      <div className="relative">
        <div className="aspect-video bg-gray-100 rounded-t-xl overflow-hidden">
          {file.type === 'image' ? (
            <img
              src={file.thumbnail}
              alt={file.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-400">
                {getFileIcon(file.type)}
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyUrl(file.url);
            }}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
            title="Copy URL"
          >
            <Copy className="w-3 h-3 text-gray-600" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
          >
            <MoreVertical className="w-3 h-3 text-gray-600" />
          </button>
        </div>

        {selectedFiles.includes(file.id) && (
          <div className="absolute top-2 left-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
          {file.name}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{formatFileSize(file.size)}</span>
          <span>{file.type}</span>
        </div>

        {file.dimensions && (
          <div className="text-xs text-gray-500 mb-2">
            {file.dimensions.width} × {file.dimensions.height}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{file.uploadedBy}</span>
          <span>{file.createdAt.toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );

  const MediaListItem = ({ file }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-white border-l-4 transition-all cursor-pointer hover:shadow-sm ${
        selectedFiles.includes(file.id) 
          ? 'border-l-blue-500 bg-blue-50' 
          : 'border-l-transparent'
      }`}
      onClick={() => {
        if (selectedFiles.includes(file.id)) {
          setSelectedFiles(selectedFiles.filter(id => id !== file.id));
        } else {
          setSelectedFiles([...selectedFiles, file.id]);
        }
      }}
    >
      <div className="flex items-center p-4 space-x-4">
        <div className="flex-shrink-0">
          {file.type === 'image' ? (
            <img
              src={file.thumbnail}
              alt={file.name}
              className="w-12 h-12 object-cover rounded-lg border border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <div className="text-gray-400">
                {getFileIcon(file.type)}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </h3>
          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
            <span>{file.type.toUpperCase()}</span>
            <span>{formatFileSize(file.size)}</span>
            {file.dimensions && (
              <span>{file.dimensions.width} × {file.dimensions.height}</span>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0 text-right">
          <div className="text-xs text-gray-500">{file.uploadedBy}</div>
          <div className="text-xs text-gray-500">{file.createdAt.toLocaleDateString()}</div>
        </div>
        
        <div className="flex-shrink-0 flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyUrl(file.url);
            }}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Copy URL"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(file.url, '_blank');
            }}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="View File"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const UploadModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Upload Media Files</h2>
        </div>
        
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your files</h3>
            <p className="text-gray-600 mb-4">Drag and drop files here, or click to select files</p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-4">
              <span>Images: JPG, PNG, GIF</span>
              <span>Videos: MP4, MOV</span>
              <span>Documents: PDF, DOC</span>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Select Files
            </button>
            <input type="file" multiple className="hidden" />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload to Folder
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="/">Root Directory</option>
              <option value="/banners">Banners</option>
              <option value="/products">Products</option>
              <option value="/documents">Documents</option>
              <option value="/logos">Logos</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={() => setShowUploadModal(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Start Upload
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
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-1">Manage your media files and assets</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Files
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
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {selectedFiles.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedFiles.length} selected</span>
              <button
                onClick={() => handleDelete(selectedFiles)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Selected"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Storage Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HardDrive className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Storage Usage</h3>
              <p className="text-xs text-gray-600">2.4 GB used of 10 GB available</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{mediaFiles.length} files</div>
            <div className="text-xs text-gray-600">in {folders.length} folders</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="bg-white rounded-full h-2 overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: '24%' }} />
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      {loading ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
          : "space-y-2"
        }>
          {[...Array(12)].map((_, i) => (
            <div key={i} className={viewMode === 'grid' 
              ? "bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse"
              : "bg-white h-20 animate-pulse"
            }>
              {viewMode === 'grid' ? (
                <>
                  <div className="aspect-video bg-gray-200 rounded-t-xl" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-3 bg-gray-200 rounded" />
                  </div>
                </>
              ) : (
                <div className="h-full bg-gray-200 rounded" />
              )}
            </div>
          ))}
        </div>
      ) : mediaFiles.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No media files found</h3>
          <p className="text-gray-600 mb-4">Upload your first media files to get started</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Files
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {mediaFiles.map((file) => (
            <MediaCard key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {mediaFiles.map((file, index) => (
            <div key={file.id}>
              <MediaListItem file={file} />
              {index < mediaFiles.length - 1 && (
                <div className="border-t border-gray-100" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && <UploadModal />}
    </div>
  );
};

export default MediaLibrary;