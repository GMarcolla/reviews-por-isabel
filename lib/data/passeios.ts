import { Lugar } from '../types';

export const passeios: Lugar[] = [
  // Eventos
  {
    id: 'oktoberfest',
    nome: 'Oktoberfest Blumenau',
    categoria: 'evento',
    descricaoCurta: 'A maior festa alemã das Américas',
    descricaoCompleta: 'A Oktoberfest de Blumenau é a segunda maior festa alemã do mundo. Música, dança, gastronomia típica e muita cerveja em um evento imperdível.',
    imagem: '/images/passeios/oktoberfest.jpg',
    imagemAlt: 'Pavilhão da Oktoberfest lotado',
    endereco: 'Parque Vila Germânica - Rua Alberto Stein, 199',
    telefone: '(47) 3381-6000',
    instagram: '@oktoberfestblumenau',
    website: 'https://oktoberfestblumenau.com.br',
    horarioFuncionamento: 'Outubro (datas variam anualmente)',
    faixaPreco: 2,
    destaque: true,
    ordem: 1,
  },
  // Concertos
  {
    id: 'teatro-carlos-gomes',
    nome: 'Teatro Carlos Gomes',
    categoria: 'concerto',
    descricaoCurta: 'Espetáculos culturais e apresentações musicais',
    descricaoCompleta: 'O Teatro Carlos Gomes é o principal espaço cultural de Blumenau. Recebe peças teatrais, concertos, shows e eventos culturais durante todo o ano.',
    imagem: '/images/passeios/teatro-carlos-gomes.jpg',
    imagemAlt: 'Fachada do Teatro Carlos Gomes',
    endereco: 'Rua XV de Novembro, 1181 - Centro',
    telefone: '(47) 3326-6583',
    instagram: '@teatrocarlosgomes',
    website: 'https://teatrocarlosgomes.com.br',
    horarioFuncionamento: 'Conforme programação',
    faixaPreco: 2,
    ordem: 2,
  },
  // Festivais
  {
    id: 'festival-da-cerveja',
    nome: 'Festival da Cerveja Artesanal',
    categoria: 'festival',
    descricaoCurta: 'Cervejas artesanais e gastronomia local',
    descricaoCompleta: 'Festival que celebra a cultura cervejeira de Blumenau com dezenas de cervejarias artesanais, food trucks e música ao vivo.',
    imagem: '/images/passeios/festival-cerveja.jpg',
    imagemAlt: 'Barracas do Festival da Cerveja',
    endereco: 'Parque Vila Germânica',
    instagram: '@festivalcervejaartesanal',
    horarioFuncionamento: 'Eventos sazonais (verificar programação)',
    faixaPreco: 2,
    destaque: true,
    ordem: 3,
  },
  // Parques
  {
    id: 'parque-ramiro-ruediger',
    nome: 'Parque Ramiro Ruediger',
    categoria: 'parque',
    descricaoCurta: 'Área verde perfeita para caminhadas e piqueniques',
    descricaoCompleta: 'O Parque Ramiro Ruediger oferece trilhas, playground, lago e muito verde. Ideal para atividades ao ar livre, caminhadas e momentos em família.',
    imagem: '/images/passeios/parque-ramiro.jpg',
    imagemAlt: 'Lago e trilha do Parque Ramiro Ruediger',
    endereco: 'Rua Bruno Schreiber - Itoupava Seca',
    horarioFuncionamento: 'Diariamente: 6h-18h',
    faixaPreco: 1,
    ordem: 4,
  },
  // Passeios Diferentes
  {
    id: 'museu-da-cerveja',
    nome: 'Museu da Cerveja',
    categoria: 'passeio',
    descricaoCurta: 'História da cerveja e degustação',
    descricaoCompleta: 'O Museu da Cerveja conta a história da tradição cervejeira de Blumenau. Tour guiado, exposições interativas e degustação de cervejas locais.',
    imagem: '/images/passeios/museu-cerveja.jpg',
    imagemAlt: 'Interior do Museu da Cerveja',
    endereco: 'Parque Vila Germânica',
    telefone: '(47) 3381-6000',
    instagram: '@museudacerveja',
    horarioFuncionamento: 'Ter-Dom: 10h-18h',
    faixaPreco: 1,
    destaque: true,
    ordem: 5,
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
