import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CardLugar } from '@/components/CardLugar';
import { getPasseios } from '@/lib/data/passeios';

/**
 * Página de Lazer
 * 
 * Exibe opções de lazer e experiências em Blumenau e região
 * 
 * Requirements: 5.1, 5.4, 5.5
 */

export const metadata: Metadata = {
  title: 'Lazer',
  description: 'Descubra opções de lazer e experiências incríveis em Blumenau e região.',
};

export default function LazerPage() {
  // Buscar todos os itens de lazer
  const todosLazer = getPasseios();

  return (
    <Container size="xl" className="py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-escuro mb-4">
          Lazer
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          Descubra experiências incríveis e opções de lazer inesquecíveis 
          em Blumenau e região.
        </p>
      </div>

      {/* Grid de cards */}
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {todosLazer.map((item) => (
          <CardLugar 
            key={item.id} 
            lugar={item} 
            variant="large"
          />
        ))}
      </div>
    </Container>
  );
}
