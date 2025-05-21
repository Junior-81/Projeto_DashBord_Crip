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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow relative group flex flex-col gap-4 items-center">
      <button
        onClick={(e) => {
          e.preventDefault();
          onFavoriteClick();
        }}
        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-yellow-500 transition-colors"
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {isFavorite ? (
          <StarSolid className="h-6 w-6 text-yellow-500" />
        ) : (
          <StarOutline className="h-6 w-6" />
        )}
      </button>

      <Link href={`/coin/${id}`} className="block w-full">
        <div className="flex flex-col items-center gap-2">
          <img src={image} alt={name} className="w-20 h-20 mb-2" />
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 text-center">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase text-center">{symbol}</p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`text-sm ${priceChangeColor}`}>
            {priceChange24h > 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
          </p>
        </div>
      </Link>
    </div>
  );
};
