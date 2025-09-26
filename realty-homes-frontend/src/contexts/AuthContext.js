import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

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
  const [error, setError] = useState(null);
  const [unauthorizedMessage, setUnauthorizedMessage] = useState('');

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('SESSION_TOKEN');
      if (token) {
        try {
          
          const response = await axios.get('http://localhost:5000/api/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.user);
        } catch (error) {
          localStorage.removeItem('SESSION_TOKEN');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await axios.post('http://localhost:5000/api/login', credentials, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      const { token, user } = response.data;
      localStorage.setItem('SESSION_TOKEN', token);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await axios.post('http://localhost:5000/api/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const { token, user } = response.data;
      localStorage.setItem('SESSION_TOKEN', token);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = (reason = '') => {
    localStorage.removeItem('SESSION_TOKEN');
    setUser(null);
    setError(null);
    
    const message = typeof reason === 'string' ? reason : '';
    if (message) {
      setUnauthorizedMessage(message);
      
      setTimeout(() => setUnauthorizedMessage(''), 5000);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    error,
    unauthorizedMessage,
    setUnauthorizedMessage,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isBroker: user?.role === 'broker',
    isUser: user?.role === 'user'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};