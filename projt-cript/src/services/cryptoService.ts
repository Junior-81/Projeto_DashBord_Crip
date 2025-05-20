import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

class CryptoService {
  private cache: { [key: string]: { data: any; timestamp: number } } = {};
  private CACHE_DURATION = 2 * 60 * 1000; // 2 minutos

  private isDataValid(key: string): boolean {
    const cachedData = this.cache[key];
    if (!cachedData) return false;
    return Date.now() - cachedData.timestamp < this.CACHE_DURATION;
  }

  async getTopCoins(limit: number = 100): Promise<CoinData[]> {
    const cacheKey = `top-coins-${limit}`;
    
    if (this.isDataValid(cacheKey)) {
      return this.cache[cacheKey].data;
    }

    try {
      const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          sparkline: false,
          locale: 'en',
        },
      });

      this.cache[cacheKey] = {
        data: response.data,
        timestamp: Date.now(),
      };

      return response.data;
    } catch (error) {
      console.error('Error fetching top coins:', error);
      throw error;
    }
  }

  async getCoinHistory(coinId: string, days: number = 7): Promise<{
    prices: [number, number][];
  }> {
    const cacheKey = `coin-history-${coinId}-${days}`;

    if (this.isDataValid(cacheKey)) {
      return this.cache[cacheKey].data;
    }

    try {
      const response = await axios.get(
        `${COINGECKO_API}/coins/${coinId}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: days,
          },
        }
      );

      this.cache[cacheKey] = {
        data: response.data,
        timestamp: Date.now(),
      };

      return response.data;
    } catch (error) {
      console.error('Error fetching coin history:', error);
      throw error;
    }
  }
}

export const cryptoService = new CryptoService();
