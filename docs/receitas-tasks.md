# Tarefas de Implementação - Cozinhando com Isabel

## Visão Geral

Este documento organiza as tarefas de implementação da feature "Cozinhando com Isabel" em fases lógicas. Cada tarefa inclui ID, descrição, arquivos envolvidos, dependências e estimativa de complexidade.

**Legenda de Complexidade:**
- 🟢 **Baixa:** Tarefa simples, implementação direta
- 🟡 **Média:** Requer integração ou lógica moderada
- 🔴 **Alta:** Complexa, múltiplas integrações ou lógica avançada

---

## Fase 1: Fundação e Modelo de Dados

### T01 - Criar Modelo Prisma 🟢
**Descrição:** Adicionar modelo Receita ao schema do Prisma

**Arquivos:**
- `prisma/schema.prisma` (modificar)

**Ações:**
1. Adicionar model Receita com todos os campos
2. Definir índices e constraints
3. Executar `npx prisma migrate dev --name add-receitas`
4. Executar `npx prisma generate`

**Dependências:** Nenhuma

**Checklist:**
- [ ] Model Receita criado com campos corretos
- [ ] Slug definido como unique
- [ ] Índice em slug criado
- [ ] Migration executada com sucesso
- [ ] Cliente Prisma regenerado

---

### T02 - Adicionar Interfaces TypeScript 🟢
**Descrição:** Adicionar tipos TypeScript para Receita

**Arquivos:**
- `lib/types.ts` (modificar)

**Ações:**
1. Adicionar interface `Receita`
2. Adicionar interface `ReceitaFormData`
3. Exportar tipos

**Dependências:** T01

**Checklist:**
- [ ] Interface Receita criada
- [ ] Interface ReceitaFormData criada
- [ ] Tipos exportados corretamente
- [ ] Sem erros de TypeScript

---

### T03 - Criar Funções de Acesso a Dados 🟡
**Descrição:** Implementar funções para CRUD de receitas

**Arquivos:**
- `lib/receitas.ts` (criar)

**Ações:**
1. Criar arquivo `lib/receitas.ts`
2. Implementar `getReceitas()`
3. Implementar `getReceitaBySlug()`
4. Implementar `getReceitaById()`
5. Implementar `createReceita()`
6. Implementar `updateReceita()`
7. Implementar `deleteReceita()`

**Dependências:** T01, T02

**Checklist:**
- [ ] Todas as funções implementadas
- [ ] Tipagem TypeScript correta
- [ ] Tratamento de erros adequado
- [ ] Funções testadas manualmente

---

### T04 - Criar Funções Utilitárias 🟡
**Descrição:** Implementar funções para geração de slugs

**Arquivos:**
- `lib/utils.ts` (modificar)

**Ações:**
1. Implementar `generateSlug(titulo: string)`
2. Implementar `generateUniqueSlug(titulo: string)`
3. Adicionar testes para caracteres especiais e acentos

**Dependências:** T01

**Checklist:**
- [ ] Função generateSlug implementada
- [ ] Função generateUniqueSlug implementada
- [ ] Remove acentos corretamente
- [ ] Gera slugs únicos
- [ ] Testado com títulos em português

---

### T05 - Criar Schema de Validação 🟢
**Descrição:** Criar schema Zod para validação de receitas

**Arquivos:**
- `lib/validations/receita.ts` (criar)

**Ações:**
1. Criar diretório `lib/validations/` se não existir
2. Criar schema Zod para Receita
3. Definir mensagens de erro em português
4. Exportar tipo inferido

**Dependências:** T02

**Checklist:**
- [ ] Schema Zod criado
- [ ] Validações para todos os campos obrigatórios
- [ ] Mensagens de erro em pt-BR
- [ ] Tipo ReceitaInput exportado

---

## Fase 2: API Routes

### T06 - Criar API Route GET/POST /api/receitas 🟡
**Descrição:** Implementar endpoints para listar e criar receitas

**Arquivos:**
- `app/api/receitas/route.ts` (criar)

