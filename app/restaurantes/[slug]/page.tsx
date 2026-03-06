import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Instagram, Globe, Clock, DollarSign } from 'lucide-react';
import { getRestaurantes, getRestauranteBySlug } from '@/lib/data/restaurantes';
import { Container } from '@/components/Container';

// Generate static params for SSG
export async function generateStaticParams() {
  const restaurantes = getRestaurantes();
  return restaurantes.map((restaurante) => ({
    slug: restaurante.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const restaurante = getRestauranteBySlug(slug);
  
  if (!restaurante) {
    return {
      title: 'Restaurante não encontrado - Reviews por Isabel',
    };
  }

  return {
    title: `${restaurante.nome} - Reviews por Isabel`,
    description: restaurante.descricaoCurta,
    openGraph: {
      title: restaurante.nome,
      description: restaurante.descricaoCurta,
      images: [restaurante.imagem],
    },
  };
}

export default async function RestaurantePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurante = getRestauranteBySlug(slug);

  if (!restaurante) {
    notFound();
  }

  // Helper function to render price range
  const renderPriceRange = (faixaPreco?: number) => {
    if (!faixaPreco) return null;
    return '$'.repeat(faixaPreco);
  };

  return (
    <Container className="py-12">
      {/* Back button */}
      <Link 
        href="/restaurantes" 
        className="inline-flex items-center text-marrom-rosado hover:text-marrom-forte mb-6 transition-colors"
      >
        ← Voltar para Restaurantes
      </Link>

      {/* Main image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
        <Image
          src={restaurante.imagem}
          alt={restaurante.imagemAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Restaurant info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="font-display text-4xl md:text-5xl text-marrom-forte mb-4">
            {restaurante.nome}
          </h1>
          
          <p className="text-lg text-marrom-rosado mb-6">
            {restaurante.descricaoCompleta}
          </p>

          {/* Gallery */}
          {restaurante.galeria && restaurante.galeria.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl text-marrom-forte mb-4">Galeria</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {restaurante.galeria.map((imagem, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={imagem}
                      alt={`${restaurante.nome} - Imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar with details */}
        <div className="lg:col-span-1">
          <div className="bg-rosa-claro rounded-lg p-6 sticky top-24">
            <h2 className="font-display text-2xl text-marrom-forte mb-4">Informações</h2>
            
            <div className="space-y-4">
              {/* Address */}
              {restaurante.endereco && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Endereço</p>
                    <p className="text-sm text-marrom-rosado">{restaurante.endereco}</p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {restaurante.telefone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Telefone</p>
                    <a 
                      href={`tel:${restaurante.telefone.replace(/\D/g, '')}`}
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {restaurante.telefone}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours */}
              {restaurante.horarioFuncionamento && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Horário</p>
                    <p className="text-sm text-marrom-rosado">{restaurante.horarioFuncionamento}</p>
                  </div>
                </div>
              )}

              {/* Price range */}
              {restaurante.faixaPreco && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Faixa de preço</p>
                    <p className="text-sm text-marrom-rosado">{renderPriceRange(restaurante.faixaPreco)}</p>
                  </div>
                </div>
              )}

              {/* Instagram */}
              {restaurante.instagram && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Instagram</p>
                    <a 
                      href={`https://instagram.com/${restaurante.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {restaurante.instagram}
                    </a>
                  </div>
                </div>
              )}

              {/* Website */}
              {restaurante.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Website</p>
                    <a 
                      href={restaurante.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors break-all"
                    >
                      Visitar site
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
