import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthResponse, LoginCredentials, User, AuthError } from '../types';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: AuthError | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          // Importa dinamicamente para evitar problemas de SSR
          const { authService } = await import('../services/authService');
          const response: AuthResponse = await authService.login(credentials);

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const authError: AuthError = {
            message: error.message || 'Erro ao fazer login',
            code: error.code,
          };

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: authError,
          });

          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });

        // Limpa localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      setToken: (token: string) => {
        set({ token });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      setError: (error: AuthError | null) => {
        set({ error });
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Hooks utilitários
export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login: store.login,
    logout: store.logout,
  };
};

export const useAuthActions = () => {
  const store = useAuthStore();
  return {
    setUser: store.setUser,
    setToken: store.setToken,
    setLoading: store.setLoading,
    setError: store.setError,
    clearAuth: store.clearAuth,
  };
};
