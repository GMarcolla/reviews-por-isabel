import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Instagram, Globe, Clock, DollarSign, Ticket } from 'lucide-react';
import { getCafes, getCafeBySlug } from '@/lib/data/cafes';
import { getCuponsByLugarId } from '@/lib/data/cupons';
import { Container } from '@/components/Container';

// Generate static params for SSG
export async function generateStaticParams() {
  const cafes = getCafes();
  return cafes.map((cafe) => ({
    slug: cafe.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cafe = getCafeBySlug(slug);
  
  if (!cafe) {
    return {
      title: 'Café não encontrado - Reviews por Isabel',
    };
  }

  return {
    title: `${cafe.nome} - Reviews por Isabel`,
    description: cafe.descricaoCurta,
    openGraph: {
      title: cafe.nome,
      description: cafe.descricaoCurta,
      images: [cafe.imagem],
    },
  };
}

export default async function CafePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cafe = getCafeBySlug(slug);

  if (!cafe) {
    notFound();
  }

  // Verificar se tem cupons
  const cupons = getCuponsByLugarId(cafe.id);

  // Helper function to render price range
  const renderPriceRange = (faixaPreco?: number) => {
    if (!faixaPreco) return null;
    return '$'.repeat(faixaPreco);
  };

  return (
    <Container className="py-12">
      {/* Back button */}
      <Link 
        href="/cafes" 
        className="inline-flex items-center text-marrom-rosado hover:text-marrom-forte mb-6 transition-colors"
      >
        ← Voltar para Cafés & Docerias
      </Link>

      {/* Main image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
        <Image
          src={cafe.imagem}
          alt={cafe.imagemAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Cafe info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="font-display text-4xl md:text-5xl text-marrom-forte mb-4">
            {cafe.nome}
          </h1>
          
          <p className="text-lg text-marrom-rosado mb-6">
            {cafe.descricaoCompleta}
          </p>

          {/* Gallery */}
          {cafe.galeria && cafe.galeria.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl text-marrom-forte mb-4">Galeria</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cafe.galeria.map((imagem, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={imagem}
                      alt={`${cafe.nome} - Imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cupons Section */}
          {cupons.length > 0 && (
            <div className="mt-12">
              <div className="border-t-2 border-rosa-claro pt-8 mb-6">
                <h2 className="font-display text-3xl text-marrom-forte">
                  Cupons de Desconto
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {cupons.map((cupom) => (
                  <div key={cupom.id} className="bg-white rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-rosa-blush rounded-full flex items-center justify-center">
                        <Ticket className="w-6 h-6 text-marrom-forte" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl text-marrom-forte mb-1">
                          Cupom de Desconto
                        </h3>
                        <p className="text-sm text-marrom-rosado">
                          Oferta exclusiva
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 p-4 bg-rosa-claro/50 rounded-lg">
                      <p className="text-2xl font-bold text-marrom-forte text-center">
                        {cupom.descricao}
                      </p>
                    </div>
                    {cupom.codigo && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-marrom-forte mb-2">Código:</p>
                        <div className="p-3 bg-creme-claro rounded-lg border-2 border-dashed border-rosa-blush">
                          <p className="text-center font-mono font-bold text-marrom-forte">
                            {cupom.codigo}
                          </p>
                        </div>
                      </div>
                    )}
                    {cupom.termos && (
                      <div className="text-xs text-marrom-rosado">
                        <p className="font-semibold mb-1">Termos:</p>
                        <p>{cupom.termos}</p>
                      </div>
                    )}
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
              {cafe.endereco && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-marrom-forte">Endereço</p>
                    <p className="text-sm text-marrom-rosado mb-2">{cafe.endereco}</p>
                    <div className="space-y-2">
                      {cafe.enderecoGoogleMaps && (
                        <a 
                          href={cafe.enderecoGoogleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-white bg-marrom-rosado hover:bg-marrom-forte px-3 py-2 rounded-md transition-colors text-center"
                        >
                          📍 {cafe.enderecoGoogleMapsLabel || 'Ver no Google Maps'}
                        </a>
                      )}
                      {cafe.enderecoGoogleMaps2 && (
                        <a 
                          href={cafe.enderecoGoogleMaps2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-white bg-marrom-rosado hover:bg-marrom-forte px-3 py-2 rounded-md transition-colors text-center"
                        >
                          📍 {cafe.enderecoGoogleMaps2Label || 'Ver endereço 2'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Phone */}
              {cafe.telefone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Telefone</p>
                    <a 
                      href={`tel:${cafe.telefone.replace(/\D/g, '')}`}
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {cafe.telefone}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours */}
              {cafe.horarioFuncionamento && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Horário</p>
                    <p className="text-sm text-marrom-rosado">{cafe.horarioFuncionamento}</p>
                  </div>
                </div>
              )}

              {/* Price range */}
              {cafe.faixaPreco && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Faixa de preço</p>
                    <p className="text-sm text-marrom-rosado">{renderPriceRange(cafe.faixaPreco)}</p>
                  </div>
                </div>
              )}

              {/* Instagram */}
              {cafe.instagram && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Instagram</p>
                    <a 
                      href={cafe.instagram.startsWith('http') ? cafe.instagram : `https://instagram.com/${cafe.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {cafe.instagram.startsWith('http') ? 'Ver perfil' : cafe.instagram}
                    </a>
                  </div>
                </div>
              )}

              {/* Review */}
              {cafe.instagramReview && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Review</p>
                    <a 
                      href={cafe.instagramReview}
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
              {cafe.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Website</p>
                    <a 
                      href={cafe.website}
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
