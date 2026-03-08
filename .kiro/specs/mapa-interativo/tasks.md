# Plano de Implementação: Mapa Interativo de Lugares

## Overview

Este plano implementa um sistema de mapa interativo em três fases principais:
1. Extensão de tipos e criação do script de conversão CSV → JSON
2. Implementação do componente PlacesMap com marcadores e filtros
3. Criação da página /mapa e integração final

## Tasks

- [x] 1. Configurar dependências e tipos base
  - Instalar dependências: `@googlemaps/js-api-loader`, `@googlemaps/markerclusterer`, `papaparse`, `@types/papaparse`
  - Adicionar variável de ambiente NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ao .env.example
  - Estender lib/types.ts com interface Place
  - _Requirements: 7.1_

- [ ] 2. Implementar script de conversão CSV para JSON
  - [x] 2.1 Criar estrutura base do script em scripts/convert-csv-to-json.ts
    - Implementar função readCSV() usando papaparse
    - Implementar função extractCoordinatesFromLink() para extrair lat/lng de URLs do Google Maps
    - Implementar função geocodeAddress() para fallback com Geocoding API
    - _Requirements: 1.1, 1.2_
  
  - [x] 2.2 Implementar lógica de processamento de múltiplos endereços
    - Implementar função processCSVRow() que detecta ENDEREÇO e ENDEREÇO 2
    - Criar lógica para gerar múltiplas entradas Place quando há 2 endereços
    - Adicionar sufixos aos nomes (ex: "Cafehaus - Centro", "Cafehaus - Humberto de Campos")
    - _Requirements: 1.3, 3.5_
  
  - [x] 2.3 Implementar função principal de conversão e tratamento de erros
    - Implementar convertCSVToJSON() que orquestra todo o processo
    - Adicionar tratamento de erros com logging detalhado
    - Garantir que erros em uma entrada não interrompam o processamento
    - Salvar resultado em /public/data/places.json
    - _Requirements: 1.4, 1.5, 1.6_
  
  - [ ]* 2.4 Escrever testes de propriedade para conversão CSV
    - **Property 1: CSV Parsing Completeness**
    - **Validates: Requirements 1.1**
  
  - [ ]* 2.5 Escrever testes de propriedade para múltiplos endereços
    - **Property 2: Multiple Address Expansion**
    - **Validates: Requirements 1.3**
  
  - [ ]* 2.6 Escrever testes de propriedade para schema JSON
    - **Property 3: JSON Schema Compliance**
    - **Validates: Requirements 1.4**
  
  - [ ]* 2.7 Escrever testes de propriedade para resiliência a erros
    - **Property 4: Error Resilience in Conversion**
    - **Validates: Requirements 1.6**
  
  - [ ]* 2.8 Escrever testes unitários para casos específicos
    - Testar extração de coordenadas de links conhecidos
    - Testar conversão de linhas específicas do CSV real
    - Testar tratamento de erros (API falha, link inválido)
    - _Requirements: 1.1, 1.2, 1.6_

- [x] 3. Checkpoint - Executar script e validar JSON gerado
  - Executar script de conversão: `ts-node scripts/convert-csv-to-json.ts`
  - Verificar que /public/data/places.json foi criado
  - Validar estrutura do JSON manualmente
  - Perguntar ao usuário se há questões

