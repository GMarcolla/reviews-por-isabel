/**
 * Script de demonstração da função processCSVRow
 * Mostra como a função processa lugares com múltiplos endereços
 */

// Simular a função processCSVRow sem depender de APIs externas
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

interface Place {
  nome: string;
  categoria: string;
  subcategoria: string;
  regiao: string;
  avaliacao: string;
  cupom?: string;
  mapsLink: string;
  lat: number;
  lng: number;
}

function extractAddressSuffix(addressField: string): string {
  if (!addressField) return '';
  const match = addressField.match(/^(.+?)\s*-\s*https?:\/\//);
  if (match && match[1]) {
    return match[1].trim();
  }
  return '';
}

function extractMapsLink(addressField: string): string {
  if (!addressField) return '';
  const match = addressField.match(/(https?:\/\/[^\s]+)/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return addressField;
}

function simulateProcessCSVRow(row: CSVRow): Place[] {
  const places: Place[] = [];
  
  // Validar campos obrigatórios
  if (!row.LUGAR || !row.CLASSIFICACAO || !row.REGIAO || !row['AVALIAÇAO DA ISA']) {
    console.warn('Linha do CSV com campos obrigatórios faltando');
    return places;
  }

  // Processar ENDEREÇO (obrigatório)
  if (row.ENDERECO) {
    const addressSuffix = extractAddressSuffix(row.ENDERECO);
    const placeName = addressSuffix 
      ? `${row.LUGAR} - ${addressSuffix}`
      : row.LUGAR;

    places.push({
      nome: placeName,
      categoria: row.CLASSIFICACAO,
      subcategoria: row.SUBCLASSIFICACAO || '',
      regiao: row.REGIAO,
      avaliacao: row['AVALIAÇAO DA ISA'],
      cupom: row['CUPOM DESCONTO'] || undefined,
      mapsLink: extractMapsLink(row.ENDERECO),
      lat: -26.9187, // Coordenadas simuladas
      lng: -49.0659
    });
  }

  // Processar ENDEREÇO 2 (opcional)
  if (row['ENDEREÇO 2']) {
    const addressSuffix = extractAddressSuffix(row['ENDEREÇO 2']);
    const placeName = addressSuffix 
      ? `${row.LUGAR} - ${addressSuffix}`
      : `${row.LUGAR} - Unidade 2`;

    places.push({
      nome: placeName,
      categoria: row.CLASSIFICACAO,
      subcategoria: row.SUBCLASSIFICACAO || '',
      regiao: row.REGIAO,
      avaliacao: row['AVALIAÇAO DA ISA'],
      cupom: row['CUPOM DESCONTO'] || undefined,
      mapsLink: extractMapsLink(row['ENDEREÇO 2']),
      lat: -26.9195, // Coordenadas simuladas diferentes
      lng: -49.0665
    });
  }

  return places;
}

// Demonstração 1: Cafehaus com 2 endereços
console.log('=== Demonstração 1: Cafehaus com 2 endereços ===\n');

const cafehaus: CSVRow = {
  CLASSIFICACAO: 'Cafés e docerias',
  SUBCLASSIFICACAO: 'Cafeteria',
  LUGAR: 'Cafehaus',
  LINK: '',
  REGIAO: 'Blumenau-SC',
  'AVALIAÇAO DA ISA': 'Ótimo café alemão com ambiente aconchegante',
  'CUPOM DESCONTO': '',
  ENDERECO: 'Humberto de campos - https://maps.app.goo.gl/RSMYnWYu6sjhLFCG7',
  'ENDEREÇO 2': 'Centro - https://maps.app.goo.gl/koVi61F11PaQPHf69'
};

const cafehausPlaces = simulateProcessCSVRow(cafehaus);
console.log(`Número de lugares gerados: ${cafehausPlaces.length}`);
console.log('\nLugar 1:');
console.log(`  Nome: ${cafehausPlaces[0].nome}`);
console.log(`  Link: ${cafehausPlaces[0].mapsLink}`);
console.log(`  Coordenadas: ${cafehausPlaces[0].lat}, ${cafehausPlaces[0].lng}`);
console.log('\nLugar 2:');
console.log(`  Nome: ${cafehausPlaces[1].nome}`);
console.log(`  Link: ${cafehausPlaces[1].mapsLink}`);
console.log(`  Coordenadas: ${cafehausPlaces[1].lat}, ${cafehausPlaces[1].lng}`);

// Demonstração 2: Lugar com apenas 1 endereço
console.log('\n\n=== Demonstração 2: Lugar com apenas 1 endereço ===\n');

const singlePlace: CSVRow = {
  CLASSIFICACAO: 'Restaurantes',
  SUBCLASSIFICACAO: 'Hamburgueria',
  LUGAR: 'Burger House',
  LINK: '',
  REGIAO: 'Blumenau-SC',
  'AVALIAÇAO DA ISA': 'Melhor hambúrguer da cidade',
  'CUPOM DESCONTO': '15% de desconto',
  ENDERECO: 'https://maps.app.goo.gl/abc123',
  'ENDEREÇO 2': ''
};

const singlePlaces = simulateProcessCSVRow(singlePlace);
console.log(`Número de lugares gerados: ${singlePlaces.length}`);
console.log('\nLugar 1:');
console.log(`  Nome: ${singlePlaces[0].nome}`);
console.log(`  Cupom: ${singlePlaces[0].cupom}`);
console.log(`  Link: ${singlePlaces[0].mapsLink}`);

// Demonstração 3: Lugar com sufixo no endereço único
console.log('\n\n=== Demonstração 3: Lugar com sufixo no endereço único ===\n');

const withSuffix: CSVRow = {
  CLASSIFICACAO: 'Lojas',
  SUBCLASSIFICACAO: 'Moda',
  LUGAR: 'Fashion Store',
  LINK: '',
  REGIAO: 'Blumenau-SC',
  'AVALIAÇAO DA ISA': 'Ótimas roupas',
  'CUPOM DESCONTO': '',
  ENDERECO: 'Shopping Neumarkt - https://maps.app.goo.gl/xyz789',
  'ENDEREÇO 2': ''
};

const withSuffixPlaces = simulateProcessCSVRow(withSuffix);
console.log(`Número de lugares gerados: ${withSuffixPlaces.length}`);
console.log('\nLugar 1:');
console.log(`  Nome: ${withSuffixPlaces[0].nome}`);
console.log(`  Link: ${withSuffixPlaces[0].mapsLink}`);

console.log('\n=== Demonstração concluída ===');
