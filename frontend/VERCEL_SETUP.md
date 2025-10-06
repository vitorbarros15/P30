# Configuração do Vercel - P30 Frontend

## 🚨 Problema Identificado

O frontend está pegando `localhost:8080` mesmo no Vercel porque a variável de ambiente `NEXT_PUBLIC_API_URL` não está sendo reconhecida.

## ✅ Soluções Implementadas

### 1. Configuração Robusta da API
- ✅ Criado `src/core/config/api.ts` com lógica melhorada
- ✅ Atualizado `axiosDefault.ts` para usar a nova configuração
- ✅ Adicionado logs de debug para identificar o problema

### 2. Arquivos de Ambiente
- ✅ `.env.local` - Para desenvolvimento local
- ✅ `.env.production` - Para produção
- ✅ `vercel.json` - Configuração do Vercel

### 3. Debug e Monitoramento
- ✅ Componente `ApiDebug` para verificar URL em runtime
- ✅ Scripts de verificação (`npm run check:api`)
- ✅ Logs detalhados na configuração

## 🔧 Configuração Manual no Vercel

### Opção 1: Dashboard do Vercel (Recomendado)
1. Acesse o projeto no dashboard do Vercel
2. Vá em **Settings** > **Environment Variables**
3. Adicione a variável:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://p30-production.up.railway.app/v1/`
   - **Environment**: Production, Preview, Development
4. Faça um novo deploy

### Opção 2: CLI do Vercel
```bash
vercel env add NEXT_PUBLIC_API_URL
# Digite: https://p30-production.up.railway.app/v1/
```

## 🧪 Como Testar

### Localmente
```bash
npm run dev
# Verifique o componente de debug no canto inferior direito
```

### No Vercel
1. Faça o deploy
2. Acesse a aplicação
3. Verifique o componente de debug (se em desenvolvimento)
4. Abra o console do navegador para ver os logs

## 🔍 Verificação

### Scripts Disponíveis
```bash
npm run check:api    # Verifica configuração
npm run test:api     # Testa conexão com API
```

### Logs Esperados
```
🔧 API Configuration (Client):
📍 NEXT_PUBLIC_API_URL: https://p30-production.up.railway.app/v1/
🌐 Final API_URL: https://p30-production.up.railway.app/v1/
🏗️ NODE_ENV: production
```

## 🚀 Deploy

1. **Commit as alterações:**
   ```bash
   git add .
   git commit -m "fix: improve API URL configuration for Vercel"
   git push origin main
   ```

2. **Configure a variável no Vercel** (se não foi feito via dashboard)

3. **Faça um novo deploy**

## ⚠️ Troubleshooting

Se ainda estiver pegando localhost:

1. **Verifique se a variável está definida:**
   - Dashboard Vercel > Settings > Environment Variables
   - Deve aparecer `NEXT_PUBLIC_API_URL`

2. **Force um novo build:**
   - Delete o cache do Vercel
   - Faça um novo deploy

3. **Verifique os logs do build:**
   - Procure por "API Configuration" nos logs
   - Deve mostrar a URL correta

4. **Teste localmente:**
   ```bash
   NEXT_PUBLIC_API_URL=https://p30-production.up.railway.app/v1/ npm run build
   ```
