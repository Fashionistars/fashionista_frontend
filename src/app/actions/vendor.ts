"use server";
import { object, z } from "zod";
import { FormSchema } from "../utils/schema";
import { fetchWithAuth } from "../utils/fetchAuth";
const schema = z.object({
  image_1: z
    .instanceof(File, {
      message: "Image is required and should be a file",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    }) // 5MB limit
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          file.type
        ),
      { message: "Image must be a JPEG, PNG, or GIF" }
    ),
  title: z.string().min(3, "Product title is required "),
  discription: z.string().min(10, "Product description is required"),
});

export const newProduct = async (data: object) => {
  // const data = typeof formdata == FormData ? Object.fromEntries(formdata.entries()): formdata
  console.log("form information", data);
  // const validatedForm = FormSchema.safeParse(data);
  // if (!validatedForm.success) {
  //   return {
  //     errors: validatedForm.error.flatten().fieldErrors,
  //   };
  // }
  // console.log("validated data:", data)
  // try {
  //   const res = await fetchWithAuth(
  //     "/vendor/product-create",
  //     "post",
  //     data,
  //     "multipart/formdata"
  //   );
  //   console.log(res);
  // } catch (error) {
  //   console.log(error);
  // }
};
export const deleteProduct = async (vendor_id: string, product_id: string) => {
  try {
    const res = await fetchWithAuth(
      `/vendor/product-delete/${vendor_id}/${product_id}`,
      "delete"
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async () => {};
