import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Container Component
 * 
 * Componente de layout que centraliza conteúdo com max-width responsivo e padding horizontal.
 * 
 * @param children - Conteúdo a ser renderizado dentro do container
 * @param size - Tamanho do container (sm, md, lg, xl). Default: 'lg'
 * @param className - Classes CSS adicionais para customização
 * 
 * Requirements: 12.4
 */
export function Container({ 
  children, 
  size = 'lg', 
  className 
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',   // ~768px
    md: 'max-w-5xl',   // ~1024px
    lg: 'max-w-7xl',   // ~1280px
    xl: 'max-w-[1440px]', // 1440px
  };

  return (
    <div 
      className={cn(
        'mx-auto w-full px-6 md:px-8 lg:px-12',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
