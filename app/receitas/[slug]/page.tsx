import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/Container';
import { ReceitaDetail } from '@/components/receitas/ReceitaDetail';
import { getReceitas, getReceitaBySlug } from '@/lib/receitas';

// Generate static params for SSG
export async function generateStaticParams() {
  const receitas = await getReceitas();
  return receitas.map((receita) => ({
    slug: receita.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const receita = await getReceitaBySlug(slug);

  if (!receita) {
    return {
      title: 'Receita não encontrada - Reviews por Isabel',
    };
  }

  return {
    title: `${receita.titulo} - Cozinhando com Isabel`,
    description: `Receita de ${receita.titulo} preparada por ${receita.convidado}. ${receita.opiniao.substring(0, 150)}...`,
    openGraph: {
      title: `${receita.titulo} - Cozinhando com Isabel`,
      description: `Receita preparada por ${receita.convidado}`,
      images: receita.imagem ? [receita.imagem] : [],
      type: 'article',
      publishedTime: receita.createdAt.toISOString(),
      modifiedTime: receita.updatedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${receita.titulo} - Cozinhando com Isabel`,
      description: `Receita preparada por ${receita.convidado}`,
      images: receita.imagem ? [receita.imagem] : [],
    },
  };
}

export default async function ReceitaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const receita = await getReceitaBySlug(slug);

  if (!receita) {
    notFound();
  }

  // JSON-LD structured data for recipe
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: receita.titulo,
    author: {
      '@type': 'Person',
      name: receita.convidado,
    },
    datePublished: receita.createdAt.toISOString(),
    description: receita.opiniao,
    image: receita.imagem || undefined,
    recipeIngredient: receita.ingredientes.split('\n').filter(Boolean),
    recipeInstructions: receita.passos.split('\n').filter(Boolean).map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step,
    })),
    aggregateRating: undefined, // Pode ser adicionado no futuro
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="py-12">
        {/* Back button */}
        <Link
          href="/receitas"
          className="inline-flex items-center text-verde-tulipa hover:text-verde-tulipa/80 mb-6 transition-colors font-medium"
        >
          ← Voltar para Receitas
        </Link>

        {/* Recipe detail */}
        <ReceitaDetail receita={receita} />

        {/* Navigation to other recipes */}
        <div className="mt-16 pt-8 border-t border-beje-tulipa">
          <div className="text-center">
            <Link
              href="/receitas"
              className="inline-flex items-center justify-center px-6 py-3 bg-verde-tulipa text-white rounded-lg font-medium hover:bg-verde-tulipa/90 transition-colors"
            >
              Ver todas as receitas
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
