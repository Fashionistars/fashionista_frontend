import Image from "next/image";
import React from "react";
import { Trash } from "lucide-react";

interface WishListProps {
  id: string;
  image: string;
  title: string;
  status: "In stock" | "Out of stock";
  price: string;
}
const WishlistTableCell = ({ data }: { data: WishListProps }) => {
  return (
    <tr key={data.id} className="border-t border-slate-300">
      <td className="flex items-center gap-2 py-5 md:p-5">
        <Image
          src={data.image}
          alt={data.title}
          width={100}
          height={100}
          className="w-[3.75rem] h-[3.75rem] rounded object-cover"
        />
        <span className="text-[#475367] font-medium text-sm md:text-base  font-raleway">
          {data.title}
        </span>
      </td>
      <td className="text-[#475367] font-medium font-raleway">₦{data.price}</td>
      <td className="text-[#475367] text-sm md:text-base font-medium font-raleway whitespace-nowrap">
        {data.status}
      </td>
      <td>
        <button className="px-1 py-2.5 max-w-[5.5rem] max-h-[2.25rem] w-full h-full flex justify-center items-center rounded-[100px] bg-[#02A445] hover:bg-white hover:border border-[#02A445] font-raleway font-medium text-sm hover:text-[#02A445] text-white">
          {" "}
          Add to cart{" "}
        </button>
      </td>
      <td className="text-center px-5 text-[#475367] hover:text-black">
        <Trash />
      </td>
    </tr>
  );
};

export default WishlistTableCell;
