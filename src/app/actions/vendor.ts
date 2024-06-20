"use server"
import { z } from "zod"
import { FormSchema } from "../utils/schema"
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
    discription: z.string().min(10, 'Product description is required')
})

export const newProduct = async (formdata:FormData) => {
    const data = Object.fromEntries(formdata.entries())
  console.log("form data info",data)
  const validatedForm = FormSchema.safeParse(data)
  if (!validatedForm.success) {
    return {
      errors: validatedForm.error.flatten().fieldErrors
    }
  }
  console.log("validated data:", data)
}