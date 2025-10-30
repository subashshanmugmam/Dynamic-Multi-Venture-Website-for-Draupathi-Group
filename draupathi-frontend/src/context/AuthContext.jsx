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
    
    // Check authentication status on mount
    // Note: 401 errors in console are expected when no user is logged in
    checkAuth();
  }, []);

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
      // For silent auth checks (initial load), don't log anything - they're expected
      if (silent && error.response?.status === 401) {
        setUser(null);
        return;
      }
      
      // Handle rate limit errors more gracefully
      if (error.response?.status === 429) {
        console.warn('Rate limit reached, retrying in 60 seconds...');
        setUser(null);
        return;
      }
      
      // Handle CORS errors
      if (error.message?.includes('CORS') || error.code === 'ERR_NETWORK') {
        console.warn('Network or CORS error during auth check:', error.message);
        setUser(null);
        return;
      }
      
      // Handle other 401 errors (user not authenticated)
      if (error.response?.status === 401) {
        console.warn('Authentication required');
        setUser(null);
        return;
      }
      
      // If token is expired, try to refresh (only if we're not already checking auth)
      if (error.response?.data?.error === 'INVALID_TOKEN' && !isCheckingAuth) {
        await refreshToken();
      } else {
        setUser(null);
      }
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
        await checkAuth();
        return true;
      }
    } catch (error) {
      // Don't log errors for no refresh token scenarios (normal on first visit)
      if (error.response?.data?.error !== 'NO_REFRESH_TOKEN') {
        console.error('Token refresh failed:', error);
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

        if (error.response?.status === 401 && !originalRequest._retry) {
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