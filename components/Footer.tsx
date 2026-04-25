import Link from 'next/link';
import { Instagram } from 'lucide-react';

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#0A66C2"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/**
 * Footer Component
 * 
 * Rodapé minimalista do site com links para redes sociais e copyright.
 * 
 * Features:
 * - Links para redes sociais (Instagram)
 * - Copyright
 * - Design minimalista
 * 
 * Requirements: 12.6
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-verde-tulipa border-t border-verde-tulipa-escuro">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Links para redes sociais */}
          <div className="flex items-center space-x-6">
            <Link
              href="https://instagram.com/reviewsporisabel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-beje-tulipa hover:text-beje-tulipa-claro transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
              <span className="text-sm font-medium">@reviewsporisabel</span>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-sm text-off-white-rosado">
              © {currentYear} Reviews por Isabel. Todos os direitos reservados.
            </p>
            <p className="text-sm text-off-white-rosado flex items-center justify-center gap-1">
              Desenvolvido por
              <Link 
                href="https://www.linkedin.com/in/gustavo-marcolla-68867a17a/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-beje-tulipa hover:text-beje-tulipa-claro transition-colors font-medium ml-1"
              >
                Gustavo Marcolla
                <LinkedinIcon className="h-4 w-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
