# Design Document: Reformulação Visual - Paleta Tulipas

## Overview

Este documento descreve o design técnico para a reformulação visual do site Reviews por Isabel, aplicando uma nova paleta de cores inspirada em tulipas. A solução mantém a arquitetura existente do Next.js com Tailwind CSS, atualizando apenas os design tokens e estilos dos componentes para criar uma estética mais sofisticada e menos infantil.

## Architecture

### Abordagem de Design

A reformulação seguirá uma abordagem de **design system atômico**, onde:

1. **Tokens (Átomos)**: Cores, espaçamentos e outros valores primitivos são definidos centralmente
2. **Componentes (Moléculas)**: Componentes React consomem os tokens através de classes Tailwind
3. **Páginas (Organismos)**: Páginas combinam componentes mantendo consistência visual

### Fluxo de Aplicação de Cores

```
Design Tokens (lib/design-tokens.ts)
    ↓
Tailwind Config (tailwind.config.ts)
    ↓
Classes Tailwind CSS
    ↓
Componentes React
    ↓
Páginas
```

### Princípios de Design

1. **Hierarquia Visual**: Usar cores para criar hierarquia clara (primária > secundária > acento)
2. **Contraste Acessível**: Todas as combinações devem atender WCAG AA (4.5:1 para texto normal)
3. **Harmonia Cromática**: Cores devem trabalhar juntas criando paleta coesa
4. **Sofisticação**: Evitar cores muito saturadas ou infantis, preferir tons terrosos e suaves

## Components and Interfaces

### 1. Design Tokens (lib/design-tokens.ts)

**Estrutura de Cores**:

```typescript
export const colors = {
  // Cores Primárias
  verdeTulipa: '#4d5f2f',        // Verde acinzentado - elementos de destaque, headers
  bejeTulipa: '#cec683',         // Bege/amarelo suave - fundos secundários, hover states
  rosaTulipa: '#c80c66',         // Rosa/magenta vibrante - CTAs, links, acentos
  
  // Cores de Fundo
  offWhiteRosado: '#fff8f6',     // Fundo principal do site
  branco: '#ffffff',             // Cards, elementos destacados
  
  // Cores de Texto
  marromEscuro: '#4a2f2f',       // Texto principal
  preto: '#000000',              // Texto de alto contraste (quando necessário)
  
  // Cores Derivadas (para estados e variações)
  verdeTulipaClaro: '#6b7f4f',   // Hover do verde
  verdeTulipaEscuro: '#3d4f1f',  // Active do verde
  rosaTulipaClaro: '#d83d7f',    // Hover do rosa
  rosaTulipaEscuro: '#a00a52',   // Active do rosa
  bejeTulipaClaro: '#ddd69a',    // Hover do bege
} as const;

export const semanticColors = {
  // Navegação
  headerBg: colors.branco,
  headerText: colors.marromEscuro,
  headerTextActive: colors.verdeTulipa,
  headerBorder: colors.bejeTulipa,
  
  // Botões Primários
  btnPrimaryBg: colors.rosaTulipa,
  btnPrimaryText: colors.branco,
  btnPrimaryHover: colors.rosaTulipaClaro,
  btnPrimaryActive: colors.rosaTulipaEscuro,
  
  // Botões Secundários
  btnSecondaryBg: colors.verdeTulipa,
  btnSecondaryText: colors.branco,
  btnSecondaryHover: colors.verdeTulipaClaro,
  btnSecondaryActive: colors.verdeTulipaEscuro,
  
  // Cards
  cardBg: colors.branco,
  cardText: colors.marromEscuro,
  cardBorder: colors.bejeTulipa,
  
  // Badges
  badgeBg: colors.bejeTulipa,
  badgeText: colors.marromEscuro,
  
  // Fundos de Seção
  sectionBgPrimary: colors.offWhiteRosado,
  sectionBgSecondary: colors.branco,
  sectionBgAccent: colors.bejeTulipa + '20', // 20% opacity
  
  // Links
  linkText: colors.rosaTulipa,
  linkHover: colors.rosaTulipaClaro,
  
  // Footer
  footerBg: colors.verdeTulipa,
  footerText: colors.offWhiteRosado,
  footerLink: colors.bejeTulipa,
} as const;
```

