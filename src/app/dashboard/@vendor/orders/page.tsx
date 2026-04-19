import { OrderTable } from "@/features/orders/components";
import { Suspense } from "react";
import { getVendorOrders } from "@/core/services/api";

const page = async () => {
  await getVendorOrders();
  return (
    <div>
      <Suspense>
        <OrderTable />
      </Suspense>
    </div>
  );
};

export default page;
