# CLAUDE.md

Contexto do projeto **Reviews por Isabel** para o Claude Code.

## O que é

Guia local curado de lugares e experiências em **Blumenau (SC) e região**, com as reviews
pessoais da Isabel. Site público em Next.js + área administrativa protegida para a Isabel
cadastrar lugares, cupons e receitas.

Produção: `https://reviewsporisabel.com.br` (Vercel, região `gru1`).

## Regra crítica: banco de dados

**O banco é de PRODUÇÃO e é o MESMO usado em desenvolvimento.** Qualquer perda de dados é
irreversível. Detalhes completos em `.kiro/steering/database-safety.md`.

❌ **NUNCA** rodar / aceitar:

```
npx prisma migrate reset
npx prisma db push --force-reset
npx prisma migrate dev            # pode pedir reset — evitar
```

Nunca confirmar prompt que mencione "reset", "drop" ou "delete all data".

✅ **Sempre** usar:

```
npx prisma migrate dev --name descricao --create-only   # gera SQL sem aplicar
# revisar o SQL gerado em prisma/migrations/
npx prisma migrate deploy                               # aplica
```

Se o Prisma detectar drift: **parar**, criar branch de backup no Neon Console, e só então
resolver com uma migration nova sem perda de dados. Recuperação: Point-in-Time Recovery no
Neon + `npm run restore-backup` com `BACKUP_DATABASE_URL` apontando para o branch de backup
(remover a variável depois).

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript 5** (strict)
- **Prisma 6** → **PostgreSQL na Neon** (via Vercel)
- **NextAuth v4** (Credentials, JWT) para o `/admin`
- **Tailwind CSS 3.4** + padrões shadcn/ui (`cn()`, cva, tailwind-merge) + **Lucide** icons
- **Cloudinary** (`next-cloudinary`) para upload/hospedagem de imagens
- **Leaflet / react-leaflet** + markercluster para o mapa (`/mapa`)
- **Zod 4** + **react-hook-form** para validação de formulários
- **@vercel/analytics** (pageviews; `/admin` é filtrado em `components/Analytics.tsx`)

## Comandos

```bash
npm run dev              # dev server em localhost:3000
npm run build            # prisma generate && next build
npm start                # produção
npm run lint             # ESLint (next/core-web-vitals)

npm run convert-csv      # scripts/convert-csv-to-json.ts → public/data/places.json
npm run audit-contrast   # auditoria WCAG AA da paleta
npm run restore-backup   # restauração de emergência do banco
npx prisma db seed       # scripts/seed.ts
```

Não há framework de testes configurado. `scripts/convert-csv-to-json.test.ts` e
`scripts/test-process-csv-row.ts` são scripts avulsos rodados com `tsx`.

## Estrutura

```
app/                     # App Router
  page.tsx               # homepage
  layout.tsx             # Header + main + WhatsAppButton + Footer + Analytics; metadata + JSON-LD
  restaurantes|cafes|lazer|lojas|prestadores/   # listagem + [slug] de detalhe
  passeios/              # legado — redirecionado para /lazer via next.config.ts
  receitas/              # "Cozinhando com Isabel" (listagem + [slug])
  cupons/ roteiro/ mapa/ sobre-mim/
  sitemap.ts  opengraph-image.tsx  not-found.tsx
  admin/                 # CRUD protegido: lugares, cupons, receitas, categorias
    actions.ts           # Server Actions ("use server") de lugares e cupons
  api/
    auth/[...nextauth]/  # NextAuth
    receitas/            # REST (GET/POST, [id] PUT/DELETE) — sessão obrigatória p/ escrita
components/              # PascalCase; receitas/ tem seus próprios componentes
lib/
  prisma.ts  auth.ts  types.ts  utils.ts  validation.ts  design-tokens.ts
  categorias.ts          # queries de Categoria/Subcategoria + CATEGORIA_IDS
  receitas.ts            # CRUD de receitas
  cloudinary-server.ts  upload-receitas.ts
  validations/receita.ts # schema Zod
  data/                  # queries por categoria (restaurantes, cafes, passeios, lojas, prestadores, cupons, roteiro)
prisma/                  # schema + migrations + seed-categorias.ts
scripts/                 # utilitários rodados com tsx
docs/                    # docs técnicas da feature receitas, analytics, auditoria de contraste
.kiro/steering/          # regras de produto/tech/estrutura/segurança do banco
public/data/places.json  # fonte de dados do mapa (gerado pelo convert-csv)
```

Alias de import: `@/*` → raiz do projeto.

## Modelo de dados (`prisma/schema.prisma`)

- **Categoria** — `nome`, `slug`, `rota`, `label`, `ordem`; tem `Subcategoria[]` e `Lugar[]`
- **Subcategoria** — pertence a Categoria (`onDelete: Cascade`), unique `[categoriaId, nome]`
- **Lugar** — entidade central. `slug` unique, descrições curta/completa, imagem + alt,
  endereço/cidade/bairro, até 2 links de Google Maps com label, contatos
  (telefone/instagram/instagramReview/website), `horarioFuncionamento`, `faixaPreco` (1–4),
  `destaque`, `ordem`. Relação opcional com Categoria/Subcategoria.
- **Cupom** — pertence a Lugar (cascade); `codigo`, `descricao`, `validade`, `termos`, `ativo`
- **Receita** — tabela `receitas`; `slug` unique+indexado, `titulo`, `convidado`,
  `ingredientes`, `passos`, `imagem`, `opiniao`

