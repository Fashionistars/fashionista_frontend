import React from "react";

const page = () => {
  return (
    <div className="px-5 md:h-screen lg:px-28 flex flex-col justify-center gap-10">
      <div className="flex flex-col place-items-center">
        <h2 className="font-satoshi font-medium text-3xl leading-10 text-black">
          Password Recovery
        </h2>
        <p className="font-satoshi py-3 text-[15px] leading-5 text-[#282828]">
          Enter your email address to recover your password
        </p>
      </div>
      <form>
        <div className="w-full flex flex-col items-center relative pb-7">
          <p className="flex items-center justify-start w-full max-w-[423px] gap-2 p-2">
            <label
              htmlFor="email"
              className="text-[15px] leading-5 text-[#101010] cursor-pointer"
            >
              Email Address
            </label>
          </p>
          <input
            type="email"
            name="email"
            id="email"
            className="max-w-[423px] box-border bg-white outline-none w-full border-[1.5px] border-[#D9D9D9] rounded-[70px] p-4"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <button className="bg-[#FDA600] shd w-full outline-none max-w-[423px] py-[17px] text-white text-lg font-bold rounded-[70px]">
          Continue
        </button>
      </form>
    </div>
  );
};

export default page;
