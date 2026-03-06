'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Container } from '@/components/Container';
import { SectionTitle } from '@/components/SectionTitle';
import { validateContatoForm } from '@/lib/validation';
import { ContatoFormData, ContatoFormErrors } from '@/lib/types';
import { Instagram, Mail, Send } from 'lucide-react';

export default function ContatoPage() {
  const [formData, setFormData] = useState<ContatoFormData>({
    nome: '',
    email: '',
    mensagem: '',
  });

  const [errors, setErrors] = useState<ContatoFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpar erro do campo quando usuário começa a digitar
    if (errors[name as keyof ContatoFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar formulário
    const validationErrors = validateContatoForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Aqui seria implementada a lógica de envio
    // Por enquanto, apenas simula sucesso
    console.log('Formulário válido:', formData);
    
    // Reset form
    setFormData({ nome: '', email: '', mensagem: '' });
    setErrors({});
    setIsSubmitting(false);
    
    alert('Mensagem enviada com sucesso! Obrigada pelo contato 💕');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rosa-claro/30 via-creme-claro to-white">
      <Container size="md" className="py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionTitle 
            title="Fale comigo" 
            subtitle="Adoraria ouvir você! Envie suas dúvidas, sugestões ou apenas diga oi 💕"
            align="center"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo Nome */}
              <div>
                <label 
                  htmlFor="nome" 
                  className="block text-sm font-medium text-marrom-forte mb-2"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.nome 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-rosa-blush/30 focus:ring-rosa-blush focus:border-rosa-blush'
                  } focus:ring-2 focus:outline-none transition-colors`}
                  placeholder="Seu nome"
                />
                {errors.nome && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="text-base">⚠</span>
                    {errors.nome}
                  </p>
                )}
              </div>

              {/* Campo Email */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-marrom-forte mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-rosa-blush/30 focus:ring-rosa-blush focus:border-rosa-blush'
                  } focus:ring-2 focus:outline-none transition-colors`}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="text-base">⚠</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Campo Mensagem */}
              <div>
                <label 
                  htmlFor="mensagem" 
                  className="block text-sm font-medium text-marrom-forte mb-2"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.mensagem 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-rosa-blush/30 focus:ring-rosa-blush focus:border-rosa-blush'
                  } focus:ring-2 focus:outline-none transition-colors resize-none`}
                  placeholder="Escreva sua mensagem aqui..."
                />
                {errors.mensagem && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="text-base">⚠</span>
                    {errors.mensagem}
                  </p>
                )}
              </div>

              {/* Botão Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-rosa-blush hover:bg-rosa-blush/90 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-display text-marrom-forte mb-6">
                Outras formas de contato
              </h3>
              
              <div className="space-y-6">
                {/* Instagram */}
                <a
                  href="https://instagram.com/reviewsporisabel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-rosa-claro/30 transition-colors group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rosa-blush to-rosa-claro rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Instagram className="w-6 h-6 text-marrom-forte" />
                  </div>
                  <div>
                    <h4 className="font-medium text-marrom-forte mb-1">
                      Instagram
                    </h4>
                    <p className="text-sm text-marrom-rosado">
                      @reviewsporisabel
                    </p>
                    <p className="text-xs text-marrom-rosado/70 mt-1">
                      Me siga para ver mais dicas e novidades!
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:contato@reviewsporisabel.com.br"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-rosa-claro/30 transition-colors group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rosa-blush to-rosa-claro rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-marrom-forte" />
                  </div>
                  <div>
                    <h4 className="font-medium text-marrom-forte mb-1">
                      Email
                    </h4>
                    <p className="text-sm text-marrom-rosado break-all">
                      contato@reviewsporisabel.com.br
                    </p>
                    <p className="text-xs text-marrom-rosado/70 mt-1">
                      Respondo em até 48 horas
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Mensagem adicional */}
            <div className="bg-gradient-to-br from-rosa-claro/50 to-creme-claro rounded-2xl p-8">
              <p className="text-marrom-rosado leading-relaxed">
                <span className="text-2xl mb-2 block">💕</span>
                Fico muito feliz com cada mensagem que recebo! Seja para sugerir 
                um lugar novo, compartilhar sua experiência ou apenas bater um papo 
                sobre os melhores cantinhos de Blumenau.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
