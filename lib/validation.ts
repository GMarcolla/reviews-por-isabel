import { ContatoFormData, ContatoFormErrors } from './types';

/**
 * Valida formato de email usando regex
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida todos os campos do formulário de contato
 * Retorna objeto com mensagens de erro para campos inválidos
 */
export function validateContatoForm(data: ContatoFormData): ContatoFormErrors {
  const errors: ContatoFormErrors = {};
  
  // Validar nome
  if (!data.nome.trim()) {
    errors.nome = 'Este campo é obrigatório';
  }
  
  // Validar email
  if (!data.email.trim()) {
    errors.email = 'Este campo é obrigatório';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Por favor, insira um email válido';
  }
  
  // Validar mensagem
  if (!data.mensagem.trim()) {
    errors.mensagem = 'Este campo é obrigatório';
  } else if (data.mensagem.trim().length < 10) {
    errors.mensagem = 'A mensagem deve ter pelo menos 10 caracteres';
  }
  
  return errors;
}
