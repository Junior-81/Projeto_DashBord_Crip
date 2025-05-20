'use client';

import { useEffect, useState } from 'react';
import { CryptoCard } from '@/components/CryptoCard';
import { cryptoService } from '@/services/cryptoService';
import { useFavorites } from '@/hooks/useFavorites';
import { Header } from '@/components/Header';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="container mx-auto px-4 pt-20">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar criptomoeda..."
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
            />
          ))}
        </div>
      </div>
    </>
  );
}
