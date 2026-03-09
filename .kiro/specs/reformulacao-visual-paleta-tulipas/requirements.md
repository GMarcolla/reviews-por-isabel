# Requirements Document

## Introduction

Este documento define os requisitos para a reformulação visual do site Reviews por Isabel, aplicando uma nova paleta de cores inspirada em tulipas. O objetivo é criar uma estética mais sofisticada e menos infantil, mantendo a harmonia visual, legibilidade e acessibilidade em todos os componentes do site.

## Glossary

- **Sistema**: O site Reviews por Isabel (aplicação Next.js com Tailwind CSS)
- **Paleta_Tulipas**: Conjunto de cores inspiradas em tulipas (#4d5f2f, #cec683, #c80c66, #fff8f6, #4a2f2f, #000000, #ffffff)
- **Design_Tokens**: Arquivo centralizado de constantes de design (lib/design-tokens.ts)
- **Componente_Visual**: Qualquer componente React que renderiza elementos visuais (Header, Footer, BotaoHub, CardLugar, etc.)
- **Contraste_Acessível**: Razão de contraste mínima de 4.5:1 para texto normal e 3:1 para texto grande (WCAG AA)
- **Categoria**: Tipo de estabelecimento ou serviço (restaurantes, cafés, lazer, lojas, prestadores, passeios)

## Requirements

### Requirement 1: Atualização da Paleta de Cores

**User Story:** Como designer do sistema, quero definir e aplicar a nova paleta de cores inspirada em tulipas, para que o site tenha uma estética mais sofisticada e harmoniosa.

#### Acceptance Criteria

1. THE Sistema SHALL define as seguintes cores no Design_Tokens:
   - Verde acinzentado (#4d5f2f) como cor primária para elementos de destaque
   - Bege/amarelo suave (#cec683) como cor secundária para fundos e elementos suaves
   - Rosa/magenta vibrante (#c80c66) como cor de acento para CTAs e elementos interativos
   - Off-white rosado (#fff8f6) como cor de fundo principal
   - Marrom escuro (#4a2f2f) como cor de texto principal
   - Preto (#000000) para texto de alto contraste quando necessário
   - Branco (#ffffff) para fundos de cards e elementos destacados

2. THE Sistema SHALL atualizar o arquivo tailwind.config.ts com as novas cores como classes utilitárias do Tailwind

3. THE Sistema SHALL manter compatibilidade com a estrutura existente de Design_Tokens

4. THE Sistema SHALL documentar o uso semântico de cada cor (quando usar cada uma)

### Requirement 2: Aplicação de Cores em Componentes de Navegação

**User Story:** Como usuário do site, quero que o header e footer tenham cores harmoniosas com a nova paleta, para que a navegação seja visualmente agradável e consistente.

#### Acceptance Criteria

1. WHEN o Header é renderizado, THE Sistema SHALL aplicar cores da Paleta_Tulipas mantendo legibilidade

2. WHEN um item de menu está ativo, THE Sistema SHALL destacá-lo usando cores da Paleta_Tulipas com contraste adequado

3. WHEN o usuário interage com elementos do Header (hover, focus), THE Sistema SHALL aplicar estados visuais usando cores da Paleta_Tulipas

4. WHEN o Footer é renderizado, THE Sistema SHALL aplicar cores da Paleta_Tulipas mantendo harmonia com o restante da página

5. THE Sistema SHALL garantir que links e elementos interativos no Header e Footer tenham Contraste_Acessível

### Requirement 3: Aplicação de Cores em Botões e CTAs

**User Story:** Como usuário do site, quero que os botões e calls-to-action sejam visualmente atraentes e claros, para que eu saiba onde clicar e me sinta motivado a interagir.

#### Acceptance Criteria

1. WHEN um BotaoHub é renderizado, THE Sistema SHALL aplicar cores da Paleta_Tulipas que complementem as imagens dos botões

2. WHEN o usuário interage com botões (hover, active, focus), THE Sistema SHALL aplicar estados visuais distintos usando cores da Paleta_Tulipas

3. WHEN botões "Ver mais" são renderizados em cards, THE Sistema SHALL usar a cor de acento (#c80c66) para destacá-los

4. THE Sistema SHALL garantir que todos os botões tenham Contraste_Acessível entre texto e fundo

5. THE Sistema SHALL aplicar transições suaves entre estados de botões (mínimo 200ms)

### Requirement 4: Aplicação de Cores em Cards e Listagens

**User Story:** Como usuário navegando por lugares, quero que os cards sejam visualmente organizados e agradáveis, para que eu possa facilmente identificar e escolher lugares de interesse.

#### Acceptance Criteria

1. WHEN um CardLugar é renderizado, THE Sistema SHALL aplicar cores da Paleta_Tulipas para fundo, texto e elementos decorativos

2. WHEN badges de categoria são exibidos, THE Sistema SHALL usar cores da Paleta_Tulipas que identifiquem visualmente cada Categoria

3. WHEN o usuário interage com cards (hover), THE Sistema SHALL aplicar efeitos visuais usando cores da Paleta_Tulipas

4. THE Sistema SHALL garantir que texto sobre imagens tenha Contraste_Acessível usando overlays ou fundos semitransparentes quando necessário

5. THE Sistema SHALL manter hierarquia visual clara entre título, descrição e botões usando cores e tamanhos apropriados

### Requirement 5: Aplicação de Cores em Fundos e Seções

**User Story:** Como usuário navegando pelo site, quero que as diferentes seções tenham fundos harmoniosos, para que a experiência de leitura seja confortável e visualmente agradável.

#### Acceptance Criteria

1. WHEN seções da página são renderizadas, THE Sistema SHALL alternar entre cores de fundo da Paleta_Tulipas para criar ritmo visual

2. WHEN gradientes são usados, THE Sistema SHALL combinar cores da Paleta_Tulipas de forma harmoniosa

3. THE Sistema SHALL usar o off-white rosado (#fff8f6) como cor de fundo principal do body

4. THE Sistema SHALL usar branco (#ffffff) para fundos de cards e elementos que precisam se destacar

5. THE Sistema SHALL garantir que todas as combinações de fundo e texto tenham Contraste_Acessível

### Requirement 6: Consistência Visual entre Categorias

**User Story:** Como usuário navegando por diferentes categorias, quero que todas as páginas mantenham consistência visual, para que eu tenha uma experiência coesa independente da seção que estou visitando.

#### Acceptance Criteria

1. WHEN páginas de diferentes Categorias são renderizadas, THE Sistema SHALL aplicar a mesma Paleta_Tulipas em todos os Componente_Visual

2. WHEN elementos específicos de categoria são renderizados (ícones, badges), THE Sistema SHALL usar variações da Paleta_Tulipas para diferenciação sutil

3. THE Sistema SHALL manter o mesmo sistema de hierarquia tipográfica em todas as páginas

4. THE Sistema SHALL aplicar os mesmos estilos de hover, focus e active em elementos interativos em todas as páginas

### Requirement 7: Acessibilidade de Contraste

**User Story:** Como usuário com necessidades de acessibilidade, quero que todo o texto seja legível, para que eu possa consumir o conteúdo sem dificuldades.

#### Acceptance Criteria

1. WHEN texto normal (menor que 18px) é renderizado, THE Sistema SHALL garantir razão de contraste mínima de 4.5:1 com o fundo

2. WHEN texto grande (18px+ ou 14px+ bold) é renderizado, THE Sistema SHALL garantir razão de contraste mínima de 3:1 com o fundo

3. WHEN elementos interativos são focados via teclado, THE Sistema SHALL exibir indicador de foco com contraste mínimo de 3:1

4. IF uma combinação de cores não atinge Contraste_Acessível, THEN THE Sistema SHALL ajustar a cor ou adicionar elementos auxiliares (bordas, sombras, overlays)

### Requirement 8: Transições e Estados Visuais

**User Story:** Como usuário interagindo com o site, quero que as mudanças visuais sejam suaves e responsivas, para que a experiência seja fluida e profissional.

#### Acceptance Criteria

1. WHEN elementos interativos mudam de estado (hover, active, focus), THE Sistema SHALL aplicar transições CSS com duração entre 200ms e 300ms

2. WHEN cores de fundo mudam, THE Sistema SHALL usar transições suaves

3. WHEN transformações são aplicadas (scale, translate), THE Sistema SHALL sincronizar com transições de cor

4. THE Sistema SHALL usar funções de easing apropriadas (ease-in-out ou ease-out) para transições naturais

### Requirement 9: Documentação e Manutenibilidade

**User Story:** Como desenvolvedor mantendo o sistema, quero que as cores sejam bem documentadas e centralizadas, para que futuras atualizações sejam fáceis e consistentes.

#### Acceptance Criteria

1. THE Sistema SHALL documentar no Design_Tokens o uso semântico de cada cor da Paleta_Tulipas

2. THE Sistema SHALL incluir comentários explicando quando usar cada cor

3. THE Sistema SHALL exportar tipos TypeScript para as cores definidas

4. THE Sistema SHALL manter todas as definições de cor centralizadas no Design_Tokens (sem cores hardcoded em componentes)

5. THE Sistema SHALL incluir exemplos de combinações de cores recomendadas no Design_Tokens
