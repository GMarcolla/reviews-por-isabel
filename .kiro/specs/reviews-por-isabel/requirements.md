# Requirements Document

## Introduction

Reviews por Isabel é um site guia de lugares e experiências em Blumenau e região, com curadoria pessoal da criadora de conteúdo Isabel. O site apresenta restaurantes, cafés, passeios e experiências com uma estética elegante e feminina, voltada para o público que busca recomendações autênticas e visuais atraentes. O site será estático (SSG) para máxima performance e hospedado na Vercel.

## Glossary

- **Site**: O website Reviews por Isabel
- **Sistema**: A aplicação web completa
- **Usuário**: Visitante do site que busca informações sobre lugares em Blumenau
- **Card**: Componente visual que exibe informações resumidas de um lugar
- **Hub**: Página inicial com botões grandes de navegação
- **Lugar**: Restaurante, café, passeio ou experiência listada no site
- **Cupom**: Código de desconto oferecido por estabelecimentos parceiros
- **SSG**: Static Site Generation - geração estática de páginas
- **Responsivo**: Design que se adapta a diferentes tamanhos de tela

## Requirements

### Requirement 1: Estrutura de Navegação

**User Story:** Como usuário, eu quero navegar facilmente entre as diferentes seções do site, para que eu possa encontrar rapidamente o tipo de conteúdo que procuro.

#### Acceptance Criteria

1. THE Sistema SHALL exibir um menu de navegação com as opções: Home, Restaurantes, Cafés & Docerias, Passeios, Roteiro em Blumenau, Cupons, e Contato
2. WHEN um usuário clica em um item do menu, THE Sistema SHALL navegar para a página correspondente
3. THE Sistema SHALL manter o menu de navegação visível em todas as páginas
4. WHEN um usuário está em uma página específica, THE Sistema SHALL destacar visualmente o item correspondente no menu
5. THE Sistema SHALL exibir o menu de forma responsiva em dispositivos móveis

### Requirement 2: Página Home

**User Story:** Como usuário, eu quero ver uma página inicial acolhedora e informativa, para que eu possa entender o propósito do site e navegar para as seções de interesse.

#### Acceptance Criteria

1. THE Sistema SHALL exibir uma hero section com o título "Reviews por Isabel" e subtítulo "Um guia de lugares e experiências em Blumenau e região"
2. THE Sistema SHALL exibir botões grandes estilo hub para: Restaurantes, Cafés e Docerias, Passeios, Roteiro em Blumenau, Cupons, e Contato
3. WHEN um usuário clica em um botão hub, THE Sistema SHALL navegar para a página correspondente
4. THE Sistema SHALL exibir uma seção "Sobre a Isa" com título "Oi! Eu sou a Isa", texto de apresentação e foto circular
5. THE Sistema SHALL organizar os botões hub em um grid responsivo que se adapta ao tamanho da tela

### Requirement 3: Página de Restaurantes

**User Story:** Como usuário, eu quero explorar restaurantes organizados por categoria, para que eu possa encontrar facilmente o tipo de culinária que desejo.

#### Acceptance Criteria

1. THE Sistema SHALL organizar restaurantes nas categorias: Hamburguerias, Italianos, Japoneses, Pizzarias, e Restaurantes Românticos
2. THE Sistema SHALL exibir cada restaurante em um card contendo foto, nome, e pequena descrição
3. WHEN um usuário clica no botão "ver mais" de um card, THE Sistema SHALL exibir informações detalhadas do restaurante
4. THE Sistema SHALL exibir os cards em um grid responsivo
5. THE Sistema SHALL exibir um título de seção para cada categoria de restaurante

### Requirement 4: Página de Cafés & Docerias

**User Story:** Como usuário, eu quero explorar cafés e docerias organizados por categoria, para que eu possa encontrar o lugar ideal para um café ou sobremesa.

#### Acceptance Criteria

1. THE Sistema SHALL organizar estabelecimentos nas categorias: Cafeterias, Docerias, Padarias Especiais, e Brunch
2. THE Sistema SHALL exibir cada estabelecimento em um card contendo foto, nome, e pequena descrição
3. WHEN um usuário clica no botão "ver mais" de um card, THE Sistema SHALL exibir informações detalhadas do estabelecimento
4. THE Sistema SHALL exibir os cards em um grid responsivo
5. THE Sistema SHALL exibir um título de seção para cada categoria

### Requirement 5: Página de Passeios

**User Story:** Como usuário, eu quero descobrir passeios e experiências em Blumenau, para que eu possa planejar atividades interessantes.

#### Acceptance Criteria

1. THE Sistema SHALL organizar passeios nas categorias: Eventos, Concertos, Festivais, Parques, e Passeios Diferentes
2. THE Sistema SHALL exibir cada passeio em um card com foto grande, nome, e descrição
3. WHEN um usuário clica em um card de passeio, THE Sistema SHALL exibir informações detalhadas da experiência
4. THE Sistema SHALL exibir os cards em um grid responsivo
5. THE Sistema SHALL priorizar imagens grandes e atraentes nos cards de passeios

### Requirement 6: Página Roteiro em Blumenau

**User Story:** Como usuário, eu quero ver um roteiro sugerido para um dia em Blumenau, para que eu possa planejar minha visita à cidade.

#### Acceptance Criteria

1. THE Sistema SHALL exibir o roteiro organizado em três períodos: Manhã, Tarde, e Noite
2. THE Sistema SHALL incluir para cada período uma sugestão de café/passeio, atração turística, ou restaurante/experiência
3. THE Sistema SHALL exibir o roteiro em formato de blog post com texto descritivo e imagens
4. THE Sistema SHALL incluir links para os lugares mencionados no roteiro
5. THE Sistema SHALL formatar o conteúdo de forma legível e visualmente atraente

