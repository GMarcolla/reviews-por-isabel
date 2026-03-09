import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Instagram, Globe, Clock, DollarSign, Ticket } from 'lucide-react';
import { getRestaurantes, getRestauranteBySlug } from '@/lib/data/restaurantes';
import { getCuponsByLugarId } from '@/lib/data/cupons';
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

  // Verificar se tem cupons
  const cupons = getCuponsByLugarId(restaurante.id);

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
        className="inline-flex items-center text-rosa-tulipa hover:text-rosa-tulipa-claro mb-6 transition-colors"
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
          <h1 className="font-display text-4xl md:text-5xl text-marrom-escuro mb-4">
            {restaurante.nome}
          </h1>
          
          <p className="text-lg text-marrom-escuro/80 mb-6">
            {restaurante.descricaoCompleta}
          </p>

          {/* Gallery */}
          {restaurante.galeria && restaurante.galeria.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl text-marrom-escuro mb-4">Galeria</h2>
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

          {/* Cupons Section */}
          {cupons.length > 0 && (
            <div className="mt-12">
              <div className="border-t-2 border-beje-tulipa pt-8 mb-6">
                <h2 className="font-display text-3xl text-marrom-escuro">
                  Cupons de Desconto
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {cupons.map((cupom) => (
                  <div key={cupom.id} className="bg-white rounded-card shadow-card p-6 hover:shadow-card-hover transition-shadow">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-rosa-tulipa rounded-full flex items-center justify-center">
                        <Ticket className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl text-marrom-escuro mb-1">
                          Cupom de Desconto
                        </h3>
                        <p className="text-sm text-marrom-escuro/80">
                          Oferta exclusiva
                        </p>
                      </div>
                    </div>

                    {/* Desconto */}
                    <div className="mb-4 p-4 bg-beje-tulipa/30 rounded-lg">
                      <p className="text-2xl font-bold text-marrom-escuro text-center">
                        {cupom.descricao}
                      </p>
                    </div>

                    {/* Código */}
                    {cupom.codigo && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-marrom-escuro mb-2">Código:</p>
                        <div className="p-3 bg-off-white-rosado rounded-lg border-2 border-dashed border-rosa-tulipa">
                          <p className="text-center font-mono font-bold text-marrom-escuro">
                            {cupom.codigo}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Termos */}
                    {cupom.termos && (
                      <div className="text-xs text-marrom-escuro/80">
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
          <div className="bg-beje-tulipa/30 rounded-lg p-6 sticky top-24">
            <h2 className="font-display text-2xl text-marrom-escuro mb-4">Informações</h2>
            
            <div className="space-y-4">
              {/* Address */}
              {restaurante.endereco && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-verde-tulipa flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-marrom-escuro">Endereço</p>
                    <p className="text-sm text-marrom-escuro/80 mb-2">{restaurante.endereco}</p>
                    <div className="space-y-2">
                      {restaurante.enderecoGoogleMaps && (
                        <a 
                          href={restaurante.enderecoGoogleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-white bg-verde-tulipa hover:bg-verde-tulipa-claro px-3 py-2 rounded-md transition-colors text-center"
                        >
                          📍 {restaurante.enderecoGoogleMapsLabel || 'Ver no Google Maps'}
                        </a>
                      )}
                      {restaurante.enderecoGoogleMaps2 && (
                        <a 
                          href={restaurante.enderecoGoogleMaps2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-white bg-verde-tulipa hover:bg-verde-tulipa-claro px-3 py-2 rounded-md transition-colors text-center"
                        >
                          📍 {restaurante.enderecoGoogleMaps2Label || 'Ver endereço 2'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Phone */}
              {restaurante.telefone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-verde-tulipa flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-escuro">Telefone</p>
                    <a 
                      href={`tel:${restaurante.telefone.replace(/\D/g, '')}`}
                      className="text-sm text-rosa-tulipa hover:text-rosa-tulipa-claro transition-colors"
                    >
                      {restaurante.telefone}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours */}
              {restaurante.horarioFuncionamento && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-verde-tulipa flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-escuro">Horário</p>
                    <p className="text-sm text-marrom-escuro/80">{restaurante.horarioFuncionamento}</p>
                  </div>
                </div>
              )}

              {/* Price range */}
              {restaurante.faixaPreco && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-verde-tulipa flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-escuro">Faixa de preço</p>
                    <p className="text-sm text-marrom-escuro/80">{renderPriceRange(restaurante.faixaPreco)}</p>
                  </div>
                </div>
              )}

              {/* Instagram */}
              {restaurante.instagram && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-verde-tulipa flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-escuro">Instagram</p>
                    <a 
                      href={restaurante.instagram.startsWith('http') ? restaurante.instagram : `https://instagram.com/${restaurante.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-rosa-tulipa hover:text-rosa-tulipa-claro transition-colors"
                    >
                      {restaurante.instagram.startsWith('http') ? 'Ver perfil' : restaurante.instagram}
                    </a>
                  </div>
                </div>
              )}

              {/* Review */}
              {restaurante.instagramReview && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-verde-tulipa flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-escuro">Review</p>
                    <a 
                      href={restaurante.instagramReview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-rosa-tulipa hover:text-rosa-tulipa-claro transition-colors"
                    >
                      Ver vídeo de review
                    </a>
                  </div>
                </div>
              )}

              {/* Website */}
              {restaurante.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-verde-tulipa flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-escuro">Website</p>
                    <a 
                      href={restaurante.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-rosa-tulipa hover:text-rosa-tulipa-claro transition-colors break-all"
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
