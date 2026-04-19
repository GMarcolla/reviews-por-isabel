import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CategorySection } from '@/components/CategorySection';
import { getPasseios } from '@/lib/data/passeios';
import { getCategoriaByRota } from '@/lib/categorias';

export const metadata: Metadata = {
  title: 'Passeios',
  description: 'Descubra passeios e experiências incríveis em Blumenau e região.',
};

export default async function PasseiosPage() {
  const [todosPasseios, categoriaData] = await Promise.all([
    getPasseios(),
    getCategoriaByRota('lazer'),
  ]);

  const subcategoriasOrdenadas = categoriaData?.subcategorias ?? [];

  const porSubcategoria = todosPasseios.reduce((acc, passeio) => {
    const key = passeio.subcategoriaId ?? 'sem-subcategoria';
    if (!acc[key]) acc[key] = [];
    acc[key].push(passeio);
    return acc;
  }, {} as Record<string, typeof todosPasseios>);

  const subcategoriasComLugares = subcategoriasOrdenadas.filter(
    (s) => porSubcategoria[s.id]
  );

  const semSubcategoria = porSubcategoria['sem-subcategoria'];

  return (
    <Container size="xl" className="py-8 md:py-12">
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-escuro mb-4">
          Passeios
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          Descubra experiências incríveis e passeios inesquecíveis
          em Blumenau e região.
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
