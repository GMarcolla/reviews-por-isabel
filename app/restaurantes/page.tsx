import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CategorySection } from '@/components/CategorySection';
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

  // Agrupar por subcategoriaId
  const porSubcategoria = todosRestaurantes.reduce((acc, restaurante) => {
    const key = restaurante.subcategoriaId ?? 'sem-subcategoria';
    if (!acc[key]) acc[key] = [];
    acc[key].push(restaurante);
    return acc;
  }, {} as Record<string, typeof todosRestaurantes>);

  // Subcategorias que têm lugares, na ordem definida no banco
  const subcategoriasComLugares = subcategoriasOrdenadas.filter(
    (s) => porSubcategoria[s.id]
  );

  // Lugares sem subcategoria (edge case)
  const semSubcategoria = porSubcategoria['sem-subcategoria'];

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

      {/* Seções dinâmicas por subcategoria (ordem do banco) */}
      {subcategoriasComLugares.map((subcategoria) => (
        <CategorySection
          key={subcategoria.id}
          title={subcategoria.nome}
          lugares={porSubcategoria[subcategoria.id]}
          columns={3}
        />
      ))}

      {/* Lugares sem subcategoria */}
      {semSubcategoria && semSubcategoria.length > 0 && (
        <CategorySection
          title="Outros"
          lugares={semSubcategoria}
          columns={3}
        />
      )}
    </Container>
  );
}
