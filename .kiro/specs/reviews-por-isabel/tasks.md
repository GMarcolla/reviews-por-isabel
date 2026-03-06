# Implementation Plan: Reviews por Isabel

## Overview

Este plano implementa o site Reviews por Isabel de forma incremental, começando pela estrutura base e componentes fundamentais, depois construindo as páginas principais, e finalmente adicionando testes e otimizações. Cada tarefa é independente e testável, permitindo validação contínua do progresso.

## Tasks

- [x] 1. Configurar projeto Next.js e estrutura base
  - Criar projeto Next.js 14+ com TypeScript e App Router
  - Instalar e configurar Tailwind CSS
  - Instalar shadcn/ui e componentes base
  - Instalar Lucide Icons
  - Configurar fontes Google (Playfair Display e Inter)
  - Criar estrutura de diretórios (app/, components/, lib/)
  - Configurar paleta de cores no tailwind.config.ts
  - Criar arquivo de design tokens (lib/design-tokens.ts)
  - _Requirements: 9.1, 9.2, 9.6, 12.1-12.6_

- [ ]* 1.1 Escrever testes para design tokens
  - Verificar que todas as cores da paleta estão definidas
  - Verificar que fontes estão configuradas corretamente
  - _Requirements: 9.1, 9.2_

- [x] 2. Criar interfaces TypeScript e estrutura de dados
  - Definir interface Lugar em lib/types.ts
  - Definir interface Cupom em lib/types.ts
  - Definir interface RoteiroPeriodo e Roteiro em lib/types.ts
  - Definir interface ContatoFormData e ContatoFormErrors em lib/types.ts
  - Criar arquivos de dados de exemplo (lib/data/restaurantes.ts, cafes.ts, passeios.ts, cupons.ts)
  - Implementar funções utilitárias (getRestaurantes, getRestauranteBySlug, etc.)
  - _Requirements: 13.1, 13.2, 13.3, 13.5_

- [ ]* 2.1 Escrever testes unitários para interfaces
  - Verificar que interfaces têm todos os campos obrigatórios
  - Testar funções utilitárias de busca
  - _Requirements: 13.1, 13.2, 13.4_

- [x] 3. Implementar componentes base reutilizáveis
  - [x] 3.1 Criar componente Container
    - Implementar com props: children, size, className
    - Aplicar max-width responsivo e padding
    - _Requirements: 12.4_
  
  - [x] 3.2 Criar componente SectionTitle
    - Implementar com props: title, subtitle, align
    - Aplicar tipografia Playfair Display
    - Aplicar espaçamento consistente
    - _Requirements: 12.3_
  
  - [x] 3.3 Criar componente CardLugar
    - Implementar com props: lugar, variant, showCategory
    - Usar Next.js Image para otimização
    - Adicionar botão "ver mais" com link
    - Aplicar bordas arredondadas e sombras
    - Implementar hover effects
    - _Requirements: 12.1, 3.2, 4.2, 5.2, 9.3, 9.4_
  
  - [x] 3.4 Criar componente BotaoHub
    - Implementar com props: title, description, icon, href, variant
    - Aplicar cores da paleta
    - Implementar hover/active states
    - Usar Link do Next.js para navegação
    - _Requirements: 12.2, 2.2_
  
  - [x] 3.5 Criar componente CategorySection
    - Implementar com props: title, lugares, columns
    - Usar SectionTitle para título
    - Criar grid responsivo de CardLugar
    - Implementar empty state
    - _Requirements: 3.1, 3.5, 4.1, 4.5, 5.1_

- [ ]* 3.6 Escrever teste de propriedade para CardLugar
  - **Property 6: Cards de lugares contêm campos obrigatórios**
  - **Validates: Requirements 3.2, 4.2, 5.2**
  - Para qualquer lugar, verificar que card renderiza imagem, nome e descrição

- [ ]* 3.7 Escrever testes unitários para componentes base
  - Testar Container com diferentes tamanhos
  - Testar SectionTitle com diferentes alinhamentos
  - Testar BotaoHub com diferentes variants
  - Testar CategorySection com lista vazia (empty state)
  - _Requirements: 12.1-12.4_

