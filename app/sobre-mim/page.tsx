import Image from 'next/image';

export const metadata = {
  title: 'Sobre Mim | Reviews por Isabel',
  description: 'Conheça a Isa e a história por trás do Reviews por Isabel.',
};

export default function SobreMim() {
  return (
    <main className="min-h-screen">
      <section className="relative bg-gradient-to-br from-beje-tulipa/30 via-off-white-rosado to-white py-20 px-6 md:py-32 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-marrom-escuro leading-tight">
                Oi! Eu sou a Isa!
              </h1>
              <div className="space-y-3 text-marrom-escuro text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                <p>
                  Sou criadora de conteúdo natural de Blumenau (SC), bacharela em Ciências Contábeis e apaixonada por audiovisual, comunicação e por viver novas experiências.
                </p>
                <p>
                  O Reviews por Isabel nasceu da minha vontade de compartilhar lugares que realmente valem a visita em Blumenau e região. Por aqui, reúno restaurantes, cafés, passeios e experiências que já vivi e recomendo, sempre com base nas minhas próprias vivências.
                </p>
                <p>
                  Espero com isso, te inspirar a descobrir novos lugares e viver experiências incríveis pela região.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="/foto-home.jpeg"
                  alt="Isabel - Reviews por Isabel"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-rosa-tulipa/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-verde-tulipa/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
