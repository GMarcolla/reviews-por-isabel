import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Instagram, Globe, Clock, DollarSign } from 'lucide-react';
import { getPasseios, getPasseioBySlug } from '@/lib/data/passeios';
import { Container } from '@/components/Container';

// Generate static params for SSG
export async function generateStaticParams() {
  const lazer = getPasseios();
  return lazer.map((item) => ({
    slug: item.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lazer = getPasseioBySlug(slug);
  
  if (!lazer) {
    return {
      title: 'Lazer não encontrado - Reviews por Isabel',
    };
  }

  return {
    title: `${lazer.nome} - Reviews por Isabel`,
    description: lazer.descricaoCurta,
    openGraph: {
      title: lazer.nome,
      description: lazer.descricaoCurta,
      images: [lazer.imagem],
    },
  };
}

export default async function LazerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lazer = getPasseioBySlug(slug);

  if (!lazer) {
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
        href="/lazer" 
        className="inline-flex items-center text-marrom-rosado hover:text-marrom-forte mb-6 transition-colors"
      >
        ← Voltar para Lazer
      </Link>

      {/* Main image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
        <Image
          src={lazer.imagem}
          alt={lazer.imagemAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Lazer info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="font-display text-4xl md:text-5xl text-marrom-forte mb-4">
            {lazer.nome}
          </h1>
          
          <p className="text-lg text-marrom-rosado mb-6">
            {lazer.descricaoCompleta}
          </p>

          {/* Gallery */}
          {lazer.galeria && lazer.galeria.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl text-marrom-forte mb-4">Galeria</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {lazer.galeria.map((imagem, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={imagem}
                      alt={`${lazer.nome} - Imagem ${index + 1}`}
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
              {lazer.endereco && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-marrom-forte">Endereço</p>
                    <p className="text-sm text-marrom-rosado mb-2">{lazer.endereco}</p>
                    <div className="space-y-2">
                      {lazer.enderecoGoogleMaps && (
                        <a 
                          href={lazer.enderecoGoogleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-white bg-marrom-rosado hover:bg-marrom-forte px-3 py-2 rounded-md transition-colors text-center"
                        >
                          📍 {lazer.enderecoGoogleMapsLabel || 'Ver no Google Maps'}
                        </a>
                      )}
                      {lazer.enderecoGoogleMaps2 && (
                        <a 
                          href={lazer.enderecoGoogleMaps2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-white bg-marrom-rosado hover:bg-marrom-forte px-3 py-2 rounded-md transition-colors text-center"
                        >
                          📍 {lazer.enderecoGoogleMaps2Label || 'Ver endereço 2'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Phone */}
              {lazer.telefone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Telefone</p>
                    <a 
                      href={`tel:${lazer.telefone.replace(/\D/g, '')}`}
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {lazer.telefone}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours */}
              {lazer.horarioFuncionamento && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Horário</p>
                    <p className="text-sm text-marrom-rosado">{lazer.horarioFuncionamento}</p>
                  </div>
                </div>
              )}

              {/* Price range */}
              {lazer.faixaPreco && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Faixa de preço</p>
                    <p className="text-sm text-marrom-rosado">{renderPriceRange(lazer.faixaPreco)}</p>
                  </div>
                </div>
              )}

              {/* Instagram */}
              {lazer.instagram && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Instagram</p>
                    <a 
                      href={lazer.instagram.startsWith('http') ? lazer.instagram : `https://instagram.com/${lazer.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {lazer.instagram.startsWith('http') ? 'Ver perfil' : lazer.instagram}
                    </a>
                  </div>
                </div>
              )}

              {/* Review */}
              {lazer.instagramReview && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Review</p>
                    <a 
                      href={lazer.instagramReview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      Ver vídeo de review
                    </a>
                  </div>
                </div>
              )}

              {/* Website */}
              {lazer.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Website</p>
                    <a 
                      href={lazer.website}
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
