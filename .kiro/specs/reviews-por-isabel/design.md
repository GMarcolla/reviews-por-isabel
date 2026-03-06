# Design Document: Reviews por Isabel

## Overview

Reviews por Isabel é uma aplicação web estática construída com Next.js 14+ (App Router), TypeScript, Tailwind CSS e shadcn/ui. O site funciona como um guia visual de lugares e experiências em Blumenau, com foco em performance, estética elegante e experiência mobile-first.

A arquitetura utiliza Static Site Generation (SSG) para gerar todas as páginas em build time, garantindo carregamento instantâneo e excelente SEO. O design system é baseado em uma paleta de cores rosa/marrom com tipografia elegante (Playfair Display + Inter), criando uma identidade visual feminina e sofisticada.

### Key Design Decisions

1. **Next.js App Router**: Utiliza o novo App Router para melhor organização de rotas e layouts compartilhados
2. **Static Generation**: Todas as páginas são geradas estaticamente para máxima performance
3. **Component-First**: Arquitetura baseada em componentes reutilizáveis do shadcn/ui
4. **Type-Safe**: TypeScript em todo o código para segurança de tipos
5. **Mobile-First**: Design responsivo com prioridade para dispositivos móveis
6. **Data-Driven**: Conteúdo separado em arquivos de dados para fácil manutenção

## Architecture

### Directory Structure

```
reviews-por-isabel/
├── app/
│   ├── layout.tsx                 # Root layout com Header/Footer
│   ├── page.tsx                   # Home page
│   ├── restaurantes/
│   │   ├── page.tsx              # Lista de restaurantes
│   │   └── [slug]/
│   │       └── page.tsx          # Detalhes do restaurante
│   ├── cafes/
│   │   ├── page.tsx              # Lista de cafés
│   │   └── [slug]/
│   │       └── page.tsx          # Detalhes do café
│   ├── passeios/
│   │   ├── page.tsx              # Lista de passeios
│   │   └── [slug]/
│   │       └── page.tsx          # Detalhes do passeio
│   ├── roteiro/
│   │   └── page.tsx              # Roteiro em Blumenau
│   ├── cupons/
│   │   └── page.tsx              # Lista de cupons
│   └── contato/
│       └── page.tsx              # Formulário de contato
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── Header.tsx                 # Navegação principal
│   ├── Footer.tsx                 # Rodapé
│   ├── CardLugar.tsx             # Card de lugar
│   ├── BotaoHub.tsx              # Botão grande da home
│   ├── SectionTitle.tsx          # Título de seção
│   ├── Container.tsx             # Container responsivo
│   └── CategorySection.tsx       # Seção de categoria
├── lib/
│   ├── data/
│   │   ├── restaurantes.ts       # Dados de restaurantes
│   │   ├── cafes.ts              # Dados de cafés
│   │   ├── passeios.ts           # Dados de passeios
│   │   └── cupons.ts             # Dados de cupons
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Funções utilitárias
├── public/
│   ├── images/                   # Imagens otimizadas
│   └── favicon.ico               # Favicon
└── styles/
    └── globals.css               # Estilos globais e Tailwind
```

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Deployment**: Vercel
- **Image Optimization**: Next.js Image component

## Components and Interfaces

### Core Components

#### 1. Header Component

```typescript
// components/Header.tsx
interface HeaderProps {
  currentPath?: string;
}

// Features:
// - Logo/título "Reviews por Isabel"
// - Menu de navegação horizontal (desktop)
// - Menu hamburger (mobile)
// - Destaque visual do item ativo
// - Sticky positioning
```

#### 2. Footer Component

```typescript
// components/Footer.tsx
interface FooterProps {
  // No props needed
}

// Features:
// - Links para redes sociais
// - Copyright
// - Links secundários
// - Design minimalista
```

#### 3. CardLugar Component

```typescript
// components/CardLugar.tsx
interface CardLugarProps {
  lugar: Lugar;
  variant?: 'default' | 'large';
  showCategory?: boolean;
}

// Features:
// - Imagem responsiva com aspect ratio
// - Nome do lugar
// - Descrição curta
// - Categoria (opcional)
// - Botão "ver mais"
// - Hover effects
// - Link para página de detalhes
```

