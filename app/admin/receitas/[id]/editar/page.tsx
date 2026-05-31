import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ReceitaFormWrapper } from '@/components/receitas/ReceitaFormWrapper';

export const dynamic = 'force-dynamic';

export default async function EditarReceitaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const receita = await prisma.receita.findUnique({
    where: { id },
  });

  if (!receita) {
    notFound();
  }

  return <ReceitaFormWrapper receita={receita} />;
}
