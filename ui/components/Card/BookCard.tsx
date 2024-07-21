"use client";

import React, { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";
import { z } from "zod";
import { toast } from "react-toastify";
import updateBookSchema from "@/util/validation/update-book.schema";
// import ResourceFilterDropDown from "@/components/ResourceFilterDropDown";
import { useFilterStore } from "@/store/filter-store";
import { RenderTags } from "../DropDown/TagsFilter";

interface Props {
  title: string;
  description: string;
  tags: string[];
  year: number;
  department: string;
  course: string;
  author: string;
}

type FormData = z.infer<typeof updateBookSchema>;

const BookCard = ({
  title,
  description,
  tags,
  department,
  year,
  course,
  author,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title,
    description,
    tags,
    year,
    department,
    course,
    author,
  });

  const [errors, setErrors] = useState<Partial<z.ZodFormattedError<FormData>>>(
    {}
  );

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false); // Reset editing state when modal is closed
  };

  const handleEditClick = () => setIsEditing(true);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = updateBookSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors(fieldErrors);
    } else {
      try {
        console.log(formData)
        setIsEditing(false);
        // addBook(formData);
        toast.success("Book updated successfully", { autoClose: 200 });
        handleCloseModal();
      } catch (error) {
        toast.error("Failed to update book");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "year" ? parseInt(value, 10) : value,
    }));
  };

  const handleTagChange = (tag: string) => {
    setFormData((prevData) => {
      const newTags = prevData.tags.includes(tag)
        ? prevData.tags.filter((t) => t !== tag)
        : [...prevData.tags, tag];
      return { ...prevData, tags: newTags };
    });
  };

  return (
    <>
      <div
        className="relative max-w-sm overflow-hidden border-gray-900 shadow-lg p-2 px-6 bg-zinc-950 transform transition-transform duration-300 hover:scale-105 hover:border-blue-500 hover:bg-neutral-900 border-2 group rounded-2xl min-w-96 min-h-80 mb-4"
        onClick={handleOpenModal}
      >
        <div className="absolute top-5 left-5 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Image
            width={50}
            height={50}
            src="/book.png"
            alt="book placeholder image"
            className="bg-gray-800 rounded-full border-2 border-white"
          />
        </div>
        <div className="relative z-0">
          <div className="px-6 py-4 pt-10 sm:pt-4">
            <p className="font-bold text-lg mb-2 text-white transition-colors duration-300 group-hover:text-blue-500 overflow-hidden whitespace-nowrap text-overflow-ellipsis font-sans">
              {title}
            </p>
            <p className="text-gray-300 text-sm overflow-hidden whitespace-nowrap text-overflow-ellipsis text-wrap">
              {description}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs sm:text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-400 text-sm">Year: {year}</p>
            <p className="text-gray-400 text-sm">Department: {department}</p>
            <p className="text-gray-400 text-sm">Course: {course}</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} handleClose={handleCloseModal}>
        <div className="p-4 backdrop-blur-lg rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 block w-full px-3 py-2 border ${
                isEditing ? "bg-white text-black" : "bg-zinc text-white"
              } border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 block w-full px-3 py-2 border ${
                isEditing ? "bg-white text-black" : "bg-zinc text-white"
              } border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 block w-full px-3 py-2 border ${
                isEditing ? "bg-white text-black" : "bg-zinc text-white"
              } border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 block w-full px-3 py-2 border ${
                isEditing ? "bg-white text-black" : "bg-zinc text-white"
              } border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            >
              <option value="">Select Department</option>
              {useFilterStore.getState().years.map((year: number, index: number) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 block w-full px-3 py-2 border ${
                isEditing ? "bg-white text-black" : "bg-zinc text-white"
              } border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            >
              <option value="">Select Department</option>
              {useFilterStore.getState().departments.map((dept: string, index: number) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Course
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 block w-full px-3 py-2 border ${
                isEditing ? "bg-white text-black" : "bg-zinc text-white"
              } border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            >
              <option value="">Select Course</option>
              {useFilterStore.getState().courses.map((course: string, index: number) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <RenderTags
              handleTagChange={handleTagChange}
              selectedTags={formData.tags}
            />
          </div>

          <div className="flex justify-end">
            {isEditing ? (
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookCard;
