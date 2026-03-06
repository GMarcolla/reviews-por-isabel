import { BotaoHub } from '@/components/BotaoHub';
import { UtensilsCrossed, Coffee, Compass, Map, Ticket, Mail } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rosa-claro via-creme-claro to-white py-20 px-6 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-marrom-forte leading-tight">
                Reviews por Isabel
              </h1>
              <p className="text-xl md:text-2xl text-marrom-rosado font-light">
                Um guia de lugares e experiências em Blumenau e região
              </p>
              <p className="text-base md:text-lg text-marrom-rosado/80 max-w-lg mx-auto md:mx-0">
                Descubra os melhores restaurantes, cafés, passeios e experiências com curadoria especial
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-rosa-blush/30 to-rosa-claro/50 shadow-lg flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-rosa-blush/40 flex items-center justify-center">
                    <svg 
                      className="w-16 h-16 text-marrom-rosado/60" 
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
                  <p className="text-sm text-marrom-rosado/60 font-medium">
                    Imagem em breve
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-rosa-blush/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-rosa-claro/30 rounded-full blur-2xl"></div>
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
              icon={UtensilsCrossed}
              href="/restaurantes"
              variant="primary"
            />
            <BotaoHub
              title="Cafés & Docerias"
              description="Momentos doces e especiais"
              icon={Coffee}
              href="/cafes"
              variant="secondary"
            />
            <BotaoHub
              title="Passeios"
              description="Experiências inesquecíveis"
              icon={Compass}
              href="/passeios"
              variant="primary"
            />
            <BotaoHub
              title="Roteiro em Blumenau"
              description="Um dia perfeito na cidade"
              icon={Map}
              href="/roteiro"
              variant="secondary"
            />
            <BotaoHub
              title="Cupons"
              description="Descontos exclusivos"
              icon={Ticket}
              href="/cupons"
              variant="primary"
            />
            <BotaoHub
              title="Contato"
              description="Fale comigo"
              icon={Mail}
              href="/contato"
              variant="secondary"
            />
          </div>
        </div>
      </section>

      {/* Sobre a Isa Section */}
      <section className="py-16 px-6 md:py-24 bg-gradient-to-br from-rosa-claro/50 to-creme-claro">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[auto,1fr] gap-8 md:gap-12 items-center">
            {/* Foto circular */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-rosa-blush/40 to-rosa-claro/60 shadow-lg flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <svg 
                      className="w-20 h-20 text-marrom-rosado/50" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                  </div>
                </div>
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border-4 border-rosa-blush/30 -z-10 scale-110"></div>
              </div>
            </div>

            {/* Texto de apresentação */}
            <div className="text-center md:text-left space-y-4">
              <h2 className="text-4xl md:text-5xl font-display text-marrom-forte">
                Oi! Eu sou a Isa
              </h2>
              <div className="space-y-3 text-marrom-rosado text-base md:text-lg leading-relaxed">
                <p>
                  Bem-vinda ao meu cantinho especial! Sou apaixonada por descobrir lugares incríveis, 
                  sabores únicos e experiências que tornam cada momento especial.
                </p>
                <p>
                  Aqui você encontra minhas recomendações pessoais de restaurantes, cafés e passeios 
                  em Blumenau e região. Cada lugar foi cuidadosamente visitado e escolhido por mim, 
                  pensando em criar memórias inesquecíveis.
                </p>
                <p>
                  Espero que você se inspire e descubra novos lugares favoritos através das minhas dicas! 
                  Vamos juntas nessa jornada gastronômica e cultural? 💕
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
