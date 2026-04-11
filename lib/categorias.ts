/**
 * SISTEMA DE CATEGORIAS - FONTE ÚNICA DE VERDADE
 *
 * Categorias canônicas armazenadas no banco de dados:
 * - "Restaurantes"
 * - "Cafés e Docerias"
 * - "Passeios"
 * - "Onde Comprar"
 * - "Serviços"
 *
 * Subcategorias são armazenadas no campo `subcategoria` separado.
 */

export const CATEGORIAS = {
  RESTAURANTES: 'Restaurantes',
  CAFES: 'Cafés e Docerias',
  PASSEIOS: 'Passeios',
  LOJAS: 'Onde Comprar',
  SERVICOS: 'Serviços',
} as const;

export type CategoriaCanonica = typeof CATEGORIAS[keyof typeof CATEGORIAS];

/** Mapeia categoria canônica → rota da URL */
export const CATEGORIA_PARA_ROTA: Record<string, string> = {
  [CATEGORIAS.RESTAURANTES]: 'restaurantes',
  [CATEGORIAS.CAFES]: 'cafes',
  [CATEGORIAS.PASSEIOS]: 'lazer',
  [CATEGORIAS.LOJAS]: 'lojas',
  [CATEGORIAS.SERVICOS]: 'prestadores',
};

/** Mapeia categoria canônica → label de exibição */
export const CATEGORIA_LABEL: Record<string, string> = {
  [CATEGORIAS.RESTAURANTES]: 'Restaurantes',
  [CATEGORIAS.CAFES]: 'Cafés e Docerias',
  [CATEGORIAS.PASSEIOS]: 'Lazer & Passeios',
  [CATEGORIAS.LOJAS]: 'Onde Comprar',
  [CATEGORIAS.SERVICOS]: 'Serviços',
};

/** Subcategorias disponíveis por categoria canônica */
export const SUBCATEGORIAS: Record<string, string[]> = {
  [CATEGORIAS.RESTAURANTES]: [
    'Hamburgueria', 'Pizza', 'Japonês', 'Italiano', 'Mexicano', 'Coreano',
    'Alemão / Germânico', 'Buffet', 'Bar', 'Esfirraria', 'Padaria',
    'Pastelaria', 'Hot Dog', 'Empadas', 'Gelateria', 'Romântico', 'Outro',
  ],
  [CATEGORIAS.CAFES]: [
    'Cafeteria', 'Doceria', 'Brunch', 'Sorveteria', 'Outro',
  ],
  [CATEGORIAS.PASSEIOS]: [
    'Parque', 'Evento', 'Festival', 'Concerto', 'Museu', 'Mirante', 'Outro',
  ],
  [CATEGORIAS.LOJAS]: [
    'Moda', 'Decoração', 'Livraria', 'Presentes', 'Eletrônicos', 'Outro',
  ],
  [CATEGORIAS.SERVICOS]: [
    'Dentista', 'Beleza / Estética', 'Unhas', 'Arquiteta', 'Outro',
  ],
};

/** Retorna a rota correta para qualquer categoria (canônica ou legada) */
export function getCategoriaRota(categoria: string): string {
  // Tenta match direto (categoria canônica)
  if (CATEGORIA_PARA_ROTA[categoria]) {
    return CATEGORIA_PARA_ROTA[categoria];
  }

  // Fallback para valores legados (categorias antigas no banco)
  const lower = categoria.toLowerCase();
  if (['hamburgueria', 'esfirraria', 'padaria', 'gelateria', 'pastelaria', 'empadas',
    'hotdog', 'germanico', 'buffet', 'bar', 'coreano', 'mexicano', 'italiano',
    'japones', 'pizzaria', 'romantico'].includes(lower)) {
    return 'restaurantes';
  }
  if (['cafeteria', 'doceria', 'brunch'].includes(lower)) {
    return 'cafes';
  }
  if (['evento', 'concerto', 'festival', 'parque', 'lazer', 'passeios'].includes(lower)) {
    return 'lazer';
  }
  if (['dentista', 'arquiteta', 'unhas', 'beleza', 'servico', 'serviços'].includes(lower)) {
    return 'prestadores';
  }
  if (['moda', 'decoracao', 'decoração', 'livraria', 'loja'].includes(lower)) {
    return 'lojas';
  }

  return 'lazer'; // fallback final
}

/** Retorna o label de exibição para uma categoria */
export function getCategoriaLabel(categoria: string): string {
  return CATEGORIA_LABEL[categoria] || categoria;
}

/** 
 * Helpers para migração de dados antigos para os novos canônicos.
 * Exemplo: getCanonicalCategoria('hamburgueria') => 'Restaurantes'
 */
export function getCanonicalCategoria(categoria: string): string {
  if (!categoria) return '';
  if (Object.values(CATEGORIAS).includes(categoria as any)) return categoria;
  
  const lower = categoria.toLowerCase();
  if (['hamburgueria', 'esfirraria', 'padaria', 'gelateria', 'pastelaria', 'empadas',
    'hotdog', 'germanico', 'buffet', 'bar', 'coreano', 'mexicano', 'italiano',
    'japones', 'pizzaria', 'romantico'].includes(lower)) {
    return CATEGORIAS.RESTAURANTES;
  }
  if (['cafeteria', 'doceria', 'brunch'].includes(lower)) {
    return CATEGORIAS.CAFES;
  }
  if (['evento', 'concerto', 'festival', 'parque', 'lazer', 'passeios'].includes(lower)) {
    return CATEGORIAS.PASSEIOS;
  }
  if (['dentista', 'arquiteta', 'unhas', 'beleza', 'servico', 'serviços'].includes(lower)) {
    return CATEGORIAS.SERVICOS;
  }
  if (['moda', 'decoracao', 'decoração', 'livraria', 'loja'].includes(lower)) {
    return CATEGORIAS.LOJAS;
  }
  return '';
}

/** 
 * Mapeia a categoria antiga para a subcategoria canônica mais próxima
 * Ex: getCanonicalSubcategoria('hamburgueria') => 'Hamburgueria'
 */
export function getCanonicalSubcategoria(categoria: string): string {
  if (!categoria) return '';
  // Se for uma categoria canônica, não tem subcategoria implícita nela
  if (Object.values(CATEGORIAS).includes(categoria as any)) return '';

  const lower = categoria.toLowerCase();
  
  // Mapa de normalização (opcional/parcial, capitalizando a primeira letra ou usando as do map)
  const map: Record<string, string> = {
    hamburgueria: 'Hamburgueria',
    pizzaria: 'Pizza',
    japones: 'Japonês',
    italiano: 'Italiano',
    mexicano: 'Mexicano',
    coreano: 'Coreano',
    germanico: 'Alemão / Germânico',
    buffet: 'Buffet',
    bar: 'Bar',
    esfirraria: 'Esfirraria',
    padaria: 'Padaria',
    pastelaria: 'Pastelaria',
    hotdog: 'Hot Dog',
    empadas: 'Empadas',
    gelateria: 'Gelateria',
    romantico: 'Romântico',
    cafeteria: 'Cafeteria',
    doceria: 'Doceria',
    brunch: 'Brunch',
    parque: 'Parque',
    evento: 'Evento',
    festival: 'Festival',
    concerto: 'Concerto',
    moda: 'Moda',
    decoracao: 'Decoração',
    decoração: 'Decoração',
    livraria: 'Livraria',
    dentista: 'Dentista',
    unhas: 'Unhas',
    beleza: 'Beleza / Estética',
    arquiteta: 'Arquiteta'
  };

  return map[lower] || '';
}
