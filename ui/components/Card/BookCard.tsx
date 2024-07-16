import React from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  description: string;
  tags: string[];
  year: number;
  department: string;
  course: string;
}

const BookCard = ({ title, description, tags, department, year, course }: Props) => {
  return (
    <div className="relative max-w-sm overflow-hidden shadow-lg p-2 px-6 dark:bg-black bg-white transform transition-transform duration-300 hover:scale-105 hover:border-blue-500 border-2 group rounded-2xl min-w-64">
      <div className="absolute top-5 left-5 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Image width={50} height={50} src="/book.png" alt="book placeholder image" className="bg-gray-800 rounded-full border-2 border-white" />
      </div>
      <div className="relative z-0">
        <div className="px-6 py-4 pt-10 sm:pt-4">
          <div className="font-bold text-xl mb-2 sm:text-lg md:text-xl  transition-colors duration-300 group-hover:text-blue-500 text-overflow:ellipsis">{title}</div>
          <p className="text-gray-700 text-sm sm:text-base ">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs sm:text-sm  font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">Year: {year}</p>
          <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">Department: {department}</p>
          <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">Course: {course}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
