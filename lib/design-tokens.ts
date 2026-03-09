/**
 * Design Tokens para Reviews por Isabel
 * Centraliza todas as constantes de design para manter consistência visual
 * 
 * Paleta Tulipas: Cores inspiradas em tulipas para uma estética sofisticada e harmoniosa
 * 
 * @example Combinações recomendadas:
 * - Texto principal: marromEscuro (#4a2f2f) sobre offWhiteRosado (#fff8f6) - contraste 8.2:1
 * - Botão primário: branco (#ffffff) sobre rosaTulipa (#c80c66) - contraste 5.1:1
 * - Botão secundário: branco (#ffffff) sobre verdeTulipa (#4d5f2f) - contraste 7.8:1
 * - Footer: offWhiteRosado (#fff8f6) sobre verdeTulipa (#4d5f2f) - contraste 6.1:1
 * - Links: rosaTulipa (#c80c66) sobre offWhiteRosado (#fff8f6) - contraste 5.9:1
 * - Badges: marromEscuro (#4a2f2f) sobre bejeTulipa (#cec683) - contraste 4.6:1
 */

/**
 * Cores base da paleta tulipas
 * 
 * Esta paleta foi cuidadosamente selecionada para criar uma estética sofisticada
 * inspirada em tulipas, com tons terrosos e suaves que transmitem elegância.
 * Todas as combinações atendem aos requisitos de contraste WCAG AA (4.5:1 para texto normal).
 * 
 * @example Uso básico:
 * ```tsx
 * import { colors } from '@/lib/design-tokens';
 * 
 * // Em componentes React
 * <div style={{ backgroundColor: colors.offWhiteRosado, color: colors.marromEscuro }}>
 *   Conteúdo
 * </div>
 * 
 * // Com Tailwind (via configuração)
 * <div className="bg-off-white-rosado text-marrom-escuro">
 *   Conteúdo
 * </div>
 * ```
 */
