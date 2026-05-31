import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { prisma } from "@/lib/prisma";

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

/**
 * Gera um slug a partir de um título
 * Remove acentos, caracteres especiais e substitui espaços por hífens
 */
export function generateSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .trim();
}

/**
 * Gera um slug único verificando se já existe no banco de dados
 * Se o slug já existir, adiciona um número ao final
 */
export async function generateUniqueSlug(titulo: string): Promise<string> {
  let slug = generateSlug(titulo);
  let counter = 1;

  while (await prisma.receita.findUnique({ where: { slug } })) {
    slug = `${generateSlug(titulo)}-${counter}`;
    counter++;
  }

  return slug;
}
