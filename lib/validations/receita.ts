import { z } from 'zod';

/**
 * Schema de validação para receitas
 * Usado tanto no cliente quanto no servidor
 */
export const receitaSchema = z.object({
  titulo: z
    .string()
    .min(3, 'Título deve ter no mínimo 3 caracteres')
    .max(100, 'Título deve ter no máximo 100 caracteres'),
  convidado: z
    .string()
    .min(2, 'Nome do convidado é obrigatório')
    .max(100, 'Nome do convidado deve ter no máximo 100 caracteres'),
  ingredientes: z
    .string()
    .min(10, 'Liste os ingredientes da receita')
    .max(5000, 'Descrição de ingredientes muito longa'),
  passos: z
    .string()
    .min(20, 'Descreva os passos da receita')
    .max(5000, 'Descrição de passos muito longa'),
  opiniao: z
    .string()
    .min(10, 'Compartilhe sua opinião sobre a receita')
    .max(2000, 'Opinião muito longa'),
  imagem: z
    .string()
    .url('URL da imagem inválida')
    .optional()
    .or(z.literal('')),
});

/**
 * Tipo inferido do schema Zod
 * Usado para tipagem de formulários e validações
 */
export type ReceitaInput = z.infer<typeof receitaSchema>;
