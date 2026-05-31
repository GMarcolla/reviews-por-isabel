# Design Técnico - Cozinhando com Isabel

## Visão Geral da Arquitetura

Esta feature adiciona um novo módulo de receitas ao site, seguindo os padrões arquiteturais existentes do Next.js App Router. A solução inclui:

- Rotas públicas para listagem e detalhe de receitas
- Rotas administrativas para CRUD de receitas
- Modelo de dados Prisma para persistência
- Componentes React reutilizáveis
- API routes para operações de backend

## Modelo de Dados

### Interface TypeScript (lib/types.ts)

```typescript
export interface Receita {
  id: string;
  slug: string;
  titulo: string;
  convidado: string;
  ingredientes: string;
  passos: string;
  imagem: string;
  opiniao: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReceitaFormData {
  titulo: string;
  convidado: string;
  ingredientes: string;
  passos: string;
  imagem?: File | string;
  opiniao: string;
}
```

### Prisma Schema (prisma/schema.prisma)

```prisma
model Receita {
  id            String   @id @default(cuid())
  slug          String   @unique
  titulo        String
  convidado     String
  ingredientes  String   @db.Text
  passos        String   @db.Text
  imagem        String
  opiniao       String   @db.Text
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([slug])
  @@map("receitas")
}
```

**Justificativas:**
- `@db.Text` para campos longos (ingredientes, passos, opinião)
- `slug` único e indexado para performance em buscas
- `cuid()` para IDs seguros e distribuídos
- Timestamps automáticos para auditoria

## Estrutura de Arquivos

```
reviews-por-isabel/
├── app/
│   ├── receitas/
│   │   ├── page.tsx                    # Listagem de receitas (RF01)
│   │   ├── [slug]/
│   │   │   └── page.tsx                # Detalhe de receita (RF02)
│   │   └── loading.tsx                 # Loading state
│   ├── api/
│   │   └── receitas/
│   │       ├── route.ts                # GET (listar) e POST (criar)
│   │       └── [id]/
│   │           └── route.ts            # GET, PUT, DELETE (por ID)
│   └── sitemap.ts                      # Atualizar com rotas de receitas
├── admin/
│   └── receitas/
│       ├── page.tsx                    # Listagem admin
│       ├── nova/
│       │   └── page.tsx                # Formulário de criação (RF04)
│       └── [id]/
│           └── editar/
│               └── page.tsx            # Formulário de edição (RF05)
├── components/
│   ├── receitas/
│   │   ├── CardReceita.tsx             # Card para listagem
│   │   ├── ReceitaDetail.tsx           # Componente de detalhe
│   │   └── ReceitaForm.tsx             # Formulário admin (criar/editar)
│   ├── Header.tsx                      # Atualizar menu (RF03)
│   └── MobileMenu.tsx                  # Atualizar menu mobile (RF03)
├── lib/
│   ├── types.ts                        # Adicionar interfaces Receita
│   ├── receitas.ts                     # Funções de acesso a dados
│   └── utils.ts                        # Funções auxiliares (slug, etc)
└── public/
    └── receitas/                       # Imagens das receitas
```

## Componentes

### 1. CardReceita.tsx
**Responsabilidade:** Exibir card resumido de receita na listagem

**Props:**
```typescript
interface CardReceitaProps {
  receita: Receita;
}
```

**Características:**
- Imagem responsiva com Next.js Image
- Título da receita (Playfair Display)
- Nome do convidado
- Link para página de detalhe
- Hover effects consistentes com cards de lugares

### 2. ReceitaDetail.tsx
**Responsabilidade:** Exibir todos os detalhes de uma receita

**Props:**
```typescript
interface ReceitaDetailProps {
  receita: Receita;
}
```

**Características:**
- Layout em seções: cabeçalho, ingredientes, passos, opinião
- Imagem destacada do prato
- Tipografia hierárquica
- Formatação de texto preservando quebras de linha
- Botão de compartilhamento (opcional)

### 3. ReceitaForm.tsx
**Responsabilidade:** Formulário para criar/editar receitas (admin)

**Props:**
```typescript
interface ReceitaFormProps {
  receita?: Receita; // undefined = modo criação
  onSubmit: (data: ReceitaFormData) => Promise<void>;
  onCancel: () => void;
}
```

**Características:**
- Validação client-side com React Hook Form
- Upload de imagem com preview
- Textarea para campos longos
- Estados de loading/erro
- Feedback visual de validação

### 4. Header.tsx (Modificação)
**Responsabilidade:** Adicionar item "Receitas" ao menu desktop

**Modificações:**
- Adicionar link para `/receitas` na lista de navegação
- Manter ordem lógica dos itens
- Aplicar estilo ativo quando pathname = `/receitas`

