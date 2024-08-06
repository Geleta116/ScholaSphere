import React from 'react'
import Profile from '../Profile'

const NavBar = () => {
  return (
    <nav className='backdrop-blur-xl fixed top-0  text-white w-full py-4 z-50 '>
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
        <Profile />
      </div>
    </nav>
  )
}

export default NavBar
