import { prisma } from '@/lib/prisma';
import { Receita } from '@/lib/types';

/**
 * Busca todas as receitas ordenadas por data de criação (mais recentes primeiro)
 */
export async function getReceitas(): Promise<Receita[]> {
  return await prisma.receita.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Busca uma receita específica pelo slug
 */
export async function getReceitaBySlug(slug: string): Promise<Receita | null> {
  return await prisma.receita.findUnique({
    where: { slug },
  });
}

/**
 * Busca uma receita específica pelo ID
 */
export async function getReceitaById(id: string): Promise<Receita | null> {
  return await prisma.receita.findUnique({
    where: { id },
  });
}

/**
 * Cria uma nova receita no banco de dados
 */
export async function createReceita(
  data: Omit<Receita, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Receita> {
  return await prisma.receita.create({
    data,
  });
}

/**
 * Atualiza uma receita existente
 */
export async function updateReceita(
  id: string,
  data: Partial<Omit<Receita, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Receita> {
  return await prisma.receita.update({
    where: { id },
    data,
  });
}

/**
 * Deleta uma receita do banco de dados
 */
export async function deleteReceita(id: string): Promise<void> {
  await prisma.receita.delete({
    where: { id },
  });
}
