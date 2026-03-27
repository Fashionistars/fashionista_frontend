import React from "react";
import OrderTable from "@/components/OrdersTable";
import { Suspense } from "react";
import { getVendorOrders } from "@/core/services/api";
import { OrderProp } from "@/types";

const page = async () => {
  const orders = (await getVendorOrders()) as OrderProp[];
  // console.log(orders);
  return (
    <div>
      <Suspense>
        <OrderTable />
      </Suspense>
    </div>
  );
};

export default page;
