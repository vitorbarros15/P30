# Arquitetura do Frontend - P30

## 📁 Estrutura de Pastas

```
src/
├── core/                          # Lógica central da aplicação
│   ├── types/                     # Interfaces e tipos TypeScript
│   │   ├── auth.ts               # Tipos de autenticação
│   │   ├── api.ts                # Tipos de API
│   │   ├── ui.ts                 # Tipos de componentes UI
│   │   └── index.ts              # Exportações centralizadas
│   ├── services/                 # Serviços de integração
│   │   └── authService.ts        # Serviço de autenticação
│   ├── stores/                   # Gerenciamento de estado (Zustand)
│   │   ├── authStore.ts          # Store de autenticação
│   │   └── uiStore.ts            # Store de interface
│   ├── config/                   # Configurações
│   │   ├── axiosDefault.ts       # Cliente HTTP centralizado
│   │   └── design-system.ts      # Sistema de design
│   └── index.ts                  # Exportações do core
├── components/                    # Componentes reutilizáveis
│   ├── ui/                       # Componentes de interface
│   │   ├── Button.tsx            # Botão com variantes
│   │   ├── Input.tsx             # Input com validação
│   │   ├── Card.tsx              # Card com header/content/footer
│   │   ├── Loading.tsx           # Componentes de loading
│   │   └── Toast.tsx             # Sistema de notificações
│   ├── forms/                    # Formulários
│   │   └── LoginForm.tsx         # Formulário de login
│   ├── layout/                   # Componentes de layout
│   │   ├── ProtectedRoute.tsx    # Proteção de rotas
│   │   └── AppLayout.tsx         # Layout principal
│   └── index.ts                  # Exportações de componentes
└── app/                          # Páginas (App Router)
    ├── login/
    │   └── page.tsx              # Página de login
    ├── dashboard/
    │   └── page.tsx              # Dashboard protegido
    ├── layout.tsx                # Layout raiz
    └── page.tsx                  # Página inicial
```

## 🏗️ Princípios Arquiteturais

### 1. **Separação de Responsabilidades**
- **Core**: Lógica de negócio, tipos, serviços e configurações
- **Components**: Interface do usuário reutilizável
- **App**: Páginas e roteamento

### 2. **Centralização**
- **Interfaces**: Todas em `/core/types`
- **Serviços**: Centralizados em `/core/services`
- **Configurações**: Em `/core/config`

### 3. **Design System**
- Cores, espaçamentos e tipografia padronizados
- Componentes com variantes consistentes
- Tema unificado em todo o projeto

## 🔧 Tecnologias e Padrões

### **Gerenciamento de Estado**
- **Zustand**: Substitui Context API para melhor performance
- **Persistência**: Automática no localStorage
- **TypeScript**: Tipagem forte em todos os stores

### **Cliente HTTP**
- **Abstração**: Interface `HttpClient` para facilitar troca de biblioteca
- **Interceptors**: Automáticos para token e tratamento de erros
- **Logging**: Desenvolvimento com logs detalhados

### **Validação**
- **Zod**: Schemas de validação type-safe
- **React Hook Form**: Performance otimizada
- **Mensagens**: Localizadas em português

## 🎨 Design System

### **Cores**
```typescript
primary: {
  50: '#eff6ff',    // Muito claro
  600: '#2563eb',   // Principal
  900: '#1e3a8a',   // Muito escuro
}
```

### **Componentes**
- **Button**: 5 variantes (primary, secondary, outline, ghost, danger)
- **Input**: 3 variantes (default, filled, outline)
- **Card**: Sistema modular com header/content/footer

### **Responsividade**
- Mobile-first approach
- Breakpoints padronizados
- Grid system flexível

## 🔐 Autenticação

### **Fluxo**
1. **Login**: Validação + armazenamento de token
2. **Persistência**: Automática no localStorage
3. **Verificação**: Token válido em cada requisição
4. **Logout**: Limpeza completa de dados

### **Proteção de Rotas**
- **ProtectedRoute**: Componente wrapper
- **Redirecionamento**: Automático para login
- **Loading States**: UX durante verificação

## 📡 Integração com Backend

### **Endpoints Esperados**
```typescript
POST /auth/login          // Login
POST /auth/logout         // Logout (opcional)
GET  /auth/me            // Dados do usuário
PUT  /auth/profile       // Atualizar perfil
```

### **Estrutura de Dados**
```typescript
// Request
{
  email: string;
  password: string;
}

// Response
{
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
  token: string;
}
```

## 🚀 Benefícios da Nova Arquitetura

### **Manutenibilidade**
- ✅ Código organizado e modular
- ✅ Separação clara de responsabilidades
- ✅ Fácil localização de funcionalidades

### **Escalabilidade**
- ✅ Componentes reutilizáveis
- ✅ Sistema de design consistente
- ✅ Store modular para novos recursos

### **Performance**
- ✅ Zustand otimizado vs Context API
- ✅ Lazy loading de componentes
- ✅ Interceptors eficientes

### **Developer Experience**
- ✅ TypeScript em toda aplicação
- ✅ Imports centralizados
- ✅ Hot reload otimizado

## 🔄 Migração de Context API para Zustand

### **Antes (Context API)**
```typescript
const { user, login } = useAuth();
```

### **Depois (Zustand)**
```typescript
const { user, login } = useAuthStore();
// ou com hook personalizado
const { user, login } = useAuth();
```

### **Vantagens**
- ✅ Menos boilerplate
- ✅ Melhor performance
- ✅ Persistência automática
- ✅ DevTools integradas

## 📝 Próximos Passos

1. **Testes**: Implementar testes unitários e de integração
2. **Storybook**: Documentação de componentes
3. **PWA**: Transformar em Progressive Web App
4. **Internacionalização**: Suporte a múltiplos idiomas
5. **Temas**: Sistema de temas dark/light

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Lint
npm run lint

# Instalar dependências
npm install
```

## 📚 Documentação Adicional

- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
