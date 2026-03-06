import { Lugar } from '../types';

export const restaurantes: Lugar[] = [
  // Hamburguerias
  {
    id: 'burger-house',
    nome: 'Burger House',
    categoria: 'hamburgueria',
    descricaoCurta: 'Hambúrgueres artesanais com ingredientes selecionados',
    descricaoCompleta: 'A Burger House oferece hambúrgueres artesanais preparados com carnes nobres e ingredientes frescos. Ambiente descontraído e moderno, perfeito para um lanche especial.',
    imagem: '/images/restaurantes/burger-house.jpg',
    imagemAlt: 'Hambúrguer artesanal da Burger House',
    endereco: 'Rua XV de Novembro, 123 - Centro',
    telefone: '(47) 3333-1111',
    instagram: '@burgerhouse',
    horarioFuncionamento: 'Ter-Dom: 18h-23h',
    faixaPreco: 2,
    destaque: true,
    ordem: 1,
  },
  // Italianos
  {
    id: 'villa-borghi',
    nome: 'Villa Borghi',
    categoria: 'italiano',
    descricaoCurta: 'Autêntica culinária italiana em ambiente elegante',
    descricaoCompleta: 'O Villa Borghi traz a verdadeira experiência da culinária italiana para Blumenau. Massas frescas, risotos cremosos e vinhos selecionados em um ambiente sofisticado.',
    imagem: '/images/restaurantes/villa-borghi.jpg',
    imagemAlt: 'Interior elegante do Villa Borghi',
    endereco: 'Rua Itajaí, 456 - Velha',
    telefone: '(47) 3333-2222',
    instagram: '@villaborghi',
    website: 'https://villaborghi.com.br',
    horarioFuncionamento: 'Ter-Sáb: 19h-23h, Dom: 12h-15h',
    faixaPreco: 3,
    destaque: true,
    ordem: 2,
  },
  // Japoneses
  {
    id: 'sushi-zen',
    nome: 'Sushi Zen',
    categoria: 'japones',
    descricaoCurta: 'Culinária japonesa contemporânea com peixes frescos',
    descricaoCompleta: 'Sushi Zen combina técnicas tradicionais japonesas com toques contemporâneos. Peixes frescos, ambiente zen e atendimento impecável.',
    imagem: '/images/restaurantes/sushi-zen.jpg',
    imagemAlt: 'Combinado de sushi do Sushi Zen',
    endereco: 'Rua 7 de Setembro, 789 - Centro',
    telefone: '(47) 3333-3333',
    instagram: '@sushizen',
    horarioFuncionamento: 'Ter-Dom: 18h30-23h',
    faixaPreco: 3,
    ordem: 3,
  },
  // Pizzarias
  {
    id: 'pizzaria-napolitana',
    nome: 'Pizzaria Napolitana',
    categoria: 'pizzaria',
    descricaoCurta: 'Pizzas artesanais no forno a lenha',
    descricaoCompleta: 'Pizzas napolitanas autênticas preparadas em forno a lenha. Massa fermentada naturalmente e ingredientes importados da Itália.',
    imagem: '/images/restaurantes/pizzaria-napolitana.jpg',
    imagemAlt: 'Pizza margherita saindo do forno',
    endereco: 'Rua Amazonas, 321 - Garcia',
    telefone: '(47) 3333-4444',
    instagram: '@pizzarianapolitana',
    horarioFuncionamento: 'Qua-Dom: 18h-23h',
    faixaPreco: 2,
    ordem: 4,
  },
  // Restaurantes Românticos
  {
    id: 'le-jardin',
    nome: 'Le Jardin',
    categoria: 'romantico',
    descricaoCurta: 'Experiência gastronômica romântica em jardim encantador',
    descricaoCompleta: 'Le Jardin oferece uma experiência única em um jardim iluminado. Menu degustação, vinhos especiais e ambiente perfeito para ocasiões especiais.',
    imagem: '/images/restaurantes/le-jardin.jpg',
    imagemAlt: 'Jardim iluminado do Le Jardin',
    endereco: 'Rua das Palmeiras, 555 - Ponta Aguda',
    telefone: '(47) 3333-5555',
    instagram: '@lejardinblumenau',
    website: 'https://lejardin.com.br',
    horarioFuncionamento: 'Qui-Sáb: 19h-23h (reservas recomendadas)',
    faixaPreco: 4,
    destaque: true,
    ordem: 5,
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
