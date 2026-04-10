import { BotaoHub } from '@/components/BotaoHub';
import { Mail } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Reviews por Isabel */}
      <section className="relative bg-gradient-to-br from-beje-tulipa/30 via-off-white-rosado to-white py-20 px-6 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-marrom-escuro leading-tight">
                Oie! Eu sou a Isa!
              </h1>
              <p className="text-xl md:text-2xl text-marrom-escuro font-light">
                Um guia de lugares e experiências em Blumenau e região
              </p>
              <div className="space-y-3 text-marrom-escuro text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                <p className="text-marrom-escuro/80">
                  Descubra os melhores restaurantes, cafés, passeios e experiências com curadoria especial
                </p>
                <p>
                  O Reviews por Isabel nasceu da minha vontade de compartilhar lugares que realmente valem a visita em Blumenau e região.
                </p>
                <p>
                  Por aqui você encontra restaurantes, cafés, passeios e experiências que eu já conheci e recomendo. 
                  Tudo baseado nas minhas próprias visitas. 
                </p>
                <p>
                  Espero te ajudar a descobrir lugares legais e ter novas experiências pela região!
                </p>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-rosa-tulipa/20 to-beje-tulipa/40 shadow-lg flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-rosa-tulipa/30 flex items-center justify-center">
                    <svg 
                      className="w-16 h-16 text-marrom-escuro/60" 
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
                  <p className="text-sm text-marrom-escuro/60 font-medium">
                    Imagem em breve
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-rosa-tulipa/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-verde-tulipa/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Hub Buttons Section */}
      <section className="py-16 px-6 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <BotaoHub
              title="Restaurantes"
              description="Descubra os melhores sabores"
              imageSrc="/img-botoes/restaurantes.PNG"
              href="/restaurantes"
              variant="secondary"
            />
            <BotaoHub
              title="Cafés & Docerias"
              description="Momentos doces e especiais"
              imageSrc="/img-botoes/cafes-docerias.PNG"
              href="/cafes"
              variant="primary"
            />
            <BotaoHub
              title="Prestadores de Serviços"
              description="Profissionais de confiança"
              imageSrc="/img-botoes/prestadores.PNG"
              href="/prestadores"
              variant="secondary"
            />
            <BotaoHub
              title="Lazer"
              description="Experiências inesquecíveis"
              imageSrc="/img-botoes/lazer.PNG"
              href="/lazer"
              variant="primary"
            />
            <BotaoHub
              title="Cupons"
              description="Descontos exclusivos"
              imageSrc="/img-botoes/cupons.png"
              href="/cupons"
              variant="secondary"
            />
            <BotaoHub
              title="Lojas"
              description="Compras especiais"
              imageSrc="/img-botoes/lojas.png"
              href="/lojas"
              variant="primary"
            />
            <BotaoHub
              title="Contato"
              description="Fale comigo"
              icon={Mail}
              href="/contato"
              variant="secondary"
            />
            <BotaoHub
              title="Roteiro em Blumenau"
              description="Um dia perfeito na cidade"
              imageSrc="/img-botoes/roteiro.png"
              href="/roteiro"
              variant="primary"
            />
          </div>
        </div>
      </section>


    </main>
  );
}
