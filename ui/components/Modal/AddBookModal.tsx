"use client";
import React, { useState } from "react";
import { useFilterStore } from "@/store/filter-store";
import { RenderTags } from "../DropDown/TagsFilter";

const AddBookModal = () => {
  const { tags, years, departments, courses } = useFilterStore();

  const [bookYear, setBookYear] = useState<number | undefined>();
  const [bookDepartment, setBookDepartment] = useState<string>("");
  const [bookCourse, setBookCourse] = useState<string>("");
  const [bookTags, setBookTags] = useState<string[]>([]);

  function ToggleTag(tag: string) {
    setBookTags((currentTags) => {
      if (currentTags.includes(tag)) {
        return currentTags.filter((t) => t !== tag);
      } else {
        return [...currentTags, tag];
      }
    });
  }

  return (
    <form className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md ">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Book Cover
        </label>
        <input
          type="file"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Book Title
        </label>
        <input
          type="text"
          placeholder="Book Title"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          placeholder="Description"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Year
        </label>
        <select
          value={bookYear}
          onChange={(e) => setBookYear(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={undefined}>Select Year</option>
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Department
        </label>
        <select
          value={bookDepartment}
          onChange={(e) => setBookDepartment(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={""}>Select Department</option>
          {departments.map((department) => (
            <option value={department} key={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Course
        </label>
        <select
          value={bookCourse}
          onChange={(e) => setBookCourse(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={""}>Select Course</option>
          {courses.map((course) => (
            <option value={course} key={course}>
              {course}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Tags
        </label>
        <RenderTags handleTagChange={ToggleTag} selectedTags={bookTags} />
      </div>
    </form>
  );
};

export default AddBookModal;
