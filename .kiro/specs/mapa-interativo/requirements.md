# Documento de Requisitos: Mapa Interativo de Lugares

## Introdução

Este documento especifica os requisitos para implementar um mapa interativo que exibe lugares visitados e avaliados pela Isabel. O sistema deve converter dados de um arquivo CSV em um formato estruturado, exibir os lugares em um mapa do Google Maps com marcadores interativos, e permitir filtragem por categoria, subcategoria e região.

## Glossário

- **Sistema**: O conjunto completo de componentes que implementam o mapa interativo
- **CSV_Source**: O arquivo "REVIEWS POR ISABEL - GUIA.csv" contendo dados dos lugares
- **Places_JSON**: Arquivo JSON estruturado em /public/data/places.json
- **Geocoding_API**: Google Geocoding API para conversão de endereços em coordenadas
- **Maps_API**: Google Maps JavaScript API para renderização do mapa
- **Marker**: Marcador visual no mapa representando um lugar
- **InfoWindow**: Janela de informações exibida ao clicar em um marcador
- **Cluster**: Agrupamento visual de múltiplos marcadores próximos
- **Filter**: Mecanismo de filtragem por categoria, subcategoria ou região

## Requisitos

### Requisito 1: Conversão de Dados CSV para JSON

**User Story:** Como desenvolvedor, eu quero converter o arquivo CSV em um formato JSON estruturado, para que os dados possam ser facilmente consumidos pelo componente de mapa.

#### Acceptance Criteria

1. WHEN o script de conversão é executado, THE Sistema SHALL ler o arquivo CSV_Source e extrair todos os campos
2. WHEN um lugar possui link do Google Maps, THE Sistema SHALL usar a Geocoding_API para obter as coordenadas (latitude e longitude)
3. WHEN um lugar possui ENDEREÇO e ENDEREÇO 2, THE Sistema SHALL criar entradas separadas no JSON para cada endereço
4. WHEN os dados são processados, THE Sistema SHALL gerar um arquivo Places_JSON com a estrutura: {nome, categoria, subcategoria, regiao, avaliacao, cupom?, mapsLink, lat, lng}
5. THE Sistema SHALL salvar o Places_JSON em /public/data/places.json
6. WHEN a conversão falha para um lugar específico, THE Sistema SHALL registrar o erro e continuar processando os demais lugares

### Requisito 2: Componente de Mapa Interativo

**User Story:** Como usuário, eu quero visualizar um mapa interativo com todos os lugares visitados, para que eu possa explorar geograficamente as recomendações.

#### Acceptance Criteria

1. THE Sistema SHALL criar um componente PlacesMap.tsx em /components/
2. THE Sistema SHALL usar a Maps_API via @googlemaps/js-api-loader para renderizar o mapa
3. THE Sistema SHALL configurar o componente como client-side apenas ("use client")
4. WHEN o mapa é inicializado, THE Sistema SHALL centralizar em Santa Catarina com coordenadas {lat: -26.918, lng: -49.065}
5. WHEN o componente é montado, THE Sistema SHALL carregar os dados do arquivo Places_JSON
6. THE Sistema SHALL exibir o mapa com altura mínima de 600px
7. THE Sistema SHALL garantir que o mapa seja responsivo em dispositivos móveis e desktop

### Requisito 3: Marcadores e InfoWindows

**User Story:** Como usuário, eu quero ver marcadores coloridos no mapa para cada lugar, para que eu possa identificar rapidamente o tipo de estabelecimento.

#### Acceptance Criteria

1. WHEN os dados são carregados, THE Sistema SHALL criar um Marker para cada lugar no Places_JSON
2. WHEN um Marker é criado, THE Sistema SHALL aplicar cor baseada na categoria:
   - Restaurantes → vermelho
   - Cafés e docerias → marrom
   - Lazer → azul
   - Lojas → roxo
   - Prestadores de serviço → verde
