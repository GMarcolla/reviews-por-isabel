---
inclusion: always
---

# Product Context

Reviews por Isabel is a curated local guide for Blumenau, Brazil and surrounding region. The site features Isabel's personal reviews and recommendations for places and experiences.

## Content Language

All user-facing content MUST be in Brazilian Portuguese (pt-BR):
- UI labels, buttons, and navigation
- Place descriptions and reviews
- Error messages and form validation
- SEO metadata (titles, descriptions)
- Keep code comments and technical documentation in English

## Category System

The site organizes places into five main categories. Each category has:
- A dedicated listing page at `/[category]`
- Individual place detail pages at `/[category]/[slug]`
- Data file in `lib/data/[category].ts`
- Category button image in `/public/img-botoes/[category].png`

Categories:
- `restaurantes` - Restaurants, bars, dining establishments
- `cafes` - Coffee shops, bakeries, dessert places (URL: `/cafes`, data file: `cafes.ts`)
- `lazer` - Leisure activities, parks, events, entertainment
- `lojas` - Retail shops (fashion, books, decor)
- `prestadores` - Service providers (dentists, beauty, wellness)

## Core Features

1. Place Listings - Browse places by category with filtering
2. Place Details - Individual pages with full info, contact, reviews
3. Interactive Map - Leaflet/Google Maps showing all locations with clustering
4. Cupons - Discount coupons for featured places (`/cupons`)
5. Roteiro - Curated itineraries for visitors (`/roteiro`)
6. Contact - User inquiry form (`/contato`)

## Data Model

All places use the `Lugar` interface from `lib/types.ts`. Key fields:
- `nome` - Place name
- `slug` - URL-friendly identifier
- `categoria` - One of the five categories
- `descricao` - Description text
- `endereco`, `telefone`, `instagram`, `site` - Contact info
- `latitude`, `longitude` - Map coordinates
- `tags` - Array of searchable tags

## User Experience Principles

- Personal touch - Isabel's voice and curation throughout
- Local focus - Blumenau and surrounding region only
- Visual appeal - Use Tulipas color palette (verde, beje, rosa, off-white-rosado)
- Accessibility - Maintain WCAG contrast ratios, semantic HTML
- Mobile-first - Responsive design for tourists on-the-go

## Target Audience

- Locals seeking new places to try
- Tourists planning visits to Blumenau
- People looking for trusted, personal recommendations vs generic reviews
