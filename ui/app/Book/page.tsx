"use client";
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
    <div className="w-screen h-screen dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-start">
      <div className="w-screen h-screen absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center  z-10 py-20">
          <ResourceFilterDropDown />
        </div>
        <div className="flex-grow flex flex-wrap justify-center gap-4 mt-4 w-full">
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
            <p className="text-center">No books available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
