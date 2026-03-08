'use client';

import { useState, useEffect, useRef } from 'react';
import { Place } from '@/lib/types';

/**
 * Props para o componente PlacesMap
 */
interface PlacesMapProps {
  initialFilters?: {
    categoria?: string;
    subcategoria?: string;
    regiao?: string;
  };
  onPlacesChange?: (places: Place[]) => void;
  focusedPlace?: Place | null;
}

/**
 * Componente de mapa interativo que exibe lugares visitados
 * com marcadores coloridos, InfoWindows e sistema de filtros
 * 
 * @param initialFilters - Filtros iniciais para aplicar ao carregar o mapa
 */
export default function PlacesMap({ initialFilters, onPlacesChange, focusedPlace }: PlacesMapProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    categoria: initialFilters?.categoria || '',
    subcategoria: initialFilters?.subcategoria || '',
    regiao: initialFilters?.regiao || ''
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [activeInfoWindow, setActiveInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingMap, setLoadingMap] = useState(true);

  // Carregar dados do JSON
  useEffect(() => {
    fetch('/data/places.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Dados não encontrados. Execute o script de conversão primeiro.');
        }
        return res.json();
      })
      .then((data: Place[]) => {
        setPlaces(data);
        setFilteredPlaces(data);
        setLoadingData(false);
      })
      .catch(err => {
        console.error('Erro ao carregar dados:', err);
        setError(err.message || 'Erro ao carregar dados do mapa.');
        setLoadingData(false);
      });
  }, []);

  // Aplicar filtros
  useEffect(() => {
    const filtered = places.filter(place => {
      if (selectedFilters.categoria && place.categoria !== selectedFilters.categoria) {
        return false;
      }
      if (selectedFilters.subcategoria && place.subcategoria !== selectedFilters.subcategoria) {
        return false;
      }
      if (selectedFilters.regiao && place.regiao !== selectedFilters.regiao) {
        return false;
      }
      return true;
    });
    
    setFilteredPlaces(filtered);
    
    // Notificar componente pai sobre mudanças nos lugares filtrados
    if (onPlacesChange) {
      onPlacesChange(filtered);
    }
  }, [places, selectedFilters, onPlacesChange]);

  // Sincronizar filtros externos
  useEffect(() => {
    if (initialFilters) {
      setSelectedFilters({
        categoria: initialFilters.categoria || '',
        subcategoria: initialFilters.subcategoria || '',
        regiao: initialFilters.regiao || ''
      });
    }
  }, [initialFilters]);

  // Inicializar Google Maps
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    console.log('API Key presente:', !!apiKey);
    console.log('Map já existe:', !!map);
    console.log('Container existe:', !!mapContainerRef.current);
    
    if (!apiKey) {
      setError('Chave da API do Google Maps não configurada.');
      setLoadingMap(false);
      return;
    }

    if (map) {
      console.log('Mapa já foi criado, pulando inicialização');
      return;
    }

    if (!mapContainerRef.current) {
      console.log('Container ainda não está pronto');
      return;
    }

    console.log('Iniciando carregamento do Google Maps...');

    import('@googlemaps/js-api-loader').then(({ setOptions, importLibrary }) => {
      setOptions({
        key: apiKey,
        v: 'weekly',
      });

      console.log('Importando biblioteca maps...');

      importLibrary('maps')
        .then((mapsLibrary) => {
          console.log('Biblioteca maps carregada com sucesso');
          
          if (!mapContainerRef.current) {
            console.error('Container do mapa não encontrado');
            setLoadingMap(false);
            return;
          }

          const mapInstance = new mapsLibrary.Map(mapContainerRef.current, {
            center: { lat: -26.918, lng: -49.065 },
            zoom: 10,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'poi.business',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          console.log('Mapa criado com sucesso');
          setMap(mapInstance);
          setLoadingMap(false);
        })
        .catch((err: Error) => {
          console.error('Erro ao carregar Google Maps:', err);
          setError(`Erro ao carregar o mapa: ${err.message}. Verifique se a API está ativada no Google Cloud Console.`);
          setLoadingMap(false);
        });
    }).catch((err: Error) => {
      console.error('Erro ao importar Google Maps Loader:', err);
      setError('Erro ao carregar o mapa.');
      setLoadingMap(false);
    });
  }, [map]);

  /**
   * Retorna a cor do marcador baseado na categoria
   */
  const getMarkerColor = (categoria: string): string => {
    const colorMap: Record<string, string> = {
      'Restaurantes': '#EF4444',
      'Cafés e docerias': '#92400E',
      'Lazer': '#3B82F6',
      'Lojas': '#9333EA',
      'Prestadores de serviço': '#10B981'
    };
    return colorMap[categoria] || '#6B7280';
  };

  /**
   * Exibe InfoWindow para um lugar específico
   */
  const showInfoWindow = (place: Place, marker: google.maps.Marker): void => {
    if (activeInfoWindow) {
      activeInfoWindow.close();
    }

    const content = `
      <div style="padding: 12px; max-width: 250px;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${place.nome}</h3>
        <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">${place.avaliacao}</p>
        ${place.cupom ? `<p style="margin: 0 0 8px 0; font-size: 14px; color: #10B981; font-weight: 500;">🎟️ ${place.cupom}</p>` : ''}
        <a href="${place.mapsLink}" target="_blank" rel="noopener noreferrer" 
           style="color: #3B82F6; text-decoration: none; font-size: 14px;">
          Ver no Google Maps →
        </a>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: content
    });

    infoWindow.open(map, marker);
    setActiveInfoWindow(infoWindow);
  };

  /**
   * Cria um marcador para um lugar específico
   */
  const createMarker = (place: Place, mapInstance: google.maps.Map): google.maps.Marker => {
    const marker = new google.maps.Marker({
      position: { lat: place.lat, lng: place.lng },
      map: mapInstance,
      title: place.nome,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: getMarkerColor(place.categoria),
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
        scale: 10
      }
    });

    marker.addListener('click', () => {
      showInfoWindow(place, marker);
    });

    return marker;
  };

  // Criar/atualizar marcadores
  useEffect(() => {
    if (!map) return;

    // Limpar marcadores existentes
    markers.forEach(marker => marker.setMap(null));

    // Criar novos marcadores
    const newMarkers = filteredPlaces.map(place => createMarker(place, map));
    setMarkers(newMarkers);
  }, [filteredPlaces, map]);

  // Focar em um lugar específico quando selecionado
  useEffect(() => {
    if (!map || !focusedPlace) return;

    // Centralizar mapa no lugar
    map.panTo({ lat: focusedPlace.lat, lng: focusedPlace.lng });
    map.setZoom(16);

    // Encontrar o marcador correspondente e abrir InfoWindow
    const marker = markers.find(m => {
      const position = m.getPosition();
      return position && 
             position.lat() === focusedPlace.lat && 
             position.lng() === focusedPlace.lng;
    });

    if (marker) {
      showInfoWindow(focusedPlace, marker);
    }
  }, [focusedPlace, map, markers]);

  if (error) {
    return (
      <div className="w-full h-[600px] rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-red-600 font-semibold mb-2">Erro ao carregar o mapa</p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px]">
      {loadingMap && (
        <div className="absolute inset-0 rounded-lg bg-gray-100 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando mapa...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapContainerRef}
        className="w-full h-[600px] rounded-lg"
        style={{ minHeight: '600px' }}
      />
    </div>
  );
}
