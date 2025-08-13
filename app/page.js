'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, BookOpen, Brain, Sparkles, Moon, Sun, Upload, Image as ImageIcon, Zap, Rocket, Target, Award } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  // Dark mode toggle with persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('mathlab-theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mathlab-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mathlab-theme', 'light');
    }
  };

  const handleStartLearning = () => {
    toast.success('🚀 Redirecionando para o Math Lab Enhanced!');
    setTimeout(() => router.push('/login'), 1500);
  };

  const handleTryDemo = () => {
    toast.success('🎯 Vamos testar o tutor IA!');
    setTimeout(() => router.push('/chat'), 1500);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark 
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <Toaster position="top-right" />
      
      {/* Navigation Header */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Enhanced */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Calculator className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300`}>
                Math Lab
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Enhanced IA Tutor</p>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-white/10 hover:bg-white/20 border border-white/20' 
                : 'bg-white/70 hover:bg-white/90 border border-gray-200 shadow-sm'
            }`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Hero Title with Animations */}
          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
              <Brain className="w-8 h-8 text-blue-500 animate-bounce" />
              <Zap className="w-8 h-8 text-purple-500 animate-pulse" />
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Aprende Matemática com{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                IA Enhanced
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Tutor inteligente personalizado para estudantes portugueses do{' '}
              <span className="font-semibold text-blue-600">7º, 8º e 9º anos</span>.
              <br />
              Upload de exercícios, explicações detalhadas e resolução passo a passo.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button
              onClick={handleStartLearning}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                Começar a Aprender
                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={handleTryDemo}
              className={`px-8 py-4 font-semibold rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                isDark
                  ? 'border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5" />
                Experimentar Demo
              </div>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1: IA Tutor */}
          <div className={`p-8 rounded-3xl backdrop-blur-sm transition-all duration-300 hover:scale-105 border ${
            isDark 
              ? 'bg-white/10 border-white/20 hover:bg-white/15' 
              : 'bg-white/70 border-gray-200 hover:bg-white/90 shadow-sm hover:shadow-md'
          }`}>
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                IA Tutor GPT-4
              </h3>
            </div>
            <p className={`text-center leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Tutor inteligente especializado nos currículos portugueses. 
              Explicações personalizadas e resolução passo a passo adaptada ao teu nível.
            </p>
          </div>

          {/* Feature 2: Upload Exercícios */}
          <div className={`p-8 rounded-3xl backdrop-blur-sm transition-all duration-300 hover:scale-105 border ${
            isDark 
              ? 'bg-white/10 border-white/20 hover:bg-white/15' 
              : 'bg-white/70 border-gray-200 hover:bg-white/90 shadow-sm hover:shadow-md'
          }`}>
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 mx-auto">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Upload de Imagens
              </h3>
            </div>
            <p className={`text-center leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Faz upload de exercícios, problemas ou dúvidas através de imagens. 
              O nosso sistema analisa e oferece soluções detalhadas.
            </p>
          </div>

          {/* Feature 3: Currículos Portugueses */}
          <div className={`p-8 rounded-3xl backdrop-blur-sm transition-all duration-300 hover:scale-105 border ${
            isDark 
              ? 'bg-white/10 border-white/20 hover:bg-white/15' 
              : 'bg-white/70 border-gray-200 hover:bg-white/90 shadow-sm hover:shadow-md'
          }`}>
            <div className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Currículo Nacional
              </h3>
            </div>
            <p className={`text-center leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Conteúdos alinhados com o programa oficial português para o 3º ciclo. 
              Tópicos específicos do 7º, 8º e 9º anos de escolaridade.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`p-8 rounded-3xl backdrop-blur-sm border mb-16 ${
          isDark 
            ? 'bg-white/5 border-white/20' 
            : 'bg-white/50 border-gray-200 shadow-sm'
        }`}>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">GPT-4</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>IA Avançada</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">3 Anos</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Currículo Completo</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Disponibilidade</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Exercícios</div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="mb-6">
            <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Pronto para melhorar as tuas notas?
            </h2>
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Junta-te aos estudantes que já descobriram uma nova forma de aprender matemática.
            </p>
          </div>
          
          <button
            onClick={handleStartLearning}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <Zap className="w-6 h-6 group-hover:animate-bounce" />
            Começar Gratuitamente
            <Sparkles className="w-6 h-6 group-hover:animate-spin" />
          </button>
        </div>
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-500/10 to-transparent animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-purple-500/10 to-transparent animate-pulse delay-1000" />
      </div>
    </div>
  );
}