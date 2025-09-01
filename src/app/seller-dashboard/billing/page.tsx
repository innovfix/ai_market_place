"use client";

import React from "react";
import Link from "next/link";
import { SellerDashboardHeader } from "@/components/site/SellerDashboardHeader";
import BillingPanel from "@/components/dashboard/BillingPanel";

export default function SellerBillingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SellerDashboardHeader />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-semibold mb-6">Billing and payments</h1>
        <BillingPanel />
      </div>
    </div>
  );
}
