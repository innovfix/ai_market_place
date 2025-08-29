"use client";

import React from 'react';
import Link from 'next/link';
import { SellerDashboardHeader } from '@/components/site/SellerDashboardHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Calendar, Globe, Clock } from 'lucide-react';

export default function SellerAccountPage() {
  return (
    <div className="min-h-screen bg-black">
      <SellerDashboardHeader />

      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Account settings</h1>
            <p className="text-gray-400 mt-1">Tessa (Tessa@example.com)</p>
          </div>
          <div>
            <a href="/dashboard/profile" className="text-sm text-gray-300 hover:underline">Go to profile</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/seller-dashboard/account/personal" className="block">
            <Card className="bg-gray-900 border border-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A4 4 0 0112 15h0a4 4 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Personal information</h3>
                  <p className="text-sm text-gray-400 mt-2">Update your name, email address, online visibility, and account status.</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/seller-dashboard/account/security" className="block">
            <Card className="bg-gray-900 border border-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v2a3 3 0 01-3 3H9a3 3 0 01-3-3v-2c0-1.657 1.343-3 3-3h3z"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Account security</h3>
                  <p className="text-sm text-gray-400 mt-2">Update your password and manage additional security settings.</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/seller-dashboard/account/notifications" className="block">
            <Card className="bg-gray-900 border border-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Notifications</h3>
                  <p className="text-sm text-gray-400 mt-2">Select the notifications you want—and how you'd like to receive them.</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/seller-dashboard/account/business" className="block md:col-span-2">
            <Card className="bg-gray-900 border border-gray-700 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Personal & business info</h3>
                  <p className="text-sm text-gray-400 mt-2">Help AI Market maintain a safe and trustworthy marketplace.</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
