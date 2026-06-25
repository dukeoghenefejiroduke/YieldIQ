import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  setInitializing: (initializing: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitializing: true,
      login: (user, token) => {
        set({ user, token, isAuthenticated: true, isInitializing: false });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, isInitializing: false });
      },
      setInitializing: (isInitializing) => set({ isInitializing }),
    }),
    {
      name: 'agropulse-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: !!state.token 
      }),
    }
  )
);