**Ações:**
1. Implementar GET (listar todas as receitas)
2. Implementar POST (criar nova receita)
3. Adicionar validação com Zod
4. Adicionar verificação de autenticação no POST
5. Implementar upload de imagem
6. Gerar slug único

**Dependências:** T03, T04, T05

**Checklist:**
- [ ] GET retorna lista de receitas
- [ ] POST cria receita com validação
- [ ] Upload de imagem funcional
- [ ] Slug gerado automaticamente
- [ ] Autenticação verificada
- [ ] Tratamento de erros adequado

---

### T07 - Criar API Routes /api/receitas/[id] 🟡
**Descrição:** Implementar endpoints para operações por ID

**Arquivos:**
- `app/api/receitas/[id]/route.ts` (criar)

**Ações:**
1. Implementar GET (buscar por ID)
2. Implementar PUT (atualizar receita)
3. Implementar DELETE (excluir receita)
4. Adicionar validação e autenticação
5. Implementar exclusão de imagem no DELETE

**Dependências:** T03, T05

**Checklist:**
- [ ] GET retorna receita específica
- [ ] PUT atualiza receita com validação
- [ ] DELETE remove receita e imagem
- [ ] Autenticação verificada em PUT/DELETE
- [ ] Retorna 404 para IDs inexistentes
- [ ] Tratamento de erros adequado

---

### T08 - Implementar Upload de Imagens 🔴
**Descrição:** Sistema de upload e armazenamento de imagens

**Arquivos:**
- `lib/upload.ts` (criar)
- `app/api/receitas/route.ts` (modificar)
- `app/api/receitas/[id]/route.ts` (modificar)

**Ações:**
1. Criar função de upload para `public/receitas/`
2. Validar tipo MIME (JPEG, PNG, WebP)
3. Validar tamanho (max 5MB)
4. Gerar nome único para arquivo
5. Implementar exclusão de imagem antiga ao atualizar
6. Criar diretório `public/receitas/` se não existir

**Dependências:** T06, T07

**Checklist:**
- [ ] Upload salva imagem em public/receitas/
- [ ] Validação de tipo funcional
- [ ] Validação de tamanho funcional
- [ ] Nomes únicos gerados
- [ ] Imagens antigas removidas ao atualizar
- [ ] Tratamento de erros de upload

---

## Fase 3: Componentes UI

### T09 - Criar Componente CardReceita 🟢
**Descrição:** Card para exibir receita na listagem

**Arquivos:**
- `components/receitas/CardReceita.tsx` (criar)

**Ações:**
1. Criar componente com props tipadas
2. Usar Next.js Image para imagem
3. Aplicar estilos Tailwind (paleta Tulipas)
4. Adicionar link para página de detalhe
5. Implementar hover effects

**Dependências:** T02

**Checklist:**
- [ ] Componente criado e tipado
- [ ] Exibe imagem, título e convidado
- [ ] Link funcional para detalhe
- [ ] Estilos consistentes com site
- [ ] Responsivo (mobile-first)
- [ ] Acessível (alt text, semântica)

---

### T10 - Criar Componente ReceitaDetail 🟡
**Descrição:** Componente para exibir detalhes completos da receita

**Arquivos:**
- `components/receitas/ReceitaDetail.tsx` (criar)

**Ações:**
1. Criar componente com props tipadas
2. Layout em seções (cabeçalho, ingredientes, passos, opinião)
3. Imagem destacada
4. Preservar quebras de linha em textos
5. Aplicar tipografia hierárquica

**Dependências:** T02

**Checklist:**
- [ ] Componente criado e tipado
- [ ] Todas as seções implementadas
- [ ] Quebras de linha preservadas
- [ ] Tipografia correta (Playfair/Inter)
- [ ] Responsivo e acessível
- [ ] Estilos consistentes

---

### T11 - Criar Componente ReceitaForm 🔴
**Descrição:** Formulário para criar/editar receitas (admin)

**Arquivos:**
- `components/receitas/ReceitaForm.tsx` (criar)

