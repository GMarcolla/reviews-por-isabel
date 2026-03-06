import Link from 'next/link';
import { Home, UtensilsCrossed, Coffee, Compass, ArrowLeft } from 'lucide-react';

/**
 * Página 404 Customizada
 * 
 * Exibe uma mensagem amigável quando o usuário acessa uma página que não existe.
 * 
 * Features:
 * - Mensagem amigável "Ops! Página não encontrada"
 * - Botão para voltar à home
 * - Sugestões de páginas populares
 * - Design consistente com o site
 * 
 * Requirements: Error Handling
 */
export default function NotFound() {
  const popularPages = [
    {
      title: 'Home',
      description: 'Voltar para a página inicial',
      href: '/',
      icon: Home,
    },
    {
      title: 'Restaurantes',
      description: 'Descubra os melhores sabores',
      href: '/restaurantes',
      icon: UtensilsCrossed,
    },
    {
      title: 'Cafés & Docerias',
      description: 'Momentos doces e especiais',
      href: '/cafes',
      icon: Coffee,
    },
    {
      title: 'Passeios',
      description: 'Experiências inesquecíveis',
      href: '/passeios',
      icon: Compass,
    },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-br from-rosa-claro/50 via-creme-claro to-white">
      <div className="max-w-4xl w-full text-center space-y-12">
        {/* Número 404 decorativo */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-display font-bold text-rosa-blush/30 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-rosa-claro/60 flex items-center justify-center">
              <svg 
                className="w-16 h-16 md:w-20 md:h-20 text-marrom-rosado/60" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Mensagem */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-display text-marrom-forte">
            Ops! Página não encontrada
          </h2>
          <p className="text-lg md:text-xl text-marrom-rosado max-w-2xl mx-auto">
            Parece que você se perdeu... Mas não se preocupe! Vamos te ajudar a encontrar o caminho de volta.
          </p>
        </div>

        {/* Botão principal */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-rosa-blush text-white rounded-lg font-medium text-lg hover:bg-rosa-blush/90 transition-colors shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para a Home
          </Link>
        </div>

        {/* Sugestões de páginas populares */}
        <div className="pt-8">
          <h3 className="text-2xl font-display text-marrom-forte mb-6">
            Ou explore estas páginas populares:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group p-6 bg-white rounded-lg border-2 border-rosa-claro hover:border-rosa-blush transition-all hover:shadow-md"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-rosa-claro flex items-center justify-center group-hover:bg-rosa-blush/20 transition-colors">
                      <Icon className="w-6 h-6 text-marrom-rosado group-hover:text-rosa-blush transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-marrom-forte mb-1">
                        {page.title}
                      </h4>
                      <p className="text-sm text-marrom-rosado/80">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
