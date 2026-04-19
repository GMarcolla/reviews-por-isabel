import { prisma } from "@/lib/prisma";
import CategoriasAdmin from "@/components/CategoriasAdmin";

export const dynamic = "force-dynamic";

export default async function CategoriasAdminPage() {
  const categorias = await prisma.categoria.findMany({
    orderBy: { ordem: 'asc' },
    include: {
      subcategorias: { orderBy: { ordem: 'asc' } },
      _count: { select: { lugares: true } },
    },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categorias & Subcategorias</h1>
        <p className="text-gray-500">
          Gerencie as subcategorias e sua ordem de exibição no site.
          As categorias principais são fixas.
        </p>
      </div>

      <CategoriasAdmin categorias={categorias} />
    </div>
  );
}
