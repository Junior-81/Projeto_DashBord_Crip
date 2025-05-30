import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume?: number;
  high_24h?: number;
  low_24h?: number;
}

class CryptoService {
  private cache: { [key: string]: { data: any; timestamp: number } } = {};
  private CACHE_DURATION = 2 * 60 * 1000; // 2 minutos

  private isDataValid(key: string): boolean {
    const cachedData = this.cache[key];
    if (!cachedData) return false;
    return Date.now() - cachedData.timestamp < this.CACHE_DURATION;
  }
  
  // Obter taxas de câmbio entre diferentes moedas fiduciárias
  async getExchangeRates(): Promise<{ rates: Record<string, number> }> {
    const cacheKey = 'exchangeRates';
    
    if (this.isDataValid(cacheKey)) {
      return this.cache[cacheKey].data;
    }

    try {
      // Usamos a API de taxa de câmbio do Bitcoin como referência
      // pois fornece conversão para várias moedas fiduciárias
      const { data } = await axios.get(`${COINGECKO_API}/simple/price`, {
        params: {
          ids: 'bitcoin',
          vs_currencies: 'usd,eur,brl',
          include_last_updated_at: true
        }
      });
      
      // Estruturamos os dados de forma que possamos convertê-los facilmente
      const rates = {
        usd: 1,
        eur: data.bitcoin.usd / data.bitcoin.eur,
        brl: data.bitcoin.usd / data.bitcoin.brl
      };

      const result = { rates };
      
      this.cache[cacheKey] = {
        data: result,
        timestamp: Date.now(),
      };

      return result;
    } catch (error) {
      console.error('Erro ao obter taxas de câmbio:', error);
      // Fornecer um fallback em caso de erro
      return {
        rates: {
          usd: 1,
          eur: 0.93,  // Valor aproximado EUR/USD
          brl: 0.2    // Valor aproximado BRL/USD
        }
      };
    }
  }

  async getTopCoins(limit: number = 50, currency: string = 'brl'): Promise<CoinData[]> {
    const cacheKey = `topCoins-${limit}-${currency}`;
    
    if (this.isDataValid(cacheKey)) {
      return this.cache[cacheKey].data;
    }

    try {
      const { data } = await axios.get(`${COINGECKO_API}/coins/markets`, {
        params: {
          vs_currency: currency.toLowerCase(),
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: false
        }
      });

      this.cache[cacheKey] = {
        data,
        timestamp: Date.now(),
      };

      return data;
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      throw new Error('Falha ao carregar dados das criptomoedas');
    }
  }

  async getCoinHistory(id: string, days: number, currency: string = 'brl') {
    const cacheKey = `history-${id}-${days}-${currency}`;
    
    if (this.isDataValid(cacheKey)) {
      return this.cache[cacheKey].data;
    }

    try {
      const { data } = await axios.get(`${COINGECKO_API}/coins/${id}/market_chart`, {
        params: {
          vs_currency: currency.toLowerCase(),
          days: days
        }
      });

      this.cache[cacheKey] = {
        data,
        timestamp: Date.now(),
      };

      return data;
    } catch (error) {
      console.error('Erro ao buscar dados históricos:', error);
      throw new Error('Falha ao carregar dados históricos');
    }
  }

  async getCoinDetails(id: string, currency: string = 'brl'): Promise<CoinData> {
    const cacheKey = `details-${id}-${currency}`;
    
    if (this.isDataValid(cacheKey)) {
      return this.cache[cacheKey].data;
    }

    try {
      const { data } = await axios.get(`${COINGECKO_API}/coins/${id}`, {
        params: {
          localization: false,
          tickers: true,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false
        }
      });

      const formattedData: CoinData = {
        id: data.id,
        symbol: data.symbol,
        name: data.name,
        image: data.image.large,
        current_price: data.market_data.current_price[currency.toLowerCase()],
        price_change_percentage_24h: data.market_data.price_change_percentage_24h,
        market_cap: data.market_data.market_cap[currency.toLowerCase()],
        total_volume: data.market_data.total_volume[currency.toLowerCase()],
        high_24h: data.market_data.high_24h[currency.toLowerCase()],
        low_24h: data.market_data.low_24h[currency.toLowerCase()]
      };

      this.cache[cacheKey] = {
        data: formattedData,
        timestamp: Date.now(),
      };

      return formattedData;
    } catch (error) {
      console.error('Erro ao buscar detalhes da moeda:', error);
      throw new Error('Falha ao carregar detalhes da moeda');
    }
  }
}

export const cryptoService = new CryptoService();
