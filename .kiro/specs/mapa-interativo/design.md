# Design Document: Mapa Interativo de Lugares

## Overview

O sistema de mapa interativo consiste em três componentes principais:

1. **Script de Conversão CSV → JSON**: Processa o arquivo CSV, obtém coordenadas via Google Geocoding API, e gera um arquivo JSON estruturado
2. **Componente PlacesMap**: Renderiza o mapa do Google Maps com marcadores interativos e clusterização
3. **Página /mapa**: Interface do usuário com filtros e visualização do mapa

O sistema utiliza Next.js 14+ com App Router, TypeScript, e as APIs do Google Maps (JavaScript API e Geocoding API).

## Architecture

### Fluxo de Dados

```
CSV Source → Conversion Script → Places JSON → PlacesMap Component → User Interface
                ↓
         Geocoding API
```

### Estrutura de Arquivos

```
/
├── scripts/
│   └── convert-csv-to-json.ts          # Script de conversão
├── public/
│   └── data/
│       └── places.json                  # Dados processados
├── components/
│   └── PlacesMap.tsx                    # Componente do mapa
├── app/
│   └── mapa/
│       └── page.tsx                     # Página do mapa
└── lib/
    └── types.ts                         # Tipos TypeScript
```

## Components and Interfaces

### 1. Script de Conversão (convert-csv-to-json.ts)

**Responsabilidade**: Ler o CSV, processar dados, obter coordenadas, e gerar JSON.

**Funções principais**:

```typescript
// Lê e parseia o arquivo CSV
async function readCSV(filePath: string): Promise<CSVRow[]>

// Extrai coordenadas de um link do Google Maps
function extractCoordinatesFromLink(mapsLink: string): {lat: number, lng: number} | null

// Obtém coordenadas via Geocoding API (fallback)
async function geocodeAddress(address: string): Promise<{lat: number, lng: number} | null>

// Processa uma linha do CSV e retorna um ou mais lugares
async function processCSVRow(row: CSVRow): Promise<Place[]>

// Função principal que orquestra a conversão
async function convertCSVToJSON(): Promise<void>
```

**Lógica de Processamento**:

1. Ler CSV linha por linha
2. Para cada linha:
   - Extrair campos: CLASSIFICAÇAO, SUBCLASSIFICACAO, LUGAR, REGIÃO, AVALIAÇAO DA ISA, CUPOM DESCONTO
   - Processar ENDEREÇO (obrigatório)
   - Se ENDEREÇO 2 existe, criar entrada adicional
3. Para cada endereço:
   - Tentar extrair coordenadas do link do Google Maps
   - Se falhar, usar Geocoding API
   - Se ambos falharem, registrar erro e pular
4. Gerar array de lugares e salvar em JSON

**Tratamento de Múltiplos Endereços**:

```typescript
// Exemplo: Cafehaus tem 2 endereços
// CSV: ENDEREÇO = "https://maps.app.goo.gl/RSMYnWYu6sjhLFCG7"
//      ENDEREÇO 2 = "https://maps.app.goo.gl/koVi61F11PaQPHf69"
// 
// Resultado JSON:
// [
//   {
//     nome: "Cafehaus - Humberto de Campos",
//     categoria: "Cafés e docerias",
//     ...
//   },
//   {
//     nome: "Cafehaus - Centro",
//     categoria: "Cafés e docerias",
//     ...
//   }
// ]
```

### 2. Componente PlacesMap

**Responsabilidade**: Renderizar mapa, marcadores, InfoWindows, e gerenciar interações.

**Interface**:

```typescript
interface PlacesMapProps {
  initialFilters?: {
    categoria?: string;
    subcategoria?: string;
    regiao?: string;
  };
}

export default function PlacesMap({ initialFilters }: PlacesMapProps)
```

**Estado Interno**:

```typescript
const [places, setPlaces] = useState<Place[]>([]);
const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
const [selectedFilters, setSelectedFilters] = useState({
  categoria: '',
  subcategoria: '',
  regiao: ''
});
const [map, setMap] = useState<google.maps.Map | null>(null);
const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
const [markerClusterer, setMarkerClusterer] = useState<MarkerClusterer | null>(null);
const [activeInfoWindow, setActiveInfoWindow] = useState<google.maps.InfoWindow | null>(null);
```

**Hooks e Efeitos**:

