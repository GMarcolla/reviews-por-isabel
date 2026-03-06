import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { CardLugar } from '@/components/CardLugar';
import { getPasseios } from '@/lib/data/passeios';
import { Lugar } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * Página de Passeios
 * 
 * Exibe passeios e experiências organizados por categoria:
 * - Eventos
 * - Concertos
 * - Festivais
 * - Parques
 * - Passeios Diferentes
 * 
 * Usa variant large para cards (imagens maiores)
 * 
 * Requirements: 5.1, 5.4, 5.5
 */

export const metadata: Metadata = {
  title: 'Passeios',
  description: 'Descubra passeios e experiências incríveis em Blumenau e região.',
};

// Mapeamento de categorias para títulos em português
const categoriaTitulos: Record<string, string> = {
  evento: 'Eventos',
  concerto: 'Concertos',
  festival: 'Festivais',
  parque: 'Parques',
  passeio: 'Passeios Diferentes',
};

// Ordem de exibição das categorias
const categoriaOrdem = [
  'evento',
  'concerto',
  'festival',
  'parque',
  'passeio',
];

export default function PasseiosPage() {
  // Buscar todos os passeios
  const todosPasseios = getPasseios();

  // Agrupar passeios por categoria
  const passeiosPorCategoria = categoriaOrdem.reduce((acc, categoria) => {
    const passeiosCategoria = todosPasseios.filter(
      (p) => p.categoria === categoria
    );
    
    if (passeiosCategoria.length > 0) {
      acc[categoria] = passeiosCategoria;
    }
    
    return acc;
  }, {} as Record<string, Lugar[]>);

  return (
    <Container size="xl" className="py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-forte mb-4">
          Passeios
        </h1>
        <p className="text-lg md:text-xl text-marrom-rosado max-w-2xl mx-auto">
          Descubra experiências incríveis e passeios inesquecíveis 
          em Blumenau e região.
        </p>
      </div>

      {/* Seções de Categorias */}
      {categoriaOrdem.map((categoria) => {
        const passeios = passeiosPorCategoria[categoria];
        
        // Só renderiza a seção se houver passeios nessa categoria
        if (!passeios || passeios.length === 0) {
          return null;
        }

        return (
          <section key={categoria} className="mb-12 md:mb-16">
            {/* Título da seção */}
            <SectionTitle title={categoriaTitulos[categoria]} align="left" />

            {/* Grid de cards com variant large */}
            <div className={cn('grid gap-6 md:gap-8', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
              {passeios.map((passeio) => (
                <CardLugar 
                  key={passeio.id} 
                  lugar={passeio} 
                  variant="large"
                />
              ))}
            </div>
          </section>
        );
      })}
    </Container>
  );
}
