"use client"

import { useState } from "react"

const Searchbar = ({searchTerm, onSearchChange}) => {

    const handleSearch = (e) => {
        onSearchChange(e.target.value);
    }

    return (
        <div className="w-full flex justify-center mb-8">
            <div className="relative w-3/4 md:w-2/3">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search charities by name..."
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-800"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.65 6.65a7.5 7.5 0 016 10.1z"
                    />
                </svg>
            </div>
        </div>
    )
}

export default Searchbar