**Mapeamento de Categorias para Cores**:

```typescript
export const categoryColors = {
  restaurantes: {
    badge: colors.rosaTulipa,
    badgeText: colors.branco,
  },
  cafes: {
    badge: colors.bejeTulipa,
    badgeText: colors.marromEscuro,
  },
  lazer: {
    badge: colors.verdeTulipa,
    badgeText: colors.branco,
  },
  prestadores: {
    badge: colors.marromEscuro,
    badgeText: colors.branco,
  },
  lojas: {
    badge: colors.rosaTulipaClaro,
    badgeText: colors.branco,
  },
  passeios: {
    badge: colors.verdeTulipaClaro,
    badgeText: colors.branco,
  },
} as const;
```

### 2. Tailwind Configuration (tailwind.config.ts)

**Classes Customizadas**:

```typescript
theme: {
  extend: {
    colors: {
      'verde-tulipa': '#4d5f2f',
      'verde-tulipa-claro': '#6b7f4f',
      'verde-tulipa-escuro': '#3d4f1f',
      'beje-tulipa': '#cec683',
      'beje-tulipa-claro': '#ddd69a',
      'rosa-tulipa': '#c80c66',
      'rosa-tulipa-claro': '#d83d7f',
      'rosa-tulipa-escuro': '#a00a52',
      'off-white-rosado': '#fff8f6',
      'marrom-escuro': '#4a2f2f',
    },
    boxShadow: {
      'card-tulipa': '0 2px 8px rgba(77, 95, 47, 0.1)',
      'card-tulipa-hover': '0 4px 16px rgba(77, 95, 47, 0.15)',
    },
  },
}
```

### 3. Component Updates

#### Header Component

**Mudanças**:
- Background: branco → branco (mantém)
- Border: rosa-claro → beje-tulipa
- Texto: marrom-rosado → marrom-escuro
- Item ativo: rosa-claro bg → verde-tulipa text com beje-tulipa bg
- Hover: rosa-claro/50 → beje-tulipa/30

#### Footer Component

**Mudanças**:
- Background: creme-claro → verde-tulipa
- Border: rosa-claro → verde-tulipa-escuro
- Texto: marrom-rosado → off-white-rosado
- Links: marrom-rosado → beje-tulipa
- Hover: marrom-forte → beje-tulipa-claro

#### BotaoHub Component

**Mudanças para botões com imagem**:
- Manter imagens como estão (já atualizadas)
- Adicionar border sutil: beje-tulipa
- Hover: shadow com verde-tulipa

**Mudanças para botões sem imagem**:
- Variant primary: rosa-blush → rosa-tulipa
- Variant secondary: creme-claro → verde-tulipa
- Texto: marrom-forte → branco
- Hover: ajustar para cores -claro

#### CardLugar Component

**Mudanças**:
- Background: branco (mantém)
- Shadow: card → card-tulipa
- Shadow hover: card-hover → card-tulipa-hover
- Badge background: rosa-blush → usar categoryColors
- Botão "Ver mais": rosa-blush → rosa-tulipa
- Botão hover: rosa-blush/80 → rosa-tulipa-claro

#### CategorySection Component

**Mudanças**:
- Título: marrom-forte (mantém)
- Descrição: marrom-rosado → marrom-escuro com opacity-80

### 4. Global Styles (app/globals.css)

**Mudanças**:

```css
body {
  font-family: var(--font-inter);
  color: #4a2f2f; /* marrom-escuro */
  background-color: #fff8f6; /* off-white-rosado */
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-playfair);
  color: #4a2f2f; /* marrom-escuro */
}

/* Links globais */
a {
  color: #c80c66; /* rosa-tulipa */
  transition: color 200ms ease-in-out;
}

a:hover {
  color: #d83d7f; /* rosa-tulipa-claro */
}

/* Focus states para acessibilidade */
*:focus-visible {
  outline: 2px solid #c80c66; /* rosa-tulipa */
  outline-offset: 2px;
}
```

## Data Models

