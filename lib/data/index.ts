// Central export file for all data
export * from './restaurantes';
export * from './cafes';
export * from './passeios';
export * from './cupons';

import { Lugar } from '../types';
import { getRestaurantes } from './restaurantes';
import { getCafes } from './cafes';
import { getPasseios } from './passeios';

// Combined utility functions
export function getTodosLugares(): Lugar[] {
  return [...getRestaurantes(), ...getCafes(), ...getPasseios()];
}

export function getLugarById(id: string): Lugar | undefined {
  const todosLugares = getTodosLugares();
  return todosLugares.find(l => l.id === id);
}

export function getLugaresPorCategoria(categoria: string): Lugar[] {
  const todosLugares = getTodosLugares();
  return todosLugares.filter(l => l.categoria === categoria);
}

export function getLugaresDestaque(): Lugar[] {
  const todosLugares = getTodosLugares();
  return todosLugares.filter(l => l.destaque === true);
}
