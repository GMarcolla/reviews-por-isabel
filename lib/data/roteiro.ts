import { Roteiro } from '../types';

export const roteiro: Roteiro = {
  titulo: 'Um Dia Perfeito em Blumenau',
  descricao: 'Descubra o melhor de Blumenau em um roteiro especialmente pensado para você aproveitar a cidade do início ao fim do dia. Das primeiras horas da manhã até a noite, cada momento foi planejado para criar memórias inesquecíveis.',
  periodos: [
    {
      periodo: 'manha',
      titulo: 'Café da Manhã com Vista',
      descricao: 'Comece seu dia em um dos cafés mais charmosos da cidade. Aproveite um café da manhã caprichado com pães frescos, bolos caseiros e aquele cafezinho especial. O ambiente acolhedor e a decoração encantadora tornam a experiência ainda mais especial. Não deixe de experimentar os croissants artesanais e o café coado na hora.',
      imagem: '/images/roteiro/manha.jpg',
      dicas: [
        'Chegue cedo para pegar os melhores lugares',
        'Experimente o menu completo de café da manhã',
        'Perfeito para fotos no Instagram'
      ]
    },
    {
      periodo: 'tarde',
      titulo: 'Explorando o Centro Histórico',
      descricao: 'Após o café, caminhe pelo centro histórico de Blumenau e descubra a arquitetura alemã que marca a cidade. Visite o Museu da Família Colonial, passeie pela Rua XV de Novembro e aprecie as construções em estilo enxaimel. Para o almoço, escolha um dos restaurantes tradicionais e experimente a culinária típica alemã ou opte por uma das opções contemporâneas que a cidade oferece.',
      imagem: '/images/roteiro/tarde.jpg',
      dicas: [
        'Use calçados confortáveis para caminhar',
        'Reserve tempo para visitar as lojinhas de artesanato',
        'Faça uma pausa para um sorvete artesanal'
      ]
    },
    {
      periodo: 'noite',
      titulo: 'Jantar Romântico e Experiência Gastronômica',
      descricao: 'Finalize seu dia com um jantar especial em um dos restaurantes mais encantadores da cidade. Ambiente intimista, iluminação suave e um menu degustação que vai surpreender seu paladar. A experiência gastronômica é complementada por uma carta de vinhos cuidadosamente selecionada. Perfeito para celebrar momentos especiais ou simplesmente aproveitar uma noite inesquecível.',
      lugarId: 'le-jardin',
      imagem: '/images/roteiro/noite.jpg',
      dicas: [
        'Faça reserva com antecedência',
        'Peça recomendações ao sommelier',
        'Aproveite para conhecer a sobremesa especial da casa'
      ]
    }
  ]
};

export function getRoteiro(): Roteiro {
  return roteiro;
}
