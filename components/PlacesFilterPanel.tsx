'use client';

import { SubcategoriaInfo } from '@/lib/types';

export interface FilterState {
  subcategoria: string;
  cidade: string;
  bairro: string;
}

interface PlacesFilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  subcategorias: SubcategoriaInfo[];
  cidades: string[];
  bairros: string[];
}

export function PlacesFilterPanel({
  filters,
  onFilterChange,
  subcategorias,
  cidades,
  bairros,
}: PlacesFilterPanelProps) {
  
  const handleResetFilters = () => {
    onFilterChange({
      subcategoria: '',
      cidade: '',
      bairro: ''
    });
  };

  const activeFiltersCount = [filters.subcategoria, filters.cidade, filters.bairro].filter(Boolean).length;

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 mb-8 md:mb-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-terracota" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros
          {activeFiltersCount > 0 && (
            <span className="bg-terracota/10 text-terracota text-xs px-2 py-0.5 rounded-full">
              {activeFiltersCount} ativo{activeFiltersCount > 1 ? 's' : ''}
            </span>
          )}
        </h3>
        
        {activeFiltersCount > 0 && (
          <button 
            onClick={handleResetFilters}
            className="text-sm text-gray-500 hover:text-terracota transition-colors mt-2 md:mt-0"
          >
            Limpar todos
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtro de Subcategoria */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-subcategoria" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Especialidade
          </label>
          <div className="relative">
            <select
              id="filter-subcategoria"
              value={filters.subcategoria}
              onChange={(e) => onFilterChange({ ...filters, subcategoria: e.target.value })}
              className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-terracota/20 focus:border-terracota transition-colors cursor-pointer"
            >
              <option value="">Todas</option>
              {subcategorias.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.nome}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filtro de Cidade */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-cidade" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Cidade
          </label>
          <div className="relative">
            <select
              id="filter-cidade"
              value={filters.cidade}
              onChange={(e) => {
                // Ao trocar de cidade, limpa o bairro pois ele pode não pertencer à nova cidade
                onFilterChange({ ...filters, cidade: e.target.value, bairro: '' });
              }}
              className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-terracota/20 focus:border-terracota transition-colors cursor-pointer"
            >
              <option value="">Qualquer cidade</option>
              {cidades.map(cidade => (
                <option key={cidade} value={cidade}>{cidade}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filtro de Bairro */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="filter-bairro" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Bairro
          </label>
          <div className="relative">
            <select
              id="filter-bairro"
              value={filters.bairro}
              onChange={(e) => onFilterChange({ ...filters, bairro: e.target.value })}
              disabled={bairros.length === 0}
              className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-terracota/20 focus:border-terracota transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Qualquer bairro</option>
              {bairros.map(bairro => (
                <option key={bairro} value={bairro}>{bairro}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
