"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect, useRef } from "react";
import { createLugar, updateLugar } from "@/app/admin/actions";
import { Loader2, AlertCircle, X, Image as ImageIcon, Upload, Lock, Unlock } from "lucide-react";
import { CategoriaComSubcategorias } from "@/lib/types";
import { CldUploadWidget } from "next-cloudinary";


const schema = z.object({
  nome: z.string().min(2, "O nome é obrigatório"),
  categoriaId: z.string().min(1, "Selecione uma categoria"),
  subcategoriaId: z.string().optional(),
  descricaoCurta: z.string().min(5, "A descrição curta é obrigatória"),
  descricaoCompleta: z.string().min(10, "A descrição completa é obrigatória"),
  imagem: z.string().min(1, "A URL da imagem é obrigatória"),
  imagemAlt: z.string().min(1, "Texto alternativo para a imagem é obrigatório"),
  endereco: z.string().optional(),
  enderecoGoogleMaps: z.string().optional(),
  enderecoGoogleMapsLabel: z.string().optional(),
  enderecoGoogleMaps2: z.string().optional(),
  enderecoGoogleMaps2Label: z.string().optional(),
  telefone: z.string().optional(),
  instagram: z.string().optional(),
  instagramReview: z.string().optional(),
  website: z.string().optional(),
  horarioFuncionamento: z.string().optional(),
  faixaPreco: z.coerce.number().min(1).max(4).optional(),
  destaque: z.boolean().default(false),
  ordem: z.coerce.number().default(0),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initialData?: any;
  categorias: CategoriaComSubcategorias[];
}

export default function AdminLugarForm({ initialData, categorias }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [subcategoriasDisponiveis, setSubcategoriasDisponiveis] = useState<{id: string; nome: string}[]>([]);
  const [isManualUrlEdit, setIsManualUrlEdit] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: initialData
      ? {
          nome: initialData.nome || "",
          categoriaId: initialData.categoriaId || "",
          subcategoriaId: initialData.subcategoriaId || "",
          descricaoCurta: initialData.descricaoCurta || "",
          descricaoCompleta: initialData.descricaoCompleta || "",
          imagem: initialData.imagem || "",
          imagemAlt: initialData.imagemAlt || "",
          endereco: initialData.endereco || "",
          enderecoGoogleMaps: initialData.enderecoGoogleMaps || "",
          enderecoGoogleMapsLabel: initialData.enderecoGoogleMapsLabel || "",
          enderecoGoogleMaps2: initialData.enderecoGoogleMaps2 || "",
          enderecoGoogleMaps2Label: initialData.enderecoGoogleMaps2Label || "",
          telefone: initialData.telefone || "",
          instagram: initialData.instagram || "",
          instagramReview: initialData.instagramReview || "",
          website: initialData.website || "",
          horarioFuncionamento: initialData.horarioFuncionamento || "",
          faixaPreco: initialData.faixaPreco ?? 2,
          destaque: initialData.destaque ?? false,
          ordem: initialData.ordem ?? 0,
        }
      : {
          faixaPreco: 2,
          destaque: false,
          ordem: 0,
        },
  });

  const categoriaIdWatch = watch("categoriaId");
  const imagemUrl = watch("imagem");

  const previousCategoriaRef = useRef(categoriaIdWatch);

  // Atualiza subcategorias quando a categoria muda
  useEffect(() => {
    const cat = categorias.find(c => c.id === categoriaIdWatch);
    setSubcategoriasDisponiveis(cat?.subcategorias ?? []);
    
    // Limpa a subcategoria ao trocar de categoria (mas não na carga inicial)
    if (previousCategoriaRef.current !== categoriaIdWatch) {
      setValue("subcategoriaId", "");
      previousCategoriaRef.current = categoriaIdWatch;
    }
  }, [categoriaIdWatch, categorias, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (initialData?.id) {
        await updateLugar(initialData.id, data);
      } else {
        await createLugar(data);
      }
      // Se chegar aqui, o redirect() foi chamado dentro da action
    } catch (error: any) {
      console.error(error);
      // next/navigation redirect lança uma exceção especial — deve ser re-propagada
      if (
        error?.message === "NEXT_REDIRECT" ||
        error?.digest?.includes("NEXT_REDIRECT")
      ) {
        throw error;
      }
      setSubmitError(error?.message || "Houve um erro ao processar o formulário.");
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow border border-gray-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Identificação Básica */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Informações Básicas
          </h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Estabelecimento *
          </label>
          <input
            {...register("nome")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {errors.nome && (
            <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria *
          </label>
          <select
            {...register("categoriaId")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">Selecione...</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
          {errors.categoriaId && (
            <p className="text-red-500 text-xs mt-1">{errors.categoriaId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Especialidade / Subcategoria
          </label>
          {subcategoriasDisponiveis.length > 0 ? (
            <select
              {...register("subcategoriaId")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Selecione uma subcategoria...</option>
              {subcategoriasDisponiveis.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.nome}</option>
              ))}
            </select>
          ) : (
            <input
              disabled
              placeholder="Selecione primeiro uma categoria acima"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-400"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Faixa de Preço ($ a $$$$)
          </label>
          <select
            {...register("faixaPreco")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="1">$ - Barato</option>
            <option value="2">$$ - Moderado</option>
            <option value="3">$$$ - Caro</option>
            <option value="4">$$$$ - Muito Caro</option>
          </select>
        </div>

        {/* Textos */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição Curta *
          </label>
          <input
            {...register("descricaoCurta")}
            placeholder="Para o card de listagem (máx 100 caracteres recomendado)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {errors.descricaoCurta && (
            <p className="text-red-500 text-xs mt-1">{errors.descricaoCurta.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição Completa *
          </label>
          <textarea
            {...register("descricaoCompleta")}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          ></textarea>
          {errors.descricaoCompleta && (
            <p className="text-red-500 text-xs mt-1">{errors.descricaoCompleta.message}</p>
          )}
        </div>

        {/* Imagem */}
        <div className="md:col-span-2 mt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Imagem de Capa
          </h2>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imagem *
          </label>
          
          <div className="space-y-4">
            {/* Botão de Upload */}
            <CldUploadWidget 
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default_reviews"}
              onSuccess={(result: any) => {
                if (result.info && typeof result.info !== "string") {
                  setValue("imagem", result.info.secure_url);
                }
              }}
              options={{
                maxFiles: 1,
                resourceType: "image",
                clientAllowedFormats: ["jpg", "png", "jpeg", "webp"],
                maxFileSize: 5000000, // 5MB
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all bg-gray-50"
                >
                  <Upload className="w-5 h-5" />
                  <span>Fazer Upload de Nova Imagem</span>
                </button>
              )}
            </CldUploadWidget>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImageIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register("imagem")}
                readOnly={!isManualUrlEdit}
                placeholder="A URL aparecerá aqui após o upload"
                className={`w-full pl-10 pr-24 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm ${!isManualUrlEdit ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'}`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualUrlEdit(!isManualUrlEdit)}
                  className={`p-1.5 rounded transition-colors ${isManualUrlEdit ? 'text-orange-500 bg-orange-50' : 'text-gray-400 hover:text-gray-600'}`}
                  title={isManualUrlEdit ? "Bloquear edição manual" : "Habilitar edição manual"}
                >
                  {isManualUrlEdit ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
                {imagemUrl && (
                  <button
                    type="button"
                    onClick={() => setValue("imagem", "")}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    title="Limpar campo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {errors.imagem && (
            <p className="text-red-500 text-xs mt-1">{errors.imagem.message}</p>
          )}
          
          {imagemUrl && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 inline-block">
              <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Preview da Imagem:</p>
              <div className="relative group">
                <img
                  src={imagemUrl}
                  alt="Preview"
                  className="h-48 md:h-64 w-auto object-cover rounded-lg shadow-sm border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Texto Alternativo (Acessibilidade) *
          </label>
          <input
            {...register("imagemAlt")}
            placeholder="Ex: Foto da fachada do restaurante com mesas na calçada"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {errors.imagemAlt && (
            <p className="text-red-500 text-xs mt-1">{errors.imagemAlt.message}</p>
          )}
        </div>

        {/* Links e Redes Sociais */}
        <div className="md:col-span-2 mt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Links e Contato
          </h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram (Nome do usuário com @)
          </label>
          <input
            {...register("instagram")}
            placeholder="@nomedolocal"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link do seu Review (Instagram/TikTok)
          </label>
          <input
            {...register("instagramReview")}
            placeholder="https://instagram.com/p/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço de Texto
          </label>
          <input
            {...register("endereco")}
            placeholder="Ex: Avenida Beira Mar, 1000 - Balneário Camboriú"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link do Google Maps
          </label>
          <input
            {...register("enderecoGoogleMaps")}
            placeholder="https://maps.app.goo.gl/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label do Link Google Maps
          </label>
          <input
            {...register("enderecoGoogleMapsLabel")}
            placeholder="Ex: Ver no Google Maps"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link do Google Maps 2 (2ª unidade)
          </label>
          <input
            {...register("enderecoGoogleMaps2")}
            placeholder="https://maps.app.goo.gl/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label do Link Google Maps 2
          </label>
          <input
            {...register("enderecoGoogleMaps2Label")}
            placeholder="Ex: Ver 2ª unidade"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefone / WhatsApp
          </label>
          <input
            {...register("telefone")}
            placeholder="(47) 99999-9999"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            {...register("website")}
            placeholder="https://www.seusite.com.br"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horário de Funcionamento
          </label>
          <input
            {...register("horarioFuncionamento")}
            placeholder="Ex: Seg a Sex: 08h às 22h"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Visibilidade */}
        <div className="md:col-span-2 mt-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Posicionamento Logístico
          </h2>
        </div>

        <div className="flex items-center space-x-3 mb-4 md:col-span-1">
          <input
            type="checkbox"
            id="destaque"
            {...register("destaque")}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="destaque" className="text-sm font-medium text-gray-700 cursor-pointer">
            Exibir nos Destaques Iniciais (Hero/Premium)
          </label>
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ordem Prioritária (0 = Padrão, Número maior sobe)
          </label>
          <input
            type="number"
            {...register("ordem")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none max-w-xs"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 flex flex-col gap-4 mt-8">
        {/* Erros de validação agrupados */}
        {hasErrors && (
          <div className="flex items-start gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">Corrija os erros antes de salvar:</p>
              <ul className="text-sm list-disc list-inside space-y-0.5">
                {Object.entries(errors).map(([field, err]) => (
                  <li key={field}>{(err as any)?.message}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Erro de submit */}
        {submitError && (
          <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{submitError}</p>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <a
            href="/admin/lugares"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
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
              initialData ? "Atualizar Estabelecimento" : "Criar Estabelecimento"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
