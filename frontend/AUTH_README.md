# Sistema de Autenticação - Frontend

## Visão Geral

Este sistema de autenticação foi implementado com as seguintes funcionalidades:

- ✅ Tela de login moderna e responsiva
- ✅ Validação de formulários com Zod e React Hook Form
- ✅ Gerenciamento de estado com Context API
- ✅ Proteção de rotas
- ✅ Integração com backend via API
- ✅ Persistência de sessão no localStorage
- ✅ Tratamento de erros
- ✅ Loading states

## Estrutura de Arquivos

```
src/
├── types/
│   └── auth.ts                 # Tipos TypeScript para autenticação
├── lib/
│   └── api.ts                  # Configuração do Axios
├── services/
│   └── auth.service.ts         # Serviços de autenticação
├── contexts/
│   └── AuthContext.tsx         # Context para gerenciar estado de auth
├── components/
│   ├── ui/
│   │   ├── Input.tsx           # Componente de input reutilizável
│   │   └── Button.tsx          # Componente de botão reutilizável
│   ├── LoginForm.tsx           # Formulário de login
│   └── ProtectedRoute.tsx      # Componente para proteger rotas
└── app/
    ├── login/
    │   └── page.tsx            # Página de login
    ├── dashboard/
    │   └── page.tsx            # Página do dashboard (protegida)
    ├── layout.tsx              # Layout principal com AuthProvider
    └── page.tsx                # Página inicial com redirecionamento
```

## Como Usar

### 1. Configuração do Backend

Certifique-se de que o backend está rodando na URL configurada no arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 2. Endpoints Esperados no Backend

O frontend espera os seguintes endpoints:

- `POST /auth/login` - Para fazer login
- `POST /auth/logout` - Para fazer logout (opcional)
- `GET /auth/me` - Para obter dados do usuário atual (opcional)

### 3. Estrutura de Dados

#### Login Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login Response:
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "Nome do Usuário",
    "role": "admin"
  },
  "token": "jwt_token_here"
}
```

### 4. Navegação

- **Página inicial (`/`)**: Redireciona automaticamente para `/login` ou `/dashboard`
- **Login (`/login`)**: Tela de login com validação
- **Dashboard (`/dashboard`)**: Página protegida, só acessível com login

### 5. Funcionalidades

#### Login
- Validação de email e senha
- Mostrar/ocultar senha
- Lembrar usuário (checkbox)
- Loading state durante autenticação
- Tratamento de erros

#### Proteção de Rotas
- Rotas protegidas redirecionam para login se não autenticado
- Verificação automática de token expirado
- Logout automático em caso de token inválido

#### Gerenciamento de Estado
- Estado global de autenticação
- Persistência no localStorage
- Limpeza automática em logout

## Personalização

### Estilos
Os componentes usam Tailwind CSS e podem ser facilmente customizados:
- Cores principais: azul (`blue-600`)
- Gradiente de fundo: `from-blue-50 to-indigo-100`
- Componentes totalmente responsivos

### Validação
Para modificar as regras de validação, edite o schema em `LoginForm.tsx`:

```typescript
const loginSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória').min(6, 'Senha deve ter pelo menos 6 caracteres'),
});
```

### API
Para modificar as URLs da API, edite o arquivo `lib/api.ts` ou as variáveis de ambiente.

## Próximos Passos

1. **Integrar com seu backend**: Certifique-se de que os endpoints estão implementados
2. **Customizar design**: Ajuste cores, fontes e layout conforme necessário
3. **Adicionar funcionalidades**: 
   - Registro de usuário
   - Recuperação de senha
   - Perfil do usuário
   - Diferentes níveis de acesso
4. **Melhorar UX**:
   - Animações
   - Notificações toast
   - Loading skeletons

## Testando

1. Execute o frontend: `npm run dev`
2. Acesse `http://localhost:3000`
3. Você será redirecionado para `/login`
4. Teste o login com credenciais válidas do seu backend
5. Após login, será redirecionado para `/dashboard`
