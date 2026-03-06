import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BotaoHubProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  href: string;
  variant?: 'primary' | 'secondary';
}

/**
 * BotaoHub Component
 * 
 * Botão grande e clicável para navegação na página inicial (hub).
 * Inclui ícone, título, descrição opcional e estados de hover/active.
 * 
 * @param title - Título do botão
 * @param description - Descrição opcional do botão
 * @param icon - Ícone do Lucide React
 * @param href - URL de destino
 * @param variant - Variante de cor (primary ou secondary). Default: 'primary'
 * 
 * Requirements: 12.2, 2.2
 */
export function BotaoHub({ 
  title, 
  description, 
  icon: Icon, 
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

  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col items-center justify-center',
        'p-6 md:p-8 rounded-card',
        'transition-all duration-300',
        'hover:shadow-card-hover hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-rosa-blush focus:ring-offset-2',
        'text-center',
        variantClasses[variant]
      )}
      aria-label={description ? `${title}: ${description}` : title}
    >
      {/* Ícone */}
      <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
        <Icon 
          className="w-10 h-10 md:w-12 md:h-12" 
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

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
