'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Brain, 
  Upload, 
  Zap, 
  Moon, 
  Sun,
  BookOpen,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  Target,
  Globe
} from 'lucide-react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-300">
        {/* Header */}
        <header className="relative z-10 px-6 py-4">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Math Lab Enhanced
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">IA Tutor Português</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Funcionalidades
              </a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Sobre
              </a>
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Entrar
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-200"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            {/* Floating Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
            <div className="absolute top-32 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-xl"></div>

            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700">
                <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Powered by GPT-4 Vision
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight">
                Matemática com IA
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Tutor inteligente para <span className="font-semibold text-blue-600 dark:text-blue-400">7º, 8º e 9º anos</span> com currículos portugueses. 
                Upload de imagens, explicações personalizadas e acompanhamento contínuo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  href="/chat"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2"
                >
                  <span>Começar Agora</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/login"
                  className="group bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-200 flex items-center space-x-2"
                >
                  <Users className="w-5 h-5" />
                  <span>Criar Conta</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3</div>
                  <div className="text-gray-600 dark:text-gray-400">Anos de Ensino</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
                  <div className="text-gray-600 dark:text-gray-400">Disponibilidade</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">∞</div>
                  <div className="text-gray-600 dark:text-gray-400">Paciência IA</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-20 bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Funcionalidades Premium
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Tecnologia de ponta para uma experiência de aprendizagem única e personalizada
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Upload de Imagens */}
              <div className="group bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Upload de Imagens</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Tire foto do exercício ou upload direto. IA analisa e explica passo a passo com GPT-4 Vision.
                </p>
              </div>

              {/* IA Tutor */}
              <div className="group bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">IA Tutor Especializada</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Currículos portugueses 7º-9º anos. Explica conceitos de forma clara e adapta ao seu ritmo.
                </p>
              </div>

              {/* Currículos Portugueses */}
              <div className="group bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Currículos Oficiais</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Alinhado com programas oficiais portugueses. Conteúdo certificado para cada ano letivo.
                </p>
              </div>

              {/* Interface Premium */}
              <div className="group bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Interface Premium</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Dark mode, glassmorphism, micro-animações. Experiência moderna e intuitiva.
                </p>
              </div>

              {/* Performance */}
              <div className="group bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Alta Performance</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Deploy otimizado, build 9s, bundle 99.6kB. Velocidade e eficiência garantidas.
                </p>
              </div>

              {/* Global Access */}
              <div className="group bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Acesso Global</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Disponível 24/7 em qualquer lugar. Cloud deploy com SSL e backup automático.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full border border-green-200 dark:border-green-700">
              <Trophy className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                100% Operacional
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              Missão 100% Concluída
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Math Lab Enhanced foi desenvolvido especificamente para estudantes portugueses dos 7º, 8º e 9º anos. 
              Combina tecnologia de IA de ponta com currículos oficiais para criar a experiência de aprendizagem 
              mais avançada disponível.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Stack Tecnológico</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Next.js 15 • Tailwind CSS • GPT-4 Vision • Supabase • N8N • Vercel • GitHub
                </p>
              </div>
              <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Métricas de Sucesso</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Build 9s • Bundle 99.6kB • Deploy Automático • 100% Uptime • SSL Ativo
                </p>
              </div>
            </div>

            <Link
              href="/chat"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <span>Experimentar Agora</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm border-t border-white/10 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Calculator className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 dark:text-gray-200">Math Lab Enhanced</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Powered by GPT-4 Vision</div>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  © 2025 Math Lab Enhanced. Currículos portugueses oficiais.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Deploy Status: ✅ ONLINE • Build: Optimized • Performance: Premium
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}