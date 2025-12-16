import { create } from "zustand";
import { useHistoryStore } from "./useHistoryStore";
import { sendLocalNotification } from "@/services/notifications";

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

  loanBook: (item) => {
    set((state) => ({
      loans: [...state.loans.filter((l) => l.isbn !== item.isbn), item],
    }));

    sendLocalNotification(
      "📕 Empréstimo realizado",
      `Você pegou "${item.title}". Devolução até ${item.dueDate}.`
    );
  },

  returnBook: (isbn) => {
    const book = get().loans.find((l) => l.isbn === isbn);
    if (!book) return;

    useHistoryStore.getState().addHistory({
      id: `${book.isbn}-${Date.now()}`,
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      image: book.image,
      dueDate: book.dueDate,
    });

    set((state) => ({
      loans: state.loans.filter((l) => l.isbn !== isbn),
    }));

    sendLocalNotification(
      "✅ Livro devolvido",
      `"${book.title}" foi devolvido com sucesso.`
    );
  },

  isLoaned: (isbn) => get().loans.some((l) => l.isbn === isbn),
}));
