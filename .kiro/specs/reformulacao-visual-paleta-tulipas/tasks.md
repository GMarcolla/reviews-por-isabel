# Implementation Plan: Reformulação Visual - Paleta Tulipas

## Overview

Este plano implementa a reformulação visual do site Reviews por Isabel aplicando a nova paleta de cores inspirada em tulipas. A implementação segue uma abordagem incremental, começando pelos design tokens centralizados e progredindo através dos componentes até as páginas finais.

## Tasks

- [x] 1. Atualizar Design Tokens e Configuração Base
  - Atualizar lib/design-tokens.ts com a nova paleta de cores tulipas
  - Adicionar cores primárias (verdeTulipa, bejeTulipa, rosaTulipa)
  - Adicionar cores de fundo (offWhiteRosado, branco)
  - Adicionar cores de texto (marromEscuro, preto)
  - Adicionar cores derivadas para estados (hover, active)
  - Criar objeto semanticColors para uso contextual
  - Criar objeto categoryColors para mapeamento de categorias
  - Exportar tipos TypeScript para as cores
  - _Requirements: 1.1, 1.3, 9.3_

- [x] 2. Atualizar Configuração do Tailwind CSS
  - Atualizar tailwind.config.ts com as novas classes de cores
  - Adicionar classes para verde-tulipa e variações
  - Adicionar classes para beje-tulipa e variações
  - Adicionar classes para rosa-tulipa e variações
  - Adicionar classes para off-white-rosado e marrom-escuro
  - Atualizar boxShadow para card-tulipa e card-tulipa-hover
  - _Requirements: 1.2_

