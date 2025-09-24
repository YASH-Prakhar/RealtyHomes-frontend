import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading, logout } = useAuth();

  // Use useEffect to handle unauthorized access to avoid state updates during render
  useEffect(() => {
    if (isAuthenticated && !loading) {
      // Check if user role is allowed for this route
      if (requiredRole && user?.role !== requiredRole) {
        logout('Unauthorized access attempt. Please login with appropriate credentials.');
      }
      // Check if user role is in allowed roles array
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

  // Check if user role is allowed for this route
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is in allowed roles array
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  // If no children provided, handle role-based redirect
  if (!children) {
    // Redirect to appropriate dashboard based on user role
    if (user?.role === 'broker') {
      return <Navigate to="/broker/dashboard" replace />;
    } else if (user?.role === 'user') {
      return <Navigate to="/user/dashboard" replace />;
    }
    // Default redirect if role is not recognized
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;