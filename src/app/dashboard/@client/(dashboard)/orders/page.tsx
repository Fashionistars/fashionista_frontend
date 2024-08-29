import React from "react";
import Link from "next/link";
import { PageProps } from "@/types";
import { Search, CircleArrowDown } from "lucide-react";
import { Suspense } from "react";
import OrderTable from "@/app/components/OrderTable";

const page = async (props: PageProps) => {
  const order = props.searchParams?.order;
  const order_history = [
    {
      items: "5",
      order: "Agbada",
      date: "12.05.24",
      status: "processing",
      total_amount: 10059,
    },
    {
      items: "2",
      order: "Isi agu native wear",
      date: "12.05.24",
      status: "Completed",
      total_amount: 12059,
    },
    {
      items: "5",
      order: "Agbada",
      date: "12.05.24",
      status: "processing",
      total_amount: 14000,
    },
    {
      items: "5",
      order: "Agbada",
      date: "12.05.24",
      status: "completed",
      total_amount: 12500,
    },
  ];
  const date = new Date();

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h3 className="font-satoshi font-medium text-2xl leading-10 text-[#1D2329]">
          Orders
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex justify-center items-center">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.66666 0.833252C6.1269 0.833252 6.5 1.20635 6.5 1.66659V2.49992H11.5V1.66659C11.5 1.20635 11.8731 0.833252 12.3333 0.833252C12.7936 0.833252 13.1667 1.20635 13.1667 1.66659V2.49992H14C15.8409 2.49992 17.3333 3.9923 17.3333 5.83325V14.9999C17.3333 16.8409 15.8409 18.3333 14 18.3333H4C2.15905 18.3333 0.666664 16.8409 0.666664 14.9999V5.83325C0.666664 3.9923 2.15905 2.49992 4 2.49992H4.83333V1.66659C4.83333 1.20635 5.20643 0.833252 5.66666 0.833252ZM11.5 4.16659C11.5 4.62682 11.8731 4.99992 12.3333 4.99992C12.7936 4.99992 13.1667 4.62682 13.1667 4.16659H14C14.9205 4.16659 15.6667 4.91278 15.6667 5.83325V6.24992H2.33333V5.83325C2.33333 4.91278 3.07952 4.16659 4 4.16659H4.83333C4.83333 4.62682 5.20643 4.99992 5.66666 4.99992C6.1269 4.99992 6.5 4.62682 6.5 4.16659H11.5ZM15.6667 7.91658H2.33333V14.9999C2.33333 15.9204 3.07952 16.6666 4 16.6666H14C14.9205 16.6666 15.6667 15.9204 15.6667 14.9999V7.91658Z"
                fill="#344054"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#344054]">Today's date</p>
            <span className="font-bold font-raleway text-[#141414]">
              {date.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          href="/dashboard/get-measured"
          className="w-[9rem] h-[2.7rem] rounded-[100px] flex justify-center items-center bg-[#01454A] text-white text-[15px] leading-[17px] font-semibold font-raleway"
        >
          Get Measured
        </Link>
      </div>
      <div className="border border-[#F0F0F0] w-full min-h-[28rem] p-5 rounded-xl space-y-10">
        {/* <h3 className="font-satoshi font-medium text-3xl text-black">Orders</h3> */}
        <div className="flex items-center justify-between">
          <p className="font-raleway font-bold text-xl text-[#0C101C]">
            Ongoing
          </p>
          <button className="font-raleway font-medium text-[#344054]">
            Show more
          </button>
        </div>
        <div className="flex items-center justify-between">
          <nav className="space-x-2">
            <Link
              href="/dashboard/orders"
              scroll={false}
              className={`px-4 py-3 rounded-[100px] transition-colors ease-in-out duration-200 ${
                !order
                  ? "bg-[#fda600] text-white font-medium"
                  : "bg-[#F9FAFC] text-[#344054]  hover:text-[#fda600]"
              } `}
            >
              All
            </Link>
            <Link
              href="?order=pending"
              scroll={false}
              className={`px-4 py-3 rounded-[100px] transition-colors ease-in-out duration-200 ${
                order === "pending"
                  ? "bg-[#fda600] text-white font-medium"
                  : "bg-[#F9FAFC] text-[#344054]  hover:text-[#fda600]"
              } `}
            >
              Pending
            </Link>
            <Link
              href="?order=shipped"
              scroll={false}
              className={`px-4 py-3 rounded-[100px] transition-colors ease-in-out duration-200 ${
                order === "shipped"
                  ? "bg-[#fda600] text-white font-medium"
                  : "bg-[#F9FAFC] text-[#344054]  hover:text-[#fda600]"
              } `}
            >
              Shipped
            </Link>
            <Link
              href="?order=delivered"
              scroll={false}
              className={`px-4 py-3 rounded-[100px] transition-colors ease-in-out duration-200 ${
                order === "delivered"
                  ? "bg-[#fda600] text-white font-medium"
                  : "bg-[#F9FAFC] text-[#344054]  hover:text-[#fda600]"
              } `}
            >
              Delivered
            </Link>
            <Link
              href="?order=cancelled"
              scroll={false}
              className={`px-4 py-3 rounded-[100px] transition-colors ease-in-out duration-200 ${
                order === "cancelled"
                  ? "bg-[#fda600] text-white font-medium"
                  : "bg-[#F9FAFC] text-[#344054] hover:text-[#fda600]"
              } `}
            >
              Cancellled
            </Link>
          </nav>
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-2">
              from
              <input
                type="date"
                className="px-2 py-1.5 border border-[#F0F2F5] bg-white rounded-[100px] shadow-sm"
              />
            </label>
            <label className="flex items-center gap-2">
              to
              <input
                type="date"
                className="px-2 py-1.5 border border-[#F0F2F5] bg-white rounded-[100px] shadow-sm"
              />
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-[40%] h-[3.5rem]  shrink-0 border-[0.5px] border-[#F0F0F0] rounded-xl flex items-center gap-2 px-2">
            <span className="">
              <Search size={14} color="#667185" />
            </span>
            <input
              type="search"
              className="peer h-full w-full bg-inherit outline-none border-none placeholder:text-sm placeholder:text-[#667185]"
              placeholder="Search by Order ID, Location, or tracking number"
            />
          </div>
          <button className="bg-[#fda600] text-white font-medium h-[3.5rem] px-3 flex items-center justify-center gap-1 border border-[#F0F0F0] rounded-xl">
            <CircleArrowDown size={20} /> Export
          </button>
        </div>
        <Suspense fallback={<div>Loading ...</div>}>
          <OrderTable />
        </Suspense>
      </div>
      {/* <div className="shadow-card_shadow rounded-[10px] bg-[#fff] p-[30px] min-h-[200px] space-y-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 rounded-[5px]">
            <tr>
              <th className="px-6  py-4 text-lg leading-6 font-medium text-black text-center">
                Date
              </th>
              <th className="px-6 py-4 text-lg leading-6 font-medium text-black text-center">
                Order
              </th>
              <th className="px-6 py-4 text-lg leading-6 font-medium text-black text-center">
                Status
              </th>

              <th className="px-6 py-4 text-lg leading-6 font-medium text-black text-center">
                Total Amount
              </th>
              <th className="px-6 py-4 text-lg leading-6 font-medium text-black text-center">
                Items
              </th>
              <th className="px-6 py-4 text-lg leading-6 font-medium text-black text-center"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orderList}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default page;
