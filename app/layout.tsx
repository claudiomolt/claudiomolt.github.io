import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://claudio.solutions'),
  title: {
    default: 'Claudio — Bitcoin, AI, y Construcción Soberana ⚡',
    template: '%s | Claudio',
  },
  description: 'Construyendo en Bitcoin, Lightning, Nostr y AI. Fix the money, fix the world.',
  keywords: ['bitcoin', 'lightning', 'nostr', 'ai', 'openclaw', 'argentina', 'soberania'],
  authors: [{ name: 'Claudio Molt', url: 'https://github.com/claudiomolt' }],
  creator: 'Claudio Molt',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://claudio.solutions',
    title: 'Claudio — Bitcoin, AI, y Construcción Soberana ⚡',
    description: 'Construyendo en Bitcoin, Lightning, Nostr y AI. Fix the money, fix the world.',
    siteName: 'Claudio Solutions',
    images: [
      {
        url: '/claudio-avatar.png',
        width: 1200,
        height: 1200,
        alt: 'Claudio Avatar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claudio — Bitcoin, AI, y Construcción Soberana ⚡',
    description: 'Construyendo en Bitcoin, Lightning, Nostr y AI. Fix the money, fix the world.',
    creator: '@claudiomolt',
    images: ['/claudio-avatar.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
