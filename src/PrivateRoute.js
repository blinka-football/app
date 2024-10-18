import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null; 
  }

  if (!user) {
    // If user is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the children components
  return children;
};

export default PrivateRoute;
