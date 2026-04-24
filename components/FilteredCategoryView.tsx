'use client';

import { useState, useMemo } from 'react';
import { Lugar, SubcategoriaInfo } from '@/lib/types';
import { PlacesFilterPanel, FilterState } from './PlacesFilterPanel';
import { CategorySection } from './CategorySection';

interface FilteredCategoryViewProps {
  lugares: Lugar[];
  subcategorias: SubcategoriaInfo[];
}

export function FilteredCategoryView({ lugares, subcategorias }: FilteredCategoryViewProps) {
  const [filters, setFilters] = useState<FilterState>({
    subcategoria: '',
    cidade: '',
    bairro: '',
  });

  // Extract unique cities from all places
  const cidades = useMemo(() => {
    const uniqueCidades = new Set(
      lugares.map(lugar => lugar.cidade).filter((c): c is string => Boolean(c))
    );
    return Array.from(uniqueCidades).sort();
  }, [lugares]);

  // Extract unique neighborhoods, optionally filtered by selected city
  const bairros = useMemo(() => {
    const lugaresParaExtrairBairros = filters.cidade 
      ? lugares.filter(l => l.cidade === filters.cidade)
      : lugares;
      
    const uniqueBairros = new Set(
      lugaresParaExtrairBairros.map(lugar => lugar.bairro).filter((b): b is string => Boolean(b))
    );
    return Array.from(uniqueBairros).sort();
  }, [lugares, filters.cidade]);

  // Apply filters
  const lugaresFiltrados = useMemo(() => {
    return lugares.filter(lugar => {
      // Filter by subcategoria
      if (filters.subcategoria && lugar.subcategoriaId !== filters.subcategoria) return false;
      // Filter by cidade
      if (filters.cidade && lugar.cidade !== filters.cidade) return false;
      // Filter by bairro
      if (filters.bairro && lugar.bairro !== filters.bairro) return false;
      
      return true;
    });
  }, [lugares, filters]);

  // Group filtered places by subcategoriaId
  const porSubcategoria = useMemo(() => {
    return lugaresFiltrados.reduce((acc, lugar) => {
      const key = lugar.subcategoriaId ?? 'sem-subcategoria';
      if (!acc[key]) acc[key] = [];
      acc[key].push(lugar);
      return acc;
    }, {} as Record<string, typeof lugares>);
  }, [lugaresFiltrados]);

  // Subcategorias que têm lugares filtrados, na ordem definida no banco
  const subcategoriasComLugares = useMemo(() => {
    return subcategorias.filter(s => porSubcategoria[s.id] && porSubcategoria[s.id].length > 0);
  }, [subcategorias, porSubcategoria]);

  // Lugares sem subcategoria (edge case)
  const semSubcategoria = porSubcategoria['sem-subcategoria'];

  return (
    <div>
      {/* Painel de Filtros */}
      <PlacesFilterPanel
        filters={filters}
        onFilterChange={setFilters}
        subcategorias={subcategorias}
        cidades={cidades}
        bairros={bairros}
      />

      {/* Seções de Subcategorias */}
      {lugaresFiltrados.length === 0 ? (
        <div className="text-center py-24 px-4 bg-gray-50 rounded-2xl border border-gray-100">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Nenhum lugar encontrado</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Tente ajustar ou limpar os filtros para ver mais opções disponíveis nesta categoria.
          </p>
          <button 
            onClick={() => setFilters({ subcategoria: '', cidade: '', bairro: '' })}
            className="mt-6 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-terracota hover:border-terracota transition-all font-medium"
          >
            Limpar todos os filtros
          </button>
        </div>
      ) : (
        <>
          {subcategoriasComLugares.map((subcategoria) => (
            <CategorySection
              key={subcategoria.id}
              title={subcategoria.nome}
              lugares={porSubcategoria[subcategoria.id]}
              columns={3}
            />
          ))}

          {semSubcategoria && semSubcategoria.length > 0 && (
            <CategorySection
              title="Outros"
              lugares={semSubcategoria}
              columns={3}
            />
          )}
        </>
      )}
    </div>
  );
}
