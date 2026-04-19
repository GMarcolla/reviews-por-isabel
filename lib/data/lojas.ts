import { prisma } from '../prisma';
import { CATEGORIA_IDS } from '../categorias';

export async function getLojas() {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.LOJAS },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getLojaBySlug(slug: string) {
  return prisma.lugar.findUnique({
    where: { slug },
    include: { categoria: true, subcategoria: true },
  });
}

export async function getLojasBySubcategoria(subcategoriaId: string) {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.LOJAS, subcategoriaId },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getLojasDestaque() {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.LOJAS, destaque: true },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}