Não há mudanças nos modelos de dados. A reformulação é puramente visual.


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Contraste Acessível Universal

*For any* combinação de cor de texto e cor de fundo usada no sistema, a razão de contraste deve ser no mínimo 4.5:1 para texto normal (< 18px) e 3.0:1 para texto grande (≥ 18px ou ≥ 14px bold), e indicadores de foco devem ter contraste mínimo de 3.0:1.

**Validates: Requirements 2.5, 3.4, 5.5, 7.1, 7.2, 7.3, 7.4**

### Property 2: Cores Centralizadas

*For any* arquivo de componente React no projeto (exceto design-tokens.ts e tailwind.config.ts), não deve conter valores de cor hexadecimais hardcoded da paleta antiga (#E8B4B8, #F7E9EA, #6B4F4F, etc).

**Validates: Requirements 9.4**

### Property 3: Mapeamento de Categoria para Cor

*For any* categoria válida do sistema (restaurantes, cafes, lazer, prestadores, lojas, passeios), deve existir um mapeamento de cor definido em categoryColors, e quando um badge dessa categoria é renderizado, deve usar a cor correspondente.

**Validates: Requirements 4.2, 6.2**

### Property 4: Consistência de Componentes entre Páginas

*For any* tipo de componente visual (Header, Footer, BotaoHub, CardLugar), quando renderizado em páginas de categorias diferentes, deve aplicar as mesmas classes CSS base e os mesmos estilos de estado (hover, focus, active).

**Validates: Requirements 6.1, 6.3, 6.4**

### Property 5: Configuração de Transições

*For any* elemento interativo (botões, links, cards com hover), deve ter propriedade CSS transition definida com duração entre 200ms e 300ms e timing function de ease-in-out ou ease-out.

**Validates: Requirements 8.1, 8.2, 8.4**

### Property 6: Compatibilidade de API de Design Tokens

*For any* código existente que importa valores de design-tokens.ts, após a atualização da paleta, o código deve continuar compilando sem erros de tipo TypeScript (as exportações mantêm a mesma interface).

**Validates: Requirements 1.3**

## Error Handling

### Contraste Insuficiente

**Problema**: Combinação de cores não atinge contraste mínimo WCAG AA.

**Solução**:
1. Ajustar a cor para uma variação mais escura/clara
2. Adicionar background semitransparente (overlay)
3. Adicionar borda ou sombra para aumentar contraste
4. Usar cor alternativa da paleta

**Exemplo**: Badge sobre imagem pode não ter contraste suficiente.
- Solução: Adicionar `bg-opacity-90` ou `backdrop-blur-sm` ao badge

### Cores Hardcoded em Componentes

**Problema**: Desenvolvedor adiciona cor diretamente no componente sem usar design tokens.

**Solução**:
1. Linter/teste automatizado detecta valores hex hardcoded
2. Code review identifica violação
3. Refatorar para usar classe Tailwind ou design token

### Inconsistência entre Páginas

**Problema**: Componente renderiza diferente em páginas diferentes.

**Solução**:
1. Centralizar estilos em componente base
2. Evitar overrides específicos de página
3. Usar variantes do componente quando necessário
4. Testes visuais de regressão

## Testing Strategy

### Dual Testing Approach

A estratégia de testes combina **unit tests** para casos específicos e **property-based tests** para propriedades universais:

- **Unit tests**: Verificam exemplos específicos, casos extremos e condições de erro
- **Property tests**: Verificam propriedades universais através de múltiplas entradas geradas

### Unit Testing

**Foco dos Unit Tests**:
1. Componentes renderizam com classes CSS corretas
2. Estados visuais (hover, focus, active) aplicam classes apropriadas
3. Configurações específicas (body background, card styles)
4. Integração entre componentes e design tokens

**Exemplos de Unit Tests**:

```typescript
// Exemplo: Header usa cores corretas
test('Header renders with new color palette', () => {
  render(<Header />);
  const header = screen.getByRole('banner');
  expect(header).toHaveClass('bg-white', 'border-beje-tulipa');
});

// Exemplo: Botão Ver Mais usa cor de acento
test('Ver Mais button uses accent color', () => {
  render(<CardLugar lugar={mockLugar} />);
  const button = screen.getByText('Ver mais');
  expect(button).toHaveClass('bg-rosa-tulipa');
});

// Exemplo: Body tem background correto
test('Body has off-white rosado background', () => {
  expect(document.body).toHaveStyle('background-color: #fff8f6');
});
```

### Property-Based Testing

**Configuração**:
- Biblioteca: fast-check (para TypeScript/JavaScript)
- Iterações mínimas: 100 por teste
- Tag format: `Feature: reformulacao-visual-paleta-tulipas, Property {N}: {description}`

**Property Tests**:

#### Property 1: Contraste Acessível Universal

```typescript
// Feature: reformulacao-visual-paleta-tulipas, Property 1: Contraste Acessível Universal
test('all color combinations meet WCAG AA contrast requirements', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...allTextBackgroundCombinations),
      (combination) => {
        const { textColor, bgColor, fontSize, fontWeight } = combination;
        const contrast = calculateContrast(textColor, bgColor);
        
        const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);
        const minContrast = isLargeText ? 3.0 : 4.5;
        
        return contrast >= minContrast;
      }
    ),
    { numRuns: 100 }
  );
});
```

#### Property 2: Cores Centralizadas

```typescript
// Feature: reformulacao-visual-paleta-tulipas, Property 2: Cores Centralizadas
test('no hardcoded old palette colors in components', () => {
  const componentFiles = getAllComponentFiles();
  const oldColors = ['#E8B4B8', '#F7E9EA', '#6B4F4F', '#4A2F2F'];
  
  fc.assert(
    fc.property(
      fc.constantFrom(...componentFiles),
      (filePath) => {
        const content = fs.readFileSync(filePath, 'utf-8');
        return !oldColors.some(color => 
          content.toLowerCase().includes(color.toLowerCase())
        );
      }
    ),
    { numRuns: componentFiles.length }
  );
});
```

#### Property 3: Mapeamento de Categoria para Cor

```typescript
// Feature: reformulacao-visual-paleta-tulipas, Property 3: Mapeamento de Categoria para Cor
test('all categories have color mapping and badges use correct colors', () => {
  const categories = ['restaurantes', 'cafes', 'lazer', 'prestadores', 'lojas', 'passeios'];
  
  fc.assert(
    fc.property(
      fc.constantFrom(...categories),
      (category) => {
        // Verifica que categoria tem mapeamento
        const colorMapping = categoryColors[category];
        expect(colorMapping).toBeDefined();
        expect(colorMapping.badge).toBeDefined();
        expect(colorMapping.badgeText).toBeDefined();
        
        // Verifica que badge renderiza com cor correta
        const mockLugar = { ...baseLugar, categoria: category };
        const { container } = render(<CardLugar lugar={mockLugar} showCategory />);
        const badge = container.querySelector('[class*="badge"]');
        
        // Badge deve ter classe CSS que mapeia para a cor da categoria
        const expectedColorClass = getCSSClassForColor(colorMapping.badge);
        return badge?.classList.contains(expectedColorClass);
      }
    ),
    { numRuns: 100 }
  );
});
```

#### Property 4: Consistência de Componentes entre Páginas

```typescript
// Feature: reformulacao-visual-paleta-tulipas, Property 4: Consistência de Componentes entre Páginas
test('components render consistently across different category pages', () => {
  const pages = ['restaurantes', 'cafes', 'lazer', 'prestadores', 'lojas'];
  const componentTypes = [Header, Footer, BotaoHub, CardLugar];
  
  fc.assert(
    fc.property(
      fc.constantFrom(...componentTypes),
      fc.constantFrom(...pages),
      fc.constantFrom(...pages),
      (Component, page1, page2) => {
        if (page1 === page2) return true;
        
        // Renderiza componente em contexto de página 1
        const { container: container1 } = render(
          <PageContext.Provider value={{ category: page1 }}>
            <Component {...defaultProps} />
          </PageContext.Provider>
        );
        
        // Renderiza componente em contexto de página 2
        const { container: container2 } = render(
          <PageContext.Provider value={{ category: page2 }}>
            <Component {...defaultProps} />
          </PageContext.Provider>
        );
        
        // Extrai classes CSS base (ignora classes específicas de categoria)
        const classes1 = extractBaseClasses(container1);
        const classes2 = extractBaseClasses(container2);
        
        return areClassesEquivalent(classes1, classes2);
      }
    ),
    { numRuns: 100 }
  );
});
```

#### Property 5: Configuração de Transições

```typescript
// Feature: reformulacao-visual-paleta-tulipas, Property 5: Configuração de Transições
test('all interactive elements have proper transition configuration', () => {
  const interactiveElements = getAllInteractiveElements();
  
  fc.assert(
    fc.property(
      fc.constantFrom(...interactiveElements),
      (element) => {
        const styles = window.getComputedStyle(element);
        const transitionDuration = parseFloat(styles.transitionDuration);
        const transitionTimingFunction = styles.transitionTimingFunction;
        
        const hasValidDuration = transitionDuration >= 200 && transitionDuration <= 300;
        const hasValidEasing = 
          transitionTimingFunction.includes('ease-in-out') ||
          transitionTimingFunction.includes('ease-out');
        
        return hasValidDuration && hasValidEasing;
      }
    ),
    { numRuns: 100 }
  );
});
```

#### Property 6: Compatibilidade de API de Design Tokens

```typescript
// Feature: reformulacao-visual-paleta-tulipas, Property 6: Compatibilidade de API de Design Tokens
test('existing code importing design tokens compiles without type errors', () => {
  // Este teste verifica em tempo de compilação
  // Se o código compila, a propriedade é satisfeita
  
  // Importações que devem continuar funcionando
  const { colors, fonts, spacing, borderRadius } = require('@/lib/design-tokens');
  
  fc.assert(
    fc.property(
      fc.constantFrom('colors', 'fonts', 'spacing', 'borderRadius'),
      (exportName) => {
        const exported = require('@/lib/design-tokens')[exportName];
        return exported !== undefined && typeof exported === 'object';
      }
    ),
    { numRuns: 100 }
  );
});
```

### Visual Regression Testing

**Recomendação**: Usar ferramentas como Percy, Chromatic ou Playwright para capturar screenshots antes e depois da reformulação.

**Páginas críticas para testar**:
1. Home (/)
2. Página de categoria (ex: /restaurantes)
3. Página de detalhes de lugar
4. Página de roteiro
5. Página de contato

### Accessibility Testing

**Ferramentas**:
- axe-core para testes automatizados de acessibilidade
- Lighthouse para auditoria de contraste
- Manual testing com leitores de tela

**Checklist**:
- [ ] Todos os contrastes atendem WCAG AA
- [ ] Indicadores de foco são visíveis
- [ ] Navegação por teclado funciona
- [ ] Leitores de tela anunciam elementos corretamente

### Integration Testing

**Cenários**:
1. Navegação entre páginas mantém consistência visual
2. Mudança de tema (se aplicável) aplica cores corretamente
3. Componentes dinâmicos (filtros, modais) usam paleta correta
4. Estados de loading/erro usam cores apropriadas

### Performance Testing

**Métricas**:
- Tempo de carregamento não deve aumentar (CSS adicional é mínimo)
- Transições devem rodar a 60fps
- Não deve haver layout shifts causados por mudanças de cor

## Implementation Notes

### Migration Strategy

1. **Phase 1**: Atualizar design tokens e Tailwind config
2. **Phase 2**: Atualizar componentes base (Header, Footer)
3. **Phase 3**: Atualizar componentes de conteúdo (Cards, Botões)
4. **Phase 4**: Atualizar páginas e seções
5. **Phase 5**: Testes e ajustes finais

### Rollback Plan

Se houver problemas críticos:
1. Reverter commit de design tokens
2. Limpar cache do Tailwind
3. Rebuild da aplicação
4. Deploy da versão anterior

### Browser Compatibility

Todas as cores e transições CSS são suportadas em:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

### Performance Considerations

- Usar classes Tailwind (JIT) para otimização automática
- Evitar inline styles quando possível
- Transições CSS são mais performáticas que JavaScript
- Cores são valores estáticos (sem cálculos em runtime)
