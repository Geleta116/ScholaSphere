"use client"
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
    <div className=" w-screen h-screen dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center text-white">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-gradient-to-b  "></div>
      {approvedBooks.map((book) => (
        <BookCard
          title="Title"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
"
          key={book.id}
          tags={["Untagged", "non"]}
          department="Software"
          year={3}
        />
      ))}
    </div>
  );
}
