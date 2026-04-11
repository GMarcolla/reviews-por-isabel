import { prisma } from '../prisma';
import { getCategoriaRota } from '../categorias';

export async function getRestaurantes() {
  const lugares = await prisma.lugar.findMany({
    orderBy: { ordem: 'desc' }
  });
  return lugares.filter(l => getCategoriaRota(l.categoria) === 'restaurantes');
}

export async function getRestauranteBySlug(slug: string) {
  return prisma.lugar.findUnique({ where: { slug } });
}

export async function getRestaurantesByCategoria(categoria: string) {
  const todos = await getRestaurantes();
  return todos.filter(r =>
    r.subcategoria?.toLowerCase().trim() === categoria.toLowerCase().trim()
  );
}

export async function getRestaurantesDestaque() {
  const todos = await getRestaurantes();
  return todos.filter(r => r.destaque === true);
}