### Requirement 7: Página de Cupons

**User Story:** Como usuário, eu quero acessar cupons de desconto para estabelecimentos parceiros, para que eu possa economizar em minhas visitas.

#### Acceptance Criteria

1. THE Sistema SHALL exibir uma lista de cupons disponíveis
2. THE Sistema SHALL exibir para cada cupom: nome do lugar, descrição do desconto, e código do cupom
3. THE Sistema SHALL incluir um botão "ver lugar" que leva à página de detalhes do estabelecimento
4. THE Sistema SHALL destacar visualmente o código do cupom para fácil cópia
5. THE Sistema SHALL organizar os cupons em cards ou lista responsiva

### Requirement 8: Página de Contato

**User Story:** Como usuário, eu quero entrar em contato com a Isabel, para que eu possa fazer perguntas ou sugestões.

#### Acceptance Criteria

1. THE Sistema SHALL exibir um formulário de contato com os campos: Nome, Email, e Mensagem
2. WHEN um usuário preenche o formulário e clica em enviar, THE Sistema SHALL validar que todos os campos obrigatórios estão preenchidos
3. WHEN um usuário submete um email inválido, THE Sistema SHALL exibir uma mensagem de erro
4. THE Sistema SHALL exibir links para Instagram e email da Isabel
5. THE Sistema SHALL exibir o título "Fale comigo" na página de contato

### Requirement 9: Design System e Estilização

**User Story:** Como usuário, eu quero uma experiência visual elegante e coerente, para que eu tenha uma navegação agradável e profissional.

#### Acceptance Criteria

1. THE Sistema SHALL utilizar a paleta de cores: Rosa blush (#E8B4B8), Rosa claro (#F7E9EA), Creme claro (#FFF8F6), Marrom rosado (#6B4F4F), Marrom forte (#4A2F2F), e Branco (#FFFFFF)
2. THE Sistema SHALL utilizar a fonte Playfair Display para títulos e Inter para texto
3. THE Sistema SHALL aplicar bordas arredondadas em botões e cards
4. THE Sistema SHALL aplicar sombras suaves em elementos elevados
5. THE Sistema SHALL manter espaçamento generoso entre elementos
6. THE Sistema SHALL utilizar ícones da biblioteca Lucide Icons
7. THE Sistema SHALL manter uma estética feminina, elegante e moderna em todos os componentes

### Requirement 10: Responsividade

**User Story:** Como usuário mobile, eu quero que o site funcione perfeitamente no meu dispositivo, para que eu possa acessar o conteúdo em qualquer lugar.

#### Acceptance Criteria

1. THE Sistema SHALL adaptar o layout para telas de smartphone (< 640px)
2. THE Sistema SHALL adaptar o layout para telas de tablet (640px - 1024px)
3. THE Sistema SHALL adaptar o layout para telas de desktop (> 1024px)
4. WHEN um usuário acessa o site em mobile, THE Sistema SHALL exibir um menu hamburger ou menu mobile apropriado
5. THE Sistema SHALL garantir que imagens sejam otimizadas e responsivas
6. THE Sistema SHALL garantir que textos sejam legíveis em todos os tamanhos de tela

### Requirement 11: Performance e SEO

**User Story:** Como usuário, eu quero que o site carregue rapidamente e seja encontrável em buscadores, para que eu tenha uma experiência fluida e possa descobrir o site facilmente.

#### Acceptance Criteria

1. THE Sistema SHALL gerar páginas estáticas (SSG) para máxima performance
2. THE Sistema SHALL incluir meta tags de título e descrição em todas as páginas
3. THE Sistema SHALL incluir meta tags Open Graph para compartilhamento em redes sociais
4. THE Sistema SHALL incluir um favicon
5. THE Sistema SHALL otimizar imagens para web
6. THE Sistema SHALL carregar fontes de forma otimizada
7. WHEN um usuário acessa qualquer página, THE Sistema SHALL carregar o conteúdo em menos de 3 segundos em conexão 3G

### Requirement 12: Componentes Reutilizáveis

**User Story:** Como desenvolvedor, eu quero componentes reutilizáveis e bem estruturados, para que o código seja mantível e consistente.

#### Acceptance Criteria

1. THE Sistema SHALL implementar um componente CardLugar para exibir lugares
2. THE Sistema SHALL implementar um componente BotaoHub para os botões da página inicial
3. THE Sistema SHALL implementar um componente SectionTitle para títulos de seção
4. THE Sistema SHALL implementar um componente Container para layout consistente
5. THE Sistema SHALL implementar um componente Header para o cabeçalho do site
6. THE Sistema SHALL implementar um componente Footer para o rodapé do site
7. WHEN um componente é atualizado, THE Sistema SHALL refletir as mudanças em todas as instâncias do componente

### Requirement 13: Estrutura de Dados

**User Story:** Como desenvolvedor, eu quero uma estrutura de dados clara para lugares e conteúdo, para que seja fácil adicionar e gerenciar informações.

#### Acceptance Criteria

1. THE Sistema SHALL definir uma interface TypeScript para Lugar contendo: id, nome, categoria, descrição, foto, e detalhes
2. THE Sistema SHALL definir uma interface TypeScript para Cupom contendo: id, lugarId, código, descrição, e validade
3. THE Sistema SHALL armazenar dados de lugares em arquivos JSON ou TypeScript
4. THE Sistema SHALL validar tipos de dados em tempo de compilação usando TypeScript
5. THE Sistema SHALL organizar dados por categoria para fácil manutenção
