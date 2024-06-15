import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-8 text-lg font-semibold">
          <li className="hover:text-gray-400 transition duration-300">
            <a href="#">Book</a>
          </li>
          <li className="hover:text-gray-400 transition duration-300">
            <a href="#">Video</a>
          </li>
          <li className="hover:text-gray-400 transition duration-300">
            <a href="#">Quiz</a>
          </li>
        </ul>
        <div>
          <input
            type="text"
            placeholder="Enter Resource Name"
            className="p-2 rounded bg-gray-800 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:border-gray-400 transition duration-300"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
