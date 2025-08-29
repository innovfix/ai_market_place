'use client';

import React from 'react';
import Link from 'next/link';
import { SellerDashboardHeader } from '@/components/site/SellerDashboardHeader';

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-black">
      <SellerDashboardHeader />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-white">Personal & business info</h1>
        <p className="text-gray-400 mt-2">Help AI Market maintain a safe and trustworthy marketplace.</p>
        <div className="mt-6">
          <Link href="/seller-dashboard/account" className="text-blue-400 hover:underline">Back to account</Link>
        </div>
      </div>
    </div>
  );
}
