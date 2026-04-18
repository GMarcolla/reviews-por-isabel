'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Edit } from 'lucide-react';
import AdminDeleteButton from '@/components/AdminDeleteButton';

interface Lugar {
  id: string;
  nome: string;
  categoria: string;
  subcategoria: string | null;
  destaque: boolean;
}

interface LugaresTableProps {
  lugares: Lugar[];
}

export default function LugaresTable({ lugares }: LugaresTableProps) {
  const [busca, setBusca] = useState('');

  const lugaresFiltrados = lugares.filter((lugar) =>
    lugar.nome.toLowerCase().includes(busca.toLowerCase().trim())
  );

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
      {/* Barra de busca */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar lugares..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {busca && (
          <span className="ml-4 text-sm text-gray-500">
            {lugaresFiltrados.length} resultado{lugaresFiltrados.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Nome</th>
              <th className="px-6 py-4 font-semibold">Categoria</th>
              <th className="px-6 py-4 font-semibold">Destaque</th>
              <th className="px-6 py-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {lugaresFiltrados.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  {busca
                    ? `Nenhum lugar encontrado para "${busca}".`
                    : 'Nenhum lugar cadastrado ainda.'}
                </td>
              </tr>
            ) : (
              lugaresFiltrados.map((lugar) => (
                <tr key={lugar.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {lugar.nome}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">
                      {lugar.subcategoria || lugar.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {lugar.destaque ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Sim
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        Não
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                    <Link
                      href={`/admin/lugares/${lugar.id}/editar`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <AdminDeleteButton
                      id={lugar.id}
                      nome={lugar.nome}
                    />
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
