import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CardLugar } from '@/components/CardLugar';
import { getLojas } from '@/lib/data/lojas';

/**
 * Página de Lojas
 * 
 * Exibe lojas de Blumenau e região
 * 
 * Requirements: 3.1, 3.4, 3.5
 */

export const metadata: Metadata = {
  title: 'Lojas',
  description: 'Descubra as melhores lojas de Blumenau e região.',
};

export default function LojasPage() {
  // Buscar todas as lojas
  const todasLojas = getLojas();

  return (
    <Container size="xl" className="py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-escuro mb-4">
          Lojas
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          Descubra as melhores lojas de Blumenau e região, 
          cuidadosamente selecionadas para você.
        </p>
      </div>

      {/* Grid de cards */}
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {todasLojas.map((loja) => (
          <CardLugar 
            key={loja.id} 
            lugar={loja}
          />
        ))}
      </div>
    </Container>
  );
}
