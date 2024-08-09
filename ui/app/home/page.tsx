"use client";
import BookCard from "@/components/Card/BookCard";
import { useBookStore } from "@/store/book-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WithAuth from "../components/WithAuth";
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
    <div className="mt-40  flex flex-col  p-10 text-white ">

      <section className=" items-center justify-center  mb-20">
        <br />

        <div className="text-white text-4xl md:text-6xl font-semibold leading-snug mx-auto max-w-5xl">
          <span className="text-purple-400">Excited?</span> We are here to
          provide the best{" "}
          <FlipWords className="text-purple-400" words={words} />
        </div>
      </section>

      <section className="flex items-center justify-center gap-3"> 
         <HomePageBookCard
          title={" Introduction to Algorithms"}
          description={
            "This title covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers."
          }
          image={"/dsa.jpg"}
        />
        <HomePageBookCard
          title={"Introduction to OOP"}
          description={
            "This is the best place to find All the concepts you need to know about OOP"
          }
          image={"/oop.jpg"}
        /> 
          <HomePageBookCard
          title={"Introduction to Networking"}
          description={
            "This is the best place to find All the concepts you need to know about Networking"
          }
          image={"/network_two.jpg"}  
        />  
       </section> 
      {/* <section className="flex justify-around w-full mb-20">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/s2mYsPWzLjg?si=cHeK5uGLSILOyLih" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/s2mYsPWzLjg?si=cHeK5uGLSILOyLih" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/s2mYsPWzLjg?si=cHeK5uGLSILOyLih" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </section>
      <Carousel/> */}
    </div>
  );
}

export default WithAuth(Page, ["admin", "user"]);
