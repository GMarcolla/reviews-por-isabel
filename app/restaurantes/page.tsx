import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CategorySection } from '@/components/CategorySection';
import { getRestaurantes } from '@/lib/data/restaurantes';
import { Lugar } from '@/lib/types';

/**
 * Página de Restaurantes
 * 
 * Exibe restaurantes organizados por categoria:
 * - Hamburguerias
 * - Italianos
 * - Japoneses
 * - Pizzarias
 * - Restaurantes Românticos
 * 
 * Requirements: 3.1, 3.4, 3.5
 */

export const metadata: Metadata = {
  title: 'Restaurantes',
  description: 'Descubra os melhores restaurantes de Blumenau e região, organizados por categoria.',
};

// Mapeamento de categorias para títulos em português
const categoriaTitulos: Record<string, string> = {
  hamburgueria: 'Hamburguerias',
  esfirraria: 'Esfirrarias',
  padaria: 'Padarias',
  gelateria: 'Gelaterias',
  pastelaria: 'Pastelarias',
  empadas: 'Empadas',
  hotdog: 'Hot Dogs',
  germanico: 'Restaurantes Germânicos',
  buffet: 'Buffets',
  bar: 'Bares e Restaurantes',
  coreano: 'Culinária Coreana',
  mexicano: 'Culinária Mexicana',
  italiano: 'Italianos',
  japones: 'Japoneses',
  pizzaria: 'Pizzarias',
  romantico: 'Restaurantes Românticos',
};

// Ordem de exibição das categorias
const categoriaOrdem = [
  'hamburgueria',
  'esfirraria',
  'padaria',
  'gelateria',
  'pastelaria',
  'empadas',
  'hotdog',
  'germanico',
  'buffet',
  'bar',
  'coreano',
  'mexicano',
  'italiano',
  'japones',
  'pizzaria',
  'romantico',
];

export default function RestaurantesPage() {
  // Buscar todos os restaurantes
  const todosRestaurantes = getRestaurantes();

  // Agrupar restaurantes por categoria
  const restaurantesPorCategoria = categoriaOrdem.reduce((acc, categoria) => {
    const restaurantesCategoria = todosRestaurantes.filter(
      (r) => r.categoria === categoria
    );
    
    if (restaurantesCategoria.length > 0) {
      acc[categoria] = restaurantesCategoria;
    }
    
    return acc;
  }, {} as Record<string, Lugar[]>);

  return (
    <Container size="xl" className="py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-12 md:mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-marrom-forte mb-4">
          Restaurantes
        </h1>
        <p className="text-lg md:text-xl text-marrom-rosado max-w-2xl mx-auto">
          Descubra os melhores restaurantes de Blumenau e região, 
          cuidadosamente selecionados para você.
        </p>
      </div>

      {/* Seções de Categorias */}
      {categoriaOrdem.map((categoria) => {
        const restaurantes = restaurantesPorCategoria[categoria];
        
        // Só renderiza a seção se houver restaurantes nessa categoria
        if (!restaurantes || restaurantes.length === 0) {
          return null;
        }

        return (
          <CategorySection
            key={categoria}
            title={categoriaTitulos[categoria]}
            lugares={restaurantes}
            columns={3}
          />
        );
      })}
    </Container>
  );
}
