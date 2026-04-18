import NewProductContextProvider from "@/features/shop/store/product-context";

export default function VendorProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NewProductContextProvider>{children}</NewProductContextProvider>;
}
