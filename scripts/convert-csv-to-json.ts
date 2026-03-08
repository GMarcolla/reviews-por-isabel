import Papa from 'papaparse';
import * as fs from 'fs';
import * as path from 'path';
import { Place } from '../lib/types';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente do .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Interface para as linhas do CSV
interface CSVRow {
  CLASSIFICAÇAO: string;
  SUBCLASSIFICACAO: string;
  LUGAR: string;
  LINK: string;
  REGIÃO: string;
  'AVALIAÇAO DA ISA': string;
  'CUPOM DESCONTO': string;
  ENDEREÇO: string;
  'ENDEREÇO 2': string;
}

/**
 * Lê e parseia o arquivo CSV usando papaparse
 * @param filePath - Caminho para o arquivo CSV
 * @returns Promise com array de linhas do CSV
 */
async function readCSV(filePath: string): Promise<CSVRow[]> {
  return new Promise((resolve, reject) => {
    const csvFilePath = path.resolve(process.cwd(), filePath);
    
    if (!fs.existsSync(csvFilePath)) {
      reject(new Error(`Arquivo CSV não encontrado: ${csvFilePath}`));
      return;
    }

    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    
    Papa.parse<CSVRow>(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn('Avisos durante o parsing do CSV:', results.errors);
        }
        resolve(results.data);
      },
      error: (error: Error) => {
        reject(new Error(`Erro ao parsear CSV: ${error.message}`));
      }
    });
  });
}

/**
 * Extrai coordenadas (latitude e longitude) de um link do Google Maps
 * Suporta diversos formatos de URLs do Google Maps
 * @param mapsLink - URL do Google Maps
 * @returns Objeto com lat e lng, ou null se não conseguir extrair
 */
function extractCoordinatesFromLink(mapsLink: string): { lat: number; lng: number } | null {
  if (!mapsLink || typeof mapsLink !== 'string') {
    return null;
  }

  try {
    // Formato 1 (MAIS PRECISO): URLs com !3d (latitude) e !4d (longitude)
    // Ex: https://www.google.com/maps/place/...!3d-26.9187!4d-49.0659
    // Este formato é mais confiável que o @ porque representa a localização exata do pin
    const ddPattern = /!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/;
    const ddMatch = mapsLink.match(ddPattern);
    if (ddMatch) {
      return {
        lat: parseFloat(ddMatch[1]),
        lng: parseFloat(ddMatch[2])
      };
    }

    // Formato 2: URLs com @latitude,longitude
    // Ex: https://www.google.com/maps/place/.../@-26.9187,-49.0659,17z/...
    // Nota: Este formato pode representar o centro da visualização, não necessariamente o pin
    const atPattern = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const atMatch = mapsLink.match(atPattern);
    if (atMatch) {
      return {
        lat: parseFloat(atMatch[1]),
        lng: parseFloat(atMatch[2])
      };
    }

    // Formato 3: URLs diretas com query ?q=lat,lng
    // Ex: https://maps.google.com/?q=-26.9187,-49.0659
    const qPattern = /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
    const qMatch = mapsLink.match(qPattern);
    if (qMatch) {
      return {
        lat: parseFloat(qMatch[1]),
        lng: parseFloat(qMatch[2])
      };
    }

    // Formato 4: URLs encurtadas (maps.app.goo.gl)
    // Nota: Estes links precisam ser resolvidos via HTTP redirect ou Geocoding API
    // Por enquanto, retornamos null e deixamos o geocodeAddress fazer o trabalho
    if (mapsLink.includes('maps.app.goo.gl') || mapsLink.includes('goo.gl')) {
      return null;
    }

    return null;
  } catch (error) {
    console.error(`Erro ao extrair coordenadas do link: ${mapsLink}`, error);
    return null;
  }
}

/**
 * Resolve um link encurtado do Google Maps seguindo o redirect
 * @param shortUrl - URL encurtada (maps.app.goo.gl)
 * @returns Promise com URL completa ou null se falhar
 */
