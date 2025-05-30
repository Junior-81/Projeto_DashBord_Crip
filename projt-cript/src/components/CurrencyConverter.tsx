'use client';

import { useState, useEffect } from 'react';
import { cryptoService } from '@/services/cryptoService';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CryptoOption {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
}

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState('1');
  const [convertedAmount, setConvertedAmount] = useState('0');
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptoOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const fiatCurrencies = [
    { id: 'BRL', name: 'Real Brasileiro', symbol: 'BRL' },
    { id: 'USD', name: 'Dólar Americano', symbol: 'USD' },
    { id: 'EUR', name: 'Euro', symbol: 'EUR' }
  ];

  // Carregar as criptomoedas da API
  useEffect(() => {
    const loadCryptos = async () => {
      setIsLoading(true);
      try {
        // Carregar as top 20 criptomoedas
        const data = await cryptoService.getTopCoins(20, 'usd');
        setCryptocurrencies(data);
      } catch (error) {
        console.error('Erro ao carregar criptomoedas:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCryptos();
  }, []);  // Carregar taxas de câmbio fiat
  useEffect(() => {
    const loadExchangeRates = async () => {
      try {
        await cryptoService.getExchangeRates();
      } catch (error) {
        console.error('Erro ao carregar taxas de câmbio:', error);
      }
    };
    
    loadExchangeRates();
  }, []);
  
  // Calcular a conversão sempre que os parâmetros mudarem
  useEffect(() => {
    const calculateConversion = async () => {
      if (!fromCurrency || !toCurrency || !amount || isNaN(Number(amount))) {
        setConvertedAmount('0');
        return;
      }

      try {
        let rate = 0;
        
        // Caso 1: Mesma moeda
        if (fromCurrency === toCurrency) {
          rate = 1;
        } else {
          // Primeiro, normalizamos tudo para USD depois convertemos para a moeda alvo
          
          // 1. Determinar o valor em USD da moeda de origem
          let fromValueInUsd = 0;
          
          // Se for uma moeda fiduciária
          if (fromCurrency === 'USD') {
            fromValueInUsd = 1;
          } else if (fromCurrency === 'BRL' || fromCurrency === 'EUR') {
            // Buscar taxa de câmbio
            const exchangeRates = await cryptoService.getExchangeRates();
            fromValueInUsd = 1 / exchangeRates.rates[fromCurrency.toLowerCase()];
          } else {
            // É uma criptomoeda
            const fromCryptoObj = cryptocurrencies.find(c => c.symbol.toUpperCase() === fromCurrency);
            if (fromCryptoObj) {
              fromValueInUsd = fromCryptoObj.current_price; // já está em USD
            }
          }
          
          // 2. Converter USD para a moeda de destino
          if (toCurrency === 'USD') {
            rate = fromValueInUsd;
          } else if (toCurrency === 'BRL' || toCurrency === 'EUR') {
            // Buscar taxa de câmbio
            const exchangeRates = await cryptoService.getExchangeRates();
            rate = fromValueInUsd * exchangeRates.rates[toCurrency.toLowerCase()];
          } else {
            // É uma criptomoeda
            const toCryptoObj = cryptocurrencies.find(c => c.symbol.toUpperCase() === toCurrency);
            if (toCryptoObj) {
              // Converter de USD para a criptomoeda
              rate = fromValueInUsd / toCryptoObj.current_price;
            }
          }
        }

        setExchangeRate(rate);
        const converted = (parseFloat(amount) * rate).toFixed(8);
        setConvertedAmount(converted);
      } catch (error) {
        console.error('Erro na conversão:', error);
        setConvertedAmount('Erro');
      }
    };

    calculateConversion();
  }, [fromCurrency, toCurrency, amount, cryptocurrencies]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Aceitar apenas números e pontos
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value);
    }
  };

  const formatCurrencySymbol = (currency: string) => {
    switch(currency) {
      case 'BRL': return 'R$';
      case 'USD': return '$';
      case 'EUR': return '€';
      default: return '';
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  return (
    <Card className="w-full max-w-lg mx-auto bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-850 shadow-lg border border-blue-100 dark:border-blue-900 transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
          Conversor de Moedas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* De (From) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-700 w-1 h-4 inline-block mr-2"></span>
              De
            </label>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="flex-1 shadow-sm border-blue-100 dark:border-blue-900 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-[140px] bg-white dark:bg-gray-800 border-blue-100 dark:border-blue-900">
                  <SelectValue placeholder="Selecionar moeda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Dinheiro</SelectLabel>
                    {fiatCurrencies.map((currency) => (
                      <SelectItem key={currency.id} value={currency.symbol}>
                        {formatCurrencySymbol(currency.symbol)} {currency.symbol}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Criptomoedas</SelectLabel>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>Carregando...</SelectItem>
                    ) : (
                      cryptocurrencies.map((crypto) => (
                        <SelectItem key={crypto.id} value={crypto.symbol.toUpperCase()}>
                          {crypto.symbol.toUpperCase()}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Botão para trocar moedas */}
          <div className="flex justify-center my-2">
            <button
              onClick={swapCurrencies}
              className="p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/40 hover:to-purple-500/40 dark:from-blue-500/40 dark:to-purple-500/40 dark:hover:from-blue-500/60 dark:hover:to-purple-500/60 transition-all duration-300 hover:scale-110"
            >
              <ArrowDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </button>
          </div>          {/* Para (To) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-700 w-1 h-4 inline-block mr-2"></span>
              Para
            </label>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={convertedAmount}
                readOnly
                className="flex-1 bg-blue-50/50 dark:bg-blue-900/20 font-medium shadow-inner border-blue-100 dark:border-blue-900"
              />
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-[140px] bg-white dark:bg-gray-800 border-blue-100 dark:border-blue-900">
                  <SelectValue placeholder="Selecionar moeda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Dinheiro</SelectLabel>
                    {fiatCurrencies.map((currency) => (
                      <SelectItem key={currency.id} value={currency.symbol}>
                        {formatCurrencySymbol(currency.symbol)} {currency.symbol}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Criptomoedas</SelectLabel>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>Carregando...</SelectItem>
                    ) : (
                      cryptocurrencies.map((crypto) => (
                        <SelectItem key={crypto.id} value={crypto.symbol.toUpperCase()}>
                          {crypto.symbol.toUpperCase()}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Taxa de câmbio */}
          {exchangeRate && (
            <div className="mt-6 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-center">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Taxa de câmbio:</span>
              <div className="mt-1 text-sm text-blue-800 dark:text-blue-300 font-medium">
                1 {fromCurrency} = {exchangeRate.toFixed(8)} {toCurrency}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
