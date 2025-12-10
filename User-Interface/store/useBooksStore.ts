import { create } from "zustand";
import {
  getAllBooks,
  getBookByIsbn,
  searchBooks as apiSearchBooks,
} from "../services/bookService";

interface Book {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  availableCopies: number;
   description?: string;
}

interface BooksStore {
  books: Book[];
  loading: boolean;
  error: string | null;

  fetchBooks: () => Promise<void>;
  fetchBook: (isbn: string) => Promise<Book | null>;
  searchBooks: (query: string) => Promise<void>;
}

export const useBooksStore = create<BooksStore>((set, get) => ({
  books: [],
  loading: false,
  error: null,

  fetchBooks: async () => {
  set({ loading: true, error: null });

  try {
    const list = await getAllBooks();
    set({ books: list });
  } catch (e) {
    set({ error: "Erro ao carregar livros" });
  } finally {
    set({ loading: false });
  }
},

  fetchBook: async (isbn) => {
  // Procurar em cache SOMENTE se já existe descrição
  const cached = get().books.find((b) => b.isbn === isbn && b.description);
  if (cached) return cached;

  try {
    set({ loading: true });
    const data = await getBookByIsbn(isbn);

    const formatted: Book = {
      isbn: data.isbn,
      title: data.title,
      author: data.authors,
      cover: data.coverUrl,
      availableCopies: data.availableCopies ?? 0,
      description: data.description ?? "Sem descrição disponível.",
    };

    // NÃO mexer no array principal de books!
    set({ loading: false });

    return formatted;
  } catch (err) {
    set({ loading: false, error: "Erro ao carregar livro" });
    return null;
  }
},


  searchBooks: async (query: string) => {
    if (!query.trim()) {
      const original = await getAllBooks();
      return set({ books: original });
    }

    try {
      set({ loading: true, error: null });
      const results = await apiSearchBooks(query);

      // 🔥 Ordenação: primeiro títulos que começam com o termo
      const normalizedQuery = query.toLowerCase();

      const sortedResults = results.sort((a, b) => {
        const aStarts = a.title.toLowerCase().startsWith(normalizedQuery);
        const bStarts = b.title.toLowerCase().startsWith(normalizedQuery);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.title.localeCompare(b.title);
      });

      set({ books: sortedResults, loading: false });
    } catch (err) {
      set({ loading: false, error: "Erro ao buscar livros" });
    }
  },
}));
