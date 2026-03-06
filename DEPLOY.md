# Guia de Deploy - Reviews por Isabel

## Deploy na Vercel (Recomendado)

A Vercel é a plataforma recomendada para hospedar este site Next.js, oferecendo deploy automático, CDN global e otimizações de performance.

### Passo a Passo

#### 1. Preparar o Repositório Git

Se ainda não tiver um repositório Git, crie um:

```bash
git init
git add .
git commit -m "Initial commit - Reviews por Isabel"
```

Envie para GitHub, GitLab ou Bitbucket:

```bash
git remote add origin <URL_DO_SEU_REPOSITORIO>
git push -u origin main
```

#### 2. Criar Conta na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Conecte com sua conta GitHub/GitLab/Bitbucket

#### 3. Importar Projeto

1. No dashboard da Vercel, clique em "Add New Project"
2. Selecione o repositório "reviews-por-isabel"
3. A Vercel detectará automaticamente que é um projeto Next.js

#### 4. Configurar Deploy

As configurações padrão já estão corretas:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

Clique em "Deploy"

#### 5. Aguardar Deploy

O primeiro deploy leva cerca de 2-3 minutos. A Vercel irá:

- Instalar dependências
- Compilar o projeto
- Gerar páginas estáticas
- Distribuir para CDN global

#### 6. Verificar Site

Após o deploy, você receberá uma URL como:
```
https://reviews-por-isabel.vercel.app
```

Teste todas as páginas:
- ✅ Home
- ✅ Restaurantes
- ✅ Cafés & Docerias
- ✅ Passeios
- ✅ Roteiro em Blumenau
- ✅ Cupons
- ✅ Contato

#### 7. Configurar Domínio Customizado (Opcional)

1. No dashboard do projeto, vá em "Settings" > "Domains"
2. Adicione seu domínio (ex: reviewsporisabel.com.br)
3. Configure os DNS conforme instruções da Vercel
4. Aguarde propagação (pode levar até 48h)

### Deploy Automático

Após o setup inicial, cada push para a branch `main` irá:

1. Disparar um novo deploy automaticamente
2. Executar build e testes
3. Atualizar o site em produção
4. Gerar preview URL para cada branch/PR

### Variáveis de Ambiente

Este projeto não requer variáveis de ambiente no momento. Se precisar adicionar no futuro:

1. Vá em "Settings" > "Environment Variables"
2. Adicione as variáveis necessárias
3. Faça redeploy

### Monitoramento

A Vercel oferece:

- **Analytics**: Métricas de visitantes e performance
- **Speed Insights**: Core Web Vitals em tempo real
- **Logs**: Logs de build e runtime

Acesse em "Analytics" e "Speed Insights" no menu do projeto.

### Otimizações Aplicadas

✅ Static Site Generation (SSG) para todas as páginas
✅ Otimização automática de imagens
✅ Compressão Brotli/Gzip
✅ CDN global com edge caching
✅ Headers de segurança configurados
✅ HTTPS automático

### Troubleshooting

**Build falhou?**
- Verifique os logs de build na Vercel
- Execute `npm run build` localmente para reproduzir o erro
- Certifique-se que todas as dependências estão no package.json

**Imagens não carregam?**
- Verifique se as imagens estão na pasta `public/`
- Confirme que os caminhos estão corretos

**Página 404?**
- Verifique se todas as rotas estão corretas
- Confirme que `generateStaticParams` está implementado nas páginas dinâmicas

### Suporte

- Documentação Vercel: https://vercel.com/docs
- Documentação Next.js: https://nextjs.org/docs
- Suporte Vercel: https://vercel.com/support

---

## Deploy Alternativo (Netlify)

Se preferir usar Netlify:

1. Crie arquivo `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. Conecte repositório no Netlify
3. Deploy automático será configurado

---

## Deploy Manual (Servidor Próprio)

Para hospedar em servidor próprio:

```bash
# Build
npm run build

# Iniciar servidor
npm start
```

Configure um processo manager como PM2:

```bash
pm2 start npm --name "reviews-isabel" -- start
pm2 save
pm2 startup
```

Configure nginx como reverse proxy na porta 3000.

---

**Projeto pronto para produção! 🚀**
