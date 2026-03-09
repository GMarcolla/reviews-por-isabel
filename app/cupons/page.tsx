'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/Container';
import { getCupons } from '@/lib/data/cupons';
import { Ticket, Search, Filter } from 'lucide-react';

function CuponsContent() {
  const searchParams = useSearchParams();
  const lugarIdParam = searchParams.get('lugar');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedSubcategoria, setSelectedSubcategoria] = useState('');

  const todosCupons = getCupons();

  // Filtrar cupons
  const cuponsFiltrados = useMemo(() => {
    let filtered = todosCupons;

    // Filtro por lugar (vindo da URL)
    if (lugarIdParam) {
      filtered = filtered.filter(c => c.lugarId === lugarIdParam);
    }

    // Filtro por busca
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.lugarNome.toLowerCase().includes(lowerSearch) ||
        c.descricao.toLowerCase().includes(lowerSearch)
      );
    }

    // Filtro por categoria
    if (selectedCategoria) {
      filtered = filtered.filter(c => c.categoria === selectedCategoria);
    }

    // Filtro por subcategoria
    if (selectedSubcategoria) {
      filtered = filtered.filter(c => c.subcategoria === selectedSubcategoria);
    }

    return filtered;
  }, [todosCupons, lugarIdParam, searchTerm, selectedCategoria, selectedSubcategoria]);

  // Extrair categorias únicas
  const categorias = useMemo(() => {
    const cats = new Set(todosCupons.map(c => c.categoria));
    return Array.from(cats).sort();
  }, [todosCupons]);

  // Extrair subcategorias únicas baseadas na categoria selecionada
  const subcategorias = useMemo(() => {
    if (!selectedCategoria) return [];
    const subcats = new Set(
      todosCupons
        .filter(c => c.categoria === selectedCategoria)
        .map(c => c.subcategoria)
    );
    return Array.from(subcats).sort();
  }, [todosCupons, selectedCategoria]);

  // Limpar filtros
  const limparFiltros = () => {
    setSearchTerm('');
    setSelectedCategoria('');
    setSelectedSubcategoria('');
  };

  return (
    <Container size="xl" className="py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-escuro mb-4">
          Cupons de Desconto
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          Aproveite descontos exclusivos nos melhores lugares de Blumenau e região!
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-8 bg-beje-tulipa/20 rounded-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-marrom-escuro" />
          <h2 className="font-display text-xl text-marrom-escuro">Filtros</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Busca por nome */}
          <div>
            <label htmlFor="search" className="block text-sm font-semibold text-marrom-escuro mb-2">
              Buscar por nome
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-marrom-escuro/60" />
              <input
                id="search"
                type="text"
                placeholder="Digite o nome do lugar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-beje-tulipa bg-white text-marrom-escuro placeholder:text-marrom-escuro/50 focus:outline-none focus:ring-2 focus:ring-rosa-tulipa transition-all duration-200"
              />
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label htmlFor="categoria" className="block text-sm font-semibold text-marrom-escuro mb-2">
              Categoria
            </label>
            <select
              id="categoria"
              value={selectedCategoria}
              onChange={(e) => {
                setSelectedCategoria(e.target.value);
                setSelectedSubcategoria(''); // Limpar subcategoria ao mudar categoria
              }}
              className="w-full px-4 py-2 rounded-lg border border-beje-tulipa bg-white text-marrom-escuro focus:outline-none focus:ring-2 focus:ring-rosa-tulipa transition-all duration-200"
            >
              <option value="">Todas as categorias</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategoria */}
          <div>
            <label htmlFor="subcategoria" className="block text-sm font-semibold text-marrom-escuro mb-2">
              Subcategoria
            </label>
            <select
              id="subcategoria"
              value={selectedSubcategoria}
              onChange={(e) => setSelectedSubcategoria(e.target.value)}
              disabled={!selectedCategoria}
              className="w-full px-4 py-2 rounded-lg border border-beje-tulipa bg-white text-marrom-escuro focus:outline-none focus:ring-2 focus:ring-rosa-tulipa transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Todas as subcategorias</option>
              {subcategorias.map(subcat => (
                <option key={subcat} value={subcat}>
                  {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botão limpar filtros */}
        {(searchTerm || selectedCategoria || selectedSubcategoria) && (
          <button
            onClick={limparFiltros}
            className="mt-4 text-sm text-rosa-tulipa hover:text-rosa-tulipa-claro transition-colors duration-200"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Lista de Cupons */}
      {cuponsFiltrados.length === 0 ? (
        <div className="text-center py-12">
          <Ticket className="w-16 h-16 text-marrom-escuro/30 mx-auto mb-4" />
          <p className="text-lg text-marrom-escuro/80">
            Nenhum cupom encontrado com os filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cuponsFiltrados.map((cupom) => (
            <div
              key={cupom.id}
              className="bg-white rounded-card shadow-card-tulipa p-6 hover:shadow-card-tulipa-hover transition-shadow duration-200"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rosa-tulipa rounded-full flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-marrom-escuro mb-1">
                    {cupom.lugarNome}
                  </h3>
                  <p className="text-sm text-marrom-escuro/70">
                    {cupom.categoria.charAt(0).toUpperCase() + cupom.categoria.slice(1)}
                  </p>
                </div>
              </div>

              {/* Desconto */}
              <div className="mb-4 p-4 bg-beje-tulipa/20 rounded-lg">
                <p className="text-2xl font-bold text-marrom-escuro text-center">
                  {cupom.descricao}
                </p>
              </div>

              {/* Código */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-marrom-escuro mb-2">Código:</p>
                <div className="p-3 bg-off-white-rosado rounded-lg border-2 border-dashed border-rosa-tulipa">
                  <p className="text-center font-mono font-bold text-marrom-escuro">
                    {cupom.codigo}
                  </p>
                </div>
              </div>

              {/* Termos */}
              {cupom.termos && (
                <div className="text-xs text-marrom-escuro/70">
                  <p className="font-semibold mb-1">Termos:</p>
                  <p>{cupom.termos}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default function CuponsPage() {
  return (
    <Suspense fallback={
      <Container size="xl" className="py-8 md:py-12">
        <div className="text-center">
          <p className="text-lg text-marrom-rosado">Carregando cupons...</p>
        </div>
      </Container>
    }>
      <CuponsContent />
    </Suspense>
  );
}
