import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Math Lab Enhanced - Tutor IA de Matemática',
  description: 'Tutor inteligente personalizado para estudantes portugueses do 7º, 8º e 9º anos. IA GPT-4 com upload de exercícios.',
  keywords: 'matemática, tutor, IA, 7º ano, 8º ano, 9º ano, portugal, exercícios',
  authors: [{ name: 'Ricardo Pereira' }],
  creator: 'Ricardo Pereira',
  publisher: 'Math Lab Enhanced',
  
  // PWA Metadata
  applicationName: 'Math Lab Enhanced',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Math Lab Enhanced',
  },
  formatDetection: {
    telephone: false,
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    siteName: 'Math Lab Enhanced',
    title: 'Math Lab Enhanced - Tutor IA de Matemática',
    description: 'Tutor inteligente para matemática do 7º, 8º e 9º anos',
    locale: 'pt_PT',
    url: 'https://mathlab-sigma.vercel.app',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Math Lab Enhanced - Tutor IA',
    description: 'Aprende matemática com IA GPT-4 personalizada',
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Theme Colors
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
}

export const viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Math Lab Enhanced" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Math Lab Enhanced" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Favicon & Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'white',
              color: '#374151',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
            },
          }}
        />
      </body>
    </html>
  )
}