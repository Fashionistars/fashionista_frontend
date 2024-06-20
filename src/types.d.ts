import { z } from "zod"
import { FormSchema } from "./app/utils/schema"

interface CardProps{
    image: string,
    title: string,
    vendor: string,
    rating: number,
    price: number
}

// interface ProductSchema{
//     image_1: File,
//     title: string,
//     description: string,
//     sales_prices: string,
//     regular_prices: string,
//     shipping_amount: string,
//     stock_qty: string,
//     tag: string,
//     total_price: string,
//     category: string,
//     brands: string,
//     image_2: File,
//     image_3: File,    
// }
type ProductSchema = z.infer<typeof FormSchema>