- [x] 4. Implementar Header e Footer
  - [x] 4.1 Criar componente Header
    - Implementar logo/título "Reviews por Isabel"
    - Criar menu de navegação com todos os itens
    - Implementar menu desktop (horizontal)
    - Implementar menu mobile (hamburger)
    - Adicionar destaque visual para item ativo
    - Aplicar sticky positioning
    - _Requirements: 12.5, 1.1, 1.3, 1.4, 1.5_
  
  - [x] 4.2 Criar componente Footer
    - Adicionar links para redes sociais (Instagram)
    - Adicionar copyright
    - Aplicar design minimalista
    - _Requirements: 12.6_

- [ ]* 4.3 Escrever teste de propriedade para navegação de menu
  - **Property 1: Navegação de menu funcional**
  - **Validates: Requirements 1.2**
  - Para qualquer item do menu, verificar que clique navega para URL correta

- [ ]* 4.4 Escrever teste de propriedade para menu presente
  - **Property 2: Menu presente em todas as páginas**
  - **Validates: Requirements 1.3**
  - Para qualquer rota válida, verificar que Header está presente

- [ ]* 4.5 Escrever teste de propriedade para item ativo
  - **Property 3: Item de menu ativo destacado**
  - **Validates: Requirements 1.4**
  - Para qualquer página ativa, verificar que item correspondente tem classe ativa

- [ ]* 4.6 Escrever testes unitários para Header e Footer
  - Testar que Header renderiza todos os itens de menu
  - Testar menu mobile em viewport pequeno
  - Testar Footer renderiza links sociais
  - _Requirements: 1.1, 1.5_

- [x] 5. Criar Root Layout e configurar metadata
  - Implementar app/layout.tsx com Header e Footer
  - Configurar HTML lang="pt-BR"
  - Configurar metadata base (title, description, OG tags)
  - Carregar fontes Google de forma otimizada
  - Aplicar estilos globais
  - _Requirements: 11.2, 11.3, 11.6_

- [ ]* 5.1 Escrever teste de propriedade para metadata
  - **Property 14: Meta tags presentes em todas as páginas**
  - **Validates: Requirements 11.2, 11.3**
  - Para qualquer página, verificar que meta tags estão definidas

- [x] 6. Checkpoint - Verificar estrutura base
  - Garantir que todos os testes passam
  - Verificar que projeto compila sem erros TypeScript
  - Perguntar ao usuário se há dúvidas

- [x] 7. Implementar página Home
  - [x] 7.1 Criar hero section
    - Adicionar título "Reviews por Isabel"
    - Adicionar subtítulo
    - Adicionar imagem ou placeholder
    - Aplicar design elegante e espaçamento
    - _Requirements: 2.1_
  
  - [x] 7.2 Criar seção de botões hub
    - Adicionar 6 botões: Restaurantes, Cafés, Passeios, Roteiro, Cupons, Contato
    - Usar componente BotaoHub
    - Organizar em grid responsivo
    - Adicionar ícones apropriados
    - _Requirements: 2.2, 2.5_
  
  - [x] 7.3 Criar seção "Sobre a Isa"
    - Adicionar título "Oi! Eu sou a Isa"
    - Adicionar texto de apresentação
    - Adicionar foto circular (ou placeholder)
    - _Requirements: 2.4_

- [ ]* 7.4 Escrever teste de propriedade para navegação de botões hub
  - **Property 4: Navegação de botões hub**
  - **Validates: Requirements 2.3**
  - Para qualquer botão hub, verificar que clique navega para URL correta

- [ ]* 7.5 Escrever testes unitários para página Home
  - Testar que hero section renderiza título e subtítulo corretos
  - Testar que todos os 6 botões hub estão presentes
  - Testar que seção "Sobre a Isa" está presente
  - _Requirements: 2.1, 2.2, 2.4_