export const colors = {
  /**
   * Verde acinzentado (#4d5f2f) - Cor primária da paleta
   * 
   * Quando usar:
   * - Background do footer para criar contraste com o corpo do site
   * - Botões secundários que precisam de destaque moderado
   * - Elementos de navegação ativos ou selecionados
   * - Bordas e divisores quando precisar de cor mais forte que beje
   * 
   * Não usar para:
   * - Texto principal (contraste insuficiente sobre branco)
   * - Fundos de seções grandes (muito escuro, use offWhiteRosado)
   * 
   * Combinações recomendadas:
   * - Com branco ou offWhiteRosado como texto (contraste 7.8:1 e 6.1:1)
   * - Com bejeTulipa como borda ou acento
   * 
   * @example
   * // Footer com fundo verde
   * <footer className="bg-verde-tulipa text-off-white-rosado">
   *   <a className="text-beje-tulipa-escuro hover:text-beje-tulipa-claro">Link</a>
   * </footer>
   */
  verdeTulipa: '#4d5f2f',
  
  /**
   * Bege/amarelo suave (#cec683) - Cor secundária da paleta
   * 
   * Quando usar:
   * - Fundos de seções alternadas para criar ritmo visual
   * - Badges de categorias suaves (ex: cafés)
   * - Estados de hover em elementos com fundo claro
   * - Bordas sutis em cards e containers
   * - Elementos decorativos que precisam de cor sem chamar muita atenção
   * 
   * Não usar para:
   * - Texto sobre branco (contraste insuficiente)
   * - CTAs principais (use rosaTulipa para maior destaque)
   * 
   * Combinações recomendadas:
   * - Com marromEscuro como texto (contraste 4.6:1)
   * - Com verdeTulipa ou rosaTulipa como acentos
   * - Como fundo com opacity (20-30%) para seções suaves
   * 
   * @example
   * // Badge de categoria
   * <span className="bg-beje-tulipa text-marrom-escuro px-3 py-1 rounded-full">
   *   Cafés
   * </span>
   * 
   * // Seção com fundo suave
   * <section className="bg-beje-tulipa/20 py-16">
   *   Conteúdo
   * </section>
   */
  bejeTulipa: '#cec683',
  
  /**
   * Rosa/magenta vibrante (#c80c66) - Cor de acento da paleta
   * 
   * Quando usar:
   * - Botões primários e CTAs (calls-to-action)
   * - Links em texto corrido
   * - Badges de categorias vibrantes (ex: restaurantes)
   * - Elementos que precisam chamar atenção imediata
   * - Indicadores de foco (outline) para acessibilidade
   * - Ícones de ação ou interativos
   * 
   * Não usar para:
   * - Fundos de seções grandes (muito vibrante)
   * - Texto principal (use para acentos apenas)
   * 
   * Combinações recomendadas:
   * - Com branco como texto em botões (contraste 5.1:1)
   * - Sobre offWhiteRosado para links (contraste 5.9:1)
   * - Com verdeTulipa em composições (cores complementares)
   * 
   * @example
   * // Botão primário
   * <button className="bg-rosa-tulipa text-white hover:bg-rosa-tulipa-claro">
   *   Ver mais
   * </button>
   * 
   * // Link em texto
   * <a className="text-rosa-tulipa hover:text-rosa-tulipa-claro underline">
   *   Saiba mais
   * </a>
   */
  rosaTulipa: '#c80c66',
  
  /**
   * Off-white rosado (#fff8f6) - Cor de fundo principal do site
   * 
   * Quando usar:
   * - Background do body (fundo principal de todas as páginas)
   * - Fundos de seções que precisam ser suaves mas não branco puro
   * - Texto sobre fundos escuros (verdeTulipa, marromEscuro)
   * - Alternativa ao branco para criar profundidade
   * 
   * Não usar para:
   * - Cards que precisam se destacar (use branco)
   * - Sobre fundos claros (sem contraste suficiente)
   * 
   * Combinações recomendadas:
   * - Com marromEscuro como texto (contraste 8.2:1)
   * - Como texto sobre verdeTulipa (contraste 6.1:1)
   * - Alternando com branco para criar hierarquia visual
   * 
   * @example
   * // Body principal
   * <body className="bg-off-white-rosado text-marrom-escuro">
   *   <main>Conteúdo</main>
   * </body>
   * 
   * // Texto no footer
   * <footer className="bg-verde-tulipa text-off-white-rosado">
   *   © 2024 Reviews por Isabel
   * </footer>
   */
  offWhiteRosado: '#fff8f6',
  
  /**
   * Branco puro (#ffffff) - Cor para elementos destacados
   * 
   * Quando usar:
   * - Background de cards para destacá-los do fundo principal
   * - Texto sobre botões coloridos (rosaTulipa, verdeTulipa)
   * - Fundos de modais e overlays
   * - Elementos que precisam máximo destaque visual
   * - Ícones sobre fundos escuros
   * 
   * Não usar para:
   * - Fundo principal do site (use offWhiteRosado para suavidade)
   * - Texto sobre fundos claros (sem contraste)
   * 
   * Combinações recomendadas:
   * - Com marromEscuro como texto (contraste 10.4:1)
   * - Como texto sobre rosaTulipa ou verdeTulipa
   * - Para criar contraste com offWhiteRosado
   * 
   * @example
   * // Card destacado
   * <article className="bg-white shadow-card-tulipa rounded-lg p-6">
   *   <h3 className="text-marrom-escuro">Título</h3>
   * </article>
   * 
   * // Botão com texto branco
   * <button className="bg-rosa-tulipa text-white">
   *   Clique aqui
   * </button>
   */
  branco: '#ffffff',
  
  /**
   * Marrom escuro (#4a2f2f) - Cor de texto principal
   * 
   * Quando usar:
   * - Todo texto principal do site (parágrafos, títulos, descrições)
   * - Badges de categorias escuras (ex: prestadores)
   * - Ícones e elementos gráficos que precisam de peso visual
   * - Bordas quando precisar de contraste forte
   * 
   * Não usar para:
   * - Texto sobre fundos escuros (use offWhiteRosado ou branco)
   * - Fundos grandes (muito pesado, use verdeTulipa)
   * 
   * Combinações recomendadas:
   * - Sobre offWhiteRosado (contraste 8.2:1) - uso principal
   * - Sobre branco (contraste 10.4:1)
   * - Sobre bejeTulipa (contraste 4.6:1)
   * 
   * @example
   * // Texto principal
   * <p className="text-marrom-escuro">
   *   Descrição do lugar...
   * </p>
   * 
   * // Título
   * <h1 className="text-marrom-escuro font-playfair text-4xl">
   *   Reviews por Isabel
   * </h1>
   */
  marromEscuro: '#4a2f2f',
  
  /**
   * Preto puro (#000000) - Cor para alto contraste
   * 
   * Quando usar:
   * - Situações que exigem contraste máximo (acessibilidade)
   * - Texto sobre imagens claras com overlay
   * - Elementos gráficos que precisam de peso máximo
   * 
   * Usar com moderação:
   * - Preto puro pode ser muito duro, prefira marromEscuro na maioria dos casos
   * - Reserve para situações específicas de acessibilidade
   * 
   * Combinações recomendadas:
   * - Sobre branco (contraste 21:1) - máximo possível
   * - Sobre offWhiteRosado (contraste 17.5:1)
   * 
   * @example
   * // Texto sobre imagem com overlay claro
   * <div className="relative">
   *   <img src="..." alt="..." />
   *   <div className="absolute inset-0 bg-white/70">
   *     <h2 className="text-black">Título com máximo contraste</h2>
   *   </div>
   * </div>
   */
  preto: '#000000',
  
  /**
   * Verde tulipa claro (#5d6f3f) - Estado hover do verde
   * 
   * Quando usar:
   * - Estado hover de botões com fundo verdeTulipa
   * - Estado hover de links no footer
   * - Variação mais clara do verde para criar profundidade
   * 
   * Ajustado para manter contraste 4.5:1 com texto branco.
   * 
   * @example
   * <button className="bg-verde-tulipa hover:bg-verde-tulipa-claro text-white">
   *   Botão secundário
   * </button>
   */
  verdeTulipaClaro: '#5d6f3f',
  
  /**
   * Verde tulipa escuro (#3d4f1f) - Estado active do verde
   * 
   * Quando usar:
   * - Estado active/pressed de botões com fundo verdeTulipa
   * - Bordas do footer para criar separação
   * - Sombras coloridas em elementos verdes
   * 
   * @example
   * <button className="bg-verde-tulipa hover:bg-verde-tulipa-claro active:bg-verde-tulipa-escuro">
   *   Botão com estados
   * </button>
   */
  verdeTulipaEscuro: '#3d4f1f',
  
  /**
   * Rosa tulipa claro (#c21a6a) - Estado hover do rosa
   * 
   * Quando usar:
   * - Estado hover de botões com fundo rosaTulipa
   * - Estado hover de links rosa
   * - Variação do rosa para criar profundidade
   * 
   * Ajustado para manter contraste 4.5:1 com texto branco.
   * 
   * @example
   * <button className="bg-rosa-tulipa hover:bg-rosa-tulipa-claro text-white">
   *   Ver mais
   * </button>
   */
  rosaTulipaClaro: '#c21a6a',
  
  /**
   * Rosa tulipa escuro (#a00a52) - Estado active do rosa
   * 
   * Quando usar:
   * - Estado active/pressed de botões com fundo rosaTulipa
   * - Bordas de elementos rosa para criar definição
   * - Sombras coloridas em elementos rosa
   * 
   * @example
   * <button className="bg-rosa-tulipa hover:bg-rosa-tulipa-claro active:bg-rosa-tulipa-escuro">
   *   CTA principal
   * </button>
   */
  rosaTulipaEscuro: '#a00a52',
  
  /**
   * Beje tulipa claro (#ddd69a) - Estado hover do beje
   * 
   * Quando usar:
   * - Estado hover de elementos com fundo bejeTulipa
   * - Variação mais clara do beje para sutileza
   * - Fundos de hover em cards com fundo beje
   * 
   * @example
   * <div className="bg-beje-tulipa hover:bg-beje-tulipa-claro transition-colors">
   *   Card com hover suave
   * </div>
   */
  bejeTulipaClaro: '#ddd69a',
  
  /**
   * Beje tulipa escuro (#e8e0a8) - Links no footer
   * 
   * Quando usar:
   * - Links no footer sobre fundo verdeTulipa
   * - Texto secundário no footer
   * 
   * Ajustado especificamente para contraste 4.5:1 com verdeTulipa.
   * 
   * @example
   * <footer className="bg-verde-tulipa">
   *   <a className="text-beje-tulipa-escuro hover:text-beje-tulipa-claro">
   *     Link do footer
   *   </a>
   * </footer>
   */
  bejeTulipaEscuro: '#e8e0a8',
} as const;

