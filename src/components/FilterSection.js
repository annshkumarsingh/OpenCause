"use client"

import { useEffect } from "react";
import { X } from "lucide-react";


const FilterSection = (props) => {

    const { category, onCategoryChange, status, onStatusChange } = props;

    const categoryList = [
        "Environment & Conservation",
        "Hunger & Poverty Relief",
        "Health & Medical Aid",
        "Disaster & Emergency Relief",
        "Women & Children Welfare",
        "Education & Skills Development",
        "Animals & Wildlife Protection",
        "Individual Fundraisers"
    ]

    return (
        <div className="w-full md:w-1/4 bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Apply Filters</h3>
            <div className="space-y-4">

                {/* Category Section */}
                <div>
                    <div className="flex justify-between items-center">
                        <h4 className="text-gray-700 font-medium mb-2">Select Category</h4>
                        {category && (
                            <button
                                onClick={() => onCategoryChange("")}
                                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
                                title="Clear category filter"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    <div className="space-y-2">
                        {categoryList.map((cat) => (
                            <label
                                key={cat}
                                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${cat === category ? "bg-emerald-50 border border-emerald-200" : "hover:bg-emerald-50"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    checked={cat === category}
                                    onChange={() => onCategoryChange(cat)}
                                    className="accent-emerald-500"
                                />
                                <span className="text-gray-700">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Status Section */}
                <div>
                    <div className="flex justify-between items-center">
                        <h4 className="text-gray-700 font-medium mb-2">Select Status</h4>
                        {status && (
                            <button
                                onClick={() => onStatusChange("")}
                                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
                                title="Clear status filter"
                            >
                                <X size={16} />
                            </button>
                        )}

                    </div>
                    <div className="space-y-2">
                        {["Verified Causes", "All Causes"].map((st) => (
                            <label
                                key={st}
                                className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${st === status ? "bg-emerald-50 border border-emerald-200" : "hover:bg-emerald-50"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    checked={st === status}
                                    onChange={() => onStatusChange(st)}
                                    className="accent-emerald-500"
                                />
                                <span className="text-gray-700">{st}</span>
                            </label>
                        ))}
                    </div>
                </div>

            </div>
        </div >
    )
}

export default FilterSection
