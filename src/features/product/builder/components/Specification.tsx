"use client";
import { useActionState } from "react";
import { SpecificationAction } from "../api/actions";

const Specification = ({
  newProductFields,
  updateNewProductField,
}: {
  newProductFields: NewProductType;
  updateNewProductField: (fields: Partial<NewProductFieldTypes>) => void;
}) => {
  // React 19: useFormState renamed to useActionState (imported from "react")
  const [state, formAction] = useActionState(SpecificationAction, null);
  console.log(state);
  return (
    <form
      className="flex flex-col gap-8 w-full"
      id="specification"
      action={formAction}
    >
      <div className="space-y-2 ">
        <h2 className="font-satoshi font-medium text-lg leading-6 text-black">
          Specification
        </h2>
        <p className="font-satoshi text-[13px] leading-[18px] text-[#4E4E4E]">
          Add any specification for your product
        </p>
      </div>
      <div className="min-h-[300px] flex flex-col justify-between">
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col w-full md:w-[47%]">
            <label className="capitalize text-[15px] leading-5 text-[#000]">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={newProductFields?.specification?.title}
              onChange={(e) =>
                updateNewProductField({
                  ...newProductFields,
                  specification: {
                    ...newProductFields.specification,
                    title: e.target.value,
                  },
                })
              }
              className="rounded-[70px] text-black border-[#D9D9D9] border-[1.5px] w-full h-[60px] outline-none px-3"
            />
          </div>
          <div className="flex flex-col w-full md:w-[47%]">
            <label className="capitalize text-[15px] leading-5 text-[#000]">
              Content
            </label>
            <input
              type="text"
              name="content"
              onChange={(e) =>
                updateNewProductField({
                  ...newProductFields,
                  specification: {
                    ...newProductFields.specification,
                    content: e.target.value,
                  },
                })
              }
              defaultValue={newProductFields.specification?.content ?? ""}
              className="rounded-[70px] text-black border-[#D9D9D9] border-[1.5px] w-full h-[60px] outline-none px-3"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Specification;
