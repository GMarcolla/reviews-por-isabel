# Vercel Web Analytics — Implementação e Considerações

**Data:** 07/08/2026
**Pacote:** `@vercel/analytics@2.0.1`
**Status:** implementado e validado localmente. **Falta 1 passo manual obrigatório** (ver seção "Ação pendente").

---

## 1. O que foi feito

### 1.1 Instalação

```bash
npm i @vercel/analytics
```

Adicionado a `package.json` como dependência de produção (`^2.0.1`). Uma única dependência nova, sem dependências transitivas.

### 1.2 Componente wrapper — `components/Analytics.tsx` (novo)

```tsx
"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

// Rotas que não devem gerar eventos de pageview (área logada).
const ROTAS_IGNORADAS = ["/admin"];

export function Analytics() {
  return (
    <VercelAnalytics
      beforeSend={(event) => {
        const { pathname } = new URL(event.url);
        if (ROTAS_IGNORADAS.some((rota) => pathname.startsWith(rota))) {
          return null;
        }
        return event;
      }}
    />
  );
}
```

### 1.3 Root layout — `app/layout.tsx`

```diff
  import type { Metadata } from "next";
  import { Lora, Outfit } from "next/font/google";
+ import { Analytics } from "@/components/Analytics";
  import "./globals.css";

  ...
          <WhatsAppButton />
          <Footer />
+         <Analytics />
        </body>
```

Como está no root layout, cobre **todas as 121 páginas** do site automaticamente — incluindo as rotas dinâmicas (`/restaurantes/[slug]`, `/cafes/[slug]`, `/receitas/[slug]`, etc.). Não é necessário tocar em nenhuma página individual.

---

## 2. Por que um wrapper e não o exemplo da documentação

A documentação oficial da Vercel (`/docs/analytics/package`) mostra o `beforeSend` inline direto no `app/layout.tsx`. **Esse exemplo não funciona em um root layout Server Component** — foi testado neste projeto e quebra o build:

```
Error: Functions cannot be passed directly to Client Components unless you
explicitly expose it by marking it with "use server".
Export encountered an error on /_not-found/page: /_not-found, exiting the build.
```

O motivo: `beforeSend` é uma função, e o React Server Components não serializa funções na fronteira server → client. O `app/layout.tsx` deste projeto é Server Component (usa `export const metadata`, então precisa continuar sendo).

A solução é isolar a função dentro de um Client Component (`"use client"`), que é exatamente o que `components/Analytics.tsx` faz. Essa versão foi validada com build completo.

> Se preferirem rastrear **todas** as rotas, incluindo `/admin`, basta deletar `components/Analytics.tsx` e importar direto de `@vercel/analytics/next` no layout. Aí o exemplo simples da doc (`<Analytics />` sem props) funciona sem problema.

---

## 3. Como funciona por baixo dos panos

Verificado lendo o código do pacote (`node_modules/@vercel/analytics/dist/next/index.mjs`):

- O componente é `"use client"` e injeta um `<script defer>` no `document.head` via `useEffect` (linhas 157–170).
- **Não aparece no HTML pré-renderizado** — isso é esperado, não é bug. Confirmei que o HTML estático em `.next/server/app/` não contém o script; ele entra em runtime, no cliente.
- O script é servido do **próprio domínio**, não de um CDN de terceiros.
- **Resilient Intake (novidade da v2):** o path do script e dos endpoints de coleta **não é fixo**. A Vercel gera uma seed aleatória no build e injeta a configuração dinamicamente, produzindo um `/<path-único>/script.js`. O `/_vercel/insights/script.js` que aparece hardcoded na linha 94 do pacote é apenas o **fallback** para quando essa configuração não existe.
- O rastreamento de rota usa `useParams`/`usePathname`/`useSearchParams` (linha 222+), o que agrupa corretamente as rotas dinâmicas: `/restaurantes/bapjin` é reportado como `/restaurantes/[slug]`, com o valor real disponível como propriedade.
- O componente já vem embrulhado no próprio `<Suspense>` internamente (linha 262). Por isso **não** dispara o erro de build `useSearchParams() should be wrapped in a suspense boundary`.

**Impacto de performance:** ~2,2 KB gzip no bundle client. O script de tracking é `defer`, carregado após o parse do HTML, fora do caminho crítico de renderização. O `First Load JS` compartilhado permaneceu em 102 KB.

---

## 4. Validação executada

| Verificação | Resultado |
|---|---|
| `npx tsc --noEmit` | ✅ exit 0, sem erros de tipo |
| `npm run build` | ✅ compilou, 119/119 páginas estáticas geradas |
| Lint (dentro do build) | ✅ sem novos warnings |
| Injeção do script | ✅ confirmada no código do pacote (client-side, `document.head`) |
| Versão do subpath `/next` | ✅ existe em `exports` do pacote (v2.0.1) |