- [ ] 3. Atualizar Estilos Globais
  - [x] 3.1 Atualizar app/globals.css com novas cores
    - Atualizar cor de texto do body para marrom-escuro (#4a2f2f)
    - Atualizar cor de fundo do body para off-white-rosado (#fff8f6)
    - Manter cores de headings como marrom-escuro
    - Adicionar estilos globais para links (rosa-tulipa)
    - Adicionar estilos de focus-visible para acessibilidade
    - _Requirements: 5.3, 2.5_
  
  - [ ]* 3.2 Escrever testes unitários para estilos globais
    - Testar que body tem background correto
    - Testar que headings têm cor correta
    - Testar que links têm cor e hover corretos
    - _Requirements: 5.3_

- [ ] 4. Atualizar Componente Header
  - [x] 4.1 Atualizar components/Header.tsx com novas cores
    - Manter background branco
    - Atualizar border para beje-tulipa
    - Atualizar cor de texto para marrom-escuro
    - Atualizar item ativo: verde-tulipa text com beje-tulipa bg
    - Atualizar hover para beje-tulipa/30
    - Garantir transições suaves (200-300ms)
    - _Requirements: 2.1, 2.2, 2.3, 2.5_
  
  - [ ]* 4.2 Escrever testes unitários para Header
    - Testar que Header renderiza com classes corretas
    - Testar que item ativo tem classes corretas
    - Testar que hover aplica classes corretas
    - _Requirements: 2.1, 2.2, 2.3_

- [ ] 5. Atualizar Componente Footer
  - [x] 5.1 Atualizar components/Footer.tsx com novas cores
    - Atualizar background para verde-tulipa
    - Atualizar border para verde-tulipa-escuro
    - Atualizar cor de texto para off-white-rosado
    - Atualizar links para beje-tulipa
    - Atualizar hover de links para beje-tulipa-claro
    - _Requirements: 2.4, 2.5_
  
  - [ ]* 5.2 Escrever testes unitários para Footer
    - Testar que Footer renderiza com classes corretas
    - Testar que links têm cores corretas
    - _Requirements: 2.4_

- [x] 6. Checkpoint - Verificar Navegação
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Atualizar Componente BotaoHub
  - [x] 7.1 Atualizar components/BotaoHub.tsx com novas cores
    - Para botões com imagem: adicionar border sutil beje-tulipa
    - Para botões com imagem: atualizar shadow hover para verde-tulipa
    - Para variant primary: atualizar de rosa-blush para rosa-tulipa
    - Para variant secondary: atualizar de creme-claro para verde-tulipa
    - Atualizar cor de texto para branco
    - Atualizar estados hover para cores -claro
    - Garantir transições de 200-300ms
    - _Requirements: 3.1, 3.2, 3.5_
  
  - [ ]* 7.2 Escrever testes unitários para BotaoHub
    - Testar que botões com imagem têm border correto
    - Testar que variant primary usa rosa-tulipa
    - Testar que variant secondary usa verde-tulipa
    - Testar que transições estão configuradas
    - _Requirements: 3.1, 3.2, 3.5_
  
  - [ ]* 7.3 Escrever teste de propriedade para transições de botões
    - **Property 5: Configuração de Transições**
    - **Validates: Requirements 8.1, 8.2, 8.4**

- [ ] 8. Atualizar Componente CardLugar
  - [x] 8.1 Atualizar components/CardLugar.tsx com novas cores
    - Manter background branco
    - Atualizar shadow para card-tulipa
    - Atualizar shadow hover para card-tulipa-hover
    - Atualizar badge background para usar categoryColors
    - Atualizar botão "Ver mais" para rosa-tulipa
    - Atualizar botão hover para rosa-tulipa-claro
    - Adicionar backdrop-blur-sm aos badges sobre imagens
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 3.3_
  
  - [ ]* 8.2 Escrever testes unitários para CardLugar
    - Testar que card renderiza com classes corretas
    - Testar que botão Ver Mais usa rosa-tulipa
    - Testar que badges têm backdrop-blur
    - _Requirements: 4.1, 3.3, 4.4_
  
  - [ ]* 8.3 Escrever teste de propriedade para mapeamento de categorias
    - **Property 3: Mapeamento de Categoria para Cor**
    - **Validates: Requirements 4.2, 6.2**

- [ ] 9. Atualizar Componente CategorySection
  - [x] 9.1 Atualizar components/CategorySection.tsx com novas cores
    - Manter título como marrom-forte (ou atualizar para marrom-escuro)
    - Atualizar descrição para marrom-escuro com opacity-80
    - _Requirements: 6.1_
  
  - [ ]* 9.2 Escrever testes unitários para CategorySection
    - Testar que título e descrição têm cores corretas
    - _Requirements: 6.1_

- [x] 10. Checkpoint - Verificar Componentes
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Atualizar Página Home
  - [x] 11.1 Atualizar app/page.tsx com novas cores
    - Atualizar gradientes da hero section para usar paleta tulipas
    - Atualizar cores de texto para marrom-escuro
    - Atualizar seção "Sobre a Isa" para usar cores da paleta
    - Alternar cores de fundo entre seções (off-white-rosado, branco, beje-tulipa/20)
    - _Requirements: 5.1, 5.2, 5.5_
  
  - [ ]* 11.2 Escrever testes unitários para página Home
    - Testar que seções têm cores de fundo corretas
    - Testar que gradientes usam cores da paleta
    - _Requirements: 5.1, 5.2_

- [ ] 12. Atualizar Páginas de Categoria
  - [x] 12.1 Atualizar páginas de categoria (restaurantes, cafes, lazer, etc)
    - Aplicar mesmas cores em todas as páginas
    - Garantir consistência de componentes
    - Usar cores de fundo alternadas
    - _Requirements: 6.1, 6.3, 6.4_
  
  - [ ]* 12.2 Escrever teste de propriedade para consistência entre páginas
    - **Property 4: Consistência de Componentes entre Páginas**
    - **Validates: Requirements 6.1, 6.3, 6.4**

- [ ] 13. Verificar e Corrigir Contraste de Acessibilidade
  - [x] 13.1 Auditar todas as combinações de cores
    - Usar ferramenta de cálculo de contraste (ex: polished, color2k)
    - Verificar texto normal (< 18px): mínimo 4.5:1
    - Verificar texto grande (≥ 18px): mínimo 3.0:1
    - Verificar indicadores de foco: mínimo 3.0:1
    - Ajustar cores que não atendem requisitos
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [ ]* 13.2 Escrever teste de propriedade para contraste universal
    - **Property 1: Contraste Acessível Universal**
    - **Validates: Requirements 2.5, 3.4, 5.5, 7.1, 7.2, 7.3, 7.4**

- [ ] 14. Verificar Centralização de Cores
  - [x] 14.1 Remover cores hardcoded antigas
    - Buscar por valores hex da paleta antiga (#E8B4B8, #F7E9EA, #6B4F4F, #4A2F2F)
    - Substituir por classes Tailwind ou imports de design-tokens
    - Verificar que nenhum componente tem cores hardcoded
    - _Requirements: 9.4_
  
  - [ ]* 14.2 Escrever teste de propriedade para cores centralizadas
    - **Property 2: Cores Centralizadas**
    - **Validates: Requirements 9.4**

- [ ] 15. Documentar Uso das Cores
  - [x] 15.1 Adicionar documentação ao design-tokens.ts
    - Adicionar comentários JSDoc para cada cor
    - Explicar quando usar cada cor
    - Incluir exemplos de combinações recomendadas
    - Documentar semanticColors e categoryColors
    - _Requirements: 1.4, 9.1, 9.2, 9.5_

- [ ] 16. Testes de Integração e Compatibilidade
  - [ ]* 16.1 Escrever teste de propriedade para compatibilidade de API
    - **Property 6: Compatibilidade de API de Design Tokens**
    - **Validates: Requirements 1.3**
  
  - [ ]* 16.2 Executar testes de regressão visual
    - Capturar screenshots de páginas principais
    - Comparar com baseline (se disponível)
    - Verificar que não há quebras visuais inesperadas
    - _Requirements: 6.1, 6.3_
  
  - [ ]* 16.3 Executar testes de acessibilidade automatizados
    - Rodar axe-core em páginas principais
    - Rodar Lighthouse audit
    - Verificar navegação por teclado
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 17. Checkpoint Final
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties with minimum 100 iterations
- Unit tests validate specific examples and edge cases
- A reformulação é puramente visual - não há mudanças em lógica de negócio ou dados
- Todas as cores devem vir de design-tokens.ts ou classes Tailwind configuradas
- Priorizar acessibilidade: contraste adequado é obrigatório, não opcional
- Testar em diferentes navegadores e dispositivos após implementação