**Ações:**
1. Criar componente com React Hook Form
2. Integrar validação Zod
3. Implementar upload de imagem com preview
4. Campos: título, convidado, ingredientes, passos, opinião, imagem
5. Estados de loading/erro/sucesso
6. Modo criação e edição (props condicionais)

**Dependências:** T02, T05

**Checklist:**
- [ ] Formulário com React Hook Form
- [ ] Validação Zod integrada
- [ ] Upload com preview funcional
- [ ] Todos os campos implementados
- [ ] Estados visuais (loading, erro, sucesso)
- [ ] Funciona em modo criar e editar
- [ ] Acessível (labels, ARIA)

---

## Fase 4: Páginas Públicas

### T12 - Criar Página de Listagem /receitas 🟡
**Descrição:** Página pública com listagem de receitas

**Arquivos:**
- `app/receitas/page.tsx` (criar)
- `app/receitas/loading.tsx` (criar)

**Ações:**
1. Criar Server Component
2. Buscar receitas com `getReceitas()`
3. Renderizar grid de CardReceita
4. Adicionar metadata (SEO)
5. Criar loading state
6. Mensagem quando não houver receitas

**Dependências:** T03, T09

**Checklist:**
- [ ] Página criada como Server Component
- [ ] Receitas carregadas do banco
- [ ] Grid responsivo de cards
- [ ] Metadata configurada
- [ ] Loading state implementado
- [ ] Mensagem de lista vazia
- [ ] Testado com e sem receitas

---

### T13 - Criar Página de Detalhe /receitas/[slug] 🟡
**Descrição:** Página pública com detalhes da receita

**Arquivos:**
- `app/receitas/[slug]/page.tsx` (criar)

**Ações:**
1. Criar Server Component com dynamic route
2. Implementar `generateStaticParams()`
3. Buscar receita com `getReceitaBySlug()`
4. Renderizar ReceitaDetail
5. Adicionar metadata dinâmica
6. Retornar notFound() se slug não existir

**Dependências:** T03, T10

**Checklist:**
- [ ] Página criada com dynamic route
- [ ] generateStaticParams implementado
- [ ] Receita carregada por slug
- [ ] ReceitaDetail renderizado
- [ ] Metadata dinâmica configurada
- [ ] 404 para slugs inexistentes
- [ ] OpenGraph tags configuradas

---

## Fase 5: Páginas Administrativas

### T14 - Criar Página Admin Listagem 🟡
**Descrição:** Página admin com listagem e ações CRUD

**Arquivos:**
- `admin/receitas/page.tsx` (criar)

**Ações:**
1. Criar Client Component
2. Buscar receitas via API
3. Tabela com colunas: título, convidado, data, ações
4. Botões: Nova Receita, Editar, Excluir
5. Modal de confirmação para exclusão
6. Feedback visual de ações

**Dependências:** T06, T07

**Checklist:**
- [ ] Página criada como Client Component
- [ ] Receitas carregadas via API
- [ ] Tabela com todas as colunas
- [ ] Botão "Nova Receita" funcional
- [ ] Botões de editar/excluir funcionais
- [ ] Confirmação de exclusão
- [ ] Feedback de sucesso/erro
- [ ] Protegida por autenticação

---

### T15 - Criar Página Admin Nova Receita 🟡
**Descrição:** Página admin para criar receita

**Arquivos:**
- `admin/receitas/nova/page.tsx` (criar)

**Ações:**
1. Criar Client Component
2. Renderizar ReceitaForm em modo criação
3. Implementar onSubmit (POST para API)
4. Redirecionar após sucesso
5. Tratamento de erros

**Dependências:** T06, T11

**Checklist:**
- [ ] Página criada como Client Component
- [ ] ReceitaForm renderizado
- [ ] Submit cria receita via API
- [ ] Redirecionamento após sucesso
- [ ] Tratamento de erros
- [ ] Protegida por autenticação

---

### T16 - Criar Página Admin Editar Receita 🟡
**Descrição:** Página admin para editar receita

**Arquivos:**
- `admin/receitas/[id]/editar/page.tsx` (criar)

