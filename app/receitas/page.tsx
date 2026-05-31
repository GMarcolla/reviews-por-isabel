import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { CardReceita } from '@/components/receitas/CardReceita';
import { getReceitas } from '@/lib/receitas';
import { ChefHat } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

export const metadata: Metadata = {
  title: 'Receitas - Cozinhando com Isabel',
  description: 'Receitas deliciosas preparadas por convidados especiais no quadro Cozinhando com Isabel. Descubra pratos incríveis e a opinião sincera da Isabel sobre cada receita.',
  openGraph: {
    title: 'Receitas - Cozinhando com Isabel',
    description: 'Receitas deliciosas preparadas por convidados especiais no quadro Cozinhando com Isabel',
    images: ['/og-receitas.jpg'],
  },
};

export default async function ReceitasPage() {
  const receitas = await getReceitas();

  return (
    <Container className="py-12">
      {/* Cabeçalho */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ChefHat className="w-10 h-10 text-verde-tulipa" />
          <h1 className="font-display text-4xl md:text-5xl text-marrom-escuro">
            Cozinhando com Isabel
          </h1>
        </div>
        <p className="text-lg text-marrom-escuro/80 max-w-2xl mx-auto">
          Neste quadro, convidados especiais escolhem uma receita e preparam do seu jeito. 
          Aqui você encontra todas as receitas já preparadas!
        </p>
      </div>

      {/* Grid de receitas */}
      {receitas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {receitas.map((receita) => (
            <CardReceita key={receita.id} receita={receita} />
          ))}
        </div>
      ) : (
        /* Estado vazio */
        <div className="text-center py-16">
          <ChefHat className="w-20 h-20 text-verde-tulipa/30 mx-auto mb-4" />
          <h2 className="font-display text-2xl text-marrom-escuro mb-2">
            Nenhuma receita cadastrada ainda
          </h2>
          <p className="text-marrom-escuro/60">
            Em breve teremos receitas deliciosas por aqui!
          </p>
        </div>
      )}

      {/* Seção sobre o quadro */}
      <div className="mt-16 bg-beje-tulipa/30 rounded-lg p-8 md:p-12">
        <h2 className="font-display text-3xl text-marrom-escuro mb-4 text-center">
          Quer participar do quadro?
        </h2>
        <p className="text-lg text-marrom-escuro/80 text-center max-w-3xl mx-auto leading-relaxed mb-6">
          Tem uma receita especial que gostaria de preparar? Entre em contato pelo WhatsApp e vamos criar um episódio juntos no Cozinhando com Isabel!
        </p>
        <div className="flex justify-center">
          <a
            href="https://wa.me/5547988154055?text=Olá!%20Gostaria%20de%20participar%20do%20quadro%20Cozinhando%20com%20Isabel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#20BA5A] transition-colors shadow-lg hover:shadow-xl"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Entrar em contato
          </a>
        </div>
      </div>
    </Container>
  );
}