async function resolveShortUrl(shortUrl: string): Promise<string | null> {
  try {
    // Extrair apenas a URL se houver texto antes
    const urlMatch = shortUrl.match(/(https?:\/\/[^\s]+)/);
    const cleanUrl = urlMatch ? urlMatch[1] : shortUrl;
    
    const response = await fetch(cleanUrl, {
      method: 'HEAD',
      redirect: 'follow'
    });
    return response.url;
  } catch (error) {
    console.error(`Erro ao resolver URL encurtada: ${shortUrl}`, error);
    return null;
  }
}

/**
 * Obtém coordenadas usando a Google Geocoding API como fallback
 * Agora tenta resolver links encurtados primeiro antes de usar a API
 * @param address - Endereço ou link do Google Maps para geocodificar
 * @param placeName - Nome do lugar para melhorar a precisão da busca
 * @returns Promise com objeto contendo lat e lng, ou null se falhar
 */
async function geocodeAddress(address: string, placeName?: string): Promise<{ lat: number; lng: number } | null> {
  if (!address || typeof address !== 'string') {
    return null;
  }

  // Se for um link encurtado, tentar resolver primeiro
  if (address.includes('maps.app.goo.gl') || address.includes('goo.gl')) {
    console.log(`  🔗 Resolvendo link encurtado...`);
    const fullUrl = await resolveShortUrl(address);
    
    if (fullUrl) {
      console.log(`  ✅ Link resolvido, tentando extrair coordenadas...`);
      const coords = extractCoordinatesFromLink(fullUrl);
      if (coords) {
        return coords;
      }
    }
  }

  // Se não conseguiu extrair coordenadas, tentar usar a API (se disponível)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.warn('  ⚠️  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY não configurada - pulando Geocoding API');
    return null;
  }

  try {
    // Extrair nome do lugar do endereço se houver
    const addressText = address.replace(/(https?:\/\/[^\s]+)/g, '').trim();
    
    // Construir query melhorada com nome do lugar + região
    let searchQuery = addressText || address;
    if (placeName && !searchQuery.toLowerCase().includes(placeName.toLowerCase())) {
      searchQuery = `${placeName}, ${searchQuery}`;
    }
    
    // Adicionar região para melhorar precisão (Balneário Camboriú, SC, Brasil)
    if (!searchQuery.toLowerCase().includes('balneário camboriú')) {
      searchQuery += ', Balneário Camboriú, SC, Brasil';
    }
    
    console.log(`  🔍 Buscando no Google: "${searchQuery}"`);
    
    const queryParam = encodeURIComponent(searchQuery);
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${queryParam}&key=${apiKey}`;
    
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      const formattedAddress = data.results[0].formatted_address;
      console.log(`  ✅ Coordenadas encontradas: (${location.lat}, ${location.lng})`);
      console.log(`     Endereço: ${formattedAddress}`);
      return {
        lat: location.lat,
        lng: location.lng
      };
    } else {
      console.warn(`  ⚠️  Geocoding falhou: ${data.status}`);
      if (data.error_message) {
        console.warn(`     Mensagem: ${data.error_message}`);
      }
      return null;
    }
  } catch (error) {
    console.error(`  ❌ Erro ao geocodificar:`, error);
    return null;
  }
}

/**
 * Processa uma linha do CSV e retorna um ou mais lugares
 * Se houver ENDEREÇO 2, cria duas entradas separadas com sufixos nos nomes
 * @param row - Linha do CSV
 * @returns Promise com array de Places (1 ou 2 entradas)
 */
async function processCSVRow(row: CSVRow): Promise<Place[]> {
  const places: Place[] = [];
  
  // Validar campos obrigatórios
  if (!row.LUGAR || !row.CLASSIFICAÇAO || !row.REGIÃO || !row['AVALIAÇAO DA ISA']) {
    console.warn('Linha do CSV com campos obrigatórios faltando:', row);
    return places;
  }

  // Processar ENDEREÇO (obrigatório)
  if (row.ENDEREÇO) {
    const coords = await processAddress(row.ENDEREÇO, row.LUGAR);
    if (coords) {
      // Extrair sufixo do endereço se houver (ex: "Centro - https://...")
      const addressSuffix = extractAddressSuffix(row.ENDEREÇO);
      const placeName = addressSuffix 
        ? `${row.LUGAR} - ${addressSuffix}`
        : row.LUGAR;

      places.push({
        nome: placeName,
        categoria: row.CLASSIFICAÇAO,
        subcategoria: row.SUBCLASSIFICACAO || '',
        regiao: row.REGIÃO,
        avaliacao: row['AVALIAÇAO DA ISA'],
        cupom: row['CUPOM DESCONTO'] || undefined,
        mapsLink: extractMapsLink(row.ENDEREÇO),
        lat: coords.lat,
        lng: coords.lng
      });
    } else {
      console.error(`Falha ao obter coordenadas para ${row.LUGAR} - ENDEREÇO: ${row.ENDEREÇO}`);
    }
  }

  // Processar ENDEREÇO 2 (opcional)
  if (row['ENDEREÇO 2']) {
    const coords = await processAddress(row['ENDEREÇO 2'], row.LUGAR);
    if (coords) {
      // Extrair sufixo do endereço 2
      const addressSuffix = extractAddressSuffix(row['ENDEREÇO 2']);
      const placeName = addressSuffix 
        ? `${row.LUGAR} - ${addressSuffix}`
        : `${row.LUGAR} - Unidade 2`;

      places.push({
        nome: placeName,
        categoria: row.CLASSIFICAÇAO,
        subcategoria: row.SUBCLASSIFICACAO || '',
        regiao: row.REGIÃO,
        avaliacao: row['AVALIAÇAO DA ISA'],
        cupom: row['CUPOM DESCONTO'] || undefined,
        mapsLink: extractMapsLink(row['ENDEREÇO 2']),
        lat: coords.lat,
        lng: coords.lng
      });
    } else {
      console.error(`Falha ao obter coordenadas para ${row.LUGAR} - ENDEREÇO 2: ${row['ENDEREÇO 2']}`);
    }
  }

  return places;
}

/**
 * Processa um endereço e retorna coordenadas
 * Tenta primeiro extrair do link, depois usa geocoding API
 * @param address - Endereço ou link do Google Maps
 * @param placeName - Nome do lugar para melhorar a precisão
 * @returns Promise com coordenadas ou null
 */
async function processAddress(address: string, placeName?: string): Promise<{ lat: number; lng: number } | null> {
  if (!address) return null;

  // Tentar extrair coordenadas do link primeiro
  let coords = extractCoordinatesFromLink(address);
  
  // Se falhar, usar Geocoding API
  if (!coords) {
    coords = await geocodeAddress(address, placeName);
  }

  return coords;
}

/**
 * Extrai o sufixo do endereço (texto antes do link)
 * Ex: "Centro - https://maps.app.goo.gl/..." -> "Centro"
 * Ex: "Humberto de campos - https://..." -> "Humberto de campos"
 * @param addressField - Campo de endereço do CSV
 * @returns Sufixo extraído ou string vazia
 */
function extractAddressSuffix(addressField: string): string {
  if (!addressField) return '';

  // Procurar por padrão: "texto - http"
  const match = addressField.match(/^(.+?)\s*-\s*https?:\/\//);
  if (match && match[1]) {
    return match[1].trim();
  }

  return '';
}

/**
 * Extrai o link do Google Maps do campo de endereço
 * Ex: "Centro - https://maps.app.goo.gl/..." -> "https://maps.app.goo.gl/..."
 * @param addressField - Campo de endereço do CSV
 * @returns Link do Google Maps ou o campo original se não houver sufixo
 */
function extractMapsLink(addressField: string): string {
  if (!addressField) return '';

  // Procurar por URL
  const match = addressField.match(/(https?:\/\/[^\s]+)/);
  if (match && match[1]) {
    return match[1].trim();
  }

  // Se não encontrar URL, retornar o campo original
  return addressField;
}

/**
 * Função principal que orquestra a conversão completa de CSV para JSON
 * Lê o CSV, processa todas as linhas, e salva o resultado em /public/data/places.json
 * Continua processando mesmo se houver erros em entradas individuais
 */
async function convertCSVToJSON(): Promise<void> {
  console.log('🚀 Iniciando conversão de CSV para JSON...\n');

  try {
    // 1. Ler o arquivo CSV
    console.log('📖 Lendo arquivo CSV...');
    const csvPath = 'REVIEWS POR ISABEL - GUIA.csv';
    const rows = await readCSV(csvPath);
    console.log(`✅ CSV lido com sucesso: ${rows.length} linhas encontradas\n`);

    // 2. Processar cada linha do CSV
    console.log('⚙️  Processando linhas do CSV...');
    const allPlaces: Place[] = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      console.log(`\n[${i + 1}/${rows.length}] Processando: ${row.LUGAR || 'Nome não disponível'}`);

      try {
        const places = await processCSVRow(row);
        
        if (places.length > 0) {
          allPlaces.push(...places);
          successCount += places.length;
          console.log(`  ✅ ${places.length} lugar(es) processado(s) com sucesso`);
          
          // Log detalhado dos lugares criados
          places.forEach(place => {
            console.log(`     - ${place.nome} (${place.lat}, ${place.lng})`);
          });
        } else {
          errorCount++;
          console.warn(`  ⚠️  Nenhum lugar gerado para esta linha`);
        }
      } catch (error) {
        errorCount++;
        console.error(`  ❌ Erro ao processar linha:`, error);
        console.error(`     Dados da linha:`, JSON.stringify(row, null, 2));
        // Continuar processando as próximas linhas
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`📊 Resumo do processamento:`);
    console.log(`   Total de linhas no CSV: ${rows.length}`);
    console.log(`   Lugares processados com sucesso: ${successCount}`);
    console.log(`   Linhas com erro: ${errorCount}`);
    console.log('='.repeat(60) + '\n');

    // 3. Criar diretório public/data/ se não existir
    const outputDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(outputDir)) {
      console.log('📁 Criando diretório public/data/...');
      fs.mkdirSync(outputDir, { recursive: true });
      console.log('✅ Diretório criado com sucesso\n');
    }

    // 4. Salvar resultado em JSON
    const outputPath = path.join(outputDir, 'places.json');
    console.log(`💾 Salvando resultado em ${outputPath}...`);
    
    fs.writeFileSync(
      outputPath,
      JSON.stringify(allPlaces, null, 2),
      'utf-8'
    );

    console.log(`✅ Arquivo JSON salvo com sucesso!`);
    console.log(`   Total de lugares no JSON: ${allPlaces.length}`);
    console.log(`   Tamanho do arquivo: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB\n`);

    console.log('🎉 Conversão concluída com sucesso!\n');

  } catch (error) {
    console.error('\n❌ Erro fatal durante a conversão:');
    console.error(error);
    process.exit(1);
  }
}

// Executar a conversão se o script for chamado diretamente
if (require.main === module) {
  convertCSVToJSON()
    .then(() => {
      console.log('✨ Processo finalizado com sucesso!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Erro fatal:', error);
      process.exit(1);
    });
}

// Exportar as funções para uso em testes
export {
  readCSV,
  extractCoordinatesFromLink,
  geocodeAddress,
  processCSVRow,
  convertCSVToJSON,
  resolveShortUrl
};
