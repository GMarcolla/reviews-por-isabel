'use client';

import { useCallback } from 'react';
import { Lugar } from '@/lib/types';
import { CardLugar } from './CardLugar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';

interface CarrosselLugaresProps {
  lugares: Lugar[];
  title: string;
  subtitle?: string;
  showCategory?: boolean;
}

export function CarrosselLugares({ lugares, title, subtitle, showCategory = true }: CarrosselLugaresProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!lugares || lugares.length === 0) {
    return null;
  }

  return (
    <section className="pt-4 pb-10 md:pt-6 md:pb-12 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-marrom-escuro">{title}</h2>
          {subtitle && <p className="text-marrom-escuro/70 mt-1 md:mt-2 text-sm md:text-lg">{subtitle}</p>}
        </div>
        
        {/* Botões de navegação apenas no desktop */}
        <div className="hidden md:flex items-center gap-2">
          <button 
            onClick={scrollPrev}
            className="p-2 rounded-full bg-white shadow-sm border border-marrom-escuro/10 text-marrom-escuro hover:bg-marrom-escuro hover:text-white transition-colors"
            aria-label="Rolar para a esquerda"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={scrollNext}
            className="p-2 rounded-full bg-white shadow-sm border border-marrom-escuro/10 text-marrom-escuro hover:bg-marrom-escuro hover:text-white transition-colors"
            aria-label="Rolar para a direita"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex backface-hidden pb-8 pt-4">
            {lugares.map((lugar) => (
              <div 
                key={lugar.id} 
                className="flex-[0_0_280px] sm:flex-[0_0_320px] md:flex-[0_0_350px] min-w-0 h-auto mr-4 md:mr-6"
              >
                <CardLugar 
                  lugar={lugar} 
                  showCategory={showCategory} 
                  showSubcategoria={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
