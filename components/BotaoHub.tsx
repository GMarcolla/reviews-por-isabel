import Link from 'next/link';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BotaoHubProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  imageSrc?: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

/**
 * BotaoHub Component
 * 
 * Botão grande e clicável para navegação na página inicial (hub).
 * Pode usar ícone com texto ou imagem completa.
 * 
 * @param title - Título do botão (usado para acessibilidade)
 * @param description - Descrição opcional do botão
 * @param icon - Ícone do Lucide React (usado quando não há imagem)
 * @param imageSrc - Caminho da imagem personalizada (substitui todo o conteúdo)
 * @param href - URL de destino
 * @param variant - Variante de cor (primary ou secondary). Default: 'primary'
 * 
 * Requirements: 12.2, 2.2
 */
export function BotaoHub({ 
  title, 
  description, 
  icon: Icon, 
  imageSrc,
  href,
  variant = 'primary' 
}: BotaoHubProps) {
  const variantClasses = {
    primary: cn(
      'bg-rosa-blush text-marrom-forte',
      'hover:bg-rosa-blush/90 active:bg-rosa-blush/80'
    ),
    secondary: cn(
      'bg-creme-claro text-marrom-forte',
      'hover:bg-creme-claro/90 active:bg-creme-claro/80'
    ),
  };

  // Se tiver imagem, renderiza apenas a imagem
  if (imageSrc) {
    return (
      <Link
        href={href}
        className={cn(
          'group relative block overflow-visible',
          'transition-all duration-300',
          'hover:shadow-none hover:-translate-y-1',
          'focus:outline-none',
          'w-full aspect-[16/9]'
        )}
        aria-label={description ? `${title}: ${description}` : title}
        style={{ 
          padding: 0, 
          background: 'transparent',
          WebkitTapHighlightColor: 'transparent',
          userSelect: 'none',
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          style={{ width: '100%', height: '100%' }}
          draggable={false}
        />
      </Link>
    );
  }

  // Se não tiver imagem, renderiza com ícone e texto
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col items-center justify-center',
        'p-6 md:p-8 rounded-card',
        'transition-all duration-300',
        'hover:shadow-card-hover hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-rosa-blush focus:ring-offset-2',
        'text-center aspect-[16/9]',
        variantClasses[variant]
      )}
      aria-label={description ? `${title}: ${description}` : title}
    >
      {/* Ícone */}
      {Icon && (
        <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
          <Icon 
            className="w-10 h-10 md:w-12 md:h-12" 
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Título */}
      <h3 className="text-xl md:text-2xl font-display font-bold mb-2">
        {title}
      </h3>

      {/* Descrição (opcional) */}
      {description && (
        <p className="text-sm md:text-base opacity-90">
          {description}
        </p>
      )}
    </Link>
  );
}
