'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, Upload, X } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { receitaSchema, ReceitaInput } from '@/lib/validations/receita';
import { Receita } from '@/lib/types';

interface ReceitaFormProps {
  receita?: Receita;
  onCancel: () => void;
}

export function ReceitaForm({ receita, onCancel }: ReceitaFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [imagemUrl, setImagemUrl] = useState(receita?.imagem || '');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReceitaInput>({
    resolver: zodResolver(receitaSchema),
    defaultValues: receita
      ? {
          titulo: receita.titulo,
          convidado: receita.convidado,
          ingredientes: receita.ingredientes,
          passos: receita.passos,
          opiniao: receita.opiniao,
          imagem: receita.imagem,
        }
      : undefined,
  });

  const onSubmit = async (data: ReceitaInput) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        ...data,
        imagem: imagemUrl,
      };

      const url = receita
        ? `/api/receitas/${receita.id}`
        : '/api/receitas';
      
      const method = receita ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao salvar receita');
      }

      // Redirecionar para listagem admin
      router.push('/admin/receitas');
      router.refresh();
    } catch (error: any) {
      console.error('Erro ao salvar receita:', error);
      setSubmitError(error.message || 'Erro ao salvar receita');
      setIsSubmitting(false);
    }
  };

  const handleUploadSuccess = (result: any) => {
    const url = result.info.secure_url;
    setImagemUrl(url);
    setValue('imagem', url);
  };

  const removeImage = () => {
    setImagemUrl('');
    setValue('imagem', '');
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow border border-gray-200"
    >
      {/* Cabeçalho */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-display font-bold text-marrom-escuro">
          {receita ? 'Editar Receita' : 'Nova Receita'}
        </h2>
        <p className="text-sm text-marrom-escuro/60 mt-1">
          Preencha os campos abaixo para {receita ? 'atualizar' : 'cadastrar'} a receita
        </p>
      </div>

      {/* Erro geral */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">Erro ao salvar</p>
            <p className="text-sm text-red-700 mt-1">{submitError}</p>
          </div>
        </div>
      )}

      {/* Avisos de validação */}
      {hasErrors && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-yellow-800">
              Corrija os erros abaixo antes de continuar
            </p>
          </div>
        </div>
      )}

      {/* Campos do formulário */}
      <div className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título da Receita <span className="text-red-500">*</span>
          </label>
          <input
            {...register('titulo')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-tulipa focus:border-transparent outline-none"
            placeholder="Ex: Bolo de Chocolate"
          />
          {errors.titulo && (
            <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>
          )}
        </div>

        {/* Convidado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Convidado <span className="text-red-500">*</span>
          </label>
          <input
            {...register('convidado')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-tulipa focus:border-transparent outline-none"
            placeholder="Ex: Maria Silva"
          />
          {errors.convidado && (
            <p className="text-red-500 text-xs mt-1">{errors.convidado.message}</p>
          )}
        </div>

        {/* Imagem */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagem do Prato
          </label>

          {imagemUrl ? (
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-300">
              <Image
                src={imagemUrl}
                alt="Preview da receita"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                aria-label="Remover imagem"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={handleUploadSuccess}
              options={{
                folder: 'receitas',
                maxFiles: 1,
                resourceType: 'image',
                clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                maxFileSize: 5000000, // 5MB
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg hover:border-verde-tulipa hover:bg-verde-tulipa/5 transition-colors flex flex-col items-center justify-center gap-3"
                >
                  <Upload className="w-12 h-12 text-gray-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      Clique para fazer upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG ou WebP (máx. 5MB)
                    </p>
                  </div>
                </button>
              )}
            </CldUploadWidget>
          )}
          {errors.imagem && (
            <p className="text-red-500 text-xs mt-1">{errors.imagem.message}</p>
          )}
        </div>

        {/* Ingredientes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ingredientes <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('ingredientes')}
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-tulipa focus:border-transparent outline-none resize-none"
            placeholder="Liste os ingredientes, um por linha ou separados por vírgula"
          />
          {errors.ingredientes && (
            <p className="text-red-500 text-xs mt-1">{errors.ingredientes.message}</p>
          )}
        </div>

        {/* Modo de Preparo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Modo de Preparo <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('passos')}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-tulipa focus:border-transparent outline-none resize-none"
            placeholder="Descreva o passo a passo da receita"
          />
          {errors.passos && (
            <p className="text-red-500 text-xs mt-1">{errors.passos.message}</p>
          )}
        </div>

        {/* Opinião da Isabel */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Opinião da Isabel <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('opiniao')}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rosa-tulipa focus:border-transparent outline-none resize-none"
            placeholder="Compartilhe sua opinião sobre o resultado da receita"
          />
          {errors.opiniao && (
            <p className="text-red-500 text-xs mt-1">{errors.opiniao.message}</p>
          )}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-2.5 bg-verde-tulipa text-white rounded-lg font-medium hover:bg-verde-tulipa/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Salvando...
            </>
          ) : (
            <>{receita ? 'Atualizar' : 'Criar'} Receita</>
          )}
        </button>
      </div>
    </form>
  );
}
