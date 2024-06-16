"use client";

import React from "react";

interface PrimaryButtonProps {
  title: string;
  type?: "button" | "submit" | "reset"; // Ensure you can pass the button type
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className="dark:bg-purple-800 bg-white text-black dark:text-white hover:bg-blue-700 font-bold py-2 px-4 rounded"
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
  