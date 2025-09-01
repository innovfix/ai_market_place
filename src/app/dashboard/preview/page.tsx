"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LoggedInHeader } from '@/components/site/LoggedInHeader';
import { MapPin } from 'lucide-react';

export default function DashboardPreviewPage() {
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <LoggedInHeader />

      <main className="flex-1 max-w-7xl mx-auto p-6 pr-96 relative mt-12">
        {/* Top-left offline/contact box */}
        <aside className="absolute top-20 right-6 w-96 bg-[#0b1720] border border-[#12202a] rounded-lg p-6 shadow-sm text-white">
          <div className="flex items-center gap-4">
            <img src="/profile1.jpeg" alt="mini" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="font-semibold">Tessa</div>
              <div className="text-sm text-gray-400">Offline • 06:38 PM local time</div>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full bg-[#0f1b24] text-white rounded-md py-3 flex items-center justify-center gap-2 border border-[#24343d] disabled:opacity-60" disabled>Contact me</button>
          </div>
        </aside>

        {/* Top-right More about me button */}
        <div className="absolute top-6 right-6">
          <button onClick={() => setMoreOpen(true)} className="rounded-md border border-white/10 px-4 py-2 bg-transparent text-white hover:cursor-pointer" style={{ cursor: 'pointer' }}>More about me</button>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0">
              <img src="/profile1.jpeg" alt="avatar" className="w-32 h-32 rounded-full object-cover" />
            </div>

            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-white">Tessa</h1>
                <span className="text-sm text-gray-400">@Tessa7</span>
              </div>

              <div className="mt-3 flex items-center text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>India</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-gray-300 w-full">
            <h2 className="text-lg font-medium mb-3 text-white">About me</h2>
            <p className="text-sm leading-relaxed max-w-prose">✅ My Services: ✔ Laravel website & API development ✔ Bug fixing & performance optimization ✔ Database setup & integration ✔ Admin panel & dashboard creation. 💡 Fast delivery | Clean code | 100% satisfaction guaranteed — Order now or message me for details!</p>
          </div>
        </div>
      </main>

      {moreOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/80" onClick={() => setMoreOpen(false)} />
          <div className="relative z-10 w-full max-w-4xl">
            <div className="bg-black text-white rounded-t-2xl p-6 shadow-2xl transform transition-transform duration-300 translate-y-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">About Tessa</h3>
                <button onClick={() => setMoreOpen(false)} className="text-white/80">✕</button>
              </div>
              <div className="mt-4 text-gray-300">
                <p className="text-sm leading-relaxed">✅ My Services: ✔ Laravel website & API development ✔ Bug fixing & performance optimization ✔ Database setup & integration ✔ Admin panel & dashboard creation. 💡 Fast delivery | Clean code | 100% satisfaction guaranteed — Order now or message me for details!</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}