**Ações:**
1. Criar Client Component
2. Buscar receita por ID via API
3. Renderizar ReceitaForm em modo edição
4. Implementar onSubmit (PUT para API)
5. Redirecionar após sucesso
6. Tratamento de erros

**Dependências:** T07, T11

**Checklist:**
- [ ] Página criada como Client Component
- [ ] Receita carregada por ID
- [ ] ReceitaForm pré-preenchido
- [ ] Submit atualiza receita via API
- [ ] Redirecionamento após sucesso
- [ ] Tratamento de erros
- [ ] Protegida por autenticação

---

## Fase 6: Navegação e Integrações

### T17 - Atualizar Menu Desktop 🟢
**Descrição:** Adicionar item "Receitas" ao Header

**Arquivos:**
- `components/Header.tsx` (modificar)

**Ações:**
1. Adicionar link "Receitas" na lista de navegação
2. Aplicar estilo ativo quando pathname = `/receitas`
3. Manter ordem lógica dos itens
4. Testar responsividade

**Dependências:** Nenhuma

**Checklist:**
- [ ] Link "Receitas" adicionado
- [ ] Direciona para /receitas
- [ ] Estilo ativo funcional
- [ ] Ordem lógica mantida
- [ ] Responsivo

---

### T18 - Atualizar Menu Mobile 🟢
**Descrição:** Adicionar item "Receitas" ao menu mobile

**Arquivos:**
- `components/MobileMenu.tsx` (modificar)

**Ações:**
1. Adicionar link "Receitas" no menu de 3 pontos
2. Adicionar ícone apropriado (ChefHat ou UtensilsCrossed)
3. Aplicar estilo ativo
4. Testar em dispositivos móveis

**Dependências:** Nenhuma

**Checklist:**
- [ ] Link "Receitas" adicionado
- [ ] Ícone apropriado usado
- [ ] Direciona para /receitas
- [ ] Estilo ativo funcional
- [ ] Testado em mobile

---

### T19 - Atualizar Sitemap 🟢
**Descrição:** Incluir rotas de receitas no sitemap

**Arquivos:**
- `app/sitemap.ts` (modificar)

**Ações:**
1. Importar `getReceitas()`
2. Adicionar rota `/receitas`
3. Adicionar rotas dinâmicas `/receitas/[slug]`
4. Configurar prioridades e changeFrequency
5. Testar geração do sitemap

**Dependências:** T03

**Checklist:**
- [ ] Rota /receitas adicionada
- [ ] Rotas dinâmicas adicionadas
- [ ] Prioridades configuradas
- [ ] lastModified configurado
- [ ] Sitemap gerado corretamente

---

### T20 - Atualizar Middleware (se necessário) 🟢
**Descrição:** Garantir proteção das rotas admin de receitas

**Arquivos:**
- `middleware.ts` (verificar/modificar)

**Ações:**
1. Verificar se `/admin/receitas` está protegido
2. Adicionar rota ao matcher se necessário
3. Testar acesso sem autenticação

**Dependências:** Nenhuma

**Checklist:**
- [ ] Rotas admin protegidas
- [ ] Redirecionamento para login funcional
- [ ] Acesso autenticado permitido

---

## Fase 7: Testes e Refinamentos

### T21 - Criar Diretório de Imagens 🟢
**Descrição:** Criar estrutura de pastas para imagens

**Arquivos:**
- `public/receitas/` (criar diretório)
- `public/receitas/.gitkeep` (criar)

**Ações:**
1. Criar diretório `public/receitas/`
2. Adicionar `.gitkeep` para versionar pasta vazia
3. Configurar `.gitignore` se necessário

**Dependências:** Nenhuma

**Checklist:**
- [ ] Diretório criado
- [ ] .gitkeep adicionado
- [ ] Permissões corretas

---

### T22 - Testar Fluxo Completo 🔴
**Descrição:** Teste end-to-end de toda a feature

