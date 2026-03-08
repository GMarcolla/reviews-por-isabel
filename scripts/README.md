# Script de Conversão CSV para JSON

Este script converte o arquivo CSV "REVIEWS POR ISABEL - GUIA.csv" em um arquivo JSON estruturado para uso no mapa interativo.

## Pré-requisitos

1. **API Key do Google Maps**: Você precisa de uma chave de API do Google Maps com acesso à Geocoding API.

2. **Arquivo .env.local**: Crie um arquivo `.env.local` na raiz do projeto com a seguinte variável:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua-chave-api-aqui
```

## Como Executar

Execute o seguinte comando na raiz do projeto:

```bash
npm run convert-csv
```

## O que o Script Faz

1. **Lê o arquivo CSV**: Parseia o arquivo "REVIEWS POR ISABEL - GUIA.csv"
2. **Processa cada linha**: Para cada lugar no CSV:
   - Extrai informações: nome, categoria, subcategoria, região, avaliação, cupom
   - Processa endereços (ENDEREÇO e ENDEREÇO 2 se existir)
   - Obtém coordenadas geográficas (latitude e longitude)
3. **Obtém Coordenadas**: 
   - Primeiro tenta extrair coordenadas diretamente do link do Google Maps
   - Se falhar, usa a Google Geocoding API como fallback
4. **Cria Múltiplas Entradas**: Se um lugar tem 2 endereços, cria 2 entradas separadas
5. **Tratamento de Erros**: Continua processando mesmo se uma entrada falhar
6. **Salva JSON**: Gera o arquivo `/public/data/places.json`

## Estrutura do JSON Gerado

```json
[
  {
    "nome": "Cafehaus - Humberto de Campos",
    "categoria": "Cafés e docerias",
    "subcategoria": "Cafeteria",
    "regiao": "Blumenau-SC",
    "avaliacao": "Zero defeitos, sou apaixonada...",
    "cupom": "5% OFF",
    "mapsLink": "https://maps.app.goo.gl/...",
    "lat": -26.9187,
    "lng": -49.0659
  }
]
```

## Logging

O script fornece logging detalhado:
- ✅ Sucessos
- ⚠️ Avisos
- ❌ Erros
- 📊 Resumo final com estatísticas

## Tratamento de Erros

- **Erro em uma entrada**: O script registra o erro e continua processando as demais
- **Erro fatal**: O script exibe mensagem de erro e encerra com código de saída 1
- **API Key não configurada**: Aviso é exibido, mas o script continua (lugares sem coordenadas são pulados)

## Troubleshooting

### Nenhum lugar foi processado

- Verifique se a API key está configurada corretamente no `.env.local`
- Verifique se o arquivo CSV existe na raiz do projeto
- Verifique os logs para identificar erros específicos

### Alguns lugares não foram processados

- Links encurtados do Google Maps podem precisar da Geocoding API
- Endereços inválidos (ex: "Somente delivery") não geram coordenadas
- Verifique os logs para ver quais lugares falharam e por quê
