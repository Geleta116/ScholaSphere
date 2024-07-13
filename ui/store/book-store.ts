import { create } from "zustand";
import {
  uploadBook,
  updateBook,
  getBookById,
  getYourApprovedBooks,
  GetApprovedBooks,
  GetYourUnApprovedBooks,
  downloadBook,
  deleteBook,
} from "@/util/api/book-api";
import { Book } from "@/model/Book";

interface BookStore {
  books: Book[];
  approvedBooks: Book[];
  yourApprovedBooks: Book[];
  yourUnApprovedBooks: Book[];
  getBookById: (id: string) => Promise<void>;
  getApprovedBooks: () => Promise<void>;
  getYourApprovedBooks: () => Promise<void>;
  getYourUnApprovedBooks: () => Promise<void>;
  uploadBook: (book: any) => Promise<void>;
  updateBook: (book: any) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  downloadBook: (bookName: string) => Promise<void>;
  error: string | undefined;
}

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  approvedBooks: [],
  yourApprovedBooks: [],
  yourUnApprovedBooks: [],
  error: undefined,
  getBookById: async (id: string) => {
    try {
      const book = await getBookById(id);
      set({ books: [book] });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
  getApprovedBooks: async () => {
    try {
      console.log("getApprovedBooks");
      const books = await GetApprovedBooks();
      set({ approvedBooks: books });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
  getYourApprovedBooks: async () => {
    try {
      const books = await getYourApprovedBooks();
      set({ yourApprovedBooks: books });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
  getYourUnApprovedBooks: async () => {
    try {
      const books = await GetYourUnApprovedBooks();
      set({ yourUnApprovedBooks: books });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
  uploadBook: async (book: any) => {
    try {
      await uploadBook(book);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
  updateBook: async (book: any) => {
    try {
      await updateBook(book);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
  deleteBook: async (id: string) => {
    try {
      await deleteBook(id);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
  downloadBook: async (bookName: string) => {
    try {
      await downloadBook(bookName);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
}));
