"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { createCupom, updateCupom } from "@/app/admin/actions";
import { Loader2 } from "lucide-react";

const schema = z.object({
  lugarId: z.string().min(1, "Selecione um lugar"),
  codigo: z.string().min(1, "O código é obrigatório"),
  descricao: z.string().min(1, "A descrição é obrigatória"),
  termos: z.string().optional(),
  ativo: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initialData?: any;
  lugares: { id: string; nome: string }[];
}

export default function AdminCupomForm({ initialData, lugares }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: (initialData as any) || {
      ativo: true,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      if (initialData?.id) {
        await updateCupom(initialData.id, data);
      } else {
        await createCupom(data);
      }
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao processar o formulário.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow border border-gray-200">
      <div className="grid grid-cols-1 gap-6">
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Informações do Cupom</h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Local Parceiro *</label>
          <select
            {...register("lugarId")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">Selecione...</option>
            {lugares.map((l) => (
              <option key={l.id} value={l.id}>{l.nome}</option>
            ))}
          </select>
          {errors.lugarId && <p className="text-red-500 text-xs mt-1">{errors.lugarId.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Código Promocional *</label>
          <input
            {...register("codigo")}
            placeholder="Ex: ISABEL10"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none uppercase"
          />
          {errors.codigo && <p className="text-red-500 text-xs mt-1">{errors.codigo.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Curta *</label>
          <input
            {...register("descricao")}
            placeholder="Ex: 10% de Desconto em todo o cardápio"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {errors.descricao && <p className="text-red-500 text-xs mt-1">{errors.descricao.message}</p>}
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Termos e Condições</label>
          <input
            {...register("termos")}
            placeholder="Ex: Válido até dezembro. Apenas presencial."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 mt-4">
          <input
            type="checkbox"
            id="ativo"
            {...register("ativo")}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="ativo" className="text-sm font-medium text-gray-700 cursor-pointer">
            Ativo (Visível no site)
          </label>
        </div>

      </div>

      <div className="border-t border-gray-200 pt-6 flex justify-end gap-4 mt-8">
        <a href="/admin/cupons" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Cancelar
        </a>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Salvando...</>
          ) : (
            initialData ? "Atualizar Cupom" : "Criar Cupom"
          )}
        </button>
      </div>
    </form>
  );
}
