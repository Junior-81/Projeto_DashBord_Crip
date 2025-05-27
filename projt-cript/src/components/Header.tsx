import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/providers/ThemeProvider';
import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from './LogoIcon';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (    <header className="fixed top-0 w-full bg-gradient-to-r from-white/90 to-blue-50/90 dark:from-gray-900/95 dark:to-blue-950/95 backdrop-blur-md shadow-lg z-50 border-b border-blue-100 dark:border-blue-900 transition-all duration-300">
      <div className="max-w-7xl  px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo e nome - Com animação e efeitos */}
          <Link href="/" className="flex items-center space-x-3 group relative">
            <div className="relative overflow-hidden rounded-lg p-1 bg-gradient-to-br from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:from-blue-500/20 group-hover:to-purple-600/20 dark:group-hover:from-blue-500/30 dark:group-hover:to-purple-600/30">
              {/* Usando o componente LogoIcon como fallback - agora com efeito de pulsação suave */}
              <LogoIcon className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 animate-pulse-slow" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700 hidden sm:block transition-all duration-300 group-hover:from-blue-500 group-hover:to-purple-600">
                CryptoBoard
              </span>
              {/* Versão mobile - apenas "CB" com estilo melhorado */}
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700 sm:hidden">
                CB
              </span>
              <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 -mt-1 ml-1">
                Monitoramento em tempo real
              </span>
            </div>
          </Link>

          {/* Botão de tema com efeitos aprimorados */}
          <button
            onClick={toggleTheme}
            className="relative p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:from-gray-100 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-blue-900 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 group"
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            <div className="relative w-6 h-6 overflow-hidden">
              {theme === 'dark' ? (
                <>
                  <SunIcon className="h-6 w-6 text-amber-400 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span className="absolute -bottom-6 left-0 right-0 text-[10px] text-center text-amber-400 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5 transition-all duration-300">

                  </span>
                </>
              ) : (
                <>
                  <MoonIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
                  <span className="absolute -bottom-6 left-0 right-0 text-[10px] text-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5 transition-all duration-300">
                  
                  </span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};