import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CategorySection } from '@/components/CategorySection';
import { getPrestadores } from '@/lib/data/prestadores';
import { getCategoriaByRota } from '@/lib/categorias';

export const metadata: Metadata = {
  title: 'Prestadores de Serviços',
  description: 'É sempre bom ter com quem contar',
};

export default async function PrestadoresPage() {
  const [todosPrestadores, categoriaData] = await Promise.all([
    getPrestadores(),
    getCategoriaByRota('prestadores'),
  ]);

  const subcategoriasOrdenadas = categoriaData?.subcategorias ?? [];

  const porSubcategoria = todosPrestadores.reduce((acc, prestador) => {
    const key = prestador.subcategoriaId ?? 'sem-subcategoria';
    if (!acc[key]) acc[key] = [];
    acc[key].push(prestador);
    return acc;
  }, {} as Record<string, typeof todosPrestadores>);

  const subcategoriasComLugares = subcategoriasOrdenadas.filter(
    (s) => porSubcategoria[s.id]
  );

  const semSubcategoria = porSubcategoria['sem-subcategoria'];

  return (
    <Container size="xl" className="py-8 md:py-12">
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-escuro mb-4">
          Prestadores de Serviços
        </h1>
        <p className="text-lg md:text-xl text-marrom-escuro/80 max-w-2xl mx-auto">
          É sempre bom ter com quem contar
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