### 5. MobileMenu.tsx (Modificação)
**Responsabilidade:** Adicionar item "Receitas" ao menu mobile

**Modificações:**
- Adicionar link para `/receitas` no menu de 3 pontos
- Ícone apropriado (ChefHat ou UtensilsCrossed do Lucide)
- Manter consistência visual

## Rotas e Páginas

### Rotas Públicas

#### `/receitas` (app/receitas/page.tsx)
- **Tipo:** Server Component
- **Função:** Buscar receitas do banco e renderizar listagem
- **Metadata:** Título, descrição, OpenGraph
- **Layout:** Grid responsivo de cards

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Receitas - Cozinhando com Isabel',
    description: 'Receitas deliciosas preparadas por convidados especiais no quadro Cozinhando com Isabel',
    openGraph: {
      title: 'Receitas - Cozinhando com Isabel',
      description: 'Receitas deliciosas preparadas por convidados especiais',
      images: ['/og-receitas.jpg'],
    },
  };
}
```

#### `/receitas/[slug]` (app/receitas/[slug]/page.tsx)
- **Tipo:** Server Component com generateStaticParams
- **Função:** Buscar receita específica e renderizar detalhe
- **Metadata:** Dinâmica baseada na receita
- **404:** notFound() se slug não existir

```typescript
export async function generateStaticParams() {
  const receitas = await getReceitas();
  return receitas.map((receita) => ({
    slug: receita.slug,
  }));
}
```

### Rotas Administrativas

#### `/admin/receitas` (admin/receitas/page.tsx)
- **Tipo:** Client Component (interatividade)
- **Função:** Listar receitas com ações de editar/excluir
- **Proteção:** Middleware de autenticação
- **Features:** Tabela com busca/filtro, botões de ação

#### `/admin/receitas/nova` (admin/receitas/nova/page.tsx)
- **Tipo:** Client Component
- **Função:** Formulário de criação de receita
- **Proteção:** Middleware de autenticação
- **Submit:** POST para `/api/receitas`

#### `/admin/receitas/[id]/editar` (admin/receitas/[id]/editar/page.tsx)
- **Tipo:** Client Component
- **Função:** Formulário de edição pré-preenchido
- **Proteção:** Middleware de autenticação
- **Submit:** PUT para `/api/receitas/[id]`

### API Routes

#### `GET /api/receitas` (app/api/receitas/route.ts)
```typescript
export async function GET() {
  const receitas = await prisma.receita.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(receitas);
}
```

#### `POST /api/receitas` (app/api/receitas/route.ts)
```typescript
export async function POST(request: Request) {
  // 1. Validar autenticação
  // 2. Parse do body e validação
  // 3. Upload de imagem
  // 4. Gerar slug único
  // 5. Criar no banco
  // 6. Retornar receita criada
}
```

#### `GET /api/receitas/[id]` (app/api/receitas/[id]/route.ts)
```typescript
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const receita = await prisma.receita.findUnique({
    where: { id: params.id }
  });
  if (!receita) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(receita);
}
```

#### `PUT /api/receitas/[id]` (app/api/receitas/[id]/route.ts)
```typescript
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // 1. Validar autenticação
  // 2. Parse do body e validação
  // 3. Upload de nova imagem (se fornecida)
  // 4. Atualizar no banco
  // 5. Retornar receita atualizada
}
```

#### `DELETE /api/receitas/[id]` (app/api/receitas/[id]/route.ts)
```typescript
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // 1. Validar autenticação
  // 2. Buscar receita
  // 3. Deletar imagem do storage
  // 4. Deletar do banco
  // 5. Retornar sucesso
}
```

## Funções de Acesso a Dados (lib/receitas.ts)

```typescript
import { prisma } from '@/lib/prisma';
import { Receita } from '@/lib/types';

