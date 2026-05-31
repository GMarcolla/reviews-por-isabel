import Image from 'next/image';
import { Receita } from '@/lib/types';
import { ChefHat, User, Clock } from 'lucide-react';

interface ReceitaDetailProps {
  receita: Receita;
}

export function ReceitaDetail({ receita }: ReceitaDetailProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Imagem principal */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
        {receita.imagem ? (
          <Image
            src={receita.imagem}
            alt={`Foto da receita ${receita.titulo}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-beje-tulipa flex items-center justify-center">
            <ChefHat className="w-24 h-24 text-verde-tulipa/30" />
          </div>
        )}
      </div>

      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl text-marrom-escuro mb-4">
          {receita.titulo}
        </h1>

        {/* Meta informações */}
        <div className="flex flex-wrap items-center gap-4 text-marrom-escuro/70">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-verde-tulipa" />
            <span className="font-medium">Convidado: {receita.convidado}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-verde-tulipa" />
            <span>
              {new Date(receita.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Seção Ingredientes */}
      <section className="mb-10">
        <div className="border-t-2 border-beje-tulipa pt-6 mb-6">
          <h2 className="font-display text-3xl text-marrom-escuro flex items-center gap-3">
            <span className="w-10 h-10 bg-verde-tulipa rounded-full flex items-center justify-center text-white text-xl">
              1
            </span>
            Ingredientes
          </h2>
        </div>
        <div className="bg-beje-tulipa/30 rounded-lg p-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-marrom-escuro/90 whitespace-pre-wrap leading-relaxed">
              {receita.ingredientes}
            </p>
          </div>
        </div>
      </section>

      {/* Seção Modo de Preparo */}
      <section className="mb-10">
        <div className="border-t-2 border-beje-tulipa pt-6 mb-6">
          <h2 className="font-display text-3xl text-marrom-escuro flex items-center gap-3">
            <span className="w-10 h-10 bg-verde-tulipa rounded-full flex items-center justify-center text-white text-xl">
              2
            </span>
            Modo de Preparo
          </h2>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-marrom-escuro/90 whitespace-pre-wrap leading-relaxed">
            {receita.passos}
          </p>
        </div>
      </section>

      {/* Seção Opinião da Isabel */}
      <section className="mb-10">
        <div className="border-t-2 border-rosa-tulipa pt-6 mb-6">
          <h2 className="font-display text-3xl text-marrom-escuro flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-rosa-tulipa" />
            Opinião da Isabel
          </h2>
        </div>
        <div className="bg-rosa-tulipa/10 rounded-lg p-6 border-l-4 border-rosa-tulipa">
          <p className="text-lg text-marrom-escuro/90 whitespace-pre-wrap leading-relaxed italic">
            &ldquo;{receita.opiniao}&rdquo;
          </p>
          <p className="text-sm text-marrom-escuro/70 mt-4 font-medium">
            — Isabel
          </p>
        </div>
      </section>

      {/* Call to action */}
      <div className="bg-verde-tulipa/10 rounded-lg p-6 text-center border border-verde-tulipa/20">
        <p className="text-marrom-escuro/80 mb-2">
          Gostou desta receita? Experimente fazer em casa e compartilhe o resultado!
        </p>
        <p className="text-sm text-marrom-escuro/60">
          Marque @reviewsporisabel no Instagram
        </p>
      </div>
    </div>
  );
}
