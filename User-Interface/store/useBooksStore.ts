import { create } from "zustand";
import { getAllBooks, getBookByIsbn } from "../services/bookService";

interface Book {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  availableCopies: number;
}

interface BooksStore {
  books: Book[];
  loading: boolean;
  error: string | null;

  fetchBooks: () => Promise<void>;
  fetchBook: (isbn: string) => Promise<Book | null>;
}

export const useBooksStore = create<BooksStore>((set, get) => ({
  books: [],
  loading: false,
  error: null,

  fetchBooks: async () => {
    try {
      set({ loading: true, error: null });
      const list = await getAllBooks(); // agora é um array
      set({ books: list, loading: false });
    } catch (e) {
      set({ loading: false, error: "Erro ao carregar livros" });
    }
  },


  fetchBook: async (isbn) => {
    const cached = get().books.find((b) => b.isbn === isbn);
    if (cached) return cached;

    try {
      set({ loading: true });
      const data = await getBookByIsbn(isbn);

      // opcional: adiciona o livro baixado no array
      set((state) => ({ books: [...state.books, data], loading: false }));
      return data;
    } catch (err) {
      set({ loading: false, error: "Erro ao carregar livro" });
      return null;
    }
  },
}));
