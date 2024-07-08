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
      className="dark:bg-gray-600 bg-white text-black dark:text-white hover:bg-gray-950 font-bold py-2 px-4 rounded"
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
  