import { prisma } from '../prisma';
import { getCategoriaRota } from '../categorias';

export async function getPrestadores() {
  const lugares = await prisma.lugar.findMany({
    orderBy: { ordem: 'desc' }
  });
  return lugares.filter(l => getCategoriaRota(l.categoria) === 'prestadores');
}

export async function getPrestadorBySlug(slug: string) {
  return prisma.lugar.findUnique({ where: { slug } });
}

export async function getPrestadoresByCategoria(categoria: string) {
  const todos = await getPrestadores();
  return todos.filter(p =>
    p.subcategoria?.toLowerCase().trim() === categoria.toLowerCase().trim()
  );
}

export async function getPrestadoresDestaque() {
  const todos = await getPrestadores();
  return todos.filter(p => p.destaque === true);
}
