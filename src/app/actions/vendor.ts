"use server";
import { object, z } from "zod";
import { FormSchema, PricesSchema } from "../utils/schema";
import { fetchWithAuth } from "../utils/fetchAuth";
import {
  BasicInformationSchema,
  CategorySchema,
  ColorSchema,
  GallerySchema,
  NewProductFieldTypes,
  SizesSchema,
  SpecificationSchema,
} from "../utils/schemas/addProduct";
import { redirect } from "next/navigation";

export const BasicInformationAction = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata.entries());
  const validated = BasicInformationSchema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }
  redirect("/dashboard/products?step=prices");
};
export const PricesAction = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata.entries());
  const validated = PricesSchema.safeParse(data);
  if (!validated.success) {
    console.log(validated.error.flatten().fieldErrors);
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }
  redirect("/dashboard/products?step=category");
};
export const CategoryAction = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata.entries());
  const validated = CategorySchema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }
  redirect("/dashboard/products?step=gallery");
};
export const GalleryAction = async (prev: any, formdata: FormData) => {
  const data = Object.fromEntries(formdata.entries());
  const validated = GallerySchema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  redirect("/dashboard/products?step=specification");
};
export const SpecificationAction = async (prev: any, formdata: FormData) => {
  const data = Object.fromEntries(formdata.entries());

  const specData = { specification: data };
  const validated = SpecificationSchema.safeParse(specData);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }
  redirect("/dashboard/products?step=sizes");
};
export const SizesAction = async (prev: any, formdata: FormData) => {
  const newData = {
    sizes: {
      size: formdata.get("size"),
      price: formdata.get("size_price"),
    },
  };

  const validated = SizesSchema.safeParse(newData);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }
  redirect("/dashboard/products?step=color");
};

export const ColorAction = async (
  fields: NewProductFieldTypes,
  formdata: FormData
) => {
  const validatedColor = ColorSchema.safeParse(fields);
  if (!validatedColor.success) {
    return {
      errors: validatedColor.error.flatten().fieldErrors,
    };
  }
  const validatedSizes = SizesSchema.safeParse(fields);
  if (!validatedSizes.success) {
    return {
      errors: validatedSizes.error.flatten().fieldErrors,
    };
  }
  const validated_spec = SpecificationSchema.safeParse(fields);
  if (!validated_spec.success) {
    return {
      errors: validated_spec.error.flatten().fieldErrors,
    };
  }
  const validated_gallery = GallerySchema.safeParse(fields);
  if (!validated_gallery.success) {
    return {
      errors: validated_gallery.error.flatten().fieldErrors,
    };
  }
  const validated_category = CategorySchema.safeParse(fields);
  if (!validated_category.success) {
    return {
      errors: validated_category.error.flatten().fieldErrors,
    };
  }
  const validated_prices = PricesSchema.safeParse(fields);
  if (!validated_prices.success) {
    return {
      errors: validated_prices.error.flatten().fieldErrors,
    };
  }
  const validated_basic = BasicInformationSchema.safeParse(fields);
  if (!validated_basic.success) {
    return {
      errors: validated_basic.error.flatten().fieldErrors,
    };
  }
  console.log("Created Product details", fields);
};

export const newProduct = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata.entries());
  console.log(data);
  // console.log("form information", data);
  // const validatedForm = FormSchema.safeParse(data);
  // if (!validatedForm.success) {
  //   return {
  //     errors: validatedForm.error.flatten().fieldErrors,
  //   };
  // }
  // try {
  //   const res = await fetchWithAuth(
  //     "/vendor/product-create",
  //     "post",
  //     data,
  //     "multipart/formdata"
  //   );
  //   console.log(res);
  //   return { message: "New Product created Successfully" };
  // } catch (error) {
  //   console.log(error);
  //   return {
  //     call_errors: "There was an error while trying to create this product",
  //   };
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