```typescript
// Carregar dados do JSON
useEffect(() => {
  fetch('/data/places.json')
    .then(res => res.json())
    .then(data => setPlaces(data));
}, []);

// Inicializar mapa
useEffect(() => {
  if (!map) {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });
    
    loader.load().then(() => {
      const mapInstance = new google.maps.Map(mapRef.current!, {
        center: { lat: -26.918, lng: -49.065 },
        zoom: 10,
      });
      setMap(mapInstance);
    });
  }
}, [map]);

// Aplicar filtros
useEffect(() => {
  const filtered = places.filter(place => {
    if (selectedFilters.categoria && place.categoria !== selectedFilters.categoria) return false;
    if (selectedFilters.subcategoria && place.subcategoria !== selectedFilters.subcategoria) return false;
    if (selectedFilters.regiao && place.regiao !== selectedFilters.regiao) return false;
    return true;
  });
  setFilteredPlaces(filtered);
}, [places, selectedFilters]);

// Atualizar marcadores quando filtros mudam
useEffect(() => {
  if (!map) return;
  
  // Limpar marcadores existentes
  markers.forEach(marker => marker.setMap(null));
  if (markerClusterer) markerClusterer.clearMarkers();
  
  // Criar novos marcadores
  const newMarkers = filteredPlaces.map(place => createMarker(place, map));
  setMarkers(newMarkers);
  
  // Criar novo clusterer
  const clusterer = new MarkerClusterer({ map, markers: newMarkers });
  setMarkerClusterer(clusterer);
}, [filteredPlaces, map]);
```

**Funções Auxiliares**:

```typescript
// Retorna cor do marcador baseado na categoria
function getMarkerColor(categoria: string): string {
  const colorMap: Record<string, string> = {
    'Restaurantes': '#EF4444',        // vermelho
    'Cafés e docerias': '#92400E',    // marrom
    'Lazer': '#3B82F6',               // azul
    'Lojas': '#9333EA',               // roxo
    'Prestadores de serviço': '#10B981' // verde
  };
  return colorMap[categoria] || '#6B7280'; // cinza padrão
}

// Cria um marcador para um lugar
function createMarker(place: Place, map: google.maps.Map): google.maps.Marker {
  const marker = new google.maps.Marker({
    position: { lat: place.lat, lng: place.lng },
    map: map,
    title: place.nome,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: getMarkerColor(place.categoria),
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
      scale: 8
    }
  });
  
  marker.addListener('click', () => {
    showInfoWindow(place, marker);
  });
  
  return marker;
}

// Exibe InfoWindow para um lugar
function showInfoWindow(place: Place, marker: google.maps.Marker): void {
  // Fechar InfoWindow anterior
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
}
```

### 3. Página /mapa

**Responsabilidade**: Layout da página, controles de filtro, e integração do componente PlacesMap.

**Estrutura**:

```typescript
'use client';

import { useState } from 'react';
import PlacesMap from '@/components/PlacesMap';

export default function MapaPage() {
  const [filters, setFilters] = useState({
    categoria: '',
    subcategoria: '',
    regiao: ''
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mapa de Lugares Visitados</h1>
        
        {/* Filtros */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <FilterControls 
            filters={filters} 
            onFilterChange={setFilters} 
          />
        </div>
        
        {/* Mapa */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <PlacesMap initialFilters={filters} />
        </div>
      </div>
    </div>
  );
}
```

**Componente FilterControls**:

```typescript
interface FilterControlsProps {
  filters: {
    categoria: string;
    subcategoria: string;
    regiao: string;
  };
  onFilterChange: (filters: any) => void;
}

function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
  const categorias = ['Restaurantes', 'Cafés e docerias', 'Lazer', 'Lojas', 'Prestadores de serviço'];
  const regioes = ['Blumenau-SC', 'Jaraguá-SC', 'Pomerode-SC', 'Goiania-GO'];
  
  return (
    <div className="flex flex-wrap gap-4">
      {/* Categoria */}
      <select 
        value={filters.categoria}
        onChange={(e) => onFilterChange({ ...filters, categoria: e.target.value })}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">Todas as categorias</option>
        {categorias.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      {/* Região */}
      <select 
        value={filters.regiao}
        onChange={(e) => onFilterChange({ ...filters, regiao: e.target.value })}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">Todas as regiões</option>
        {regioes.map(reg => (
          <option key={reg} value={reg}>{reg}</option>
        ))}
      </select>
      
      {/* Botão Resetar */}
      <button
        onClick={() => onFilterChange({ categoria: '', subcategoria: '', regiao: '' })}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        Mostrar todos
      </button>
    </div>
  );
}
```

## Data Models

### Place (Lugar no Mapa)

```typescript
interface Place {
  nome: string;              // Nome do lugar (ex: "Cafehaus - Centro")
  categoria: string;         // Categoria principal (ex: "Cafés e docerias")
  subcategoria: string;      // Subcategoria (ex: "Cafeteria")
  regiao: string;            // Região (ex: "Blumenau-SC")
  avaliacao: string;         // Avaliação da Isabel
  cupom?: string;            // Cupom de desconto (opcional)
  mapsLink: string;          // Link do Google Maps
  lat: number;               // Latitude
  lng: number;               // Longitude
}
```

### CSVRow (Linha do CSV)

