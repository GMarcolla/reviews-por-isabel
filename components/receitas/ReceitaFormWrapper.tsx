'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ReceitaForm } from './ReceitaForm';
import { Receita } from '@/lib/types';

interface ReceitaFormWrapperProps {
  receita: Receita;
}

export function ReceitaFormWrapper({ receita }: ReceitaFormWrapperProps) {
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
      <ReceitaForm receita={receita} onCancel={handleCancel} />
    </div>
  );
}
