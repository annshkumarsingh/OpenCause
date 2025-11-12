"use client"

import React from 'react'
import Link from 'next/link'
import Login_Button from './Login_Button'
import { usePathname } from 'next/navigation'
import '@/components/Navbar.css'

const Navbar = () => {

  let pathname = usePathname();

  return (
    <nav className='flex items-center h-[50px] w-full fixed top-0 bg-gray-100 z-50'>

      <div className='w-1/3 flex justify-center items-center text-gray-500 text-2xl h-[100%]'>Open<span className='font-extrabold text-emerald-600'>Cause</span></div>

      <ul className=' w-2/3 flex justify-evenly items-center h-[100%]'>
        <Link
          href="/"
          className={`navLinks ${pathname === '/' ? 'text-emerald-600 font-semibold border-b-2 border-emerald-500' : ''}`}
        >
          Home
        </Link>
        <Link
          href="/causes"
          className={`navLinks ${pathname === '/causes' ? 'text-emerald-600 font-semibold border-b-2 border-emerald-500' : ''}`}
        >
          Causes
        </Link>
        <Link
          href="/impact"
          className={`navLinks ${pathname === '/impact' ? 'text-emerald-600 font-semibold border-b-2 border-emerald-500' : ''}`}
        >
          Impact
        </Link>
        <Login_Button className="navLinks" />
      </ul>

    </nav>
  )
}

export default Navbar
