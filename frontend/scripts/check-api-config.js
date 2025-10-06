#!/usr/bin/env node

/**
 * Script para verificar a configuração da API
 * Uso: node scripts/check-api-config.js
 */

console.log('🔍 Verificando configuração da API...\n');

// Simula diferentes ambientes
const environments = [
  { name: 'Development', NODE_ENV: 'development' },
  { name: 'Production', NODE_ENV: 'production' },
  { name: 'Vercel', NODE_ENV: 'production', VERCEL: '1' },
];

environments.forEach(env => {
  console.log(`📋 ${env.name}:`);
  console.log(`   NODE_ENV: ${env.NODE_ENV}`);
  console.log(`   NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL || 'undefined'}`);
  console.log(`   VERCEL: ${process.env.VERCEL || 'undefined'}`);
  
  // Simula a lógica do getApiUrl
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  console.log(`   Final API_URL: ${apiUrl}`);
  console.log('');
});

console.log('💡 Para configurar no Vercel:');
console.log('   1. Acesse o dashboard do Vercel');
console.log('   2. Vá em Settings > Environment Variables');
console.log('   3. Adicione: NEXT_PUBLIC_API_URL = https://p30-production.up.railway.app/v1/');
console.log('   4. Ou use o arquivo vercel.json (já configurado)');
