import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading, logout } = useAuth();

  
  useEffect(() => {
    if (isAuthenticated && !loading) {
      if (requiredRole && user?.role !== requiredRole) {
        logout('Unauthorized access attempt. Please login with appropriate credentials.');
      }
      else if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        logout('Unauthorized access attempt. Please login with appropriate credentials.');
      }
    }
  }, [isAuthenticated, user?.role, requiredRole, allowedRoles, loading, logout]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access control
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  // If no children, handle role-based redirect
  if (!children) {
    if (user?.role === 'broker') {
      return <Navigate to="/broker/dashboard" replace />;
    } else if (user?.role === 'user') {
      return <Navigate to="/user/dashboard" replace />;
    }
    
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;