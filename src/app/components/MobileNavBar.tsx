import React from "react";
import menu from "../../../public/menu.svg";
import logo from "../../../public/logo.svg";
import Image from "next/image";

const MobileNavBar = () => {
  return (
    <div className="bg-[#f1d858] flex justify-between items-center rounded-[5px] md:hidden px-1">
      <div>
        <Image src={menu} alt="" />
      </div>
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
