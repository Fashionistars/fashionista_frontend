import { z } from "zod";
import { FormSchema } from "./app/utils/schema";
import { signupSchema } from "./app/utils/schemas/auth_shema";

interface CardProps {
  image: string;
  title: string;
  vendor: string;
  rating: number;
  price: number;
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
type ProductSchema = z.infer<typeof FormSchema>;

type SignUpProps = z.infer<typeof signupSchema>;

interface OrderProp {
  id: number;
  date: string;
  customer_name: string;
  address: string;
  payment_status: "Paid" | "pending" | "failed";
  order_status:
    | "pending"
    | "fulfilled"
    | "ready-to-deliver"
    | "delivered"
    | "returned";
  items: number;
}
