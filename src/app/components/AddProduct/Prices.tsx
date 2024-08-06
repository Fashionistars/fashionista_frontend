// components/Prices.js
import { ProductSchema } from "@/types";
import React, { ChangeEvent } from "react";

const Prices = ({
  formData,
  update,
}: {
  formData: ProductSchema;
  update: (fields: Partial<ProductSchema>) => void;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    update({ [name]: value });
  };

  return (
    <div className="space-y-10 w-full">
      <div className="space-y-2">
        <h2 className="font-satoshi font-medium text-lg leading-6 text-black">
          Prices
        </h2>
        <p className="font-satoshi text-[13px] leading-[18px] text-[#4E4E4E]">
          Add prices to product tags
        </p>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-10">
        <div className="flex flex-col gap-2 w-full md:w-[47%]">
          <label className="font-satoshi text-[15px] leading-5 text-[#000]">
            Sales price
          </label>
          <input
            type="text"
            name="sales_prices"
            className="border-[1.5px] border-[#D9D9D9] h-[60px] rounded-[70px] w-full px-3 outline-black text-[#000]"
            value={formData.sales_prices || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[47%]">
          <label className="font-satoshi text-[15px] leading-5 text-[#000]">
            Regular Price
          </label>
          <input
            type="text"
            name="regular_prices"
            className="border-[1.5px] border-[#D9D9D9] h-[60px] rounded-[70px] w-full px-3 outline-none text-[#000]"
            value={formData.regular_prices || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[47%]">
          <label className="font-satoshi text-[15px] leading-5 text-[#000]">
            Shipping Amount
          </label>
          <input
            type="text"
            name="shipping_amount"
            className="border-[1.5px] border-[#D9D9D9] h-[60px] rounded-[70px] w-full px-3 outline-none text-[#000]"
            value={formData.shipping_amount}
            // onChange={handleChange}
            readOnly
          />
          <span className="font-satoshi font-medium text-xs text-[#555555]">
            Note: it’s automatic 1000 for people living in lagos state
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[47%]">
          <label className="font-satoshi text-[15px] leading-5 text-[#000]">
            Stock Qty
          </label>
          <input
            type="text"
            name="stock_qty"
            className="border-[1.5px] border-[#D9D9D9] h-[60px] rounded-[70px] w-full px-3 outline-none text-[#000]"
            value={formData.stock_qty || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="font-satoshi text-[15px] leading-5 text-[#000]">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            className="border-[1.5px] border-[#D9D9D9] h-[60px] rounded-[70px] w-full px-3 outline-none text-[#000]"
            value={formData.tag || ""}
            onChange={handleChange}
          />
          <span className="font-satoshi font-medium text-xs text-[#555555]">
            Note: Separate tags with commas
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="font-satoshi text-[15px] leading-5 text-[#000]">
            Total Price
          </label>
          <input
            type="text"
            name="total_price"
            className="border-[1.5px] border-[#D9D9D9] h-[60px] rounded-[70px] w-full px-3 outline-none text-[#000]"
            value={formData.total_price || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Prices;
