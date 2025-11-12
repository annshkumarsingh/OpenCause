"use client"

import PayButton from "@/components/PayButton"
import { useState } from "react";

const CharityCard = ({ title, desc, website, img }) => {

  const [amount, setAmount] = useState(0);

  const handleToggle = (amt) => {
    if(amt !== amount) setAmount(amt);
    else setAmount(0);
  }

  return (
    <>
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
      <div className="flex flex-col sm:flex-row w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden my-4 border border-gray-200 h-[360px] sm:h-[180px]">
        {/* Image Section */}
        <div className="w-full sm:w-1/5 h-[50%] sm:h-full overflow-hidden flex justify-center items-center bg-gray-50">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-fill hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between p-5 sm:w-2/3 h-full">
          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-600 text-sm leading-snug line-clamp-3">
              {desc}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-3">
            <a
              href={website.startsWith('http') ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"

              className="flex flex-row justify-center items-center px-4 py-1.5 text-amber-600 hover:text-amber-500 rounded-md text-md font-medium transition-colors duration-200"
            >
              Official Website
              <lord-icon
                src="https://cdn.lordicon.com/gsjfryhc.json"
                trigger="hover"
                colors="primary:#D97706,secondary:#D97706"
                style={{ width: "30px", height: "30px" }}
              />
            </a>

            <div className="flex gap-2">
              {[100, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleToggle(amt)}
                  className={`px-3 py-1 rounded-md text-sm border ${amount === amt ? "bg-emerald-400 text-white" : "border-gray-300"
                    }`}
                >
                  ₹{amt}
                </button>
              ))}
              <PayButton amount={amount} charity={title} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharityCard;
