"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import google from "../../../../../public/google.svg";

const Page = () => {
  const [isEmail, setIsEmail] = useState(true);
  return (
    <div className="font-satoshi flex flex-col items-center justify-evenly h-full bg-white">
      <div className="flex flex-col place-items-center">
        <h2 className="font-satoshi font-medium text-3xl leading-10 text-black">
          Sign Up
        </h2>
        <p className="font-satoshi py-3 text-[15px] leading-5 text-[#282828]">
          Already have an account? <Link href="/login">Login </Link>
        </p>
      </div>
      <form className="w-full flex flex-col items-center gap-6">
        <div className="w-full flex flex-col items-center">
          <p className="flex items-center justify-start w-full max-w-[423px] gap-4 p-2">
            <label
              htmlFor="email"
              onClick={() => setIsEmail(true)}
              className={`text-[15px] leading-5 hover:text-black cursor-pointer ${
                isEmail
                  ? "text-black font-medium border-b-2 border-black/60"
                  : "text-black/60 font-light"
              }`}
            >
              Email
            </label>
            <label
              htmlFor="phone_number"
              onClick={() => setIsEmail(false)}
              className={`text-[15px] leading-5 hover:text-black cursor-pointer transition-colors ${
                !isEmail
                  ? "text-black font-medium border-b-2 border-black/60"
                  : "text-black/60 font-light"
              }`}
            >
              Phone number
            </label>
          </p>
          <input
            type="text"
            name={isEmail ? "email" : "phone_number"}
            className="max-w-[423px] box-border w-full bg-white border-[1.5px] outline-none border-[#D9D9D9] rounded-[70px] px-3 py-4"
            placeholder={
              isEmail ? "eg: mystoreemail@email.com" : "eg: 09012345678"
            }
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <p className="flex items-center justify-start w-full max-w-[423px] gap-2 p-2">
            <label
              htmlFor="email"
              className="text-[15px] leading-5 text-[#101010] cursor-pointer"
            >
              Password
            </label>
          </p>
          <input
            type="password"
            name="password"
            className="max-w-[423px] box-border bg-white outline-none w-full border-[1.5px] border-[#D9D9D9] rounded-[70px] px-3 py-4"
            placeholder="Enter password "
          />
        </div>
        <button className="bg-[#FDA600] shd w-full outline-none max-w-[423px] py-[17px] text-white text-lg font-bold rounded-[70px]">
          Continue
        </button>
        <div className="w-full max-w-[423px] flex items-center gap-3 ">
          <span className="w-1/2 h-[1px] bg-[#D9D9D9]" />
          <span className="text-[13px] text-[#282828] leading-[17.55px]">
            Or
          </span>
          <span className="w-1/2 h-[1px] bg-[#D9D9D9]" />
        </div>
        <button className="bg-[#fff] w-full max-w-[423px] outline-none border-[1.2px] border-[#D9D9D9] shd  flex items-center justify-center gap-3 py-[17px] text-[#282828] text-lg font-medium leading-6 rounded-[70px]">
          <Image src={google} alt="google" />
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Page;
