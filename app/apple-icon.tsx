import { ImageResponse } from 'next/og';

// Configuração do ícone Apple
export const runtime = 'edge';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Gerar ícone Apple
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: '#E8B4B8',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4A2F2F',
          fontFamily: 'serif',
          fontWeight: 'bold',
        }}
      >
        I
      </div>
    ),
    {
      ...size,
    }
  );
}