- [x] 8. Implementar páginas de listagem (Restaurantes, Cafés, Passeios)
  - [x] 8.1 Criar página app/restaurantes/page.tsx
    - Buscar dados de restaurantes
    - Agrupar por categoria (Hamburguerias, Italianos, etc.)
    - Renderizar CategorySection para cada categoria
    - Aplicar layout responsivo
    - _Requirements: 3.1, 3.4, 3.5_
  
  - [x] 8.2 Criar página app/cafes/page.tsx
    - Buscar dados de cafés
    - Agrupar por categoria (Cafeterias, Docerias, etc.)
    - Renderizar CategorySection para cada categoria
    - Aplicar layout responsivo
    - _Requirements: 4.1, 4.4, 4.5_
  
  - [x] 8.3 Criar página app/passeios/page.tsx
    - Buscar dados de passeios
    - Agrupar por categoria (Eventos, Concertos, etc.)
    - Renderizar CategorySection para cada categoria
    - Usar variant large para cards (imagens maiores)
    - Aplicar layout responsivo
    - _Requirements: 5.1, 5.4, 5.5_

- [ ]* 8.4 Escrever teste de propriedade para agrupamento por categoria
  - **Property 5: Lugares agrupados por categoria**
  - **Validates: Requirements 3.1, 4.1, 5.1**
  - Para qualquer conjunto de lugares, verificar que estão agrupados corretamente

- [ ]* 8.5 Escrever teste de propriedade para títulos de seção
  - **Property 8: Títulos de seção por categoria**
  - **Validates: Requirements 3.5, 4.5**
  - Para qualquer categoria com lugares, verificar que há título visível

- [ ]* 8.6 Escrever testes unitários para páginas de listagem
  - Testar que página de restaurantes renderiza todas as categorias
  - Testar que página de cafés renderiza todas as categorias
  - Testar que página de passeios usa cards grandes
  - Testar grid responsivo
  - _Requirements: 3.4, 4.4, 5.4_

- [x] 9. Implementar páginas de detalhes dinâmicas
  - [x] 9.1 Criar página app/restaurantes/[slug]/page.tsx
    - Implementar generateStaticParams para SSG
    - Buscar restaurante por slug
    - Renderizar informações completas (nome, descrição, endereço, telefone, etc.)
    - Adicionar galeria de imagens se disponível
    - Implementar generateMetadata para SEO
    - _Requirements: 3.3, 11.1, 11.2, 11.3_
  
  - [x] 9.2 Criar página app/cafes/[slug]/page.tsx
    - Similar a restaurantes
    - Implementar generateStaticParams e generateMetadata
    - _Requirements: 4.3, 11.1, 11.2, 11.3_
  
  - [x] 9.3 Criar página app/passeios/[slug]/page.tsx
    - Similar a restaurantes e cafés
    - Implementar generateStaticParams e generateMetadata
    - _Requirements: 5.3, 11.1, 11.2, 11.3_

- [ ]* 9.4 Escrever teste de propriedade para navegação de cards
  - **Property 7: Navegação de cards para detalhes**
  - **Validates: Requirements 3.3, 4.3, 5.3**
  - Para qualquer card, verificar que "ver mais" navega para página de detalhes

- [ ]* 9.5 Escrever testes unitários para páginas de detalhes
  - Testar que página renderiza todas as informações do lugar
  - Testar que metadata é gerada corretamente
  - Testar que generateStaticParams retorna todos os slugs
  - _Requirements: 11.2, 11.3_

- [x] 10. Checkpoint - Verificar páginas principais
  - Garantir que todos os testes passam
  - Verificar navegação entre páginas
  - Testar responsividade em diferentes dispositivos
  - Perguntar ao usuário se há dúvidas

- [x] 11. Implementar página de Roteiro
  - Criar página app/roteiro/page.tsx
  - Criar dados do roteiro (manhã, tarde, noite)
  - Renderizar em formato de blog post
  - Adicionar imagens ilustrativas
  - Adicionar links para lugares mencionados
  - Aplicar tipografia elegante e espaçamento
  - _Requirements: 6.1, 6.3_

- [ ]* 11.1 Escrever teste de propriedade para períodos do roteiro
  - **Property 9: Períodos do roteiro têm sugestões**
  - **Validates: Requirements 6.2**
  - Para qualquer período, verificar que há sugestão de atividade

