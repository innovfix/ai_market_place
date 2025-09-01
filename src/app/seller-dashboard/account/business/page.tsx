'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SellerDashboardHeader } from '@/components/site/SellerDashboardHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BusinessPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleVerify = async () => {
    setSubmitting(true);
    try {
      // TODO: Wire to backend verification endpoint
      await new Promise((r) => setTimeout(r, 800));
      alert('Submitted for verification');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <SellerDashboardHeader />
      <div className="max-w-5xl mx-auto p-8">
        {/* Breadcrumb */}
        <div className="text-gray-400 text-sm mb-4">
          <Link className="hover:underline" href="/seller-dashboard/account">Account settings</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Identity verification</span>
        </div>

        <h1 className="text-3xl font-bold text-white">Identity verification</h1>
        <p className="text-gray-400 mt-2">
          Fill out your personal and business information to verify your identity.{' '}
          <a className="text-blue-400 hover:underline" href="#">Learn more</a>
        </p>

        <div className="grid grid-cols-1 gap-6 mt-8">
          {/* Personal Information */}
          <Card className="bg-gray-900 border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Personal information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">First name</label>
                <Input placeholder="Tessa" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Last name</label>
                <Input placeholder="Smith" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Date of birth</label>
                <Input type="date" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Country</label>
                <Input placeholder="India" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">Address</label>
                <Input placeholder="Street, City, State, ZIP" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Government ID (front)</label>
                <Input type="file" className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:border-0" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Government ID (back)</label>
                <Input type="file" className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:border-0" />
              </div>
            </div>
          </Card>

          {/* Business Information */}
          <Card className="bg-gray-900 border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Business information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Business type</label>
                <Input placeholder="Individual / Sole proprietor / Pvt Ltd" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Company name (optional)</label>
                <Input placeholder="Your Company Pvt Ltd" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Registration number (optional)</label>
                <Input placeholder="CIN / UEN / Other" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Tax ID (optional)</label>
                <Input placeholder="GSTIN / PAN" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">Business address (optional)</label>
                <Input placeholder="Street, City, State, ZIP" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">Business registration document (optional)</label>
                <Input type="file" className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:border-0" />
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleVerify}
              disabled={submitting}
            >
              {submitting ? 'Submitting…' : 'Verify'}
            </Button>
            <Link href="/seller-dashboard/account" className="text-gray-300 hover:text-white">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
