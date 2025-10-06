#!/bin/bash

# Script para testar configuração de CORS
# Uso: ./scripts/test-cors.sh [URL_DA_API] [ORIGEM]

API_URL=${1:-"https://p30-production.up.railway.app/v1"}
ORIGIN=${2:-"https://p30-ivory.vercel.app"}

echo "🧪 Testando configuração de CORS..."
echo "📍 API: $API_URL"
echo "🌐 Origin: $ORIGIN"
echo ""

echo "1️⃣ Testando requisição OPTIONS (preflight)..."
echo "----------------------------------------"

curl -X OPTIONS "$API_URL/auth/login" \
  -H "Origin: $ORIGIN" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization" \
  -v \
  2>&1 | grep -i "access-control"

echo ""
echo "2️⃣ Testando requisição POST..."
echo "----------------------------------------"

curl -X POST "$API_URL/auth/login" \
  -H "Origin: $ORIGIN" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}' \
  -v \
  2>&1 | grep -i "access-control"

echo ""
echo "✅ Teste concluído!"
echo ""
echo "💡 O que procurar:"
echo "  - Access-Control-Allow-Origin: $ORIGIN"
echo "  - Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS"
echo "  - Access-Control-Allow-Headers: Content-Type, Authorization, Accept"
echo ""
echo "⚠️  Se não aparecer nada, o CORS não está configurado corretamente!"
