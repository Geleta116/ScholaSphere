"use client";
import { useFilterStore } from "@/store/filter-store";
import { useBookStore } from "@/store/book-store";
import React, { useEffect } from "react";
import AddBook from "../BookOperations/AddBook";
import { RenderTags } from "./TagsFilter";

const ResourceFilterDropDown = () => {
  const {
    tags,
    years,
    departments,
    courses,
    setTags,
    setYears,
    setDepartments,
    setCourses,
    selectedYear,
    setSelectedYear,
    selectedDepartment,
    setSelectedDepartment,
    selectedCourse,
    setSelectedCourse,
    selectedTags,
    setSelectedTags,
    fetchFilterOptions,
  } = useFilterStore();

  const { fetchFilteredBooks } = useBookStore();

  useEffect(() => {
    fetchFilterOptions();
    fetchFilteredBooks();
  }, [fetchFilterOptions, fetchFilteredBooks]);

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    fetchFilteredBooks();
  };


  return (
    <div className="p-6 rounded-lg shadow-lg w-full flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col min-w-fit sm:min-w-52">
          <label className="mb-2 font-bold text-white-700">Year</label>
          <select
            onChange={(e) => {
              setSelectedYear(parseInt(e.target.value));
              fetchFilteredBooks();
            }}
            className="p-2 rounded-lg border border-gray-800 focus:ring-2 focus:ring-blue-500"
            value={selectedYear || ""}
          >
            <option value="">Select Year</option>
            {years.map((year: number, index: number) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col min-w-fit sm:min-w-52">
          <label className="mb-2 font-bold text-white-700">Department</label>
          <select
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              fetchFilteredBooks();
            }}
            className="p-2 rounded-lg border border-gray-800 focus:ring-2 focus:ring-blue-500"
            value={selectedDepartment || ""}
          >
            <option value="">Select Department</option>
            {departments.map((dept: string, index: number) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col min-w-fit sm:min-w-52">
          <label className="mb-2 font-bold text-white-700">Course</label>
          <select
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              fetchFilteredBooks();
            }}
            className="p-2 rounded-lg border border-gray-800 focus:ring-2 focus:ring-blue-500"
            value={selectedCourse || ""}
          >
            <option value="">Select Course</option>
            {courses.map((course: string, index: number) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center mt-6 w-full">
        <label className="mb-2 font-bold text-white-700">Tags</label>
        <RenderTags handleTagChange={handleTagChange} selectedTags={selectedTags}/>
      </div>
    </div>
  );
};

export default ResourceFilterDropDown;