#### 4. BotaoHub Component

```typescript
// components/BotaoHub.tsx
interface BotaoHubProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  href: string;
  variant?: 'primary' | 'secondary';
}

// Features:
// - Botão grande e clicável
// - Ícone
// - Título e descrição
// - Cores da paleta
// - Hover/active states
// - Link interno
```

#### 5. SectionTitle Component

```typescript
// components/SectionTitle.tsx
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

// Features:
// - Tipografia Playfair Display
// - Subtítulo opcional
// - Alinhamento configurável
// - Espaçamento consistente
```

#### 6. Container Component

```typescript
// components/Container.tsx
interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Features:
// - Max-width responsivo
// - Padding horizontal
// - Centralização
// - Tamanhos configuráveis
```

#### 7. CategorySection Component

```typescript
// components/CategorySection.tsx
interface CategorySectionProps {
  title: string;
  lugares: Lugar[];
  columns?: 2 | 3 | 4;
}

// Features:
// - Título da categoria
// - Grid responsivo de cards
// - Número de colunas configurável
// - Empty state
```

### Layout Components

#### Root Layout

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Features:
  // - HTML lang="pt-BR"
  // - Metadata (title, description, OG tags)
  // - Google Fonts loading
  // - Header component
  // - Main content area
  // - Footer component
  // - Global styles
}
```

## Data Models

### Lugar (Place)

```typescript
// lib/types.ts
interface Lugar {
  id: string;                    // Unique identifier (slug)
  nome: string;                  // Nome do lugar
  categoria: CategoriaLugar;     // Categoria do lugar
  subcategoria?: string;         // Subcategoria opcional
  descricaoCurta: string;        // Descrição para card (max 150 chars)
  descricaoCompleta: string;     // Descrição detalhada
  imagem: string;                // Path da imagem principal
  imagemAlt: string;             // Alt text da imagem
  galeria?: string[];            // Imagens adicionais
  endereco?: string;             // Endereço completo
  telefone?: string;             // Telefone de contato
  instagram?: string;            // Handle do Instagram
  website?: string;              // URL do website
  horarioFuncionamento?: string; // Horário de funcionamento
  faixaPreco?: 1 | 2 | 3 | 4;   // Faixa de preço ($ a $$$$)
  destaque?: boolean;            // Se é destaque na home
  ordem?: number;                // Ordem de exibição
}

type CategoriaLugar = 
  | 'hamburgueria'
  | 'italiano'
  | 'japones'
  | 'pizzaria'
  | 'romantico'
  | 'cafeteria'
  | 'doceria'
  | 'padaria'
  | 'brunch'
  | 'evento'
  | 'concerto'
  | 'festival'
  | 'parque'
  | 'passeio';
```

### Cupom (Coupon)

```typescript
// lib/types.ts
interface Cupom {
  id: string;                    // Unique identifier
  lugarId: string;               // ID do lugar relacionado
  codigo: string;                // Código do cupom
  descricao: string;             // Descrição do desconto
  validade?: string;             // Data de validade (ISO string)
  termos?: string;               // Termos e condições
  ativo: boolean;                // Se o cupom está ativo
}
```

### RoteiroPeriodo (Itinerary Period)

```typescript
// lib/types.ts
interface RoteiroPeriodo {
  periodo: 'manha' | 'tarde' | 'noite';
  titulo: string;                // Ex: "Café da Manhã Especial"
  descricao: string;             // Descrição da atividade
  lugarId?: string;              // ID do lugar (se aplicável)
  imagem?: string;               // Imagem ilustrativa
  dicas?: string[];              // Dicas adicionais
}

interface Roteiro {
  titulo: string;                // Ex: "1 Dia em Blumenau"
  descricao: string;             // Introdução do roteiro
  periodos: RoteiroPeriodo[];    // Manhã, Tarde, Noite
}
```

### ContatoFormData (Contact Form Data)

```typescript
// lib/types.ts
interface ContatoFormData {
  nome: string;                  // Nome do usuário
  email: string;                 // Email do usuário
  mensagem: string;              // Mensagem
}

