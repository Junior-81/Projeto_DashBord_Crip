import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cryptoFavorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEY);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (coinId: string) => {
    const newFavorites = [...favorites, coinId];
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const removeFavorite = (coinId: string) => {
    const newFavorites = favorites.filter(id => id !== coinId);
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const isFavorite = (coinId: string) => favorites.includes(coinId);

  const toggleFavorite = (coinId: string) => {
    if (isFavorite(coinId)) {
      removeFavorite(coinId);
    } else {
      addFavorite(coinId);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
