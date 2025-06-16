import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from './Login';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Login />;
};

export default Register;