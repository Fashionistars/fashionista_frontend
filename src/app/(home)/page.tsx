import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import hanger from "../../../public/hangers.png";
import hanger2 from "../../../public/hanger2.png";
import couple from "../../../public/pics.png";

export default function Home() {
  return (
    <div className="flex flex-col px-24 pt-16">
      <div className="flex justify-between items-center relative">
        <div className="w-[306px] absolute left-1 top-3 h-[89px] bg-black rounded-[50px]">
          <Image
            src={hanger}
            alt=""
            className="w-full h-full rounded-[50px] object-cover "
          />
        </div>
        <div className="w-[306px] h-[89px] absolute right-1 top-3 bg-black rounded-[50px]">
          <Image
            src={hanger2}
            alt=""
            className="w-full h-full rounded-[50px] object-cover "
          />
        </div>
      </div>
      {/* border border-red-600 */}
      <div>
        <div className="flex justify-center ">
          <p className="font-bon_foyage text-8xl leading-[95px] text-center text-black  w-1/2 px-10 ">
            Your <span className="text-[#fda600]">Style</span> with the Latest
            Fashion Trends.
          </p>
        </div>
        <div className="relative flex justify-center">
          <div
            className="w-[492px] absolute h-[470px] bg-[#fda600] z-0 top-20"
            style={{ borderRadius: "250px 250px 0px 0px" }}
          />
          <div className="z-10 absolute -top-24">
            <Image src={couple} alt="" />
          </div>
          <div>
            <p className="text-black font-satoshi font-medium text-center leading-[22px]">
              #2024 Fashion{" "}
            </p>
            <p className="font-bon_foyage text-3xl leading-[30px] text-black text-center">
              Tailored Measurement
            </p>
            <p className="font-satoshi text-sm leading-5 text-[#282828]">
              Get your exact measurements without hassles or stress
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