interface ContatoFormErrors {
  nome?: string;
  email?: string;
  mensagem?: string;
}
```

### Design Tokens

```typescript
// lib/design-tokens.ts
export const colors = {
  rosaBlush: '#E8B4B8',         // Cor principal
  rosaClaro: '#F7E9EA',         // Background
  cremeClaro: '#FFF8F6',        // Background alternativo
  marromRosado: '#6B4F4F',      // Texto principal
  marromForte: '#4A2F2F',       // Títulos
  branco: '#FFFFFF',            // Branco
};

export const fonts = {
  display: 'Playfair Display, serif',  // Títulos
  body: 'Inter, sans-serif',           // Texto
};

export const spacing = {
  section: '4rem',              // Espaçamento entre seções
  container: '1.5rem',          // Padding do container
  card: '1rem',                 // Padding interno dos cards
};

export const borderRadius = {
  sm: '0.5rem',                 // Pequeno
  md: '0.75rem',                // Médio
  lg: '1rem',                   // Grande
  full: '9999px',               // Circular
};
```

## Correctness Properties

*Uma propriedade é uma característica ou comportamento que deve ser verdadeiro em todas as execuções válidas de um sistema - essencialmente, uma declaração formal sobre o que o sistema deve fazer. As propriedades servem como ponte entre especificações legíveis por humanos e garantias de corretude verificáveis por máquina.*


### Property Reflection

Após análise do prework, identifiquei as seguintes redundâncias:

1. **Navegação de cards**: Os requisitos 3.3, 4.3 e 5.3 testam a mesma coisa (clicar em card navega para detalhes). Podem ser combinados em uma propriedade única.

2. **Agrupamento por categoria**: Os requisitos 3.1, 4.1 e 5.1 testam o mesmo padrão (lugares agrupados por categoria). Podem ser combinados em uma propriedade única.

3. **Renderização de cards**: Os requisitos 3.2, 4.2 e 5.2 testam que cards contêm campos obrigatórios. Podem ser combinados em uma propriedade única.

4. **Títulos de seção por categoria**: Os requisitos 3.5 e 4.5 testam o mesmo padrão. Podem ser combinados.

5. **Meta tags**: Os requisitos 11.2 e 11.3 testam presença de meta tags. Podem ser combinados em uma propriedade mais abrangente.

6. **Validação de formulário**: Os requisitos 8.2 e 8.3 testam validação de formulário. Podem ser combinados em uma propriedade de validação geral.

### Correctness Properties

#### Property 1: Navegação de menu funcional

*Para qualquer* item do menu de navegação, quando clicado, o sistema deve navegar para a URL correspondente ao item.

**Validates: Requirements 1.2**

#### Property 2: Menu presente em todas as páginas

*Para qualquer* rota válida da aplicação, o componente Header deve estar presente no DOM.

**Validates: Requirements 1.3**

#### Property 3: Item de menu ativo destacado

*Para qualquer* página ativa, o item de menu correspondente deve ter um atributo ou classe que indica estado ativo.

**Validates: Requirements 1.4**

#### Property 4: Navegação de botões hub

*Para qualquer* botão hub na página inicial, quando clicado, o sistema deve navegar para a URL correspondente.

**Validates: Requirements 2.3**

#### Property 5: Lugares agrupados por categoria

*Para qualquer* conjunto de lugares (restaurantes, cafés ou passeios), quando renderizados em uma página de listagem, devem estar agrupados por sua categoria correspondente.

**Validates: Requirements 3.1, 4.1, 5.1**

#### Property 6: Cards de lugares contêm campos obrigatórios

*Para qualquer* lugar renderizado em um card, o card deve conter imagem, nome e descrição curta.

**Validates: Requirements 3.2, 4.2, 5.2**

#### Property 7: Navegação de cards para detalhes

*Para qualquer* card de lugar, quando o botão "ver mais" é clicado, o sistema deve navegar para a página de detalhes do lugar correspondente.

**Validates: Requirements 3.3, 4.3, 5.3**

#### Property 8: Títulos de seção por categoria

*Para qualquer* categoria que contém lugares, deve haver um título de seção visível na página.

**Validates: Requirements 3.5, 4.5**

#### Property 9: Períodos do roteiro têm sugestões

*Para qualquer* período (manhã, tarde, noite) no roteiro, deve haver uma sugestão de atividade ou lugar.

**Validates: Requirements 6.2**

#### Property 10: Links para lugares no roteiro

*Para qualquer* lugar mencionado no roteiro que possui um ID válido, deve haver um link clicável para a página de detalhes do lugar.

**Validates: Requirements 6.4**

#### Property 11: Cupons contêm informações obrigatórias

*Para qualquer* cupom renderizado, deve conter nome do lugar, descrição do desconto e código do cupom visíveis.

**Validates: Requirements 7.2**

#### Property 12: Cupons com link para lugar

*Para qualquer* cupom que possui um lugarId válido, deve haver um botão ou link que navega para a página de detalhes do lugar.

**Validates: Requirements 7.3**

#### Property 13: Validação de formulário de contato

*Para qualquer* conjunto de dados submetidos no formulário de contato, o sistema deve validar que campos obrigatórios (nome, email, mensagem) estão preenchidos e que o email é válido, retornando erros apropriados quando a validação falha.

**Validates: Requirements 8.2, 8.3**

#### Property 14: Meta tags presentes em todas as páginas

*Para qualquer* página da aplicação, deve haver meta tags de título, descrição e Open Graph definidas.

**Validates: Requirements 11.2, 11.3**

## Error Handling

### Client-Side Errors

#### 1. Formulário de Contato

**Validation Errors**:
- Campo vazio: Exibir mensagem "Este campo é obrigatório"
- Email inválido: Exibir mensagem "Por favor, insira um email válido"
- Mensagem muito curta: Exibir mensagem "A mensagem deve ter pelo menos 10 caracteres"

**Error Display**:
- Erros exibidos abaixo do campo correspondente
- Cor vermelha (#DC2626) para mensagens de erro
- Ícone de alerta ao lado da mensagem
- Borda vermelha no campo com erro

#### 2. Navegação e Rotas

**404 Not Found**:
- Página customizada com design do site
- Mensagem amigável: "Ops! Página não encontrada"
- Botão para voltar à home
- Sugestões de páginas populares

**Erro de Carregamento de Imagem**:
- Placeholder com cor de fundo rosa claro
- Ícone de imagem quebrada
- Alt text sempre presente
- Fallback para imagem padrão se disponível

#### 3. Data Loading

**Empty States**:
- Categoria sem lugares: "Nenhum lugar encontrado nesta categoria ainda"
- Sem cupons: "Nenhum cupom disponível no momento"
- Design consistente com o resto do site

### Build-Time Errors

#### 1. TypeScript Type Errors

**Strategy**:
- Strict mode habilitado
- Compilação falha se houver erros de tipo
- Interfaces validadas em build time

#### 2. Missing Data

**Strategy**:
- Validação de dados obrigatórios em build time
- Erro claro se lugar não tem imagem ou nome
- Validação de IDs únicos

#### 3. Invalid Routes

**Strategy**:
- generateStaticParams valida slugs
- Erro em build se rota inválida
- Lista de slugs válidos verificada

### Error Boundaries

```typescript
// components/ErrorBoundary.tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Features:
// - Captura erros de renderização
// - Exibe UI de fallback elegante
// - Log de erros para debugging
// - Botão para tentar novamente
```

## Testing Strategy

### Dual Testing Approach

O projeto utilizará uma combinação de testes unitários e testes baseados em propriedades para garantir corretude abrangente:

**Unit Tests**: Focados em exemplos específicos, casos extremos e condições de erro
**Property Tests**: Focados em propriedades universais que devem valer para todos os inputs

Ambos são complementares e necessários para cobertura completa.

### Property-Based Testing

**Library**: fast-check (para TypeScript/JavaScript)

**Configuration**:
- Mínimo de 100 iterações por teste de propriedade
- Cada teste deve referenciar a propriedade do design
- Tag format: `Feature: reviews-por-isabel, Property {number}: {property_text}`

**Property Test Examples**:

```typescript
// __tests__/properties/navigation.test.ts
import fc from 'fast-check';

