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

const BookCard: React.FC<Props> = ({ title, description, tags, year, department, course }) => {
  
  return (
    <div className="max-w-sm overflow-hidden shadow-lg p-4 dark:bg-black bg-white transform transition-transform duration-300 hover:scale-105 hover:border-blue-500 border-2 group rounded-2xl">
      <Image width={400} height={200} src="/book.png" alt="book placeholder image" className="bg-gray-800" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 transition-colors duration-300 group-hover:text-blue-500">{title}</div>
        <p className="text-white-700 group-hover:text-blue-500">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="px-6 py-4">
        <p className="text-white-700 text-base">Year: {year}</p>
        <p className="text-white-700 text-base">Department: {department}</p>
        <p className="text-white-700 text-base">Course: {course}</p>
      </div>
    </div>
  );
};

export default BookCard;
