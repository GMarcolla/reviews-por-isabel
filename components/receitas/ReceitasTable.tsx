'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Edit, Trash2, ChefHat } from 'lucide-react';
import { Receita } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface ReceitasTableProps {
  receitas: Receita[];
}

export function ReceitasTable({ receitas }: ReceitasTableProps) {
  const router = useRouter();
  const [busca, setBusca] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const receitasFiltradas = receitas.filter(
    (receita) =>
      receita.titulo.toLowerCase().includes(busca.toLowerCase().trim()) ||
      receita.convidado.toLowerCase().includes(busca.toLowerCase().trim())
  );

  const handleDelete = async (id: string, titulo: string) => {
    if (!confirm(`Tem certeza que deseja excluir a receita "${titulo}"?`)) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/receitas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar receita');
      }

      router.refresh();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar receita. Tente novamente.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
      {/* Barra de busca */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título ou convidado..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {busca && (
          <span className="ml-4 text-sm text-gray-500">
            {receitasFiltradas.length} resultado
            {receitasFiltradas.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Imagem</th>
              <th className="px-6 py-4 font-semibold">Título</th>
              <th className="px-6 py-4 font-semibold">Convidado</th>
              <th className="px-6 py-4 font-semibold">Data</th>
              <th className="px-6 py-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {receitasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  {busca
                    ? `Nenhuma receita encontrada para "${busca}".`
                    : 'Nenhuma receita cadastrada ainda.'}
                </td>
              </tr>
            ) : (
              receitasFiltradas.map((receita) => (
                <tr key={receita.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      {receita.imagem ? (
                        <Image
                          src={receita.imagem}
                          alt={receita.titulo}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ChefHat className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">
                    <div className="truncate">{receita.titulo}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-verde-tulipa/10 text-verde-tulipa rounded-md text-xs font-medium">
                      {receita.convidado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(receita.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                    <Link
                      href={`/admin/receitas/${receita.id}/editar`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Editar receita"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(receita.id, receita.titulo)}
                      disabled={deletingId === receita.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Excluir receita"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
