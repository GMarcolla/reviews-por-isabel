// Types and Interfaces for Reviews por Isabel

export type CategoriaLugar = 
  | 'hamburgueria'
  | 'italiano'
  | 'japones'
  | 'pizzaria'
  | 'romantico'
  | 'cafeteria'
  | 'doceria'
  | 'padaria'
  | 'brunch'
  | 'evento'
  | 'concerto'
  | 'festival'
  | 'parque'
  | 'passeio';

export interface Lugar {
  id: string;                    // Unique identifier (slug)
  nome: string;                  // Nome do lugar
  categoria: CategoriaLugar;     // Categoria do lugar
  subcategoria?: string;         // Subcategoria opcional
  descricaoCurta: string;        // Descrição para card (max 150 chars)
  descricaoCompleta: string;     // Descrição detalhada
  imagem: string;                // Path da imagem principal
  imagemAlt: string;             // Alt text da imagem
  galeria?: string[];            // Imagens adicionais
  endereco?: string;             // Endereço completo
  telefone?: string;             // Telefone de contato
  instagram?: string;            // Handle do Instagram
  website?: string;              // URL do website
  horarioFuncionamento?: string; // Horário de funcionamento
  faixaPreco?: 1 | 2 | 3 | 4;   // Faixa de preço ($ a $$$$)
  destaque?: boolean;            // Se é destaque na home
  ordem?: number;                // Ordem de exibição
}

export interface Cupom {
  id: string;                    // Unique identifier
  lugarId: string;               // ID do lugar relacionado
  codigo: string;                // Código do cupom
  descricao: string;             // Descrição do desconto
  validade?: string;             // Data de validade (ISO string)
  termos?: string;               // Termos e condições
  ativo: boolean;                // Se o cupom está ativo
}

export interface RoteiroPeriodo {
  periodo: 'manha' | 'tarde' | 'noite';
  titulo: string;                // Ex: "Café da Manhã Especial"
  descricao: string;             // Descrição da atividade
  lugarId?: string;              // ID do lugar (se aplicável)
  imagem?: string;               // Imagem ilustrativa
  dicas?: string[];              // Dicas adicionais
}

export interface Roteiro {
  titulo: string;                // Ex: "1 Dia em Blumenau"
  descricao: string;             // Introdução do roteiro
  periodos: RoteiroPeriodo[];    // Manhã, Tarde, Noite
}

export interface ContatoFormData {
  nome: string;                  // Nome do usuário
  email: string;                 // Email do usuário
  mensagem: string;              // Mensagem
}

export interface ContatoFormErrors {
  nome?: string;
  email?: string;
  mensagem?: string;
}
