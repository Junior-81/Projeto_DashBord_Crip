export interface CryptoCardProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  image: string;
  isFavorite: boolean;
  onFavoriteClick: () => void;
  currency: string;
}

export interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
  currency: string;
  onCurrencyChange: (value: string) => void;
}

export interface CurrencySelectProps {
  currency: string;
  onCurrencyChange: (value: string) => void;
}
