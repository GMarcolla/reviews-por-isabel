import AdminLugarForm from "@/components/AdminLugarForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NovoLugarPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/lugares" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-2">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Lugares
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo Estabelecimento</h1>
        <p className="text-gray-500">Adicione um novo local para exibir no diretório.</p>
      </div>

      <AdminLugarForm />
    </div>
  );
}
