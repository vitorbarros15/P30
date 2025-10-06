# Configuração de Ambiente - Frontend

## Variáveis de Ambiente

### Desenvolvimento Local
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Produção (Vercel)
```bash
# Configurado automaticamente via vercel.json
NEXT_PUBLIC_API_URL=https://p30-production.up.railway.app
```

## Configuração no Vercel

1. **Via Dashboard do Vercel:**
   - Acesse o projeto no dashboard do Vercel
   - Vá em Settings > Environment Variables
   - Adicione: `NEXT_PUBLIC_API_URL` = `https://p30-production.up.railway.app`

2. **Via vercel.json (já configurado):**
   - O arquivo `vercel.json` já contém a configuração da API
   - Não é necessário configuração adicional

## Verificação

Para verificar se a configuração está funcionando:

1. **Localmente:**
   ```bash
   npm run dev
   # Acesse http://localhost:3000
   # Verifique no console do navegador se a API está sendo chamada corretamente
   ```

2. **Produção:**
   - Após o deploy no Vercel, acesse a URL do projeto
   - Verifique se as requisições estão sendo feitas para `https://p30-production.up.railway.app`

## Troubleshooting

Se houver problemas de CORS:
- Verifique se o backend no Railway está configurado para aceitar requisições do domínio do Vercel
- Adicione o domínio do Vercel nas configurações de CORS do backend
