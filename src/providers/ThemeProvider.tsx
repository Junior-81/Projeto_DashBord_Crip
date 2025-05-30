'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Definimos o contexto inicial como undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Esta função será segura tanto no servidor quanto no cliente
  const getSystemTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Inicialização segura do tema
  useEffect(() => {
    // Marca o componente como montado no cliente
    setMounted(true);
    
    try {
      // Tentativa segura de acessar localStorage apenas no cliente
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as Theme | null;

        if (savedTheme) {
          setTheme(savedTheme);
          applyTheme(savedTheme);
        } else {
          const systemTheme = getSystemTheme();
          setTheme(systemTheme);
          applyTheme(systemTheme);
        }
      }
    } catch (error) {
      console.error('Erro ao acessar localStorage:', error);
      // Fallback para tema do sistema ou claro
      const fallbackTheme = getSystemTheme();
      setTheme(fallbackTheme);
      applyTheme(fallbackTheme);
    }
  }, []);
  const applyTheme = (theme: Theme) => {
    // Apenas aplica o tema se estiver no cliente
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Salva no localStorage apenas se estiver disponível
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
    
    // Aplica o tema
    applyTheme(newTheme);
  };  // Enviamos os valores para o provedor de contexto
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usar o tema - PRECISA estar separado do arquivo
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    // Fallback seguro se o contexto não existir
    return {
      theme: 'light',
      toggleTheme: () => console.warn('ThemeProvider não está inicializado')
    };
  }
  
  return context;
}
