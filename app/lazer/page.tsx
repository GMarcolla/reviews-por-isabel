import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { FilteredCategoryView } from '@/components/FilteredCategoryView';
import { getPasseios } from '@/lib/data/passeios';
import { getCategoriaByRota } from '@/lib/categorias';

/**
 * Página de Lazer
 * 
 * Exibe opções de lazer e experiências em Blumenau e região
 * 
 * Requirements: 5.1, 5.4, 5.5
 */

export const metadata: Metadata = {
  title: 'Lazer',
  description: 'Por que a vida também pede pausas',
};

export default async function LazerPage() {
  const [todosLazer, categoriaData] = await Promise.all([
    getPasseios(),
    getCategoriaByRota('lazer'),
  ]);

  const subcategoriasOrdenadas = categoriaData?.subcategorias ?? [];

  return (
    <Container size="xl" className="py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-escuro mb-4">
          Lazer
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          Por que a vida também pede pausas
        </p>
      </div>

      <FilteredCategoryView 
        lugares={todosLazer}
        subcategorias={subcategoriasOrdenadas}
      />
    </Container>
  );
}
