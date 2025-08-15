'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { Send, LogOut, User, Bot, Loader2, Image as ImageIcon, Sun, Moon, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

// Dark Mode Hook
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const stored = localStorage.getItem('mathlab-dark-mode');
    if (stored) {
      setIsDarkMode(JSON.parse(stored));
      document.documentElement.classList.toggle('dark', JSON.parse(stored));
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('mathlab-dark-mode', JSON.stringify(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };
  
  return { isDarkMode, toggleDarkMode };
}

// Image Upload Component
function ImageUpload({ onImageSelect, selectedImage, onImageRemove }) {
  const fileInputRef = useRef(null);
  
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Imagem deve ter menos de 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect({
          file: file,
          preview: e.target.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      
      {selectedImage ? (
        <div className="relative inline-block mr-2">
          <img 
            src={selectedImage.preview} 
            alt="Upload preview" 
            className="w-16 h-16 object-cover rounded-lg border-2 border-blue-300"
          />
          <button
            onClick={onImageRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          title="Upload imagem"
        >
          <Upload size={18} className="text-gray-600 dark:text-gray-300" />
        </button>
      )}
    </div>
  );
}

// Math Lab Logo Component
function MathLabLogo({ className = "h-8 w-auto" }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
            <path d="M4 6h16v2h-6l-4 4 4 4h6v2H4v-2h6l-4-4 4-4H4V6z"/>
            <circle cx="20" cy="8" r="1"/>
            <circle cx="20" cy="16" r="1"/>
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Math Lab
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
          IA Tutor
        </span>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [grade, setGrade] = useState('7º ano'); // Default com string
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check authentication and load data
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      console.log('Login realizado:', session.user);
      setUser(session.user);
      
      // Get user grade from metadata or use default - GARANTIR QUE É STRING
      const userGrade = session.user?.user_metadata?.grade || '7º ano';
      setGrade(String(userGrade)); // Garantir que é sempre string

      loadConversationHistory(session.user.id);
    };
    
    checkAuth();
  }, [router]);

  // Load conversation history
  const loadConversationHistory = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) {
        console.error('Error loading conversations:', error);
        return;
      }

      const formattedMessages = data.map(conv => [
        { text: conv.user_message, sender: 'user', timestamp: new Date(conv.created_at) },
        { text: conv.ai_response, sender: 'ai', timestamp: new Date(conv.created_at) }
      ]).flat();

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading conversation history:', error);
    }
  };

  // Get webhook URL based on grade - VERSÃO DEFINITIVA CORRIGIDA
  const getWebhookUrl = (userGrade) => {
    // Garantir que userGrade é string e normalizar
    const gradeStr = String(userGrade || '7º ano');
    const normalizedGrade = gradeStr
      .replace(/º.*/, '') // Remove "º ano" ou "º"
      .replace(/ano/i, '') // Remove "ano" (case insensitive)
      .trim(); // Remove espaços
    
    // VERIFICAR TODAS AS POSSIBILIDADES DE ENV VARS
    // 1. Tentar com os nomes exatos que viste no Vercel
    const exactVarNames = {
      '7': process.env.NEXT_PUBLIC_N8N_7TH_GRADE_WEBHOOK,
      '8': process.env.NEXT_PUBLIC_N8N_8TH_GRADE_WEBHOOK,
      '9': process.env.NEXT_PUBLIC_N8N_9TH_GRADE_WEBHOOK
    };

    // 2. Fallback para outras possibilidades
    const fallbackVarNames = {
      '7': [
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_7_ANO,
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_7ANO,
        process.env.NEXT_PUBLIC_WEBHOOK_7TH_GRADE,
        process.env.N8N_7TH_GRADE_WEBHOOK
      ],
      '8': [
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_8_ANO,
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_8ANO,
        process.env.NEXT_PUBLIC_WEBHOOK_8TH_GRADE,
        process.env.N8N_8TH_GRADE_WEBHOOK
      ],
      '9': [
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_9_ANO,
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_9ANO,
        process.env.NEXT_PUBLIC_WEBHOOK_9TH_GRADE,
        process.env.N8N_9TH_GRADE_WEBHOOK
      ]
    };
    
    // Debug SUPER detalhado - MOSTRA TUDO
    console.log(`🔍 Grade original: "${userGrade}" → Grade normalizado: "${normalizedGrade}"`);
    
    // Log de TODAS as variáveis de ambiente que começam com NEXT_PUBLIC_
    const allNextPublicVars = Object.keys(process.env || {})
      .filter(key => key.startsWith('NEXT_PUBLIC_'))
      .reduce((acc, key) => {
        acc[key] = process.env[key] ? 'CONFIGURADA ✅' : 'VAZIA ❌';
        return acc;
      }, {});
    
    console.log('🌐 TODAS as variáveis NEXT_PUBLIC_:', allNextPublicVars);
    
    // Tentar encontrar a URL
    let selectedUrl = exactVarNames[normalizedGrade];
    let foundMethod = `exact-${normalizedGrade}`;
    
    // Se não encontrou com o nome exato, tentar fallbacks
    if (!selectedUrl && fallbackVarNames[normalizedGrade]) {
      for (let i = 0; i < fallbackVarNames[normalizedGrade].length; i++) {
        const fallbackUrl = fallbackVarNames[normalizedGrade][i];
        if (fallbackUrl) {
          selectedUrl = fallbackUrl;
          foundMethod = `fallback-${normalizedGrade}-${i}`;
          break;
        }
      }
    }
    
    // Se ainda não encontrou, tentar grade 7 como último recurso
    if (!selectedUrl && normalizedGrade !== '7') {
      selectedUrl = exactVarNames['7'];
      if (selectedUrl) {
        foundMethod = 'fallback-to-grade-7';
        console.log(`⚠️ Usando webhook do 7º ano como fallback para grade ${normalizedGrade}`);
      }
    }
    
    // Debug final
    console.log(`🔗 URL encontrada:`, selectedUrl ? 'ENCONTRADA ✅' : 'NÃO ENCONTRADA ❌');
    console.log(`📝 Método usado: ${foundMethod}`);
    
    if (selectedUrl) {
      console.log(`✅ Webhook URL para grade ${normalizedGrade}:`);
      console.log(`🔗 ${selectedUrl.substring(0, 70)}...`);
    } else {
      console.error('❌ NENHUMA URL encontrada após tentar todos os métodos!');
      console.error('🔧 URLs testadas para grade', normalizedGrade + ':');
      console.error('   - NEXT_PUBLIC_N8N_7TH_GRADE_WEBHOOK:', exactVarNames['7'] ? 'EXISTS' : 'MISSING');
      console.error('   - NEXT_PUBLIC_N8N_8TH_GRADE_WEBHOOK:', exactVarNames['8'] ? 'EXISTS' : 'MISSING'); 
      console.error('   - NEXT_PUBLIC_N8N_9TH_GRADE_WEBHOOK:', exactVarNames['9'] ? 'EXISTS' : 'MISSING');
    }
    
    return selectedUrl;
  };

  // Send message to AI - VERSÃO FINAL
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const newUserMessage = { 
      text: userMessage, 
      sender: 'user', 
      timestamp: new Date(),
      image: selectedImage
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setSelectedImage(null);
    setLoading(true);

   try {
  // Debug ultra-detalhado para diagnosticar problema
  const gradeNumber = String(grade).replace(/º.*/, '').replace(/ano/i, '').trim();
  console.log(`🔍 Grade original: "${grade}" → Grade normalizado: "${gradeNumber}"`);
  
  // NOVO: Verificar se estamos em ambiente de produção
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`🔧 Modo Vercel: ${process.env.VERCEL ? "SIM" : "NÃO"}`);
  
  // Listar TODAS as variáveis disponíveis (não apenas NEXT_PUBLIC_)
  console.log('📋 Process.env keys total:', Object.keys(process.env).length);
  
  // Mostrar especificamente as variáveis que precisamos
  const criticalVars = [
    'NEXT_PUBLIC_N8N_7TH_GRADE_WEBHOOK',
    'NEXT_PUBLIC_N8N_8TH_GRADE_WEBHOOK', 
    'NEXT_PUBLIC_N8N_9TH_GRADE_WEBHOOK'
  ];
  
  console.log('🎯 VARIÁVEIS CRÍTICAS:');
  criticalVars.forEach(key => {
    const value = process.env[key];
    console.log(`  ${key}: ${value ? `"${value.substring(0,50)}..."` : "UNDEFINED ❌"}`);
  });

  // Tentar múltiplas nomenclaturas e métodos
  let webhookUrl = null;
  let methodUsed = null;

  // Método 1: Acesso direto com logs detalhados
  console.log(`🔍 Tentando acessar: NEXT_PUBLIC_N8N_${gradeNumber}TH_GRADE_WEBHOOK`);
  webhookUrl = process.env[`NEXT_PUBLIC_N8N_${gradeNumber}TH_GRADE_WEBHOOK`];
  if (webhookUrl) {
    methodUsed = `direct-${gradeNumber}`;
    console.log(`✅ Método direto funcionou!`);
  }

  // Método 2: Mapeamento estático (NOVO - mais confiável)
  if (!webhookUrl) {
    console.log(`🗺️ Tentando mapeamento estático...`);
    const webhookMap = {
      '7': process.env.NEXT_PUBLIC_N8N_7TH_GRADE_WEBHOOK,
      '8': process.env.NEXT_PUBLIC_N8N_8TH_GRADE_WEBHOOK, 
      '9': process.env.NEXT_PUBLIC_N8N_9TH_GRADE_WEBHOOK
    };
    
    // Log cada tentativa
    console.log(`📍 Valor para grade ${gradeNumber}:`, webhookMap[gradeNumber] || "UNDEFINED");
    
    webhookUrl = webhookMap[gradeNumber];
    if (webhookUrl) {
      methodUsed = `static-map-${gradeNumber}`;
      console.log(`✅ Mapeamento estático funcionou!`);
    }
  }

  // Método 3: Fallback hardcore - valores hardcoded temporários
  if (!webhookUrl) {
    console.log(`🆘 Tentando fallback hardcore...`);
    // TEMPORÁRIO: Se não conseguir ler as env vars, usar diretamente
    // (Isto vai nos ajudar a identificar se é problema de env vars)
    console.log(`⚠️ ATENÇÃO: Usando fallback temporário para debug!`);
    webhookUrl = "https://mathlab.app.n8n.cloud/webhook/debug-test";
    methodUsed = `hardcore-fallback`;
  }

  console.log(`🔗 URL encontrada: ${webhookUrl ? "ENCONTRADA ✅" : "NÃO ENCONTRADA ❌"}`);
  if (methodUsed) {
    console.log(`📝 Método usado: ${methodUsed}`);
  }

  if (!webhookUrl) {
    // ÚLTIMO RECURSO: Log completo do process.env
    console.log('🚨 ÚLTIMO RECURSO - Dump completo:');
    console.log('All env keys:', Object.keys(process.env).join(', '));
    
    throw new Error(`URL do webhook não configurada para o ano letivo: ${gradeNumber}`);
  }

      let messageToSend = userMessage;
      
      // If there's an image, include it in the message
      if (selectedImage) {
        messageToSend = `[Imagem anexada: ${selectedImage.name}] ${userMessage}`;
      }

      console.log('🚀 Enviando mensagem para N8N...');

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          grade: grade,
          userId: user.id,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na API: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const aiResponse = data.response || data.message || data.text || 'Desculpa, não consegui processar a tua pergunta.';

      const newAiMessage = { 
        text: aiResponse, 
        sender: 'ai', 
        timestamp: new Date() 
      };

      setMessages(prev => [...prev, newAiMessage]);

      // Save conversation to database
      try {
        await supabase
          .from('conversations')
          .insert({
            user_id: user.id,
            user_message: userMessage,
            ai_response: aiResponse,
            grade: grade
          });
        console.log('✅ Conversa guardada com sucesso');
      } catch (dbError) {
        console.error('Erro ao salvar conversa:', dbError);
      }

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error(`${error.message}`);
      
      const errorMessage = { 
        text: `Desculpa, ocorreu um erro: ${error.message}`, 
        sender: 'ai', 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('pt-PT', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-gray-600 dark:text-gray-300">A carregar...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <MathLabLogo />
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700">
              <User size={16} className="inline mr-1" />
              {grade}
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
            >
              {isDarkMode ? (
                <Sun size={18} className="text-yellow-500" />
              ) : (
                <Moon size={18} className="text-gray-600" />
              )}
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut size={16} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-[calc(100vh-200px)] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <Bot size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Olá! Sou o teu tutor de matemática</p>
                <p className="text-sm">Faz uma pergunta sobre matemática do {grade} para começarmos!</p>
                <div className="mt-4 text-xs text-gray-400">
                  Podes enviar texto ou fazer upload de uma imagem com exercícios
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}>
                    {message.image && (
                      <img 
                        src={message.image.preview} 
                        alt="Imagem enviada" 
                        className="w-full rounded-lg mb-2 max-w-48 shadow-sm"
                      />
                    )}
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-1 opacity-75 ${
                      message.sender === 'user' 
                        ? 'text-blue-100' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2 flex items-center space-x-2">
                  <Loader2 className="animate-spin" size={16} />
                  <span className="text-sm text-gray-600 dark:text-gray-300">A pensar...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <form onSubmit={sendMessage} className="flex items-end space-x-3">
              <ImageUpload
                onImageSelect={setSelectedImage}
                selectedImage={selectedImage}
                onImageRemove={() => setSelectedImage(null)}
              />
              
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreve a tua pergunta de matemática..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                  rows="2"
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>
              
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:dark:from-gray-600 disabled:dark:to-gray-700 text-white p-3 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:scale-105 disabled:transform-none"
              >
                <Send size={20} />
              </button>
            </form>
            
            {/* Status indicator */}
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Enter para enviar, Shift+Enter para nova linha</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>IA Online</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}