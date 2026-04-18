import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CategorySection } from '@/components/CategorySection';
import { getRestaurantes } from '@/lib/data/restaurantes';
import { CATEGORIAS, SUBCATEGORIAS } from '@/lib/categorias';

/**
 * Página de Restaurantes
 *
 * Exibe restaurantes agrupados dinamicamente por subcategoria.
 * As seções são renderizadas apenas para subcategorias com registros no banco.
 *
 * Requirements: 3.1, 3.4, 3.5
 */

export const metadata: Metadata = {
  title: 'Restaurantes',
  description: 'Descubra os melhores sabores',
};

export default async function RestaurantesPage() {
  const todosRestaurantes = await getRestaurantes();

  // Agrupar dinamicamente por subcategoria
  const porSubcategoria = todosRestaurantes.reduce((acc, restaurante) => {
    const key = restaurante.subcategoria?.trim() || 'Outro';
    if (!acc[key]) acc[key] = [];
    acc[key].push(restaurante);
    return acc;
  }, {} as Record<string, typeof todosRestaurantes>);

  // Ordenar: subcategorias conhecidas primeiro (na ordem de SUBCATEGORIAS),
  // depois as desconhecidas em ordem alfabética
  const ordemPreferida = SUBCATEGORIAS[CATEGORIAS.RESTAURANTES] ?? [];
  const subcategoriasOrdenadas = [
    ...ordemPreferida.filter((s) => porSubcategoria[s]),
    ...Object.keys(porSubcategoria)
      .filter((s) => !ordemPreferida.includes(s))
      .sort(),
  ];

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

      {/* Seções dinâmicas por subcategoria */}
      {subcategoriasOrdenadas.map((subcategoria) => (
        <CategorySection
          key={subcategoria}
          title={subcategoria}
          lugares={porSubcategoria[subcategoria]}
          columns={3}
        />
      ))}
    </Container>
  );
}
