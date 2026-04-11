import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CuponsAdminPage() {
  const cupons = await prisma.cupom.findMany({
    include: { lugar: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cupons Promocionais</h1>
          <p className="text-gray-500">Gerencie os descontos e benefícios oferecidos.</p>
        </div>
        <Link 
          href="/admin/cupons/novo" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Novo Cupom
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar cupons por código ou local..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Código</th>
                <th className="px-6 py-4 font-semibold">Estabelecimento</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cupons.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Nenhum cupom cadastrado.
                  </td>
                </tr>
              ) : (
                cupons.map((cupom) => (
                  <tr key={cupom.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-900 font-mono tracking-wider">
                      {cupom.codigo}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {cupom.lugar.nome}
                    </td>
                    <td className="px-6 py-4">
                      {cupom.ativo ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Ativo
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          Inativo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                      <Link 
                        href={`/admin/cupons/${cupom.id}/editar`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded hidden">
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
    </div>
  );
}
