import React from "react";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border border-red-500 w-1/2 h-screen">
      <h2 className="font-medium text-red-700 text-3xl">Clients Dashboard</h2>
      <nav className="flex items-center gap-4">
        <Link
          href="/parellel/orders"
          className="text-[#282828] font-medium font-satoshi"
        >
          Orders
        </Link>
        <Link
          href="/parellel/products"
          className="text-[#282828] font-medium font-satoshi"
        >
          Products
        </Link>
        <Link
          href="/parellel/settings"
          className="text-[#282828] font-medium font-satoshi"
        >
          Settings
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default layout;
