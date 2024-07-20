"use client";

import React from "react";
import BookCard from "@/components/Card/BookCard";
import ResourceFilterDropDown from "@/components/DropDown/ResourceFilterDropDown";
import AddBookModal from "@/components/Modal/AddBookModal";
import Modal from "@/components/Modal/Modal";
import { useBookStore } from "@/store/book-store";
import { useEffect, useState } from "react";
import AddResource from "@/components/ResourceOperations/AddResource";

const ApprovedBook = () => {
  const { books, fetchFilteredBooks } = useBookStore();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    fetchFilteredBooks();
  }, [fetchFilteredBooks]);

  return (
    <div className="w-screen h-screen dark:bg-black bg-white relative overflow-hidden">
      <div className="fixed inset-0 dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1]"></div>
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center dark:bg-black-800 bg-black [mask-image:radial-gradient(ellipse_at_top,transparent_90%,black)]"></div>
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center dark:bg-purple-800 bg-black [mask-image:radial-gradient(ellipse_at_top,transparent_70%,black)]"></div>

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
  );
};

export default ApprovedBook;
