import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import { parseApiError } from '../utils/errors';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login: setLogin, logout: setLogout, user, isAuthenticated, isInitializing, setInitializing } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const verifySession = async () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      setInitializing(false);
      return;
    }

    try {
      const { data } = await api.get('auth/me');
      // Update user data if it changed on server
      setLogin(data, token);
    } catch (error) {
      console.error('Session verification failed:', error);
      setLogout();
    } finally {
      setInitializing(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.post('auth/login', { email, password });
      setLogin(data.user, data.token);
      
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
      
      toast.success('Welcome back to the field!', {
        icon: '🌾',
        style: { borderRadius: '12px', background: '#1a3c1a', color: '#fff' }
      });
      return { success: true };
    } catch (error) {
      const message = parseApiError(error, 'Invalid credentials');
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (payload: any) => {
    setIsLoading(true);
    try {
      await api.post('auth/signup', payload);
      
      // Auto-login after signup
      const { data } = await api.post('auth/login', { 
        email: payload.email, 
        password: payload.password 
      });
      
      setLogin(data.user, data.token);
      navigate('/dashboard');
      
      toast.success('Account created! Welcome.', {
        icon: '🚜',
        style: { borderRadius: '12px', background: '#1a3c1a', color: '#fff' }
      });
      return { success: true };
    } catch (error) {
      const message = parseApiError(error, 'Signup failed');
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setLogout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return {
    login,
    signup,
    logout,
    verifySession,
    isLoading,
    isInitializing,
    user,
    isAuthenticated
  };
};
