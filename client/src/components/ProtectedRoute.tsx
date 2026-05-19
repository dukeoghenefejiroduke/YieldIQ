import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const { user } = useAuthStore();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};
