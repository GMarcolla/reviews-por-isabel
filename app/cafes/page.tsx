import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CategorySection } from '@/components/CategorySection';
import { getCafes } from '@/lib/data/cafes';
import { Lugar } from '@/lib/types';

/**
 * Página de Cafés & Docerias
 * 
 * Exibe cafés e docerias organizados por categoria:
 * - Cafeterias
 * - Docerias
 * - Padarias Especiais
 * - Brunch
 * 
 * Requirements: 4.1, 4.4, 4.5
 */

export const metadata: Metadata = {
  title: 'Cafés & Docerias',
  description: 'Descubra os melhores cafés e docerias de Blumenau e região, organizados por categoria.',
};

// Mapeamento de categorias para títulos em português
const categoriaTitulos: Record<string, string> = {
  cafeteria: 'Cafeterias',
  doceria: 'Docerias',
  padaria: 'Padarias Especiais',
  brunch: 'Brunch',
};

// Ordem de exibição das categorias
const categoriaOrdem = [
  'cafeteria',
  'doceria',
  'padaria',
  'brunch',
];

export default function CafesPage() {
  // Buscar todos os cafés
  const todosCafes = getCafes();

  // Agrupar cafés por categoria
  const cafesPorCategoria = categoriaOrdem.reduce((acc, categoria) => {
    const cafesCategoria = todosCafes.filter(
      (c) => c.categoria === categoria
    );
    
    if (cafesCategoria.length > 0) {
      acc[categoria] = cafesCategoria;
    }
    
    return acc;
  }, {} as Record<string, Lugar[]>);

  return (
    <Container size="xl" className="py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-forte mb-4">
          Cafés & Docerias
        </h1>
        <p className="text-lg md:text-xl text-marrom-rosado max-w-2xl mx-auto">
          Descubra os melhores cafés e docerias de Blumenau e região, 
          cuidadosamente selecionados para você.
        </p>
      </div>

      {/* Seções de Categorias */}
      {categoriaOrdem.map((categoria) => {
        const cafes = cafesPorCategoria[categoria];
        
        // Só renderiza a seção se houver cafés nessa categoria
        if (!cafes || cafes.length === 0) {
          return null;
        }

        return (
          <CategorySection
            key={categoria}
            title={categoriaTitulos[categoria]}
            lugares={cafes}
            columns={3}
          />
        );
      })}
    </Container>
  );
}
