"use client";
import BookCard from "@/components/Card/BookCard";
import { useBookStore } from "@/store/book-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WithAuth from "../../components/WithAuth";
import Image from "next/image";
import { FlipWords } from "@/components/flipword";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import HomePageBookCard from "@/components/Card/HomePageBookCard";
import Carousel from "@/components/carousel";

function Page() {
  const router = useRouter();
  const { books, getBookById, approvedBooks, getApprovedBooks } =
    useBookStore();

  const words = ["books", "videos", "exams"];

  useEffect(() => {
    getApprovedBooks();
  }, [getApprovedBooks]);

  return (
    <div className="mt-20 px-4 md:px-10 lg:px-20 py-10 text-white">
     
      <section className="flex flex-col items-center mb-12 text-center">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug max-w-3xl mx-auto">
          <span className="text-purple-400">Excited?</span> We are here to
          provide the best{" "} <br/>
          <FlipWords className="text-purple-400" words={words} />
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="flex flex-wrap justify-center gap-6 mb-12">
        <HomePageBookCard
          title={"Introduction to Algorithms"}
          description={
            "This title covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers."
          }
          image={"/dsa.jpg"}
        />
        <HomePageBookCard
          title={"Introduction to OOP"}
          description={
            "This is the best place to find All the concepts you need to know about OOP."
          }
          image={"/oop.jpg"}
        />
        <HomePageBookCard
          title={"Introduction to Networking"}
          description={
            "This is the best place to find All the concepts you need to know about Networking."
          }
          image={"/network_two.jpg"}
        />
      </section>


    </div>
  );
}

export default WithAuth(Page, ["admin", "user"]);