- [ ] 4. Implementar componente PlacesMap base
  - [x] 4.1 Criar estrutura do componente em components/PlacesMap.tsx
    - Adicionar diretiva "use client"
    - Definir interface PlacesMapProps
    - Criar estado para places, filteredPlaces, map, markers, markerClusterer, activeInfoWindow
    - Criar ref para container do mapa
    - _Requirements: 2.1, 2.3_
  
  - [x] 4.2 Implementar carregamento de dados e inicialização do mapa
    - Implementar useEffect para carregar /data/places.json
    - Implementar useEffect para inicializar Google Maps com Loader
    - Configurar centro em {lat: -26.918, lng: -49.065} e zoom inicial
    - Adicionar tratamento de erros para API key ausente
    - _Requirements: 2.2, 2.4, 2.5, 7.1, 7.2, 7.4_
  
  - [x] 4.3 Implementar função de mapeamento de cores por categoria
    - Criar função getMarkerColor() com mapeamento de categorias para cores
    - Restaurantes → #EF4444 (vermelho)
    - Cafés e docerias → #92400E (marrom)
    - Lazer → #3B82F6 (azul)
    - Lojas → #9333EA (roxo)
    - Prestadores de serviço → #10B981 (verde)
    - _Requirements: 3.2_
  
  - [ ]* 4.4 Escrever teste de propriedade para mapeamento de cores
    - **Property 6: Category Color Mapping**
    - **Validates: Requirements 3.2**

- [ ] 5. Implementar marcadores e InfoWindows
  - [x] 5.1 Criar função createMarker()
    - Implementar criação de google.maps.Marker com posição e ícone colorido
    - Adicionar event listener para clique que chama showInfoWindow()
    - _Requirements: 3.1, 3.2_
  
  - [x] 5.2 Criar função showInfoWindow()
    - Implementar lógica para fechar InfoWindow anterior se existir
    - Gerar conteúdo HTML com nome, avaliação, cupom (condicional), e link
    - Criar e abrir nova InfoWindow
    - Atualizar estado activeInfoWindow
    - _Requirements: 3.3, 3.4_
  
  - [x] 5.3 Implementar useEffect para criar/atualizar marcadores
    - Limpar marcadores existentes quando filteredPlaces muda
    - Criar novos marcadores para cada lugar em filteredPlaces
    - Inicializar MarkerClusterer com novos marcadores
    - _Requirements: 3.1, 5.1_
  
  - [ ]* 5.4 Escrever teste de propriedade para correspondência marker-place
    - **Property 5: Marker-Place Correspondence**
    - **Validates: Requirements 3.1**
  
  - [ ]* 5.5 Escrever teste de propriedade para conteúdo de InfoWindow
    - **Property 7: InfoWindow Content Completeness**
    - **Validates: Requirements 3.3**
  
  - [ ]* 5.6 Escrever teste de propriedade para InfoWindow única
    - **Property 8: Single InfoWindow Invariant**
    - **Validates: Requirements 3.4**
  
  - [ ]* 5.7 Escrever testes unitários para marcadores
    - Testar criação de marcador para lugar específico
    - Testar abertura/fechamento de InfoWindow
    - _Requirements: 3.1, 3.3, 3.4_

- [ ] 6. Implementar sistema de filtros no componente
  - [x] 6.1 Adicionar props para filtros iniciais
    - Atualizar PlacesMapProps para aceitar initialFilters
    - Criar estado selectedFilters inicializado com initialFilters
    - _Requirements: 4.1_
  
  - [x] 6.2 Implementar lógica de filtragem
    - Criar useEffect que aplica filtros quando selectedFilters ou places mudam
    - Implementar lógica AND para múltiplos filtros
    - Atualizar filteredPlaces com resultado
    - _Requirements: 4.2, 4.3_
  
  - [x] 6.3 Garantir preservação de estado do mapa durante filtragem
    - Verificar que centro e zoom não mudam ao aplicar filtros
    - _Requirements: 4.6_
  
  - [ ]* 6.4 Escrever teste de propriedade para aplicação de filtros
    - **Property 9: Filter Application Correctness**
    - **Validates: Requirements 4.2**
  
  - [ ]* 6.5 Escrever teste de propriedade para múltiplos filtros
    - **Property 10: Multiple Filter Intersection**
    - **Validates: Requirements 4.3**
  
  - [ ]* 6.6 Escrever teste de propriedade para preservação de estado do mapa
    - **Property 12: Map State Preservation During Filtering**
    - **Validates: Requirements 4.6**

