'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PriceChart } from '@/components/PriceChart';
import { cryptoService } from '@/services/cryptoService';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<{
    prices: [number, number][];
  } | null>(null);
  const [timeRange, setTimeRange] = useState(7); // 7 dias por padrão

  useEffect(() => {
    loadPriceData();
  }, [id, timeRange]);

  const loadPriceData = async () => {
    try {
      if (!id) return;
      const data = await cryptoService.getCoinHistory(id as string, timeRange);
      setPriceData(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados históricos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error || !priceData) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>{error || 'Erro ao carregar dados'}</p>
        <button
          onClick={loadPriceData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  const labels = priceData.prices.map(([timestamp]) =>
    new Date(timestamp).toLocaleDateString('pt-BR')
  );
  const prices = priceData.prices.map(([, price]) => price);

  return (
    <div className="py-8">
      <div className="mb-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setTimeRange(7)}
            className={`px-4 py-2 rounded ${
              timeRange === 7
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            7D
          </button>
          <button
            onClick={() => setTimeRange(30)}
            className={`px-4 py-2 rounded ${
              timeRange === 30
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            30D
          </button>
          <button
            onClick={() => setTimeRange(90)}
            className={`px-4 py-2 rounded ${
              timeRange === 90
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            90D
          </button>
        </div>
        
        <PriceChart
          data={prices}
          labels={labels}
          title={`Histórico de Preços - ${timeRange} dias`}
        />
      </div>
    </div>
  );}
