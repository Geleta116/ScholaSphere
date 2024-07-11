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
      className="bg-gray-950  text-black dark:text-white hover:bg-purple-700 font-bold py-2 px-4 rounded"
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
  