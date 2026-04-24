import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { FilteredCategoryView } from '@/components/FilteredCategoryView';
import { getCafes } from '@/lib/data/cafes';
import { getCategoriaByRota } from '@/lib/categorias';

export const metadata: Metadata = {
  title: 'Cafés & Docerias',
  description: 'Porque um docinho sempre vai bem',
};

export default async function CafesPage() {
  const [todosCafes, categoriaData] = await Promise.all([
    getCafes(),
    getCategoriaByRota('cafes'),
  ]);

  const subcategoriasOrdenadas = categoriaData?.subcategorias ?? [];

  return (
    <Container size="xl" className="py-8 md:py-12">
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-escuro mb-4">
          Cafés & Docerias
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          Porque um docinho sempre vai bem
        </p>
      </div>

      <FilteredCategoryView 
        lugares={todosCafes}
        subcategorias={subcategoriasOrdenadas}
      />
    </Container>
  );
}
