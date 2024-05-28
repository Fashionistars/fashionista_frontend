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
import { data2 } from "../utils/mock";
import Card from "../components/Card";
import Cads from "../components/Cads";
import Slider from "../components/Carousel";
import ReviewScroll from "../components/ReviewScroll";
import CategoryScroll from "../components/CategoryScroll";
import Link from "next/link";

export default function Home() {
  const collections = data.map((collection) => {
    return <Card data={collection} key={collection.title} />;
  });
  const deals = data2.map((card) => {
    return <Cads data={card} key={card.image} />;
  });

  return (
    <div className="flex flex-col  pt-16">
      <section className=" md:px-28 relative">
        <Slider />
        <div className="flex w-[139px] h-[40px] md:w-[260px] md:h-[59px] lg:max-w-[360px] lg:h-[89px] justify-center items-center absolute left-0 md:left-28 md:top-3 -top-12  bg-black rounded-[50px]">
          <Image
            src={hanger}
            alt=""
            className="w-full h-full rounded-[50px] object-cover "
          />
        </div>
        <div className="flex w-[139px] h-[40px] md:w-[260px] md:h-[59px] lg:max-w-[360px] lg:h-[89px] justify-center items-center  absolute right-0 md:right-28 -top-12 md:top-3 bg-black rounded-[50px]">
          <Image
            src={hanger2}
            alt=""
            className="w-full h-full rounded-[50px] object-cover "
          />
        </div>
        <div className="hidden md:flex flex-col w-[233px] absolute left-28 top-[30%]">
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

        {/* border border-red-600 */}

        <div className="hidden md:flex justify-between items-center absolute right-28 top-[30%]">
          <div className="bg-white  w-[306px] h-[333px] rounded-[20px] flex flex-col justify-evenly px-8 relative">
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
      <section className="md:mt-[200px] flex flex-col gap-8 relative ">
        <div className="flex px-5 md:px-8 lg:px-28">
          <h3 className="font-bon_foyage w-1/2 text-[40px] leading-[39.68px] md:text-[90px]  md:leading-[89px] text-black md:w-[380px]">
            Fashion Categories
          </h3>
        </div>
        <div className="px-5 md:px-8 lg:px-28">
          <ul className="flex items-center  justify-between md:justify-start gap-2 md:gap-6 font-satoshi text-white md:text-[22px] text-[8.77px] leading-[11.83px] md:leading-[30px]">
            <li className="py-[9px] px-[13.95px] md:py-[15px] md:px-[35px] rounded-[15px] md:rounded-[50px]  bg-[#fda600]">
              Street wear
            </li>

            <li className="py-[9px] px-[13.95px] md:py-[15px] md:px-[35px] rounded-[15px] md:rounded-[50px]  bg-[#fda600]">
              Vintage clothing
            </li>
            <li className="py-[9px] px-[13.95px] md:py-[15px] md:px-[35px] rounded-[15px] md:rounded-[50px] bg-[#fda600]">
              Senator
            </li>
            <li className="py-[9px] px-[13.95px] md:py-[15px] md:px-[35px] rounded-[15px] md:rounded-[50px] bg-[#fda600]">
              Minimalist
            </li>
            <li className="py-[9px] px-[13.95px] md:py-[15px] md:px-[35px] rounded-[15px] md:rounded-[50px] bg-[#fda600]">
              {" "}
              Casual
            </li>
          </ul>
        </div>

        <CategoryScroll />
      </section>
      <section className="my-[70px] md:my-[200px] flex flex-col gap-8 px-5 md:px-8 lg:px-28">
        <div className="flex justify-between items-end">
          <h3 className="font-bon_foyage w-1/2 text-[40px] leading-[39.68px] md:text-[90px]  md:leading-[89px] text-black md:w-[380px]">
            Recent Collections
          </h3>
          <div className="hidden md:flex items-center gap-2 py-10">
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
        <div className="box-border">
          <ul className=" flex items-center justify-between gap-1 md:justify-start md:gap-6 font-satoshi text-[#fda600] md:text-[22px] text-[9.6px] leading-[12.96px] md:leading-[30px]">
            <li className="md:py-[15px] md:px-[35px] py-[9px] px-[14.27px] rounded-[21.81px] md:rounded-[50px] bg-[#fda600] text-white">
              All
            </li>

            <li className="md:py-[15px] md:px-[35px] py-[9px]  px-[14.27px] rounded-[21.81px] md:rounded-[50px] text-[#fda600] border border-[#fda600] bg-transparent cursor-pointer transition-colors hover:bg-[#fda600] hover:text-white">
              Vintage clothing
            </li>
            <li className="md:py-[15px] md:px-[35px] py-[9px] px-[14.27px] rounded-[21.81px] md:rounded-[50px] text-[#fda600] border border-[#fda600] bg-transparent cursor-pointer transition-colors hover:bg-[#fda600] hover:text-white">
              Senator
            </li>
            <li className="md:py-[15px] md:px-[35px] py-[9px] px-[14.27px] rounded-[21.81px] md:rounded-[50px] text-[#fda600] border border-[#fda600] bg-transparent cursor-pointer transition-colors hover:bg-[#fda600] hover:text-white">
              Minimalist
            </li>
            <li className="md:py-[15px] md:px-[35px] py-[9px] px-[14.27px] rounded-[21.81px] md:rounded-[50px] text-[#fda600] border border-[#fda600] bg-transparent cursor-pointer transition-colors hover:bg-[#fda600] hover:text-white">
              {" "}
              Casual
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap justify-center gap-4 gap-y-10 md:gap-4 lg:gap-8  ">
          {collections}
        </div>
      </section>
      <section className="bg-[#6E6055] h-[347px] lg:min-h-screen lg:h-full  px-5 md:px-8 lg:px-28 py-8 lg:py-24 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <h3 className="font-bon_foyage w-1/2 text-[40px]  leading-10 md:text-[50px] lg:text-[90px]  lg:leading-[89px] text-black lg:w-[316px]">
            Daily
            <br />
            Best Sales
          </h3>
          <div className="flex flex-col items-end w-1/2">
            <p className="flex items-center gap-2">
              <span className="font-bon_foyage md:text-4xl text-[13.23px] leading-[13.21px] lg:leading-9 text-black">
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
            <p className="font-satoshi md:text-[22px] md:leading-[30px] text-[8px] leading-[10px] text-[#282828] text-right  max-w-[484px]">
              Step into the world of innovation and style as you embark on a
              captivating journey to explore our latest collections.
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-6">
          <div className="grid grid-cols-2">
            <div className="lg:w-[290px]  pr-3 pb-3 border-r-[2px] border-b-[2px] border-[#fda600]  flex items-end">
              <Image src={woman} alt="" />
            </div>
            <div className="lg:w-[290px]  flex  flex-col justify-center gap-2 px-3">
              <p className="font-bon_foyage lg:text-2xl text-xs leading-[8px] lg:leading-6 text-black ">
                Women’s cable knitted turtle neck sleeve
              </p>
              <span className="text-[#4E4E4E] md:text-[15px] text-[8px] leading-[6px] md:leading-5 font-satoshi ">
                #2024 fashion
              </span>
              <span className="font-satoshi font-medium  md:text-2xl text-[10px] leading-[11px] md:leading-8 text-black ">
                $250.00{" "}
              </span>
            </div>

            <div className="lg:w-[290px]  flex flex-col justify-center items-end gap-2 px-3">
              {" "}
              <p className="font-bon_foyage  text-right lg:text-2xl text-xs leading-[8px] lg:leading-6 text-black">
                Women’s cable knitted turtle neck sleeve
              </p>
              <span className="text-[#4E4E4E] text-right md:text-[15px] text-[8px] leading-[6px] md:leading-5 font-satoshi">
                #2024 fashion
              </span>
              <span className="font-satoshi text-right font-medium md:text-2xl text-[10px] leading-[11px] md:leading-8 text-black">
                $250.00{" "}
              </span>
            </div>
            <div className="pl-3 pt-3 lg:w-[290px]  border-l-[2px] border-t-[2px] -mt-[2px] -ml-[1.5px] border-[#fda600]">
              <Image src={woman2} alt="" className="w-full" />
            </div>
          </div>

          <div className="relative">
            <div className=" absolute md:-left-3 md:-top-3 -top-1 -left-1 w-[24.5px] h-[24.5px] md:w-[82px] md:h-[82px] bg-[#000] border-[1.5px] md:border-[5px] border-[#fff] rounded-full flex justify-center items-center">
              <Image src={arrow} alt="" />
            </div>
            <Image src={man3} alt="" />
          </div>
        </div>
      </section>
      <section className="px-5 md:px-8 lg:px-28 flex flex-col gap-10 pt-[70px]">
        <div className="flex justify-between items-center">
          <h3 className="font-bon_foyage w-1/2 text-[40px] leading-[39.68px] md:text-[90px]  md:leading-[89px] text-black md:w-[380px]">
            Deals of the
            <br /> day
          </h3>
          <Link
            href="/"
            className="flex items-center font-satoshi md:text-2xl text-[13px] text-[#4e4e4e]"
          >
            All Deals
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.50004 5C7.50004 5 12.5 8.68242 12.5 10C12.5 11.3177 7.5 15 7.5 15"
                stroke="#4E4E4E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-8 ">
          {deals}
        </div>
      </section>
      <section className="py-[100px]  flex flex-col gap-10">
        <h3 className="font-bon_foyage text-[40px] leading-[39.68px] md:text-[90px]  md:leading-[89px] text-black px-5 md:px-8 lg:px-28">
          {" "}
          Our customers said
        </h3>
        <ReviewScroll />
      </section>
    </div>
  );
}
