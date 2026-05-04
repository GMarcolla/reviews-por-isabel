# 🎯 Objetivo

Substituir a seção atual de múltiplos botões grandes da homepage por uma navegação de categorias horizontal, compacta e otimizada para mobile.

---

# 🧩 Contexto atual

Atualmente a homepage possui vários blocos grandes (cards) representando categorias como:

* Restaurantes
* Cafés e Docerias
* Lazer
* Prestadores de serviço
* Lojas
* Cupons
* Roteiro
* Contato

Problemas:

* Ocupa muito espaço vertical (above the fold)
* Prejudica a escaneabilidade
* Atrasa o acesso ao conteúdo principal
* Mistura navegação com conteúdo

---

# ✅ Nova abordagem

Criar uma seção de **categorias horizontais com scroll (chips/pills)** logo abaixo do header ou hero.

---

# 📱 Estrutura (mobile-first)

## Componente: CategoryScroll

Renderizar uma lista horizontal com rolagem lateral:

[Cafés] [Restaurantes] [Passeios] [Lojas] [Cupons] [Roteiro]

---

# 🧱 HTML (estrutura base)

```html
<section class="category-scroll">
  <div class="category-container">
    <button class="category active">Cafés</button>
    <button class="category">Restaurantes</button>
    <button class="category">Passeios</button>
    <button class="category">Lojas</button>
    <button class="category">Cupons</button>
    <button class="category">Roteiro</button>
  </div>
</section>
```

---

# 🎨 CSS (mobile-first)

```css
.category-scroll {
  width: 100%;
  overflow-x: auto;
  padding: 12px 16px;
}

.category-container {
  display: flex;
  gap: 8px;
  width: max-content;
}

.category {
  white-space: nowrap;
  border: none;
  padding: 10px 16px;
  border-radius: 999px;
  background-color: #f3e8e2;
  color: #5c3b2e;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.category.active {
  background-color: #5c3b2e;
  color: white;
}
```

---

# ⚙️ Comportamento esperado

* Scroll horizontal suave (touch-friendly)
* Sem quebra de linha (tudo em uma linha)
* Feedback visual ao selecionar (active state)
* Área clicável confortável (mínimo 40px altura)

---

# 🧠 Regras de UX

1. Sempre visível no topo (logo abaixo do header)

2. Não ocupar mais que 1 linha vertical

3. Priorizar categorias principais:

   * Cafés
   * Restaurantes
   * Passeios

4. Itens secundários no final:

   * Lojas
   * Cupons
   * Roteiro

5. NÃO incluir:

   * “Fale comigo”
   * “Prestadores de serviço”

Esses devem ir para menu ou footer.

---

# 🔄 Integração com conteúdo

Ao clicar em uma categoria:

Opção A (simples):

* Redirecionar para página da categoria

Opção B (melhor UX):

* Filtrar dinamicamente a lista de experiências na homepage

---

# 💡 Melhorias opcionais

* Adicionar ícones:
  ☕ Cafés
  🍽 Restaurantes
  🌿 Passeios
  🛍 Lojas
  🎟 Cupons
  🗺 Roteiro

* Scroll com “snap”:

```css
.category-container {
  scroll-snap-type: x mandatory;
}

.category {
  scroll-snap-align: start;
}
```

---

# 🚨 Remoções obrigatórias

Remover completamente:

* Grid de botões grandes da homepage
* Imagens associadas a esses botões
* Textos descritivos dentro desses blocos

---

# 🎯 Resultado esperado

* Redução de ~60–70% do espaço vertical inicial
* Navegação mais rápida
* Melhor experiência mobile
* Maior foco no conteúdo (experiências)

---

# 📌 Observação final

Esse componente deve ser tratado como **elemento de navegação**, não como conteúdo visual principal.
O foco da homepage deve passar a ser:
→ experiências (cards)
→ recomendações
→ descoberta
