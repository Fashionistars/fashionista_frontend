"use client";
import React from "react";
import TopBanner from "@/app/components/TopBanner";
import Link from "next/link";
import { useParams } from "next/navigation";

const page = () => {
  const searchParams = useParams();
  return (
    <div className="flex flex-col gap-10">
      <TopBanner title="Orders" />
      <div className="px-5 md:px-10 ">
        <div className="flex items-center  w-1/3 h-[60px] bg-white border  border-[#d9d9d9] px-4 gap-6 rounded-[5px]">
          <span className="block transition-all peer-focus:hidden">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.125 13.125L16.5 16.5"
                stroke="#282828"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 8.25C15 4.52208 11.978 1.5 8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.978 4.52208 15 8.25 15C11.978 15 15 11.978 15 8.25Z"
                stroke="#282828"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <input
            type="search"
            placeholder="Search order ID"
            className="w-full h-full bg-inherit outline-none focus:outline-none peer"
          />
        </div>
        <div>
          <nav className="flex items-center font-satoshi font-medium text-black">
            <Link
              href="/orders"
              className=" grow-0 order-[0] py-2 px-4 bg-[#fda600] rounded-[30px]"
            >
              All(5)
            </Link>
            <Link
              href="/orders?order-status=pending"
              className={`grow-0 order-[0] py-2 px-4 bg-[#fda600] rounded-[30px]`}
            >
              Pending
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default page;
