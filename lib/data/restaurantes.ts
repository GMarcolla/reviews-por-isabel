import { prisma } from '../prisma';
import { CATEGORIA_IDS } from '../categorias';

export async function getRestaurantes() {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.RESTAURANTES },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getRestauranteBySlug(slug: string) {
  return prisma.lugar.findUnique({
    where: { slug },
    include: { categoria: true, subcategoria: true },
  });
}

export async function getRestaurantesBySubcategoria(subcategoriaId: string) {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.RESTAURANTES, subcategoriaId },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getRestaurantesDestaque() {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.RESTAURANTES, destaque: true },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}