export async function getReceitas(): Promise<Receita[]> {
  return await prisma.receita.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getReceitaBySlug(slug: string): Promise<Receita | null> {
  return await prisma.receita.findUnique({
    where: { slug }
  });
}

export async function getReceitaById(id: string): Promise<Receita | null> {
  return await prisma.receita.findUnique({
    where: { id }
  });
}

export async function createReceita(data: Omit<Receita, 'id' | 'createdAt' | 'updatedAt'>): Promise<Receita> {
  return await prisma.receita.create({
    data
  });
}

export async function updateReceita(id: string, data: Partial<Receita>): Promise<Receita> {
  return await prisma.receita.update({
    where: { id },
    data
  });
}

export async function deleteReceita(id: string): Promise<void> {
  await prisma.receita.delete({
    where: { id }
  });
}
```

## Upload de Imagens

### Estratégia Recomendada: Local Storage

**Diretório:** `public/receitas/`

**Fluxo:**
1. Cliente envia FormData com imagem
2. API route valida tipo (JPEG, PNG, WebP) e tamanho (max 5MB)
3. Gera nome único: `${slug}-${timestamp}.${ext}`
4. Salva em `public/receitas/`
5. Retorna path relativo: `/receitas/nome-arquivo.jpg`
6. Path é salvo no campo `imagem` do banco

**Alternativa:** Cloudinary/Vercel Blob
- Para produção, considerar serviço externo
- Melhor performance e CDN
- Requer configuração adicional

## Geração de Slugs

```typescript
// lib/utils.ts
export function generateSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

export async function generateUniqueSlug(titulo: string): Promise<string> {
  let slug = generateSlug(titulo);
  let counter = 1;
  
  while (await prisma.receita.findUnique({ where: { slug } })) {
    slug = `${generateSlug(titulo)}-${counter}`;
    counter++;
  }
  
  return slug;
}
```

## Validação de Dados

### Schema Zod (lib/validations/receita.ts)

```typescript
import { z } from 'zod';

export const receitaSchema = z.object({
  titulo: z.string().min(3, 'Título deve ter no mínimo 3 caracteres').max(100),
  convidado: z.string().min(2, 'Nome do convidado é obrigatório').max(100),
  ingredientes: z.string().min(10, 'Liste os ingredientes da receita'),
  passos: z.string().min(20, 'Descreva os passos da receita'),
  opiniao: z.string().min(10, 'Compartilhe sua opinião sobre a receita'),
  imagem: z.string().url('URL da imagem inválida').optional(),
});

export type ReceitaInput = z.infer<typeof receitaSchema>;
```

## Integração com Sitemap

### Modificação em app/sitemap.ts

```typescript
import { getReceitas } from '@/lib/receitas';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reviewsporisabel.com.br';
  
  // ... rotas existentes ...
  
  // Adicionar rotas de receitas
  const receitas = await getReceitas();
  const receitasUrls = receitas.map((receita) => ({
    url: `${baseUrl}/receitas/${receita.slug}`,
    lastModified: receita.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  return [
    // ... rotas existentes ...
    {
      url: `${baseUrl}/receitas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...receitasUrls,
  ];
}
```

## Decisões de Design

### 1. Server Components vs Client Components
- **Páginas públicas:** Server Components para melhor performance e SEO
- **Admin:** Client Components para interatividade (formulários, modals)
- **Cards:** Server Components (sem interatividade complexa)

### 2. Campos de Texto Livre
- Ingredientes e passos como texto livre (não estruturado)
- Permite flexibilidade na formatação
- Preservar quebras de linha com `white-space: pre-wrap`
- Futuro: considerar editor rich text se necessário

### 3. Estrutura de Pastas Admin
- Seguir padrão existente do projeto
- Separar admin de rotas públicas
- Proteção via middleware.ts

### 4. Imagens
- Next.js Image component para otimização automática
- Aspect ratio 16:9 para consistência
- Placeholder blur para melhor UX
- Alt text obrigatório (acessibilidade)

### 5. Ordenação
- Listagem pública: mais recentes primeiro (createdAt DESC)
- Admin: permitir ordenação por título, data, convidado

### 6. Paginação
- Fase 1: sem paginação (assumindo volume baixo)
- Futuro: adicionar se necessário (>50 receitas)

## Considerações de Performance

1. **Static Generation:** Usar generateStaticParams para pré-renderizar páginas de receitas
2. **Image Optimization:** Next.js Image com formatos modernos (AVIF, WebP)
3. **Database Indexing:** Índice em slug para queries rápidas
4. **Caching:** Revalidação incremental (ISR) se necessário

## Considerações de Segurança

1. **Autenticação:** Verificar sessão em todas as rotas admin
2. **Validação:** Zod schema no servidor (nunca confiar no cliente)
3. **Sanitização:** Escapar HTML em campos de texto
4. **Upload:** Validar tipo MIME real (não apenas extensão)
5. **Rate Limiting:** Limitar uploads e criações (prevenir abuso)

## Acessibilidade

1. **Semântica:** Tags HTML apropriadas (article, section, h1-h6)
2. **Alt Text:** Descrições significativas em imagens
3. **Contraste:** Verificar com audit-contrast.ts
4. **Keyboard:** Navegação completa por teclado
5. **ARIA:** Labels e roles quando necessário

## Testes Recomendados

1. **Unitários:** Funções de slug, validação
2. **Integração:** API routes, CRUD completo
3. **E2E:** Fluxo completo de criação/edição/exclusão
4. **Acessibilidade:** Lighthouse, axe-core
5. **Performance:** Core Web Vitals

## Referências Internas

- Seguir padrão de `lib/data/restaurantes.ts` para estrutura de dados
- Replicar estilo de cards de `components/CardLugar.tsx`
- Usar mesmas cores e tipografia do design system
- Adaptar layout de detalhe similar a páginas de lugares
