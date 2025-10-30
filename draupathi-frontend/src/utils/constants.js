// Venture configurations
export const VENTURES_CONFIG = {
  IT_SOLUTIONS: {
    id: 'it-solutions',
    name: 'Draupathi IT Solutions',
    slug: 'it-solutions',
    shortName: 'IT Solutions',
    description: 'Comprehensive IT solutions and software development services',
    color: '#0ea5e9',
    icon: '💻',
  },
  IRRIGATIONS: {
    id: 'irrigations',
    name: 'Draupathi Irrigations',
    slug: 'irrigations',
    shortName: 'Irrigations',
    description: 'Advanced irrigation systems and agricultural solutions',
    color: '#22c55e',
    icon: '🌱',
  },
  D_FOODS: {
    id: 'd-foods',
    name: 'D Foods (Navathanya Products)',
    slug: 'd-foods',
    shortName: 'D Foods',
    description: 'Premium food products under Navathanya brand',
    color: '#f59e0b',
    icon: '🍯',
  },
};

// Ventures as array for easy mapping
export const VENTURES = [
  {
    id: 'it-solutions',
    name: 'Draupathi IT Solutions',
    slug: 'it-solutions',
    shortName: 'IT Solutions',
    description: 'Comprehensive IT solutions and software development services',
    color: '#0ea5e9',
    icon: '💻',
  },
  {
    id: 'irrigations',
    name: 'Draupathi Irrigations',
    slug: 'irrigations',
    shortName: 'Irrigations',
    description: 'Advanced irrigation systems and agricultural solutions',
    color: '#22c55e',
    icon: '🌱',
  },
  {
    id: 'd-foods',
    name: 'D Foods (Navathanya Products)',
    slug: 'd-foods',
    shortName: 'D Foods',
    description: 'Premium food products under Navathanya brand',
    color: '#f59e0b',
    icon: '🍯',
  },
];

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  MEDIUM: 500,
  SLOW: 800,
  EXTRA_SLOW: 1200,
};

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  XS: 475,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// API Response Status
export const API_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  SUPER_ADMIN: 'super-admin',
};

// Contact form types
export const CONTACT_TYPES = {
  GENERAL: 'general',
  SERVICE: 'service',
  PRODUCT: 'product',
  SUPPORT: 'support',
  PARTNERSHIP: 'partnership',
  CAREER: 'career',
};

// File upload constraints
export const UPLOAD_CONSTRAINTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  RECENT_SEARCHES: 'recentSearches',
};

// Social media links
export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/draupathigroup',
    icon: 'facebook',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/draupathigroup',
    icon: 'twitter',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/draupathi-group',
    icon: 'linkedin',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/draupathigroup',
    icon: 'instagram',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/draupathigroup',
    icon: 'youtube',
  },
];

// Contact information
export const CONTACT_INFO = {
  MAIN_OFFICE: {
    address: 'Main Office Address, City, State, PIN',
    phone: '+91-XXXXXXXXXX',
    email: 'info@draupathigroup.com',
  },
  IT_SOLUTIONS: {
    email: 'it@draupathigroup.com',
    phone: '+91-XXXXXXXXXX',
  },
  IRRIGATIONS: {
    email: 'irrigation@draupathigroup.com',
    phone: '+91-XXXXXXXXXX',
  },
  D_FOODS: {
    email: 'foods@draupathigroup.com',
    phone: '+91-XXXXXXXXXX',
  },
};

// SEO defaults
export const SEO_DEFAULTS = {
  TITLE_SUFFIX: 'Draupathi Group',
  DESCRIPTION: 'Draupathi Group - Leading provider of IT Solutions, Irrigation Systems, and Premium Food Products',
  KEYWORDS: ['Draupathi Group', 'IT Solutions', 'Irrigation Systems', 'Food Products', 'Navathanya'],
  OG_IMAGE: '/images/og-image.jpg',
  TWITTER_HANDLE: '@draupathigroup',
};

// Feature flags (for progressive rollout)
export const FEATURES = {
  DARK_MODE: true,
  SEARCH: true,
  CHAT_SUPPORT: false,
  MULTI_LANGUAGE: false,
  PWA: true,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  FORBIDDEN: 'Access forbidden. Please contact administrator.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size is too large. Maximum size allowed is 5MB.',
  INVALID_FILE_TYPE: 'Invalid file type. Please select a valid file.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Welcome back.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  CONTACT_SUBMITTED: 'Your message has been sent successfully. We will get back to you soon.',
  FILE_UPLOADED: 'File uploaded successfully.',
};

// Loading messages
export const LOADING_MESSAGES = {
  LOGGING_IN: 'Logging in...',
  LOADING_DATA: 'Loading data...',
  UPLOADING_FILE: 'Uploading file...',
  PROCESSING: 'Processing...',
  SAVING: 'Saving...',
  DELETING: 'Deleting...',
};