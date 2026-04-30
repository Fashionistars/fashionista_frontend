import type { NewProductFieldTypes } from "@/lib/validation/addProduct";

export interface CardProps {
  id?: string;
  image: string;
  title: string;
  vendor: string;
  rating: number;
  price: number;
}

export type NewProductType = NewProductFieldTypes;

export interface OrderProp {
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

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface CollectionsProps {
  id: string;
  image: string;
  rating: number;
  title: string;
  price: string;
}

export interface VendorProp {
  id: string;
  image: string;
  name: string;
  rating: number;
  address: string;
  mobile: string;
  slug: string;
}
