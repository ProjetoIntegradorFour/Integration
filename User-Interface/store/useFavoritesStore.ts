import { create } from "zustand";

export interface FavoriteBook {
  id: string;
  title: string;
  image: string;
  description?: string;
  author?: string;
}

interface FavoriteStore {
  favorites: FavoriteBook[];
  addFavorite: (book: FavoriteBook) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoriteStore>((set, get) => ({
  favorites: [],

  addFavorite: (book) =>
    set((state) => ({
      favorites: [...state.favorites, book],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((b) => b.id !== id),
    })),

  isFavorite: (id) => get().favorites.some((b) => b.id === id),
}));
