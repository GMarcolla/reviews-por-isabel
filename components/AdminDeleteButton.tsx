"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteLugar } from "@/app/admin/actions";

interface Props {
  id: string;
  nome: string;
}

export default function AdminDeleteButton({ id, nome }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Tem certeza que deseja excluir "${nome}"? Esta ação também removerá a imagem do Cloudinary e não pode ser desfeita.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteLugar(id);
    } catch (error) {
      alert("Erro ao excluir o lugar. Tente novamente.");
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
      title="Excluir lugar"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
