"use client";
import { useFilterStore } from "@/store/filter-store";
import { useBookStore } from "@/store/book-store";
import React, { useEffect } from "react";

const FilterDropDown = () => {
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

  const handleFilter = () => {
    fetchFilteredBooks();
  };

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    fetchFilteredBooks();
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    fetchFilteredBooks();
  };

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
    fetchFilteredBooks();
  };

  const handleCourseChange = (course: string) => {
    setSelectedCourse(course);
    fetchFilteredBooks();
  };

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-wrap items-center">
          <label className="mb-2 font-bold text-gray-700">Year</label>
          <div className="flex flex-wrap gap-2">
            {years.map((year:number, index) => (
              <div
                key={index}
                onClick={() => handleYearChange(year)}
                className={`cursor-pointer p-2 rounded-full w-12 h-12 flex items-center justify-center ${
                  selectedYear === year
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {year}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center">
          <label className="mb-2 font-bold text-gray-700">Department</label>
          <div className="flex flex-wrap gap-2">
            {departments.map((dept, index) => (
              <div
                key={index}
                onClick={() => handleDepartmentChange(dept)}
                className={`cursor-pointer p-2 rounded-full w-36 h-12 flex items-center justify-center ${
                  selectedDepartment === dept
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {dept}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center">
          <label className="mb-2 font-bold text-gray-700">Course</label>
          <div className="flex flex-wrap gap-2">
            {courses.map((course, index) => (
              <div
                key={index}
                onClick={() => handleCourseChange(course)}
                className={`cursor-pointer p-2 rounded-full w-36 h-12 flex items-center justify-center ${
                  selectedCourse === course
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {course}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <label className="mb-2 font-bold text-gray-700">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              onClick={() => handleTagChange(tag)}
              className={`cursor-pointer p-2 rounded-full w-24 h-12 flex items-center justify-center ${
                selectedTags.includes(tag)
                  ? "bg-purple-800 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleFilter}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out"
      >
        Filter
      </button>
    </div>
  );
};

export default FilterDropDown;
