import Image from 'next/image';
import Link from 'next/link';
import { Lugar } from '@/lib/types';
import { cn } from '@/lib/utils';
import { categoryColors } from '@/lib/design-tokens';

interface CardLugarProps {
  lugar: Lugar;
  variant?: 'default' | 'large';
  showCategory?: boolean;
  showSubcategoria?: boolean;
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
  showCategory = false,
  showSubcategoria = false
}: CardLugarProps) {
  // Determina a rota base baseada na categoria
  const getRoutePrefix = (categoria: string): string => {
    if (['hamburgueria', 'esfirraria', 'padaria', 'gelateria', 'pastelaria', 'empadas', 'hotdog', 'germanico', 'buffet', 'bar', 'coreano', 'mexicano', 'italiano', 'japones', 'pizzaria', 'romantico'].includes(categoria)) {
      return 'restaurantes';
    }
    if (['cafeteria', 'doceria', 'brunch'].includes(categoria)) {
      return 'cafes';
    }
    if (['evento', 'concerto', 'festival', 'parque', 'lazer'].includes(categoria)) {
      return 'lazer';
    }
    if (['dentista', 'arquiteta', 'unhas', 'beleza', 'servico'].includes(categoria)) {
      return 'prestadores';
    }
    if (['moda', 'decoracao', 'livraria', 'loja'].includes(categoria)) {
      return 'lojas';
    }
    return 'lazer';
  };

  const routePrefix = getRoutePrefix(lugar.categoria);
  const detailsUrl = `/${routePrefix}/${lugar.id}`;

  // Tradução de categorias para exibição
  const getCategoryLabel = (categoria: string): string => {
    const labels: Record<string, string> = {
      hamburgueria: 'Hamburgueria',
      esfirraria: 'Esfirraria',
      padaria: 'Padaria',
      gelateria: 'Gelateria',
      pastelaria: 'Pastelaria',
      empadas: 'Empadas',
      hotdog: 'Hot Dog',
      germanico: 'Germânico',
      buffet: 'Buffet',
      bar: 'Bar',
      coreano: 'Coreano',
      mexicano: 'Mexicano',
      italiano: 'Italiano',
      japones: 'Japonês',
      pizzaria: 'Pizzaria',
      romantico: 'Romântico',
      cafeteria: 'Cafeteria',
      doceria: 'Doceria',
      brunch: 'Brunch',
      evento: 'Evento',
      concerto: 'Concerto',
      festival: 'Festival',
      parque: 'Parque',
      lazer: 'Lazer',
      dentista: 'Dentista',
      arquiteta: 'Arquiteta',
      unhas: 'Unhas',
      beleza: 'Beleza',
      servico: 'Serviço',
      moda: 'Moda',
      decoracao: 'Decoração',
      livraria: 'Livraria',
      loja: 'Loja',
    };
    return labels[categoria] || categoria;
  };

  const imageHeight = variant === 'large' ? 'h-64 md:h-80' : 'h-48 md:h-56';

  return (
    <article 
      className={cn(
        'group bg-white rounded-card overflow-hidden shadow-card-tulipa',
        'transition-all duration-300 hover:shadow-card-tulipa-hover hover:-translate-y-1',
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
        {showCategory && (() => {
          const categoryKey = routePrefix as keyof typeof categoryColors;
          const colors = categoryColors[categoryKey] || categoryColors.lazer;
          return (
            <div 
              className="absolute top-3 left-3 backdrop-blur-sm px-3 py-1 rounded-full"
              style={{ backgroundColor: colors.badge }}
            >
              <span 
                className="text-xs font-medium"
                style={{ color: colors.badgeText }}
              >
                {getCategoryLabel(lugar.categoria)}
              </span>
            </div>
          );
        })()}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-grow p-4 md:p-5">
        {/* Nome do lugar */}
        <h3 className="text-xl md:text-2xl font-display font-bold text-marrom-escuro mb-2 line-clamp-2">
          {lugar.nome}
          {showSubcategoria && lugar.subcategoria && (
            <span className="text-base md:text-lg font-normal text-marrom-escuro/80 ml-2">
              ({lugar.subcategoria})
            </span>
          )}
        </h3>

        {/* Descrição curta */}
        <p className="text-sm md:text-base text-marrom-escuro/80 mb-4 line-clamp-3 flex-grow">
          {lugar.descricaoCurta}
        </p>

        {/* Botão "ver mais" */}
        <Link 
          href={detailsUrl}
          className={cn(
            'inline-flex items-center justify-center',
            'px-5 py-2.5 rounded-lg',
            'bg-rosa-tulipa text-white font-medium text-sm',
            'transition-colors duration-200',
            'hover:bg-rosa-tulipa-claro focus:outline-none focus:ring-2 focus:ring-rosa-tulipa focus:ring-offset-2',
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
