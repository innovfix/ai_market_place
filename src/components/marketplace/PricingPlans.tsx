"use client";

import { Check, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingPlansProps {
  basePriceUSD?: number;
}

export function PricingPlans({ basePriceUSD = 129 }: PricingPlansProps) {
  const price = Math.round(basePriceUSD);
  const items: { label: string; included: boolean }[] = [
    { label: "3-day delivery", included: true },
    { label: "Unlimited revisions", included: true },
    { label: "Up to 20 pages/screens", included: true },
    { label: "Design customization", included: true },
    { label: "Content upload", included: true },
    { label: "Responsive design", included: true },
    { label: "Source code", included: true },
    { label: "Detailed code comments", included: true },
  ];

  return (
    <div className="rounded-2xl border bg-background shadow-sm">
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Price</div>
          <div className="text-lg sm:text-xl font-semibold">${price}</div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="inline-flex items-center gap-2"><Clock className="size-4" /> <span>Fast delivery</span></div>
          <div className="inline-flex items-center gap-2"><RefreshCw className="size-4" /> <span>Unlimited revisions</span></div>
        </div>

        <ul className="mt-4 space-y-2 text-xs sm:text-sm">
          {items.map((f) => (
            <li key={f.label} className={f.included ? "flex items-center gap-2" : "flex items-center gap-2 opacity-50"}> 
              <Check className="size-4" />
              <span>{f.label}</span>
            </li>
          ))}
        </ul>

        <Button className="mt-5 w-full h-11 rounded-[10px]">Continue</Button>
      </div>
    </div>
  );
}

export default PricingPlans;


