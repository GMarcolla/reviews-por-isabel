'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  currentPath?: string;
}

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Restaurantes', href: '/restaurantes' },
  { label: 'Cafés & Docerias', href: '/cafes' },
  { label: 'Lazer', href: '/lazer' },
  { label: 'Prestadores', href: '/prestadores' },
  { label: 'Lojas', href: '/lojas' },
  { label: 'Roteiro', href: '/roteiro' },
  { label: 'Cupons', href: '/cupons' },
  { label: 'Contato', href: '/contato' },
];

/**
 * Header Component
 * 
 * Componente de navegação principal do site com suporte para desktop e mobile.
 * 
 * Features:
 * - Logo/título "Reviews por Isabel"
 * - Menu de navegação horizontal (desktop)
 * - Menu hamburger (mobile)
 * - Destaque visual do item ativo
 * - Sticky positioning
 * 
 * Requirements: 12.5, 1.1, 1.3, 1.4, 1.5
 */
export function Header({ currentPath }: HeaderProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return activePath === '/';
    }
    return activePath?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-rosa-claro shadow-sm">
      <nav className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Título */}
          <Link 
            href="/" 
            className="flex items-center space-x-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <h1 className="font-display text-xl md:text-2xl font-bold text-marrom-forte">
              Reviews por Isabel
            </h1>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-rosa-claro text-marrom-forte'
                    : 'text-marrom-rosado hover:bg-rosa-claro/50 hover:text-marrom-forte'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Botão Menu Mobile */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-marrom-rosado hover:bg-rosa-claro hover:text-marrom-forte transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-base font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-rosa-claro text-marrom-forte'
                      : 'text-marrom-rosado hover:bg-rosa-claro/50 hover:text-marrom-forte'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
