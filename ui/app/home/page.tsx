"use client";
import BookCard from "@/components/Card/BookCard";
import { useBookStore } from "@/store/book-store";
import { useEffect } from "react";

export default function Page() {
  const { books, getBookById, approvedBooks, getApprovedBooks } =
    useBookStore();

  useEffect(() => {
    getApprovedBooks();
    
  }, []);

  return (
    <div>
      <div className="w-screen h-screen dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
        <div className="w-screen h-screen absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <h1 className="text-6xl font-bold mb-4 text-white">Books</h1>
        <div className="flex  justify-center gap-4 items-center ">
          {approvedBooks.slice(0, 3).map((book) => (
            <BookCard
              title={book.title}
              description={book.description}
              key={book.id}
              tags={["Untagged", "non"]}
              department="Software"
              year={3}
              course={book.course}
            />
          ))}
          <p className={`text-3xl`}>More {`>>`} </p>
        </div>
      </div>
      <div className="w-screen h-screen dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
        <div className="w-screen h-screen absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <h1 className="text-6xl font-bold mb-4 text-white">Videos</h1>
        <div className="flex  justify-center gap-4">
          {approvedBooks.slice(0, 3).map((book) => (
            <BookCard
              title={book.title}
              description={book.description}
              key={book.id}
              tags={["Untagged", "non"]}
              department="Software"
              year={3}
              course={book.course}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
