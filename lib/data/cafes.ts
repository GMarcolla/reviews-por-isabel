import { prisma } from '../prisma';
import { getCategoriaRota } from '../categorias';

export async function getCafes() {
  const lugares = await prisma.lugar.findMany({
    orderBy: { ordem: 'desc' }
  });
  return lugares.filter(l => getCategoriaRota(l.categoria) === 'cafes');
}

export async function getCafeBySlug(slug: string) {
  return prisma.lugar.findUnique({ where: { slug } });
}

export async function getCafesByCategoria(categoria: string) {
  const todos = await getCafes();
  return todos.filter(c =>
    c.subcategoria?.toLowerCase().trim() === categoria.toLowerCase().trim()
  );
}

export async function getCafesDestaque() {
  const todos = await getCafes();
  return todos.filter(c => c.destaque === true);
}
