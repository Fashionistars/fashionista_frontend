import Image from "next/image";
import React from "react";
import empty from "../../../../public/empty.svg";
import Link from "next/link";

const page = () => {
  return (
    <div className="px-5">
      <div>
        <h3 className="font-bon_foyage w-1/2 text-[40px] leading-[39.68px] md:text-[90px]  md:leading-[89px] text-black md:w-[380px]">
          Your Cart
        </h3>
        <p className="font-satoshi font-medium text-xs text-[#4E4E4E]">
          You have no product in your cart
        </p>
      </div>
      <div className="flex justify-center py-8 items-center">
        <Image src={empty} alt="" />
      </div>
      <div className="w-full h-[327px] flex flex-col justify-between font-satoshi border-[0.74px] border-[#d9d9d9] p-4">
        <div>
          <p className="font-medium text-[17.69px] leading-6 py-2 border-b-[1.11px] border-[#d9d9d9] text-black">
            Order Summary
          </p>
          <p className="uppercase py-2 font-satoshi font-medium text-xs text-black">
            YOUR CART IS EMPTY
          </p>
        </div>
        <div className="flex justify-center w-full h-11">
          <Link
            href="/"
            className="font-satoshi font-bold text-[15px] text-center flex justify-center items-center leading-5 text-black bg-[#fda600] w-full h-full"
          >
            {" "}
            START SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
