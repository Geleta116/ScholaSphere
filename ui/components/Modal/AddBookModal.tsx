import React from "react";
import { useFilterStore } from "@/store/filter-store";

const AddBookModal = () => {
  const { tags, years, departments, courses } = useFilterStore();

  return (
    <div>
      <input type="file" />
      <input type="text" placeholder="Book Title" />
      <textarea placeholder="Description"></textarea>
      <select >
        
        </select>

    </div>
  );
};

export default AddBookModal;
