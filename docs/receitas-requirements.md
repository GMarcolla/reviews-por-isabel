# Requisitos - Cozinhando com Isabel

## Visão Geral

A feature "Cozinhando com Isabel" permite cadastrar e exibir receitas do quadro homônimo do Instagram, onde convidados cozinham receitas à sua escolha. O site exibirá essas receitas com ingredientes, passos, imagem do resultado e a opinião final da Isabel.

Esta feature adiciona uma nova dimensão de conteúdo ao site, expandindo além de reviews de lugares para incluir experiências culinárias criadas por convidados.

## Requisitos Funcionais

### RF01 - Listagem de Receitas
O sistema deve exibir uma página de listagem de receitas acessível pela rota `/receitas`, mostrando cards com informações resumidas de cada receita cadastrada.

**Critérios de Aceitação:**
- A rota `/receitas` deve estar acessível e funcional
- Cada card deve exibir: imagem, título da receita e nome do convidado
- Cards devem seguir o padrão visual dos cards de lugares existentes
- A listagem deve ser responsiva (mobile-first)
- Deve exibir mensagem apropriada quando não houver receitas cadastradas

### RF02 - Detalhamento de Receita
O sistema deve exibir uma página de detalhe para cada receita na rota `/receitas/[slug]`, apresentando todas as informações da receita.

**Critérios de Aceitação:**
- A rota `/receitas/[slug]` deve funcionar para qualquer receita cadastrada
- Deve exibir todos os campos: título, convidado, ingredientes, passos, imagem e opinião final
- O layout deve seguir o padrão visual das páginas de detalhe de lugares
- Deve ser responsivo e acessível
- Deve retornar 404 para slugs inexistentes

### RF03 - Navegação no Menu
O sistema deve incluir o item "Receitas" nos menus de navegação (desktop e mobile).

**Critérios de Aceitação:**
- Item "Receitas" deve aparecer no menu desktop (Header)
- Item "Receitas" deve aparecer no menu mobile (ícone de 3 pontos)
- O link deve direcionar para `/receitas`
- O item deve seguir o estilo visual dos demais itens do menu
- Deve indicar visualmente quando a página ativa for `/receitas`

### RF04 - Cadastro de Receitas (Admin)
O sistema deve permitir o cadastro de novas receitas através da área administrativa.

**Critérios de Aceitação:**
- Formulário de cadastro acessível na área admin
- Campos obrigatórios: receita (título), convidado, ingredientes, passos, opinião final
- Campo de imagem com upload funcional
- Geração automática de slug a partir do título
- Validação de campos obrigatórios
- Feedback visual de sucesso/erro após submissão

### RF05 - Edição de Receitas (Admin)
O sistema deve permitir a edição de receitas existentes através da área administrativa.

**Critérios de Aceitação:**
- Listagem de receitas cadastradas na área admin
- Botão de edição para cada receita
- Formulário pré-preenchido com dados atuais
- Possibilidade de alterar todos os campos, incluindo imagem
- Validação de campos obrigatórios
- Feedback visual de sucesso/erro após atualização

### RF06 - Exclusão de Receitas (Admin)
O sistema deve permitir a exclusão de receitas através da área administrativa.

**Critérios de Aceitação:**
- Botão de exclusão para cada receita na listagem admin
- Confirmação antes de excluir (modal ou prompt)
- Exclusão permanente do banco de dados
- Remoção da imagem associada (se aplicável)
- Feedback visual de sucesso/erro após exclusão

### RF07 - SEO e Metadados
O sistema deve gerar metadados apropriados para as páginas de receitas.

**Critérios de Aceitação:**
- Metadata dinâmica na página de listagem
- Metadata dinâmica em cada página de detalhe (título, descrição, imagem)
- OpenGraph tags para compartilhamento em redes sociais
- Inclusão das rotas de receitas no sitemap.xml
- Structured data (JSON-LD) para receitas quando aplicável

## Requisitos Não Funcionais

### RNF01 - Consistência Visual
A interface deve seguir rigorosamente o design system existente do site.

**Critérios:**
- Paleta de cores Tulipas (verde-tulipa, beje-tulipa, rosa-tulipa, off-white-rosado)
- Tipografia: Playfair Display para títulos, Inter para corpo de texto
- Componentes Tailwind CSS com padrões shadcn/ui
- Espaçamentos e proporções consistentes com o restante do site

### RNF02 - Performance
As páginas de receitas devem carregar rapidamente e otimizar recursos.

**Critérios:**
- Imagens otimizadas (AVIF/WebP) via Next.js Image
- Lazy loading de imagens
- Code splitting automático via App Router
- Tempo de carregamento inicial < 3s em conexão 3G

