import { MetadataRoute } from 'next';
import { getRestaurantes } from '@/lib/data/restaurantes';
import { getCafes } from '@/lib/data/cafes';
import { getPasseios } from '@/lib/data/passeios';
import { getPrestadores } from '@/lib/data/prestadores';
import { getLojas } from '@/lib/data/lojas';

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
      url: `${baseUrl}/lazer`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prestadores`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lojas`,
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

  // Páginas dinâmicas de lazer
  const lazer = getPasseios();
  const lazerPages = lazer.map((item) => ({
    url: `${baseUrl}/lazer/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Páginas dinâmicas de prestadores
  const prestadores = getPrestadores();
  const prestadorPages = prestadores.map((prestador) => ({
    url: `${baseUrl}/prestadores/${prestador.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Páginas dinâmicas de lojas
  const lojas = getLojas();
  const lojaPages = lojas.map((loja) => ({
    url: `${baseUrl}/lojas/${loja.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...restaurantePages, ...cafePages, ...lazerPages, ...prestadorPages, ...lojaPages];
}
