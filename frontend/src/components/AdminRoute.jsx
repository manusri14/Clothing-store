import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or a spinner

  if (user && user.role === 'admin') {
    return children;
  }

  return <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
