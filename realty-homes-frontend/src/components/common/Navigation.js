import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  // Don't show navigation on login page or when not authenticated
  if (!isAuthenticated || location.pathname === '/login') return null;

  return (
    <nav style={{ 
      padding: '1rem', 
      backgroundColor: '#f8f9fa', 
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <span style={{ marginRight: '1rem', fontWeight: 'bold' }}>
          Welcome, {user?.name?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </span>
        <a 
          href={`/${user?.role}/dashboard`} 
          style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}
        >
          Dashboard
        </a>
      </div>
      <button 
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
        style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: '#dc3545', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navigation;