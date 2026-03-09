import { Lugar } from '@/lib/types';
import { SectionTitle } from './SectionTitle';
import { CardLugar } from './CardLugar';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  title: string;
  lugares: Lugar[];
  columns?: 2 | 3 | 4;
}

/**
 * CategorySection Component
 * 
 * Componente para exibir uma seção de categoria com título e grid de cards de lugares.
 * Inclui empty state quando não há lugares na categoria.
 * 
 * @param title - Título da categoria
 * @param lugares - Array de lugares para exibir
 * @param columns - Número de colunas no grid (2, 3 ou 4). Default: 3
 * 
 * Requirements: 3.1, 3.5, 4.1, 4.5, 5.1
 */
export function CategorySection({ 
  title, 
  lugares, 
  columns = 3 
}: CategorySectionProps) {
  // Define as classes de grid baseado no número de colunas
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="mb-12 md:mb-16">
      {/* Título da seção */}
      <SectionTitle title={title} align="left" />

      {/* Grid de cards ou empty state */}
      {lugares.length > 0 ? (
        <div className={cn('grid gap-6 md:gap-8', gridClasses[columns])}>
          {lugares.map((lugar) => (
            <CardLugar key={lugar.id} lugar={lugar} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4">
          <p className="text-lg text-marrom-escuro/80">
            Nenhum lugar encontrado nesta categoria ainda.
          </p>
        </div>
      )}
    </section>
  );
}
