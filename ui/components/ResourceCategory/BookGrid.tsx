"use client";

import React, { useEffect } from "react";
import BookCard from "@/components/Card/BookCard";
import { useBookStore } from "@/store/book-store";
import { Book } from "@/model/Book";

interface props {
    books: Book[]
}

const BookGrid = ({books}: props) => {


    return (
        <div className=" w-full relative overflow-hidden">
            {Array.isArray(books) ? (
                <div className="  relative overflow-hidden">
                    <div className="text-center w-full  h-12 text-3xl text-white">
                        <p>COUNT: {books.length} Books</p>
                    </div>
                </div>
            ) : (
                <p>ERROR</p>
            )}
            <div className="flex flex-wrap justify-center 2xl:justify-start items-center lg:items-start  gap-4 lg:grid-cols-3 mt-4 w-full px-4">
                {Array.isArray(books) && books.length > 0 ? (
                    books.map((book) => (
                        <BookCard
                            id={book.id}
                            title={book.title}
                            description={book.description}
                            key={book.id}
                            tags={book.tags}
                            department={book.department || "Software"}
                            year={book.year || 3}
                            course={book.course}
                            author={book.author}
                            isApproved={book.isApproved}
                        />
                    ))
                ) : (
                    <div className=" w-full relative overflow-hidden"></div>
                )}
            </div>
        </div>
    );
};

export default BookGrid;
