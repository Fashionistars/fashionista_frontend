import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex flex-col place-items-center">
        <h2 className="font-satoshi font-medium text-3xl leading-10 text-black">
          Verification
        </h2>
        <p className="font-satoshi py-3 text-[15px] leading-5 text-[#282828]">
          Enter the four-digit pin send to you for verification
        </p>
      </div>
      <form>
        <div>
          <p className="flex items-center justify-start w-full max-w-[423px] gap-2 p-2">
            <label
              htmlFor="email"
              className="text-[15px] leading-5 text-[#101010] cursor-pointer"
            >
              Enter Pin
            </label>
          </p>
        </div>
      </form>
    </div>
  );
};

export default page;
