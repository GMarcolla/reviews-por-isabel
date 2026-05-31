import { Container } from '@/components/Container';
import { Loader2 } from 'lucide-react';

export default function ReceitasLoading() {
  return (
    <Container className="py-12">
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-verde-tulipa animate-spin mb-4" />
        <p className="text-marrom-escuro/60">Carregando receitas...</p>
      </div>
    </Container>
  );
}
