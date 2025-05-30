'use client';

import { useState } from 'react';
import { CurrencyConverter } from '@/components/CurrencyConverter';
import { Button } from './ui/button';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Calculator } from 'lucide-react';

export const PopupCurrencyConverter = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed right-6 bottom-6 rounded-full p-3 w-16 h-16 shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 hover:scale-110 border-2 border-white/20 dark:border-gray-800/50 z-40"
          aria-label="Abrir conversor de moedas"
        >
          <div className="flex flex-col items-center justify-center relative overflow-hidden">
            <Calculator className="h-6 w-6 animate-pulse-slow" />
            <span className="absolute -z-10 w-24 h-24 bg-white/20 rounded-full blur-2xl animate-pulse"></span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg border border-blue-100/50 dark:border-blue-900/50 bg-gradient-to-br from-white/95 to-blue-50/95 dark:from-gray-900/95 dark:to-blue-950/95 backdrop-blur-md shadow-xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700 pb-3 border-b border-blue-100/30 dark:border-blue-900/30">
            Conversor de Criptomoedas
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <CurrencyConverter />
        </div>
      </DialogContent>
    </Dialog>
  );
};
