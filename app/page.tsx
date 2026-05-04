import { prisma } from '@/lib/prisma';
import { CarrosselLugares } from '@/components/CarrosselLugares';
import { CategoryNav } from '@/components/CategoryNav';
import { Lugar } from '@/lib/types';

export const revalidate = 60; // Revalida a cada 60 segundos

export default async function Home() {
  const favoritosDaIsaRaw = await prisma.lugar.findMany({
    where: { destaque: true },
    include: { categoria: true, subcategoria: true },
    orderBy: { ordem: 'desc' }
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
      {/* Hero Section */}
      <section className="bg-beje-tulipa/20 pt-4 pb-4 md:pt-10 md:pb-6">

        {/* Texto do Guia */}
        <div className="max-w-3xl mx-auto px-6 space-y-3 md:space-y-4 text-center">
          <h1 className="text-3xl md:text-5xl font-body font-bold text-marrom-escuro leading-tight">
           UM GUIA DE VISITAS
          </h1>
          <p className="text-marrom-escuro/80 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Descubra restaurantes, cafés, passeios e serviços da região através de avaliações sinceras de lugares que eu já visitei e recomendo.
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryNav />

      {/* Últimos Visitados */}
      {ultimosVisitados.length > 0 && (
        <section className="bg-white">
          <CarrosselLugares
            lugares={ultimosVisitados}
            title="🆕 Últimos visitados"
            subtitle="As novidades que acabei de conhecer"
          />
        </section>
      )}

      {/* Favoritos da Isa */}
      {favoritosDaIsa.length > 0 && (
        <div className="bg-beje-tulipa/20">
          <CarrosselLugares
            lugares={favoritosDaIsa}
            title="💖 Favoritos da Isa"
            subtitle="Lugares que eu amo e super recomendo!"
          />
        </div>
      )}
    </main>
  );
}