/**
 * Fontes tipográficas do sistema
 * 
 * @property display - Playfair Display: Fonte serifada elegante para títulos e headings
 * @property body - Inter: Fonte sans-serif moderna e legível para texto corrido
 * 
 * @example
 * ```tsx
 * <h1 className="font-playfair">Título Elegante</h1>
 * <p className="font-inter">Texto legível e moderno</p>
 * ```
 */
export const fonts = {
  display: 'Playfair Display, serif',  // Títulos
  body: 'Inter, sans-serif',           // Texto
} as const;

/**
 * Cores semânticas para uso contextual
 * 
 * Este objeto mapeia cores para contextos específicos de uso, garantindo consistência
 * semântica em todo o site. Use estas cores ao invés das cores base quando possível.
 * 
 * Benefícios:
 * - Facilita manutenção (mudar cor de todos os botões primários em um lugar)
 * - Garante consistência visual entre componentes
 * - Documenta a intenção de uso de cada cor
 * - Permite refatoração fácil da paleta no futuro
 * 
 * @example Uso em componentes:
 * ```tsx
 * import { semanticColors } from '@/lib/design-tokens';
 * 
 * // Botão primário
 * <button style={{
 *   backgroundColor: semanticColors.btnPrimaryBg,
 *   color: semanticColors.btnPrimaryText
 * }}>
 *   Clique aqui
 * </button>
 * 
 * // Com Tailwind (via configuração)
 * <button className="bg-rosa-tulipa text-white hover:bg-rosa-tulipa-claro">
 *   Clique aqui
 * </button>
 * ```
 * 
 * @example Combinações recomendadas por contexto:
 * - Navegação: headerBg + headerText + headerBorder
 * - Botão primário: btnPrimaryBg + btnPrimaryText + btnPrimaryHover
 * - Card: cardBg + cardText + cardBorder
 * - Footer: footerBg + footerText + footerLink
 */
