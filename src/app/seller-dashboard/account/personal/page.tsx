'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SellerDashboardHeader } from '@/components/site/SellerDashboardHeader';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function PersonalPage() {
  const [fullName, setFullName] = useState('Tessa');
  const [email, setEmail] = useState('Tessa@example.com');
  const [online, setOnline] = useState(true);
  const [offlineFor, setOfflineFor] = useState('');
  const [deactivateReason, setDeactivateReason] = useState('');

  const onSave = () => {
    // Placeholder for API call
    console.log({ fullName, email, online, offlineFor });
  };

  const onDeactivate = () => {
    // Placeholder for API call
    console.log({ deactivateReason });
  };

  return (
    <div className="min-h-screen bg-black">
      <SellerDashboardHeader />

      <div className="max-w-3xl mx-auto p-6 md:p-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-6">
          <Link href="/seller-dashboard/account" className="hover:underline">Settings</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Personal information</span>
        </div>

        <h1 className="text-2xl font-bold text-white">Personal information</h1>
        <p className="text-gray-400 mt-2">Update your name, email address, online visibility, and account status.</p>

        {/* Profile details */}
        <Card className="bg-gray-950 border border-gray-800 mt-6 p-6 rounded-xl">
          <div className="mb-4 flex items-center justify-end">
            <div className="text-sm text-gray-400">
              Need to update your public profile?{' '}
              <Link href="/dashboard/profile" className="text-blue-400 hover:underline">Go to My Profile</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 my-4" />

          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-wider text-gray-400 uppercase">Full name</label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-black/60 border-gray-800 text-white placeholder:text-gray-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-wider text-gray-400 uppercase">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/60 border-gray-800 text-white placeholder:text-gray-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Online status */}
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-wider text-gray-400 uppercase">Online status</label>
              <div className="flex items-center gap-3">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${online ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-sm text-gray-300">{online ? 'Online' : 'Offline'}</span>
                <select
                  value={offlineFor}
                  onChange={(e) => setOfflineFor(e.target.value)}
                  className="ml-auto w-44 rounded-md border border-gray-800 bg-black/60 px-3 py-2 text-xs font-semibold tracking-wider text-white outline-none focus:ring-2 focus:ring-blue-600 uppercase"
                >
                  <option value="" className="bg-black uppercase">Go offline for…</option>
                  <option value="1h" className="bg-black uppercase">1 hour</option>
                  <option value="4h" className="bg-black uppercase">4 hours</option>
                  <option value="1d" className="bg-black uppercase">1 day</option>
                  <option value="7d" className="bg-black uppercase">7 days</option>
                </select>
              </div>
              <div className="mt-2 text-xs text-gray-500">When online, your agents are visible under the Online search filter.</div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button onClick={onSave}>Save Changes</Button>
            </div>
          </div>
        </Card>

        {/* Account deactivation */}
        <Card className="bg-gray-950 border border-gray-800 mt-6 p-6 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Account deactivation</div>
              <div className="mt-4 text-sm text-gray-400 space-y-2">
                <div className="font-semibold text-gray-300">What happens when you deactivate your account?</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Your profile and agents won't be shown on AI Market anymore.</li>
                  <li>Active orders will be cancelled.</li>
                  <li>You won't be able to re-activate your agents.</li>
                </ul>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-wider text-gray-400 uppercase">I'm leaving because…</label>
              <select
                value={deactivateReason}
                onChange={(e) => setDeactivateReason(e.target.value)}
                className="w-full rounded-md border border-gray-800 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="" className="bg-black">Choose a reason</option>
                <option value="not-selling" className="bg-black">Not getting sales</option>
                <option value="quality-issues" className="bg-black">Quality / platform issues</option>
                <option value="privacy" className="bg-black">Privacy concerns</option>
                <option value="other" className="bg-black">Other</option>
              </select>

              <div className="mt-4 flex justify-end">
                <Button
                  onClick={onDeactivate}
                  disabled={!deactivateReason}
                  className="disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Deactivate Account
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6">
          <Link href="/seller-dashboard/account" className="text-blue-400 hover:underline">Back to account</Link>
        </div>
      </div>
    </div>
  );
}
