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

      <main className="flex-1 p-6 relative mt-12">
        {/* Header panel (profile row) */}
        <div className="bg-black text-white rounded-2xl p-8 shadow-md mb-6 relative">
          <div className="max-w-6xl mx-auto flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img src="/profile1.jpeg" alt="avatar" className="w-40 h-40 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-semibold text-white">Tessa</h1>
                  <span className="text-sm text-gray-200">@Tessa7</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-200">
                  <MapPin className="w-4 h-4 mr-2 text-gray-200" />
                  <span>India</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button onClick={() => setMoreOpen(true)} className="rounded-md border border-white/10 px-5 py-3 bg-transparent text-white hover:cursor-pointer">More about me</button>
            </div>
          </div>
        </div>

        {/* Right sidebar card */}
        <aside className="absolute top-28 right-48 w-96 bg-[#0b1720] border border-[#12202a] rounded-lg p-6 shadow-sm text-white">
          {moreOpen ? (
            <div>
              <div className="flex items-center gap-4">
                <img src="/profile1.jpeg" alt="mini" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-white">Tessa</div>
                  <div className="text-sm text-gray-300">Offline • 10:41 PM local time</div>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full bg-[#0f1b24] text-gray-300 rounded-md py-3 flex items-center justify-center gap-2 border border-[#24343d] disabled:opacity-60" disabled>Contact me</button>
              </div>

              <div className="mt-6 border-t border-[#12202a] pt-4">
                <h4 className="text-sm font-medium text-white mb-2">About me</h4>
                <p className="text-sm text-gray-300 leading-relaxed">✅ My Services: ✔ Laravel website & API development ✔ Bug fixing & performance optimization ✔ Database setup & integration ✔ Admin panel & dashboard creation. 💡 Fast delivery | Clean code | 100% satisfaction guaranteed — Order now or message me for details!</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4">
                <img src="/profile1.jpeg" alt="mini" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-white">Tessa</div>
                  <div className="text-sm text-gray-300">Offline • 10:41 PM local time</div>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full bg-[#0f1b24] text-gray-300 rounded-md py-3 flex items-center justify-center gap-2 border border-[#24343d] disabled:opacity-60" disabled>Contact me</button>
              </div>
            </div>
          )}
        </aside>

        <div className="max-w-6xl mx-auto">
          <div className="mt-8 w-full">
            <h2 className="text-xl font-semibold mb-3 text-white">About me</h2>
            <p className="text-base leading-relaxed text-gray-300 max-w-prose">✅ My Services: ✔ Laravel website & API development ✔ Bug fixing & performance optimization ✔ Database setup & integration ✔ Admin panel & dashboard creation. 💡 Fast delivery | Clean code | 100% satisfaction guaranteed — Order now or message me for details!</p>
          </div>
        </div>
      </main>

      {/* Slide-up modal (appears from bottom) */}
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${moreOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}
          onClick={() => setMoreOpen(false)}
        />

        <div className="relative z-10 inset-x-0 bottom-0 w-full pointer-events-none">
          {moreOpen && (
            <div className="absolute -top-12 right-12 z-50 pointer-events-auto">
              <button onClick={() => setMoreOpen(false)} className="bg-transparent text-white/90 rounded-md px-3 py-1 border border-white/10 hover:bg-white/5">Close</button>
            </div>
          )}

          <div className={`relative transform transition-transform duration-300 pointer-events-auto ${moreOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className={`bg-black text-white rounded-t-2xl p-6 shadow-2xl w-full h-[85vh] overflow-auto`}>
              <div className="max-w-6xl mx-auto pt-4">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <img src="/profile1.jpeg" alt="avatar" className="w-24 h-24 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-semibold text-white">Tessa</h3>
                        <span className="text-sm text-gray-300">@Tessa7</span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-gray-300" />
                        <span>India</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button className="bg-[#0f1b24] text-gray-300 rounded-md px-5 py-3 flex items-center gap-2" disabled>
                      <span>Contact me</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex gap-8">
                  <div className="flex-1 pr-4">
                    <h4 className="text-lg font-medium mb-3 text-white">About me</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">✅ My Services: ✔ Laravel website & API development ✔ Bug fixing & performance optimization ✔ Database setup & integration ✔ Admin panel & dashboard creation. 💡 Fast delivery | Clean code | 100% satisfaction guaranteed — Order now or message me for details!</p>
                  </div>

                  <aside className="w-80 bg-[#0b1720] border border-[#12202a] rounded-lg p-4 shadow-sm text-white">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full w-10 h-10 bg-[#0f1b24] flex items-center justify-center">👤</div>
                      <div>
                        <div className="font-semibold">On Fiverr since Apr 2025</div>
                      </div>
                    </div>
                    <div className="mt-4 border-t border-[#12202a] pt-4">
                      <div className="text-sm font-medium">I speak</div>
                      <div className="mt-3 text-sm text-gray-300">English <span className="text-gray-500 ml-4">Basic</span></div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


