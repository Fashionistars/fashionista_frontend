"use client";
import React, { useState } from "react";

const Collapsible = ({ title, text, setIsOpen, isOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col w-full gap-0.5 ">
      <div className="flex justify-between md:gap-[100px] md:px-8 px-2 w-full h-[72px] items-center bg-white box_shadow rounded-[20px] box_collapse ">
        <h2 className="text-black text-[15px] font-[mulish]">{title}</h2>
        <button
          className={`transition duration-200 outline-none ${
            isOpen ? "rotate-90 " : "rotate-45 "
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
          >
            <path
              d="M37.25 20.751L20.7508 37.2501"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.75 20.751L37.2492 37.2501"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      {isOpen ? (
        <div className="p-8 bg-white box_collapse rounded-[20px] w-full">
          {" "}
          <p className="text-[13px] text-[#222] capitalize">{text}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Collapsible;
