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
      {/* Hero Section & Últimos Visitados */}
      <section className="relative bg-gradient-to-br from-beje-tulipa/30 via-off-white-rosado to-white pt-8 pb-4 md:pt-10 md:pb-4 overflow-hidden">

        {/* Texto do Guia */}
        <div className="max-w-3xl mx-auto px-6 space-y-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-marrom-escuro leading-tight">
           Um guia de visitas
          </h1>
          <p className="text-marrom-escuro/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Descubra restaurantes, cafés, passeios e serviços da região através de avaliações sinceras de lugares que eu já visitei e recomendo.
          </p>
        </div>

        {/* Últimos Visitados */}
        {ultimosVisitados.length > 0 && (
          <div className="relative z-10 mt-4 md:mt-8">
            <CarrosselLugares
              lugares={ultimosVisitados}
              title="Últimos Visitados 🆕"
              subtitle="As novidades fresquinhas que acabei de conhecer"
            />
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rosa-tulipa/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute bottom-10 left-0 w-80 h-80 bg-verde-tulipa/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      </section>

      {/* Favoritos da Isa */}
      {favoritosDaIsa.length > 0 && (
        <div className="bg-beje-tulipa/20">
          <CarrosselLugares
            lugares={favoritosDaIsa}
            title="Favoritos da Isa 💖"
            subtitle="Lugares que eu amo e super recomendo!"
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
              title="Sobre mim"
              description="Conheça a Isa"
              imageSrc="/img-botoes/fale-comigo.png"
              href="/sobre-mim"
              variant="secondary"
            />
          </div>
        </div>
      </section>


    </main>
  );
}
