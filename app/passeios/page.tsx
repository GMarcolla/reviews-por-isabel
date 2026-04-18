import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CategorySection } from '@/components/CategorySection';
import { getPasseios } from '@/lib/data/passeios';
import { CATEGORIAS, SUBCATEGORIAS } from '@/lib/categorias';

/**
 * Página de Passeios
 *
 * Exibe passeios e experiências agrupados dinamicamente por subcategoria.
 * As seções são renderizadas apenas para subcategorias com registros no banco.
 *
 * Requirements: 5.1, 5.4, 5.5
 */

export const metadata: Metadata = {
  title: 'Passeios',
  description: 'Descubra passeios e experiências incríveis em Blumenau e região.',
};

export default async function PasseiosPage() {
  const todosPasseios = await getPasseios();

  // Agrupar dinamicamente por subcategoria
  const porSubcategoria = todosPasseios.reduce((acc, passeio) => {
    const key = passeio.subcategoria?.trim() || 'Outro';
    if (!acc[key]) acc[key] = [];
    acc[key].push(passeio);
    return acc;
  }, {} as Record<string, typeof todosPasseios>);

  // Ordenar: subcategorias conhecidas primeiro (na ordem de SUBCATEGORIAS),
  // depois as desconhecidas em ordem alfabética
  const ordemPreferida = SUBCATEGORIAS[CATEGORIAS.PASSEIOS] ?? [];
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
          Passeios
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          Descubra experiências incríveis e passeios inesquecíveis
          em Blumenau e região.
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
