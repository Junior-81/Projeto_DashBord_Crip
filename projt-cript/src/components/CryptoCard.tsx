import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface CryptoCardProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  image: string;
  isFavorite: boolean;
  onFavoriteClick: () => void;
  marketCap: number;
}

export const CryptoCard = ({
  id,
  name,
  symbol,
  price,
  priceChange24h,
  image,
  isFavorite,
  onFavoriteClick,
}: CryptoCardProps) => {
  const priceChangeColor = priceChange24h >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img src={image} alt={name} className="w-8 h-8" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">{symbol}</span>
          </div>
        </div>
        <button
          onClick={onFavoriteClick}
          className="p-1 text-gray-400 hover:text-yellow-500"
        >
          {isFavorite ? (
            <StarSolid className="h-5 w-5 text-yellow-500" />
          ) : (
            <StarOutline className="h-5 w-5" />
          )}
        </button>
      </div>

      <Link href={`/coin/${id}`}>
        <div className="mt-3 flex justify-between items-end">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`text-sm font-medium ${priceChangeColor}`}>
            {priceChange24h > 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
          </p>
        </div>
      </Link>
    </div>
  );
};
