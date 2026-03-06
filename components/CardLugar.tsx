import Image from 'next/image';
import Link from 'next/link';
import { Lugar } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CardLugarProps {
  lugar: Lugar;
  variant?: 'default' | 'large';
  showCategory?: boolean;
}

/**
 * CardLugar Component
 * 
 * Componente de card para exibir lugares (restaurantes, cafés, passeios).
 * Inclui imagem otimizada, informações do lugar e link para detalhes.
 * 
 * @param lugar - Objeto com dados do lugar
 * @param variant - Variante do card (default ou large para imagens maiores)
 * @param showCategory - Se deve exibir a categoria do lugar
 * 
 * Requirements: 12.1, 3.2, 4.2, 5.2, 9.3, 9.4
 */
export function CardLugar({ 
  lugar, 
  variant = 'default',
  showCategory = false 
}: CardLugarProps) {
  // Determina a rota base baseada na categoria
  const getRoutePrefix = (categoria: string): string => {
    if (['hamburgueria', 'italiano', 'japones', 'pizzaria', 'romantico'].includes(categoria)) {
      return 'restaurantes';
    }
    if (['cafeteria', 'doceria', 'padaria', 'brunch'].includes(categoria)) {
      return 'cafes';
    }
    return 'passeios';
  };

  const routePrefix = getRoutePrefix(lugar.categoria);
  const detailsUrl = `/${routePrefix}/${lugar.id}`;

  // Tradução de categorias para exibição
  const getCategoryLabel = (categoria: string): string => {
    const labels: Record<string, string> = {
      hamburgueria: 'Hamburgueria',
      italiano: 'Italiano',
      japones: 'Japonês',
      pizzaria: 'Pizzaria',
      romantico: 'Romântico',
      cafeteria: 'Cafeteria',
      doceria: 'Doceria',
      padaria: 'Padaria',
      brunch: 'Brunch',
      evento: 'Evento',
      concerto: 'Concerto',
      festival: 'Festival',
      parque: 'Parque',
      passeio: 'Passeio',
    };
    return labels[categoria] || categoria;
  };

  const imageHeight = variant === 'large' ? 'h-64 md:h-80' : 'h-48 md:h-56';

  return (
    <article 
      className={cn(
        'group bg-white rounded-card overflow-hidden shadow-card',
        'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1',
        'flex flex-col'
      )}
    >
      {/* Imagem */}
      <div className={cn('relative w-full overflow-hidden', imageHeight)}>
        <Image
          src={lugar.imagem}
          alt={lugar.imagemAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={lugar.destaque}
        />
        
        {/* Badge de categoria (opcional) */}
        {showCategory && (
          <div className="absolute top-3 left-3 bg-rosa-blush/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-marrom-forte">
              {getCategoryLabel(lugar.categoria)}
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-grow p-4 md:p-5">
        {/* Nome do lugar */}
        <h3 className="text-xl md:text-2xl font-display font-bold text-marrom-forte mb-2 line-clamp-2">
          {lugar.nome}
        </h3>

        {/* Descrição curta */}
        <p className="text-sm md:text-base text-marrom-rosado mb-4 line-clamp-3 flex-grow">
          {lugar.descricaoCurta}
        </p>

        {/* Botão "ver mais" */}
        <Link 
          href={detailsUrl}
          className={cn(
            'inline-flex items-center justify-center',
            'px-5 py-2.5 rounded-lg',
            'bg-rosa-blush text-marrom-forte font-medium text-sm',
            'transition-colors duration-200',
            'hover:bg-rosa-blush/80 focus:outline-none focus:ring-2 focus:ring-rosa-blush focus:ring-offset-2',
            'self-start'
          )}
          aria-label={`Ver mais sobre ${lugar.nome}`}
        >
          Ver mais
        </Link>
      </div>
    </article>
  );
}