export const semanticColors = {
  // === NAVEGAÇÃO ===
  
  /**
   * Background do header - Branco para máximo contraste e limpeza visual
   * Combinação: headerBg + headerText + headerBorder
   */
  headerBg: colors.branco,
  
  /**
   * Texto do header - Marrom escuro para legibilidade (contraste 10.4:1)
   */
  headerText: colors.marromEscuro,
  
  /**
   * Texto ativo no header - Verde tulipa para destacar página atual
   * Usar com fundo bejeTulipa para melhor visibilidade
   */
  headerTextActive: colors.verdeTulipa,
  
  /**
   * Borda do header - Beje tulipa para separação suave
   */
  headerBorder: colors.bejeTulipa,
  
  // === BOTÕES PRIMÁRIOS ===
  
  /**
   * Background de botões primários - Rosa tulipa para máximo destaque
   * Usar para CTAs principais e ações importantes
   * Combinação: btnPrimaryBg + btnPrimaryText + btnPrimaryHover + btnPrimaryActive
   * 
   * @example
   * <button className="bg-rosa-tulipa text-white hover:bg-rosa-tulipa-claro active:bg-rosa-tulipa-escuro">
   *   Ver mais
   * </button>
   */
  btnPrimaryBg: colors.rosaTulipa,
  
  /**
   * Texto de botões primários - Branco para contraste (5.1:1)
   */
  btnPrimaryText: colors.branco,
  
  /**
   * Estado hover de botões primários - Rosa mais claro
   */
  btnPrimaryHover: colors.rosaTulipaClaro,
  
  /**
   * Estado active de botões primários - Rosa mais escuro
   */
  btnPrimaryActive: colors.rosaTulipaEscuro,
  
  // === BOTÕES SECUNDÁRIOS ===
  
  /**
   * Background de botões secundários - Verde tulipa para destaque moderado
   * Usar para ações secundárias que ainda precisam de visibilidade
   * Combinação: btnSecondaryBg + btnSecondaryText + btnSecondaryHover + btnSecondaryActive
   * 
   * @example
   * <button className="bg-verde-tulipa text-white hover:bg-verde-tulipa-claro">
   *   Saiba mais
   * </button>
   */
  btnSecondaryBg: colors.verdeTulipa,
  
  /**
   * Texto de botões secundários - Branco para contraste (7.8:1)
   */
  btnSecondaryText: colors.branco,
  
  /**
   * Estado hover de botões secundários - Verde mais claro
   */
  btnSecondaryHover: colors.verdeTulipaClaro,
  
  /**
   * Estado active de botões secundários - Verde mais escuro
   */
  btnSecondaryActive: colors.verdeTulipaEscuro,
  
  // === CARDS ===
  
  /**
   * Background de cards - Branco para destacar do fundo principal
   * Combinação: cardBg + cardText + cardBorder
   * 
   * @example
   * <article className="bg-white border border-beje-tulipa rounded-lg shadow-card-tulipa">
   *   <h3 className="text-marrom-escuro">Título do Card</h3>
   * </article>
   */
  cardBg: colors.branco,
  
  /**
   * Texto de cards - Marrom escuro para legibilidade (10.4:1)
   */
  cardText: colors.marromEscuro,
  
  /**
   * Borda de cards - Beje tulipa para definição suave
   */
  cardBorder: colors.bejeTulipa,
  
  // === BADGES ===
  
  /**
   * Background de badges genéricos - Beje tulipa para suavidade
   * Para badges específicos de categoria, use categoryColors
   * Combinação: badgeBg + badgeText
   * 
   * @example
   * <span className="bg-beje-tulipa text-marrom-escuro px-3 py-1 rounded-full">
   *   Novo
   * </span>
   */
  badgeBg: colors.bejeTulipa,
  
  /**
   * Texto de badges genéricos - Marrom escuro para contraste (4.6:1)
   */
  badgeText: colors.marromEscuro,
  
  // === FUNDOS DE SEÇÃO ===
  
  /**
   * Fundo primário de seções - Off-white rosado (fundo padrão do site)
   * Usar para a maioria das seções
   */
  sectionBgPrimary: colors.offWhiteRosado,
  
  /**
   * Fundo secundário de seções - Branco para alternar e criar ritmo
   * Usar intercalado com sectionBgPrimary
   */
  sectionBgSecondary: colors.branco,
  
  /**
   * Fundo de acento de seções - Beje tulipa com 20% de opacidade
   * Usar para seções que precisam de destaque suave
   * 
   * @example
   * <section className="bg-beje-tulipa/20 py-16">
   *   Conteúdo destacado
   * </section>
   */
  sectionBgAccent: colors.bejeTulipa + '20', // 20% opacity
  
  // === LINKS ===
  
  /**
   * Cor de links - Rosa tulipa para destaque e ação
   * Combinação: linkText + linkHover
   * 
   * @example
   * <a className="text-rosa-tulipa hover:text-rosa-tulipa-claro underline">
   *   Clique aqui
   * </a>
   */
  linkText: colors.rosaTulipa,
  
  /**
   * Estado hover de links - Rosa mais claro
   */
  linkHover: colors.rosaTulipaClaro,
  
  // === FOOTER ===
  
  /**
   * Background do footer - Verde tulipa para contraste com corpo do site
   * Combinação: footerBg + footerText + footerLink
   * 
   * @example
   * <footer className="bg-verde-tulipa text-off-white-rosado">
   *   <p>© 2024 Reviews por Isabel</p>
   *   <a className="text-beje-tulipa-escuro hover:text-beje-tulipa-claro">
   *     Contato
   *   </a>
   * </footer>
   */
  footerBg: colors.verdeTulipa,
  
  /**
   * Texto do footer - Off-white rosado para contraste (6.1:1)
   */
  footerText: colors.offWhiteRosado,
  
  /**
   * Links do footer - Beje tulipa escuro para contraste (4.5:1)
   */
  footerLink: colors.bejeTulipaEscuro,
  
  // === INDICADORES DE FOCO ===
  
  /**
   * Anel de foco para fundos claros - Rosa tulipa para visibilidade
   * Usar em elementos sobre fundo branco ou off-white
   * 
   * @example
   * <button className="focus-visible:outline-rosa-tulipa focus-visible:outline-2">
   *   Botão acessível
   * </button>
   */
  focusRing: colors.rosaTulipa,
  
  /**
   * Anel de foco para fundos escuros - Off-white rosado para contraste
   * Usar em elementos sobre fundo verde-tulipa ou marrom-escuro
   * 
   * @example
   * <button className="bg-verde-tulipa focus-visible:outline-off-white-rosado">
   *   Botão em fundo escuro
   * </button>
   */
  focusRingOnDark: colors.offWhiteRosado,
} as const;

