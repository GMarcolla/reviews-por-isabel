import { Cupom } from '../types';

export const cupons: Cupom[] = [
  {
    id: 'cupom-burger-house',
    lugarId: 'burger-house',
    codigo: 'ISABEL10',
    descricao: '10% de desconto em qualquer hambúrguer',
    validade: '2024-12-31',
    termos: 'Válido de terça a quinta-feira. Não cumulativo com outras promoções.',
    ativo: true,
  },
  {
    id: 'cupom-villa-borghi',
    lugarId: 'villa-borghi',
    codigo: 'ISABELV15',
    descricao: '15% de desconto no menu executivo',
    validade: '2024-12-31',
    termos: 'Válido apenas no almoço de terça a sexta. Reserva antecipada recomendada.',
    ativo: true,
  },
  {
    id: 'cupom-cafe-cultura',
    lugarId: 'cafe-cultura',
    codigo: 'CAFISA',
    descricao: 'Café expresso grátis na compra de qualquer bolo',
    validade: '2024-12-31',
    termos: 'Válido de segunda a sexta-feira.',
    ativo: true,
  },
  {
    id: 'cupom-doce-encanto',
    lugarId: 'doce-encanto',
    codigo: 'DOCEISA20',
    descricao: '20% de desconto em bolos personalizados',
    validade: '2024-12-31',
    termos: 'Pedido com 48h de antecedência. Válido para bolos acima de 1kg.',
    ativo: true,
  },
  {
    id: 'cupom-brunch-club',
    lugarId: 'brunch-club',
    codigo: 'BRUNCHISA',
    descricao: 'Drink de boas-vindas grátis',
    validade: '2024-12-31',
    termos: 'Válido aos sábados e domingos. Reserva obrigatória.',
    ativo: true,
  },
];

// Utility functions
export function getCupons(): Cupom[] {
  return cupons;
}

export function getCuponsAtivos(): Cupom[] {
  return cupons.filter(c => c.ativo === true);
}

export function getCupomById(id: string): Cupom | undefined {
  return cupons.find(c => c.id === id);
}

export function getCuponsByLugarId(lugarId: string): Cupom[] {
  return cupons.filter(c => c.lugarId === lugarId && c.ativo === true);
}
