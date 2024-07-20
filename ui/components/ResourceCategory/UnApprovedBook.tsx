"use client";

import React, { useEffect } from "react";
import BookCard from "@/components/Card/BookCard";
import { useBookStore } from "@/store/book-store";

const UnApprovedBook = () => {
  const { unApprovedBooks, fetchFilteredUnApprovedBooks } = useBookStore();

  useEffect(() => {
    fetchFilteredUnApprovedBooks();
  }, [fetchFilteredUnApprovedBooks]);

  return (
    <div className="w-full   relative overflow-hidden">
     
      <div className="flex flex-wrap justify-center items-center gap-4 lg:grid-cols-3 mt-4 w-full px-4">
        {Array.isArray(unApprovedBooks) && unApprovedBooks.length > 0 ? (
          unApprovedBooks.map((book) => (
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
  );
};

export default UnApprovedBook;
