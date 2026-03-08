'use client';

import { Place } from '@/lib/types';

interface PlacesListProps {
  places: Place[];
  onPlaceClick: (place: Place) => void;
  selectedPlace?: Place | null;
}

/**
 * Componente que exibe uma lista de lugares com informações
 * Sincroniza com o mapa ao clicar em um item
 */
export default function PlacesList({ places, onPlaceClick, selectedPlace }: PlacesListProps) {
  /**
   * Retorna a cor da categoria
   */
  const getCategoryColor = (categoria: string): string => {
    const colorMap: Record<string, string> = {
      'Restaurantes': 'bg-red-100 text-red-700 border-red-300',
      'Cafés e docerias': 'bg-amber-100 text-amber-800 border-amber-300',
      'Lazer': 'bg-blue-100 text-blue-700 border-blue-300',
      'Lojas': 'bg-purple-100 text-purple-700 border-purple-300',
      'Prestadores de serviço': 'bg-green-100 text-green-700 border-green-300'
    };
    return colorMap[categoria] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  if (places.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Nenhum lugar encontrado com os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-3 p-4">
        {places.map((place, index) => (
          <button
            key={`${place.nome}-${index}`}
            onClick={() => onPlaceClick(place)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:shadow-md ${
              selectedPlace?.nome === place.nome && selectedPlace?.lat === place.lat
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                  {place.nome}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(place.categoria)}`}>
                    {place.categoria}
                  </span>
                  {place.subcategoria && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-300">
                      {place.subcategoria}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    📍 {place.regiao}
                  </p>
                  <p className="text-sm text-gray-700">
                    {place.avaliacao}
                  </p>
                  {place.cupom && (
                    <p className="text-sm text-green-600 font-medium">
                      🎟️ {place.cupom}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
