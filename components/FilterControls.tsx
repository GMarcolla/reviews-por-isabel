'use client';

import { useEffect, useState } from 'react';
import { Place } from '@/lib/types';

/**
 * Props para o componente FilterControls
 */
interface FilterControlsProps {
  filters: {
    categoria: string;
    subcategoria: string;
    regiao: string;
  };
  onFilterChange: (filters: { categoria: string; subcategoria: string; regiao: string }) => void;
  places?: Place[]; // Opcional: para extrair valores únicos dinamicamente
}

/**
 * Componente de controles de filtro para o mapa interativo
 * Permite filtrar lugares por categoria, subcategoria e região
 * 
 * @param filters - Filtros atualmente aplicados
 * @param onFilterChange - Callback para atualizar filtros
 * @param places - Array de lugares para extrair valores únicos (opcional)
 */
export default function FilterControls({ filters, onFilterChange, places }: FilterControlsProps) {
  const [categorias, setCategorias] = useState<string[]>([]);
  const [regioes, setRegioes] = useState<string[]>([]);

  // Extrair valores únicos de categorias e regiões dos dados
  useEffect(() => {
    if (places && places.length > 0) {
      // Extrair categorias únicas
      const uniqueCategorias = Array.from(new Set(places.map(p => p.categoria))).sort();
      setCategorias(uniqueCategorias);

      // Extrair regiões únicas
      const uniqueRegioes = Array.from(new Set(places.map(p => p.regiao))).sort();
      setRegioes(uniqueRegioes);
    }
  }, [places]);

  /**
   * Reseta todos os filtros para o estado inicial
   */
  const handleResetFilters = () => {
    onFilterChange({
      categoria: '',
      subcategoria: '',
      regiao: ''
    });
  };

  return (
    <div className="w-full">
      {/* Container com scroll horizontal em mobile */}
      <div className="flex flex-wrap gap-3 md:gap-4 overflow-x-auto pb-2">
        {/* Select de Categoria */}
        <div className="flex-shrink-0">
          <select
            value={filters.categoria}
            onChange={(e) => onFilterChange({ ...filters, categoria: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
          >
            <option value="">Todas as categorias</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Select de Região */}
        <div className="flex-shrink-0">
          <select
            value={filters.regiao}
            onChange={(e) => onFilterChange({ ...filters, regiao: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
          >
            <option value="">Todas as regiões</option>
            {regioes.map(reg => (
              <option key={reg} value={reg}>{reg}</option>
            ))}
          </select>
        </div>

        {/* Botão Mostrar Todos */}
        <div className="flex-shrink-0">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
          >
            Mostrar todos
          </button>
        </div>
      </div>

      {/* Indicador de filtros ativos */}
      {(filters.categoria || filters.regiao) && (
        <div className="mt-3 text-sm text-gray-600">
          Filtrando por:
          {filters.categoria && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded">{filters.categoria}</span>}
          {filters.regiao && <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded">{filters.regiao}</span>}
        </div>
      )}
    </div>
  );
}
