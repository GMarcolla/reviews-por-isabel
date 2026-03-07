import { Lugar } from '../types';

export const cafes: Lugar[] = [
  // Cafeteria
  {
    id: 'bari-caffe',
    nome: 'Bari Caffe',
    categoria: 'cafeteria',
    descricaoCurta: 'Pensa numa cafeteria fofa! Toda cor de rosa, tudo muito lindo!',
    descricaoCompleta: 'Pensa numa cafeteria fofa! Toda cor de rosa, tudo muito lindo! Um espaço instagramável com cafés especiais e um ambiente acolhedor.',
    imagem: '/placeholder-cafe.svg',
    imagemAlt: 'Bari Caffe',
    endereco: 'Jaraguá-SC',
    instagramReview: 'https://www.instagram.com/reel/DMgTRV6SVJq/?igsh=MWI5N3pzaHB6czV0',
    destaque: true,
    ordem: 1,
  },
  {
    id: 'cafehaus',
    nome: 'Cafehaus',
    categoria: 'cafeteria',
    descricaoCurta: 'Zero defeitos, sou apaixonada na torta glória invertida e na torta de maracujá!',
    descricaoCompleta: 'Zero defeitos, sou apaixonada na torta glória invertida e na torta de maracujá! Cafeteria com tortas artesanais incríveis e café de primeira qualidade.',
    imagem: '/placeholder-cafe.svg',
    imagemAlt: 'Cafehaus',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DOb5Amwj0z7/?igsh=MTgybWNuOThrZHl3Mw==',
    destaque: true,
    ordem: 2,
  },

  // Bolos e Doces
  {
    id: 'rose-kemer',
    nome: 'Rose Kemer',
    categoria: 'doceria',
    descricaoCurta: 'Doces muito saborosos e caprichados!',
    descricaoCompleta: 'Doces muito saborosos e caprichados! Doces artesanais feitos com muito carinho e ingredientes de qualidade. Cupom de desconto disponível!',
    imagem: '/placeholder-cafe.svg',
    imagemAlt: 'Rose Kemer',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DMLuef2S2kj/?igsh=dGwwMDN4ampvbHN0',
    faixaPreco: 2,
    ordem: 3,
  },
  {
    id: 'fatias-nobre',
    nome: 'Fatias Nobre',
    categoria: 'doceria',
    descricaoCurta: 'Delivery de fatias de bolo, bem gostosas!',
    descricaoCompleta: 'Delivery de fatias de bolo, bem gostosas! Perfeito para quando bate aquela vontade de um bolo caseiro sem precisar comprar um bolo inteiro.',
    imagem: '/placeholder-cafe.svg',
    imagemAlt: 'Fatias Nobre',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DOhCHHYD1We/?igsh=MXV2cDIwN2QwM2NqMg==',
    faixaPreco: 2,
    ordem: 4,
  },

  // Cookies
  {
    id: 'cookie-pink',
    nome: 'Cookie Pink',
    categoria: 'doceria',
    descricaoCurta: 'O lugar é MUITO fofo, e os cookies são todos uma delícia!',
    descricaoCompleta: 'O lugar é MUITO fofo, e os cookies são todos uma delícia! Cookies artesanais em um ambiente cor de rosa encantador.',
    imagem: '/placeholder-cafe.svg',
    imagemAlt: 'Cookie Pink',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DSQlbWfDz5b/?igsh=anhjbTZ5bXgyejBn',
    destaque: true,
    ordem: 5,
  },

  // Donuts
  {
    id: 'donuts-com-amor',
    nome: 'Donuts Com Amor',
    categoria: 'doceria',
    descricaoCurta: 'Estética super meiga e imersiva, os donuts têm sabores bem diferentes e são deliciosos!',
    descricaoCompleta: 'Estética super meiga e imersiva, os donuts têm sabores bem diferentes e são deliciosos! Donuts artesanais com sabores criativos em um ambiente instagramável.',
    imagem: '/placeholder-cafe.svg',
    imagemAlt: 'Donuts Com Amor',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DUwKV2BDzfq/?igsh=anR6ZXprb2R4bGNr',
    destaque: true,
    ordem: 6,
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
