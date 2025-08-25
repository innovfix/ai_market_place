"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { SellerTopNav } from "@/components/site/SellerTopNav";
import { Button } from "@/components/ui/button";

type EarningsTab = "Overview" | "Financial documents";

export default function SellerEarningsPage() {
  const params = useParams<{ seller: string }>();
  const seller = params?.seller ? decodeURIComponent(params.seller) : "";
  const [tab, setTab] = useState<EarningsTab>("Overview");

  return (
    <div>
      <SellerTopNav seller={seller} />
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Earnings</h1>

        {/* Tabs */}
        <div className="mt-4 flex items-center gap-6 border-b text-sm">
          {["Overview", "Financial documents"].map((t) => (
            <button
              key={t}
              className={`relative py-3 ${tab === (t as EarningsTab) ? "text-foreground" : "text-muted-foreground"}`}
              onClick={() => setTab(t as EarningsTab)}
            >
              {t}
              {tab === (t as EarningsTab) ? <span className="absolute inset-x-0 -bottom-px h-[2px] bg-foreground" /> : null}
            </button>
          ))}
        </div>

        {tab === "Overview" ? (
          <>
            {/* Summary cards */}
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border p-6">
                <div className="text-sm text-muted-foreground">Available funds</div>
                <div className="mt-4 rounded-xl border p-5">
                  <div className="text-sm text-muted-foreground">Balance available for use</div>
                  <div className="mt-2 text-4xl font-semibold">$0.00</div>
                  <Button className="mt-6">Add payout method</Button>
                </div>
              </div>
              <div className="rounded-2xl border p-6">
                <div className="text-sm text-muted-foreground">Future payments</div>
                <div className="mt-4 space-y-4">
                  <div className="rounded-xl border p-4">
                    <div className="text-sm text-muted-foreground">Payments being cleared</div>
                    <div className="mt-1 text-2xl font-semibold">$0.00</div>
                  </div>
                  <div className="rounded-xl border p-4">
                    <div className="text-sm text-muted-foreground">Payments for active orders</div>
                    <div className="mt-1 text-2xl font-semibold">$0.00</div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Earnings & expenses</div>
                  <div className="text-xs text-muted-foreground">Since joining ▾</div>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="rounded-xl border p-4">
                    <div className="text-sm text-muted-foreground">Earnings to date</div>
                    <div className="mt-1 text-2xl font-semibold">$0.00</div>
                    <div className="text-xs text-muted-foreground">Your earnings since joining.</div>
                  </div>
                  <div className="rounded-xl border p-4">
                    <div className="text-sm text-muted-foreground">Expenses to date</div>
                    <div className="mt-1 text-2xl font-semibold">$0.00</div>
                    <div className="text-xs text-muted-foreground">Earnings spent on purchases since joining.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity table */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <select className="h-9 rounded-md border bg-background px-3 text-sm">
                  <option>Date range</option>
                </select>
                <select className="h-9 rounded-md border bg-background px-3 text-sm">
                  <option>Activity</option>
                </select>
              </div>
              <div className="text-sm underline">Email activity report</div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-left font-medium">Activity</th>
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                    <th className="px-4 py-3 text-left font-medium">From</th>
                    <th className="px-4 py-3 text-left font-medium">Order</th>
                    <th className="px-4 py-3 text-left font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="px-4 py-20 text-center text-lg font-semibold">
                      Beginnings are so exciting!
                      <div className="mt-2 text-sm text-muted-foreground">
                        You’ll find all your earnings info here once you complete your first order.
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="mt-6 rounded-2xl border p-6 text-sm text-muted-foreground">Upload or view statements will appear here.</div>
        )}
      </div>
    </div>
  );
}


