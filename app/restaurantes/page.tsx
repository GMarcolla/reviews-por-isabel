import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { FilteredCategoryView } from '@/components/FilteredCategoryView';
import { getRestaurantes } from '@/lib/data/restaurantes';
import { getCategoriaByRota } from '@/lib/categorias';

export const metadata: Metadata = {
  title: 'Restaurantes',
  description: 'Descubra os melhores sabores',
};

export default async function RestaurantesPage() {
  const [todosRestaurantes, categoriaData] = await Promise.all([
    getRestaurantes(),
    getCategoriaByRota('restaurantes'),
  ]);

  // Subcategorias ordenadas pelo campo `ordem` do banco
  const subcategoriasOrdenadas = categoriaData?.subcategorias ?? [];

  return (
    <Container size="xl" className="py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-escuro mb-4">
          Restaurantes
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          Descubra os melhores sabores
        </p>
      </div>

      {/* Grid com Filtros e Listagem */}
      <FilteredCategoryView 
        lugares={todosRestaurantes}
        subcategorias={subcategoriasOrdenadas}
      />
    </Container>
  );
}
