/**
 * @file OrderDetailView.tsx
 * @description Shared client/vendor/admin order detail surface for immutable order snapshots.
 */
"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, PackageCheck, XCircle } from "lucide-react";
import {
  useAdminOrderDetail,
  useCancelOrder,
  useConfirmDelivery,
  useOrderDetail,
  useUpdateAdminDeliveryStatus,
  useUpdateVendorProductionStatus,
  useVendorOrderDetail,
} from "../hooks/use-order";

type Scope = "client" | "vendor" | "admin";

interface OrderDetailViewProps {
  orderId: string;
  scope: Scope;
}

const backHref: Record<Scope, string> = {
  client: "/client/dashboard/orders",
  vendor: "/vendor/orders",
  admin: "/admin-dashboard/orders",
};

export default function OrderDetailView({ orderId, scope }: OrderDetailViewProps) {
  const clientQuery = useOrderDetail(orderId, scope === "client");
  const vendorQuery = useVendorOrderDetail(orderId, scope === "vendor");
  const adminQuery = useAdminOrderDetail(orderId, scope === "admin");

  const query =
    scope === "vendor" ? vendorQuery : scope === "admin" ? adminQuery : clientQuery;
  const order = query.data;

  const cancelOrder = useCancelOrder();
  const confirmDelivery = useConfirmDelivery();
  const updateVendorStatus = useUpdateVendorProductionStatus();
  const updateAdminStatus = useUpdateAdminDeliveryStatus();

  if (query.isLoading) {
    return (
      <section className="space-y-4 p-4 md:p-8">
        <div className="shimmer h-8 w-48 rounded" />
        <div className="shimmer h-72 rounded-xl" />
      </section>
    );
  }

  if (query.isError || !order) {
    return (
      <section className="p-8">
        <Link href={backHref[scope]} className="mb-6 inline-flex items-center gap-2 text-sm text-[#01454A]">
          <ArrowLeft size={16} /> Back to orders
        </Link>
        <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-sm text-red-600">
          Order could not be loaded.
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 p-4 md:p-8">
      <Link href={backHref[scope]} className="inline-flex items-center gap-2 text-sm font-medium text-[#01454A]">
        <ArrowLeft size={16} /> Back to orders
      </Link>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-black">{order.order_number}</h1>
          <p className="text-sm text-gray-500">
            Created {new Date(order.created_at).toLocaleString("en-NG")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {scope === "client" && order.status === "delivered" && (
            <button
              type="button"
              onClick={() => confirmDelivery.mutate(order.id)}
              disabled={confirmDelivery.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-[#01454A] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              <CheckCircle2 size={16} /> Confirm delivery
            </button>
          )}
          {scope === "client" && ["pending_payment", "payment_confirmed"].includes(order.status) && (
            <button
              type="button"
              onClick={() => cancelOrder.mutate({ orderId: order.id, input: { reason: "Cancelled from client dashboard" } })}
              disabled={cancelOrder.isPending}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 disabled:opacity-60"
            >
              <XCircle size={16} /> Cancel order
            </button>
          )}
          {scope === "vendor" && (
            <button
              type="button"
              onClick={() => updateVendorStatus.mutate({ orderId: order.id, input: { status: "processing", notes: "Production started from vendor dashboard" } })}
              disabled={updateVendorStatus.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-[#FDA600] px-4 py-2 text-sm font-medium text-black disabled:opacity-60"
            >
              <PackageCheck size={16} /> Mark processing
            </button>
          )}
          {scope === "admin" && (
            <button
              type="button"
              onClick={() => updateAdminStatus.mutate({ orderId: order.id, input: { status: "delivered", notes: "Delivery confirmed by admin dashboard" } })}
              disabled={updateAdminStatus.isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-[#01454A] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              <PackageCheck size={16} /> Mark delivered
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Status", order.status.replace(/_/g, " ")],
          ["Payment", order.payment_status],
          ["Escrow", order.escrow_status],
          ["Total", `${order.currency} ${Number(order.final_total).toLocaleString("en-NG")}`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="mt-1 text-sm font-semibold capitalize text-black">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-4">
            <h2 className="font-semibold text-black">Immutable order items</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <div key={item.id} className="grid gap-3 p-4 md:grid-cols-[1fr_100px_140px] md:items-center">
                <div>
                  <p className="font-medium text-black">{item.product_title}</p>
                  <p className="text-xs text-gray-500">
                    SKU {item.product_sku || "N/A"} · Vendor {item.vendor_name || "N/A"}
                  </p>
                  {(item.size_label || item.color_label) && (
                    <p className="text-xs text-gray-400">
                      {[item.size_label, item.color_label].filter(Boolean).join(" / ")}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-600">Qty {item.quantity}</p>
                <p className="text-sm font-semibold text-black">
                  {item.currency_code} {Number(item.line_total).toLocaleString("en-NG")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <h2 className="font-semibold text-black">Buyer</h2>
            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p>{order.buyer_name || "N/A"}</p>
              <p>{order.buyer_email || "N/A"}</p>
              <p>{order.buyer_phone || "N/A"}</p>
            </div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <h2 className="font-semibold text-black">Status history</h2>
            <div className="mt-3 space-y-3">
              {order.status_history.length === 0 ? (
                <p className="text-sm text-gray-400">No status history yet.</p>
              ) : (
                order.status_history.map((row) => (
                  <div key={row.id} className="border-l-2 border-[#FDA600] pl-3">
                    <p className="text-sm font-medium text-black">
                      {(row.to_status ?? row.status ?? "updated").replace(/_/g, " ")}
                    </p>
                    <p className="text-xs text-gray-500">{row.notes || row.note || "No notes"}</p>
                    <p className="text-[11px] text-gray-400">
                      {new Date(row.created_at).toLocaleString("en-NG")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
