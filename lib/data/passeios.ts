import { prisma } from '../prisma';
import { CATEGORIA_IDS } from '../categorias';

export async function getPasseios() {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.PASSEIOS },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getPasseioBySlug(slug: string) {
  return prisma.lugar.findUnique({
    where: { slug },
    include: { categoria: true, subcategoria: true },
  });
}

export async function getPasseiosBySubcategoria(subcategoriaId: string) {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.PASSEIOS, subcategoriaId },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}

export async function getPasseiosDestaque() {
  return prisma.lugar.findMany({
    where: { categoriaId: CATEGORIA_IDS.PASSEIOS, destaque: true },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' },
  });
}
