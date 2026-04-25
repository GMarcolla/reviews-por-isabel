import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { getRoteiro } from '@/lib/data/roteiro';
import { getRestauranteBySlug } from '@/lib/data/restaurantes';
import { Clock, MapPin, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roteiro em Blumenau',
  description: 'Descubra o melhor de Blumenau em um roteiro especialmente pensado para você aproveitar a cidade do início ao fim do dia.',
  openGraph: {
    title: 'Roteiro em Blumenau - Reviews por Isabel',
    description: 'Um dia perfeito em Blumenau com curadoria especial',
  },
};

const periodoLabels: Record<string, string> = {
  manha: 'Manhã',
  almoco: 'Almoço',
  tarde: 'Tarde',
  extras: 'Passeios Extras',
  noite: 'Noite',
};

const periodoIcons: Record<string, string> = {
  manha: '🌅',
  almoco: '🍽️',
  tarde: '☀️',
  extras: '⭐',
  noite: '🌙',
};

export default async function RoteiroPage() {
  const roteiro = getRoteiro();
  
  // Buscar lugares que tem id
  const lugaresPromises = roteiro.periodos.map(async (p) => {
    if (p.lugarId) {
      const restaurante = await getRestauranteBySlug(p.lugarId);
      return { id: p.lugarId, data: restaurante };
    }
    return null;
  });
  
  const lugaresResult = await Promise.all(lugaresPromises);
  const lugaresMap = lugaresResult.reduce((acc, item) => {
    if (item && item.data) {
      acc[item.id] = item.data;
    }
    return acc;
  }, {} as Record<string, any>);

  // Agrupar períodos na ordem desejada
  const order = ['manha', 'almoco', 'tarde', 'extras', 'noite'];
  
  const periodosAgrupados = roteiro.periodos.reduce((acc, curr) => {
    if (!acc[curr.periodo]) {
      acc[curr.periodo] = [];
    }
    acc[curr.periodo].push(curr);
    return acc;
  }, {} as Record<string, typeof roteiro.periodos>);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-off-white-rosado to-beje-tulipa/10">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-beje-tulipa/30 via-off-white-rosado to-white py-16 md:py-24 px-6">
        <Container size="lg">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rosa-tulipa/20 rounded-full">
              <MapPin className="w-4 h-4 text-marrom-escuro/70" />
              <span className="text-sm font-medium text-marrom-escuro/70">
                Blumenau, SC
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-escuro leading-tight">
              {roteiro.titulo}
            </h1>
            
            <p className="text-lg md:text-xl text-marrom-escuro/80 leading-relaxed">
              {roteiro.descricao}
            </p>

            <div className="flex items-center justify-center gap-2 text-marrom-escuro/70">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Duração: 1 dia completo</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Roteiro Content */}
      <section className="py-16 md:py-20 px-6">
        <Container size="lg">
          <div className="max-w-4xl mx-auto space-y-20 md:space-y-32 relative">
            {/* Main Timeline Line (Connects period icons) */}
            <div className="absolute left-6 md:left-[3.5rem] top-8 bottom-0 w-1 bg-gradient-to-b from-rosa-tulipa/30 via-beje-tulipa/30 to-transparent -z-10 hidden md:block" />

            {order.map((periodoKey) => {
              const atividades = periodosAgrupados[periodoKey];
              if (!atividades || atividades.length === 0) return null;

              return (
                <div key={periodoKey} className="relative">
                  
                  {/* Período Header */}
                  <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12 sticky top-16 z-20 bg-white/95 backdrop-blur-sm pt-6 pb-4 -mx-6 px-6 md:-mx-4 md:px-4 rounded-b-xl md:rounded-b-2xl border-b border-beje-tulipa/20 shadow-sm">
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-rosa-tulipa to-rosa-tulipa-claro shadow-lg flex items-center justify-center text-2xl md:text-3xl ring-4 ring-white">
                        {periodoIcons[periodoKey]}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      {periodoKey !== 'extras' && (
                        <div className="inline-block px-3 py-1 bg-beje-tulipa/30 rounded-full mb-2">
                          <span className="text-xs md:text-sm font-medium text-marrom-escuro uppercase tracking-wide">
                            Período
                          </span>
                        </div>
                      )}
                      <h2 className="font-display text-3xl md:text-4xl text-marrom-escuro">
                        {periodoLabels[periodoKey]}
                      </h2>
                      {periodoKey === 'noite' && (
                        <p className="text-marrom-escuro/70 mt-1 text-sm md:text-base">
                          Indicações de jantar
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Lista de Atividades do Período */}
                  <div className="space-y-12 md:ml-8 pl-4 md:pl-10 border-l-2 border-rosa-tulipa/20 md:border-l-0 relative">
                    
                    {/* Linha vertical Mobile */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-rosa-tulipa/20 md:hidden" />

                    {atividades.map((atividade, aIndex) => (
                      <article key={atividade.titulo} className="relative">
                        {/* Ponto na linha do tempo */}
                        <div className="absolute -left-[21px] md:-left-[46px] top-6 md:top-8 w-4 h-4 rounded-full bg-rosa-tulipa border-4 border-white shadow-sm z-10" />

                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-beje-tulipa/40 relative hover:shadow-md transition-shadow">
                          <h3 className="font-display text-2xl md:text-3xl text-marrom-escuro mb-6">
                            {atividade.titulo}
                          </h3>

                          {/* Imagem ilustrativa */}
                          {atividade.imagem && (
                            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-beje-tulipa/30 to-off-white-rosado aspect-[4/3] md:aspect-[16/9] mb-6">
                              <Image
                                src={atividade.imagem}
                                alt={atividade.titulo}
                                fill
                                className="object-cover object-center transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                          )}

                          {/* Dicas antes da descricao se quiser, mas deixarei onde estava */}

                          {/* Descrição */}
                          <div className="prose prose-lg max-w-none mb-6">
                            <p className="text-marrom-escuro/80 leading-relaxed text-base md:text-lg">
                              {atividade.descricao}
                            </p>
                          </div>

                          {/* Bloco de Endereços e Horários */}
                          {(atividade.enderecos?.length || atividade.horarios?.length) ? (
                            <div className="bg-gradient-to-r from-beje-tulipa/20 to-transparent rounded-xl p-5 mb-6 space-y-4">
                              {atividade.enderecos && atividade.enderecos.length > 0 && (
                                <div className="flex items-start gap-3 text-marrom-escuro/80">
                                  <MapPin className="w-5 h-5 flex-shrink-0 text-rosa-tulipa mt-0.5" />
                                  <div className="space-y-1.5 flex-1">
                                    {atividade.enderecos.map((end, i) => (
                                      <p key={i} className="text-sm md:text-base leading-snug">{end}</p>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {atividade.horarios && atividade.horarios.length > 0 && (
                                <div className="flex items-start gap-3 text-marrom-escuro/80">
                                  <Clock className="w-5 h-5 flex-shrink-0 text-rosa-tulipa mt-0.5" />
                                  <div className="space-y-1.5 flex-1">
                                    {atividade.horarios.map((hor, i) => (
                                      <p key={i} className="text-sm md:text-base leading-snug">{hor}</p>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : null}

                          {/* Link para lugar (se aplicável no banco) */}
                          {atividade.lugarId && lugaresMap[atividade.lugarId] && (
                            <div className="bg-gradient-to-r from-beje-tulipa/30 to-off-white-rosado rounded-xl p-5 border border-rosa-tulipa/20 mb-6">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                  <p className="text-sm text-marrom-escuro/60 mb-1">
                                    Página do Restaurante
                                  </p>
                                  <h4 className="font-display text-xl text-marrom-escuro">
                                    {lugaresMap[atividade.lugarId].nome}
                                  </h4>
                                </div>
                                <Link
                                  href={`/restaurantes/${lugaresMap[atividade.lugarId].slug || atividade.lugarId}`}
                                  className="flex-shrink-0 px-6 py-2.5 bg-verde-tulipa text-white rounded-lg hover:bg-verde-tulipa-claro transition-all duration-200 font-medium text-sm"
                                >
                                  Ver detalhes
                                </Link>
                              </div>
                            </div>
                          )}

                          {/* Dicas */}
                          {atividade.dicas && atividade.dicas.length > 0 && (
                            <div className="bg-off-white-rosado rounded-xl p-5 border border-beje-tulipa/50">
                              <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="w-5 h-5 text-rosa-tulipa" />
                                <h4 className="font-display text-lg text-marrom-escuro">
                                  Dicas da Isa
                                </h4>
                              </div>
                              <ul className="space-y-2">
                                {atividade.dicas.map((dica, i) => (
                                  <li 
                                    key={i}
                                    className="flex items-start gap-3 text-marrom-escuro/80 text-sm md:text-base"
                                  >
                                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-rosa-tulipa mt-2" />
                                    <span>{dica}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="max-w-4xl mx-auto mt-20 md:mt-24">
            <div className="bg-gradient-to-br from-rosa-tulipa/10 via-beje-tulipa/20 to-off-white-rosado rounded-2xl p-8 md:p-12 text-center border border-rosa-tulipa/20">
              <h3 className="font-display text-2xl md:text-3xl text-marrom-escuro mb-4">
                Pronta para sua aventura?
              </h3>
              <p className="text-marrom-escuro/80 mb-6 max-w-2xl mx-auto">
                Este roteiro é apenas uma sugestão! Sinta-se livre para adaptar conforme seu estilo e preferências. 
                Explore mais lugares nas outras seções do site.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/restaurantes"
                  className="px-8 py-3 bg-verde-tulipa text-white rounded-lg hover:bg-verde-tulipa-claro transition-all duration-200 font-medium"
                >
                  Ver Restaurantes
                </Link>
                <Link
                  href="/passeios"
                  className="px-8 py-3 bg-white text-marrom-escuro border-2 border-verde-tulipa rounded-lg hover:bg-beje-tulipa/20 transition-all duration-200 font-medium"
                >
                  Ver Passeios
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
