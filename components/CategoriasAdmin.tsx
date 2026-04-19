'use client';

import { useState, useTransition } from 'react';
import { ChevronUp, ChevronDown, Trash2, Plus, Pencil, Check, X } from 'lucide-react';
import {
  createSubcategoria,
  updateSubcategoria,
  deleteSubcategoria,
  reorderSubcategorias,
} from '@/app/admin/actions';

interface Subcategoria {
  id: string;
  nome: string;
  ordem: number;
}

interface Categoria {
  id: string;
  nome: string;
  rota: string;
  label: string;
  subcategorias: Subcategoria[];
  _count: { lugares: number };
}

interface Props {
  categorias: Categoria[];
}

export default function CategoriasAdmin({ categorias: initialCategorias }: Props) {
  const [categorias, setCategorias] = useState(initialCategorias);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNome, setEditingNome] = useState('');
  const [novaSubcategoria, setNovaSubcategoria] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // ---------------------------------------------------------------------------
  // Helpers de estado local (otimistic update)
  // ---------------------------------------------------------------------------

  const updateCategoriasLocal = (categoriaId: string, updater: (subs: Subcategoria[]) => Subcategoria[]) => {
    setCategorias(prev =>
      prev.map(cat =>
        cat.id === categoriaId
          ? { ...cat, subcategorias: updater(cat.subcategorias) }
          : cat
      )
    );
  };

  // ---------------------------------------------------------------------------
  // Reordenação
  // ---------------------------------------------------------------------------

  const handleMoveUp = (categoriaId: string, subId: string) => {
    const cat = categorias.find(c => c.id === categoriaId)!;
    const subs = [...cat.subcategorias].sort((a, b) => a.ordem - b.ordem);
    const idx = subs.findIndex(s => s.id === subId);
    if (idx <= 0) return;

    const newSubs = [...subs];
    [newSubs[idx - 1], newSubs[idx]] = [newSubs[idx], newSubs[idx - 1]];
    const reordered = newSubs.map((s, i) => ({ ...s, ordem: i + 1 }));

    updateCategoriasLocal(categoriaId, () => reordered);

    startTransition(async () => {
      try {
        await reorderSubcategorias(reordered.map(s => ({ id: s.id, ordem: s.ordem })));
      } catch (e: any) {
        setError(e.message);
      }
    });
  };

  const handleMoveDown = (categoriaId: string, subId: string) => {
    const cat = categorias.find(c => c.id === categoriaId)!;
    const subs = [...cat.subcategorias].sort((a, b) => a.ordem - b.ordem);
    const idx = subs.findIndex(s => s.id === subId);
    if (idx >= subs.length - 1) return;

    const newSubs = [...subs];
    [newSubs[idx], newSubs[idx + 1]] = [newSubs[idx + 1], newSubs[idx]];
    const reordered = newSubs.map((s, i) => ({ ...s, ordem: i + 1 }));

    updateCategoriasLocal(categoriaId, () => reordered);

    startTransition(async () => {
      try {
        await reorderSubcategorias(reordered.map(s => ({ id: s.id, ordem: s.ordem })));
      } catch (e: any) {
        setError(e.message);
      }
    });
  };

  // ---------------------------------------------------------------------------
  // Adicionar
  // ---------------------------------------------------------------------------

  const handleAdd = (categoriaId: string) => {
    const nome = (novaSubcategoria[categoriaId] ?? '').trim();
    if (!nome) return;

    startTransition(async () => {
      try {
        setError(null);
        await createSubcategoria(categoriaId, nome);
        // Recarrega dados — como é server action com revalidatePath,
        // o Next vai invalidar e a página vai refletir os novos dados
        setNovaSubcategoria(prev => ({ ...prev, [categoriaId]: '' }));
        window.location.reload();
      } catch (e: any) {
        setError(e.message);
      }
    });
  };

  // ---------------------------------------------------------------------------
  // Editar
  // ---------------------------------------------------------------------------

  const handleEditSave = (subId: string) => {
    const nome = editingNome.trim();
    if (!nome) return;

    startTransition(async () => {
      try {
        setError(null);
        await updateSubcategoria(subId, nome);
        setCategorias(prev =>
          prev.map(cat => ({
            ...cat,
            subcategorias: cat.subcategorias.map(s =>
              s.id === subId ? { ...s, nome } : s
            ),
          }))
        );
        setEditingId(null);
      } catch (e: any) {
        setError(e.message);
      }
    });
  };

  // ---------------------------------------------------------------------------
  // Excluir
  // ---------------------------------------------------------------------------

  const handleDelete = (categoriaId: string, subId: string, nome: string) => {
    if (!confirm(`Remover a subcategoria "${nome}"?\nLugares vinculados não serão afetados.`)) return;

    startTransition(async () => {
      try {
        setError(null);
        await deleteSubcategoria(subId);
        updateCategoriasLocal(categoriaId, subs => subs.filter(s => s.id !== subId));
      } catch (e: any) {
        setError(e.message);
      }
    });
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
          <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {categorias.map(cat => {
        const subsOrdenadas = [...cat.subcategorias].sort((a, b) => a.ordem - b.ordem);

        return (
          <div key={cat.id} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            {/* Cabeçalho da categoria */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{cat.nome}</h2>
                <p className="text-xs text-gray-500">
                  Rota: <code className="bg-gray-100 px-1 rounded">/{cat.rota}</code>
                  {' · '}
                  <span>{cat._count.lugares} lugar(es)</span>
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {cat.subcategorias.length} subcategoria(s)
              </span>
            </div>

            {/* Lista de subcategorias */}
            <table className="w-full text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-2 text-left font-medium w-12">Ordem</th>
                  <th className="px-6 py-2 text-left font-medium">Nome</th>
                  <th className="px-6 py-2 text-right font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subsOrdenadas.map((sub, idx) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => handleMoveUp(cat.id, sub.id)}
                          disabled={idx === 0 || isPending}
                          className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          title="Mover para cima"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs text-center text-gray-400">{sub.ordem}</span>
                        <button
                          onClick={() => handleMoveDown(cat.id, sub.id)}
                          disabled={idx === subsOrdenadas.length - 1 || isPending}
                          className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          title="Mover para baixo"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-800">
                      {editingId === sub.id ? (
                        <input
                          value={editingNome}
                          onChange={e => setEditingNome(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleEditSave(sub.id)}
                          className="w-full px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          autoFocus
                        />
                      ) : (
                        sub.nome
                      )}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        {editingId === sub.id ? (
                          <>
                            <button
                              onClick={() => handleEditSave(sub.id)}
                              disabled={isPending}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                              title="Salvar"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"
                              title="Cancelar"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => { setEditingId(sub.id); setEditingNome(sub.nome); }}
                              className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"
                              title="Renomear"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(cat.id, sub.id, sub.nome)}
                              disabled={isPending}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded disabled:opacity-30"
                              title="Remover"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Adicionar nova subcategoria */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={novaSubcategoria[cat.id] ?? ''}
                onChange={e => setNovaSubcategoria(prev => ({ ...prev, [cat.id]: e.target.value }))}
                onKeyDown={e => e.key === 'Enter' && handleAdd(cat.id)}
                placeholder="Nova subcategoria..."
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleAdd(cat.id)}
                disabled={isPending || !(novaSubcategoria[cat.id] ?? '').trim()}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
