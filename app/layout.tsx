import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ArtPrize2026',
  description: 'A living counterculture art piece that counts down, collects, and questions value.',
  metadataBase: new URL('https://artprize2026.com'),
  openGraph: {
    title: 'ArtPrize2026',
    description: 'A living counterculture art piece that counts down, collects, and questions value.',
    url: 'https://artprize2026.com',
    siteName: 'ArtPrize2026',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'ArtPrize2026',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArtPrize2026',
    description: 'A living counterculture art piece that counts down, collects, and questions value.',
    images: ['/og.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <script src="/dashboard-console-capture.js" />
        {children}
      </body>
    </html>
  )
}