```typescript
interface CSVRow {
  CLASSIFICACAO: string;
  SUBCLASSIFICACAO: string;
  LUGAR: string;
  LINK: string;
  REGIAO: string;
  'AVALIAÇAO DA ISA': string;
  'CUPOM DESCONTO': string;
  ENDERECO: string;
  'ENDEREÇO 2': string;
}
```

### MarkerData (Dados do Marcador)

```typescript
interface MarkerData {
  marker: google.maps.Marker;
  place: Place;
  infoWindow: google.maps.InfoWindow;
}
```


## Correctness Properties

*Uma propriedade é uma característica ou comportamento que deve ser verdadeiro em todas as execuções válidas de um sistema - essencialmente, uma declaração formal sobre o que o sistema deve fazer. As propriedades servem como ponte entre especificações legíveis por humanos e garantias de correção verificáveis por máquina.*

### Property 1: CSV Parsing Completeness

*Para qualquer* arquivo CSV válido com N linhas de dados, o script de conversão deve extrair exatamente N conjuntos de campos, onde cada conjunto contém todos os campos obrigatórios (CLASSIFICACAO, SUBCLASSIFICACAO, LUGAR, REGIÃO, AVALIAÇAO DA ISA, ENDERECO).

**Validates: Requirements 1.1**

### Property 2: Multiple Address Expansion

*Para qualquer* lugar no CSV que possui tanto ENDEREÇO quanto ENDEREÇO 2 preenchidos, o JSON resultante deve conter exatamente 2 entradas para esse lugar, cada uma com coordenadas distintas e nomes diferenciados (ex: "Nome - Local 1", "Nome - Local 2").

**Validates: Requirements 1.3**

### Property 3: JSON Schema Compliance

*Para qualquer* entrada no Places_JSON gerado, o objeto deve conter todos os campos obrigatórios: nome (string), categoria (string), subcategoria (string), regiao (string), avaliacao (string), mapsLink (string), lat (number), lng (number), e opcionalmente cupom (string).

**Validates: Requirements 1.4**

### Property 4: Error Resilience in Conversion

*Para qualquer* conjunto de dados CSV onde uma entrada específica causa erro (ex: coordenadas inválidas), o script deve processar com sucesso todas as outras entradas válidas e o JSON resultante deve conter N-1 lugares (onde N é o total de entradas válidas).

**Validates: Requirements 1.6**

### Property 5: Marker-Place Correspondence

*Para qualquer* conjunto de lugares carregados do Places_JSON, o número de marcadores criados no mapa deve ser exatamente igual ao número de lugares no array, mantendo correspondência 1:1.

**Validates: Requirements 3.1**

### Property 6: Category Color Mapping

*Para qualquer* marcador criado, se a categoria do lugar for uma das categorias definidas (Restaurantes, Cafés e docerias, Lazer, Lojas, Prestadores de serviço), então o marcador deve ter a cor correspondente definida no mapeamento (vermelho, marrom, azul, roxo, verde respectivamente).

**Validates: Requirements 3.2**

### Property 7: InfoWindow Content Completeness

*Para qualquer* lugar exibido em uma InfoWindow, o conteúdo HTML deve conter o nome do lugar, a avaliação, e o link para Google Maps; e se o lugar possui cupom, o conteúdo deve também incluir a informação do cupom.

**Validates: Requirements 3.3**

### Property 8: Single InfoWindow Invariant

*Para qualquer* sequência de cliques em marcadores, deve haver no máximo uma InfoWindow aberta por vez - quando uma nova InfoWindow é aberta, qualquer InfoWindow previamente aberta deve ser fechada.

**Validates: Requirements 3.4**

### Property 9: Filter Application Correctness

*Para qualquer* filtro aplicado (categoria, subcategoria, ou região), todos os marcadores visíveis no mapa devem satisfazer o critério do filtro, e todos os lugares que satisfazem o critério devem ter marcadores visíveis.

**Validates: Requirements 4.2**

### Property 10: Multiple Filter Intersection

*Para qualquer* combinação de múltiplos filtros aplicados simultaneamente, o conjunto de marcadores visíveis deve ser exatamente a interseção dos conjuntos que satisfazem cada filtro individualmente (lógica AND).

**Validates: Requirements 4.3**

### Property 11: Filter Reset Completeness

*Para qualquer* estado de filtros aplicados, após clicar no botão "Mostrar todos", todos os marcadores originalmente carregados devem estar visíveis novamente, e todos os controles de filtro devem estar em seu estado padrão (sem seleção).

**Validates: Requirements 4.4**

### Property 12: Map State Preservation During Filtering

*Para qualquer* posição e nível de zoom do mapa, após aplicar ou remover filtros, o centro e o zoom do mapa devem permanecer inalterados.

**Validates: Requirements 4.6**

## Error Handling

