'use client';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/providers/ThemeProvider';
import Link from 'next/link';
import LogoIcon from './LogoIcon';
import { useState, useEffect } from 'react';

export const Header = () => {
  // Controlamos se o componente foi montado no navegador
  const [mounted, setMounted] = useState(false);
  
  // Obtém o tema e a função de alternar tema do contexto
  const { theme, toggleTheme } = useTheme();
  
  // Só mostramos as alterações de tema após a montagem do componente
  // para evitar diferença entre SSR e cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-blue-100/50 dark:border-blue-900/50 bg-gradient-to-r from-white/40 to-blue-50/40 dark:from-gray-900/60 dark:to-blue-950/60 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full px-4 py-3">
        <div className="flex items-center justify-between">
          {/* LOGO + TEXTO */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative overflow-hidden rounded-lg p-1 bg-gradient-to-br from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:from-blue-500/20 group-hover:to-purple-600/20 dark:group-hover:from-blue-500/30 dark:group-hover:to-purple-600/30">
              <LogoIcon className="w-8 h-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 animate-pulse-slow" />
            </div>

            <div className="flex flex-col ml-1">
              <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700 hidden sm:block transition-all duration-300 group-hover:from-blue-500 group-hover:to-purple-600">
                CryptoBoard
              </span>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700 sm:hidden">
                CB
              </span>
              <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Monitoramento em tempo real
              </span>
            </div>          </Link>          {/* BOTÃO DE TEMA */}
          <button
            onClick={toggleTheme}
            className="flex-shrink-0 relative p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:from-gray-100 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-blue-900 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 group"
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            <div className="relative w-6 h-6 overflow-hidden">
              {/* Só renderiza o ícone adequado se o componente estiver montado */}
              {mounted && (theme === 'dark' ? (
                <SunIcon className="h-6 w-6 text-amber-400 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              ) : (
                <MoonIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
              ))}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
