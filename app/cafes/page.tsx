import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CategorySection } from '@/components/CategorySection';
import { getCafes } from '@/lib/data/cafes';
import { CATEGORIAS, SUBCATEGORIAS } from '@/lib/categorias';

/**
 * Página de Cafés & Docerias
 *
 * Exibe cafés e docerias agrupados dinamicamente por subcategoria.
 * As seções são renderizadas apenas para subcategorias com registros no banco.
 *
 * Requirements: 4.1, 4.4, 4.5
 */

export const metadata: Metadata = {
  title: 'Cafés & Docerias',
  description: 'Porque um docinho sempre vai bem',
};

export default async function CafesPage() {
  const todosCafes = await getCafes();

  // Agrupar dinamicamente por subcategoria
  const porSubcategoria = todosCafes.reduce((acc, cafe) => {
    const key = cafe.subcategoria?.trim() || 'Outro';
    if (!acc[key]) acc[key] = [];
    acc[key].push(cafe);
    return acc;
  }, {} as Record<string, typeof todosCafes>);

  // Ordenar: subcategorias conhecidas primeiro (na ordem de SUBCATEGORIAS),
  // depois as desconhecidas em ordem alfabética
  const ordemPreferida = SUBCATEGORIAS[CATEGORIAS.CAFES] ?? [];
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
          Cafés & Docerias
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          Porque um docinho sempre vai bem
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
