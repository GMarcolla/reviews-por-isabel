import Link from 'next/link';
import { LayoutDashboard, MapPin, Ticket, LogOut, Tags, ChefHat } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-lg font-bold text-gray-900">Isabel Admin</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/admin/lugares" className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <MapPin className="w-5 h-5 mr-3" />
            Lugares
          </Link>
          <Link href="/admin/categorias" className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Tags className="w-5 h-5 mr-3" />
            Categorias
          </Link>
          <Link href="/admin/cupons" className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Ticket className="w-5 h-5 mr-3" />
            Cupons
          </Link>
          <Link href="/admin/receitas" className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <ChefHat className="w-5 h-5 mr-3" />
            Receitas
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/api/auth/signout" className="flex items-center px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Sair
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:hidden">
            <span className="text-lg font-bold text-gray-900">Isabel Admin</span>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/auth/signout" className="text-gray-500">Sair</a>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
