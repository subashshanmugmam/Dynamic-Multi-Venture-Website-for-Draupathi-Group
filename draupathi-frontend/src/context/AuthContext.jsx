import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Development-only AuthProvider - bypasses backend calls
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  // API base URL configuration
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  // Configure axios defaults and check auth on mount
  useEffect(() => {
    // Configure axios with base URL and credentials
    axios.defaults.baseURL = API_BASE_URL;
    axios.defaults.withCredentials = true;
    
    // Test backend connection first, then check auth
    testBackendConnection();
  }, []);

  // Test if backend is available
  const testBackendConnection = async () => {
    try {
      // Health endpoint is directly at /health, not under /api
      const healthUrl = 'http://localhost:5000/health';
      const response = await axios.get(healthUrl, { timeout: 5000 });
      if (response.data.status === 'OK') {
        console.log('✅ Backend server is running');
        // Backend is available, proceed with auth check
        checkAuth();
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error')) {
        console.warn('⚠️  Backend server not running. Please start the backend server with: cd draupathi-backend && npm start');
      } else if (error.response?.status === 404) {
        console.warn('⚠️  Health endpoint not found, but proceeding with auth check...');
      } else {
        console.warn('⚠️  Backend connection test failed:', error.message);
      }
      
      // Still attempt auth check in case it's just a health endpoint issue
      checkAuth();
    }
  };

  const checkAuth = async (silent = true) => {
    // Prevent multiple simultaneous auth checks
    if (isCheckingAuth) {
      return;
    }

    try {
      setIsCheckingAuth(true);
      setLoading(true);
      
      const response = await axios.get('/auth/me');
      
      if (response.data.success) {
        setUser(response.data.data.user);
      }
    } catch (error) {
      // Handle different error types gracefully
      const status = error.response?.status;
      const errorCode = error.response?.data?.error;
      
      // 401 errors are normal when no user is logged in - handle silently
      if (status === 401) {
        setUser(null);
        // Only log non-silent 401 errors (like when user session expires)
        if (!silent) {
          console.info('Authentication required');
        }
        return;
      }
      
      // Handle rate limit errors more gracefully
      if (status === 429) {
        console.warn('Rate limit reached, please try again later');
        setUser(null);
        return;
      }
      
      // Handle network/CORS errors
      if (error.message?.includes('CORS') || error.code === 'ERR_NETWORK') {
        console.warn('Network error - please ensure backend is running on http://localhost:5000');
        setUser(null);
        return;
      }
      
      // Handle connection refused (server not running)
      if (error.code === 'ECONNREFUSED' || error.message?.includes('connect ECONNREFUSED')) {
        console.warn('Backend server not available - please start the backend server');
        setUser(null);
        return;
      }
      
      // If token is expired, try to refresh
      if (errorCode === 'INVALID_TOKEN') {
        const refreshSuccess = await refreshToken();
        if (!refreshSuccess) {
          setUser(null);
        }
        return;
      }
      
      // For any other errors, log them but don't crash
      if (!silent) {
        console.error('Auth check failed:', error.message);
      }
      setUser(null);
    } finally {
      setLoading(false);
      setIsCheckingAuth(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        setUser(response.data.data.user);
        return { success: true, user: response.data.data.user };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post('/auth/refresh');
      if (response.data.success) {
        // Token is refreshed automatically via httpOnly cookies
        await checkAuth(false); // Not silent since this is an active refresh
        return true;
      }
    } catch (error) {
      const errorCode = error.response?.data?.error;
      
      // Expected errors that shouldn't be logged (normal for first-time visitors)
      const expectedErrors = ['NO_REFRESH_TOKEN', 'INVALID_REFRESH_TOKEN'];
      
      if (!expectedErrors.includes(errorCode)) {
        console.warn('Token refresh failed:', error.response?.data?.message || error.message);
      }
      
      setUser(null);
      return false;
    }
  };

  const updateProfile = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.put('/auth/profile', data);
      
      if (response.data.success) {
        setUser(response.data.data.user);
        return { success: true, user: response.data.data.user };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.put('/auth/change-password', {
        currentPassword,
        newPassword
      });

      if (response.data.success) {
        // After password change, user needs to login again
        setUser(null);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password change failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Setup axios interceptors for automatic token refresh
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Request interceptor can be used to add headers if needed
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Only attempt token refresh for authenticated routes (not initial auth checks)
        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/me') {
          originalRequest._retry = true;
          
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            return axios(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'super-admin',
    isSuperAdmin: user?.role === 'super-admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};