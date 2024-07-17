"use client";
import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import BasicInformation from "./AddProduct/BasicInformation";
import Prices from "./AddProduct/Prices";
import Category from "./AddProduct/Category";
import Gallery from "./AddProduct/Gallery";
import { newProduct } from "../actions/vendor";
import validator from "../utils/validator";
import { ProductSchema } from "@/types";
import Specification from "./AddProduct/Specification";
import Sizes from "./AddProduct/Sizes";
import Color from "./AddProduct/Color";
import { createNewProduct } from "../utils/libs";

const MultiStep = () => {
  const initialValue = {
    image_1: undefined as unknown as File,
    title: "",
    description: "",
    sales_prices: "",
    regular_prices: "",
    shipping_amount: "1000",
    stock_qty: "",
    tag: "",
    total_price: "",
    category: "",
    brands: "",
    image_2: undefined as unknown as File,
    image_3: undefined as unknown as File,
    image_4: undefined as unknown as File,
    video: undefined as unknown as File,
  };
  const [current, setCurrent] = useState(0);
  const [arrIndex, setArrIndex] = useState(0);
  const [data, setData] = useState<ProductSchema>(initialValue);

  const update = (fields: Partial<ProductSchema>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const formParts = [
    <BasicInformation formData={data} update={update} />,
    <Prices formData={data} update={update} />,
    <Category />,
    <Gallery formData={data} update={update} />,
    <Specification formData={data} update={update} />,
    <Sizes formData={data} update={update} />,
    <Color formData={data} update={update} />,
  ];
  const formPartSchema = [];
  const delta = 1;
  const isLastElement = arrIndex == formParts.length - 1;
  const isFirstElement = arrIndex == 0;

  // const next = () => {

  //   setCurrent((prev) => prev + 1);
  //   setArrIndex((prev) => prev + 1);
  // };
  const next = () => {
    if (arrIndex >= formParts.length - 1) return arrIndex;
    setCurrent((prev) => prev + 1);
    setArrIndex((prev) => prev + 1);
    console.log(data);
  };
  const back = () => {
    if (arrIndex !== 0) {
      setCurrent((prev) => prev - 1);
      return setArrIndex((prev) => prev - 1);
    }
    return arrIndex;
  };
  // const handleFormData = async () => {
  //   const formInfo = new FormData();
  //   newProduct(data);
  // };
  // const newProduct = async (formdata: object | FormData) => {
  //   try {

  //   } catch (error) {

  //   }

  // }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("hello world");
    // createNewProduct
    !isLastElement ? next() : "";
  };

  return (
    <div className="p-5 pt-12 md:p-6 md:pb-20 w-full md:w-[75%] h-[680px] bg-transparent hide_scrollbar overflow-auto relative top-[16%] md:fixed md:top-[16%] right-0 flex flex-col gap-8 z-10">
      <div className="bg-[#fff] rounded-[10px] p-[15px] md:p-6  w-full h-fit relative pb-10 ">
        <ul className="flex items-center justify-between md:justify-end left-0 absolute -top-12 md:top-6 md:right-6 md:gap-5 font-satoshi">
          <li
            className={`font-medium text-[11px] md:text-sm text-black px-1 md:px-2 py-3 ${
              current == 0 ? "bg-[#fda600]" : ""
            } `}
          >
            Basic Information
          </li>
          <li
            className={`font-medium text-[11px] md:text-sm transition-colors text-black px-1.5 md:px-2 py-3 ${
              current == 1 && "bg-[#fda600]"
            }`}
          >
            Prices
          </li>
          <li
            className={`font-medium text-[11px] md:text-sm transition-colors text-black px-1.5 md:px-2 py-3 ${
              current == 2 && "bg-[#fda600]"
            }`}
          >
            Category
          </li>
          <li
            className={`font-medium text-[11px] md:text-sm transition-colors text-black px-1.5 md:px-2 py-3 ${
              current == 3 && "bg-[#fda600]"
            }`}
          >
            Gallery
          </li>
          <li
            className={`font-medium text-[11px]  md:text-sm transition-colors text-black px-1.5 md:px-2 py-3 ${
              current == 4 && "bg-[#fda600]"
            }`}
          >
            Specification
          </li>
          <li
            className={`font-medium text-[11px] md:text-sm transition-colors text-black px-1.5 md:px-2 py-3 ${
              current == 5 && "bg-[#fda600]"
            }`}
          >
            Size
          </li>
          <li
            className={`font-medium text-[11px] md:text-sm transition-colors text-black px-1.5 md:px-2 py-3 ${
              current == 6 && "bg-[#fda600]"
            }`}
          >
            Color
          </li>
        </ul>
        <form id="form" onSubmit={handleSubmit}>
          {current == 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <BasicInformation formData={data} update={update} />
            </motion.div>
          )}
          {current == 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Prices formData={data} update={update} />
            </motion.div>
          )}
          {current == 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Category />
            </motion.div>
          )}
          {current == 3 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Gallery formData={data} update={update} />
            </motion.div>
          )}
          {current == 4 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Specification formData={data} update={update} />
            </motion.div>
          )}
          {current == 5 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Sizes formData={data} update={update} />
            </motion.div>
          )}
          {current == 6 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Color formData={data} update={update} />
            </motion.div>
          )}
        </form>
      </div>
      <div className="flex items-center justify-end gap-8 w-full py-6">
        <button
          onClick={back}
          type="button"
          disabled={isFirstElement}
          className={`py-2.5 px-[30px] bg-transparent outline-none font-medium text-lg leading-6 text-[#4E4E4E] hover:text-black disabled:cursor-not-allowed disabled:text-[#d9d9d9]`}
        >
          Back
        </button>

        <button
          onClick={next}
          form="form"
          type={isLastElement ? "submit" : "button"}
          className="py-2.5 px-[30px] bg-[#fda600] outline-none font-medium text-black hover:text-white grow-0"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MultiStep;
