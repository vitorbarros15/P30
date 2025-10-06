# Componentes de Ícones

## IconPeixe30

Componente de ícone personalizado do peixe para a marca P30.

### Props

```typescript
interface IconPeixe30Props {
  className?: string;    // Classes CSS adicionais
  size?: 'sm' | 'md' | 'lg' | 'xl';  // Tamanho do ícone
  color?: string;        // Cor do ícone (padrão: currentColor)
}
```

### Tamanhos

- **sm**: `h-4 w-4` (16px)
- **md**: `h-6 w-6` (24px) - padrão
- **lg**: `h-8 w-8` (32px)
- **xl**: `h-12 w-12` (48px)

### Exemplos de Uso

```tsx
import { IconPeixe30 } from '@/components';

// Uso básico
<IconPeixe30 />

// Com tamanho personalizado
<IconPeixe30 size="lg" />

// Com cor personalizada
<IconPeixe30 color="blue" />

// Com classes CSS adicionais
<IconPeixe30 className="animate-spin" />

// Em um botão
<Button leftIcon={<IconPeixe30 size="sm" />}>
  Peixe Button
</Button>

// Em um card
<Card>
  <CardHeader 
    title="Peixe Card" 
    actions={<IconPeixe30 size="md" color="blue-600" />} 
  />
</Card>
```

### Características do SVG

- **Design moderno**: Peixe estilizado com gradientes
- **Escalável**: Vetorial, funciona em qualquer tamanho
- **Acessível**: Suporte a screen readers
- **Customizável**: Cores e tamanhos flexíveis
- **Performance**: Otimizado para web

### Cores Recomendadas

```tsx
// Cores do design system
<IconPeixe30 color="#3b82f6" />  // Primary blue
<IconPeixe30 color="#1e40af" />  // Dark blue
<IconPeixe30 color="#ffffff" />  // White
<IconPeixe30 color="#374151" />  // Gray
<IconPeixe30 color="#059669" />  // Green
```

### Implementação no Projeto

O ícone está sendo usado em:

1. **Página de Login**: Logo principal (tamanho lg)
2. **Header do Dashboard**: Logo do header (tamanho sm)
3. **Componentes**: Disponível para uso em qualquer lugar

### Personalização

Para personalizar ainda mais o ícone, você pode:

1. **Modificar as cores**: Ajuste o gradiente no SVG
2. **Alterar o tamanho**: Use as props de tamanho
3. **Adicionar animações**: Use classes CSS como `animate-spin`, `animate-pulse`
4. **Criar variações**: Duplique o componente para diferentes estilos

### Exemplo com Animações

```tsx
// Peixe girando
<IconPeixe30 className="animate-spin" />

// Peixe pulsando
<IconPeixe30 className="animate-pulse" />

// Peixe com hover effect
<IconPeixe30 className="transition-transform hover:scale-110" />
```
