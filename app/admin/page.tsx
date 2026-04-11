import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      <p className="text-lg mb-4">Bem-vinda, {session.user?.name}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Lugares</h2>
          <p className="text-gray-600 mb-4">Gerencie os restaurantes, cafés, e passeios cadastrados.</p>
          <a href="/admin/lugares" className="text-blue-600 hover:underline font-medium">Ver todos &rarr;</a>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Cupons</h2>
          <p className="text-gray-600 mb-4">Gerencie os códigos de desconto oferecidos pelos parceiros.</p>
          <a href="/admin/cupons" className="text-blue-600 hover:underline font-medium">Ver todos &rarr;</a>
        </div>
      </div>
    </div>
  );
}
