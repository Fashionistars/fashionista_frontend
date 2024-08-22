import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h2 className="font-medium text-red-700 text-3xl">Client Dashboard</h2>
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
    </div>
  );
};

export default page;
