import Link from 'next/link';
import { Instagram } from 'lucide-react';

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
    <footer className="w-full bg-creme-claro border-t border-rosa-claro">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Links para redes sociais */}
          <div className="flex items-center space-x-6">
            <Link
              href="https://instagram.com/reviewsporisabel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-marrom-rosado hover:text-marrom-forte transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
              <span className="text-sm font-medium">@reviewsporisabel</span>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-marrom-rosado">
              © {currentYear} Reviews por Isabel. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
