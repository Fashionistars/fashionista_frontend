"use client";
import React, { useState, useEffect } from "react";
import menu from "../../../public/menu.svg";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavBar = () => {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState<boolean>(false);
  useEffect(() => {
    setShowNav(false);
  }, [pathname]);
  return (
    <div className="bg-[#f1d858] flex justify-between items-center rounded-[5px] md:hidden px-1">
      <div
        className={`absolute top-0 w-4/5 transition-all ease-in-out duration-150 min-h-screen ${
          showNav ? "left-0" : "-left-[100%]"
        }`}
      >
        <nav className="z-50 relative  flex  flex-col justify-between bg-[#fda600] px-4 py-6 font-satoshi w-full h-screen">
          <button
            onClick={() => setShowNav(false)}
            className=" absolute right-6 top-6 w-6 h-6 flex justify-center items-center"
          >
            <svg
              className="w-[50px] h-[50xp] text-[#484848] "
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M34.6383 17.1375L32.8633 15.3625L25.0008 23.2375L17.1383 15.3625L15.3633 17.1375L23.2383 25L15.3633 32.8625L17.1383 34.6375L25.0008 26.7625L32.8633 34.6375L34.6383 32.8625L26.7633 25L34.6383 17.1375Z"
                fill="currentColor"
              />
              <circle cx="25" cy="25" r="24.5" stroke="currentColor" />
            </svg>
          </button>
          <Link
            href="/"
            className={`text-lg leading-6  hover:text-white ${
              pathname === "/"
                ? "text-white font-bold"
                : "text-black font-medium "
            } `}
          >
            Home
          </Link>
          <Link
            href="/about-us"
            className={`text-lg leading-6  hover:text-white ${
              pathname === "/about-us"
                ? "text-white font-bold"
                : "text-black font-medium "
            } `}
          >
            About
          </Link>
          <Link
            href="/categories"
            className={`text-lg leading-6  hover:text-white ${
              pathname === "/categories"
                ? "text-white font-bold"
                : "text-black font-medium "
            } `}
          >
            Categories
          </Link>
          <Link
            href="/vendor"
            className={`text-lg leading-6  hover:text-white ${
              pathname === "/vendor"
                ? "text-white font-bold"
                : "text-black font-medium "
            } `}
          >
            Vendors
          </Link>
          <Link
            href="/shops"
            className={`text-lg leading-6  hover:text-white ${
              pathname === "/shops"
                ? "text-white font-bold"
                : "text-black font-medium "
            } `}
          >
            Shops
          </Link>
          <Link
            href="/collections"
            className={`text-lg leading-6  hover:text-white ${
              pathname === "/collections"
                ? "text-white font-bold"
                : "text-black font-medium "
            } `}
          >
            Collections
          </Link>
          <Link
            href="/testimonails"
            className={`text-lg leading-6  hover:text-white ${
              pathname === "/testimonails"
                ? "text-white font-bold"
                : "text-black font-medium "
            } `}
          >
            Testimonials
          </Link>
          <Link
            href="/contact-us"
            className={`text-lg leading-6  hover:text-white ${
              pathname === "/contact-us"
                ? "text-white font-bold"
                : "text-black font-medium "
            } `}
          >
            Contact Us
          </Link>
          <Link
            href="/shops"
            className={`text-lg leading-6  hover:text-white ${
              pathname === "/blog"
                ? "text-white font-bold"
                : "text-black font-medium "
            } `}
          >
            Blog
          </Link>

          {/* <div className="flex flex-col">
            <div className="flex items-center">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.75 15C18.75 13.6193 19.8693 12.5 21.25 12.5C24.0114 12.5 26.25 14.7386 26.25 17.5C26.25 20.2614 24.0114 22.5 21.25 22.5C19.8693 22.5 18.75 21.3807 18.75 20V15Z"
                  stroke="black"
                  stroke-width="1.5"
                />
                <path
                  d="M11.25 15C11.25 13.6193 10.1307 12.5 8.75 12.5C5.98857 12.5 3.75 14.7386 3.75 17.5C3.75 20.2614 5.98857 22.5 8.75 22.5C10.1307 22.5 11.25 21.3807 11.25 20V15Z"
                  stroke="black"
                  stroke-width="1.5"
                />
                <path
                  d="M3.75 17.5V13.75C3.75 7.5368 8.7868 2.5 15 2.5C21.2133 2.5 26.25 7.5368 26.25 13.75V19.8077C26.25 22.3181 26.25 23.5733 25.8095 24.5521C25.3081 25.6661 24.4161 26.5581 23.3021 27.0595C22.3233 27.5 21.0681 27.5 18.5577 27.5H15"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="font-medium text-xl px-2 leading-[27px] text-black w-[127px]">
                +234 90 0000 000
              </span>
            </div>

            <div className="flex justify-end ">
              <span className="text-black pr-2 leading-4 text-xs font-medium ">
                24/7 support center
              </span>
            </div>
          </div> */}
        </nav>
      </div>
      <button
        onClick={() => setShowNav(true)}
        className="w-[34px] h-[34px] flex justify-center  items-center bg-[#F4F3EC] border-[0.8px] border-black rounded-full"
      >
        <Image src={menu} alt="" />
      </button>
      <div className="flex items-center">
        <Image src="/logo.svg" alt="logo" width={39} height={38} />
        <h2 className="font-bon_foyage px-3 text-2xl leading-6 text-black">
          Fashionistar
        </h2>
      </div>
      <div className="flex items-center gap-1">
        <button className="w-[34px] h-[34px] flex justify-center  items-center bg-[#F4F3EC] border-[0.8px] border-black rounded-full">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5969 1.99561C11.5857 0.761924 9.8303 1.25908 8.7758 2.05101C8.34335 2.37572 8.1272 2.53807 8 2.53807C7.8728 2.53807 7.65665 2.37572 7.2242 2.05101C6.16971 1.25908 4.41432 0.761924 2.40308 1.99561C-0.236448 3.61471 -0.83371 8.95618 5.25465 13.4626C6.41429 14.3209 6.9941 14.75 8 14.75C9.0059 14.75 9.58572 14.3209 10.7454 13.4626C16.8337 8.95618 16.2364 3.61471 13.5969 1.99561Z"
              stroke="black"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <button className="w-[34px] h-[34px] flex justify-center  items-center bg-[#F4F3EC] border-[0.8px] border-black rounded-full">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H11.4474C14.8131 12 15.325 9.8856 15.9458 6.80181C16.1249 5.91233 16.2144 5.4676 15.9991 5.1713C15.7838 4.875 15.371 4.875 14.5456 4.875H4.5"
              stroke="black"
              stroke-linecap="round"
            />
            <path
              d="M6 12L4.03405 2.6362C3.86711 1.96844 3.26714 1.5 2.57884 1.5H1.875"
              stroke="black"
              stroke-linecap="round"
            />
            <path
              d="M6.66 12H6.35143C5.32891 12 4.5 12.8635 4.5 13.9285C4.5 14.1061 4.63815 14.25 4.80857 14.25H13.125"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.875 16.5C8.49632 16.5 9 15.9963 9 15.375C9 14.7537 8.49632 14.25 7.875 14.25C7.25368 14.25 6.75 14.7537 6.75 15.375C6.75 15.9963 7.25368 16.5 7.875 16.5Z"
              stroke="black"
            />
            <path
              d="M13.125 16.5C13.7463 16.5 14.25 15.9963 14.25 15.375C14.25 14.7537 13.7463 14.25 13.125 14.25C12.5037 14.25 12 14.7537 12 15.375C12 15.9963 12.5037 16.5 13.125 16.5Z"
              stroke="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MobileNavBar;
