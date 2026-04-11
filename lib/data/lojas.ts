import { prisma } from '../prisma';
import { getCategoriaRota } from '../categorias';

export async function getLojas() {
  const lugares = await prisma.lugar.findMany({
    orderBy: { ordem: 'desc' }
  });
  return lugares.filter(l => getCategoriaRota(l.categoria) === 'lojas');
}

export async function getLojaBySlug(slug: string) {
  return prisma.lugar.findUnique({ where: { slug } });
}

export async function getLojasByCategoria(categoria: string) {
  const todos = await getLojas();
  return todos.filter(l =>
    l.subcategoria?.toLowerCase().trim() === categoria.toLowerCase().trim()
  );
}

export async function getLojasDestaque() {
  const todos = await getLojas();
  return todos.filter(l => l.destaque === true);
}
