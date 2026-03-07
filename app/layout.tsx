import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://reviewsporisabel.com.br'),
  title: {
    default: "Reviews por Isabel - Guia de Blumenau",
    template: "%s - Reviews por Isabel",
  },
  description: "Um guia de lugares e experiências em Blumenau e região. Descubra os melhores restaurantes, cafés, passeios e experiências com curadoria especial.",
  keywords: [
    "Blumenau",
    "restaurantes Blumenau",
    "cafés Blumenau",
    "passeios Blumenau",
    "guia Blumenau",
    "turismo Blumenau",
    "onde comer Blumenau",
    "o que fazer Blumenau",
    "reviews",
    "Isabel",
  ],
  authors: [{ name: "Isabel" }],
  creator: "Isabel",
  publisher: "Reviews por Isabel",
  icons: {
    icon: '/logotipo.png',
    apple: '/logotipo.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Reviews por Isabel",
    title: "Reviews por Isabel - Guia de Blumenau",
    description: "Um guia de lugares e experiências em Blumenau e região. Descubra os melhores restaurantes, cafés, passeios e experiências com curadoria especial.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Reviews por Isabel - Guia de Blumenau",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reviews por Isabel - Guia de Blumenau",
    description: "Um guia de lugares e experiências em Blumenau e região",
    creator: "@reviewsporisabel",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Dados estruturados JSON-LD para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Reviews por Isabel',
    description: 'Um guia de lugares e experiências em Blumenau e região',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://reviewsporisabel.com.br',
    inLanguage: 'pt-BR',
    author: {
      '@type': 'Person',
      name: 'Isabel',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Reviews por Isabel',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://reviewsporisabel.com.br'}/icon.png`,
      },
    },
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
