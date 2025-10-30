import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any additional headers or modify request here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login or refresh token
          console.error('Unauthorized access');
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Internal server error
          console.error('Internal server error');
          break;
        default:
          console.error('API Error:', data?.message || error.message);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - please check your connection');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const apiService = {
  // Generic methods
  get: (url, config = {}) => api.get(url, config),
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),

  // Content endpoints
  content: {
    getHomeContent: () => api.get('/content/home'),
    getAboutContent: () => api.get('/content/about'),
    getVenturesContent: () => api.get('/content/ventures'),
    getBanners: () => api.get('/content/banners'),
    getAnnouncements: (limit = 10) => api.get(`/content/announcements?limit=${limit}`),
    getContactInfo: () => api.get('/contact/info'),
  },

  // Ventures endpoints
  ventures: {
    getAll: () => api.get('/content/ventures'),
    getBySlug: (slug) => api.get(`/content/ventures/${slug}`),
    getServices: (ventureId) => api.get(`/ventures/${ventureId}/services`),
    getProjects: (ventureId) => api.get(`/ventures/${ventureId}/projects`),
  },

  // Products endpoints
  products: {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return api.get(`/products${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => api.get(`/products/${id}`),
    getByVenture: (ventureId) => api.get(`/products/venture/${ventureId}`),
    getFeatured: (limit = 6) => api.get(`/products/featured?limit=${limit}`),
    search: (query, filters = {}) => {
      const params = new URLSearchParams({ query, ...filters }).toString();
      return api.get(`/products/search?${params}`);
    },
  },

  // Contact endpoints
  contact: {
    submit: (data) => api.post('/contact/submit', data),
    getInfo: () => api.get('/contact/info'),
  },

  // Auth endpoints
  auth: {
    login: (email, password) => api.post('/auth/login', { email, password }),
    logout: () => api.post('/auth/logout'),
    getMe: () => api.get('/auth/me'),
    refreshToken: () => api.post('/auth/refresh'),
    updateProfile: (data) => api.put('/auth/profile', data),
    changePassword: (currentPassword, newPassword) => 
      api.put('/auth/change-password', { currentPassword, newPassword }),
  },

  // Admin endpoints (protected)
  admin: {
    getDashboard: () => api.get('/admin/dashboard'),
    
    // Content management
    updateContent: (section, key, value, type = 'text') => 
      api.put('/admin/content', { section, key, value, type }),
    
    // Banner management
    getBanners: () => api.get('/admin/banners'),
    createBanner: (data) => api.post('/admin/banners', data),
    updateBanner: (id, data) => api.put(`/admin/banners/${id}`, data),
    deleteBanner: (id) => api.delete(`/admin/banners/${id}`),
    
    // Venture management
    getVentures: () => api.get('/admin/ventures'),
    createVenture: (data) => api.post('/admin/ventures', data),
    updateVenture: (id, data) => api.put(`/admin/ventures/${id}`, data),
    deleteVenture: (id) => api.delete(`/admin/ventures/${id}`),
    
    // Product management
    getProducts: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return api.get(`/admin/products${queryString ? `?${queryString}` : ''}`);
    },
    createProduct: (data) => api.post('/admin/products', data),
    updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
    deleteProduct: (id) => api.delete(`/admin/products/${id}`),
    
    // Announcement management
    getAnnouncements: () => api.get('/admin/announcements'),
    createAnnouncement: (data) => api.post('/admin/announcements', data),
    updateAnnouncement: (id, data) => api.put(`/admin/announcements/${id}`, data),
    deleteAnnouncement: (id) => api.delete(`/admin/announcements/${id}`),
    
    // Contact submissions
    getContactSubmissions: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return api.get(`/admin/contact-submissions${queryString ? `?${queryString}` : ''}`);
    },
    updateSubmissionStatus: (id, status) => 
      api.patch(`/admin/contact-submissions/${id}`, { status }),
    
    // Analytics
    getAnalytics: (dateRange = {}) => {
      const queryString = new URLSearchParams(dateRange).toString();
      return api.get(`/admin/analytics${queryString ? `?${queryString}` : ''}`);
    },
  },

  // File upload utility
  uploadFile: (file, folder = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Batch upload utility
  uploadFiles: (files, folder = 'general') => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    formData.append('folder', folder);
    
    return api.post('/upload/batch', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;