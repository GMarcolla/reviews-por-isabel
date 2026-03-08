// Types and Interfaces for Reviews por Isabel

export type CategoriaLugar = 
  | 'hamburgueria'
  | 'esfirraria'
  | 'padaria'
  | 'gelateria'
  | 'pastelaria'
  | 'empadas'
  | 'hotdog'
  | 'germanico'
  | 'buffet'
  | 'bar'
  | 'coreano'
  | 'mexicano'
  | 'italiano'
  | 'japones'
  | 'pizzaria'
  | 'romantico'
  | 'cafeteria'
  | 'doceria'
  | 'brunch'
  | 'evento'
  | 'concerto'
  | 'festival'
  | 'parque'
  | 'lazer'
  | 'dentista'
  | 'arquiteta'
  | 'unhas'
  | 'beleza'
  | 'servico'
  | 'moda'
  | 'decoracao'
  | 'livraria'
  | 'loja';

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
  enderecoGoogleMaps?: string;   // Link do Google Maps (endereço 1)
  enderecoGoogleMapsLabel?: string; // Descrição do endereço 1 (ex: "Hamburgueria")
  enderecoGoogleMaps2?: string;  // Link do Google Maps (endereço 2)
  enderecoGoogleMaps2Label?: string; // Descrição do endereço 2 (ex: "Pizzaria")
  telefone?: string;             // Telefone de contato
  instagram?: string;            // Handle/URL do Instagram do estabelecimento
  instagramReview?: string;      // URL do vídeo de review no Instagram
  website?: string;              // URL do website
  horarioFuncionamento?: string; // Horário de funcionamento
  faixaPreco?: 1 | 2 | 3 | 4;   // Faixa de preço ($ a $$$$)
  destaque?: boolean;            // Se é destaque na home
  ordem?: number;                // Ordem de exibição
}

export interface Cupom {
  id: string;                    // Unique identifier
  lugarId: string;               // ID do lugar relacionado
  lugarNome: string;             // Nome do lugar
  categoria: string;             // Categoria (restaurantes, cafes, lojas, prestadores)
  subcategoria: string;          // Subcategoria específica
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

// Interface para o mapa interativo
export interface Place {
  nome: string;              // Nome do lugar (ex: "Cafehaus - Centro")
  categoria: string;         // Categoria principal (ex: "Cafés e docerias")
  subcategoria: string;      // Subcategoria (ex: "Cafeteria")
  regiao: string;            // Região (ex: "Blumenau-SC")
  avaliacao: string;         // Avaliação da Isabel
  cupom?: string;            // Cupom de desconto (opcional)
  mapsLink: string;          // Link do Google Maps
  lat: number;               // Latitude
  lng: number;               // Longitude
}
