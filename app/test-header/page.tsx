import { Container } from '@/components/Container';

export default function TestHeaderPage() {
  return (
    <Container className="py-12">
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-marrom-forte mb-4">
            Teste do Header
          </h1>
          <p className="text-marrom-rosado text-lg">
            Esta página demonstra o componente Header em funcionamento.
          </p>
        </div>

        <div className="bg-rosa-claro p-6 rounded-card">
          <h2 className="font-display text-2xl font-bold text-marrom-forte mb-4">
            Funcionalidades Implementadas
          </h2>
          <ul className="space-y-2 text-marrom-rosado">
            <li>✓ Logo/título &quot;Reviews por Isabel&quot;</li>
            <li>✓ Menu de navegação com todos os itens</li>
            <li>✓ Menu desktop (horizontal)</li>
            <li>✓ Menu mobile (hamburger)</li>
            <li>✓ Destaque visual para item ativo</li>
            <li>✓ Sticky positioning</li>
          </ul>
        </div>

        <div className="bg-creme-claro p-6 rounded-card">
          <h2 className="font-display text-2xl font-bold text-marrom-forte mb-4">
            Como Testar
          </h2>
          <ol className="space-y-2 text-marrom-rosado list-decimal list-inside">
            <li>Clique nos itens do menu para navegar entre páginas</li>
            <li>Observe o destaque visual no item ativo</li>
            <li>Redimensione a janela para ver o menu mobile (hamburger)</li>
            <li>Role a página para ver o header fixo no topo (sticky)</li>
          </ol>
        </div>

        <div className="h-[150vh] bg-gradient-to-b from-rosa-claro to-creme-claro rounded-card p-6">
          <p className="text-marrom-rosado">
            Role para baixo para testar o sticky positioning do header...
          </p>
        </div>
      </div>
    </Container>
  );
}
