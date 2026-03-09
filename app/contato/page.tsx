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
    <main className="min-h-screen bg-gradient-to-br from-beje-tulipa/20 via-off-white-rosado to-white">
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
                  className="block text-sm font-medium text-marrom-escuro mb-2"
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
                      : 'border-beje-tulipa focus:ring-rosa-tulipa focus:border-rosa-tulipa'
                  } focus:ring-2 focus:outline-none transition-all duration-200`}
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
                  className="block text-sm font-medium text-marrom-escuro mb-2"
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
                      : 'border-beje-tulipa focus:ring-rosa-tulipa focus:border-rosa-tulipa'
                  } focus:ring-2 focus:outline-none transition-all duration-200`}
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
                  className="block text-sm font-medium text-marrom-escuro mb-2"
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
                      : 'border-beje-tulipa focus:ring-rosa-tulipa focus:border-rosa-tulipa'
                  } focus:ring-2 focus:outline-none transition-all duration-200 resize-none`}
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
                className="w-full bg-rosa-tulipa hover:bg-rosa-tulipa-claro text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-display text-marrom-escuro mb-6">
                Outras formas de contato
              </h3>
              
              <div className="space-y-6">
                {/* Instagram */}
                <a
                  href="https://instagram.com/reviewsporisabel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-beje-tulipa/20 transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rosa-tulipa to-rosa-tulipa-claro rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-marrom-escuro mb-1">
                      Instagram
                    </h4>
                    <p className="text-sm text-marrom-escuro/70">
                      @reviewsporisabel
                    </p>
                    <p className="text-xs text-marrom-escuro/60 mt-1">
                      Me siga para ver mais dicas e novidades!
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:contato@reviewsporisabel.com.br"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-beje-tulipa/20 transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rosa-tulipa to-rosa-tulipa-claro rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-marrom-escuro mb-1">
                      Email
                    </h4>
                    <p className="text-sm text-marrom-escuro/70 break-all">
                      contato@reviewsporisabel.com.br
                    </p>
                    <p className="text-xs text-marrom-escuro/60 mt-1">
                      Respondo em até 48 horas
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Mensagem adicional */}
            <div className="bg-gradient-to-br from-beje-tulipa/30 to-off-white-rosado rounded-2xl p-8">
              <p className="text-marrom-escuro/80 leading-relaxed">
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
