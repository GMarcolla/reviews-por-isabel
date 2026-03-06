import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { getCuponsAtivos } from '@/lib/data/cupons';
import { getRestaurantes } from '@/lib/data/restaurantes';
import { getCafes } from '@/lib/data/cafes';
import { Lugar } from '@/lib/types';
import { Tag, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cupons de Desconto',
  description: 'Cupons exclusivos de desconto para os melhores lugares de Blumenau',
};

export default function CuponsPage() {
  const cupons = getCuponsAtivos();
  const restaurantes = getRestaurantes();
  const cafes = getCafes();
  
  // Combinar todos os lugares para facilitar a busca
  const todosLugares: Lugar[] = [...restaurantes, ...cafes];
  
  // Função para encontrar o lugar relacionado ao cupom
  const getLugarByCupom = (lugarId: string): Lugar | undefined => {
    return todosLugares.find(lugar => lugar.id === lugarId);
  };

  return (
    <Container className="py-12">
      <SectionTitle 
        title="Cupons de Desconto" 
        subtitle="Aproveite descontos exclusivos nos melhores lugares de Blumenau"
        align="center"
      />
      
      {cupons.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-marrom-rosado text-lg">
            Nenhum cupom disponível no momento. Volte em breve!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {cupons.map((cupom) => {
            const lugar = getLugarByCupom(cupom.lugarId);
            
            if (!lugar) return null;
            
            // Determinar a categoria do lugar para o link correto
            const categoriaBase = ['hamburgueria', 'italiano', 'japones', 'pizzaria', 'romantico'].includes(lugar.categoria)
              ? 'restaurantes'
              : 'cafes';
            
            return (
              <div 
                key={cupom.id}
                className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden border-2 border-rosa-claro"
              >
                {/* Header do Card */}
                <div className="bg-gradient-to-r from-rosa-blush to-rosa-claro p-4">
                  <div className="flex items-start gap-2">
                    <Tag className="w-5 h-5 text-marrom-forte mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-display text-xl font-bold text-marrom-forte">
                        {lugar.nome}
                      </h3>
                      <p className="text-sm text-marrom-rosado mt-1">
                        {lugar.categoria.charAt(0).toUpperCase() + lugar.categoria.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Conteúdo do Card */}
                <div className="p-6">
                  {/* Descrição do Desconto */}
                  <p className="text-marrom-rosado text-base mb-4">
                    {cupom.descricao}
                  </p>
                  
                  {/* Código do Cupom - Destacado */}
                  <div className="bg-creme-claro border-2 border-dashed border-rosa-blush rounded-lg p-4 mb-4">
                    <p className="text-xs text-marrom-rosado uppercase tracking-wide mb-1">
                      Código do Cupom
                    </p>
                    <p className="font-display text-2xl font-bold text-marrom-forte tracking-wider text-center">
                      {cupom.codigo}
                    </p>
                  </div>
                  
                  {/* Validade */}
                  {cupom.validade && (
                    <p className="text-sm text-marrom-rosado mb-2">
                      <span className="font-semibold">Válido até:</span>{' '}
                      {new Date(cupom.validade).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                  
                  {/* Termos */}
                  {cupom.termos && (
                    <p className="text-xs text-marrom-rosado/70 mb-4 italic">
                      {cupom.termos}
                    </p>
                  )}
                  
                  {/* Botão Ver Lugar */}
                  <Link 
                    href={`/${categoriaBase}/${lugar.id}`}
                    className="flex items-center justify-center gap-2 w-full bg-marrom-rosado hover:bg-marrom-forte text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver Lugar
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Informações Adicionais */}
      <div className="mt-12 bg-rosa-claro rounded-card p-6 text-center">
        <p className="text-marrom-rosado">
          <span className="font-semibold">Dica:</span> Apresente o código do cupom no estabelecimento 
          ou mencione que viu no Reviews por Isabel para garantir seu desconto!
        </p>
      </div>
    </Container>
  );
}
