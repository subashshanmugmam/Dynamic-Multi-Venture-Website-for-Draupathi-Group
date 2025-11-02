import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Simplified AuthProvider for development - bypasses API calls
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Set to false to avoid loading states
  const [_error, _setError] = useState(null);

  // Mock functions for development
  const login = async (email, _password) => {
    setLoading(true);
    // Simulate login without API call
    setTimeout(() => {
      setUser({ email, name: 'Development User' });
      setLoading(false);
    }, 1000);
  };

  const register = async (userData) => {
    setLoading(true);
    // Simulate registration without API call
    setTimeout(() => {
      setUser({ email: userData.email, name: userData.name });
      setLoading(false);
    }, 1000);
  };

  const logout = async () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};