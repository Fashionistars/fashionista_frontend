import Image from "next/image";
import hanger from "../../../public/hangers.png";
import hanger2 from "../../../public/hanger2.png";
import asset1 from "../../../public/asset1.svg";
import trousers from "../../../public/asset2.svg";
import office_wears from "../../../public/asset3.svg";
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
import Hero from "../components/Hero";
import ShopByCategory from "../components/ShopByCategory";
import LatestCollection from "../components/LatestCollection";
import { CollectionsProps, PageProps } from "@/types";
import { formatCurrency } from "../utils/formatCurrency";
type DealsProp = CollectionsProps & {
  status: "sold out" | "sales";
  new_price: string;
};

export default async function Home(props: PageProps) {
  const { searchParams } = props;
  const collections = data.map((collection) => {
    return <Card data={collection} key={collection.title} />;
  });
  const deals = data2.map((card) => {
    return <Cads data={card} key={card.image} />;
  });
  const get_deals = async () => {
    try {
      const res = await fetch("http://localhost:4000/deals");
      const deals = (await res.json()) as DealsProp[];
      return deals;
    } catch (error) {
      console.log(error);
    }
  };
  const new_deals = (await get_deals()) || [];
  const dealList = new_deals.map((deal) => (
    <div
      key={deal.id}
      className="flex flex-col w-[45%]  md:w-[32%] max-w-[300px]"
    >
      <div className="relative ">
        <Image
          src={deal.image}
          className="rounded-[8px] w-full h-[220px] md:h-[350px] object-contain"
          alt=""
          width={500}
          height={500}
        />
        <div className="absolute top-7 left-2 md:top-3 md:left-3">
          {deal.status == "sales" ? (
            <p className="w-[83px] h-7 rounded-[5px] flex items-center justify-center uppercase bg-[#fda600] text-white font-semibold font-raleway">
              {deal.status}
            </p>
          ) : (
            <p className="bg-[#848484] py-1 px-4 text-white rounded-[5px] uppercase font-semibold">
              {deal.status}
            </p>
          )}
        </div>
        <span className="absolute bottom-8 md:bottom-4 right-3">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 22.2656L13.0391 23.3063C12.8725 23.3926 12.6876 23.4376 12.5 23.4376C12.3124 23.4376 12.1275 23.3926 11.9609 23.3063L11.9484 23.3L11.9203 23.2844C11.7566 23.1999 11.5951 23.1114 11.4359 23.0188C9.53126 21.9353 7.73455 20.6723 6.07031 19.2469C3.19531 16.7672 0 13.0469 0 8.59375C0 4.43125 3.25937 1.5625 6.64062 1.5625C9.05781 1.5625 11.1766 2.81562 12.5 4.71875C13.8234 2.81562 15.9422 1.5625 18.3594 1.5625C21.7406 1.5625 25 4.43125 25 8.59375C25 13.0469 21.8047 16.7672 18.9297 19.2469C17.1244 20.7912 15.164 22.1443 13.0797 23.2844L13.0516 23.3L13.0422 23.3047H13.0391L12.5 22.2656ZM6.64062 3.90625C4.55312 3.90625 2.34375 5.725 2.34375 8.59375C2.34375 11.9531 4.8125 15.0688 7.60156 17.4719C9.12336 18.7733 10.7633 19.9299 12.5 20.9266C14.2367 19.9299 15.8766 18.7733 17.3984 17.4719C20.1875 15.0688 22.6562 11.9531 22.6562 8.59375C22.6562 5.725 20.4469 3.90625 18.3594 3.90625C16.2141 3.90625 14.2828 5.44687 13.6266 7.74375C13.5575 7.98934 13.41 8.20561 13.2066 8.35965C13.0033 8.5137 12.7551 8.59706 12.5 8.59706C12.2449 8.59706 11.9967 8.5137 11.7934 8.35965C11.59 8.20561 11.4425 7.98934 11.3734 7.74375C10.7172 5.44687 8.78594 3.90625 6.64062 3.90625Z"
              fill="#01454A"
            />
          </svg>
        </span>
      </div>{" "}
      <div className="flex flex-col gap-3">
        <span className="text-[#fda600] text-xl">★★★★★</span>
        <p className="font-raleway font-semibold text-lg md:text-2xl text-black">
          {deal.title}
        </p>
        <div className="flex items-center gap-2">
          <p className="font-raleway font-semibold text-lg md:text-2xl text-black">
            {formatCurrency(deal.new_price)}
          </p>
          <p className="font-raleway font-semibold  md:text-xl line-through text-[#848484]">
            {formatCurrency(deal.price)}
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col gap-5">
      {/* <section className=" md:px-28 relative">
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
                  strokeWidth="1.825"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.5835 4.5499C22.3218 5.26753 25.2335 7.17757 25.2335 8.1999C25.2335 9.22222 22.3218 11.1323 21.5835 11.8499"
                  stroke="white"
                  strokeWidth="1.825"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
      </section> */}
      {/* <section className="flex flex-col gap-8 relative ">
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
      </section> */}
      <Hero />
      <div className=" mt-10 md:hidden flex z-30">
        <form className="flex w-full">
          <div className="h-[60px] lg:h-[85px] w-full md:w-1/2 bg-[#F4F5FB] rounded-r-[100px] flex items-center p-1.5 lg:p-3">
            <input
              type="email"
              className="w-2/3 h-full outline-none bg-inherit placeholder:not-italic placeholder:font-raleway placeholder:font-medium placeholder:text-xl placeholder:text-[#333] text-[#333]"
              placeholder="Enter Email Address"
            />

            <button className="w-1/3 lg:min-h-[66px] h-full rounded-r-[100px] bg-[#01454a] text-white shrink-0 text-sm lg:text-xl font-bold font-raleway">
              Join Waitlist
            </button>
          </div>
        </form>
      </div>

      <ShopByCategory />
      <LatestCollection searchParams={searchParams} />
      <div className=" w-full h-[593px] bg-[#fda600] md:h-[746px] relative p-10 md:p-14 lg:p-24 flex flex-col gap-5 md:gap-10 items-center">
        <p className="font-raleway font-semibold text-xl text-black">
          SENATOR OUTFITS
        </p>
        <p className="font-bon_foyage text-[42px] md:text-6xl lg:text-[75px] lg:leading-[74px] leading-[42px] text-center text-black md:w-1/2">
          {" "}
          The New Fashion Collection
        </p>
        <Link
          href="/categories"
          className="px-10 py-3 md:py-5 rounded-[100px] bg-[#01454A] flex text-white font-raleway font-semibold text-xl"
        >
          Shop Now
        </Link>
        <Image
          src="/man.png"
          alt=""
          width={500}
          height={500}
          className="w-[200px] h-[232px] md:w-[370px] md:h-[450px] lg:w-[500px] lg:h-[582px] absolute left-0 md:left-6 bottom-0"
        />
        <Image
          src="/adunni.png"
          alt=""
          width={1000}
          height={1000}
          className="w-[200px] h-[321px] md:w-[350px] md:h-[550px] lg:w-[592px] lg:h-[758px] absolute right-0 bottom-0 object-cover"
        />
      </div>
      <div className="px-5 py-10 lg:p-20 space-y-5 md:space-y-10">
        <div className="flex flex-wrap justify-center md:justify-normal  items-center gap-5 md:gap-20">
          <h3 className="font-bon_foyage whitespace-nowrap text-center text-5xl leading-[48px] text-[#333]">
            {" "}
            Deals of the Week
          </h3>
          <div className="flex justify-center items-center space-x-4 bg-[#01454A] rounded-[8px] max-w-[429px] h-[111px] w-full text-white">
            <div className=" p-4 rounded-lg text-center">
              <span className="block text-[32px] leading-[37px] font-medium text-white">
                10
              </span>
              <span className="text-xl font-medium font-raleway text-white">
                Hours
              </span>
            </div>
            :
            <div className="bg-primary text-primary-foreground p-4 rounded-lg text-center">
              <span className="block text-[32px] leading-[37px] font-medium text-white">
                20
              </span>
              <span className="text-xl font-medium font-raleway text-white">
                Minutes
              </span>
            </div>
            :
            <div className="bg-primary text-primary-foreground p-4 rounded-lg text-center">
              <span className="block text-[32px] leading-[37px] font-medium text-white">
                59
              </span>
              <span className="text-xl font-medium font-raleway text-white">
                Seconds
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-y-2 md:gap-3 lg:gap-6 justify-between">
          {dealList}
        </div>
      </div>
      {/* <section className="my-[70px] md:my-[200px] flex flex-col gap-8 px-5 md:px-8 lg:px-28">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
        <div className="flex flex-wrap justify-center gap-4 gap-y-10 lg:gap-8  ">
          {collections}
        </div>
      </section> */}
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
                  strokeWidth="1.825"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.6831 3.6499C21.4214 4.36754 24.3331 6.27757 24.3331 7.2999C24.3331 8.32223 21.4214 10.2323 20.6831 10.9499"
                  stroke="black"
                  strokeWidth="1.825"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
