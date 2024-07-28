"use client";
import BookCard from "@/components/Card/BookCard";
import { useBookStore } from "@/store/book-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WithAuth from "@/components/WithAuth";
import Image from "next/image";
import { FlipWords } from "@/components/flipword";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

function Page() {
  const router = useRouter();
  const { books, getBookById, approvedBooks, getApprovedBooks } =
    useBookStore();

  const words = ["Resources", "books", "videos", "exams"];

  useEffect(() => {
    getApprovedBooks();
  }, [getApprovedBooks]);

  return (
    <div className="mt-40 items-center justify-center flex flex-col ">
      <section className="flex flex-col md:flex-row items-center justify-center w-full mb-20">
        <br />

        <div className="text-white text-4xl md:text-6xl font-semibold leading-snug max-w-5xl">
          <span className="text-purple-400">Excited?</span> We are here to
          provide the best{" "}
          <FlipWords className="text-purple-400" words={words} />
        </div>
      </section>

      <section className="flex justify-around w-full">
       
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white text-center"
            >
              Introduction to Algorithms
            </CardItem>

            <CardItem
              translateZ="100"
              className="w-full mt-4 flex justify-center"
            >
              <Image
                src="/dsa.jpg"
                layout="intrinsic"
                width={199}
                height={320}
                alt="happy student"
                className=" rounded-lg shadow-lg hidden md:block"
              />
            </CardItem>

            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ="100"
                className="w-full mt-4 flex justify-center text-white"
              >
                This title covers a broad range of algorithms in depth, yet
                makes their design and analysis accessible to all levels of
                readers.
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Introduction to OOP
            </CardItem>

            <CardItem
              translateZ="100"
              className="w-full mt-4 flex justify-center"
            >
              <Image
                src="/oop.jpg"
                layout="intrinsic"
                width={199}
                height={320}
                alt="happy student"
                className=" rounded-lg shadow-lg hidden md:block"
              />
            </CardItem>

            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ="100"
                className="w-full mt-4 flex justify-center text-white"
              >
                This is the best place to find All the concepts you need to know about OOP
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white flex items-center "
            >
              Introduction to Algorithms
            </CardItem>

            <CardItem
              translateZ="100"
              className="w-full mt-4 flex justify-center"
            >
              <Image
                src="/network_two.jpg"
                layout="intrinsic"
                width={199}
                height={320}
                alt="happy student"
                className=" rounded-lg shadow-lg hidden md:block"
              />
            </CardItem>

            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ="100"
                className="w-full mt-4 flex justify-center text-white"
              >
               This is a great book to Leanr Networking and you will learn alot
                
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </section>
    </div>
  );
}

export default WithAuth(Page, ["admin", "user"]);
