/**
 * Design Tokens para Reviews por Isabel
 * Centraliza todas as constantes de design para manter consistência visual
 * 
 * Paleta Terracota: Cores terrosas e acolhedoras inspiradas em tons naturais
 */

const colors = {
  // Cores principais
  terracota: '#742615',
  terracotaClaro: '#a85a3a',
  terracotaEscuro: '#5f1f11',
  areia: '#c89e82',
  areiaClara: '#d4b09a',
  areiaEscura: '#b88a6a',
  backgroundPrincipal: '#f6f4f0',
  branco: '#ffffff',
  preto: '#000000',
  
  // Aliases para compatibilidade
  verdeTulipa: '#742615',
  verdeTulipaClaro: '#a85a3a',
  verdeTulipaEscuro: '#5f1f11',
  bejeTulipa: '#c89e82',
  bejeTulipaClaro: '#d4b09a',
  bejeTulipaEscuro: '#b88a6a',
  rosaTulipa: '#742615',
  rosaTulipaClaro: '#a85a3a',
  rosaTulipaEscuro: '#5f1f11',
  offWhiteRosado: '#f6f4f0',
  marromEscuro: '#742615',
};

const fonts = {
  display: 'Playfair Display, serif',
  body: 'Inter, sans-serif',
};

const semanticColors = {
  // Navegação
  headerBg: colors.branco,
  headerText: colors.terracota,
  headerTextActive: colors.terracota,
  headerBorder: colors.areia,
  
  // Botões primários
  btnPrimaryBg: colors.terracota,
  btnPrimaryText: colors.branco,
  btnPrimaryHover: colors.terracotaClaro,
  btnPrimaryActive: colors.terracotaEscuro,
  
  // Botões secundários
  btnSecondaryBg: colors.areia,
  btnSecondaryText: colors.branco,
  btnSecondaryHover: colors.areiaClara,
  btnSecondaryActive: colors.areiaEscura,
  
  // Cards
  cardBg: colors.branco,
  cardText: colors.terracota,
  cardBorder: colors.areia,
  
  // Badges
  badgeBg: colors.areia,
  badgeText: colors.branco,
  
  // Fundos de seção
  sectionBgPrimary: colors.backgroundPrincipal,
  sectionBgSecondary: colors.branco,
  sectionBgAccent: colors.areia + '33',
  
  // Links
  linkText: colors.terracota,
  linkHover: colors.terracotaClaro,
  
  // Footer
  footerBg: colors.terracota,
  footerText: colors.backgroundPrincipal,
  footerLink: colors.areiaEscura,
  
  // Foco
  focusRing: colors.terracota,
  focusRingOnDark: colors.backgroundPrincipal,
};

const categoryColors = {
  restaurantes: {
    badge: colors.terracota,
    badgeText: colors.branco,
  },
  cafes: {
    badge: colors.areia,
    badgeText: colors.branco,
  },
  lazer: {
    badge: colors.terracota,
    badgeText: colors.branco,
  },
  prestadores: {
    badge: colors.terracotaEscuro,
    badgeText: colors.branco,
  },
  lojas: {
    badge: colors.terracota,
    badgeText: colors.branco,
  },
  passeios: {
    badge: colors.terracota,
    badgeText: colors.branco,
  },
};

const spacing = {
  section: '4rem',
  container: '1.5rem',
  card: '1rem',
};

const borderRadius = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  full: '9999px',
};

// Exports
export { colors, fonts, semanticColors, categoryColors, spacing, borderRadius };

export type ColorKey = keyof typeof colors;
export type SemanticColorKey = keyof typeof semanticColors;
export type CategoryKey = keyof typeof categoryColors;
export type FontKey = keyof typeof fonts;
export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
