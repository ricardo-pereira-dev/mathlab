'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallBanner(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA installation accepted');
    }
    
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-dismissed', 'true');
  };

  // Don't show if dismissed or already installed
  if (!showInstallBanner || localStorage.getItem('pwa-dismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-2xl border border-blue-300">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Smartphone size={20} />
            <span className="font-semibold text-sm">Instalar App</span>
          </div>
          <button 
            onClick={handleDismiss}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        
        <p className="text-sm text-blue-100 mb-3">
          {isIOS 
            ? 'Adiciona ao ecrã inicial para melhor experiência!' 
            : 'Instala o Math Lab como app para acesso rápido!'
          }
        </p>
        
        {isIOS ? (
          <div className="text-xs text-blue-100">
            Toca em <span className="font-semibold">⎋</span> e depois em <span className="font-semibold">"Adicionar ao Ecrã Inicial"</span>
          </div>
        ) : (
          <button
            onClick={handleInstallClick}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2 w-full justify-center"
          >
            <Download size={16} />
            <span>Instalar Agora</span>
          </button>
        )}
      </div>
    </div>
  );
}