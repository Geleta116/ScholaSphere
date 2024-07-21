"use client";

import React, { useEffect } from "react";
import BookCard from "@/components/Card/BookCard";
import { useBookStore } from "@/store/book-store";

const ApprovedBook = () => {
  const { approvedBooks, fetchFilteredBooks } = useBookStore();

  useEffect(() => {
    fetchFilteredBooks();
  }, [fetchFilteredBooks]);

  return (
    <div className=" w-full relative overflow-hidden">
      {Array.isArray(approvedBooks) ? (
          <div className="  relative overflow-hidden">
            <div className="text-center w-full  h-12 text-3xl text-white">
              <p>COUNT: {approvedBooks.length} Books</p>
            </div>
          </div>
        ) : (
          <p>ERROR</p>
        )}
      <div className="flex flex-wrap justify-start items-start gap-4 lg:grid-cols-3 mt-4 w-full px-4">
        {Array.isArray(approvedBooks) && approvedBooks.length > 0 ? (
          approvedBooks.map((book) => (
            <BookCard
              title={book.title}
              description={book.description}
              key={book.id}
              tags={book.tags}
              department={book.department || "Software"}
              year={book.year || 3}
              course={book.course}
              author={book.author}
            />
          ))
        ) : (
          <div className=" w-full relative overflow-hidden">
              </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedBook;
