import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Instagram, Globe, Clock, DollarSign, Ticket } from 'lucide-react';
import { getPrestadores, getPrestadorBySlug } from '@/lib/data/prestadores';
import { getCuponsByLugarId } from '@/lib/data/cupons';
import { Container } from '@/components/Container';

// Generate static params for SSG
export async function generateStaticParams() {
  const prestadores = getPrestadores();
  return prestadores.map((prestador) => ({
    slug: prestador.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const prestador = getPrestadorBySlug(slug);
  
  if (!prestador) {
    return {
      title: 'Prestador não encontrado - Reviews por Isabel',
    };
  }

  return {
    title: `${prestador.nome} - Reviews por Isabel`,
    description: prestador.descricaoCurta,
    openGraph: {
      title: prestador.nome,
      description: prestador.descricaoCurta,
      images: [prestador.imagem],
    },
  };
}

export default async function PrestadorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prestador = getPrestadorBySlug(slug);

  if (!prestador) {
    notFound();
  }

  // Verificar se tem cupons
  const cupons = getCuponsByLugarId(prestador.id);

  // Helper function to render price range
  const renderPriceRange = (faixaPreco?: number) => {
    if (!faixaPreco) return null;
    return '$'.repeat(faixaPreco);
  };

  return (
    <Container className="py-12">
      {/* Back button */}
      <Link 
        href="/prestadores" 
        className="inline-flex items-center text-marrom-rosado hover:text-marrom-forte mb-6 transition-colors"
      >
        ← Voltar para Prestadores de Serviços
      </Link>

      {/* Main image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
        <Image
          src={prestador.imagem}
          alt={prestador.imagemAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Prestador info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="font-display text-4xl md:text-5xl text-marrom-forte mb-4">
            {prestador.nome}
          </h1>
          
          <p className="text-lg text-marrom-rosado mb-6">
            {prestador.descricaoCompleta}
          </p>

          {/* Gallery */}
          {prestador.galeria && prestador.galeria.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl text-marrom-forte mb-4">Galeria</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {prestador.galeria.map((imagem, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={imagem}
                      alt={`${prestador.nome} - Imagem ${index + 1}`}
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
                    {/* Header */}
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

                    {/* Desconto */}
                    <div className="mb-4 p-4 bg-rosa-claro/50 rounded-lg">
                      <p className="text-2xl font-bold text-marrom-forte text-center">
                        {cupom.descricao}
                      </p>
                    </div>

                    {/* Código */}
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

                    {/* Termos */}
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
              {prestador.endereco && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-marrom-forte">Endereço</p>
                    <p className="text-sm text-marrom-rosado mb-2">{prestador.endereco}</p>
                    <div className="space-y-2">
                      {prestador.enderecoGoogleMaps && (
                        <a 
                          href={prestador.enderecoGoogleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-white bg-marrom-rosado hover:bg-marrom-forte px-3 py-2 rounded-md transition-colors text-center"
                        >
                          📍 {prestador.enderecoGoogleMapsLabel || 'Ver no Google Maps'}
                        </a>
                      )}
                      {prestador.enderecoGoogleMaps2 && (
                        <a 
                          href={prestador.enderecoGoogleMaps2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-white bg-marrom-rosado hover:bg-marrom-forte px-3 py-2 rounded-md transition-colors text-center"
                        >
                          📍 {prestador.enderecoGoogleMaps2Label || 'Ver endereço 2'}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Phone */}
              {prestador.telefone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Telefone</p>
                    <a 
                      href={`tel:${prestador.telefone.replace(/\D/g, '')}`}
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {prestador.telefone}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours */}
              {prestador.horarioFuncionamento && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Horário</p>
                    <p className="text-sm text-marrom-rosado">{prestador.horarioFuncionamento}</p>
                  </div>
                </div>
              )}

              {/* Price range */}
              {prestador.faixaPreco && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Faixa de preço</p>
                    <p className="text-sm text-marrom-rosado">{renderPriceRange(prestador.faixaPreco)}</p>
                  </div>
                </div>
              )}

              {/* Instagram */}
              {prestador.instagram && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Instagram</p>
                    <a 
                      href={prestador.instagram.startsWith('http') ? prestador.instagram : `https://instagram.com/${prestador.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {prestador.instagram.startsWith('http') ? 'Ver perfil' : prestador.instagram}
                    </a>
                  </div>
                </div>
              )}

              {/* Review */}
              {prestador.instagramReview && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Review</p>
                    <a 
                      href={prestador.instagramReview}
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
              {prestador.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Website</p>
                    <a 
                      href={prestador.website}
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
