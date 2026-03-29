import React from "react";
import NewProductContextProvider from "@/features/shop/store/product-context";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <NewProductContextProvider>{children}</NewProductContextProvider>;
};

export default layout;
