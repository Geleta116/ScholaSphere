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
  filterBook,
  CreateBookPayload,
} from "@/util/api/book-api";
import { Book } from "@/model/Book";
import useFilterStore from "./filter-store";


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
  fetchFilteredBooks: () => Promise<void>;
  addBook: (book: CreateBookPayload) => void;
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
  fetchFilteredBooks: async () => {
    const { selectedYear, selectedDepartment, selectedCourse, selectedTags } = useFilterStore.getState();
    const filter = {
      year: selectedYear,
      department: selectedDepartment,
      course: selectedCourse,
      tags: selectedTags,
    };
  
    try {
      const response = await filterBook(filter);
      set({ books: response.books });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
  addBook: async (book: CreateBookPayload) => {
    try {
    const response = await uploadBook(book);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },
}));