describe('Feature: reviews-por-isabel, Property 1: Navegação de menu funcional', () => {
  it('should navigate to correct URL for any menu item', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('home', 'restaurantes', 'cafes', 'passeios', 'roteiro', 'cupons', 'contato'),
        (menuItem) => {
          // Test that clicking menu item navigates to correct URL
          const expectedUrl = menuItem === 'home' ? '/' : `/${menuItem}`;
          // Assert navigation behavior
        }
      ),
      { numRuns: 100 }
    );
  });
});

// __tests__/properties/lugares.test.ts
describe('Feature: reviews-por-isabel, Property 6: Cards de lugares contêm campos obrigatórios', () => {
  it('should render all required fields for any lugar', () => {
    fc.assert(
      fc.property(
        lugarArbitrary, // Generator for random Lugar objects
        (lugar) => {
          const card = render(<CardLugar lugar={lugar} />);
          expect(card.getByAltText(lugar.imagemAlt)).toBeInTheDocument();
          expect(card.getByText(lugar.nome)).toBeInTheDocument();
          expect(card.getByText(lugar.descricaoCurta)).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Testing

**Library**: Jest + React Testing Library

**Focus Areas**:
- Renderização de componentes específicos
- Interações de usuário (clicks, form submission)
- Edge cases (empty states, missing data)
- Error conditions (invalid email, empty form)
- Responsive behavior em breakpoints específicos

**Unit Test Examples**:

```typescript
// __tests__/components/Header.test.tsx
describe('Header Component', () => {
  it('should render all navigation items', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Restaurantes')).toBeInTheDocument();
    expect(getByText('Cafés & Docerias')).toBeInTheDocument();
    // ... outros itens
  });

  it('should show mobile menu on small screens', () => {
    global.innerWidth = 500;
    const { getByLabelText } = render(<Header />);
    expect(getByLabelText('Menu')).toBeInTheDocument();
  });
});

// __tests__/pages/contato.test.tsx
describe('Contact Form', () => {
  it('should show error for invalid email', () => {
    const { getByLabelText, getByText, getByRole } = render(<ContatoPage />);
    
    fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.click(getByRole('button', { name: 'Enviar' }));
    
    expect(getByText('Por favor, insira um email válido')).toBeInTheDocument();
  });

  it('should show error for empty required fields', () => {
    const { getByRole, getAllByText } = render(<ContatoPage />);
    
    fireEvent.click(getByRole('button', { name: 'Enviar' }));
    
    const errors = getAllByText('Este campo é obrigatório');
    expect(errors).toHaveLength(3); // nome, email, mensagem
  });
});
```

### Integration Testing

**Focus**: Fluxos completos de usuário

**Examples**:
- Navegar da home → restaurantes → detalhes de um restaurante
- Buscar cupom → clicar em "ver lugar" → ver detalhes do lugar
- Preencher formulário de contato → submeter → ver confirmação

### Visual Regression Testing

**Tool**: Chromatic ou Percy (opcional)

**Focus**:
- Componentes principais (Header, Footer, Cards)
- Páginas completas em diferentes breakpoints
- Estados de hover e interação

### Accessibility Testing

**Tool**: jest-axe + React Testing Library

**Focus**:
- Contraste de cores adequado
- Alt text em todas as imagens
- Labels em campos de formulário
- Navegação por teclado
- ARIA attributes apropriados

### Performance Testing

**Tool**: Lighthouse CI

**Metrics**:
- Performance score > 90
- Accessibility score > 95
- Best Practices score > 90
- SEO score > 95

**Focus**:
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3.5s

### Test Coverage Goals

- **Unit Tests**: 80%+ coverage de componentes e utilities
- **Property Tests**: Todas as 14 propriedades implementadas
- **Integration Tests**: Fluxos principais cobertos
- **E2E Tests**: Jornadas críticas do usuário

### Testing Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run property tests only
npm test -- properties

# Run with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e
```

## Implementation Notes

### Next.js App Router Patterns

#### 1. Static Generation

```typescript
// app/restaurantes/[slug]/page.tsx
export async function generateStaticParams() {
  const restaurantes = await getRestaurantes();
  return restaurantes.map((r) => ({
    slug: r.id,
  }));
}

export default async function RestaurantePage({ params }: { params: { slug: string } }) {
  const restaurante = await getRestauranteBySlug(params.slug);
  return <RestauranteDetail restaurante={restaurante} />;
}
```

#### 2. Metadata Generation

```typescript
// app/restaurantes/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const restaurante = await getRestauranteBySlug(params.slug);
  
  return {
    title: `${restaurante.nome} - Reviews por Isabel`,
    description: restaurante.descricaoCurta,
    openGraph: {
      title: restaurante.nome,
      description: restaurante.descricaoCurta,
      images: [restaurante.imagem],
    },
  };
}
```

#### 3. Layout Composition

```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rosa-blush': '#E8B4B8',
        'rosa-claro': '#F7E9EA',
        'creme-claro': '#FFF8F6',
        'marrom-rosado': '#6B4F4F',
        'marrom-forte': '#4A2F2F',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'card': '0.75rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(107, 79, 79, 0.1)',
        'card-hover': '0 4px 16px rgba(107, 79, 79, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Font Loading

```typescript
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
```

### Image Optimization

```typescript
// components/CardLugar.tsx
import Image from 'next/image';

<Image
  src={lugar.imagem}
  alt={lugar.imagemAlt}
  width={400}
  height={300}
  className="object-cover rounded-t-card"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  priority={lugar.destaque}
/>
```

### Data Management

```typescript
// lib/data/restaurantes.ts
import { Lugar } from '../types';

export const restaurantes: Lugar[] = [
  {
    id: 'villa-borghi',
    nome: 'Villa Borghi',
    categoria: 'italiano',
    descricaoCurta: 'Autêntica culinária italiana em ambiente elegante',
    descricaoCompleta: '...',
    imagem: '/images/restaurantes/villa-borghi.jpg',
    imagemAlt: 'Interior do restaurante Villa Borghi',
    endereco: 'Rua XV de Novembro, 123',
    faixaPreco: 3,
    destaque: true,
  },
  // ... mais restaurantes
];

export function getRestaurantes(): Lugar[] {
  return restaurantes;
}

export function getRestauranteBySlug(slug: string): Lugar | undefined {
  return restaurantes.find(r => r.id === slug);
}

export function getRestaurantesByCategoria(categoria: string): Lugar[] {
  return restaurantes.filter(r => r.categoria === categoria);
}
```

### Form Validation

```typescript
// lib/validation.ts
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateContatoForm(data: ContatoFormData): ContatoFormErrors {
  const errors: ContatoFormErrors = {};
  
  if (!data.nome.trim()) {
    errors.nome = 'Este campo é obrigatório';
  }
  
  if (!data.email.trim()) {
    errors.email = 'Este campo é obrigatório';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Por favor, insira um email válido';
  }
  
  if (!data.mensagem.trim()) {
    errors.mensagem = 'Este campo é obrigatório';
  } else if (data.mensagem.trim().length < 10) {
    errors.mensagem = 'A mensagem deve ter pelo menos 10 caracteres';
  }
  
  return errors;
}
```

### Responsive Utilities

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGridColumns(itemCount: number): string {
  if (itemCount === 1) return 'grid-cols-1';
  if (itemCount === 2) return 'grid-cols-1 md:grid-cols-2';
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
}
```

## Deployment

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["gru1"]
}
```

### Environment Variables

```bash
# .env.local (not committed)
NEXT_PUBLIC_SITE_URL=https://reviewsporisabel.com.br
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/reviewsporisabel
NEXT_PUBLIC_EMAIL=contato@reviewsporisabel.com.br
```

### Build Optimization

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export
  images: {
    unoptimized: true, // For static export
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

### SEO Configuration

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://reviewsporisabel.com.br'),
  title: {
    default: 'Reviews por Isabel - Guia de Blumenau',
    template: '%s - Reviews por Isabel',
  },
  description: 'Um guia de lugares e experiências em Blumenau e região',
  keywords: ['Blumenau', 'restaurantes', 'cafés', 'passeios', 'guia', 'turismo'],
  authors: [{ name: 'Isabel' }],
  creator: 'Isabel',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://reviewsporisabel.com.br',
    siteName: 'Reviews por Isabel',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reviews por Isabel',
    description: 'Um guia de lugares e experiências em Blumenau e região',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```
