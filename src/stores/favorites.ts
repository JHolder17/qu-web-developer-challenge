import { defineStore } from 'pinia';
import type { Joke } from '@/types/Joke';

const FAVORITES_KEY = 'favoriteJokes';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as Joke[]
  }),

  getters: {
    getFavoriteMap(): Map<string | number, Joke> {
      return new Map(this.favorites.map((joke: Joke) => [joke.id, joke]));
    },

    getFavoriteJokes(): Joke[] {
      return this.favorites;
    }
  },

  actions: {
    loadFromLocalStorage() {
      const favoritesString = localStorage.getItem(FAVORITES_KEY) || '[]';
      this.favorites = JSON.parse(favoritesString);
    },

    saveToLocalStorage() {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites));
    },

    updateJokeRating(rating: number, joke: Joke) {
      const updatedJoke = { ...joke, rating };
      const index = this.favorites.findIndex((j: Joke) => j.id === updatedJoke.id);

      if (index !== -1) {
        this.favorites[index] = updatedJoke;
      } else {
        this.favorites.push(updatedJoke);
      }

      this.saveToLocalStorage();
    },

    removeFavorite(joke: Joke) {
      this.favorites = this.favorites.filter((j: Joke) => j.id !== joke.id);
      this.saveToLocalStorage();
    },

    addFavorite(joke: Joke) {
      const exists = this.favorites.some((j: Joke) => j.id === joke.id);
      
      if (!exists) {
        this.favorites.push(joke);
        this.saveToLocalStorage();
      }
    },

    initializeStore() {
      this.loadFromLocalStorage();
    }
  }
});