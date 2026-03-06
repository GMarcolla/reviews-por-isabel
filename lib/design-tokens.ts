/**
 * Design Tokens para Reviews por Isabel
 * Centraliza todas as constantes de design para manter consistência visual
 */

export const colors = {
  rosaBlush: '#E8B4B8',         // Cor principal
  rosaClaro: '#F7E9EA',         // Background
  cremeClaro: '#FFF8F6',        // Background alternativo
  marromRosado: '#6B4F4F',      // Texto principal
  marromForte: '#4A2F2F',       // Títulos
  branco: '#FFFFFF',            // Branco
} as const;

export const fonts = {
  display: 'Playfair Display, serif',  // Títulos
  body: 'Inter, sans-serif',           // Texto
} as const;

export const spacing = {
  section: '4rem',              // Espaçamento entre seções
  container: '1.5rem',          // Padding do container
  card: '1rem',                 // Padding interno dos cards
} as const;

export const borderRadius = {
  sm: '0.5rem',                 // Pequeno
  md: '0.75rem',                // Médio
  lg: '1rem',                   // Grande
  full: '9999px',               // Circular
} as const;

// Type exports para TypeScript
export type ColorKey = keyof typeof colors;
export type FontKey = keyof typeof fonts;
export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
