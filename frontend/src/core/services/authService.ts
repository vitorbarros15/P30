import { httpClient } from '../config/axiosDefault';
import { LoginCredentials, AuthResponse, User, ApiResponse } from '../types';

export const authService = {
  /**
   * Faz login do usuário
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Faz logout do usuário
   */
  async logout(): Promise<void> {
    try {
      await httpClient.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo se der erro no servidor, considera logout realizado
    } finally {
      // Limpa dados locais independente do resultado da requisição
      this.clearLocalAuth();
    }
  },

  /**
   * Busca dados do usuário atual
   */
  async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>('/auth/me');
    return response.data;
  },

  /**
   * Atualiza dados do usuário
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await httpClient.put<User>('/auth/profile', data);
    return response.data;
  },

  /**
   * Altera senha do usuário
   */
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await httpClient.post('/auth/change-password', data);
  },

  /**
   * Solicita recuperação de senha
   */
  async forgotPassword(email: string): Promise<void> {
    await httpClient.post('/auth/forgot-password', { email });
  },

  /**
   * Redefine senha
   */
  async resetPassword(data: {
    token: string;
    password: string;
  }): Promise<void> {
    await httpClient.post('/auth/reset-password', data);
  },

  /**
   * Verifica se o token é válido
   */
  async validateToken(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Salva dados de autenticação no localStorage
   */
  saveLocalAuth(user: User, token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    }
  },

  /**
   * Recupera dados de autenticação do localStorage
   */
  getLocalAuth(): { user: User | null; token: string | null } {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      return {
        user: user ? JSON.parse(user) : null,
        token,
      };
    }

    return { user: null, token: null };
  },

  /**
   * Limpa dados de autenticação do localStorage
   */
  clearLocalAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },

  /**
   * Inicializa autenticação a partir do localStorage
   */
  async initializeAuth(): Promise<{ user: User | null; token: string | null }> {
    const { user, token } = this.getLocalAuth();

    if (token && user) {
      // Verifica se o token ainda é válido
      const isValid = await this.validateToken();
      
      if (!isValid) {
        this.clearLocalAuth();
        return { user: null, token: null };
      }
    }

    return { user, token };
  },
};
