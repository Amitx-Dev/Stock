import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login preserving destination if desired
    return <Navigate to={`/login?role=${requiredRole || 'trader'}`} replace state={{ from: location }} />;
  }

  if (requiredRole && role?.toLowerCase() !== requiredRole.toLowerCase()) {
    // Redirect to matching role portal if role mismatch
    return <Navigate to={role?.toLowerCase() === 'admin' ? '/admin/users' : '/trader/trading'} replace />;
  }

  return children;
};
