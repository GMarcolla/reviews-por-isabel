import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CardLugar } from '@/components/CardLugar';
import { getPrestadores } from '@/lib/data/prestadores';

/**
 * Página de Prestadores de Serviços
 * 
 * Exibe prestadores de serviços de Blumenau e região
 * 
 * Requirements: 3.1, 3.4, 3.5
 */

export const metadata: Metadata = {
  title: 'Prestadores de Serviços',
  description: 'Descubra os melhores prestadores de serviços de Blumenau e região.',
};

export default function PrestadoresPage() {
  // Buscar todos os prestadores
  const todosPrestadores = getPrestadores();

  return (
    <Container size="xl" className="py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-escuro mb-4">
          Prestadores de Serviços
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          Descubra os melhores profissionais de Blumenau e região, 
          cuidadosamente selecionados para você.
        </p>
      </div>

      {/* Grid de cards */}
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {todosPrestadores.map((prestador) => (
          <CardLugar 
            key={prestador.id} 
            lugar={prestador}
            showSubcategoria={true}
          />
        ))}
      </div>
    </Container>
  );
}
