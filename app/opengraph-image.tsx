import { ImageResponse } from 'next/og';

// Configuração da imagem
export const runtime = 'edge';
export const alt = 'Reviews por Isabel - Guia de Blumenau';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Gerar imagem Open Graph
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF8F6',
        }}
      >
        {/* Header com fundo rosa */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            backgroundColor: '#E8B4B8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: '#4A2F2F',
              margin: 0,
              fontFamily: 'serif',
            }}
          >
            Reviews por Isabel
          </h1>
        </div>

        {/* Conteúdo central */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '100px',
          }}
        >
          <p
            style={{
              fontSize: 40,
              color: '#6B4F4F',
              margin: 0,
              marginBottom: '20px',
              fontFamily: 'sans-serif',
            }}
          >
            Um guia de lugares e experiências
          </p>
          <p
            style={{
              fontSize: 40,
              color: '#6B4F4F',
              margin: 0,
              fontFamily: 'sans-serif',
            }}
          >
            em Blumenau e região
          </p>
        </div>

        {/* Decoração inferior */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: '#E8B4B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              color: '#4A2F2F',
              fontWeight: 'bold',
              fontFamily: 'serif',
            }}
          >
            I
          </div>
          <span
            style={{
              fontSize: 28,
              color: '#6B4F4F',
              fontFamily: 'sans-serif',
            }}
          >
            reviewsporisabel.com.br
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
