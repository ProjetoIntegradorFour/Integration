import { create } from "zustand";
import axios from "axios";

const API_URL = "https://librarytor6700.duckdns.org/catalog";

export const useCatalogStore = create((set) => ({
  books: [],
  totalPages: 0,
  loading: false,
  error: null,

  fetchBooks: async (query = "", page = 0) => {
    const size = 10000;
    set({ loading: true, error: null });

    try {
      const res = await axios.get(API_URL, {
        params: { query, page, size },
      });

      set({
        books: res.data.content,
        totalPages: res.data.totalPages,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({ loading: false, error: "Erro ao carregar catálogo" });
    }
  },
}));
