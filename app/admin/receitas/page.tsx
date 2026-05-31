import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PlusCircle } from 'lucide-react';
import { ReceitasTable } from '@/components/receitas/ReceitasTable';

export const dynamic = 'force-dynamic';

export default async function ReceitasAdminPage() {
  const receitas = await prisma.receita.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Receitas</h1>
          <p className="text-gray-500">
            Gerencie as receitas do quadro "Cozinhando com Isabel".
          </p>
        </div>
        <Link
          href="/admin/receitas/nova"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Nova Receita
        </Link>
      </div>

      <ReceitasTable receitas={receitas} />
    </div>
  );
}
