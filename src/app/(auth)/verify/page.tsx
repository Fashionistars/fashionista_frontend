import React from "react";
import VerificationInput from "@/app/components/VerifyInput";
import { verify } from "@/app/actions/auth";

const page = () => {
  return (
    <div className="space-y-8 flex flex-col justify-center gap-10 h-screen">
      <div className="flex flex-col place-items-center">
        <h2 className="font-satoshi font-medium text-3xl leading-10 text-black">
          Verification
        </h2>
        <p className="font-satoshi py-3 text-[15px] leading-5 text-[#282828]">
          Enter the four-digit pin send to you for verification
        </p>
      </div>
      <form action={verify} className="flex flex-col items-center gap-10">
        <div className="flex flex-col justify-center mx-auto">
          <p className="flex items-center justify-start w-full max-w-[423px] gap-2 p-2">
            <label
              htmlFor="pin"
              className="text-[15px] leading-5 text-[#101010] cursor-pointer"
            >
              Enter Pin
            </label>
          </p>
          <VerificationInput />
        </div>
        <button className="bg-[#FDA600] shd w-full outline-none max-w-[423px] py-[17px] text-white text-lg font-bold rounded-[70px]">
          Continue
        </button>
      </form>
    </div>
  );
};

export default page;