import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * SectionTitle Component
 * 
 * Componente para títulos de seção com tipografia Playfair Display e espaçamento consistente.
 * 
 * @param title - Título principal da seção
 * @param subtitle - Subtítulo opcional
 * @param align - Alinhamento do texto (left, center, right). Default: 'left'
 * 
 * Requirements: 12.3
 */
export function SectionTitle({ 
  title, 
  subtitle, 
  align = 'left' 
}: SectionTitleProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-8 md:mb-12', alignClasses[align])}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-marrom-forte mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-marrom-rosado mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
