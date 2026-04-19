import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CategorySection } from '@/components/CategorySection';
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

  const porSubcategoria = todasLojas.reduce((acc, loja) => {
    const key = loja.subcategoriaId ?? 'sem-subcategoria';
    if (!acc[key]) acc[key] = [];
    acc[key].push(loja);
    return acc;
  }, {} as Record<string, typeof todasLojas>);

  const subcategoriasComLugares = subcategoriasOrdenadas.filter(
    (s) => porSubcategoria[s.id]
  );

  const semSubcategoria = porSubcategoria['sem-subcategoria'];

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

      {subcategoriasComLugares.map((subcategoria) => (
        <CategorySection
          key={subcategoria.id}
          title={subcategoria.nome}
          lugares={porSubcategoria[subcategoria.id]}
          columns={3}
        />
      ))}

      {semSubcategoria && semSubcategoria.length > 0 && (
        <CategorySection title="Outros" lugares={semSubcategoria} columns={3} />
      )}
    </Container>
  );
}
