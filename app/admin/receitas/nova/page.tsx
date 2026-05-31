'use client';

import { useRouter } from 'next/navigation';
import { ReceitaForm } from '@/components/receitas/ReceitaForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NovaReceitaPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/admin/receitas');
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/admin/receitas"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Receitas
        </Link>
      </div>

      {/* Formulário */}
      <ReceitaForm onCancel={handleCancel} />
    </div>
  );
}
