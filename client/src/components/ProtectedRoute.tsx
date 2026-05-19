import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/login" replace />;
};
