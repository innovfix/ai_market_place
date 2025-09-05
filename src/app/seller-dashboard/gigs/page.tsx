"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SellerDashboardHeader } from '@/components/site/SellerDashboardHeader';

export default function SellerGigsPage() {
  const [accepting, setAccepting] = useState(true);
  const [activeTab, setActiveTab] = useState('ACTIVE');
  const [range, setRange] = useState('LAST 30 DAYS');
  const [rangeOpen, setRangeOpen] = useState(false);
  const rangeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rangeRef.current && !rangeRef.current.contains(e.target as Node)) {
        setRangeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      <SellerDashboardHeader />
      
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-5xl font-light text-white">Gigs</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setAccepting(prev => !prev)} className={`relative inline-flex items-center w-12 h-6 rounded-full transition-colors ${accepting ? 'bg-emerald-500' : 'bg-white/10'} cursor-pointer`} aria-pressed={accepting}>
                <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${accepting ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className="text-sm text-white">Accepting Custom Orders</span>
            </div>
            <Button disabled={!accepting} className={accepting ? "bg-gradient-to-r from-[#2b8dfd] to-[#b84bff] text-white" : "bg-white/5 text-white/50 opacity-50 cursor-not-allowed"} onClick={() => {
              if (accepting) {
                // navigate to seller-dashboard gigs create route
                window.location.href = '/seller-dashboard/gigs/create';
              }
            }}>CREATE A NEW GIG</Button>
          </div>
        </div>

        <nav className="border-b border-white/10 mb-6">
          <ul className="flex gap-8 text-sm">
            {['ACTIVE','PENDING APPROVAL','REQUIRES MODIFICATION','DRAFT','DENIED','PAUSED'].map(tab => (
              <li key={tab} className="py-3">
                <button onClick={() => setActiveTab(tab)} className={`text-sm px-1 ${activeTab === tab ? 'text-white border-b-2 border-emerald-500 font-medium' : 'text-white/70'} cursor-pointer`}>
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="bg-[#0b1720] border border-[#12202a] rounded-md shadow-sm">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">{activeTab} GIGS</h3>
              <div className="relative" ref={rangeRef}>
                <button className="bg-black/60 border border-white/10 rounded px-3 py-2 text-sm text-white flex items-center gap-2 cursor-pointer" onClick={() => setRangeOpen(prev => !prev)}>
                  {range}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {rangeOpen ? (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0b1720] text-white border border-white/10 rounded-md shadow-lg z-50">
                    {['LAST 7 DAYS','LAST 14 DAYS','LAST 30 DAYS','LAST 2 MONTHS','LAST 3 MONTHS'].map(r => (
                      <div key={r} className="px-4 py-3 hover:bg-white/5 cursor-pointer" onClick={() => { setRange(r); setRangeOpen(false); }}>{r}</div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="p-6">
            <table className="w-full text-left text-sm text-white/70">
              <thead>
                <tr className="text-xs text-white/50">
                  <th className="w-6">&nbsp;</th>
                  <th>GIG</th>
                  <th>IMPRESSIONS</th>
                  <th>CLICKS</th>
                  <th>ORDERS</th>
                  <th>CANCELLATIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="py-8 text-white/70">No active gigs to show.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-right">
          <a className="text-emerald-500">What does your Gig® status mean?</a>
        </div>
      </div>
    </div>
  );
}


