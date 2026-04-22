import { VendorOrderDetailView } from "@/features/vendor";

export default async function VendorOrderDetailPage({
  params,
}: {
  params: Promise<{ order_oid: string }>;
}) {
  const { order_oid } = await params;
  return <VendorOrderDetailView orderOid={order_oid} />;
}