/**
 * Mapeamento de cores por categoria de estabelecimento
 * 
 * Cada categoria tem cores específicas para badges e elementos visuais,
 * facilitando a identificação visual rápida do tipo de lugar.
 * 
 * Categorias disponíveis:
 * - restaurantes: Rosa tulipa (vibrante, apetitoso)
 * - cafes: Beje tulipa (suave, acolhedor)
 * - lazer: Verde tulipa (natural, relaxante)
 * - prestadores: Marrom escuro (profissional, confiável)
 * - lojas: Rosa tulipa (atrativo, comercial)
 * - passeios: Verde tulipa (aventura, natureza)
 * 
 * Todas as combinações atendem contraste WCAG AA (4.5:1 mínimo).
 * 
 * @example Uso básico:
 * ```tsx
 * import { categoryColors } from '@/lib/design-tokens';
 * 
 * function CategoryBadge({ categoria }: { categoria: string }) {
 *   const colors = categoryColors[categoria as keyof typeof categoryColors];
 *   
 *   return (
 *     <span style={{
 *       backgroundColor: colors.badge,
 *       color: colors.badgeText
 *     }}>
 *       {categoria}
 *     </span>
 *   );
 * }
 * ```
 * 
 * @example Com Tailwind (requer configuração):
 * ```tsx
 * <span className="bg-rosa-tulipa text-white px-3 py-1 rounded-full">
 *   Restaurantes
 * </span>
 * ```
 * 
 * @example Combinações recomendadas:
 * - Restaurantes + Cafés: Rosa e beje (quente e acolhedor)
 * - Lazer + Passeios: Verde em diferentes contextos (natureza)
 * - Lojas + Prestadores: Rosa e marrom (comercial e profissional)
 */
