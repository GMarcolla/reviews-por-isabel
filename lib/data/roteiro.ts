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
      imagem: 'https://res.cloudinary.com/datlo7mql/image/upload/roteiro/cafe-haus-roteiro.jpg',
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
      imagem: 'https://res.cloudinary.com/datlo7mql/image/upload/roteiro/rua-xv-roteiro.jpg',
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
      imagem: 'https://res.cloudinary.com/datlo7mql/image/upload/roteiro/alemao-batata-roteiro.png',
      lugarId: 'alemao-batata'
    },
    // Tarde
    {
      periodo: 'tarde',
      titulo: 'Passeio na Vila Germânica',
      descricao: 'Um dos lugares mais icônicos da cidade. Mesmo fora da Oktoberfest, vale a visita para ver a arquitetura típica, tirar fotos e provar produtos locais. Lá você encontra lojas de artesanato, cafeterias e restaurantes típicos.',
      imagem: 'https://res.cloudinary.com/datlo7mql/image/upload/roteiro/vila-germanica-roteiro.jpg',
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
      imagem: 'https://res.cloudinary.com/datlo7mql/image/upload/roteiro/parque-ramiro-roteiro.jpg',
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
      imagem: 'https://res.cloudinary.com/datlo7mql/image/upload/roteiro/museu-cerveja-roteiro.jpg',
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
      imagem: 'https://res.cloudinary.com/datlo7mql/image/upload/roteiro/magia-natal-roteiro.jpg',
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
      imagem: 'https://res.cloudinary.com/datlo7mql/image/upload/roteiro/hope-burguer-pizza-roteiro.jpg'
    },
    {
      periodo: 'noite',
      titulo: 'Arena Dog Burger',
      descricao: 'Restaurante inspirado na Grécia. Você encontra hambúrgueres artesanais, X-saladas, hot dogs, drinks e sobremesas.',
      lugarId: 'arena-dog-burger',
      imagem: 'https://res.cloudinary.com/datlo7mql/image/upload/roteiro/arena-roteiro.png'
    },
    {
      periodo: 'noite',
      titulo: 'Empório Ames Esfiharia',
      descricao: 'Lugar muito aconchegante! Opções de esfirras à la carte e rodízio. Eu amo!',
      lugarId: 'emporio-ames-esfiharia',
      imagem: 'https://res.cloudinary.com/datlo7mql/image/upload/roteiro/esfirraria-roteiro.png'
    },
    {
      periodo: 'noite',
      titulo: 'Kombina Felice',
      descricao: 'Ótima opção para comer pizza, massas e sobremesas!',
      lugarId: 'kombina-felice',
      imagem: 'https://res.cloudinary.com/datlo7mql/image/upload/roteiro/kombina-roteiro.png'
    }
  ]
};

export function getRoteiro(): Roteiro {
  return roteiro;
}

export interface RoteiroLugar {
  nome: string;
  slug: string;
  endereco: string | null;
  bairro: string | null;
  cidade: string | null;
  horarioFuncionamento: string | null;
}

/**
 * Resolves every `lugarId` referenced by the roteiro in a single query.
 *
 * Returns a map keyed by the slug used in `lugarId`, carrying the practical
 * details the printed roteiro needs (where it is, when it opens).
 */
export async function getRoteiroLugares(): Promise<
  Record<string, RoteiroLugar>
> {
  const { prisma } = await import('../prisma');

  const slugs = roteiro.periodos
    .map((p) => p.lugarId)
    .filter((id): id is string => !!id);

  if (slugs.length === 0) return {};

  const lugares = await prisma.lugar.findMany({
    where: { slug: { in: slugs } },
    select: {
      nome: true,
      slug: true,
      endereco: true,
      bairro: true,
      cidade: true,
      horarioFuncionamento: true,
    },
  });

  return Object.fromEntries(lugares.map((l) => [l.slug, l]));
}

/**
 * Best available location lines for a place.
 *
 * `endereco` is only trusted as a street address when it looks like one — a
 * digit or a comma — since some records hold just the city ("Blumenau-SC").
 * Otherwise falls back to neighbourhood + city.
 *
 * Returns one entry per line. A place with two units keeps them on separate
 * lines: those are stored in a single `endereco` split by "|" or ";".
 */
export function formatarLocalizacao(lugar: RoteiroLugar): string[] {
  const endereco = lugar.endereco?.trim();
  const bairro = lugar.bairro?.trim();
  const cidade = lugar.cidade?.trim();

  if (endereco && /[\d,]/.test(endereco)) {
    return endereco
      .split(/\s*[|;]\s*/)
      .map((linha) => linha.trim())
      .filter(Boolean)
      .map((linha) => {
        // Complementa com o bairro quando o endereço não o traz — sozinha,
        // "R. Benjamin Constant, 1485" não situa quem está com o guia na mão.
        if (!bairro || linha.toLowerCase().includes(bairro.toLowerCase())) {
          return linha;
        }
        return `${linha} — ${bairro}`;
      });
  }

  const partes = [bairro, cidade].filter(Boolean);
  return partes.length ? [partes.join(', ')] : [];
}
