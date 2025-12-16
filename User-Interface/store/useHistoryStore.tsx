import { create } from "zustand";

export interface HistoryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  image: string;
  dueDate: string; // <-- ADICIONADO
  returnedAt: string; // data da devolução
}

interface HistoryState {
  history: HistoryBook[];
  addHistory: (book: Omit<HistoryBook, "returnedAt">) => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],

  addHistory: (book) =>
    set((state) => ({
      history: [
        ...state.history,
        {
          ...book,
          returnedAt: new Date().toISOString().split("T")[0], // YYYY-MM-DD
        },
      ],
    })),
}));
