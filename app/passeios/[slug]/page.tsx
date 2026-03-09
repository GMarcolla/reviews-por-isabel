import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Instagram, Globe, Clock, DollarSign } from 'lucide-react';
import { getPasseios, getPasseioBySlug } from '@/lib/data/passeios';
import { Container } from '@/components/Container';

// Generate static params for SSG
export async function generateStaticParams() {
  const passeios = getPasseios();
  return passeios.map((passeio) => ({
    slug: passeio.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const passeio = getPasseioBySlug(slug);
  
  if (!passeio) {
    return {
      title: 'Passeio não encontrado - Reviews por Isabel',
    };
  }

  return {
    title: `${passeio.nome} - Reviews por Isabel`,
    description: passeio.descricaoCurta,
    openGraph: {
      title: passeio.nome,
      description: passeio.descricaoCurta,
      images: [passeio.imagem],
    },
  };
}

export default async function PasseioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const passeio = getPasseioBySlug(slug);

  if (!passeio) {
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
        href="/passeios" 
        className="inline-flex items-center text-rosa-tulipa hover:text-rosa-tulipa-claro mb-6 transition-colors"
      >
        ← Voltar para Passeios
      </Link>

      {/* Main image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
        <Image
          src={passeio.imagem}
          alt={passeio.imagemAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Passeio info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="font-display text-4xl md:text-5xl text-marrom-escuro mb-4">
            {passeio.nome}
          </h1>
          
          <p className="text-lg text-marrom-escuro/80 mb-6">
            {passeio.descricaoCompleta}
          </p>

          {/* Gallery */}
          {passeio.galeria && passeio.galeria.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl text-marrom-escuro mb-4">Galeria</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {passeio.galeria.map((imagem, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={imagem}
                      alt={`${passeio.nome} - Imagem ${index + 1}`}
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
              {passeio.endereco && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Endereço</p>
                    <p className="text-sm text-marrom-rosado">{passeio.endereco}</p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {passeio.telefone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Telefone</p>
                    <a 
                      href={`tel:${passeio.telefone.replace(/\D/g, '')}`}
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {passeio.telefone}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours */}
              {passeio.horarioFuncionamento && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Horário</p>
                    <p className="text-sm text-marrom-rosado">{passeio.horarioFuncionamento}</p>
                  </div>
                </div>
              )}

              {/* Price range */}
              {passeio.faixaPreco && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Faixa de preço</p>
                    <p className="text-sm text-marrom-rosado">{renderPriceRange(passeio.faixaPreco)}</p>
                  </div>
                </div>
              )}

              {/* Instagram */}
              {passeio.instagram && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Instagram</p>
                    <a 
                      href={`https://instagram.com/${passeio.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {passeio.instagram}
                    </a>
                  </div>
                </div>
              )}

              {/* Website */}
              {passeio.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Website</p>
                    <a 
                      href={passeio.website}
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
