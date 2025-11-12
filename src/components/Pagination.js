"use client"

import { useState, useEffect } from "react"

const Pagination = ({ currPage, totalPages, onPageChange }) => {

    const [pageArr, setPageArr] = useState([1]);

    const endPage = totalPages;

    const generatePages = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currPage <= 3) return [1, 2, 3, 4, 5];
        if (currPage >= totalPages - 2)
            return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [currPage - 2, currPage - 1, currPage, currPage + 1, currPage + 2];
    };

    useEffect(() => {
        setPageArr(generatePages());
    }, [currPage, totalPages])

    const handleClick = (page) => {
        onPageChange(page);
    }

    const handleDec = () => {
        if (currPage > 1) onPageChange(currPage - 1);
    }

    const handleInc = () => {
        if (currPage < totalPages) onPageChange(currPage + 1);
    }

    return (
        <div className="flex justify-center mt-10 flex-wrap gap-2">
            <button onClick={handleDec} disabled={currPage === 1} className="disabled:opacity-35">
                ←
            </button>
            {pageArr.map((page) => (
                <button
                    key={page}
                    onClick={() => { handleClick(page) }}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all
        ${page === currPage
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : "bg-white text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                        }`}
                >
                    {page}
                </button>
            ))}
            <button onClick={handleInc} disabled={currPage === totalPages} className="disabled:opacity-35">
                →
            </button>
        </div>
    )
}

export default Pagination;