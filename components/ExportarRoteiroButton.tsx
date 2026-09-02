'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

/**
 * Baixa o roteiro em PDF a partir de /api/roteiro/pdf.
 *
 * O download passa por fetch (em vez de um <a download> direto) para conseguir
 * mostrar estado de carregamento — a primeira geração leva alguns segundos
 * enquanto as imagens são buscadas no Cloudinary.
 */
export function ExportarRoteiroButton() {
  const [estado, setEstado] = useState<'ocioso' | 'gerando' | 'erro'>('ocioso');

  async function exportar() {
    setEstado('gerando');

    try {
      // Sem cache local: quem clica em "exportar" quer o roteiro como ele está
      // agora, nunca uma cópia guardada de um download anterior.
      const resposta = await fetch('/api/roteiro/pdf', { cache: 'no-store' });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);

      const blob = await resposta.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'roteiro-um-dia-em-blumenau.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      setEstado('ocioso');
    } catch (error) {
      console.error('Falha ao exportar o roteiro:', error);
      setEstado('erro');
    }
  }

  const gerando = estado === 'gerando';

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={exportar}
        disabled={gerando}
        aria-busy={gerando}
        className="inline-flex items-center gap-2 px-6 py-3 bg-verde-tulipa text-white rounded-lg hover:bg-verde-tulipa-claro transition-all duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {gerando ? (
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
        ) : (
          <Download className="w-5 h-5" aria-hidden="true" />
        )}
        {gerando ? 'Gerando PDF...' : 'Exportar roteiro'}
      </button>

      {estado === 'erro' && (
        <p role="alert" className="text-sm text-marrom-escuro/70">
          Não foi possível gerar o PDF. Tente novamente.
        </p>
      )}
    </div>
  );
}
