#!/usr/bin/env node

/**
 * Script para testar a conexão com a API
 * Uso: node scripts/test-api.js
 */

const https = require('https');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://p30-production.up.railway.app';

console.log('🔍 Testando conexão com a API...');
console.log(`📍 URL: ${API_URL}`);

// Teste de conectividade básica
const url = new URL(API_URL);
const options = {
  hostname: url.hostname,
  port: url.port || 443,
  path: '/health', // Assumindo que existe um endpoint de health
  method: 'GET',
  timeout: 10000,
};

const req = https.request(options, (res) => {
  console.log(`✅ Status: ${res.statusCode}`);
  console.log(`📊 Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📄 Response:', data);
    console.log('✅ API está respondendo corretamente!');
  });
});

req.on('error', (error) => {
  console.error('❌ Erro ao conectar com a API:', error.message);
  console.log('💡 Verifique se:');
  console.log('   - A API está rodando no Railway');
  console.log('   - A URL está correta');
  console.log('   - Não há problemas de CORS');
});

req.on('timeout', () => {
  console.error('⏰ Timeout: A API não respondeu em 10 segundos');
  req.destroy();
});

req.setTimeout(10000);
req.end();
