#!/bin/bash

# 🚀 Script de Deploy - P30 Backend
# Este script facilita o deploy da aplicação

set -e  # Exit on any error

echo "🚀 Iniciando deploy do P30 Backend..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    print_error "Execute este script no diretório backend/"
    exit 1
fi

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js não está instalado. Instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    print_error "npm não está instalado. Instale o npm primeiro."
    exit 1
fi

print_status "Verificando dependências..."

# Instalar dependências
print_status "Instalando dependências..."
npm ci

# Executar testes
print_status "Executando testes..."
npm run test:all

# Build da aplicação
print_status "Fazendo build da aplicação..."
npm run build

print_success "Build concluído com sucesso!"

# Verificar se o build foi criado
if [ ! -d "dist" ]; then
    print_error "Diretório dist não foi criado. Build falhou."
    exit 1
fi

print_success "✅ Aplicação pronta para deploy!"

echo ""
echo "🎯 Próximos passos para deploy:"
echo ""
echo "1. 🟢 Railway (Recomendado):"
echo "   npm install -g @railway/cli"
echo "   railway login"
echo "   railway init"
echo "   railway up"
echo ""
echo "2. 🟡 Render:"
echo "   - Conectar repositório GitHub"
echo "   - Build Command: npm run build"
echo "   - Start Command: npm run start:prod"
echo ""
echo "3. 🔴 Heroku:"
echo "   heroku create p30-backend"
echo "   heroku config:set MONGODB_URI=your_mongodb_uri"
echo "   heroku config:set JWT_SECRET=your_jwt_secret"
echo "   git push heroku main"
echo ""
echo "📖 Para mais detalhes, consulte: DEPLOY.md"
