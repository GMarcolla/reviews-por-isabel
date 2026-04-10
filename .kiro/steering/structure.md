# Project Structure

## Directory Organization

```
reviews-por-isabel/
├── app/                    # Next.js App Router pages and routes
│   ├── [category]/        # Category listing pages (restaurantes, cafes, etc.)
│   │   └── [slug]/        # Individual place detail pages
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles and Tailwind imports
├── components/            # Reusable React components
│   └── ui/                # shadcn/ui components (if any)
├── lib/                   # Utilities, types, and data
│   ├── data/              # Data files for each category
│   ├── types.ts           # TypeScript interfaces
│   ├── utils.ts           # Utility functions
│   └── design-tokens.ts   # Design system tokens
├── public/                # Static assets
│   ├── img-botoes/        # Category button images
│   └── data/              # JSON data files
└── scripts/               # Utility scripts (CSV conversion, audits)
```

## Key Conventions

### Routing

- App Router with file-based routing
- Dynamic routes use `[slug]` or `[category]` folders
- Category pages: `/restaurantes`, `/cafes`, `/lazer`, `/lojas`, `/prestadores`
- Detail pages: `/[category]/[slug]`

### Components

- Client components marked with `'use client'` directive
- Server components by default (no directive)
- Component files use PascalCase: `Header.tsx`, `CardLugar.tsx`
- Props interfaces defined inline or in component file

### Data Management

- Data organized by category in `lib/data/`
- Each category exports getter functions: `getRestaurantes()`, `getCafes()`, etc.
- Central exports via `lib/data/index.ts`
- Types defined in `lib/types.ts`
- Main type: `Lugar` interface for all places

### Styling

- Tailwind utility classes for styling
- Custom colors defined in `tailwind.config.ts` (Tulipas palette)
- Design tokens: `verde-tulipa`, `beje-tulipa`, `rosa-tulipa`, `off-white-rosado`
- Typography: Playfair Display (headings), Inter (body)
- Utility function `cn()` from `lib/utils.ts` for conditional classes

### Path Aliases

- `@/*` maps to project root
- Import example: `import { Header } from '@/components/Header'`

### SEO & Metadata

- Metadata defined in `layout.tsx` and page files
- JSON-LD structured data for rich snippets
- OpenGraph and Twitter card metadata
- Sitemap generated via `app/sitemap.ts`

### Images

- Logo: `/logotipo.png`
- Category buttons: `/img-botoes/[category].png`
- Placeholder images: `/placeholder-[category].svg`
- Use Next.js `<Image>` component with proper alt text

### Testing & Scripts

- Scripts in `scripts/` directory run with `tsx`
- CSV conversion: `scripts/convert-csv-to-json.ts`
- Contrast audit: `scripts/audit-contrast.ts`