### Conversão CSV

**Erros de Geocoding**:
- Se a extração de coordenadas do link falhar, tentar Geocoding API
- Se Geocoding API falhar, registrar erro com detalhes do lugar e continuar
- Não interromper o processamento completo por falha em um lugar

**Erros de Leitura de Arquivo**:
- Se o CSV não existir, lançar erro claro indicando o caminho esperado
- Se o CSV estiver malformado, registrar linha problemática e continuar

**Erros de API**:
- Se a API key do Google estiver inválida, registrar erro e continuar (lugares sem coordenadas serão pulados)
- Implementar retry com backoff exponencial para falhas temporárias de rede

### Componente PlacesMap

**Erros de Carregamento de Dados**:
- Se Places_JSON não existir, exibir mensagem: "Dados não encontrados. Execute o script de conversão primeiro."
- Se Places_JSON estiver malformado, exibir mensagem: "Erro ao carregar dados do mapa."

**Erros de API do Google Maps**:
- Se NEXT_PUBLIC_GOOGLE_MAPS_API_KEY não estiver definida, exibir: "Chave da API do Google Maps não configurada."
- Se houver erro de autenticação, exibir: "Erro de autenticação com Google Maps API. Verifique sua chave."
- Se houver erro de rede, exibir: "Erro ao carregar o mapa. Verifique sua conexão."

**Erros de Renderização**:
- Se o container do mapa não existir, registrar erro no console
- Se houver erro ao criar marcadores, registrar erro mas continuar com outros marcadores

### Página /mapa

**Erros de Navegação**:
- Se a página não carregar, exibir página de erro 404 padrão do Next.js

**Erros de Estado**:
- Se houver erro ao aplicar filtros, resetar para estado inicial (todos visíveis)

## Testing Strategy

### Dual Testing Approach

O sistema utilizará tanto testes unitários quanto testes baseados em propriedades (property-based testing) para garantir cobertura abrangente:

**Unit Tests**: Focarão em exemplos específicos, casos extremos e condições de erro:
- Conversão de linhas específicas do CSV
- Criação de marcadores para lugares específicos
- Aplicação de filtros específicos
- Tratamento de erros conhecidos

**Property Tests**: Validarão propriedades universais através de múltiplas execuções com dados gerados aleatoriamente:
- Todas as 12 propriedades de correção definidas acima
- Mínimo de 100 iterações por teste de propriedade
- Cada teste deve referenciar sua propriedade no design

### Property-Based Testing Configuration

**Biblioteca**: Utilizaremos **fast-check** para TypeScript/JavaScript, que é a biblioteca padrão para property-based testing no ecossistema Node.js.

**Configuração**:
```typescript
import fc from 'fast-check';

// Exemplo de teste de propriedade
describe('Property 2: Multiple Address Expansion', () => {
  it('should create 2 entries for places with 2 addresses', () => {
    fc.assert(
      fc.property(
        fc.record({
          LUGAR: fc.string(),
          CLASSIFICACAO: fc.string(),
          SUBCLASSIFICACAO: fc.string(),
          REGIAO: fc.string(),
          'AVALIAÇAO DA ISA': fc.string(),
          ENDERECO: fc.webUrl(),
          'ENDEREÇO 2': fc.webUrl()
        }),
        (csvRow) => {
          const result = processCSVRow(csvRow);
          return result.length === 2 && 
                 result[0].nome !== result[1].nome;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Tag Format**: Cada teste de propriedade deve incluir um comentário referenciando o design:
```typescript
// Feature: mapa-interativo, Property 2: Multiple Address Expansion
```

### Test Coverage

**Script de Conversão**:
- Unit: Testar conversão de linhas específicas do CSV real
- Unit: Testar extração de coordenadas de links conhecidos
- Unit: Testar tratamento de erros (API falha, link inválido)
- Property: Validar Properties 1, 2, 3, 4

**Componente PlacesMap**:
- Unit: Testar criação de marcador para lugar específico
- Unit: Testar mapeamento de cores para categorias conhecidas
- Unit: Testar abertura/fechamento de InfoWindow
- Property: Validar Properties 5, 6, 7, 8, 9, 10, 11, 12

**Página /mapa**:
- Unit: Testar renderização da página
- Unit: Testar controles de filtro
- Integration: Testar fluxo completo de filtrar → visualizar

### Mocking Strategy

**Google APIs**:
- Mockar `@googlemaps/js-api-loader` para testes unitários
- Mockar Geocoding API responses para testes de conversão
- Usar fixtures para respostas de API conhecidas

**File System**:
- Mockar `fs` para testes de leitura/escrita de arquivos
- Usar arquivos temporários para testes de integração

**Fetch API**:
- Mockar `fetch` para testes de carregamento do Places_JSON
- Usar `msw` (Mock Service Worker) para testes de integração
