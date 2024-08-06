"use client";

import React, { useEffect } from 'react';
import { useUserStore } from '@/store/user-store';
import { FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
  const {
    profilePicture,
    firstName,
    lastName,
    getProfile,
  } = useUserStore();

  useEffect(() => {
    getProfile(); // Ensure this is the correct function to call
  }, [getProfile]);

  return (
    <nav className='backdrop-blur-xl fixed top-0 w-full py-4 z-50  text-white'>
      <div className='container mx-auto flex items-center justify-between'>
        <h1 className='text-xl font-bold'>Schola Sphere</h1>
        <ul className='flex space-x-6'>
          <li>
            <a href="/home" className='hover:text-gray-400'>Home</a>
          </li>
          <li>
            <a href="/book" className='hover:text-gray-400'>Book</a>
          </li>
          <li>
            <a href="#video" className='hover:text-gray-400'>Video</a>
          </li>
          <li>
            <a href="#exams" className='hover:text-gray-400'>Exams</a>
          </li>
        </ul>
        <div className='flex items-center space-x-2'>
          <a href='/profile' className='flex items-center space-x-2'>
            <div className='relative rounded-full border-2 border-white overflow-hidden w-10 h-10 bg-cyan-300 flex items-center justify-center'>
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className='w-full h-full object-cover'
                />
              ) : (
                <FaUserCircle className='text-white text-3xl' />
              )}
            </div>
            <p className='text-white text-lg'>{firstName}</p>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
