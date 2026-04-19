import { prisma } from '../prisma';
import { CATEGORIA_IDS } from '../categorias';

export async function getPrestadores() {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.SERVICOS },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getPrestadorBySlug(slug: string) {
  return prisma.lugar.findUnique({
    where: { slug },
    include: { categoria: true, subcategoria: true },
  });
}

export async function getPrestadoresBySubcategoria(subcategoriaId: string) {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.SERVICOS, subcategoriaId },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getPrestadoresDestaque() {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.SERVICOS, destaque: true },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}
