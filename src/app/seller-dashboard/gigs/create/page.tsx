"use client";

import { CreateGigContent } from "@/app/onboarding/gig/page";
import { SellerDashboardHeader } from "@/components/site/SellerDashboardHeader";

export default function SellerCreateGigPage() {
  return (
    <div>
      <SellerDashboardHeader />
      <CreateGigContent includeTopNav={false} />
    </div>
  );
}

