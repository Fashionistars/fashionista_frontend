import React from "react";
import axios from "axios";
import Image from "next/image";
import { Hourglass, CircleCheckBig } from "lucide-react";

interface OrdersProp {
  id: string;
  image: string;
  placed_on: string;
  number: number;
  status: "on transit" | "successful" | "Order placed";
  amount: string;
  title: string;
}

const OrderTable = async () => {
  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/orders");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const orders = ((await getOrders()) as OrdersProp[]) || [];
  const orders_list = orders.map((order) => {
    return (
      <tr key={order.id}>
        <td className="flex items-center gap-2 py-5 md:p-5">
          <Image
            src={order.image}
            alt={order.title}
            width={100}
            height={100}
            className="w-[3.75rem] h-[3.75rem] rounded object-cover"
          />
          <span className="text-[#475367] font-medium text-sm md:text-base  font-raleway">
            {order.title}
          </span>
        </td>
        <td className="font-raleway font-medium text-[#344054]">
          {order.placed_on}
        </td>
        <td className="font-raleway font-medium text-[#344054]">{order.id}</td>
        <td className="font-raleway font-medium text-[#344054] text-center">
          {order.number}Items
        </td>
        <td className="font-raleway font-medium text-[#344054] text-center">
          {" "}
          ₦{order.amount}
        </td>
        <td className="font-raleway font-medium text-[#344054]">
          <div
            className={`py-2.5 px-3 rounded-[100px] flex items-center gap-1 ${
              order.status == "successful"
                ? "bg-[#E7F6EC] text-[#03AA5A]"
                : order.status == "on transit"
                ? "bg-[#FEF6E7] text-[#F3A218]"
                : "bg-[#F4F5F7] text-[#344054]"
            }`}
          >
            {order.status}{" "}
            {order.status == "successful" ? (
              <CircleCheckBig />
            ) : order.status == "on transit" ? (
              <Hourglass />
            ) : null}
          </div>
        </td>
      </tr>
    );
  });
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 rounded-[5px]">
        <tr>
          <th className="px-6  py-4 text-lg text-left leading-6 font-medium text-[#141414]">
            Item
          </th>
          <th className="px-6 py-4 text-lg leading-6 font-medium text-[#141414] text-left">
            Placed on
          </th>
          <th className="px-6 py-4 text-lg leading-6 font-medium text-[#141414] text-left">
            ID
          </th>
          <th className="px-6 py-4 text-lg leading-6 font-medium text-[#141414] text-left">
            Number
          </th>

          <th className="px-6 py-4 text-lg leading-6 font-medium text-[#141414] text-left">
            Amount
          </th>
          <th className="px-6 py-4 text-lg leading-6 font-medium text-[#141414] text-left">
            Status
          </th>
          {/* <th className="px-6 py-4 text-lg leading-6 font-medium text-[#141414] text-center"></th> */}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">{orders_list}</tbody>
    </table>
  );
};

export default OrderTable;
