import { Suspense } from 'react';
import { Container } from '@/components/Container';
import { getCupons } from '@/lib/data/cupons';
import { CuponsContent } from './CuponsClient';

export const metadata = {
  title: 'Cupons de Desconto',
  description: 'Nada melhor do que um desconto, né?',
};

export default async function CuponsPage() {
  const todosCupons = await getCupons();
  return (
    <Suspense fallback={
      <Container size="xl" className="py-8 md:py-12">
        <div className="text-center">
          <p className="text-lg text-marrom-rosado">Carregando cupons...</p>
        </div>
      </Container>
    }>
      <CuponsContent todosCupons={todosCupons} />
    </Suspense>
  );
}
