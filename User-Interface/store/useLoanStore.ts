import { create } from "zustand";
import { useHistoryStore } from "./useHistoryStore";

interface LoanItem {
  isbn: string;
  title: string;
  author: string;
  image: string;
  dueDate: string;
}

interface LoanStore {
  loans: LoanItem[];

  loanBook: (item: LoanItem) => void;
  returnBook: (isbn: string) => void;
  isLoaned: (isbn: string) => boolean;
}

export const useLoanStore = create<LoanStore>((set, get) => ({
  loans: [],

  loanBook: (item) =>
    set((state) => ({
      loans: [...state.loans.filter((l) => l.isbn !== item.isbn), item],
    })),

  returnBook: (isbn) => {
    const book = get().loans.find((l) => l.isbn === isbn);
    if (!book) return;

    // envia pro histórico (não passe returnedAt — a historyStore adiciona essa data)
    useHistoryStore.getState().addHistory({
      id: `${book.isbn}-${Date.now()}`,
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      image: book.image,
      dueDate: book.dueDate,
    });

    // remove do ativo
    set((state) => ({
      loans: state.loans.filter((l) => l.isbn !== isbn),
    }));
  },

  isLoaned: (isbn) => get().loans.some((l) => l.isbn === isbn),
}));
