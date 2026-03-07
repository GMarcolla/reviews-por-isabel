import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Instagram, Globe, Clock, DollarSign, Ticket } from 'lucide-react';
import { getLojas, getLojaBySlug } from '@/lib/data/lojas';
import { getCupomByLugarId } from '@/lib/data/cupons';
import { Container } from '@/components/Container';

// Generate static params for SSG
export async function generateStaticParams() {
  const lojas = getLojas();
  return lojas.map((loja) => ({
    slug: loja.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const loja = getLojaBySlug(slug);
  
  if (!loja) {
    return {
      title: 'Loja não encontrada - Reviews por Isabel',
    };
  }

  return {
    title: `${loja.nome} - Reviews por Isabel`,
    description: loja.descricaoCurta,
    openGraph: {
      title: loja.nome,
      description: loja.descricaoCurta,
      images: [loja.imagem],
    },
  };
}

export default async function LojaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loja = getLojaBySlug(slug);

  if (!loja) {
    notFound();
  }

  // Verificar se tem cupom
  const cupom = getCupomByLugarId(loja.id);

  // Helper function to render price range
  const renderPriceRange = (faixaPreco?: number) => {
    if (!faixaPreco) return null;
    return '$'.repeat(faixaPreco);
  };

  return (
    <Container className="py-12">
      {/* Back button */}
      <Link 
        href="/lojas" 
        className="inline-flex items-center text-marrom-rosado hover:text-marrom-forte mb-6 transition-colors"
      >
        ← Voltar para Lojas
      </Link>

      {/* Main image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
        <Image
          src={loja.imagem}
          alt={loja.imagemAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Loja info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <h1 className="font-display text-4xl md:text-5xl text-marrom-forte mb-4">
            {loja.nome}
          </h1>
          
          <p className="text-lg text-marrom-rosado mb-6">
            {loja.descricaoCompleta}
          </p>

          {/* Gallery */}
          {loja.galeria && loja.galeria.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl text-marrom-forte mb-4">Galeria</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {loja.galeria.map((imagem, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={imagem}
                      alt={`${loja.nome} - Imagem ${index + 1}`}
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
            
            {/* Botão de Cupom */}
            {cupom && (
              <Link
                href={`/cupons?lugar=${loja.id}`}
                className="flex items-center justify-center gap-2 w-full mb-6 px-4 py-3 bg-rosa-blush text-marrom-forte font-semibold rounded-lg hover:bg-rosa-blush/80 transition-colors"
              >
                <Ticket className="w-5 h-5" />
                Ver Cupom de Desconto
              </Link>
            )}
            
            <div className="space-y-4">
              {/* Address */}
              {loja.endereco && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Endereço</p>
                    <p className="text-sm text-marrom-rosado">{loja.endereco}</p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {loja.telefone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Telefone</p>
                    <a 
                      href={`tel:${loja.telefone.replace(/\D/g, '')}`}
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {loja.telefone}
                    </a>
                  </div>
                </div>
              )}

              {/* Hours */}
              {loja.horarioFuncionamento && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Horário</p>
                    <p className="text-sm text-marrom-rosado">{loja.horarioFuncionamento}</p>
                  </div>
                </div>
              )}

              {/* Price range */}
              {loja.faixaPreco && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Faixa de preço</p>
                    <p className="text-sm text-marrom-rosado">{renderPriceRange(loja.faixaPreco)}</p>
                  </div>
                </div>
              )}

              {/* Instagram */}
              {loja.instagram && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Instagram</p>
                    <a 
                      href={loja.instagram.startsWith('http') ? loja.instagram : `https://instagram.com/${loja.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-marrom-rosado hover:text-marrom-forte transition-colors"
                    >
                      {loja.instagram.startsWith('http') ? 'Ver perfil' : loja.instagram}
                    </a>
                  </div>
                </div>
              )}

              {/* Review */}
              {loja.instagramReview && (
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Review</p>
                    <a 
                      href={loja.instagramReview}
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
              {loja.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-marrom-rosado flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-marrom-forte">Website</p>
                    <a 
                      href={loja.website}
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
