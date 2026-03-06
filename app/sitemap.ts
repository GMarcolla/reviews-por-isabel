import { MetadataRoute } from 'next';
import { getRestaurantes } from '@/lib/data/restaurantes';
import { getCafes } from '@/lib/data/cafes';
import { getPasseios } from '@/lib/data/passeios';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reviewsporisabel.com.br';
  
  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/restaurantes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cafes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/passeios`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/roteiro`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cupons`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Páginas dinâmicas de restaurantes
  const restaurantes = getRestaurantes();
  const restaurantePages = restaurantes.map((restaurante) => ({
    url: `${baseUrl}/restaurantes/${restaurante.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Páginas dinâmicas de cafés
  const cafes = getCafes();
  const cafePages = cafes.map((cafe) => ({
    url: `${baseUrl}/cafes/${cafe.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Páginas dinâmicas de passeios
  const passeios = getPasseios();
  const passeioPages = passeios.map((passeio) => ({
    url: `${baseUrl}/passeios/${passeio.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...restaurantePages, ...cafePages, ...passeioPages];
}
