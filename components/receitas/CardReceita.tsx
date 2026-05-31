import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Receita } from '@/lib/types';
import { ChefHat } from 'lucide-react';

interface CardReceitaProps {
  receita: Receita;
  variant?: 'default' | 'large';
}

export function CardReceita({ receita, variant = 'default' }: CardReceitaProps) {
  const detailsUrl = `/receitas/${receita.slug}`;
  const imageHeight = variant === 'large' ? 'h-72 md:h-96' : 'h-56 md:h-72';

  return (
    <article
      className={cn(
        'group bg-white rounded-card overflow-hidden shadow-card-tulipa',
        'transition-all duration-300 hover:shadow-card-tulipa-hover hover:-translate-y-1',
        'flex flex-col h-full'
      )}
    >
      {/* Imagem */}
      <div className={cn('relative w-full overflow-hidden', imageHeight)}>
        {receita.imagem ? (
          <Image
            src={receita.imagem}
            alt={`Foto da receita ${receita.titulo}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-beje-tulipa flex items-center justify-center">
            <ChefHat className="w-16 h-16 text-verde-tulipa/30" />
          </div>
        )}

        {/* Badge "Receita" */}
        <div className="absolute top-3 left-3 bg-rosa-tulipa/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-white">Receita</span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-grow p-4 md:p-5">
        {/* Título da receita */}
        <h3 className="text-xl md:text-2xl font-display font-bold text-marrom-escuro mb-2 line-clamp-2">
          {receita.titulo}
        </h3>

        {/* Convidado */}
        <div className="flex items-center text-sm text-marrom-escuro/70 mb-3">
          <ChefHat className="w-4 h-4 mr-1.5 text-verde-tulipa" />
          <span className="font-medium">Por {receita.convidado}</span>
        </div>

        {/* Prévia da opinião */}
        <p className="text-sm md:text-base text-marrom-escuro/80 mb-4 line-clamp-3 flex-grow">
          {receita.opiniao}
        </p>

        {/* Botão Ver Receita */}
        <div className="flex justify-between items-center mt-auto pt-2">
          <div className="text-xs text-marrom-escuro/60">
            {new Date(receita.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </div>

          <Link
            href={detailsUrl}
            className={cn(
              'inline-flex items-center justify-center',
              'px-5 py-2.5 rounded-lg',
              'bg-verde-tulipa !text-white font-medium text-sm',
              'transition-colors duration-200',
              'hover:bg-verde-tulipa/90 hover:!text-white focus:outline-none focus:ring-2 focus:ring-verde-tulipa focus:ring-offset-2',
              'shrink-0'
            )}
            aria-label={`Ver receita completa de ${receita.titulo}`}
          >
            Ver receita
          </Link>
        </div>
      </div>
    </article>
  );
}
