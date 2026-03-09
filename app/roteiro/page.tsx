import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { getRoteiro } from '@/lib/data/roteiro';
import { getRestauranteBySlug } from '@/lib/data/restaurantes';
import { Clock, MapPin, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roteiro em Blumenau',
  description: 'Descubra o melhor de Blumenau em um roteiro especialmente pensado para você aproveitar a cidade do início ao fim do dia.',
  openGraph: {
    title: 'Roteiro em Blumenau - Reviews por Isabel',
    description: 'Um dia perfeito em Blumenau com curadoria especial',
  },
};

const periodoLabels = {
  manha: 'Manhã',
  tarde: 'Tarde',
  noite: 'Noite',
};

const periodoIcons = {
  manha: '🌅',
  tarde: '☀️',
  noite: '🌙',
};

export default function RoteiroPage() {
  const roteiro = getRoteiro();

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
          <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
            {roteiro.periodos.map((periodo, index) => (
              <article 
                key={periodo.periodo}
                className="relative"
              >
                {/* Timeline connector */}
                {index < roteiro.periodos.length - 1 && (
                  <div className="absolute left-6 md:left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-rosa-tulipa to-beje-tulipa -z-10" />
                )}

                <div className="space-y-6">
                  {/* Período Header */}
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-rosa-tulipa to-rosa-tulipa-claro shadow-lg flex items-center justify-center text-2xl md:text-3xl">
                        {periodoIcons[periodo.periodo]}
                      </div>
                    </div>
                    
                    <div className="flex-1 pt-2">
                      <div className="inline-block px-3 py-1 bg-beje-tulipa/30 rounded-full mb-3">
                        <span className="text-xs md:text-sm font-medium text-marrom-escuro uppercase tracking-wide">
                          {periodoLabels[periodo.periodo]}
                        </span>
                      </div>
                      
                      <h2 className="font-display text-3xl md:text-4xl text-marrom-escuro mb-4">
                        {periodo.titulo}
                      </h2>
                    </div>
                  </div>

                  {/* Imagem ilustrativa */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-beje-tulipa/30 to-off-white-rosado aspect-[16/9] md:aspect-[21/9]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-rosa-tulipa/20 flex items-center justify-center">
                          <svg 
                            className="w-10 h-10 text-marrom-escuro/40" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={1.5} 
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-marrom-escuro/50">
                          Imagem ilustrativa em breve
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-marrom-escuro/80 leading-relaxed text-base md:text-lg">
                      {periodo.descricao}
                    </p>
                  </div>

                  {/* Link para lugar (se aplicável) */}
                  {periodo.lugarId && (
                    <div className="bg-gradient-to-r from-beje-tulipa/30 to-off-white-rosado rounded-xl p-6 border border-rosa-tulipa/20">
                      {(() => {
                        const lugar = getRestauranteBySlug(periodo.lugarId);
                        if (!lugar) return null;
                        
                        return (
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                              <p className="text-sm text-marrom-escuro/60 mb-1">
                                Recomendação especial
                              </p>
                              <h3 className="font-display text-xl md:text-2xl text-marrom-escuro">
                                {lugar.nome}
                              </h3>
                              <p className="text-marrom-escuro/70 mt-1">
                                {lugar.descricaoCurta}
                              </p>
                            </div>
                            <Link
                              href={`/restaurantes/${lugar.id}`}
                              className="flex-shrink-0 px-6 py-3 bg-verde-tulipa text-white rounded-lg hover:bg-verde-tulipa-claro transition-all duration-200 font-medium"
                            >
                              Ver detalhes
                            </Link>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Dicas */}
                  {periodo.dicas && periodo.dicas.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-md border border-beje-tulipa">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-rosa-tulipa" />
                        <h3 className="font-display text-lg text-marrom-escuro">
                          Dicas da Isa
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {periodo.dicas.map((dica, i) => (
                          <li 
                            key={i}
                            className="flex items-start gap-3 text-marrom-escuro/80"
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

          {/* Call to Action */}
          <div className="max-w-4xl mx-auto mt-16 md:mt-20">
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
