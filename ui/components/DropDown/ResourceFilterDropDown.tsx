"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Filter {
  year: string;
  department: string;
  tags: string[];
}

interface Props {
  onFilter: (filter: Filter) => void;
}

const ResourceFilterDropDown = ({ onFilter }: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [tagsRes, yearsRes, departmentsRes] = await Promise.all([
        axios.get("/api/tags"),
        axios.get("/api/years"),
        axios.get("/api/departments"),
      ]);

      setTags(tagsRes.data.map((tag: any) => tag.name));
      setYears(yearsRes.data.map((year: any) => year.toString()));
      setDepartments(departmentsRes.data.map((dept: any) => dept.name));
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    const filter: Filter = {
      year: selectedYear,
      department: selectedDepartment,
      tags: selectedTags,
    };
    onFilter(filter);
  };

  return (
    <div>
      <select onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">Select Year</option>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select onChange={(e) => setSelectedDepartment(e.target.value)}>
        <option value="">Select Department</option>
        {departments.map((dept, index) => (
          <option key={index} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <select
        multiple
        value={selectedTags}
        onChange={(e) => {
          const options = e.target.options;
          const value: string[] = [];
          for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
              value.push(options[i].value);
            }
          }
          setSelectedTags(value);
        }}
      >
        {tags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default ResourceFilterDropDown;