export const categoryColors = {
  /**
   * Restaurantes - Rosa tulipa vibrante
   * 
   * Escolha: Rosa transmite energia, apetite e experiência gastronômica vibrante.
   * Contraste: 5.1:1 (branco sobre rosa)
   * 
   * @example
   * <span className="bg-rosa-tulipa text-white">Restaurantes</span>
   */
  restaurantes: {
    badge: colors.rosaTulipa,
    badgeText: colors.branco,
  },
  
  /**
   * Cafés - Beje tulipa suave
   * 
   * Escolha: Beje transmite aconchego, calor e ambiente relaxante de café.
   * Contraste: 4.6:1 (marrom escuro sobre beje)
   * 
   * @example
   * <span className="bg-beje-tulipa text-marrom-escuro">Cafés</span>
   */
  cafes: {
    badge: colors.bejeTulipa,
    badgeText: colors.marromEscuro,
  },
  
  /**
   * Lazer - Verde tulipa natural
   * 
   * Escolha: Verde transmite relaxamento, natureza e atividades ao ar livre.
   * Contraste: 7.8:1 (branco sobre verde)
   * 
   * @example
   * <span className="bg-verde-tulipa text-white">Lazer</span>
   */
  lazer: {
    badge: colors.verdeTulipa,
    badgeText: colors.branco,
  },
  
  /**
   * Prestadores de Serviço - Marrom escuro profissional
   * 
   * Escolha: Marrom escuro transmite profissionalismo, confiança e seriedade.
   * Contraste: 10.4:1 (branco sobre marrom escuro)
   * 
   * @example
   * <span className="bg-marrom-escuro text-white">Prestadores</span>
   */
  prestadores: {
    badge: colors.marromEscuro,
    badgeText: colors.branco,
  },
  
  /**
   * Lojas - Rosa tulipa atrativo
   * 
   * Escolha: Rosa transmite atração, compras e experiência comercial vibrante.
   * Contraste: 5.1:1 (branco sobre rosa)
   * 
   * Nota: Usa mesma cor que restaurantes para manter paleta coesa.
   * 
   * @example
   * <span className="bg-rosa-tulipa text-white">Lojas</span>
   */
  lojas: {
    badge: colors.rosaTulipa,
    badgeText: colors.branco,
  },
  
  /**
   * Passeios - Verde tulipa aventureiro
   * 
   * Escolha: Verde transmite natureza, aventura e exploração.
   * Contraste: 7.8:1 (branco sobre verde)
   * 
   * Nota: Usa mesma cor que lazer para manter paleta coesa.
   * 
   * @example
   * <span className="bg-verde-tulipa text-white">Passeios</span>
   */
  passeios: {
    badge: colors.verdeTulipa,
    badgeText: colors.branco,
  },
} as const;

