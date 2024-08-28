import React from "react";
import Link from "next/link";
import Image from "next/image";
import girl from "../../../../../public/girl.png";

const page = () => {
  const date = new Date();

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h3 className="font-satoshi font-medium text-2xl leading-10 text-[#1D2329]">
          Dashboard
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex justify-center items-center">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.66666 0.833252C6.1269 0.833252 6.5 1.20635 6.5 1.66659V2.49992H11.5V1.66659C11.5 1.20635 11.8731 0.833252 12.3333 0.833252C12.7936 0.833252 13.1667 1.20635 13.1667 1.66659V2.49992H14C15.8409 2.49992 17.3333 3.9923 17.3333 5.83325V14.9999C17.3333 16.8409 15.8409 18.3333 14 18.3333H4C2.15905 18.3333 0.666664 16.8409 0.666664 14.9999V5.83325C0.666664 3.9923 2.15905 2.49992 4 2.49992H4.83333V1.66659C4.83333 1.20635 5.20643 0.833252 5.66666 0.833252ZM11.5 4.16659C11.5 4.62682 11.8731 4.99992 12.3333 4.99992C12.7936 4.99992 13.1667 4.62682 13.1667 4.16659H14C14.9205 4.16659 15.6667 4.91278 15.6667 5.83325V6.24992H2.33333V5.83325C2.33333 4.91278 3.07952 4.16659 4 4.16659H4.83333C4.83333 4.62682 5.20643 4.99992 5.66666 4.99992C6.1269 4.99992 6.5 4.62682 6.5 4.16659H11.5ZM15.6667 7.91658H2.33333V14.9999C2.33333 15.9204 3.07952 16.6666 4 16.6666H14C14.9205 16.6666 15.6667 15.9204 15.6667 14.9999V7.91658Z"
                fill="#344054"
              />
            </svg>
          </div>
          <div>
            <p>Today's date</p>
            <span>{date.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-[48%] lg:w-[32%] h-[170px] bg-[#fff] rounded-[10px] shadow p-5 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center w-[45px] h-[45px] bg-[#C5FECB] rounded-full">
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.125 2.25V4.5M13.5 2.25V4.5M7.875 2.25V4.5"
                  stroke="#20AB2C"
                  strokeWidth="1.43431"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.9375 14.625V10.125C3.9375 6.94302 3.9375 5.35203 4.92602 4.36351C5.91453 3.375 7.50552 3.375 10.6875 3.375H16.3125C19.4944 3.375 21.0854 3.375 22.074 4.36351C23.0625 5.35203 23.0625 6.94302 23.0625 10.125V14.625C23.0625 17.8069 23.0625 19.3979 22.074 20.3865C21.0854 21.375 19.4944 21.375 16.3125 21.375H10.6875C7.50552 21.375 5.91453 21.375 4.92602 20.3865C3.9375 19.3979 3.9375 17.8069 3.9375 14.625Z"
                  stroke="#20AB2C"
                  strokeWidth="1.43431"
                />
                <path
                  d="M3.9375 18V10.125C3.9375 6.94302 3.9375 5.35203 4.92602 4.36351C5.91453 3.375 7.50552 3.375 10.6875 3.375H16.3125C19.4944 3.375 21.0854 3.375 22.074 4.36351C23.0625 5.35203 23.0625 6.94302 23.0625 10.125V18C23.0625 21.1819 23.0625 22.7729 22.074 23.7615C21.0854 24.75 19.4944 24.75 16.3125 24.75H10.6875C7.50552 24.75 5.91453 24.75 4.92602 23.7615C3.9375 22.7729 3.9375 21.1819 3.9375 18Z"
                  stroke="#20AB2C"
                  strokeWidth="1.43431"
                />
                <path
                  d="M9 16.875H13.5M9 11.25H18"
                  stroke="#20AB2C"
                  strokeWidth="1.43431"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <span className="font-satoshi text-xl text-black">Orders</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-satoshi space-x-2 ">
              <span className="font-medium text-[40px] leading-[54px] text-[#000]">
                12
              </span>
              <span className="text-[#858585]">Unfulfilled</span>
            </p>
            <Link
              href="/"
              className="py-1.5 px-2.5 bg-[#f6f6f6] rounded-[20px] font-bold font-satoshi text-sm text-[#5A6465]"
            >
              See all &#8594;
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[48%] lg:w-[32%] h-[170px] bg-[#fff] rounded-[10px] shadow p-5 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center w-[45px] h-[45px] bg-[#FEF3D3] rounded-full">
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4435 3.8747L17.4233 7.86699C17.6933 8.42273 18.4132 8.95578 19.0207 9.05786L22.609 9.65897C24.9038 10.0446 25.4438 11.7232 23.7901 13.3791L21.0005 16.1918C20.528 16.6681 20.2694 17.5868 20.4155 18.2447L21.2142 21.7266C21.8441 24.4826 20.393 25.5487 17.9746 24.1083L14.6112 22.1008C14.0038 21.7379 13.0026 21.7379 12.3839 22.1008L9.02055 24.1083C6.61331 25.5487 5.15098 24.4712 5.78091 21.7266L6.57957 18.2447C6.7258 17.5868 6.46708 16.6681 5.99463 16.1918L3.20494 13.3791C1.56262 11.7232 2.09132 10.0446 4.38606 9.65897L7.97442 9.05786C8.5706 8.95578 9.29052 8.42273 9.56049 7.86699L11.5402 3.8747C12.6201 1.70843 14.3749 1.70843 15.4435 3.8747Z"
                  fill="#ECB219"
                />
              </svg>
            </div>

            <span className="font-satoshi text-xl text-black">
              Shipping Address
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-satoshi space-x-2 ">
              {/* <span className="font-medium text-[40px] leading-[54px] text-[#000]">
                4.5
              </span> */}
              <span className="text-[#858585]">
                512 Alfred Ave. Lagos. Nigeria
              </span>
            </p>
            <Link
              href="/"
              className="py-1.5 px-2.5 bg-[#f6f6f6] rounded-[20px] font-bold font-satoshi text-sm text-[#5A6465]"
            >
              See all &#8594;
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[48%] lg:w-[32%] h-[170px] bg-[#fff] rounded-[10px] shadow p-5 flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center w-[45px] h-[45px] bg-[#FEF3D3] rounded-full">
              <svg
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4435 3.8747L17.4233 7.86699C17.6933 8.42273 18.4132 8.95578 19.0207 9.05786L22.609 9.65897C24.9038 10.0446 25.4438 11.7232 23.7901 13.3791L21.0005 16.1918C20.528 16.6681 20.2694 17.5868 20.4155 18.2447L21.2142 21.7266C21.8441 24.4826 20.393 25.5487 17.9746 24.1083L14.6112 22.1008C14.0038 21.7379 13.0026 21.7379 12.3839 22.1008L9.02055 24.1083C6.61331 25.5487 5.15098 24.4712 5.78091 21.7266L6.57957 18.2447C6.7258 17.5868 6.46708 16.6681 5.99463 16.1918L3.20494 13.3791C1.56262 11.7232 2.09132 10.0446 4.38606 9.65897L7.97442 9.05786C8.5706 8.95578 9.29052 8.42273 9.56049 7.86699L11.5402 3.8747C12.6201 1.70843 14.3749 1.70843 15.4435 3.8747Z"
                  fill="#ECB219"
                />
              </svg>
            </div>

            <span className="font-satoshi text-xl text-black">
              Wallet Balance
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-satoshi space-x-2 ">
              <span className="font-medium text-[40px] leading-[54px] text-[#000]">
                $12
              </span>
              <span className="text-[#858585]">Balance</span>
            </p>
            <Link
              href="/"
              className="py-1.5 px-2.5 bg-[#f6f6f6] rounded-[20px] font-bold font-satoshi text-sm text-[#5A6465]"
            >
              See all &#8594;
            </Link>
          </div>
        </div>
      </div>
      <div
        className="w-full h-[440px] bg-[#EDE7D9] p-[70px] space-y-3 relative overflow-hidden"
        style={{ boxShadow: "0px 0px 8.48px 0px #D9D9D940" }}
      >
        <p className="font-bon_foyage text-[52px] leading-[52px] text-black max-w-[480px]">
          Stay home and get the best fashion outfit from us
        </p>
        <p className="font-satoshi text-black">
          Start your daily shopping with
          <span className="text-[#fda600] font-medium text-lg">
            {" "}
            Fashionistar
          </span>
        </p>
        <form className="flex items-center h-12 w-[503px]">
          <input
            type="email"
            className="h-full w-3/4 placeholder:text-[#A1a1a1] text-xs px-3"
            placeholder="Email address"
          />
          <button className="h-full w-1/4 px-4 bg-[#fda600] text-white font-medium text-sm font-satoshi">
            Subscribe
          </button>
        </form>
        <div className="w-full h-full absolute top-0 ">
          <Image
            src={girl}
            width={600}
            height={600}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
