/**
 * Testes para funções auxiliares de processamento de endereços
 * Valida extração de sufixos e links sem depender de APIs externas
 */

import { extractCoordinatesFromLink } from './convert-csv-to-json';

// Teste 1: Extração de coordenadas de link com formato @lat,lng
function testExtractCoordinatesAtFormat() {
  console.log('Teste 1: Extração de coordenadas com formato @lat,lng');
  
  const link = 'https://www.google.com/maps/place/@-26.9187,-49.0659,17z/data=test';
  const coords = extractCoordinatesFromLink(link);
  
  console.assert(coords !== null, 'Coordenadas não devem ser null');
  console.assert(coords!.lat === -26.9187, `Latitude incorreta: ${coords!.lat}`);
  console.assert(coords!.lng === -49.0659, `Longitude incorreta: ${coords!.lng}`);
  
  console.log('✓ Teste 1 passou\n');
}

// Teste 2: Extração de coordenadas de link com formato !3d!4d
function testExtractCoordinatesDdFormat() {
  console.log('Teste 2: Extração de coordenadas com formato !3d!4d');
  
  const link = 'https://www.google.com/maps/place/test!3d-26.9187!4d-49.0659!5d123';
  const coords = extractCoordinatesFromLink(link);
  
  console.assert(coords !== null, 'Coordenadas não devem ser null');
  console.assert(coords!.lat === -26.9187, `Latitude incorreta: ${coords!.lat}`);
  console.assert(coords!.lng === -49.0659, `Longitude incorreta: ${coords!.lng}`);
  
  console.log('✓ Teste 2 passou\n');
}

// Teste 3: Extração de coordenadas de link com formato ?q=lat,lng
function testExtractCoordinatesQFormat() {
  console.log('Teste 3: Extração de coordenadas com formato ?q=lat,lng');
  
  const link = 'https://maps.google.com/?q=-26.9187,-49.0659';
  const coords = extractCoordinatesFromLink(link);
  
  console.assert(coords !== null, 'Coordenadas não devem ser null');
  console.assert(coords!.lat === -26.9187, `Latitude incorreta: ${coords!.lat}`);
  console.assert(coords!.lng === -49.0659, `Longitude incorreta: ${coords!.lng}`);
  
  console.log('✓ Teste 3 passou\n');
}

// Teste 4: Link encurtado deve retornar null (requer geocoding)
function testExtractCoordinatesShortLink() {
  console.log('Teste 4: Link encurtado deve retornar null');
  
  const link = 'https://maps.app.goo.gl/RSMYnWYu6sjhLFCG7';
  const coords = extractCoordinatesFromLink(link);
  
  console.assert(coords === null, 'Link encurtado deve retornar null');
  
  console.log('✓ Teste 4 passou\n');
}

// Teste 5: Link inválido deve retornar null
function testExtractCoordinatesInvalidLink() {
  console.log('Teste 5: Link inválido deve retornar null');
  
  const link = 'https://example.com/not-a-maps-link';
  const coords = extractCoordinatesFromLink(link);
  
  console.assert(coords === null, 'Link inválido deve retornar null');
  
  console.log('✓ Teste 5 passou\n');
}

// Teste 6: String vazia deve retornar null
function testExtractCoordinatesEmptyString() {
  console.log('Teste 6: String vazia deve retornar null');
  
  const coords = extractCoordinatesFromLink('');
  
  console.assert(coords === null, 'String vazia deve retornar null');
  
  console.log('✓ Teste 6 passou\n');
}

// Executar todos os testes
function runTests() {
  console.log('=== Executando testes de extração de coordenadas ===\n');
  
  try {
    testExtractCoordinatesAtFormat();
    testExtractCoordinatesDdFormat();
    testExtractCoordinatesQFormat();
    testExtractCoordinatesShortLink();
    testExtractCoordinatesInvalidLink();
    testExtractCoordinatesEmptyString();
    
    console.log('=== Todos os testes passaram! ===');
  } catch (error) {
    console.error('Erro ao executar testes:', error);
    process.exit(1);
  }
}

// Executar se for o arquivo principal
if (require.main === module) {
  runTests();
}
