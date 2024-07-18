"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useFilterStore } from "@/store/filter-store";
import { RenderTags } from "../DropDown/TagsFilter";
import { z } from "zod";
import bookSchema from "@/util/validation/book-schema";
import { useBookStore } from "@/store/book-store";
import { CreateBookPayload } from "@/util/api/book-api";
import { toast } from "react-toastify";

type FormData = z.infer<typeof bookSchema>;

interface props {
  handleClose: () => void;
}
const AddBookModal = ({ handleClose }: props) => {
  const { tags, years, departments, courses,  } = useFilterStore();
  const  {books } = useBookStore();
  const { addBook } = useBookStore();

  const [formData, setFormData] = useState<CreateBookPayload>({
    file: null,
    title: "",
    description: "",
    year: NaN,
    department: "",
    course: "",
    tags: [],
    author: "",
  });

  const [errors, setErrors] = useState<Partial<z.ZodFormattedError<FormData>>>(
    {}
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "year" ? parseInt(value, 10) : files ? files[0] : value,
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = bookSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors(fieldErrors);
    } else {
      try {
        addBook(formData);
        toast.success("Book added successfully", { autoClose: 200 });
        handleClose();
      } catch (error) {
        toast.error("Failed to add book");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md"
      encType="multipart/form-data"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Book Cover
        </label>
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.file && (
          <p className="text-red-500 text-sm">{errors.file._errors[0]}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Book Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title._errors[0]}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Book Author
        </label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Book Author"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.author && (
          <p className="text-red-500 text-sm">{errors.author._errors[0]}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">
            {errors.description._errors[0]}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Year
        </label>
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={undefined}>Select Year</option>
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
        {errors.year && (
          <p className="text-red-500 text-sm">{errors.year._errors[0]}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Department
        </label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={""}>Select Department</option>
          {departments.map((department) => (
            <option value={department} key={department}>
              {department}
            </option>
          ))}
        </select>
        {errors.department && (
          <p className="text-red-500 text-sm">{errors.department._errors[0]}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Course
        </label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={""}>Select Course</option>
          {courses.map((course) => (
            <option value={course} key={course}>
              {course}
            </option>
          ))}
        </select>
        {errors.course && (
          <p className="text-red-500 text-sm">{errors.course._errors[0]}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Tags
        </label>
        <RenderTags
          handleTagChange={handleTagChange}
          selectedTags={formData.tags}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
        >
          Add Book
        </button>
      </div>
    </form>
  );
};

export default AddBookModal;
