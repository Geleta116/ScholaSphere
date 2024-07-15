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

  return (
    <div>
      <select
        onChange={(e) => {
          setSelectedYear(parseInt(e.target.value));
          fetchFilteredBooks();
        }}
      >
        <option value="">Select Year</option>
        {years.map((year: number, index: number) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => {
          setSelectedDepartment(e.target.value);
          fetchFilteredBooks();
        }}
      >
        <option value="">Select Department</option>
        {departments.map((dept: string, index: number) => (
          <option key={index} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => {
          setSelectedCourse(e.target.value);
          fetchFilteredBooks();
        }}
      >
        <option value="">Select Course</option>
        {courses.map((course: string, index: number) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>

      <div>
        {/* {tags.map((tag:string, index:number) => (
          <label key={index}>
            <input
              type="checkbox"
              value={tag}
              checked={selectedTags.includes(tag)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedTags((prev) =>
                  e.target.checked
                    ? [...prev, value]
                    : prev.filter((t) => t !== value)
                );
              }}
            />
            {tag}
          </label>
        ))} */}
      </div>
    </div>
  );
};

export default FilterDropDown;