- [ ]* 11.2 Escrever teste de propriedade para links no roteiro
  - **Property 10: Links para lugares no roteiro**
  - **Validates: Requirements 6.4**
  - Para qualquer lugar com ID válido, verificar que há link clicável

- [ ]* 11.3 Escrever testes unitários para página de Roteiro
  - Testar que roteiro tem exatamente 3 períodos
  - Testar que cada período renderiza corretamente
  - Testar que links para lugares funcionam
  - _Requirements: 6.1, 6.4_

- [x] 12. Implementar página de Cupons
  - Criar página app/cupons/page.tsx
  - Buscar dados de cupons ativos
  - Renderizar lista/grid de cupons
  - Exibir nome do lugar, descrição, código
  - Destacar visualmente o código do cupom
  - Adicionar botão "ver lugar" com link
  - Aplicar layout responsivo
  - _Requirements: 7.1, 7.2, 7.4, 7.5_

- [ ]* 12.1 Escrever teste de propriedade para informações de cupons
  - **Property 11: Cupons contêm informações obrigatórias**
  - **Validates: Requirements 7.2**
  - Para qualquer cupom, verificar que contém nome, descrição e código

- [ ]* 12.2 Escrever teste de propriedade para links de cupons
  - **Property 12: Cupons com link para lugar**
  - **Validates: Requirements 7.3**
  - Para qualquer cupom com lugarId, verificar que há link para lugar

- [ ]* 12.3 Escrever testes unitários para página de Cupons
  - Testar que cupons renderizam todas as informações
  - Testar que código do cupom está destacado
  - Testar que botão "ver lugar" funciona
  - Testar layout responsivo
  - _Requirements: 7.4, 7.5_

- [x] 13. Implementar página de Contato
  - [x] 13.1 Criar página app/contato/page.tsx
    - Adicionar título "Fale comigo"
    - Criar formulário com campos: Nome, Email, Mensagem
    - Adicionar links para Instagram e email
    - Aplicar design consistente
    - _Requirements: 8.1, 8.4, 8.5_
  
  - [x] 13.2 Implementar validação de formulário
    - Criar funções de validação em lib/validation.ts
    - Validar campos obrigatórios
    - Validar formato de email
    - Validar tamanho mínimo de mensagem
    - Exibir mensagens de erro apropriadas
    - _Requirements: 8.2, 8.3_
  
  - [x] 13.3 Implementar estado do formulário
    - Usar React hooks para gerenciar estado
    - Implementar onChange handlers
    - Implementar onSubmit handler
    - Exibir erros abaixo dos campos
    - Aplicar estilos de erro (borda vermelha, texto vermelho)
    - _Requirements: 8.2, 8.3_

- [ ]* 13.4 Escrever teste de propriedade para validação de formulário
  - **Property 13: Validação de formulário de contato**
  - **Validates: Requirements 8.2, 8.3**
  - Para qualquer conjunto de dados, verificar validação de campos obrigatórios e email

- [ ]* 13.5 Escrever testes unitários para página de Contato
  - Testar que formulário renderiza todos os campos
  - Testar erro para email inválido
  - Testar erro para campos vazios
  - Testar que links sociais estão presentes
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 14. Checkpoint - Verificar todas as páginas
  - Garantir que todos os testes passam
  - Verificar que todas as páginas estão funcionais
  - Testar fluxos completos de navegação
  - Perguntar ao usuário se há dúvidas

- [x] 15. Implementar página 404 customizada
  - Criar app/not-found.tsx
  - Adicionar mensagem amigável "Ops! Página não encontrada"
  - Adicionar botão para voltar à home
  - Adicionar sugestões de páginas populares
  - Aplicar design consistente com o site
  - _Requirements: Error Handling_

- [ ]* 15.1 Escrever teste unitário para página 404
  - Testar que página renderiza mensagem correta
  - Testar que botão de voltar funciona
  - _Requirements: Error Handling_

