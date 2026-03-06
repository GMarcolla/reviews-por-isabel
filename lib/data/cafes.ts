import { Lugar } from '../types';

export const cafes: Lugar[] = [
  // Cafeterias
  {
    id: 'cafe-cultura',
    nome: 'Café Cultura',
    categoria: 'cafeteria',
    descricaoCurta: 'Cafés especiais e ambiente acolhedor para trabalhar',
    descricaoCompleta: 'Café Cultura é o lugar perfeito para quem busca um café de qualidade em ambiente tranquilo. Grãos selecionados, métodos de preparo especiais e espaço confortável.',
    imagem: '/images/cafes/cafe-cultura.jpg',
    imagemAlt: 'Interior aconchegante do Café Cultura',
    endereco: 'Rua Nereu Ramos, 234 - Centro',
    telefone: '(47) 3333-6666',
    instagram: '@cafecultura',
    horarioFuncionamento: 'Seg-Sex: 8h-19h, Sáb: 9h-18h',
    faixaPreco: 2,
    destaque: true,
    ordem: 1,
  },
  // Docerias
  {
    id: 'doce-encanto',
    nome: 'Doce Encanto',
    categoria: 'doceria',
    descricaoCurta: 'Doces artesanais e bolos personalizados',
    descricaoCompleta: 'Doce Encanto é especializada em doces finos e bolos personalizados. Cada criação é uma obra de arte comestível, perfeita para presentear ou se presentear.',
    imagem: '/images/cafes/doce-encanto.jpg',
    imagemAlt: 'Vitrine de doces do Doce Encanto',
    endereco: 'Rua Bahia, 567 - Victor Konder',
    telefone: '(47) 3333-7777',
    instagram: '@doceencanto',
    horarioFuncionamento: 'Ter-Sáb: 10h-19h',
    faixaPreco: 2,
    ordem: 2,
  },
  // Padarias Especiais
  {
    id: 'padaria-artesanal',
    nome: 'Padaria Artesanal',
    categoria: 'padaria',
    descricaoCurta: 'Pães artesanais e fermentação natural',
    descricaoCompleta: 'Padaria Artesanal trabalha com fermentação natural e ingredientes orgânicos. Pães crocantes, croissants amanteigados e café da manhã completo.',
    imagem: '/images/cafes/padaria-artesanal.jpg',
    imagemAlt: 'Pães artesanais frescos',
    endereco: 'Rua Pomerode, 890 - Velha',
    telefone: '(47) 3333-8888',
    instagram: '@padariaartesanal',
    horarioFuncionamento: 'Ter-Dom: 7h-14h',
    faixaPreco: 2,
    destaque: true,
    ordem: 3,
  },
  // Brunch
  {
    id: 'brunch-club',
    nome: 'Brunch Club',
    categoria: 'brunch',
    descricaoCurta: 'Brunch completo em ambiente instagramável',
    descricaoCompleta: 'Brunch Club oferece a melhor experiência de brunch da cidade. Menu variado, drinks especiais e decoração encantadora para fotos perfeitas.',
    imagem: '/images/cafes/brunch-club.jpg',
    imagemAlt: 'Mesa de brunch colorida',
    endereco: 'Rua Joinville, 432 - Centro',
    telefone: '(47) 3333-9999',
    instagram: '@brunchclub',
    website: 'https://brunchclub.com.br',
    horarioFuncionamento: 'Sáb-Dom: 9h-15h (reservas recomendadas)',
    faixaPreco: 3,
    destaque: true,
    ordem: 4,
  },
];

// Utility functions
export function getCafes(): Lugar[] {
  return cafes;
}

export function getCafeBySlug(slug: string): Lugar | undefined {
  return cafes.find(c => c.id === slug);
}

export function getCafesByCategoria(categoria: string): Lugar[] {
  return cafes.filter(c => c.categoria === categoria);
}

export function getCafesDestaque(): Lugar[] {
  return cafes.filter(c => c.destaque === true);
}
