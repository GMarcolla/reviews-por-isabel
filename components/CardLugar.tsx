import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Lugar } from '@/lib/types';

interface CardLugarProps {
  lugar: Lugar;
  variant?: 'default' | 'large';
  showCategory?: boolean;
  showSubcategoria?: boolean;
}

export function CardLugar({
  lugar,
  variant = 'default',
  showCategory = false,
  showSubcategoria = false,
}: CardLugarProps) {
  // Rota vem diretamente do objeto categoria (populado via include)
  const routePrefix = lugar.categoria?.rota ?? 'restaurantes';
  const detailsUrl = `/${routePrefix}/${lugar.slug}`;
  const imageHeight = variant === 'large' ? 'h-64 md:h-80' : 'h-48 md:h-56';

  // Label para exibição: usa subcategoria se disponível, senão o label da categoria
  const displayLabel = lugar.subcategoria?.nome ?? lugar.categoria?.label ?? '';

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
          priority={lugar.destaque || false}
        />

        {/* Badge de categoria (opcional) */}
        {showCategory && (
          <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-white">{displayLabel}</span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-grow p-4 md:p-5">
        {/* Nome do lugar */}
        <h3 className="text-xl md:text-2xl font-display font-bold text-marrom-escuro mb-2 line-clamp-2">
          {lugar.nome}
          {showSubcategoria && lugar.subcategoria?.nome && (
            <span className="text-base md:text-lg font-normal text-marrom-escuro/80 ml-2">
              ({lugar.subcategoria.nome})
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
            'bg-terracota !text-white font-medium text-sm',
            'transition-colors duration-200',
            'hover:bg-terracota-claro hover:!text-white focus:outline-none focus:ring-2 focus:ring-terracota focus:ring-offset-2',
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
