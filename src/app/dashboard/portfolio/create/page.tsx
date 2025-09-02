"use client";

import React, { useState } from 'react';
// Minimal top strip header (logo + stepper) to match design
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePortfolioPage() {
  const [projectName, setProjectName] = useState('');
  const [industry, setIndustry] = useState('');
  const industries = [
    'Web Development',
    'Mobile Apps',
    'Design & UX',
    'Marketing',
    'Writing & Translation',
    'Data Science',
    'Other',
  ];

  const [duration, setDuration] = useState('');
  const durations = [
    'Less than 1 week',
    '1-4 weeks',
    '1-3 months',
    '3-6 months',
    '6+ months',
  ];

  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => String(currentYear - i));

  const router = useRouter();

  const handleContinue = () => {
    try {
      sessionStorage.setItem('portfolio_projectName', projectName);
      sessionStorage.setItem('portfolio_industry', industry);
      sessionStorage.setItem('portfolio_duration', duration);
      sessionStorage.setItem('portfolio_startMonth', startMonth);
      sessionStorage.setItem('portfolio_startYear', startYear);
    } catch (e) {
      // ignore
    }
    router.push('/dashboard/portfolio/create/link');
  };

  return (
    <div className="min-h-screen bg-[#0b1720] text-white">
      <div className="border-b bg-[#0b1720]">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center">
          <a href="/dashboard" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="relative z-10 text-white">
                <path fill="currentColor" d="M12 2l9 16H3L12 2z" />
              </svg>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">AI Market</span>
          </a>
          <div className="flex items-center gap-6 text-sm text-gray-200 ml-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">1</div>
              <span className="text-gray-200">Create project</span>
            </div>
            <span className="text-gray-400">›</span>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-6 h-6 rounded-full border border-[#24343d] text-gray-400 flex items-center justify-center">2</div>
              <span className="text-gray-400">Link to catalog</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-8">
        <div className="bg-[#0b1720] text-white rounded-2xl p-8">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-3xl font-bold">Add a new project to your portfolio</h1>
          </div>

          <div className="grid gap-6">
            <div>
              <label className="block mb-2 font-medium">Project name</label>
              <input value={projectName} onChange={(e)=> setProjectName(e.target.value)} placeholder="Create a clear, descriptive name for your project." className="w-full rounded-md border border-[#24343d] bg-[#071217] text-white placeholder:text-gray-400 px-4 py-3" maxLength={50} />
              <div className="text-right text-xs text-muted-foreground mt-2">{projectName.length}/50 characters</div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Industry</label>
              <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full rounded-md border border-[#24343d] bg-[#071217] text-white px-4 py-3 text-sm">
                <option value="">Select an industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Project duration</label>
                <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full rounded-md border border-[#24343d] bg-[#071217] text-white px-4 py-3 text-sm">
                  <option value="">Select duration.</option>
                  {durations.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Project cost</label>
                <input placeholder="$ Ex. 1000" className="w-full rounded-md border border-[#24343d] bg-[#071217] text-white placeholder:text-gray-400 px-4 py-3 text-sm" />
              </div>
            </div>

            {/* Project started on */}
            <div>
              <label className="block mb-2 font-medium">Project started on</label>
              <div className="flex gap-4">
                <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)} className="rounded-md border border-[#24343d] bg-[#071217] text-white px-4 py-3 text-sm">
                  <option value="">MM</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select value={startYear} onChange={(e) => setStartYear(e.target.value)} className="rounded-md border border-[#24343d] bg-[#071217] text-white px-4 py-3 text-sm">
                  <option value="">YY</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project description */}
            <div>
              <label className="block mb-2 font-medium">Project description</label>
              <div className="text-sm text-gray-500 mb-2">Use this space to share about your client, their goals, any challenges that came up, and how you dealt with them.</div>
              <textarea className="w-full rounded-md border border-[#24343d] bg-[#071217] text-white p-4 h-40" maxLength={1400}></textarea>
              <div className="text-right text-xs text-muted-foreground mt-2">0/1400 characters</div>
            </div>

            {/* Attachments */}
            <div>
              <label className="block mb-2 font-medium">Attachments</label>
              <div className="text-sm text-gray-500 mb-2">Keep in mind that the first file you upload will appear in the thumbnail preview. We recommend the size 1024×768 with aspect ratio 4:3. Not sure what to upload? <a className="underline">Check out our suggestions</a></div>
              <div className="border-dashed border-2 border-[#24343d] rounded-lg p-12 text-center bg-black text-gray-300">
                <div className="mb-4 text-lg">Drag and drop files or</div>
                <div className="mb-4">
                  <label className="inline-flex items-center gap-3 bg-white text-black px-4 py-2 rounded-md border border-gray-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v12m0 0l-4-4m4 4 4-4" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 16v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
                    </svg>
                    <span className="font-medium">Choose files</span>
                    <input type="file" multiple className="hidden" />
                  </label>
                </div>
                <div className="text-sm text-gray-400">You can upload the following formats: .jpg, .jpeg, .png, .gif, .mp4, .avi; max size - 50 MB; max files - 5</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky footer actions like design */}
      <div className="fixed left-0 right-0 bottom-0 border-t bg-[#0b1720] py-4">
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          <Button variant="ghost" className="text-gray-300" onClick={() => router.push('/dashboard/portfolio')}>Cancel</Button>
          <Button onClick={handleContinue} className="bg-gradient-to-r from-blue-400 to-purple-600 text-white px-4 py-2 rounded-md shadow-lg">Continue</Button>
        </div>
      </div>
    </div>
  );
}


