# Checklist de Testes de SEO - Reviews por Isabel

## ✅ Configurações Implementadas

### 1. Favicon
- [x] favicon.svg em /public
- [x] icon.tsx para gerar favicon.png dinâmico (32x32)
- [x] apple-icon.tsx para ícone Apple (180x180)

**Como testar:**
- Abrir http://localhost:3000 e verificar o ícone na aba do navegador
- Verificar em dispositivos iOS se o ícone aparece ao adicionar à tela inicial

### 2. Metadata Base no Root Layout
- [x] Título configurado com template
- [x] Descrição otimizada com palavras-chave
- [x] Keywords relevantes para Blumenau
- [x] Autores e creator definidos
- [x] Publisher configurado
- [x] Format detection configurado
- [x] Canonical URL configurado
- [x] Verificação do Google (variável de ambiente)

**Como testar:**
- Abrir http://localhost:3000
- Inspecionar elemento e verificar tags <meta> no <head>
- Verificar se o título aparece corretamente na aba

### 3. Robots.txt
- [x] Arquivo criado em /public/robots.txt
- [x] Permite todos os crawlers
- [x] Referência ao sitemap
- [x] Bloqueia páginas de teste

**Como testar:**
- Acessar http://localhost:3000/robots.txt
- Verificar se o conteúdo está correto

### 4. Sitemap.xml
- [x] Arquivo sitemap.ts criado em /app
- [x] Inclui todas as páginas estáticas
- [x] Inclui páginas dinâmicas de restaurantes
- [x] Inclui páginas dinâmicas de cafés
- [x] Inclui páginas dinâmicas de passeios
- [x] Configurado com prioridades e frequências de atualização

**Como testar:**
- Acessar http://localhost:3000/sitemap.xml
- Verificar se todas as URLs estão listadas
- Verificar se as prioridades estão corretas

### 5. Open Graph Images
- [x] opengraph-image.tsx criado para gerar imagem dinâmica
- [x] Dimensões corretas (1200x630)
- [x] Design com identidade visual do site
- [x] Metadata Open Graph configurada no layout

**Como testar:**
- Acessar http://localhost:3000/opengraph-image
- Verificar se a imagem é gerada corretamente
- Usar ferramenta de preview social (ver seção abaixo)

### 6. Twitter Card
- [x] Configurado como summary_large_image
- [x] Título e descrição otimizados
- [x] Imagem configurada
- [x] Creator handle configurado

**Como testar:**
- Usar Twitter Card Validator (ver seção abaixo)

### 7. JSON-LD (Dados Estruturados)
- [x] Schema.org WebSite implementado
- [x] Informações de autor e publisher
- [x] URL e idioma configurados

**Como testar:**
- Usar Google Rich Results Test (ver seção abaixo)

## 🧪 Ferramentas de Teste

### Preview de Compartilhamento Social

#### 1. Facebook/Meta Debugger
URL: https://developers.facebook.com/tools/debug/
- Cole a URL do site (após deploy)
- Clique em "Debug"
- Verifique se a imagem, título e descrição aparecem corretamente

#### 2. Twitter Card Validator
URL: https://cards-dev.twitter.com/validator
- Cole a URL do site (após deploy)
- Verifique o preview do card

#### 3. LinkedIn Post Inspector
URL: https://www.linkedin.com/post-inspector/
- Cole a URL do site (após deploy)
- Verifique o preview

#### 4. Google Rich Results Test
URL: https://search.google.com/test/rich-results
- Cole a URL do site (após deploy)
- Verifique se os dados estruturados são válidos

### Testes Locais

#### Verificar Metadata
```bash
# Abrir DevTools (F12)
# Console:
document.querySelector('meta[property="og:title"]').content
document.querySelector('meta[property="og:description"]').content
document.querySelector('meta[property="og:image"]').content
document.querySelector('meta[name="twitter:card"]').content
```

#### Verificar JSON-LD
```bash
# Abrir DevTools (F12)
# Console:
JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)
```

## 📋 Checklist de Verificação Manual

### Antes do Deploy
- [ ] Verificar se todas as variáveis de ambiente estão configuradas
- [ ] Testar build de produção: `npm run build`
- [ ] Verificar se não há erros no build
- [ ] Testar sitemap localmente: http://localhost:3000/sitemap.xml
- [ ] Testar robots.txt localmente: http://localhost:3000/robots.txt
- [ ] Verificar Open Graph image: http://localhost:3000/opengraph-image

### Após o Deploy
- [ ] Testar URL de produção no Facebook Debugger
- [ ] Testar URL de produção no Twitter Card Validator
- [ ] Testar URL de produção no LinkedIn Post Inspector
- [ ] Testar URL de produção no Google Rich Results Test
- [ ] Submeter sitemap no Google Search Console
- [ ] Verificar indexação no Google (site:reviewsporisabel.com.br)
- [ ] Testar compartilhamento real no WhatsApp
- [ ] Testar compartilhamento real no Facebook
- [ ] Testar compartilhamento real no Twitter
- [ ] Testar compartilhamento real no LinkedIn

## 🎯 Métricas de Sucesso

### SEO
- [ ] Site aparece no Google ao buscar "reviews por isabel"
- [ ] Site aparece no Google ao buscar "guia blumenau"
- [ ] Todas as páginas principais estão indexadas
- [ ] Rich snippets aparecem nos resultados de busca

### Social Media
- [ ] Preview correto no WhatsApp (imagem, título, descrição)
- [ ] Preview correto no Facebook (imagem, título, descrição)
- [ ] Preview correto no Twitter (card grande com imagem)
- [ ] Preview correto no LinkedIn (imagem, título, descrição)

## 📝 Notas Importantes

1. **Variáveis de Ambiente**: Certifique-se de configurar as variáveis no arquivo .env.local:
   - NEXT_PUBLIC_SITE_URL
   - NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (após obter no Google Search Console)

2. **Cache de Redes Sociais**: Após fazer alterações nas meta tags, pode ser necessário:
   - Limpar o cache no Facebook Debugger
   - Aguardar alguns minutos para o Twitter atualizar
   - Usar parâmetros de query string para forçar atualização (?v=2)

3. **Google Search Console**: 
   - Adicionar e verificar o site
   - Submeter o sitemap
   - Monitorar indexação e erros

4. **Performance**: 
   - As imagens Open Graph são geradas dinamicamente
   - Considere adicionar cache headers se necessário
   - Monitore o tempo de geração das imagens

## ✨ Melhorias Futuras (Opcional)

- [ ] Adicionar imagens Open Graph específicas por página
- [ ] Implementar breadcrumbs com Schema.org
- [ ] Adicionar LocalBusiness schema para lugares
- [ ] Implementar AggregateRating se houver avaliações
- [ ] Adicionar Article schema para o roteiro
- [ ] Configurar Google Analytics
- [ ] Configurar Microsoft Clarity ou Hotjar
- [ ] Implementar PWA (Progressive Web App)
