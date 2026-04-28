import { Roteiro } from '../types';

export const roteiro: Roteiro = {
  titulo: 'Um Dia Perfeito em Blumenau',
  descricao: 'Descubra o melhor de Blumenau em um roteiro de um dia pensado por mim!',
  periodos: [
    // Manhã
    {
      periodo: 'manha',
      titulo: 'Café da Manhã na Confeitaria Cafehaus',
      descricao: 'Lá você encontra um café colonial super completo com várias delícias! Incluindo a famosa torta Glória (morango com chocolate). Eu indico de olhos fechados!',
      imagem: '/roteiro/cafe-haus-roteiro.jpg',
      dicas: [
        'Lembre-se de fazer reserva!',
        'Pergunte se é no kg ou buffet livre.'
      ],
      lugarId: 'cafehaus'
    },
    {
      periodo: 'manha',
      titulo: 'Passeio pela Rua XV de Novembro',
      descricao: 'A Rua XV de Novembro é o cartão-postal de Blumenau. Possui construções em estilo enxaimel e várias lojinhas. Ideal para passear a pé e tirar fotos.',
      imagem: '/roteiro/rua-xv-roteiro.jpg',
      dicas: [
        'Em alguns domingos acontecem feiras de produtos locais.'
      ],
      enderecos: [
        'R. XV de Novembro - Centro, Blumenau - SC, 89010-001'
      ]
    },
    // Almoço
    {
      periodo: 'almoco',
      titulo: 'Almoço no Alemão Batata Choperia',
      descricao: 'Pratos típicos germânicos à la carte: Batata recheada, Marreco recheado, Costela suína, Peito de pato, Eisbein à pururuca e pratos executivos. Recomendo bastante!',
      imagem: '/roteiro/alemao-batata-roteiro.jpg',
      lugarId: 'alemao-batata'
    },
    // Tarde
    {
      periodo: 'tarde',
      titulo: 'Passeio na Vila Germânica',
      descricao: 'Um dos lugares mais icônicos da cidade. Mesmo fora da Oktoberfest, vale a visita para ver a arquitetura típica, tirar fotos e provar produtos locais. Lá você encontra lojas de artesanato, cafeterias e restaurantes típicos.',
      imagem: '/roteiro/vila-germanica-roteiro.jpg',
      enderecos: [
        'R. Alberto Stein, 199 - Velha, Blumenau - SC, 89036-200'
      ],
      dicas: [
        'Se você tiver sorte pode encontrar com a realeza da Oktoberfest!'
      ]
    },
    // Extras
    {
      periodo: 'extras',
      titulo: 'Parque Ramiro Ruediger',
      descricao: 'Um dos maiores parques da cidade. Ótimo para caminhar e fica ao lado da Vila Germânica!',
      imagem: '/roteiro/parque-ramiro-roteiro.jpg',
      enderecos: [
        'R. Alberto Stein, 416 - Velha, Blumenau - SC, 89036-200'
      ],
      horarios: [
        '05h00 às 00h00'
      ],
      creditoImagem: '@vilagermanicaoficial'
    },
    {
      periodo: 'extras',
      titulo: 'Museu da Cerveja',
      descricao: 'Mostra a tradição alemã e a produção artesanal da região. Pequeno, mas ideal para uma visita rápida.',
      imagem: '/roteiro/museu-cerveja-roteiro.jpg',
      enderecos: [
        'R. XV de Novembro, 160 - Centro, Blumenau - SC, 89010-000'
      ],
      horarios: [
        '09h30 às 16h00'
      ],
      creditoImagem: '@museudacervejablumenau'
    },
    {
      periodo: 'extras',
      titulo: 'Magia de Natal',
      descricao: 'Evento com desfile, Vila Germânica decorada, show de luzes, Casa do Papai Noel, pista de patinação e espaços para fotos.',
      imagem: '/roteiro/magia-natal-roteiro.jpg',
      enderecos: [
        'R. Alberto Stein, 199 - Velha, Blumenau - SC, 89036-200'
      ],
      dicas: [
        'Evento de final de ano (Natal), verifique as datas no site oficial.',
      ],
      creditoImagem: '@magiadenatal'
    },
    // Noite
    {
      periodo: 'noite',
      titulo: 'Hope Burguer / Pizza',
      descricao: 'Se você estiver cansado e quiser pedir um delivery aqui é uma ótima opção! Serve tanto hambúrgueres quanto pizzas.',
      lugarId: 'hope-burger-pizza',
      imagem: '/roteiro/hope-burguer-pizza-roteiro.jpg'
    },
    {
      periodo: 'noite',
      titulo: 'Arena Dog Burger',
      descricao: 'Restaurante inspirado na Grécia. Você encontra hambúrgueres artesanais, X-saladas, hot dogs, drinks e sobremesas.',
      lugarId: 'arena-dog-burger',
      imagem: '/roteiro/arena-roteiro.png'
    },
    {
      periodo: 'noite',
      titulo: 'Empório Ames Esfiharia',
      descricao: 'Lugar muito aconchegante! Opções de esfirras à la carte e rodízio. Eu amo!',
      lugarId: 'emporio-ames-esfiharia',
      imagem: '/roteiro/esfirraria-roteiro.png'
    },
    {
      periodo: 'noite',
      titulo: 'Kombina Felice',
      descricao: 'Ótima opção para comer pizza, massas e sobremesas!',
      lugarId: 'kombina-felice',
      imagem: '/roteiro/kombina-roteiro.png'
    }
  ]
};

export function getRoteiro(): Roteiro {
  return roteiro;
}
