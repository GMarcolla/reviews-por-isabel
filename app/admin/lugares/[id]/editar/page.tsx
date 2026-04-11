import AdminLugarForm from "@/components/AdminLugarForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditarLugarPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const lugar = await prisma.lugar.findUnique({
    where: { id }
  });

  if (!lugar) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/lugares" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-2">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Lugares
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Editar Estabelecimento</h1>
        <p className="text-gray-500">Alterando informações de: {lugar.nome}</p>
      </div>

      <AdminLugarForm initialData={lugar} />
    </div>
  );
}