Os 3 warnings que aparecem no build (`no-img-element` e dois `react-hooks/exhaustive-deps`) são **pré-existentes**, em componentes de mapa/imagem, e não têm relação com esta mudança.

---

## 5. ⚠️ Ação pendente (obrigatória)

**O código sozinho não coleta nada, e o push/deploy NÃO habilita automaticamente.** Confirmado na documentação de troubleshooting da Vercel:

> "If data is not visible in the analytics dashboard or a 404 error occurs while loading `script.js`, it could be due to **deploying the tracking code before enabling Web Analytics**."

A falha é silenciosa: o build passa, o site funciona normalmente, e o analytics simplesmente não registra nada.

### Passos

1. Dashboard da Vercel → **entrar no projeto** → **Analytics** na sidebar → botão **Enable**
2. Fazer um novo deploy (as rotas de coleta só passam a existir após o deploy seguinte à ativação)
3. **Promover o deploy a produção**, se ele não for direto: Deployments → três pontinhos no deploy mais recente → **Promote to Production**

### Se o botão Enable não aparecer

- **É por projeto, não por time.** É preciso entrar no projeto primeiro; "Analytics" não é uma aba do dashboard geral. URL direta: `vercel.com/<time>/<projeto>/analytics`
- **Permissão.** A doc marca `🔒 Permissions Required: Web Analytics`. Contas com papel de Member/Viewer num time podem não ver o botão.
- **Projeto sem deploy.** Sem ao menos um deploy, a página de Analytics não existe.

### Como confirmar que funcionou

Abrir o site em produção, DevTools → aba **Network** → filtrar por `script.js` ou procurar uma requisição terminando em `/view`. Deve aparecer `/<path-único>/view` a cada navegação.

⚠️ Por causa do Resilient Intake (seção 3), **filtrar por `insights` pode não encontrar nada** mesmo com tudo funcionando — o path é randomizado por build.

No painel, enquanto ainda não houver tráfego coletado, a Vercel mostra um popup **"Awaiting Data"**. Isso significa habilitado, porém sem dados ainda — é o estado esperado logo após o primeiro deploy, e é diferente de não estar habilitado.

Os dados levam alguns dias de tráfego real para ficarem úteis no painel.

---

## 6. Considerações e riscos

### 6.1 Limites do plano (atenção se estiverem no Hobby)

| | Hobby | Pro |
|---|---|---|
| Eventos inclusos | 50.000/mês | nenhum incluso, $0,03 por 1K |
| Janela de relatório | **1 mês** | 12 meses |
| Custom events | ❌ não disponível | ✅ incluso |
| Parâmetros UTM | ❌ | via add-on Plus ($10/mês) |

Pontos importantes:

- **Cada pageview = 1 evento.** 50k/mês dá ~1.600 pageviews/dia. Para um guia local de Blumenau isso provavelmente é folgado no começo, mas convém acompanhar.
- **A cota é compartilhada entre todos os projetos da conta**, não é por projeto.
- No Hobby, ao estourar o limite há 3 dias de carência e depois **a coleta é pausada** até o próximo ciclo — não há cobrança extra, mas há perda de dados.
- **Retenção de apenas 1 mês no Hobby** é o ponto mais limitante: inviabiliza comparação ano a ano ou análise de sazonalidade (relevante para turismo, ex.: Oktoberfest). Se isso importar, o Pro se justifica.

### 6.2 Rotas excluídas do tracking

Excluí `/admin` (área autenticada da Isabel), porque os acessos administrativos poluem as métricas de audiência real e consomem cota à toa.

**Resolvido:** as páginas `/test-header` e `/test-botao-hub` estavam sendo buildadas e publicadas em produção — páginas de teste acessíveis publicamente e indexáveis. Foram **removidas do projeto** (ver seção 8). Por isso não constam mais do filtro acima.

### 6.3 Rotas `/passeios` vs `/lazer`

O `next.config.ts` tem redirect permanente de `/passeios` → `/lazer`, mas **ambas as rotas continuam sendo geradas no build** (`/passeios`, `/passeios/[slug]`, `/lazer`, `/lazer/[slug]`). No painel, o tráfego deve se concentrar em `/lazer` por causa do redirect, mas se aparecerem números em `/passeios` é sinal de que a rota antiga ainda está sendo servida em algum caminho — vale investigar quando os dados chegarem.

### 6.4 Segurança / CSP

O projeto **não define `Content-Security-Policy`** hoje (nem em `next.config.ts` nem em `vercel.json`) — então nada bloqueia o script. Se um dia adicionarem CSP, será necessário liberar:

```
script-src 'self';
connect-src 'self';
```

Como tudo é first-party (`/_vercel/insights/*`), `'self'` basta — não precisa allowlist de domínio externo.

### 6.5 Privacidade / LGPD

