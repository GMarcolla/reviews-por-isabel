import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { FilteredCategoryView } from '@/components/FilteredCategoryView';
import { getLojas } from '@/lib/data/lojas';
import { getCategoriaByRota } from '@/lib/categorias';

export const metadata: Metadata = {
  title: 'Lojas',
  description: 'Pra render boas comprinhas',
};

export default async function LojasPage() {
  const [todasLojas, categoriaData] = await Promise.all([
    getLojas(),
    getCategoriaByRota('lojas'),
  ]);

  const subcategoriasOrdenadas = categoriaData?.subcategorias ?? [];

  return (
    <Container size="xl" className="py-8 md:py-12">
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-escuro mb-4">
          Lojas
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          Pra render boas comprinhas
        </p>
      </div>

      <FilteredCategoryView 
        lugares={todasLojas}
        subcategorias={subcategoriasOrdenadas}
      />
    </Container>
  );
}
