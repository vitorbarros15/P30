# 🚀 Guia de Deploy - P30 Backend

## 🎯 Opções de Deploy

### 1. 🟢 **Railway (Recomendado - Mais Fácil)**

#### **Pré-requisitos:**
- Conta no Railway
- Projeto no GitHub

#### **Passos:**

1. **Instalar Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login no Railway:**
```bash
railway login
```

3. **Inicializar projeto:**
```bash
cd backend
railway init
```

4. **Configurar variáveis de ambiente:**
```bash
railway variables set MONGODB_URI="sua_mongodb_uri"
railway variables set JWT_SECRET="seu_jwt_secret"
railway variables set NODE_ENV="production"
railway variables set PORT="3001"
```

5. **Deploy:**
```bash
railway up
```

**✅ Vantagens:**
- Deploy em 1 comando
- HTTPS automático
- Domínio gratuito
- Integração com GitHub

---

### 2. 🟡 **Render (Alternativa Fácil)**

#### **Passos:**

1. **Conectar repositório GitHub**
2. **Configurar:**
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start:prod`
   - **Environment:** Node

3. **Variáveis de ambiente:**
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

**✅ Vantagens:**
- Interface web simples
- Deploy automático
- SSL gratuito

---

### 3. 🔴 **Heroku (Tradicional)**

#### **Passos:**

1. **Instalar Heroku CLI:**
```bash
# Ubuntu/Debian
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh

# macOS
brew install heroku/brew/heroku
```

2. **Login:**
```bash
heroku login
```

3. **Criar app:**
```bash
heroku create p30-backend
```

4. **Configurar variáveis:**
```bash
heroku config:set MONGODB_URI="sua_mongodb_uri"
heroku config:set JWT_SECRET="seu_jwt_secret"
heroku config:set NODE_ENV="production"
```

5. **Deploy:**
```bash
git push heroku main
```

---

### 4. 🐳 **Docker + VPS**

#### **Pré-requisitos:**
- VPS (DigitalOcean, Linode, etc.)
- Docker instalado

#### **Passos:**

1. **Build da imagem:**
```bash
docker build -t p30-backend .
```

2. **Executar container:**
```bash
docker run -d \
  --name p30-backend \
  -p 3001:3001 \
  -e MONGODB_URI="sua_mongodb_uri" \
  -e JWT_SECRET="seu_jwt_secret" \
  -e NODE_ENV="production" \
  p30-backend
```

---

## 🔧 Configurações Necessárias

### **Variáveis de Ambiente:**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=seu_jwt_secret_super_seguro
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://seu-frontend.com
```

### **Scripts de Build:**
```json
{
  "scripts": {
    "build": "nest build",
    "start:prod": "node dist/main.js"
  }
}
```

---

## 📊 Comparação de Opções

| Plataforma | Dificuldade | Custo | Performance | Escalabilidade |
|------------|-------------|-------|-------------|----------------|
| **Railway** | 🟢 Fácil | Gratuito | 🟢 Boa | 🟢 Automática |
| **Render** | 🟢 Fácil | Gratuito | 🟢 Boa | 🟢 Automática |
| **Heroku** | 🟡 Médio | Pago | 🟡 Média | 🟢 Automática |
| **Docker** | 🔴 Difícil | VPS | 🟢 Boa | 🔴 Manual |

---

## 🎯 **Recomendação Final**

### **Para Iniciantes: Railway**
- ✅ Mais fácil de configurar
- ✅ Deploy em 1 comando
- ✅ HTTPS automático
- ✅ Integração com GitHub

### **Para Produção: Render + MongoDB Atlas**
- ✅ Interface web amigável
- ✅ Deploy automático
- ✅ SSL gratuito
- ✅ Escalabilidade automática

---

## 🚀 Próximos Passos

1. **Escolher plataforma** (Railway recomendado)
2. **Configurar variáveis** de ambiente
3. **Fazer deploy** seguindo os passos
4. **Testar** endpoints em produção
5. **Configurar** monitoramento

---

## 📞 Suporte

Se tiver dúvidas sobre o deploy:
- 📖 Documentação da plataforma escolhida
- 🐛 Issues no GitHub
- 💬 Comunidade da plataforma
