"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { SellerTopNav } from "@/components/site/SellerTopNav";

type OrdersTab = "PRIORITY" | "ACTIVE" | "LATE" | "DELIVERED" | "COMPLETED" | "CANCELLED" | "STARRED";

export default function SellerOrdersPage() {
  const params = useParams<{ seller: string }>();
  const seller = params?.seller ? decodeURIComponent(params.seller) : "";
  const [tab, setTab] = useState<OrdersTab>("PRIORITY");

  const emptyText = useMemo(() => {
    const lower = tab.toLowerCase();
    return `No ${lower} orders to show.`;
  }, [tab]);

  return (
    <div>
      <SellerTopNav seller={seller} />
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <h1 className="text-3xl font-semibold tracking-tight mb-4">Manage Orders</h1>

        {/* Tabs */}
        <div className="flex items-center justify-between border-b">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            {(["PRIORITY", "ACTIVE", "LATE", "DELIVERED", "COMPLETED", "CANCELLED", "STARRED"] as OrdersTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative py-3 ${tab === t ? "text-foreground" : "text-muted-foreground"}`}
                aria-current={tab === t ? "page" : undefined}
              >
                {t}
                {tab === t ? <span className="absolute inset-x-0 -bottom-px h-[2px] bg-foreground" /> : null}
              </button>
            ))}
          </div>
          <div className="hidden md:block py-2">
            <input
              placeholder="Search My History..."
              className="h-9 w-60 rounded-md border bg-background px-3 text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">BUYER</th>
                <th className="px-4 py-3 text-left font-medium">GIG</th>
                <th className="px-4 py-3 text-left font-medium">DUE ON</th>
                <th className="px-4 py-3 text-left font-medium">TOTAL</th>
                <th className="px-4 py-3 text-left font-medium">NOTE</th>
                <th className="px-4 py-3 text-left font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-10 text-center text-muted-foreground" colSpan={6}>{emptyText}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


