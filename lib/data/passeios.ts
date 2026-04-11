import { prisma } from '../prisma';
import { getCategoriaRota } from '../categorias';

export async function getPasseios() {
  const lugares = await prisma.lugar.findMany({
    orderBy: { ordem: 'desc' }
  });
  return lugares.filter(l => getCategoriaRota(l.categoria) === 'lazer');
}

export async function getPasseioBySlug(slug: string) {
  return prisma.lugar.findUnique({ where: { slug } });
}

export async function getPasseiosByCategoria(categoria: string) {
  const todos = await getPasseios();
  return todos.filter(p =>
    p.subcategoria?.toLowerCase().trim() === categoria.toLowerCase().trim()
  );
}

export async function getPasseiosDestaque() {
  const todos = await getPasseios();
  return todos.filter(p => p.destaque === true);
}
