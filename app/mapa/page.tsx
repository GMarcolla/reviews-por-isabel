'use client';

import { useState, useEffect } from 'react';
import PlacesMap from '@/components/PlacesMap';
import PlacesList from '@/components/PlacesList';
import FilterControls from '@/components/FilterControls';
import { Place } from '@/lib/types';

/**
 * Página do Mapa Interativo
 * Exibe um mapa com todos os lugares visitados e avaliados
 * Permite filtrar por categoria, subcategoria e região
 * Lista lateral sincronizada com o mapa
 */
export default function MapaPage() {
  const [filters, setFilters] = useState({
    categoria: '',
    subcategoria: '',
    regiao: ''
  });

  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [focusedPlace, setFocusedPlace] = useState<Place | null>(null);

  // Carregar dados para os filtros
  useEffect(() => {
    fetch('/data/places.json')
      .then(res => res.json())
      .then((data: Place[]) => {
        setPlaces(data);
        setFilteredPlaces(data);
      })
      .catch(err => console.error('Erro ao carregar dados para filtros:', err));
  }, []);

  /**
   * Handler para quando um lugar é clicado na lista
   */
  const handlePlaceClick = (place: Place) => {
    setFocusedPlace(place);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Título */}
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Mapa de Lugares Visitados
        </h1>

        {/* Filtros */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <FilterControls 
            filters={filters} 
            onFilterChange={setFilters}
            places={places}
          />
        </div>

        {/* Layout: Lista + Mapa */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Lugares */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">
                  Lugares ({filteredPlaces.length})
                </h2>
              </div>
              <div className="h-[600px]">
                <PlacesList 
                  places={filteredPlaces}
                  onPlaceClick={handlePlaceClick}
                  selectedPlace={focusedPlace}
                />
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <PlacesMap 
                initialFilters={filters}
                onPlacesChange={setFilteredPlaces}
                focusedPlace={focusedPlace}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
