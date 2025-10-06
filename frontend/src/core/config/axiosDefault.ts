import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse, ApiError, RequestConfig } from '../types';

// Interface para facilitar troca de biblioteca no futuro
export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>;
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;
  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>>;
  delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>;
}

class AxiosHttpClient implements HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string, timeout: number = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Adiciona token de autenticação se disponível
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log da requisição em desenvolvimento
        if (process.env.NODE_ENV === 'development') {
          console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data);
        }

        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(this.transformError(error));
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log da resposta em desenvolvimento
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        }

        return this.transformResponse(response);
      },
      (error) => {
        console.error('❌ Response Error:', error);
        
        // Trata erros de autenticação
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }

        return Promise.reject(this.transformError(error));
      }
    );
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  private handleUnauthorized() {
    // Limpa dados de autenticação
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redireciona para login
      window.location.href = '/login';
    }
  }

  private transformResponse<T>(response: AxiosResponse): ApiResponse<T> {
    return {
      data: response.data,
      message: response.data?.message,
      success: response.status >= 200 && response.status < 300,
      status: response.status,
    };
  }

  private transformError(error: unknown): ApiError {
    const apiError: ApiError = {
      message: 'Erro interno do servidor',
      status: 500,
    };

    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { status: number; data?: { message?: string; errors?: Record<string, string[]>; code?: string }; statusText?: string } };
      apiError.status = axiosError.response.status;
      apiError.message = axiosError.response.data?.message || axiosError.response.statusText || 'Erro do servidor';
      apiError.errors = axiosError.response.data?.errors;
      apiError.code = axiosError.response.data?.code;
    } else if (error && typeof error === 'object' && 'request' in error) {
      apiError.message = 'Erro de conexão. Verifique sua internet.';
    } else if (error && typeof error === 'object' && 'message' in error) {
      apiError.message = (error as { message: string }).message;
    }

    return apiError;
  }

  async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get(url, config);
    return response as ApiResponse<T>;
  }

  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post(url, data, config);
    return response as ApiResponse<T>;
  }

  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put(url, data, config);
    return response as ApiResponse<T>;
  }

  async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.patch(url, data, config);
    return response as ApiResponse<T>;
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete(url, config);
    return response as ApiResponse<T>;
  }
}

// Configuração padrão
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const TIMEOUT = 30000; // 30 segundos

// Instância principal do cliente HTTP
export const httpClient: HttpClient = new AxiosHttpClient(API_URL, TIMEOUT);

// Função para criar uma nova instância (útil para diferentes bases de URL)
export const createHttpClient = (baseURL: string, timeout?: number): HttpClient => {
  return new AxiosHttpClient(baseURL, timeout);
};

// Exporta também a instância do axios para casos específicos
export const axiosInstance = (httpClient as AxiosHttpClient)['instance'];

export default httpClient;
