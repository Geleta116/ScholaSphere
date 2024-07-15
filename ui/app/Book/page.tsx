"use client";
import BookCard from "@/components/Card/BookCard";
import FilterDropDown from "@/components/DropDown/ResourceFilterDropDown";
import { useBookStore } from "@/store/book-store";

export default function Page() {
  const { books, approvedBooks } = useBookStore();
  return (
    <div>
      BookPage
      <FilterDropDown />
      <div className="flex  justify-center gap-4">
        {books.map((book) => (
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
  );
}
