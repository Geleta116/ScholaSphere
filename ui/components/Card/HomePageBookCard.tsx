import React from "react";
import Image from "next/image";

interface props {
  title: string;
  image: string;
  description: string;
}
const HomePageBookCard = (props: props) => {
  return (
    <div className="inter-var">
      <div className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <div
                    className="text-xl font-bold text-neutral-600 dark:text-white flex items-center "
        >
          {props.title}
        </div>

        <div  className="w-full mt-4 flex justify-center">
          <Image
            src={props.image}
            layout="intrinsic"
            width={199}
            height={320}
            alt="happy student"
            className=" rounded-lg shadow-lg hidden md:block"
          />
        </div>

        <div className="flex justify-between items-center mt-20">
          <div
            
            className="w-full mt-4 flex justify-center text-white"
          >
            {props.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageBookCard;
