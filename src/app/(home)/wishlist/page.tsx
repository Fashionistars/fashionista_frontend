import Link from "next/link";
import React from "react";
import axios from "axios";
import WishlistTableCell from "@/app/components/WishlistTableCell";

interface WishListProps {
  id: string;
  image: string;
  title: string;
  status: "In stock" | "Out of stock";
  price: string;
}
const page = async () => {
  const getWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:4000/wishlist");

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const wishlist = ((await getWishlist()) as WishListProps[]) || [];
  const wish_list = wishlist.map((list) => {
    return <WishlistTableCell data={list} />;
  });

  return (
    <div className="py-10 px-5 md:px-24 space-y-5">
      <div className="flex items-center justify-between">
        <div className="font-raleway font-medium text-[#475367]">
          <span className="font-raleway font-medium text-[#475367]">Home</span>{" "}
          &gt; <span>Shop</span> &gt;{" "}
          <span className="text-[#fda600]">Filter</span>
        </div>
        <Link
          href="/get-measured"
          className="w-[9rem] h-[2.7rem] rounded-[100px] flex justify-center items-center bg-[#01454A] text-white text-[15px] leading-[17px] font-semibold font-raleway"
        >
          Get Measured
        </Link>
      </div>
      <div>
        <h2 className="font-raleway font-bold text-[2rem] leading-[43px] text-black flex items-center gap-2">
          Your Wishlist
          <span className="py-1.5 px-3 rounded-[40px] text-white bg-[#F56630] font-bold text-lg ">
            5
          </span>
        </h2>
        <p className="font-raleway text-2xl text-[#475367]">
          Your Wishlist contains 5 product
        </p>
      </div>
      <div className="flex items-center justify-between py-2">
        <p className="text-[#1D2329] font-bold text-2xl leading-10 py-2.5 pr-[30px] border-b-2 border-[#F56630]">
          Wishlist
        </p>
        <p className="text-[#586283] py-3 px-6 rounded-full border border-[#F0F2F5] bg-white shadow">
          see more &gt;
        </p>
      </div>
      <div>
        <table className="min-w-full divide-y divide-slate-300">
          <thead className="divide-y-2 divide-red-500">
            <tr>
              <th className="font-raleway font-medium text-[#1D2329] text-left px-5 py-2.5">
                {" "}
                Product’s Name
              </th>
              <th className="font-raleway font-medium text-[#1D2329] text-left px-5 py-2.5">
                Price
              </th>
              <th className="font-raleway font-medium text-[#1D2329] text-left px-5 py-2.5">
                Status
              </th>
              <th className="font-raleway font-medium text-[#1D2329] text-left px-5 py-2.5">
                Action
              </th>
              <th className="font-raleway font-medium text-[#1D2329] text-left px-5 py-2.5">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>{wish_list}</tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