3. WHEN um usuário clica em um Marker, THE Sistema SHALL exibir uma InfoWindow contendo: nome do lugar, avaliação, cupom (se existir), e link para Google Maps
4. WHEN uma InfoWindow está aberta e o usuário clica em outro Marker, THE Sistema SHALL fechar a InfoWindow anterior e abrir a nova
5. WHEN um lugar possui múltiplos endereços, THE Sistema SHALL criar múltiplos Markers com indicação da unidade (ex: "Cafehaus - Centro", "Cafehaus - Humberto de Campos")

### Requisito 4: Sistema de Filtros

**User Story:** Como usuário, eu quero filtrar os lugares por categoria, subcategoria e região, para que eu possa encontrar rapidamente o tipo de lugar que procuro.

#### Acceptance Criteria

1. THE Sistema SHALL exibir controles de filtro para: categoria, subcategoria e região
2. WHEN um usuário seleciona um filtro, THE Sistema SHALL atualizar os Markers visíveis sem recarregar a página
3. WHEN múltiplos filtros são aplicados, THE Sistema SHALL exibir apenas lugares que atendem a todos os critérios
4. THE Sistema SHALL fornecer um botão "Mostrar todos" para resetar todos os filtros
5. WHEN os filtros são exibidos em dispositivos móveis, THE Sistema SHALL permitir scroll horizontal para acessar todas as opções
6. WHEN um filtro é aplicado, THE Sistema SHALL manter o centro e zoom do mapa

### Requisito 5: Clusterização de Marcadores

**User Story:** Como usuário, eu quero que marcadores próximos sejam agrupados visualmente, para que o mapa não fique poluído quando há muitos lugares em uma área.

#### Acceptance Criteria

1. THE Sistema SHALL usar @googlemaps/markerclusterer para agrupar Markers próximos
2. WHEN múltiplos Markers estão próximos, THE Sistema SHALL exibir um Cluster com o número de lugares
3. WHEN um usuário clica em um Cluster, THE Sistema SHALL aumentar o zoom e expandir os Markers individuais
4. WHEN o zoom aumenta, THE Sistema SHALL automaticamente desagrupar Clusters conforme apropriado

### Requisito 6: Página do Mapa

**User Story:** Como usuário, eu quero acessar uma página dedicada ao mapa, para que eu possa explorar todos os lugares em uma interface focada.

#### Acceptance Criteria

1. THE Sistema SHALL criar uma rota /mapa
2. THE Sistema SHALL criar a página em /app/mapa/page.tsx
3. WHEN a página é carregada, THE Sistema SHALL exibir o título "Mapa de Lugares Visitados"
4. THE Sistema SHALL posicionar os filtros no topo da página
5. THE Sistema SHALL exibir o mapa em largura total (full-width) abaixo dos filtros
6. THE Sistema SHALL garantir que o layout seja responsivo em dispositivos móveis

### Requisito 7: Integração com Google APIs

**User Story:** Como desenvolvedor, eu quero integrar as APIs do Google Maps de forma segura, para que o sistema funcione corretamente em produção.

#### Acceptance Criteria

1. THE Sistema SHALL usar a variável de ambiente NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para autenticação
2. WHEN a API key não está configurada, THE Sistema SHALL exibir uma mensagem de erro clara
3. THE Sistema SHALL fazer requisições à Geocoding_API durante a conversão do CSV
4. THE Sistema SHALL carregar a Maps_API apenas no lado do cliente (client-side)
5. WHEN há erro de autenticação da API, THE Sistema SHALL exibir mensagem de erro ao usuário

### Requisito 8: Performance e Experiência do Usuário

**User Story:** Como usuário, eu quero que o mapa carregue rapidamente e responda suavemente às interações, para que eu tenha uma experiência agradável.

#### Acceptance Criteria

1. THE Sistema SHALL evitar Server-Side Rendering (SSR) no componente do mapa
2. WHEN filtros são aplicados, THE Sistema SHALL atualizar os Markers com transições suaves
3. WHEN um usuário clica em um Marker, THE Sistema SHALL fornecer feedback visual imediato
4. THE Sistema SHALL carregar o Places_JSON de forma assíncrona sem bloquear a renderização inicial
5. WHEN o mapa está carregando, THE Sistema SHALL exibir um indicador de carregamento
