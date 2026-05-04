'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Coffee, UtensilsCrossed, Palmtree, Store, Ticket, Map, Briefcase } from 'lucide-react';

interface Category {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: Category[] = [
  { id: 'restaurantes', label: 'Restaurantes', href: '/restaurantes', icon: UtensilsCrossed },
  { id: 'cafes', label: 'Cafés', href: '/cafes', icon: Coffee },
  { id: 'lazer', label: 'Lazer', href: '/lazer', icon: Palmtree },
  { id: 'servicos', label: 'Serviços', href: '/prestadores', icon: Briefcase },
  { id: 'lojas', label: 'Lojas', href: '/lojas', icon: Store },
  { id: 'cupons', label: 'Cupons', href: '/cupons', icon: Ticket },
  { id: 'roteiro', label: 'Roteiro', href: '/roteiro', icon: Map },
];

export function CategoryNav() {
  return (
    <section className="w-full bg-white border-b border-beje-tulipa/30 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-4 py-3 w-max min-w-full md:justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-full',
                    'bg-beje-tulipa/20 text-terracota',
                    'hover:bg-terracota hover:text-white',
                    'transition-all duration-200',
                    'whitespace-nowrap font-medium text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-terracota focus:ring-offset-2'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
