import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes CSS com suporte a Tailwind
 * Útil para mesclar classes condicionais e evitar conflitos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retorna classes de grid responsivo baseado no número de itens
 */
export function getGridColumns(itemCount: number): string {
  if (itemCount === 1) return "grid-cols-1";
  if (itemCount === 2) return "grid-cols-1 md:grid-cols-2";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
}
