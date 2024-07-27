"use client";
import BookCard from "@/components/Card/BookCard";
import { useBookStore } from "@/store/book-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WithAuth from "@/components/WithAuth";

function Page() {
  const router = useRouter();
  const { books, getBookById, approvedBooks, getApprovedBooks } =
    useBookStore();

  useEffect(() => {
    getApprovedBooks();
  }, [getApprovedBooks]);

  return (
    <div>
      <div className="w-screen h-screen    relative flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-4 text-white">Books</h1>
        <div className="flex  justify-center gap-4 items-center ">
          {approvedBooks.slice(0, 3).map((book) => (
            <BookCard
              title={book.title}
              description={book.description}
              key={book.id}
              tags={book.tags}
              department="Software"
              year={3}
              course={book.course}
              id={book.id}
              author={book.author}
              isApproved={book.isApproved}
            />
          ))}
          <p
            className={`text-3xl hover:cursor-pointer hover:underline text-white`}
            onClick={() => router.push("/book")}
          >
            More {`>>`}{" "}
          </p>
        </div>
      </div>
      <div className="w-screen h-screen    relative flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-4 text-white">Video</h1>
        <div className="flex  justify-center gap-4 items-center ">
          {approvedBooks.slice(0, 3).map((book) => (
            <BookCard
              title={book.title}
              description={book.description}
              key={book.id}
              tags={book.tags}
              department="Software"
              year={3}
              course={book.course}
              id={book.id}
              author={book.author}
              isApproved={book.isApproved}
            />
          ))}
          <p
            className={`text-3xl hover:cursor-pointer hover:underline `}
            onClick={() => router.push("/book")}
          >
            More {`>>`}{" "}
          </p>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default WithAuth(Page, ["admin", "user"]);
