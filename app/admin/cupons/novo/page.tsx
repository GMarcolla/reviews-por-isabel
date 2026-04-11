import AdminCupomForm from "@/components/AdminCupomForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NovoCupomPage() {
  const lugares = await prisma.lugar.findMany({
    select: { id: true, nome: true },
    orderBy: { nome: "asc" }
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/cupons" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-2">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para Cupons
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novo Cupom</h1>
        <p className="text-gray-500">Crie um novo desconto atralado a um de seus locais cadastrados.</p>
      </div>

      <AdminCupomForm lugares={lugares} />
    </div>
  );
}
