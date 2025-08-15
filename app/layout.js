import './globals.css'
import { Toaster } from 'react-hot-toast'
import PWAInstall from './components/PWAInstall'

// Metadata separado do viewport
export const metadata = {
  title: {
    default: 'Math Lab Enhanced - IA Tutor',
    template: '%s | Math Lab Enhanced'
  },
  description: 'Plataforma inteligente de matemática para estudantes portugueses do 7º, 8º e 9º anos com tutor IA personalizado',
  keywords: ['matemática', 'educação', 'IA', 'tutor', 'Portugal', '7º ano', '8º ano', '9º ano'],
  authors: [{ name: 'Math Lab Team' }],
  creator: 'Math Lab Enhanced',
  publisher: 'Math Lab Enhanced',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://mathlab-sigma.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Math Lab Enhanced - IA Tutor',
    description: 'Plataforma inteligente de matemática para estudantes portugueses',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://mathlab-sigma.vercel.app',
    siteName: 'Math Lab Enhanced',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Math Lab Enhanced Logo',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Math Lab Enhanced - IA Tutor',
    description: 'Plataforma inteligente de matemática para estudantes portugueses',
    images: ['/icons/icon-512x512.png'],
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
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
}

// Viewport separado (corrige o warning)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Math Lab Enhanced" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Math Lab" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('✅ SW registered: ', registration.scope);
                    }, function(err) {
                      console.log('❌ SW registration failed: ', err);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              borderRadius: '12px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#f9fafb',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#f9fafb',
              },
            },
          }}
        />
        <PWAInstall />
      </body>
    </html>
  )
}