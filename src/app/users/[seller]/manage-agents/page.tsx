"use client";

import { agents } from "@/data/agents";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { SellerTopNav } from "@/components/site/SellerTopNav";
import { notFound } from "next/navigation";
import { use } from "react";

export default function ManageAgentsPage({ params }: { params: Promise<{ seller: string }> }) {
  const { seller } = use(params);
  const decoded = decodeURIComponent(seller);
  const list = agents.filter((a) => a.seller?.name.toLowerCase() === decoded.toLowerCase());
  if (list.length === 0) return notFound();

  return (
    <div>
      <SellerTopNav seller={decoded} />

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Manage Agents</h1>
            <p className="text-sm text-muted-foreground">Seller: {decoded}</p>
          </div>
          <Button asChild>
            <Link href="/onboarding/gig">Create a New Agent</Link>
          </Button>
        </div>

        <div className="overflow-x-auto rounded-2xl border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Agent</th>
                <th className="px-4 py-3 text-left font-medium">Impressions</th>
                <th className="px-4 py-3 text-left font-medium">Clicks</th>
                <th className="px-4 py-3 text-left font-medium">Orders</th>
                <th className="px-4 py-3 text-left font-medium">Cancellations</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-md border bg-secondary">
                        {a.imageUrl ? <Image src={a.imageUrl} alt={a.name} fill className="object-cover" /> : null}
                      </div>
                      <div>
                        <div className="font-medium leading-tight">{a.name}</div>
                        <div className="text-xs text-muted-foreground">{a.provider} • {a.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">0</td>
                  <td className="px-4 py-3">0</td>
                  <td className="px-4 py-3">0</td>
                  <td className="px-4 py-3">0%</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/agents/${a.id}`}>View</Link>
                      </Button>
                      <Button variant="secondary" size="sm" asChild>
                        <Link href="/onboarding/gig">Edit</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


