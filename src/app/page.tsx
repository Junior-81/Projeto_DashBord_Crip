'use client';

import { useEffect, useState } from 'react';
import { CryptoCard } from '@/components/CryptoCard';
import { cryptoService } from '@/services/cryptoService';
import { useFavorites } from '@/hooks/useFavorites';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { PopupCurrencyConverter } from '@/components/PopupCurrencyConverter';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [showFavorites, setShowFavorites] = useState(false);
  const [currency, setCurrency] = useState('BRL');
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    loadCoins();
  }, [currency]); // Recarrega quando a moeda mudar

  const loadCoins = async () => {
    try {
      const data = await cryptoService.getTopCoins(50, currency);
      setCoins(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados das criptomoedas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCoins = coins
    .filter((coin) => {
      const matchesSearch =
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      return showFavorites ? favorites.includes(coin.id) && matchesSearch : matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>{error}</p>
        <button
          onClick={loadCoins}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-3 sm:px-4 py-4">
      <Header />
      <div className="mt-16"> {/* Espaço ajustado para o cabeçalho fixo */}
        {/* Banner informativo principal */}
        <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/20 dark:to-purple-900/20 shadow-md border border-blue-100/30 dark:border-blue-900/30 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
            Bem-vindo ao CryptoBoard
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 text-sm mb-2 max-w-2xl mx-auto">
            Monitore suas criptomoedas favoritas e use nosso conversor para calcular valores entre diferentes moedas.
            <span className="text-xs italic block mt-1">Clique no botão flutuante no canto inferior direito para acessar o conversor.</span>
          </p>
          
          {/* Cards informativos em linha horizontal */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <div className="flex items-center text-blue-700 dark:text-blue-400 bg-white/70 dark:bg-blue-950/30 px-3 py-1.5 rounded-full border border-blue-100/50 dark:border-blue-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-xs font-semibold">Monitoramento em Tempo Real</span>
            </div>
            <div className="flex items-center text-blue-700 dark:text-blue-400 bg-white/70 dark:bg-blue-950/30 px-3 py-1.5 rounded-full border border-blue-100/50 dark:border-blue-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-xs font-semibold">Favoritos</span>
            </div>
            <div className="flex items-center text-blue-700 dark:text-blue-400 bg-white/70 dark:bg-blue-950/30 px-3 py-1.5 rounded-full border border-blue-100/50 dark:border-blue-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold">Conversor de Moedas</span>
            </div>
          </div>
          
          {/* Estatísticas do mercado em linha horizontal */}
          <div className="mt-4 py-2 px-2 flex justify-center items-center">
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Cap. Total</div>
                <div className="text-xs font-semibold text-blue-800 dark:text-blue-300">R$ 9.7T</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Volume 24h</div>
                <div className="text-xs font-semibold text-blue-800 dark:text-blue-300">R$ 526.2B</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Dom. BTC</div>
                <div className="text-xs font-semibold text-blue-800 dark:text-blue-300">52.3%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">Moedas</div>
                <div className="text-xs font-semibold text-blue-800 dark:text-blue-300">25,388</div>
              </div>
            </div>
          </div>
          
          {/* Grid de uma única linha com notícias */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/30 dark:to-purple-900/30 shadow-sm border border-blue-100/50 dark:border-blue-900/30">
              <h3 className="text-xs font-semibold mb-1 text-blue-700 dark:text-blue-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Últimas Notícias
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Atualização {new Date().toLocaleDateString('pt-BR')}: O mercado de criptomoedas mostra sinais de recuperação após a recente regulamentação na União Europeia.
              </p>
            </div>
          </div>
        </div>
        
        {/* Lista de Criptomoedas */}
        <div className="flex items-center mt-6 mb-5">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-3"></div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400">
            Criptomoedas em Destaque
          </h2>
          <div className="flex-grow h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-800 ml-4"></div>
        </div>
        
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showFavorites={showFavorites}
          onToggleFavorites={() => setShowFavorites(!showFavorites)}
          currency={currency}
          onCurrencyChange={setCurrency}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCoins.map((coin) => (
            <CryptoCard
              key={coin.id}
              id={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              price={coin.current_price}
              priceChange24h={coin.price_change_percentage_24h}
              image={coin.image}
              isFavorite={favorites.includes(coin.id)}
              onFavoriteClick={() => toggleFavorite(coin.id)}
              currency={currency}
            />
          ))}
        </div>
      </div>
      
      {/* Botão flutuante para abrir o conversor de moedas */}
      <PopupCurrencyConverter />
    </main>
  );
}
