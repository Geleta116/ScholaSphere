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
        {/* <div className="w-screen h-screen dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center"> */}
        {/* <div className="w-screen h-screen absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
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
      <div className="w-screen h-screen    relative flex flex-col items-center justify-center">  
        {/* <div className="w-screen h-screen dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center"> */}
        {/* <div className="w-screen h-screen absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
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
