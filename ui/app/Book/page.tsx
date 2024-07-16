"use client";
import AddBook from "@/components/BookOperations/AddBook";
import BookCard from "@/components/Card/BookCard";
import ResourceFilterDropDown from "@/components/DropDown/ResourceFilterDropDown";
import { useBookStore } from "@/store/book-store";
import { useEffect } from "react";

export default function Page() {
  const { books, fetchFilteredBooks } = useBookStore();

  useEffect(() => {
    fetchFilteredBooks();
  }, [fetchFilteredBooks]);

  return (
    <div className="w-screen h-screen dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative overflow-hidden">
      <div className="w-full h-full absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-800 bg-black [mask-image:radial-gradient(ellipse_at_top,transparent_90%,black)]"></div>
      <div className="w-full h-full absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-purple-800 bg-black [mask-image:radial-gradient(ellipse_at_top,transparent_70%,black)]"></div>
      <div className="flex flex-col items-center w-full h-full overflow-y-auto">
        <div className="w-full flex justify-center z-10 pt-20">
          <ResourceFilterDropDown />
          
        </div>
      
        <div className="flex flex-wrap justify-center items-center gap-4 lg:grid-cols-3 mt-4 w-full px-4">
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book) => (
              <BookCard
                title={book.title}
                description={book.description}
                key={book.id}
                tags={book.tags}
                department={book.department || "Software"}
                year={book.year || 3}
                course={book.course}
              />
            ))
          ) : (
            <p className="text-center col-span-full">No books available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