- [x] 16. Implementar otimizações de imagem
  - Adicionar imagens otimizadas em public/images/
  - Configurar Next.js Image em todos os componentes
  - Adicionar alt text apropriado em todas as imagens
  - Configurar sizes para imagens responsivas
  - Marcar imagens de destaque com priority
  - _Requirements: 10.5, 11.5_

- [ ]* 16.1 Escrever testes para otimização de imagens
  - Verificar que todas as imagens usam Next.js Image
  - Verificar que todas as imagens têm alt text
  - _Requirements: 10.5_

- [x] 17. Implementar responsividade completa
  - Testar e ajustar layout em mobile (< 640px)
  - Testar e ajustar layout em tablet (640px - 1024px)
  - Testar e ajustar layout em desktop (> 1024px)
  - Verificar que menu mobile funciona corretamente
  - Verificar que grids se adaptam corretamente
  - Verificar que textos são legíveis em todos os tamanhos
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.6_

- [ ]* 17.1 Escrever testes de responsividade
  - Testar menu mobile em viewport pequeno
  - Testar grids em diferentes breakpoints
  - Testar que componentes se adaptam corretamente
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 18. Configurar SEO e metadata completa
  - Adicionar favicon em public/
  - Configurar metadata base no root layout
  - Adicionar robots.txt
  - Adicionar sitemap.xml
  - Configurar Open Graph images
  - Testar preview de compartilhamento social
  - _Requirements: 11.2, 11.3, 11.4_

- [ ]* 18.1 Escrever testes para SEO
  - Verificar que favicon existe
  - Verificar que metadata está presente em todas as páginas
  - Verificar que OG tags estão corretas
  - _Requirements: 11.2, 11.3, 11.4_

- [x] 19. Configurar build para produção
  - Configurar next.config.js para static export
  - Configurar vercel.json
  - Testar build local (npm run build)
  - Verificar que todas as páginas são geradas estaticamente
  - Verificar que não há erros de build
  - _Requirements: 11.1_

- [ ]* 19.1 Escrever testes de build
  - Verificar que projeto compila sem erros TypeScript
  - Verificar que build gera todas as páginas estáticas
  - _Requirements: 11.1, 13.4_

- [ ] 20. Testes de acessibilidade
  - Instalar jest-axe
  - Testar contraste de cores
  - Testar navegação por teclado
  - Testar labels em campos de formulário
  - Testar ARIA attributes
  - Corrigir problemas encontrados
  - _Requirements: Testing Strategy - Accessibility_

- [ ]* 20.1 Escrever testes de acessibilidade automatizados
  - Testar componentes principais com jest-axe
  - Testar páginas principais com jest-axe
  - _Requirements: Testing Strategy - Accessibility_

- [ ] 21. Testes de performance
  - Configurar Lighthouse CI (opcional)
  - Testar performance score
  - Testar métricas Core Web Vitals
  - Otimizar se necessário
  - _Requirements: 11.7, Testing Strategy - Performance_

- [x] 22. Checkpoint final - Revisão completa
  - Garantir que todos os testes passam
  - Verificar que todas as funcionalidades estão implementadas
  - Testar site completo em diferentes dispositivos
  - Verificar performance e acessibilidade
  - Preparar para deploy
  - Perguntar ao usuário se há ajustes finais

- [x] 23. Deploy para Vercel
  - Criar conta na Vercel (se necessário)
  - Conectar repositório Git
  - Configurar variáveis de ambiente
  - Fazer deploy inicial
  - Verificar que site está funcionando em produção
  - Configurar domínio customizado (se disponível)
  - _Requirements: Deployment_

## Notes

- Tarefas marcadas com `*` são opcionais e podem ser puladas para MVP mais rápido
- Cada tarefa referencia requisitos específicos para rastreabilidade
- Checkpoints garantem validação incremental
- Testes de propriedade validam corretude universal
- Testes unitários validam exemplos específicos e casos extremos
- Todas as 14 propriedades de corretude do design estão cobertas por testes
- Implementação segue abordagem mobile-first
- SSG garante performance máxima
- TypeScript garante segurança de tipos em tempo de compilação
