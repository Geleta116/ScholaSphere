import React from 'react';
import Image from 'next/image';


interface Props {
  title: string;
  description: string;
  tags: string[];
  year: number;
  department: string;
}

const BookCard: React.FC<Props> = ({ title, description, tags, year, department }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 dark:bg-black bg-white ">
      <Image width={400} height={200} src="/book-place-holder.png" alt='book place holder image' className=' bg-white'></Image>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-white-700 text-base">{description}</p>
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
      </div>
    </div>
  );
};
export default BookCard;
