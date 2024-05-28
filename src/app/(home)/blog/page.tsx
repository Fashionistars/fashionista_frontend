import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "@/app/components/Card";
import data from "@/app/utils/mock";
import arrow from "../../../../public/arrows.svg";

const page = () => {
  const collections = data.map((collection) => {
    return <Card data={collection} key={collection.title} />;
  });
  return (
    <div className="px-5 md:px-8 lg:px-28 flex flex-col gap-10">
      <div>
        <h3 className="font-bon_foyage w-1/2 text-[40px] leading-[39.68px] md:text-[90px]  md:leading-[89px] text-black md:w-[380px]">
          Blog
        </h3>
        <p className="font-satoshi font-medium text-xs text-[#4e4e4e]">
          {" "}
          Here is the information about trendy fashions. How to keep up with the
          latest fashion? How to dress best? You will find everything here!
        </p>
      </div>
      <section className="flex flex-col gap-5 ">
        <div className="flex justify-between items-center ">
          <h3 className="font-bon_foyage w-1/2 text-[40px] leading-[39.68px] md:text-[90px]  md:leading-[89px] text-black md:w-[380px]">
            Fashion Categories
          </h3>
          <div className="flex items-center gap-2">
            <button className="w-[30px] h-[30px] rounded-full ">
              <Image src={arrow} alt="" />
            </button>
            <button className="w-[30px] h-[30px] rounded-full">
              <Image src={arrow} alt="" className="scale-x-[-1]" />
            </button>
          </div>
        </div>
        <div className="">
          <ul className="w-full flex items-center justify-between md:justify-start gap-2 md:gap-6 font-satoshi text-[#fda600] md:text-[22px] text-[8.77px] leading-[11.83px] md:leading-[30px]">
            <Link
              href="/"
              className="py-[9px] px-[12px] md:py-[15px] md:px-[35px] rounded-[15px] md:rounded-[50px] bg-inherit hover:text-white  border  border-[#fda600]  hover:bg-[#fda600]"
            >
              All
            </Link>

            <li className="py-[9px] px-[12px] md:py-[15px] md:px-[35px] rounded-[15px] md:rounded-[50px]  bg-inherit hover:text-white border  border-[#fda600]  hover:bg-[#fda600]">
              Vintage clothing
            </li>
            <li className="py-[9px] px-[12px] md:py-[15px] md:px-[35px] rounded-[15px] md:rounded-[50px] bg-inherit hover:text-white border  border-[#fda600]  hover:bg-[#fda600]">
              Senator
            </li>
            <li className="py-[9px] px-[12px] md:py-[15px] md:px-[35px] rounded-[15px] md:rounded-[50px] bg-inherit hover:text-white border  border-[#fda600]  hover:bg-[#fda600]">
              Minimalist
            </li>
            <li className="py-[9px] px-[12px] md:py-[15px] md:px-[35px] rounded-[15px] md:rounded-[50px] bg-inherit hover:text-white border  border-[#fda600]  hover:bg-[#fda600]">
              {" "}
              Casual
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap justify-center gap-4 gap-y-10 md:gap-4 lg:gap-8  ">
          {collections}
        </div>
      </section>
    </div>
  );
};

export default page;