As interfaces TypeScript espelhadas ficam em `lib/types.ts` (`Lugar`, `Cupom`, `Receita`,
`Roteiro`/`RoteiroPeriodo`, `Place` para o mapa).

Categorias vivem **no banco**, não hardcoded. Consultar via `lib/categorias.ts`
(`getCategorias`, `getCategoriaByRota`, …). `CATEGORIA_IDS` guarda os IDs canônicos
(`cat_rest`, `cat_cafe`, `cat_pass`, `cat_loja`, `cat_serv`).

## Convenções

**Idioma** — todo conteúdo voltado ao usuário em **pt-BR**: labels, navegação, descrições,
mensagens de erro, validações, metadata de SEO. Comentários de código e docs técnicas em
inglês (regra de `.kiro/steering/product.md`; as docs em `docs/` na prática estão em pt-BR).

**Componentes** — Server Components por padrão; `'use client'` só quando necessário
(mapa, filtros, formulários, carrossel). Arquivos em PascalCase.

**Dados** — cada categoria tem seu módulo em `lib/data/` exportando getters async que já
fazem `include: { categoria: true, subcategoria: true }` e ordenam por `ordem: 'desc'`.
Reexportados por `lib/data/index.ts`.

**Escrita** — `/admin` usa Server Actions (`app/admin/actions.ts`) com `revalidatePath()`
após cada mutação; receitas usam as rotas REST em `app/api/receitas/`. Ao trocar a imagem de
um lugar, a antiga é apagada do Cloudinary (`deleteImageFromCloudinary`).

**Slugs** — gerados a partir do nome/título: lowercase, NFD sem acentos, não-alfanuméricos
viram hífen. `generateUniqueSlug()` em `lib/utils.ts` desambigua receitas por sufixo numérico;
`createLugar` usa sufixo de timestamp.

**Rotas legadas** — `/passeios` e `/passeios/:slug` redirecionam permanentemente para
`/lazer` (`next.config.ts`). O módulo `lib/data/passeios.ts` continua sendo a fonte de dados
de `/lazer` — o nome é histórico.

## Design system

Paleta **Terracota** (substituiu a antiga paleta "Tulipas" — os nomes `verde-tulipa`,
`rosa-tulipa`, `beje-tulipa` etc. permanecem como **aliases de compatibilidade** apontando
para as cores novas; preferir os nomes novos em código novo):

| Token | Hex | Uso |
|---|---|---|
| `terracota` | `#742615` | cor principal, textos, footer |
| `terracota-claro` | `#a85a3a` | hover |
| `terracota-escuro` | `#5f1f11` | active |
| `areia` | `#c89e82` | secundária, badges, bordas |
| `areia-clara` / `areia-escura` | `#d4b09a` / `#b88a6a` | hover / detalhes |
| `background-principal` | `#f6f4f0` | fundo |
| `background-card` | `#ffffff` | cards |

Definidos em `tailwind.config.ts` e em `lib/design-tokens.ts` (que também expõe cores
semânticas: `btnPrimaryBg`, `cardBorder`, `footerBg`, `focusRing`, …).

Tipografia: **Outfit** (display e body, via `--font-outfit`) e **Lora** (`--font-lora`),
carregadas com `next/font/google` no root layout. O README ainda menciona
Playfair Display/Inter e a paleta rosa antiga — está **desatualizado**.

Acessibilidade: manter contraste WCAG AA. Rodar `npm run audit-contrast` ao mexer em cores;
resultados históricos em `docs/contrast-audit-results.md`. Mobile-first.

## Autenticação

`middleware.ts` protege `/admin/:path*` via `next-auth/middleware`. Provider de credenciais
com usuário fixo `admin` e senha em `ADMIN_PASSWORD`; sessão JWT de 30 dias
(`lib/auth.ts`). As rotas de escrita de receitas checam `getServerSession()`.

## Variáveis de ambiente

`.env` (não versionado):

- `DATABASE_URL`, `DIRECT_URL` — Postgres/Neon
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `ADMIN_PASSWORD`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`,
  `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

`.env.local`:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — usado pelo script de conversão de CSV (geocoding)

Opcionais (ver `.env.example`): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`,
`NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

Imagens remotas: apenas `res.cloudinary.com` está liberado em `next.config.ts`.

## SEO

Metadata + OpenGraph/Twitter no root layout, JSON-LD (`WebSite`) injetado no `<head>`,
OG image dinâmica em `app/opengraph-image.tsx`, sitemap em `app/sitemap.ts`
(inclui lugares de todas as categorias), `public/robots.txt`. Locale `pt-BR`.

## Pontos de atenção conhecidos

- `README.md` descreve a paleta e as fontes antigas — não usar como referência de design.
- `app/admin/actions.ts` usa `any` nos payloads das Server Actions; não há validação Zod ali
  (diferente das receitas, que validam com `receitaSchema`).
- `check.js` é um script solto de inspeção do banco e faz `select` de `categoria`/
  `subcategoria` como escalares — quebrado desde a migração para o modelo relacional.
- `docs/receitas-tasks.md` é o plano de implementação da feature de receitas, com checkboxes
  não marcados apesar da feature estar entregue.
- `alteracoes-home.md` é uma spec de redesign da homepage.
