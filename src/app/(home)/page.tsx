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
import man3 from "../../../public/man3_assets.svg";
import woman from "../../../public/woman.svg";
import woman2 from "../../../public/woman2.svg";
import arrow from "../../../public/arrow.svg";
import data from "../utils/mock";
import Card from "../components/Card";

export default function Home() {
  const collections = data.map((collection) => {
    return <Card data={collection} key={collection.title} />;
  });
  return (
    <div className="flex flex-col  pt-16">
      <section className=" min-h-screen px-28">
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
      <section className="mt-[200px] flex flex-col gap-8 px-28">
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
        <div className="flex items-center flex-wrap justify-evenly">
          <div className="relative">
            <Image src={minimalist} alt="" className="" />
            <span className="absolute bottom-6 left-5 text-[32px] font-bon_foyage leading-[32px] text-white">
              Minimalist
            </span>
          </div>
          <div className="relative">
            <Image src={vintage} alt="" className="" />
            <span className="absolute bottom-6 left-5 text-[32px] font-bon_foyage leading-[32px] text-white">
              Vintage Clothing
            </span>
          </div>
          <div className="relative">
            <Image src={senator} alt="" className="" />
            <span className="absolute bottom-6 left-5 text-[32px] font-bon_foyage leading-[32px] text-white">
              Senator
            </span>
          </div>
          <div className="relative">
            <Image src={gown} alt="" className="" />
            <span className="absolute bottom-6 left-5 text-[32px] font-bon_foyage leading-[32px] text-white">
              Ball Gown
            </span>
          </div>
        </div>
      </section>
      <section className="my-[200px] flex flex-col gap-12 px-28">
        <div className="flex justify-between items-end">
          <h3 className="font-bon_foyage text-[90px] leading-[89px] text-black w-[380px]">
            Recent Collections
          </h3>
          <div className="flex items-center gap-2 py-10">
            <div className="flex items-center gap-2 py-2 px-[14px] rounded-[50px] border-[0.8px] border-[#959595]">
              <span className=" text-[#959595] font-satoshi">Sort by</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.25 11.2449L11.3068 12.3598C11.8693 12.9533 12.1505 13.25 12.5 13.25C12.8495 13.25 13.1307 12.9533 13.6932 12.3598L14.75 11.2449M12.5 13.1846V9.90327C12.5 8.22815 12.5 7.39062 12.1649 6.6521C11.8297 5.91353 11.1994 5.36199 9.93875 4.25894L9.5 3.875"
                  stroke="#959595"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.25 3.875C1.25 2.95617 1.25 2.49675 1.42882 2.1458C1.58611 1.83709 1.83709 1.58611 2.1458 1.42882C2.49675 1.25 2.95617 1.25 3.875 1.25C4.79383 1.25 5.25325 1.25 5.6042 1.42882C5.91291 1.58611 6.16389 1.83709 6.32119 2.1458C6.5 2.49675 6.5 2.95617 6.5 3.875C6.5 4.79383 6.5 5.25325 6.32119 5.6042C6.16389 5.91291 5.91291 6.16389 5.6042 6.32119C5.25325 6.5 4.79383 6.5 3.875 6.5C2.95617 6.5 2.49675 6.5 2.1458 6.32119C1.83709 6.16389 1.58611 5.91291 1.42882 5.6042C1.25 5.25325 1.25 4.79383 1.25 3.875Z"
                  stroke="#959595"
                />
                <path
                  d="M1.25 12.125C1.25 11.2062 1.25 10.7467 1.42882 10.3958C1.58611 10.0871 1.83709 9.83608 2.1458 9.6788C2.49675 9.5 2.95617 9.5 3.875 9.5C4.79383 9.5 5.25325 9.5 5.6042 9.6788C5.91291 9.83608 6.16389 10.0871 6.32119 10.3958C6.5 10.7467 6.5 11.2062 6.5 12.125C6.5 13.0438 6.5 13.5033 6.32119 13.8542C6.16389 14.1629 5.91291 14.4139 5.6042 14.5712C5.25325 14.75 4.79383 14.75 3.875 14.75C2.95617 14.75 2.49675 14.75 2.1458 14.5712C1.83709 14.4139 1.58611 14.1629 1.42882 13.8542C1.25 13.5033 1.25 13.0438 1.25 12.125Z"
                  stroke="#959595"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2 py-2 px-[14px] rounded-[50px] border-[0.8px] border-[#959595]">
              <span className=" text-[#959595] font-satoshi">Filter</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.25 11.2449L11.3068 12.3598C11.8693 12.9533 12.1505 13.25 12.5 13.25C12.8495 13.25 13.1307 12.9533 13.6932 12.3598L14.75 11.2449M12.5 13.1846V9.90327C12.5 8.22815 12.5 7.39062 12.1649 6.6521C11.8297 5.91353 11.1994 5.36199 9.93875 4.25894L9.5 3.875"
                  stroke="#959595"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.25 3.875C1.25 2.95617 1.25 2.49675 1.42882 2.1458C1.58611 1.83709 1.83709 1.58611 2.1458 1.42882C2.49675 1.25 2.95617 1.25 3.875 1.25C4.79383 1.25 5.25325 1.25 5.6042 1.42882C5.91291 1.58611 6.16389 1.83709 6.32119 2.1458C6.5 2.49675 6.5 2.95617 6.5 3.875C6.5 4.79383 6.5 5.25325 6.32119 5.6042C6.16389 5.91291 5.91291 6.16389 5.6042 6.32119C5.25325 6.5 4.79383 6.5 3.875 6.5C2.95617 6.5 2.49675 6.5 2.1458 6.32119C1.83709 6.16389 1.58611 5.91291 1.42882 5.6042C1.25 5.25325 1.25 4.79383 1.25 3.875Z"
                  stroke="#959595"
                />
                <path
                  d="M1.25 12.125C1.25 11.2062 1.25 10.7467 1.42882 10.3958C1.58611 10.0871 1.83709 9.83608 2.1458 9.6788C2.49675 9.5 2.95617 9.5 3.875 9.5C4.79383 9.5 5.25325 9.5 5.6042 9.6788C5.91291 9.83608 6.16389 10.0871 6.32119 10.3958C6.5 10.7467 6.5 11.2062 6.5 12.125C6.5 13.0438 6.5 13.5033 6.32119 13.8542C6.16389 14.1629 5.91291 14.4139 5.6042 14.5712C5.25325 14.75 4.79383 14.75 3.875 14.75C2.95617 14.75 2.49675 14.75 2.1458 14.5712C1.83709 14.4139 1.58611 14.1629 1.42882 13.8542C1.25 13.5033 1.25 13.0438 1.25 12.125Z"
                  stroke="#959595"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <ul className="flex items-center gap-6 font-satoshi text-[#fda600] text-[22px] leading-[30px]">
            <li className="py-[15px] px-[35px] rounded-[50px] bg-[#fda600] text-white">
              All
            </li>

            <li className="py-[15px] px-[35px] rounded-[50px] text-[#fda600] border border-[#fda600] bg-transparent cursor-pointer transition-colors hover:bg-[#fda600] hover:text-white">
              Vintage clothing
            </li>
            <li className="py-[15px] px-[35px] rounded-[50px] text-[#fda600] border border-[#fda600] bg-transparent cursor-pointer transition-colors hover:bg-[#fda600] hover:text-white">
              Senator
            </li>
            <li className="py-[15px] px-[35px] rounded-[50px] text-[#fda600] border border-[#fda600] bg-transparent cursor-pointer transition-colors hover:bg-[#fda600] hover:text-white">
              Minimalist
            </li>
            <li className="py-[15px] px-[35px] rounded-[50px] text-[#fda600] border border-[#fda600] bg-transparent cursor-pointer transition-colors hover:bg-[#fda600] hover:text-white">
              {" "}
              Casual
            </li>
          </ul>
        </div>
        <div className=" flex justify-evenly flex-wrap gap-y-8">
          {collections}
        </div>
      </section>
      <section className="bg-[#6E6055] min-h-screen px-28 py-24 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <h3 className="font-bon_foyage text-[90px] leading-[89px] text-black w-[316px]">
            Daily
            <br />
            Best Sales
          </h3>
          <div className="flex flex-col items-end">
            <p className="flex items-center gap-2">
              <span className="font-bon_foyage text-4xl leading-9 text-black">
                See all
              </span>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.8667 25.55V23.0232C4.8667 20.5886 4.8667 19.3715 5.04352 18.353C6.0168 12.7465 10.8363 8.34934 16.9815 7.46137C18.0978 7.30005 20.4483 7.30005 23.1167 7.30005"
                  stroke="black"
                  stroke-width="1.825"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.6831 3.6499C21.4214 4.36754 24.3331 6.27757 24.3331 7.2999C24.3331 8.32223 21.4214 10.2323 20.6831 10.9499"
                  stroke="black"
                  stroke-width="1.825"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </p>
            <p className="font-satoshi text-[22px] leading-[30px] text-[#282828] text-right  max-w-[484px]">
              Step into the world of innovation and style as you embark on a
              captivating journey to explore our latest collections.
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-6">
          <div className="grid grid-cols-2 gap-x-0 gap-y-0 ">
            <div className="w-[290px]  pr-3 pb-3 border-r-[2px] border-b-[2px] border-[#fda600]  flex items-end">
              <Image src={woman} alt="" />
            </div>
            <div className="w-[290px]  flex  flex-col justify-center gap-3 px-3">
              <p className="font-bon_foyage text-2xl leading-6 text-black ">
                Women’s cable knitted turtle neck sleeve
              </p>
              <span className="text-[#4E4E4E] text-[15px] leading-5 font-satoshi ">
                #2024 fashion
              </span>
              <span className="font-satoshi font-medium text-2xl leading-8 text-black py-5">
                $250.00{" "}
              </span>
            </div>

            <div className="w-[290px]  flex    flex-col justify-center items-end gap-3 px-3">
              {" "}
              <p className="font-bon_foyage  text-right text-2xl leading-6 text-black">
                Women’s cable knitted turtle neck sleeve
              </p>
              <span className="text-[#4E4E4E] text-[15px] leading-5 font-satoshi">
                #2024 fashion
              </span>
              <span className="font-satoshi font-medium text-2xl leading-8 text-black">
                $250.00{" "}
              </span>
            </div>
            <div className="pl-3 pt-3 w-[290px]  border-l-[2px] border-t-[2px] -mt-[2px] -ml-[1.5px] border-[#fda600]">
              <Image src={woman2} alt="" />
            </div>
          </div>

          <div className="relative">
            <div className=" absolute -left-3 -top-3 w-[82px] h-[82px] bg-[#000] border-[5px] border-[#fff] rounded-full flex justify-center items-center">
              <Image src={arrow} alt="" />
            </div>
            <Image src={man3} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}
