import { create } from 'zustand';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const getSafeUser = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined') return null;
    return JSON.parse(user);
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getSafeUser(),
  token: localStorage.getItem('token') || null,
  login: (user, token) => {
    if (!user || !token) {
      console.warn('Attempted to login with invalid user or token');
      return;
    }
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },
}));
