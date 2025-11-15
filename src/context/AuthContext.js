import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const token = localStorage.getItem('token');
    if (token) {
      apiService.setToken(token);
      // Verify token and get user data
      apiService.getCurrentUser()
        .then(response => {
          setUser(response.user);
        })
        .catch((error) => {
          console.log('Token verification failed:', error);
          // Token is invalid, clear it
          apiService.logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiService.login(email, password);
      setUser(response.user);
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    apiService.logout();
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
