"use client";
import React, { useRef } from "react";
import { category } from "../utils/mock";
import Image from "next/image";
import arrow from "../../../public/arrows.svg";

const CategoryScroll = () => {
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 400;
  const scrollLeft = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const categories = category.map((cat) => {
    return (
      <div className="relative group">
        <Image
          src={cat.image}
          alt=""
          className="aspect-square object-cover w-full"
        />
        <span className="absolute bottom-6 left-5 text-[32px] font-bon_foyage leading-[32px] text-white group-hover:text-[#fda600] ">
          {cat.title}
        </span>
      </div>
    );
  });
  return (
    <>
      <div className="flex items-center gap-2 absolute top-16 right-0 pr-28">
        <button
          className="w-[50px] h-[50px] rounded-full "
          onClick={scrollLeft}
        >
          <Image src={arrow} alt="" />
        </button>
        <button
          className="w-[50px] h-[50px] rounded-full"
          onClick={scrollRight}
        >
          <Image src={arrow} alt="" className="scale-x-[-1]" />
        </button>
      </div>
      <div
        ref={categoryScrollRef}
        className="grid hide_scrollbar grid-flow-col gap-4 auto-cols-[33%] md:auto-cols-[23%] overflow-x-auto overscroll-contain pl-28 "
      >
        {categories}
      </div>
    </>
  );
};

export default CategoryScroll;
