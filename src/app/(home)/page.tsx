import Image from "next/image";
import hanger from "../../../public/hangers.png";
import hanger2 from "../../../public/hanger2.png";
import couple from "../../../public/couple_assets.svg";
import asset1 from "../../../public/asset1.svg";
import trousers from "../../../public/asset2.svg";
import office_wears from "../../../public/asset3.svg";
import minimalist from "../../../public/minimalist.svg";
import gown from "../../../public/gown.svg";
import vintage from "../../../public/vintage.svg";
import senator from "../../../public/senator.svg";

export default function Home() {
  return (
    <div className="flex flex-col px-24 pt-16">
      <section className=" min-h-screen">
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
            <div className="z-10 absolute -top-16">
              <Image src={couple} alt="" />
            </div>
          </div>
        </div>
        {/* <Slider /> */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col w-[233px]">
            <p className="text-black font-satoshi font-medium leading-[22px] pb-20">
              #2024 Fashion{" "}
            </p>
            <p className="font-bon_foyage text-3xl leading-[30px] text-black">
              Tailored Measurement
            </p>
            <p className="font-satoshi text-sm leading-5 text-[#282828]">
              Get your exact measurements without hassles or stress
            </p>
            <div>
              <Image src={asset1} alt="" />
            </div>
          </div>
          <div className="bg-white w-[306px] h-[333px] rounded-[20px] flex flex-col justify-evenly px-8 relative">
            <div className=" absolute -right-2 -top-2 w-[73px] h-[73px] bg-[#fda600] border-[3.65px] border-[#F4F3EC] rounded-full flex justify-center items-center">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.76709 26.4499V23.923C5.76709 21.4885 5.76709 20.2713 5.94391 19.2529C6.91719 13.6463 11.7367 9.24921 17.8819 8.36124C18.9982 8.19992 21.3487 8.19992 24.0171 8.19992"
                  stroke="white"
                  stroke-width="1.825"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21.5835 4.5499C22.3218 5.26753 25.2335 7.17757 25.2335 8.1999C25.2335 9.22222 22.3218 11.1323 21.5835 11.8499"
                  stroke="white"
                  stroke-width="1.825"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <p className="font-bon_foyage text-[40px] leading-10 text-black text-center">
              Categories
            </p>
            <div className="flex items-center gap-2">
              <Image src={trousers} alt="" />
              <span className="text-black text-xl font-satoshi">Trousers</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={trousers} alt="" />
              <span className="text-black text-xl font-satoshi">Shoes</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src={office_wears} alt="" />
              <span className="text-black text-xl font-satoshi">
                Office wears
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-[200px] flex flex-col gap-8">
        <div className="flex justify-between">
          <h3 className="font-bon_foyage text-[90px] leading-[89px] text-black w-[380px]">
            Fashion Categories
          </h3>
          <div className="flex items-center gap-2">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="25" cy="25" r="24.5" stroke="black" />
              <path
                d="M34.3335 35.55V33.0232C34.3335 30.5886 34.3335 29.3715 34.1567 28.353C33.1834 22.7465 28.3638 18.3493 22.2187 17.4614C21.1024 17.3 18.7519 17.3 16.0835 17.3"
                stroke="black"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.5171 13.65C17.7788 14.3677 14.8671 16.2777 14.8671 17.3C14.8671 18.3224 17.7788 20.2324 18.5171 20.95"
                stroke="black"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="25" cy="25" r="24.5" stroke="black" />
              <path
                d="M14.8667 35.55V33.0232C14.8667 30.5886 14.8667 29.3715 15.0435 28.353C16.0168 22.7465 20.8363 18.3493 26.9815 17.4614C28.0978 17.3 30.4483 17.3 33.1167 17.3"
                stroke="black"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M30.6831 13.65C31.4214 14.3677 34.3331 16.2777 34.3331 17.3C34.3331 18.3224 31.4214 20.2324 30.6831 20.95"
                stroke="black"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div>
          <ul className="flex items-center gap-6 font-satoshi text-white text-[22px] leading-[30px]">
            <li className="py-[15px] px-[35px] rounded-[50px] bg-[#fda600]">
              Street wear
            </li>

            <li className="py-[15px] px-[35px] rounded-[50px] bg-[#fda600]">
              Vintage clothing
            </li>
            <li className="py-[15px] px-[35px] rounded-[50px] bg-[#fda600]">
              Senator
            </li>
            <li className="py-[15px] px-[35px] rounded-[50px] bg-[#fda600]">
              Minimalist
            </li>
            <li className="py-[15px] px-[35px] rounded-[50px] bg-[#fda600]">
              {" "}
              Casual
            </li>
          </ul>
        </div>
        <div className="">
          <div>
            <Image src={minimalist} alt="" className="" />
            <span>Minimalist</span>
          </div>
        </div>
      </section>
    </div>
  );
}
