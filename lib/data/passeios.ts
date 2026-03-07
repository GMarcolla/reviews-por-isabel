import { Lugar } from '../types';

export const passeios: Lugar[] = [
  // Aluguel de jogos
  {
    id: 'reviravolta-jogos',
    nome: 'Reviravolta Jogos',
    categoria: 'lazer',
    descricaoCurta: 'Vários jogos super legais pra alugar ou jogar lá mesmo!',
    descricaoCompleta: 'Vários jogos super legais pra alugar ou jogar lá mesmo! Perfeito para quem ama jogos de tabuleiro e quer se divertir com amigos e família.',
    imagem: '/placeholder-lazer.svg',
    imagemAlt: 'Reviravolta Jogos',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DHwdmrtyZVo/?igsh=MXVwaHE5MzExcWhtbQ==',
    destaque: true,
    ordem: 1,
  },

  // Passeios
  {
    id: 'tour-nugali',
    nome: 'Tour Nugali',
    categoria: 'lazer',
    descricaoCurta: 'Passeio breve, mas muito legal! E a melhor parte é provar os chocolates, né?!',
    descricaoCompleta: 'Passeio breve, mas muito legal! E a melhor parte é provar os chocolates, né?! Tour pela fábrica de chocolates Nugali em Pomerode com degustação.',
    imagem: '/placeholder-lazer.svg',
    imagemAlt: 'Tour Nugali',
    endereco: 'Pomerode-SC',
    instagramReview: 'https://www.instagram.com/reel/DLdevm7yNM_/?igsh=ODN3NWZlaWl4M3o1',
    destaque: true,
    ordem: 2,
  },
  {
    id: 'candlelight',
    nome: 'Candlelight',
    categoria: 'lazer',
    descricaoCurta: 'É uma experiência bem imersiva, à luz de velas, que quero ir novamente!',
    descricaoCompleta: 'É uma experiência bem imersiva, à luz de velas, que quero ir novamente! Concertos especiais em ambientes únicos iluminados por velas.',
    imagem: '/placeholder-lazer.svg',
    imagemAlt: 'Candlelight',
    endereco: 'Várias cidades',
    instagramReview: 'https://www.instagram.com/reel/DU_mdJ7j6WX/?igsh=ZTUyeG9teGc1MGVp',
    destaque: true,
    ordem: 3,
  },
];

// Utility functions
export function getPasseios(): Lugar[] {
  return passeios;
}

export function getPasseioBySlug(slug: string): Lugar | undefined {
  return passeios.find(p => p.id === slug);
}

export function getPasseiosByCategoria(categoria: string): Lugar[] {
  return passeios.filter(p => p.categoria === categoria);
}

export function getPasseiosDestaque(): Lugar[] {
  return passeios.filter(p => p.destaque === true);
}
