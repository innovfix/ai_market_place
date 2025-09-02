"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LinkToCatalogPage() {
  const [projectName, setProjectName] = useState('Add a new project to your portfolio');
  const [industry, setIndustry] = useState('');
  const [duration, setDuration] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');

  const pathname = usePathname?.() ?? '';

  useEffect(() => {
    try {
      const p = sessionStorage.getItem('portfolio_projectName');
      const i = sessionStorage.getItem('portfolio_industry');
      const d = sessionStorage.getItem('portfolio_duration');
      const sm = sessionStorage.getItem('portfolio_startMonth');
      const sy = sessionStorage.getItem('portfolio_startYear');
      if (p) setProjectName(p);
      if (i) setIndustry(i);
      if (d) setDuration(d);
      if (sm) setStartMonth(sm);
      if (sy) setStartYear(sy);
    } catch (e) {
      // ignore
    }
  }, []);

  // Ensure the global header is visible on this page
  useEffect(() => {
    try {
      const hdr = document.querySelector('header');
      if (!hdr) return;
      (hdr as HTMLElement).style.display = '';
    } catch (e) {
      // ignore
    }
  }, []);

  const activeStep = pathname.includes('/dashboard/portfolio/create/link') ? 2 : 1;
  const step1Active = activeStep === 1;
  const step2Active = activeStep === 2;

  return (
    <div className="min-h-screen bg-[#0b1720] text-white">
      {/* Page-only top strip header (gradient) */}
      <div className="w-full bg-gradient-to-r from-blue-950/90 via-purple-950/80 to-indigo-950/90">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-xl opacity-80"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="relative z-10 text-white">
                <path fill="currentColor" d="M12 2l9 16H3L12 2z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-white ml-2">AI Market</span>
          </div>
          <div className="ml-8 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step1Active ? 'bg-black text-white' : 'bg-transparent text-white/60'}`}>
                1
              </div>
              <span className={`${step1Active ? 'text-white' : 'text-white/60'}`}>Create project</span>
            </div>
            <span className="text-white/60">›</span>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step2Active ? 'bg-black text-white' : 'border border-white/30 text-white/60'}`}>
                2
              </div>
              <span className={`${step2Active ? 'text-white' : 'text-white/60'}`}>Link to catalog</span>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#0b1720] p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Add some final details</h2>
            <p className="text-gray-400 mb-6">Sharing these details will ensure potential clients see the most relevant projects when they view your portfolio.</p>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Project category</label>
              <div className="w-full rounded-md border border-[#e6e6e6] bg-[#071217] p-3 text-gray-300">{industry || 'Select a category from the list.'}</div>
            </div>

            <div className="mt-8">
              <Link href="/dashboard/portfolio/create/link" className="text-sm text-gray-400">You can still edit fields before publishing.</Link>
            </div>
          </div>

          <aside className="bg-[#0b1720] rounded-xl p-6 text-white border border-white/5">
            <div className="bg-[#071217] rounded-md h-40 flex items-center justify-center mb-4 border border-white/5">No preview available</div>
            <div className="text-sm text-gray-400 mb-2">From: {startMonth && startYear ? `${startMonth}/${startYear}` : 'January 2025'}</div>
            <h3 className="text-xl font-semibold text-white">{projectName}</h3>
            <p className="text-sm text-gray-400 mt-2">Use this space to share about your client, their goals, any challenges that came up, and how you dealt with them...</p>

            <div className="mt-4 flex gap-2">
              {industry && <span className="px-3 py-1 rounded-full bg-white/10 text-sm">{industry}</span>}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Project cost</div>
                <div className="font-semibold text-white">$800-$1000</div>
              </div>
              <div>
                <div className="text-gray-400">Project duration</div>
                <div className="font-semibold text-white">{duration || '1-7 days'}</div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Sticky footer */}
      <div className="fixed left-0 right-0 bottom-0 border-t border-white/5 bg-[#0b1720] py-4">
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          <Link href="/dashboard/portfolio/create" className="text-gray-300">Back</Link>
          <div>
            <Button className="bg-gradient-to-r from-blue-400 to-purple-600 text-white px-4 py-2 rounded-md">Publish project</Button>
          </div>
        </div>
      </div>
    </div>
  );
}