### RNF03 - Acessibilidade
A interface deve ser acessível seguindo padrões WCAG 2.1 nível AA.

**Critérios:**
- Contraste de cores adequado (verificado via script audit-contrast.ts)
- HTML semântico
- Textos alternativos em todas as imagens
- Navegação por teclado funcional
- Labels apropriados em formulários

### RNF04 - Responsividade
A interface deve funcionar perfeitamente em todos os tamanhos de tela.

**Critérios:**
- Abordagem mobile-first
- Breakpoints consistentes com o site existente
- Touch targets adequados (mínimo 44x44px)
- Imagens responsivas com srcset

### RNF05 - Manutenibilidade
O código deve ser organizado, documentado e seguir os padrões do projeto.

**Critérios:**
- TypeScript com tipagem estrita
- Estrutura de pastas consistente com o projeto
- Comentários em código complexo
- Reutilização de componentes existentes quando possível
- Convenções de nomenclatura do projeto

### RNF06 - Segurança
A área administrativa deve ser protegida e validar dados adequadamente.

**Critérios:**
- Autenticação obrigatória para acesso ao admin
- Validação de dados no servidor (API routes)
- Sanitização de inputs para prevenir XSS
- Upload de imagens com validação de tipo e tamanho
- Rate limiting em endpoints de API (se aplicável)

## Casos de Uso Principais

### CU01 - Visitante Navega para Receitas
**Ator:** Visitante do site  
**Fluxo Principal:**
1. Visitante acessa o site
2. Clica em "Receitas" no menu
3. Sistema exibe listagem de receitas
4. Visitante visualiza cards com receitas disponíveis

**Fluxo Alternativo:**
- Se não houver receitas, sistema exibe mensagem informativa

### CU02 - Visitante Visualiza Receita Completa
**Ator:** Visitante do site  
**Fluxo Principal:**
1. Visitante está na listagem de receitas
2. Clica em um card de receita
3. Sistema exibe página de detalhe com todos os dados
4. Visitante lê ingredientes, passos e opinião da Isabel

**Fluxo Alternativo:**
- Se slug não existir, sistema exibe página 404

### CU03 - Isabel Cadastra Nova Receita
**Ator:** Isabel (administradora)  
**Fluxo Principal:**
1. Isabel acessa área administrativa
2. Navega para seção de receitas
3. Clica em "Nova Receita"
4. Preenche formulário com todos os campos
5. Faz upload da imagem do prato
6. Submete o formulário
7. Sistema valida dados e salva no banco
8. Sistema exibe confirmação de sucesso

**Fluxo Alternativo:**
- Se validação falhar, sistema exibe erros específicos
- Isabel corrige e reenvia

### CU04 - Isabel Edita Receita Existente
**Ator:** Isabel (administradora)  
**Fluxo Principal:**
1. Isabel acessa área administrativa
2. Visualiza listagem de receitas cadastradas
3. Clica em "Editar" na receita desejada
4. Sistema exibe formulário pré-preenchido
5. Isabel altera campos necessários
6. Submete o formulário
7. Sistema valida e atualiza no banco
8. Sistema exibe confirmação de sucesso

### CU05 - Isabel Exclui Receita
**Ator:** Isabel (administradora)  
**Fluxo Principal:**
1. Isabel acessa área administrativa
2. Visualiza listagem de receitas cadastradas
3. Clica em "Excluir" na receita desejada
4. Sistema solicita confirmação
5. Isabel confirma exclusão
6. Sistema remove receita do banco
7. Sistema exibe confirmação de sucesso

**Fluxo Alternativo:**
- Isabel cancela a exclusão, sistema mantém receita

## Dependências e Integrações

- **Menu de Navegação:** Integração com Header.tsx e menu mobile
- **Sistema de Admin:** Integração com estrutura admin existente
- **Banco de Dados:** Novo modelo Receita no Prisma schema
- **Upload de Imagens:** Sistema de upload e armazenamento de imagens
- **Sitemap:** Inclusão de rotas /receitas no sitemap.ts

## Premissas

- O sistema de autenticação admin já existe e será reutilizado
- O padrão de upload de imagens será definido (local ou serviço externo)
- Slugs serão únicos e gerados automaticamente a partir do título
- Ingredientes e passos serão campos de texto livre (não estruturados)
- A opinião final é sempre da Isabel, não do convidado

## Restrições

- Todo conteúdo público deve estar em português brasileiro (pt-BR)
- Deve seguir o design system Tulipas existente
- Deve usar Next.js 15+ App Router (não Pages Router)
- Deve usar Prisma como ORM
- Deve manter compatibilidade com estrutura de admin existente
