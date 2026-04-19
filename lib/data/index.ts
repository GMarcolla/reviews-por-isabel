// Central export file for all data
export * from './restaurantes';
export * from './cafes';
export * from './passeios';
export * from './cupons';
export * from './prestadores';
export * from './lojas';

import { prisma } from '../prisma';

// Combined utility functions
export async function getTodosLugares() {
  return prisma.lugar.findMany({
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getLugarById(id: string) {
  const lugar = await prisma.lugar.findUnique({
    where: { slug: id },
    include: { categoria: true, subcategoria: true },
  });
  return lugar || undefined;
}

export async function getLugaresPorSubcategoria(subcategoriaId: string) {
  return prisma.lugar.findMany({
    where: { subcategoriaId },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getLugaresDestaque() {
  return prisma.lugar.findMany({
    where: { destaque: true },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}