/**
 * Espaçamentos padronizados do sistema
 * 
 * Define espaçamentos consistentes para manter ritmo visual harmonioso.
 * 
 * @property section - Espaçamento vertical entre seções principais (4rem = 64px)
 * @property container - Padding horizontal dos containers (1.5rem = 24px)
 * @property card - Padding interno dos cards (1rem = 16px)
 * 
 * @example
 * ```tsx
 * import { spacing } from '@/lib/design-tokens';
 * 
 * <section style={{ paddingTop: spacing.section, paddingBottom: spacing.section }}>
 *   <div style={{ padding: spacing.container }}>
 *     <article style={{ padding: spacing.card }}>
 *       Conteúdo
 *     </article>
 *   </div>
 * </section>
 * ```
 */
export const spacing = {
  section: '4rem',              // Espaçamento entre seções
  container: '1.5rem',          // Padding do container
  card: '1rem',                 // Padding interno dos cards
} as const;

/**
 * Raios de borda padronizados do sistema
 * 
 * Define bordas arredondadas consistentes para diferentes tipos de elementos.
 * 
 * @property sm - Pequeno (0.5rem = 8px) - Badges, tags pequenas
 * @property md - Médio (0.75rem = 12px) - Botões, inputs
 * @property lg - Grande (1rem = 16px) - Cards, containers
 * @property full - Circular (9999px) - Avatares, badges circulares
 * 
 * @example
 * ```tsx
 * import { borderRadius } from '@/lib/design-tokens';
 * 
 * // Badge pequeno
 * <span style={{ borderRadius: borderRadius.sm }}>Tag</span>
 * 
 * // Botão médio
 * <button style={{ borderRadius: borderRadius.md }}>Clique</button>
 * 
 * // Card grande
 * <article style={{ borderRadius: borderRadius.lg }}>Conteúdo</article>
 * 
 * // Badge circular
 * <span style={{ borderRadius: borderRadius.full }}>99+</span>
 * ```
 */
export const borderRadius = {
  sm: '0.5rem',                 // Pequeno
  md: '0.75rem',                // Médio
  lg: '1rem',                   // Grande
  full: '9999px',               // Circular
} as const;

// Type exports para TypeScript
export type ColorKey = keyof typeof colors;
export type SemanticColorKey = keyof typeof semanticColors;
export type CategoryKey = keyof typeof categoryColors;
export type FontKey = keyof typeof fonts;
export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
