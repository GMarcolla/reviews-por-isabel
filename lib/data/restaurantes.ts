import { Lugar } from '../types';

export const restaurantes: Lugar[] = [
  // Hamburguerias
  {
    id: 'alexandria',
    nome: 'Alexandria',
    categoria: 'hamburgueria',
    descricaoCurta: 'É ótimo pra experimentar vários sabores de hambúrguer e comer à vontade!',
    descricaoCompleta: 'É ótimo pra experimentar vários sabores de hambúrguer e comer à vontade! Um lugar perfeito para quem ama hambúrguer e quer experimentar diferentes combinações.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Alexandria Hamburgueria',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/p8ifE91UjfSCqonL7',
    instagramReview: 'https://www.instagram.com/reel/DLK5r8xMxsU/?igsh=NGxvaDJidW14NXh1',
    destaque: true,
    ordem: 1,
  },
  {
    id: 'hope-burger-pizza',
    nome: 'Hope Burger Pizza',
    categoria: 'hamburgueria',
    descricaoCurta: 'Hambúrgueres e pizzas excelentes e com entrega rápida!',
    descricaoCompleta: 'Hambúrgueres e pizzas excelentes e com entrega rápida! Perfeito para aquela fome que não pode esperar.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Hope Burger Pizza',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/a3qVAdNWD9KVWmwb7',
    enderecoGoogleMapsLabel: 'Hamburgueria',
    enderecoGoogleMaps2: 'https://maps.app.goo.gl/u6CmMEy4nADBRDFD7',
    enderecoGoogleMaps2Label: 'Pizzaria',
    instagramReview: 'https://www.instagram.com/reel/DTJMoqEj-km/?igsh=MTY0cDlmem1iZTMzYg==',
    ordem: 2,
  },
  {
    id: 'arena-dog-burger',
    nome: 'Arena Dog Burger',
    categoria: 'hamburgueria',
    descricaoCurta: 'Hambúrgueres muito saborosos, e a estética deles é linda!',
    descricaoCompleta: 'Hambúrgueres muito saborosos, e a estética deles é linda! Um lugar que combina sabor com visual impecável.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Arena Dog Burger',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/4v2wEUf41fZXVFw96',
    instagramReview: 'https://www.instagram.com/reel/DI7CSpmSAJO/?igsh=MTBnMjdteGxud2tiZg==',
    ordem: 3,
  },
  {
    id: 'lu-e-ale-hg',
    nome: 'Lu e Ale HG',
    categoria: 'hamburgueria',
    descricaoCurta: 'Eu amei a ideia de um kit de hambúrgueres pra fazer em casa, genial!',
    descricaoCompleta: 'Eu amei a ideia de um kit de hambúrgueres pra fazer em casa, genial! Perfeito para quem quer a experiência de um hambúrguer artesanal no conforto de casa.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Lu e Ale HG',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/Z6vZkrFPkAoL6ayi6',
    instagramReview: 'https://www.instagram.com/reel/DNjSriYS2O0/?igsh=MTN1b2prMnNtdW1waw==',
    ordem: 4,
  },
  {
    id: 'smash-in-box',
    nome: 'Smash In Box',
    categoria: 'hamburgueria',
    descricaoCurta: 'Hambúrgueres bem temperados, e a ideia de vir uma BISNAGA de maionese me conquistou!',
    descricaoCompleta: 'Hambúrgueres bem temperados, e a ideia de vir uma BISNAGA de maionese me conquistou! Inovação e sabor em cada mordida.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Smash In Box',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/UaNURh1jGMk58uyP8',
    instagramReview: 'https://www.instagram.com/reel/DUDvirWke4G/?igsh=Nm13eWRjNGxzb2dh',
    ordem: 5,
  },
  {
    id: 'rota-377',
    nome: 'Rota 377',
    categoria: 'hamburgueria',
    descricaoCurta: 'Eu amei a estética vintage do lugar, e a comida é maravilhosa!',
    descricaoCompleta: 'Eu amei a estética vintage do lugar, e a comida é maravilhosa! Um espaço charmoso que combina hambúrgueres deliciosos em um ambiente retrô.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Rota 377',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/pCnC3LMzM9sR6btA9',
    instagramReview: 'https://www.instagram.com/reel/DHb3inxSYsr/?igsh=bzg0N25veDYzN3No',
    destaque: true,
    ordem: 6,
  },

  // Esfirraria
  {
    id: 'emporio-ames-esfiharia',
    nome: 'Empório Ames Esfiharia',
    categoria: 'esfirraria',
    descricaoCurta: 'Comemorei meu aniversário lá, eu super indico! AMOOO!',
    descricaoCompleta: 'Comemorei meu aniversário lá, eu super indico! AMOOO! Um lugar especial para momentos especiais, com esfihas deliciosas.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Empório Ames Esfiharia',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/24MxZABnftZo9Wg19',
    instagramReview: 'https://www.instagram.com/reel/DNROEc-S-Rw/?igsh=MW1vNzJ0dThyb2J2dg==',
    destaque: true,
    ordem: 18,
  },

  // Padaria
  {
    id: 'bread-king',
    nome: 'Bread King',
    categoria: 'padaria',
    descricaoCurta: 'Opção super prática pra ter uma padaria em casa, 10/10.',
    descricaoCompleta: 'Opção super prática pra ter uma padaria em casa, 10/10. Padaria congelada que traz a experiência de pães fresquinhos para sua casa.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Bread King',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/segwyNLNdydHDDgY8',
    instagramReview: 'https://www.instagram.com/reel/DHJM_fqRmyj/?igsh=MWMzdzQ3OXgzcGRzbg==',
    ordem: 18,
  },

  // Gelateria
  {
    id: 'gelato-borelli',
    nome: 'Gelato Borelli',
    categoria: 'gelateria',
    descricaoCurta: 'Simplesmente provem! Surreal de bom.',
    descricaoCompleta: 'Simplesmente provem! Surreal de bom. Gelatos artesanais que vão te surpreender a cada colherada.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Gelato Borelli',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/6tRy8wiCATAmVM7y8',
    instagramReview: 'https://www.instagram.com/reel/DHi85rbJYrB/?igsh=aXMxcjA1cGFwcnEy',
    destaque: true,
    ordem: 18,
  },

  // Pastelaria
  {
    id: 'king-pastelaria',
    nome: 'King Pastelaria',
    categoria: 'pastelaria',
    descricaoCurta: 'Provem e tirem suas conclusões, eu amei!',
    descricaoCompleta: 'Provem e tirem suas conclusões, eu amei! Pastéis deliciosos que valem cada mordida. Cupom de desconto disponível!',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'King Pastelaria',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/dxy4Nw73ycnmUPxs6',
    instagramReview: 'https://www.instagram.com/reel/DK5T8lcShDy/?igsh=am54OGlzd3d1MGs4',
    faixaPreco: 2,
    ordem: 18,
  },

  // Empadas
  {
    id: 'empadaria-do-reino',
    nome: 'Empadaria do Reino',
    categoria: 'empadas',
    descricaoCurta: 'Tudo muito saboroso, dá pra ver que é feito com muito carinho.',
    descricaoCompleta: 'Tudo muito saboroso, dá pra ver que é feito com muito carinho. Empadas e empadões artesanais feitos com amor. Descontos especiais disponíveis!',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Empadaria do Reino',
    endereco: 'Blumenau-SC',
    instagramReview: 'https://www.instagram.com/reel/DL-5AiGSzw4/?igsh=MTdoY2R0cHN6cWduMQ==',
    faixaPreco: 2,
    destaque: true,
    ordem: 18,
  },

  // Hotdog
  {
    id: 'senhor-salsicha',
    nome: 'Senhor Salsicha',
    categoria: 'hotdog',
    descricaoCurta: 'Comida muito boa, bem temperadinha!',
    descricaoCompleta: 'Comida muito boa, bem temperadinha! Hot dogs artesanais com tempero especial. Cupom de desconto disponível!',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Senhor Salsicha',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/aYPCwEFfugaXZ7by8',
    instagramReview: 'https://www.instagram.com/reel/DM3dfimSD8R/?igsh=MTdvbXdpeHR3dndweA==',
    faixaPreco: 2,
    ordem: 18,
  },

  // Restaurante Germânico
  {
    id: 'norden',
    nome: 'Norden',
    categoria: 'germanico',
    descricaoCurta: 'Ambiente super temático com pratos super bem servidos!',
    descricaoCompleta: 'Ambiente super temático com pratos super bem servidos! Experiência completa da culinária germânica em Blumenau.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Norden',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/yZ9kFYiAC9F371r19',
    instagramReview: 'https://www.instagram.com/reel/DOb5Amwj0z7/?igsh=MTgybWNuOThrZHl3Mw==',
    faixaPreco: 3,
    destaque: true,
    ordem: 18,
  },
  {
    id: 'alemao-batata',
    nome: 'Alemão Batata',
    categoria: 'germanico',
    descricaoCurta: 'Eu AMO a batata recheada e o Schnitzel deles!',
    descricaoCompleta: 'Eu AMO a batata recheada e o Schnitzel deles! Comida alemã autêntica com os melhores pratos tradicionais.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Alemão Batata',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/TQAsxvYymMGZnw7o8',
    instagramReview: 'https://www.instagram.com/reel/DOb5Amwj0z7/?igsh=MTgybWNuOThrZHl3Mw==',
    faixaPreco: 2,
    ordem: 18,
  },

  // Buffet
  {
    id: 'delicia-do-vale',
    nome: 'Delícia do Vale',
    categoria: 'buffet',
    descricaoCurta: 'Buffet que vale muito a pena, com muitas opções gostosas!',
    descricaoCompleta: 'Buffet que vale muito a pena, com muitas opções gostosas! Variedade e qualidade em um só lugar.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Delícia do Vale',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/82JNZ63ayVkuDzqz5',
    instagramReview: 'https://www.instagram.com/reel/DOmNd6dj8Il/?igsh=MTdkNXNhZGI0anFtaA==',
    faixaPreco: 2,
    ordem: 18,
  },

  // Bar e Restaurante
  {
    id: 'struck-bier',
    nome: 'Struck Bier',
    categoria: 'bar',
    descricaoCurta: 'A ideia do rodízio de boteco é muito legal e tu ainda consegue comprar chope por ml!',
    descricaoCompleta: 'A ideia do rodízio de boteco é muito legal e tu ainda consegue comprar chope por ml! Conceito inovador que une boa comida e cerveja artesanal.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Struck Bier',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/6G6rwJ3AQQP39nux9',
    instagramReview: 'https://www.instagram.com/reel/DUY-7erj2hv/?igsh=MXN3d3d6ZnRkbmE5Nw==',
    faixaPreco: 2,
    ordem: 18,
  },

  // Restaurante Coreano
  {
    id: 'bapjin',
    nome: 'Bapjin',
    categoria: 'coreano',
    descricaoCurta: 'Comida saborosa, lugar aconchegante e atendimento 1000/10!',
    descricaoCompleta: 'Comida saborosa, lugar aconchegante e atendimento 1000/10! Autêntica culinária coreana com atendimento excepcional.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Bapjin',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/o8RUyTC9jhthPnDb6',
    instagramReview: 'https://www.instagram.com/reel/DUeI5trD5zT/?igsh=MW40Mm54bzJjcmhjYg==',
    faixaPreco: 3,
    destaque: true,
    ordem: 18,
  },

  // Restaurante Mexicano
  {
    id: 'nachoman',
    nome: 'Nachoman',
    categoria: 'mexicano',
    descricaoCurta: 'Eu adoro que lá é tudo colorido, e a comida é perfeita!',
    descricaoCompleta: 'Eu adoro que lá é tudo colorido, e a comida é perfeita! Comida mexicana vibrante e saborosa em um ambiente alegre.',
    imagem: '/placeholder-restaurante.svg',
    imagemAlt: 'Nachoman',
    endereco: 'Blumenau-SC',
    enderecoGoogleMaps: 'https://maps.app.goo.gl/DfTWu7g2JfXa4K6a7',
    instagramReview: 'https://www.instagram.com/reel/DVMfQGMj3Q2/?igsh=MWZoN3R2NmdidnN1Mw==',
    faixaPreco: 2,
    destaque: true,
    ordem: 18,
  },
];

// Utility functions
export function getRestaurantes(): Lugar[] {
  return restaurantes;
}

export function getRestauranteBySlug(slug: string): Lugar | undefined {
  return restaurantes.find(r => r.id === slug);
}

export function getRestaurantesByCategoria(categoria: string): Lugar[] {
  return restaurantes.filter(r => r.categoria === categoria);
}

export function getRestaurantesDestaque(): Lugar[] {
  return restaurantes.filter(r => r.destaque === true);
}
