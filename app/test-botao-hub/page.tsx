import { BotaoHub } from '@/components/BotaoHub';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { 
  UtensilsCrossed, 
  Coffee, 
  Compass, 
  Map, 
  Ticket, 
  Mail 
} from 'lucide-react';

/**
 * Página de teste para o componente BotaoHub
 * Demonstra o uso do componente com diferentes variantes e ícones
 */
export default function TestBotaoHubPage() {
  return (
    <main className="min-h-screen py-12 bg-creme-claro">
      <Container>
        <SectionTitle 
          title="Teste do Componente BotaoHub" 
          subtitle="Demonstração dos botões hub com diferentes variantes"
          align="center"
        />

        {/* Grid de botões hub - variant primary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <BotaoHub
            title="Restaurantes"
            description="Descubra os melhores restaurantes"
            icon={UtensilsCrossed}
            href="/restaurantes"
            variant="primary"
          />
          
          <BotaoHub
            title="Cafés & Docerias"
            description="Cafés e doces especiais"
            icon={Coffee}
            href="/cafes"
            variant="primary"
          />
          
          <BotaoHub
            title="Passeios"
            description="Experiências únicas"
            icon={Compass}
            href="/passeios"
            variant="primary"
          />
        </div>

        <SectionTitle 
          title="Variante Secondary" 
          subtitle="Botões com cor alternativa"
          align="center"
        />

        {/* Grid de botões hub - variant secondary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BotaoHub
            title="Roteiro em Blumenau"
            description="Planeje seu dia"
            icon={Map}
            href="/roteiro"
            variant="secondary"
          />
          
          <BotaoHub
            title="Cupons"
            description="Descontos exclusivos"
            icon={Ticket}
            href="/cupons"
            variant="secondary"
          />
          
          <BotaoHub
            title="Contato"
            description="Fale comigo"
            icon={Mail}
            href="/contato"
            variant="secondary"
          />
        </div>

        {/* Botão sem descrição */}
        <div className="mt-12">
          <SectionTitle 
            title="Sem Descrição" 
            subtitle="Botão apenas com título"
            align="center"
          />
          <div className="max-w-sm mx-auto">
            <BotaoHub
              title="Exemplo Simples"
              icon={Coffee}
              href="/exemplo"
              variant="primary"
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
