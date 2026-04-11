// Central export file for all data
export * from './restaurantes';
export * from './cafes';
export * from './passeios';
export * from './cupons';
export * from './prestadores';
export * from './lojas';

import { Lugar } from '../types';
import { getRestaurantes } from './restaurantes';
import { getCafes } from './cafes';
import { getPasseios } from './passeios';
import { getPrestadores } from './prestadores';
import { getLojas } from './lojas';
import { prisma } from '../prisma';

// Combined utility functions
export async function getTodosLugares(): Promise<Lugar[]> {
  return await prisma.lugar.findMany({ orderBy: { ordem: 'desc' } });
}

export async function getLugarById(id: string): Promise<Lugar | undefined> {
  const lugar = await prisma.lugar.findUnique({ where: { slug: id } });
  return lugar || undefined;
}

export async function getLugaresPorCategoria(categoria: string): Promise<Lugar[]> {
  const todosLugares = await getTodosLugares();
  return todosLugares.filter(l => (l.subcategoria?.toLowerCase().trim() || l.categoria.toLowerCase().trim()) === categoria.toLowerCase().trim());
}

export async function getLugaresDestaque(): Promise<Lugar[]> {
  const todosLugares = await getTodosLugares();
  return todosLugares.filter(l => l.destaque === true);
}
