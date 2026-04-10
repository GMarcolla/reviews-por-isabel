# Tech Stack

## Framework & Runtime

- **Next.js 15+** with App Router
- **React 19**
- **TypeScript 5**
- **Node.js** (via Next.js)

## Styling & UI

- **Tailwind CSS 3.4+** for styling
- **shadcn/ui** component patterns (class-variance-authority, clsx, tailwind-merge)
- **Lucide React** for icons
- Custom design tokens in `lib/design-tokens.ts`

## Maps & Geolocation

- **Leaflet** with React Leaflet for interactive maps
- **Google Maps API** (@googlemaps/js-api-loader, markerclusterer)
- Marker clustering for performance

## Data & Utilities

- **PapaParse** for CSV parsing
- **dotenv** for environment variables
- **color2k** for color manipulation

## Development Tools

- **ESLint** with Next.js config
- **tsx** for running TypeScript scripts
- **Autoprefixer** and **PostCSS** for CSS processing

## Common Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint

# Utilities
npm run convert-csv      # Convert CSV data to JSON
npm run audit-contrast   # Audit color contrast for accessibility
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SITE_URL` - Site URL for metadata
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Google Search Console verification
- Google Maps API keys (if using Google Maps)

## Build Output

- Static and dynamic routes via Next.js App Router
- Optimized images with AVIF/WebP formats
- Automatic code splitting and optimization
