import { create } from "zustand";

export interface ReservedBook {
  isbn: string;
  title: string;
  author: string;
  image: string;
}

interface ReservedState {
  reserved: ReservedBook[];

  addReserved: (book: ReservedBook) => void;
  removeReserved: (isbn: string) => void;

  isReserved: (isbn: string) => boolean;
}

export const useReservedStore = create<ReservedState>((set, get) => ({
  reserved: [],

  addReserved: (book) =>
    set((state) => ({
      reserved: [...state.reserved.filter((b) => b.isbn !== book.isbn), book],
    })),

  removeReserved: (isbn) =>
    set((state) => ({
      reserved: state.reserved.filter((b) => b.isbn !== isbn),
    })),

  isReserved: (isbn) => get().reserved.some((b) => b.isbn === isbn),
}));
