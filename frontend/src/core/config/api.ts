/**
 * Configuração da API
 * Centraliza todas as configurações relacionadas à API
 */

// Função para obter a URL da API
export const getApiUrl = (): string => {
  // Verifica se estamos no cliente (browser)
  if (typeof window !== 'undefined') {
    // No cliente, usa a variável de ambiente do Next.js
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  }
  
  // No servidor (SSR), usa a variável de ambiente
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
};

// Configuração da API
export const API_CONFIG = {
  baseURL: getApiUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
};

// Debug da configuração
if (typeof window !== 'undefined') {
  console.log('🔧 API Configuration (Client):');
  console.log('📍 NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  console.log('🌐 Final API_URL:', API_CONFIG.baseURL);
  console.log('🏗️ NODE_ENV:', process.env.NODE_ENV);
} else {
  console.log('🔧 API Configuration (Server):');
  console.log('📍 NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
  console.log('🌐 Final API_URL:', API_CONFIG.baseURL);
  console.log('🏗️ NODE_ENV:', process.env.NODE_ENV);
}