O Vercel Web Analytics **não usa cookies de terceiros**. Visitantes são identificados por um hash derivado da requisição, e a sessão **é descartada automaticamente após 24h** — não há como reconstruir a navegação de uma pessoa entre sites ou ao longo do tempo.

Dados coletados por evento: timestamp, URL, rota dinâmica, referrer, query params (filtrados), geolocalização (país/região/cidade), SO, navegador e tipo de dispositivo. Nenhum identificador pessoal.

Isso coloca a ferramenta em posição bem mais confortável que o Google Analytics para LGPD. **Ressalva:** a documentação da Vercel afirma que o produto foi desenhado para alinhar-se às orientações das autoridades de proteção de dados, mas **não afirma explicitamente que dispensa banner de consentimento** — essa conclusão é minha, com base na ausência de cookies e de dados pessoais. Se houver preocupação jurídica real, vale confirmar com quem cuida disso.

Recomendo **atualizar a política de privacidade** do site mencionando o uso de analytics agregado e anônimo, se houver uma página dessas.

### 6.6 Adblockers

Por ser servido do próprio domínio **e com path randomizado por build** (Resilient Intake da v2), escapa das listas de bloqueio que casam o padrão `/_vercel/insights` — esse é justamente o propósito do recurso. A v2 deve ter perda bem menor que o Google Analytics ou que a v1 do próprio pacote.

Ainda assim, nenhuma solução client-side captura 100%: usuários com JavaScript desabilitado ou bloqueio genérico de scripts de terceiros continuam invisíveis. Trate os números como uma boa aproximação, não como contagem exata.

---

## 7. Próximos passos sugeridos (opcionais)

### 7.1 Custom events — o maior ganho, mas exige Pro

Para um site de guia/curadoria, os pageviews contam só metade da história. Os eventos que realmente importam para a Isabel:

- **Clique no botão de WhatsApp** (`components/WhatsAppButton.tsx`) — mede intenção de contato, provavelmente a métrica de conversão mais relevante do site
- **Clique/cópia de cupom** (`app/cupons/`) — mede valor entregue aos parceiros, argumento comercial direto
- **Interação com o mapa** (`app/mapa/`) — mede engajamento com a feature mais pesada do site
- **Cliques em link externo** de um lugar (site/Instagram do parceiro)

Exemplo aplicado ao botão de WhatsApp:

```tsx
"use client";
import { track } from "@vercel/analytics";

// dentro do <a>:
onClick={() => track("whatsapp_click", { origem: pathname })}
```

⚠️ `track()` é **silenciosamente ignorado no plano Hobby** — não quebra nada, mas também não registra. Só implementar junto com o upgrade para Pro. No Pro são permitidas 2 propriedades por evento (8 com o add-on Plus).

### 7.2 Speed Insights

Produto **separado** (`@vercel/speed-insights`), com cota e cobrança próprias. Mede Core Web Vitals reais de usuários. Faz sentido aqui porque o site é pesado em imagens (Cloudinary) e mapas (Leaflet + Google Maps), e Web Vitals afetam ranking de SEO — que é claramente uma prioridade neste projeto, dado o cuidado com metadata e JSON-LD no layout.

Não instalei porque não foi solicitado e tem custo próprio.

---

## 8. Resumo dos arquivos alterados

| Arquivo | Mudança |
|---|---|
| `package.json` | + dependência `@vercel/analytics: ^2.0.1` |
| `package-lock.json` | lockfile atualizado (1 pacote) |
| `components/Analytics.tsx` | **novo** — wrapper client com filtro de rotas |
| `app/layout.tsx` | + import e `<Analytics />` antes de `</body>` |
| `app/test-header/` | **removido** — página de teste publicada em produção |
| `app/test-botao-hub/` | **removido** — página de teste publicada em produção |
| `components/BotaoHub.tsx` | **removido** — código morto, sem consumidores |

Nenhuma página de conteúdo foi modificada. Mudança de baixo risco e trivialmente reversível.

As duas páginas de teste eram demos puras: apenas consumiam componentes já existentes (`Container`, `Header`, `BotaoHub`, `SectionTitle`) sem nenhuma lógica própria. Confirmei por busca em todo o projeto que nada as referenciava — nem links, nem sitemap, nem navegação. O build caiu de 121 para 119 páginas.

Com a saída da página de teste, `components/BotaoHub.tsx` ficou sem nenhum consumidor e foi removido também. Apesar do docblock indicá-lo como "botão grande para navegação na página inicial (hub)", a home atual não o utiliza: `app/page.tsx` faz a navegação por categorias com `CategoryNav` e `CarrosselLugares`. `Container` e `SectionTitle` continuam em uso e foram mantidos.

> Se o `BotaoHub` fizer falta no futuro, ele está preservado no histórico do git e pode ser restaurado com `git checkout <commit> -- components/BotaoHub.tsx`.
