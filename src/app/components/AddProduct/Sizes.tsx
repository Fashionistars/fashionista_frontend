"use client";
import { ProductSchema } from "@/types";
import React, { useState } from "react";

const Sizes = ({
  formData,
  update,
}: {
  formData: ProductSchema;
  update: (fields: ProductSchema) => void;
}) => {
  const fields = [
    { id: crypto.randomUUID(), title: "sizes" },
    { id: crypto.randomUUID(), title: "price" },
  ];
  const [allFields, setAllFields] = useState(fields);
  const [isField, setIsField] = useState(false);
  const [newField, setNewField] = useState({ id: "", title: "" });
  const handleChange = (newField: { id: string; title: string }) => {
    setAllFields((prev) => [...prev, newField]);
    setIsField(false);
  };

  const inputFields = allFields.map((field: { id: string; title: string }) => {
    return (
      <div key={field.id} className="flex flex-col w-full md:w-[47%]">
        <label className="capitalize text-[15px] leading-5 text-[#000]">
          {field.title}
        </label>
        <input
          type="text"
          name={field.title}
          value={formData.title || ""}
          onChange={(e) => update({ ...formData, title: e.target.value })}
          className="rounded-[70px] text-black border-[#D9D9D9] border-[1.5px] w-full h-[60px] outline-none px-3"
        />
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="space-y-2 ">
        <h2 className="font-satoshi font-medium text-lg leading-6 text-black">
          Sizes
        </h2>
        {/* <p className="font-satoshi text-[13px] leading-[18px] text-[#4E4E4E]">
          Add any specification for your product
        </p> */}
      </div>
      <div className="min-h-[300px] flex flex-col justify-between">
        <div className="flex flex-wrap gap-6">{inputFields}</div>
        {isField && (
          <div className="w-full md:w-[60%] p-5  rounded-md mx-auto space-y-2 h-fit shadow-md">
            <h2 className="text-black text-center font-medium text-lg">
              Add Sizes
            </h2>
            <div className="space-y-2">
              <label className="capitalize text-[15px] leading-5 text-[#000]">
                Sizes
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setNewField({
                    id: crypto.randomUUID(),
                    title: e.target.value,
                  })
                }
                className="rounded-[70px] text-black border-[#D9D9D9] border-[1.5px] w-full h-[50px] px-3 outline-none"
              />
            </div>
            <div className="flex items-center gap-3">
              {" "}
              <button
                onClick={() => handleChange(newField)}
                className="p-2 border-2 border-[#fda600] outline-none"
              >
                Add field
              </button>
              <button
                className="p-2  outline-none"
                onClick={() => setIsField(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="py-6">
          <button
            onClick={() => setIsField(true)}
            className="text-black text-lg leading-6 font-medium font-satoshi px-4 py-4 bg-[#fda600]"
          >
            + Add more sizes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sizes;