**Ações:**
1. Criar receita via admin
2. Verificar aparição na listagem pública
3. Acessar página de detalhe
4. Editar receita via admin
5. Verificar atualização no frontend
6. Excluir receita via admin
7. Verificar remoção do frontend
8. Testar validações de formulário
9. Testar upload de imagens
10. Testar em diferentes dispositivos

**Dependências:** Todas as tarefas anteriores

**Checklist:**
- [ ] Criação funcional
- [ ] Listagem atualizada
- [ ] Detalhe acessível
- [ ] Edição funcional
- [ ] Exclusão funcional
- [ ] Validações funcionando
- [ ] Upload funcional
- [ ] Responsivo em todos os dispositivos
- [ ] Sem erros no console

---

### T23 - Auditoria de Acessibilidade 🟡
**Descrição:** Verificar conformidade com WCAG

**Ações:**
1. Executar `npm run audit-contrast` (se aplicável)
2. Testar navegação por teclado
3. Verificar alt text em imagens
4. Testar com leitor de tela
5. Validar HTML semântico
6. Verificar contraste de cores
7. Corrigir problemas encontrados

**Dependências:** T22

**Checklist:**
- [ ] Contraste adequado
- [ ] Navegação por teclado funcional
- [ ] Alt text em todas as imagens
- [ ] HTML semântico
- [ ] Testado com leitor de tela
- [ ] Sem violações WCAG AA

---

### T24 - Auditoria de Performance 🟡
**Descrição:** Otimizar performance das páginas

**Ações:**
1. Executar Lighthouse
2. Verificar Core Web Vitals
3. Otimizar imagens se necessário
4. Verificar bundle size
5. Testar em conexão lenta (3G)
6. Implementar melhorias identificadas

**Dependências:** T22

**Checklist:**
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Imagens otimizadas
- [ ] Bundle size aceitável

---

### T25 - Documentação 🟢
**Descrição:** Documentar a feature implementada

**Arquivos:**
- `README.md` (atualizar)
- `docs/receitas-implementation.md` (criar)

**Ações:**
1. Atualizar README com nova feature
2. Documentar estrutura de dados
3. Documentar API endpoints
4. Documentar componentes criados
5. Adicionar exemplos de uso

**Dependências:** T22

**Checklist:**
- [ ] README atualizado
- [ ] Documentação técnica criada
- [ ] API documentada
- [ ] Componentes documentados
- [ ] Exemplos incluídos

---

## Resumo de Estimativas

| Fase | Tarefas | Complexidade Total |
|------|---------|-------------------|
| Fase 1 - Fundação | T01-T05 | 2🟢 2🟡 1🟢 |
| Fase 2 - API | T06-T08 | 2🟡 1🔴 |
| Fase 3 - Componentes | T09-T11 | 1🟢 1🟡 1🔴 |
| Fase 4 - Páginas Públicas | T12-T13 | 2🟡 |
| Fase 5 - Admin | T14-T16 | 3🟡 |
| Fase 6 - Navegação | T17-T20 | 4🟢 |
| Fase 7 - Testes | T21-T25 | 2🟢 2🟡 1🔴 |

**Total:** 25 tarefas
- 🟢 Baixa: 10 tarefas
- 🟡 Média: 12 tarefas
- 🔴 Alta: 3 tarefas

## Ordem Recomendada de Execução

1. **Fase 1 completa** (fundação necessária para tudo)
2. **T06, T07** (API routes básicos)
3. **T09, T10** (componentes de visualização)
4. **T12, T13** (páginas públicas para testar visualização)
5. **T08** (upload de imagens)
6. **T11** (formulário admin)
7. **T14, T15, T16** (páginas admin)
8. **T17, T18, T19, T20** (integrações)
9. **T21** (estrutura de arquivos)
10. **T22, T23, T24, T25** (testes e refinamentos)

## Notas Importantes

- Executar `npx prisma migrate dev` após T01
- Testar cada API route individualmente após implementação
- Validar responsividade em cada componente criado
- Manter commits atômicos por tarefa
- Revisar código antes de marcar tarefa como completa
- Documentar decisões técnicas importantes
