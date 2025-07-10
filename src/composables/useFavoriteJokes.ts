import { ref } from 'vue';
import type { Joke } from '@/types/Joke';

const FAVORITES_KEY = 'favoriteJokes';

export function useFavoriteJokes() {
  const favorites = ref<Joke[]>([]);

  const getFavoriteJokes = (): Joke[] => {
    const favoritesString = localStorage.getItem(FAVORITES_KEY) || '[]';
    return JSON.parse(favoritesString);
  };

  const loadFavorites = () => {
    favorites.value = getFavoriteJokes();
  };

  const updateJokeRating = (rating: number, joke: Joke) => {
    const updatedJoke = { ...joke, rating };
    const localFavorites = getFavoriteJokes();
    const index = localFavorites.findIndex((j: Joke) => j.id === updatedJoke.id);

    if (index !== -1) {
      localFavorites[index] = updatedJoke;
    } else {
      localFavorites.push(updatedJoke);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(localFavorites));
    favorites.value = localFavorites;
  };

  const removeFavorite = (joke: Joke) => {
    const stored = getFavoriteJokes();
    const updated = stored.filter((j: Joke) => j.id !== joke.id);

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    favorites.value = updated;
  };

  const addFavorite = (joke: Joke) => {
    const stored = getFavoriteJokes();
    const exists = stored.some((j: Joke) => j.id === joke.id);
    
    if (!exists) {
      stored.push(joke);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(stored));
      favorites.value = stored;
    }
  };

  const getFavoriteMap = (): Map<string | number, Joke> => {
    const storedFavorites = getFavoriteJokes();
    return new Map(storedFavorites.map((joke: Joke) => [joke.id, joke]));
  };

  return {
    favorites,
    loadFavorites,
    updateJokeRating,
    removeFavorite,
    addFavorite,
    getFavoriteJokes,
    getFavoriteMap
  };
}