- [ ] 7. Criar componente FilterControls
  - [x] 7.1 Implementar FilterControls em components/FilterControls.tsx
    - Criar interface FilterControlsProps
    - Implementar selects para categoria e região
    - Extrair valores únicos de categorias e regiões dos dados
    - Implementar botão "Mostrar todos" que reseta filtros
    - Adicionar estilos responsivos com scroll horizontal em mobile
    - _Requirements: 4.1, 4.4, 4.5_
  
  - [ ]* 7.2 Escrever teste de propriedade para reset de filtros
    - **Property 11: Filter Reset Completeness**
    - **Validates: Requirements 4.4**
  
  - [ ]* 7.3 Escrever testes unitários para controles de filtro
    - Testar renderização dos controles
    - Testar aplicação de filtros específicos
    - _Requirements: 4.1, 4.2_

- [ ] 8. Criar página /mapa
  - [x] 8.1 Criar estrutura da página em app/mapa/page.tsx
    - Adicionar diretiva "use client"
    - Criar estado para filtros
    - Implementar layout com título, FilterControls, e PlacesMap
    - Adicionar estilos com Tailwind CSS
    - Garantir altura mínima de 600px para o mapa
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 2.6_
  
  - [x] 8.2 Adicionar indicador de carregamento
    - Implementar estado de loading
    - Exibir spinner ou skeleton enquanto mapa carrega
    - _Requirements: 8.5_
  
  - [x] 8.3 Adicionar tratamento de erros na página
    - Implementar error boundary ou try-catch
    - Exibir mensagens de erro amigáveis
    - _Requirements: 7.2, 7.5_
  
  - [ ]* 8.4 Escrever testes de integração para página
    - Testar renderização completa da página
    - Testar fluxo de filtrar → visualizar marcadores
    - _Requirements: 6.1, 6.3_

- [ ] 9. Adicionar estilos e responsividade final
  - [x] 9.1 Refinar estilos do componente PlacesMap
    - Garantir que o container do mapa seja responsivo
    - Adicionar border-radius e shadow para melhor visual
    - Testar em diferentes tamanhos de tela
    - _Requirements: 2.7, 6.6_
  
  - [x] 9.2 Refinar estilos dos filtros
    - Garantir scroll horizontal funcional em mobile
    - Adicionar hover states nos botões
    - Melhorar espaçamento e alinhamento
    - _Requirements: 4.5_
  
  - [x] 9.3 Adicionar transições suaves
    - Adicionar transições CSS para mudanças de filtro
    - Adicionar feedback visual ao clicar em marcadores
    - _Requirements: 8.2, 8.3_

- [x] 10. Checkpoint final - Testar sistema completo
  - Executar todos os testes (unitários e de propriedade)
  - Testar manualmente em navegador desktop
  - Testar manualmente em navegador mobile (ou DevTools)
  - Verificar que todos os requisitos foram atendidos
  - Perguntar ao usuário se há questões ou ajustes necessários

- [ ] 11. Documentação e finalização
  - [x] 11.1 Adicionar README para o script de conversão
    - Documentar como executar o script
    - Documentar variáveis de ambiente necessárias
    - Adicionar exemplos de uso
    - _Requirements: 1.1, 7.1_
  
  - [x] 11.2 Adicionar comentários JSDoc nos componentes
    - Documentar props e funções principais
    - Adicionar exemplos de uso
    - _Requirements: 2.1, 6.1_
  
  - [x] 11.3 Atualizar .env.example
    - Adicionar NEXT_PUBLIC_GOOGLE_MAPS_API_KEY com comentário explicativo
    - _Requirements: 7.1_

## Notes

- Tasks marcadas com `*` são opcionais (testes) e podem ser puladas para MVP mais rápido
- Cada task referencia requisitos específicos para rastreabilidade
- Checkpoints garantem validação incremental
- Property tests validam propriedades universais de correção
- Unit tests validam exemplos específicos e casos extremos
- O script de conversão deve ser executado antes de testar o componente do mapa
- Recomenda-se obter uma API key do Google Maps antes de iniciar a implementação
