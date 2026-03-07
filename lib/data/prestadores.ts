import { Lugar } from '../types';

export const prestadores: Lugar[] = [
  // Dentista
  {
    id: 'guilherme-nicoletti',
    nome: 'Guilherme Nicoletti',
    categoria: 'dentista',
    descricaoCurta: 'Super atencioso e muito detalhista!',
    descricaoCompleta: 'Super atencioso e muito detalhista! Dentista que oferece atendimento personalizado com foco em qualidade e cuidado. Cupom de desconto disponível!',
    imagem: '/placeholder-prestador.svg',
    imagemAlt: 'Guilherme Nicoletti - Dentista',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DLs0UbiyYeT/?igsh=MXR1YTBuOTlvOXpyZw==',
    faixaPreco: 3,
    destaque: true,
    ordem: 1,
  },

  // Lash Designer
  {
    id: 'clarisse-lash',
    nome: 'Clarisse',
    categoria: 'beleza',
    descricaoCurta: 'Muito caprichosa e é uma fofa comigo!',
    descricaoCompleta: 'Muito caprichosa e é uma fofa comigo! Lash Designer especializada em extensão de cílios com atendimento carinhoso. Cupom de desconto disponível!',
    imagem: '/placeholder-prestador.svg',
    imagemAlt: 'Clarisse - Lash Designer',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DPjeX0hDrkf/?igsh=eHhtaHUzY3BlcDc4',
    faixaPreco: 2,
    destaque: true,
    ordem: 2,
  },

  // Nail Designer
  {
    id: 'mari-nail-designer',
    nome: 'Mari Nail Designer',
    categoria: 'unhas',
    descricaoCurta: 'Super gente boa e faz um trabalho de milhões!',
    descricaoCompleta: 'Super gente boa e faz um trabalho de milhões! Nail Designer com trabalhos impecáveis e atendimento excepcional.',
    imagem: '/placeholder-prestador.svg',
    imagemAlt: 'Mari Nail Designer',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/p/DTbPwe9DzdC/?igsh=djVrdGU0eGZzNHZv',
    faixaPreco: 2,
    ordem: 3,
  },

  // Sobrancelhas, pele e boca
  {
    id: 'lu-kempner-beauty',
    nome: 'Lu Kempner Beauty',
    categoria: 'beleza',
    descricaoCurta: 'Amo que ela é super criativa e entrega um trabalho impecável!',
    descricaoCompleta: 'Amo que ela é super criativa e entrega um trabalho impecável! Especialista em sobrancelhas, tratamentos de pele e harmonização labial. Cupom de desconto disponível!',
    imagem: '/placeholder-prestador.svg',
    imagemAlt: 'Lu Kempner Beauty',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DMi2OZaSsHB/?igsh=Ymlxb3Nkdnp4b2N1',
    faixaPreco: 3,
    destaque: true,
    ordem: 4,
  },

  // Maquiagem e penteado
  {
    id: 'milena-bett',
    nome: 'Milena Bett',
    categoria: 'beleza',
    descricaoCurta: 'Muito querida e sempre entrega makes e penteados lindíssimos!',
    descricaoCompleta: 'Muito querida e sempre entrega makes e penteados lindíssimos! Maquiadora e hair stylist com trabalhos impecáveis para eventos especiais. Cupom de desconto disponível!',
    imagem: '/placeholder-prestador.svg',
    imagemAlt: 'Milena Bett',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DM_MQf4SqMc/?igsh=cTd2ZHJkbGdhMXhk',
    faixaPreco: 3,
    ordem: 5,
  },
  {
    id: 'gisa-martins',
    nome: 'Gisa Martins',
    categoria: 'beleza',
    descricaoCurta: 'Sabe ressaltar a beleza de forma natural, mãos de fada!',
    descricaoCompleta: 'Sabe ressaltar a beleza de forma natural, mãos de fada! Maquiadora especializada em realçar a beleza natural com técnicas delicadas.',
    imagem: '/placeholder-prestador.svg',
    imagemAlt: 'Gisa Martins',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DQE1dm5EaR9/?igsh=Y3BhbHIwZTB4dGph',
    faixaPreco: 3,
    ordem: 6,
  },

  // Arquitetura
  {
    id: 'taas-arquitetura',
    nome: 'TAAS Arquitetura',
    categoria: 'arquiteta',
    descricaoCurta: 'Super atenciosas, detalhistas e entregam tudo MUITO LINDO!',
    descricaoCompleta: 'Super atenciosas, detalhistas e entregam tudo MUITO LINDO! Escritório de arquitetura com projetos personalizados e acompanhamento completo.',
    imagem: '/placeholder-prestador.svg',
    imagemAlt: 'TAAS Arquitetura',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DPXMairjwMf/?igsh=MXd3YjdudTQ0ZGNoeA==',
    faixaPreco: 4,
    destaque: true,
    ordem: 7,
  },

  // Fotografia
  {
    id: 'genuina-fotografia',
    nome: 'Genuína Fotografia',
    categoria: 'servico',
    descricaoCurta: 'Uma fofaaa! Me deixa super confortável e entrega fotos lindas!',
    descricaoCompleta: 'Uma fofaaa! Me deixa super confortável e entrega fotos lindas! Fotógrafa profissional especializada em retratos e eventos com toque especial.',
    imagem: '/placeholder-prestador.svg',
    imagemAlt: 'Genuína Fotografia',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DSnuCPaj6xp/?igsh=bjZzeTU1ZjlyNmls',
    faixaPreco: 3,
    destaque: true,
    ordem: 8,
  },
];

// Utility functions
export function getPrestadores(): Lugar[] {
  return prestadores;
}

export function getPrestadorBySlug(slug: string): Lugar | undefined {
  return prestadores.find(p => p.id === slug);
}

export function getPrestadoresByCategoria(categoria: string): Lugar[] {
  return prestadores.filter(p => p.categoria === categoria);
}

export function getPrestadoresDestaque(): Lugar[] {
  return prestadores.filter(p => p.destaque === true);
}
