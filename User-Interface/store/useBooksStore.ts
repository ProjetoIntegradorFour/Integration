import { create } from "zustand";
import axios from "axios";

interface Book {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  description?: string;
  availableCopies?: number;
}

interface BooksStore {
  books: Book[];
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;

  fetchBooks: () => Promise<void>;
  fetchBookByISBN: (isbn: string) => Promise<void>;
}

export const useBooksStore = create<BooksStore>((set) => ({
  books: [],
  selectedBook: null,
  loading: false,
  error: null,

  // GET LISTA DE LIVROS (HOME)
  fetchBooks: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("http://10.109.3.13:8080/catalog?page=0&size=20");

      set({
        books: res.data.content,
        loading: false,
        error: null,
      });
    } catch (e) {
      set({ loading: false, error: "Erro ao carregar o catálogo" });
    }
  },

  // GET DETALHES DO LIVRO (POR ISBN)
  fetchBookByISBN: async (isbn: string) => {
    try {
      set({ loading: true });
      const res = await axios.get(`http://10.109.3.13:8080/catalog/${isbn}`);

      set({
        selectedBook: res.data,
        loading: false,
        error: null,
      });
    } catch (e) {
      set({ loading: false, error: "Erro ao carregar o livro" });
    }
  },
}));
