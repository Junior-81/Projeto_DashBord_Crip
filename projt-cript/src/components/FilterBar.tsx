interface FilterBarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
}

export const FilterBar = ({
  sortBy,
  onSortChange,
  showFavorites,
  onToggleFavorites,
}: FilterBarProps) => {
  return (
    <div className="flex items-center gap-4">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="market_cap_desc">Market Cap (Maior)</option>
        <option value="market_cap_asc">Market Cap (Menor)</option>
        <option value="price_desc">Preço (Maior)</option>
        <option value="price_asc">Preço (Menor)</option>
        <option value="change_desc">Variação 24h (Maior)</option>
        <option value="change_asc">Variação 24h (Menor)</option>
      </select>

      <button
        onClick={onToggleFavorites}
        className={`px-4 py-2 rounded-lg transition-colors ${
          showFavorites
            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        {showFavorites ? 'Mostrar Todos' : 'Mostrar Favoritos'}
      </button>
    </div>
  );
};
