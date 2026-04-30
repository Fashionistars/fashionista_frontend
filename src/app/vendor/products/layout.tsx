import NewProductContextProvider from "@/features/product/builder/store/product-context";

export default function VendorProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NewProductContextProvider>{children}</NewProductContextProvider>;
}
