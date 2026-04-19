/**
 * SISTEMA DE CATEGORIAS - FUNÇÕES ASYNC (BANCO DE DADOS)
 *
 * Categorias e subcategorias agora são gerenciadas no banco via modelos
 * Categoria e Subcategoria. Este arquivo expõe funções async para consulta.
 *
 * As constantes hardcoded antigas foram removidas.
 * Use as funções abaixo para acessar categorias e subcategorias.
 */

import { prisma } from './prisma';

export type { Categoria, Subcategoria } from '@prisma/client';

// ---------------------------------------------------------------------------
// Queries de Categorias
// ---------------------------------------------------------------------------

/** Retorna todas as categorias ordenadas pelo campo `ordem` */
export async function getCategorias() {
  return prisma.categoria.findMany({
    orderBy: { ordem: 'asc' },
    include: { subcategorias: { orderBy: { ordem: 'asc' } } },
  });
}

/** Retorna uma categoria pelo ID */
export async function getCategoriaById(id: string) {
  return prisma.categoria.findUnique({
    where: { id },
    include: { subcategorias: { orderBy: { ordem: 'asc' } } },
  });
}

/** Retorna uma categoria pelo slug da rota URL (ex: 'restaurantes', 'cafes', 'lazer') */
export async function getCategoriaByRota(rota: string) {
  return prisma.categoria.findFirst({
    where: { rota },
    include: { subcategorias: { orderBy: { ordem: 'asc' } } },
  });
}

// ---------------------------------------------------------------------------
// Queries de Subcategorias
// ---------------------------------------------------------------------------

/** Retorna todas as subcategorias de uma categoria, ordenadas por `ordem` */
export async function getSubcategorias(categoriaId: string) {
  return prisma.subcategoria.findMany({
    where: { categoriaId },
    orderBy: { ordem: 'asc' },
  });
}

/** Retorna uma subcategoria pelo ID */
export async function getSubcategoriaById(id: string) {
  return prisma.subcategoria.findUnique({ where: { id } });
}

// ---------------------------------------------------------------------------
// Helpers síncronos para uso em Server Components que já carregam os dados
// (evita chamadas extras ao banco quando o include já foi feito)
// ---------------------------------------------------------------------------

/** Retorna a rota URL dado um objeto categoria ou seu rota string */
export function getCategoriaRota(rota: string): string {
  return rota;
}

/** Constantes de IDs canônicos para uso tipado no código */
export const CATEGORIA_IDS = {
  RESTAURANTES: 'cat_rest',
  CAFES: 'cat_cafe',
  PASSEIOS: 'cat_pass',
  LOJAS: 'cat_loja',
  SERVICOS: 'cat_serv',
} as const;

export type CategoriaId = typeof CATEGORIA_IDS[keyof typeof CATEGORIA_IDS];
