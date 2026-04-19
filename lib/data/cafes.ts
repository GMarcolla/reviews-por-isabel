import { prisma } from '../prisma';
import { CATEGORIA_IDS } from '../categorias';

export async function getCafes() {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.CAFES },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getCafeBySlug(slug: string) {
  return prisma.lugar.findUnique({
    where: { slug },
    include: { categoria: true, subcategoria: true },
  });
}

export async function getCafesBySubcategoria(subcategoriaId: string) {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.CAFES, subcategoriaId },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getCafesDestaque() {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.CAFES, destaque: true },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}
