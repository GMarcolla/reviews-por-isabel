import { BotaoHub } from '@/components/BotaoHub';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { CarrosselLugares } from '@/components/CarrosselLugares';
import { Lugar } from '@/lib/types';

export const revalidate = 60; // Revalida a cada 60 segundos

export default async function Home() {
  const favoritosDaIsaRaw = await prisma.lugar.findMany({
    where: { destaque: true },
    include: { categoria: true, subcategoria: true },
    orderBy: { nome: 'asc' }
  });

  const ultimosVisitadosRaw = await prisma.lugar.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { categoria: true, subcategoria: true }
  });

  const favoritosDaIsa = favoritosDaIsaRaw as unknown as Lugar[];
  const ultimosVisitados = ultimosVisitadosRaw as unknown as Lugar[];

  return (
    <main className="min-h-screen">
      {/* Hero Section - Reviews por Isabel */}
      <section className="relative bg-gradient-to-br from-beje-tulipa/30 via-off-white-rosado to-white py-20 px-6 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-marrom-escuro leading-tight">
                Oi! Eu sou a Isa!
              </h1>
              <div className="space-y-3 text-marrom-escuro text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
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

            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="/foto-home.jpeg"
                  alt="Isabel - Reviews por Isabel"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-rosa-tulipa/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-verde-tulipa/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Favoritos da Isa */}
      {favoritosDaIsa.length > 0 && (
        <CarrosselLugares 
          lugares={favoritosDaIsa} 
          title="Favoritos da Isa 💖" 
          subtitle="Lugares que eu amo e super recomendo!" 
        />
      )}

      {/* Últimos Visitados */}
      {ultimosVisitados.length > 0 && (
        <div className="bg-beje-tulipa/20">
          <CarrosselLugares 
            lugares={ultimosVisitados} 
            title="Últimos Visitados 🆕" 
            subtitle="As novidades fresquinhas que acabei de conhecer" 
          />
        </div>
      )}

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
              title="Lazer"
              description="Experiências inesquecíveis"
              imageSrc="/img-botoes/lazer.PNG"
              href="/lazer"
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
              title="Lojas"
              description="Compras especiais"
              imageSrc="/img-botoes/lojas.png"
              href="/lojas"
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
              title="Roteiro em Blumenau"
              description="Um dia perfeito na cidade"
              imageSrc="/img-botoes/roteiro.png"
              href="/roteiro"
              variant="primary"
            />
            <BotaoHub
              title="Favoritos da Isa"
              description="Descubra os meus lugares preferidos"
              imageSrc="/img-botoes/favoritos.png"
              href="/favoritos-da-isa"
              variant="secondary"
            />
            <BotaoHub
              title="Contato"
              description="Fale comigo"
              imageSrc="/img-botoes/fale-comigo.png"
              href="/contato"
              variant="secondary"
            />
          </div>
        </div>
      </section>


    </main>
  );
}
