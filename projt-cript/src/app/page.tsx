'use client';

import { useEffect, useState } from 'react';
import { CryptoCard } from '@/components/CryptoCard';
import { cryptoService } from '@/services/cryptoService';
import { useFavorites } from '@/hooks/useFavorites';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';

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
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    loadCoins();
  }, []);

  const loadCoins = async () => {
    try {
      const data = await cryptoService.getTopCoins(50);
      setCoins(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados das criptomoedas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sortCoins = (coinsToSort: Coin[]) => {
    return [...coinsToSort].sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });
  };

  const filteredCoins = coins
    .filter(
      (coin) =>
        (coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!showFavorites || favorites.includes(coin.id))
    );

  const sortedCoins = sortCoins(filteredCoins);

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
    <>
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:gap-4">
          <input
            type="text"
            placeholder="Buscar criptomoeda..."
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 md:mb-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterBar
            sortBy={sortBy}
            onSortChange={setSortBy}
            showFavorites={showFavorites}
            onToggleFavorites={() => setShowFavorites(!showFavorites)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedCoins.map((coin) => (
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
              marketCap={coin.market_cap}
            />
          ))}
        </div>
      </div>
    </>
  );
}
