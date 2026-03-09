import { CategorySection } from '@/components/CategorySection';
import { Container } from '@/components/Container';
import { getRestaurantesByCategoria } from '@/lib/data/restaurantes';

/**
 * Página de teste para o componente CategorySection
 * Valida: Requirements 3.1, 3.5, 4.1, 4.5, 5.1
 */
export default function TestCategorySectionPage() {
  const hamburguerias = getRestaurantesByCategoria('hamburgueria');
  const italianos = getRestaurantesByCategoria('italiano');
  const emptyCategory: any[] = [];

  return (
    <Container size="xl">
      <div className="py-12">
        <h1 className="text-4xl font-display font-bold text-marrom-escuro mb-8">
          Teste do CategorySection
        </h1>

        {/* Teste com hamburguerias - 3 colunas */}
        <CategorySection 
          title="Hamburguerias" 
          lugares={hamburguerias}
          columns={3}
        />

        {/* Teste com italianos - 2 colunas */}
        <CategorySection 
          title="Restaurantes Italianos" 
          lugares={italianos}
          columns={2}
        />

        {/* Teste com 4 colunas */}
        <CategorySection 
          title="Todos os Restaurantes" 
          lugares={[...hamburguerias, ...italianos]}
          columns={4}
        />

        {/* Teste com categoria vazia (empty state) */}
        <CategorySection 
          title="Categoria Vazia (Empty State)" 
          lugares={emptyCategory}
          columns={3}
        />
      </div>
    </Container>
  );
}
