// Types and Interfaces for Reviews por Isabel

// ---------------------------------------------------------------------------
// Tipos de Categoria e Subcategoria
// ---------------------------------------------------------------------------

export interface CategoriaInfo {
  id: string;
  nome: string;
  slug: string;
  rota: string;
  label: string;
  ordem: number;
}

export interface SubcategoriaInfo {
  id: string;
  nome: string;
  categoriaId: string;
  ordem: number;
}

export interface CategoriaComSubcategorias extends CategoriaInfo {
  subcategorias: SubcategoriaInfo[];
}

// ---------------------------------------------------------------------------
// Lugar
// ---------------------------------------------------------------------------

export interface Lugar {
  id: string;
  slug: string;
  nome: string;
  // Relacionamentos (populados via include)
  categoriaId: string | null;
  categoria: CategoriaInfo | null;
  subcategoriaId?: string | null;
  subcategoria?: SubcategoriaInfo | null;

  // Conteúdo
  descricaoCurta: string;
  descricaoCompleta: string;
  imagem: string;
  imagemAlt: string;
  galeria?: string[] | null;
  // Localização
  endereco?: string | null;
  cidade?: string | null;
  bairro?: string | null;
  enderecoGoogleMaps?: string | null;
  enderecoGoogleMapsLabel?: string | null;
  enderecoGoogleMaps2?: string | null;
  enderecoGoogleMaps2Label?: string | null;
  // Contato
  telefone?: string | null;
  instagram?: string | null;
  instagramReview?: string | null;
  website?: string | null;
  // Informações
  horarioFuncionamento?: string | null;
  faixaPreco?: number | null;
  destaque?: boolean | null;
  ordem?: number | null;
}

// ---------------------------------------------------------------------------
// Cupom
// ---------------------------------------------------------------------------

export interface Cupom {
  id: string;
  lugarId: string;
  lugarNome: string;
  categoria: string;
  subcategoria: string;
  codigo: string;
  descricao: string;
  validade?: string;
  termos?: string;
  ativo: boolean;
}

// ---------------------------------------------------------------------------
// Roteiro
// ---------------------------------------------------------------------------

export interface RoteiroPeriodo {
  periodo: 'manha' | 'almoco' | 'tarde' | 'extras' | 'noite';
  titulo: string;
  descricao: string;
  lugarId?: string;
  imagem?: string;
  dicas?: string[];
  enderecos?: string[];
  horarios?: string[];
}

export interface Roteiro {
  titulo: string;
  descricao: string;
  periodos: RoteiroPeriodo[];
}

// ---------------------------------------------------------------------------
// Formulários
// ---------------------------------------------------------------------------

export interface ContatoFormData {
  nome: string;
  email: string;
  mensagem: string;
}

export interface ContatoFormErrors {
  nome?: string;
  email?: string;
  mensagem?: string;
}

// ---------------------------------------------------------------------------
// Mapa Interativo
// ---------------------------------------------------------------------------

export interface Place {
  nome: string;
  categoria: string;
  subcategoria: string;
  regiao: string;
  avaliacao: string;
  cupom?: string;
  mapsLink: string;
  lat: number;
  lng: number;
}
