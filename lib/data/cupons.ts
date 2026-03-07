import { Cupom } from '../types';

export const cupons: Cupom[] = [
  // Restaurantes
  {
    id: 'king-pastelaria-cupom',
    lugarId: 'king-pastelaria',
    lugarNome: 'King Pastelaria',
    categoria: 'restaurantes',
    subcategoria: 'pastelaria',
    codigo: 'ISABEL5',
    descricao: '5% OFF',
    termos: 'Válido para todos os produtos',
    ativo: true,
  },
  {
    id: 'empadaria-do-reino-cupom',
    lugarId: 'empadaria-do-reino',
    lugarNome: 'Empadaria do Reino',
    categoria: 'restaurantes',
    subcategoria: 'empadas',
    codigo: 'Mostrar que é meu seguidor(a)',
    descricao: '5% OFF nas empadas e 10% OFF nos empadões',
    termos: 'Mostrar que segue @reviewsporisabel no Instagram',
    ativo: true,
  },
  {
    id: 'senhor-salsicha-cupom',
    lugarId: 'senhor-salsicha',
    lugarNome: 'Senhor Salsicha',
    categoria: 'restaurantes',
    subcategoria: 'hotdog',
    codigo: 'ISABEL05',
    descricao: '5% OFF',
    termos: 'Válido para todos os produtos',
    ativo: true,
  },

  // Cafés e Docerias
  {
    id: 'rose-kemer-cupom',
    lugarId: 'rose-kemer',
    lugarNome: 'Rose Kemer',
    categoria: 'cafes',
    subcategoria: 'doceria',
    codigo: 'ISA5',
    descricao: '5% OFF',
    termos: 'Válido para todos os produtos',
    ativo: true,
  },

  // Lojas
  {
    id: 'kimakes-cupom',
    lugarId: 'kimakes',
    lugarNome: 'Kimakes',
    categoria: 'lojas',
    subcategoria: 'moda',
    codigo: 'ISABEL10',
    descricao: '10% OFF',
    termos: 'Válido para todos os produtos',
    ativo: true,
  },
  {
    id: 'souplast-go-cupom',
    lugarId: 'souplast-go',
    lugarNome: 'Souplast GO',
    categoria: 'lojas',
    subcategoria: 'decoracao',
    codigo: 'Mostrar que é meu seguidor(a)',
    descricao: '5% OFF',
    termos: 'Mostrar que segue @reviewsporisabel no Instagram',
    ativo: true,
  },

  // Prestadores de Serviços
  {
    id: 'guilherme-nicoletti-cupom',
    lugarId: 'guilherme-nicoletti',
    lugarNome: 'Guilherme Nicoletti',
    categoria: 'prestadores',
    subcategoria: 'dentista',
    codigo: 'Mostrar que é meu seguidor(a)',
    descricao: '10% OFF',
    termos: 'Mostrar que segue @reviewsporisabel no Instagram',
    ativo: true,
  },
  {
    id: 'clarisse-lash-cupom',
    lugarId: 'clarisse-lash',
    lugarNome: 'Clarisse',
    categoria: 'prestadores',
    subcategoria: 'beleza',
    codigo: 'Mostrar que é meu seguidor(a)',
    descricao: '10% OFF',
    termos: 'Mostrar que segue @reviewsporisabel no Instagram',
    ativo: true,
  },
  {
    id: 'lu-kempner-cupom',
    lugarId: 'lu-kempner-beauty',
    lugarNome: 'Lu Kempner Beauty',
    categoria: 'prestadores',
    subcategoria: 'beleza',
    codigo: 'Mostrar que é meu seguidor(a)',
    descricao: '10% OFF NO PIX/DINHEIRO',
    termos: 'Mostrar que segue @reviewsporisabel no Instagram. Válido apenas para pagamento em PIX ou dinheiro',
    ativo: true,
  },
  {
    id: 'milena-bett-cupom',
    lugarId: 'milena-bett',
    lugarNome: 'Milena Bett',
    categoria: 'prestadores',
    subcategoria: 'beleza',
    codigo: 'Mostrar que é meu seguidor(a)',
    descricao: '5% OFF',
    termos: 'Mostrar que segue @reviewsporisabel no Instagram',
    ativo: true,
  },
];

// Utility functions
export function getCupons(): Cupom[] {
  return cupons.filter(c => c.ativo);
}

export function getCupomByLugarId(lugarId: string): Cupom | undefined {
  return cupons.find(c => c.lugarId === lugarId && c.ativo);
}

export function getCuponsByCategoria(categoria: string): Cupom[] {
  return cupons.filter(c => c.categoria === categoria && c.ativo);
}

export function getCuponsBySubcategoria(subcategoria: string): Cupom[] {
  return cupons.filter(c => c.subcategoria === subcategoria && c.ativo);
}

export function searchCupons(query: string): Cupom[] {
  const lowerQuery = query.toLowerCase();
  return cupons.filter(c => 
    c.ativo && (
      c.lugarNome.toLowerCase().includes(lowerQuery) ||
      c.descricao.toLowerCase().includes(lowerQuery)
    )
  );
}
