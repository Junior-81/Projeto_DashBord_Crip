'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { PriceChart } from '@/components/PriceChart';
import { cryptoService } from '@/services/cryptoService';
import { CurrencySelect } from '@/components/CurrencySelect';
import { Header } from '@/components/Header';

interface CoinDetails {
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
}

export default function CoinDetailsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [currency, setCurrency] = useState(searchParams.get('currency') || 'BRL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coinData, setCoinData] = useState<CoinDetails | null>(null);
  const [priceData, setPriceData] = useState<{
    prices: [number, number][];
  } | null>(null);
  const [timeRange, setTimeRange] = useState(7);

  useEffect(() => {
    loadData();
  }, [id, currency, timeRange]);

  const loadData = async () => {
    try {
      if (!id) return;
      setLoading(true);
      
      const [historyData, details] = await Promise.all([
        cryptoService.getCoinHistory(id as string, timeRange, currency),
        cryptoService.getCoinDetails(id as string, currency)
      ]);
      
      setPriceData(historyData);
      setCoinData(details);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

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
          onClick={loadData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            {coinData && (
              <>
                <h1 className="text-2xl font-bold">{coinData.name}</h1>
                <span className="text-gray-500">({coinData.symbol.toUpperCase()})</span>
              </>
            )}
          </div>
          <CurrencySelect
            currency={currency}
            onCurrencyChange={(value) => {
              setCurrency(value);
              // Atualiza a URL com a nova moeda sem recarregar a página
              const url = new URL(window.location.href);
              url.searchParams.set('currency', value);
              window.history.pushState({}, '', url);
            }}
          />
        </div>

        {coinData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Preço Atual</h2>
              <p className="text-3xl font-bold">{formatPrice(coinData.current_price)}</p>
              <p className={`text-sm ${coinData.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coinData.price_change_percentage_24h > 0 ? '+' : ''}
                {coinData.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Informações de Mercado</h2>
              <div className="space-y-2">
                <p>Market Cap: {formatPrice(coinData.market_cap)}</p>
                <p>Volume 24h: {formatPrice(coinData.total_volume)}</p>
                <p>Máxima 24h: {formatPrice(coinData.high_24h)}</p>
                <p>Mínima 24h: {formatPrice(coinData.low_24h)}</p>
              </div>
            </div>
          </div>
        )}

        {priceData && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Histórico de Preços</h2>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(Number(e.target.value))}
                className="p-2 border rounded dark:bg-gray-700"
              >
                <option value={1}>24 horas</option>
                <option value={7}>7 dias</option>
                <option value={30}>30 dias</option>
                <option value={90}>90 dias</option>
              </select>
            </div>
            <PriceChart data={priceData.prices} currency={currency} />
          </div>
        )}
      </div>
    </div>
  );
}
