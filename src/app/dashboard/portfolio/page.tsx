"use client";

import React from "react";
import Link from 'next/link';
import { LoggedInHeader } from '@/components/site/LoggedInHeader';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function DashboardPortfolioPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <LoggedInHeader />
      <main className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/profile1.jpeg" alt="Ashok Kumar" />
              <AvatarFallback className="bg-gray-700 text-white">A</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">Ashok Kumar</h1>
          </div>
          <div className="self-start">
            <Button disabled className="bg-gray-200 text-black opacity-50 cursor-not-allowed" aria-disabled="true">Contact</Button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#24343d] p-8 bg-[#0b1720]">
          <h2 className="text-xl font-semibold mb-2">Portfolio</h2>
          <p className="text-gray-300 mb-6">Showcase your skills and experience with past projects and work samples from delivered orders.</p>

          <div className="mt-6">
            <div className="rounded-2xl border border-dashed border-gray-700 p-8 text-center bg-black/40">
              <div className="mb-4 text-3xl">📁</div>
              <div className="text-gray-300 mb-6">Showcase the projects you've worked on by adding them to your portfolio.</div>
              <Link href="/dashboard/portfolio/create" className="inline-block bg-white text-black px-4 py-2 rounded-md">Create new project</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


