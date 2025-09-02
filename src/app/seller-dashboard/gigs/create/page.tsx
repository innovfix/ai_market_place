"use client";

import React, { useState } from 'react';
import { SellerDashboardHeader } from '@/components/site/SellerDashboardHeader';
import { Button } from '@/components/ui/button';

export default function CreateGigPage() {
  const categories = [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Programming & Tech'
  ];

  const subcategoriesMap: Record<string, string[]> = {
    'Graphics & Design': ['Logo Design', 'Brand Identity', 'Illustration'],
    'Digital Marketing': ['Social Media', 'SEO', 'Content Marketing'],
    'Writing & Translation': ['Articles & Blog Posts', 'Proofreading & Editing', 'Translation'],
    'Video & Animation': ['Whiteboard & Explainer', 'Short Video Ads', 'Animated GIFs'],
    'Programming & Tech': ['Website Development', 'Mobile Apps', 'E-commerce']
  };

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  return (
    <div className="min-h-screen bg-black text-white">
      <SellerDashboardHeader />
      <div className="max-w-6xl mx-auto p-6">
        {/* Stepper */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-6 text-sm text-white/70">
              {['Overview','Pricing','Description & FAQ','Requirements','Gallery','Publish'].map((s, i) => (
                <div key={s} className="flex items-center gap-4">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${i===0 ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/60'}`}>{i+1}</div>
                  <div className={`${i===0 ? 'text-white' : 'text-white/60'}`}>{s}</div>
                  {i < 5 ? <div className="w-8 h-[1px] bg-white/10" /> : null}
                </div>
              ))}
            </nav>
            <div>
              <button className="bg-gradient-to-r from-[#2b8dfd] to-[#b84bff] text-white rounded-md px-4 py-2 border border-transparent">Save</button>
            </div>
          </div>
        </div>

        

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-[#0b1720] rounded-lg border border-[#12202a] p-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 pr-4">
                <h3 className="text-lg font-semibold text-white">Gig title</h3>
                <p className="text-sm text-white/70 mt-2">As your Gig storefront, your <strong>title is the most important place</strong> to include keywords that buyers would likely use to search for a service like yours.</p>
              </div>
              <div className="col-span-8">
                <textarea maxLength={80} rows={2} className="w-full rounded-md border border-white/10 bg-black/40 px-4 py-4 text-white placeholder:text-white/40" placeholder="I will do something I'm really good at" />
                <div className="text-sm text-white/50 text-right mt-2">0 / 80 max</div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-6">
              <div className="col-span-4 pr-4">
                <h4 className="text-lg font-semibold text-white">Category</h4>
                <p className="text-sm text-white/70 mt-2">Choose the category and sub-category most suitable for your Gig.</p>
              </div>
              <div className="col-span-8 flex flex-col gap-4">
                <div className="flex gap-4">
                  <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setSelectedSubcategory(''); }} className="rounded-md border border-white/10 bg-[#071018] px-4 py-2 text-white w-1/2 h-10">
                    <option value="" style={{backgroundColor: '#071018', color: '#fff'}}>SELECT A CATEGORY</option>
                    {categories.map(cat => (<option key={cat} value={cat} style={{backgroundColor: '#071018', color: '#fff'}}>{cat}</option>))}
                  </select>
                  <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} disabled={!selectedCategory} className="rounded-md border border-white/10 bg-[#071018] px-4 py-2 text-white w-1/2 h-10">
                    <option value="" style={{backgroundColor: '#071018', color: '#fff'}}>SELECT A SUBCATEGORY</option>
                    {(selectedCategory ? subcategoriesMap[selectedCategory] || [] : []).map(sub => (<option key={sub} value={sub} style={{backgroundColor: '#071018', color: '#fff'}}>{sub}</option>))}
                  </select>
                </div>
                <div className="mt-1">
                  <div className="bg-[#0b1720] text-white p-3 rounded border border-white/5">
                    <div className="text-sm font-medium">Related categories</div>
                    <div className="text-sm text-white/80 mt-2">Logo Design · Brand Identity · Illustration</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-6">
              <div className="col-span-4 pr-4">
                <h4 className="text-lg font-semibold text-white">Search tags</h4>
                <p className="text-sm text-white/70 mt-2">Tag your Gig with buzz words that are relevant to the services you offer. Use all 5 tags to get found.</p>
              </div>
              <div className="col-span-8">
                <input className="w-full rounded-md border border-white/10 bg-black/40 px-4 py-3 text-white" placeholder="Add tags (comma separated)" />
                <div className="text-sm text-white/50 mt-2">5 tags maximum. Use letters and numbers only.</div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-6 pb-6">
              <div className="col-span-4 pr-4">
                <h4 className="text-lg font-semibold text-white">Positive keywords</h4>
                <p className="text-sm text-white/70 mt-2">Enter search terms you feel your buyers will use when looking for your service.</p>
              </div>
              <div className="col-span-8">
                <textarea className="w-full rounded-md border border-white/10 bg-black/40 px-4 py-3 text-white h-24" />
              </div>
            </div>
          </div>

          <aside className="col-span-1 bg-[#072027] border border-[#0b1720] rounded-lg p-6">
            <div className="bg-white/5 p-4 rounded">
              <h4 className="font-semibold text-white">Start Defining Your Gig</h4>
              <div className="mt-3">
                <div className="w-full h-40 bg-white/10 rounded flex items-center justify-center">Video</div>
                <ul className="list-disc pl-5 mt-4 text-sm text-white/70">
                  <li>Create a catchy title.</li>
                  <li>Choose a category that fits your Gig.</li>
                  <li>Add meta data to help buyers find your Gig.</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 text-right">
          <Button className="bg-gradient-to-r from-[#2b8dfd] to-[#b84bff]">Save & Continue</Button>
        </div>
      </div>
    </div>
  );
}


