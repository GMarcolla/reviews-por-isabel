import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimizações para produção
  reactStrictMode: true,

  // A rota do PDF lê as fontes de public/fonts em tempo de execução. O tracing
  // do Next não detecta esse caminho (é montado com path.join), então os
  // arquivos precisam ser incluídos no bundle da função explicitamente —
  // sem isso a geração quebra em produção, mas funciona em dev.
  outputFileTracingIncludes: {
    '/api/roteiro/pdf': ['./public/fonts/**'],
  },

  // Configuração de imagens
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  // Compressão
  compress: true,

  // Redirects
  async redirects() {
    return [
      {
        source: '/passeios',
        destination: '/lazer',
        permanent: true,
      },
      {
        source: '/passeios/:slug',
        destination: '/lazer/:slug',
        permanent: true,
      },
    ];
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
