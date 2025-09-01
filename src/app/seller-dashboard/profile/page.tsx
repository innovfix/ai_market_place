"use client";

import React, { useState, useEffect } from 'react';
import { SellerDashboardHeader } from '@/components/site/SellerDashboardHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Square, Image, Play, Share2, Eye, Edit2 } from 'lucide-react';

export default function SellerProfilePage() {
  const [editOpen, setEditOpen] = useState(false);
  const [displayName, setDisplayName] = useState('Ashok Kumar');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [languages, setLanguages] = useState<Array<{name: string; level: string}>>([{ name: 'English', level: 'Basic' }]);
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [selectedLangIndex, setSelectedLangIndex] = useState<number | null>(null);
  const [selectedLangName, setSelectedLangName] = useState<string>('English');
  const [selectedLevel, setSelectedLevel] = useState<string>('Basic');

  // Drawer mount/visibility states for left-to-right slide animation
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (editOpen) {
      setDrawerMounted(true);
      // next frame to trigger transition
      requestAnimationFrame(() => setDrawerVisible(true));
    } else {
      setDrawerVisible(false);
      // unmount after transition
      const t = setTimeout(() => setDrawerMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [editOpen]);

  return (
  <div className="min-h-screen bg-black">
      <SellerDashboardHeader />

      <div className="max-w-7xl mx-auto p-6">
        {/* Top header: avatar + name on left, quick links on right */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <Avatar className="w-28 h-28">
              <AvatarImage src="/profile1.jpeg" alt="Tessa" />
              <AvatarFallback className="bg-gray-700 text-white">A</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white underline decoration-white decoration-2 underline-offset-4 cursor-pointer" onClick={() => setEditOpen(true)}>Tessa</h1>
                <Button variant="ghost" size="sm" className="p-1" onClick={() => setEditOpen(true)}>
                  <Edit2 className="w-4 h-4 text-white" />
                </Button>
                <span className="text-sm text-gray-300 ml-2">@Tessa7</span>
              </div>
              <div className="mt-1 text-sm text-gray-300">India &nbsp; <button className="underline text-gray-300 cursor-pointer" onClick={() => { setSelectedLangIndex(null); setSelectedLangName('English'); setSelectedLevel('Basic'); setLanguagesOpen(true); }}>Speaks English</button></div>
            </div>
          </div>
          <div className="self-start flex items-start gap-8">
            <div className="flex items-center gap-3">
              <Button size="sm" className="flex items-center gap-2 rounded-md px-4 py-2 border border-white/20 text-white bg-transparent hover:bg-white/5" onClick={() => setShareOpen(true)}><Share2 className="w-4 h-4" />Share</Button>
              <Button size="sm" className="flex items-center gap-2 rounded-md px-4 py-2 border border-white/20 text-white bg-transparent hover:bg-white/5" onClick={() => window.location.href = '/dashboard/preview'}><Eye className="w-4 h-4" />Preview</Button>
            </div>
            <Card className="bg-[#0b1720] border border-[#12202a] p-5 rounded-xl text-white shadow-md w-64">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="mt-4">
                <div className="flex items-center space-x-3 text-gray-200">
                  <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                    <Square className="w-5 h-5" />
                  </div>
                  <span className="text-gray-200">Gigs</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* About card (full width) */}
        <Card className="bg-[#0b1720] border border-[#12202a] p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          <div className="text-gray-300 leading-relaxed">
            <ul className="space-y-3 list-none">
              <li className="flex items-start"><span className="mr-3 text-green-400">✅</span><span>My Services:</span></li>
              <li className="ml-8">✔ Laravel website & API development</li>
              <li className="ml-8">✔ Bug fixing & performance optimization</li>
              <li className="ml-8">✔ Database setup & integration</li>
              <li className="ml-8">✔ Admin panel & dashboard creation</li>
            </ul>

            <p className="mt-6">💡 Fast delivery | Clean code | 100% satisfaction guaranteed</p>
            <p className="mt-2">👉 Order now or message me for details!</p>

            <div className="mt-6">
              <Button size="sm" className="mx-auto bg-[#0f1b24] border border-[#24343d] text-white rounded-lg px-3 hover:bg-[#0b1720]">+ Edit details</Button>
            </div>
          </div>
        </Card>

        {/* Portfolio and Intro video cards */}
        <div className="space-y-6">
          <Card className="bg-[#0b1720] border border-[#12202a] p-6 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-white">Portfolio of past projects</h3>
                <p className="text-gray-400 mt-2">Attract and impress potential clients by displaying your best work.</p>
                <div className="mt-4"><Button size="sm" className="mx-auto bg-[#0f1b24] border border-[#24343d] text-white rounded-lg px-3 hover:bg-[#0b1720]">Start portfolio</Button></div>
              </div>
              <div className="w-24 h-24 bg-[#0b1720] rounded-lg flex items-center justify-center">
                <Image className="w-10 h-10 text-gray-600" />
              </div>
            </div>
          </Card>

          <Card className="bg-[#0b1720] border border-[#12202a] p-6 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-white">Intro video</h3>
                <p className="text-gray-400 mt-2">Make a connection with potential buyers while building credibility and gaining trust.</p>
                <div className="mt-4"><Button size="sm" className="mx-auto bg-[#0f1b24] border border-[#24343d] text-white rounded-lg px-3 hover:bg-[#0b1720]">Add Intro video</Button></div>
              </div>
              <div className="w-24 h-24 bg-[#0b1720] rounded-lg flex items-center justify-center">
                <Play className="w-10 h-10 text-green-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Education / Certifications grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-[#0b1720] border border-[#12202a] p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-white">Education</h4>
            <p className="text-gray-400 mt-2">Back up your skills by adding any educational degrees or programs.</p>
            <div className="mt-4"><Button size="sm" className="mx-auto bg-[#0f1b24] border border-[#24343d] text-white rounded-lg px-3 hover:bg-[#0b1720]">+ Add education</Button></div>
          </Card>

          <Card className="bg-[#0b1720] border border-[#12202a] p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-white">Certifications</h4>
            <p className="text-gray-400 mt-2">Showcase your mastery with certifications earned in your field.</p>
            <div className="mt-4"><Button size="sm" className="mx-auto bg-[#0f1b24] border border-[#24343d] text-white rounded-lg px-3 hover:bg-[#0b1720]">+ Add certifications</Button></div>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="bg-[#0b1720] border border-[#12202a] p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-white">Skills and expertise</h4>
            <p className="text-gray-400 mt-2">Let your buyers know your skills. Skills gained through your previous jobs, hobbies or even everyday life.</p>
            <div className="mt-4"><Button size="sm" className="mx-auto bg-[#0f1b24] border border-[#24343d] text-white rounded-lg px-3 hover:bg-[#0b1720]">+ Add skills and expertise</Button></div>
          </Card>
        </div>
      </div>

      {/* Edit side panel (right-to-left drawer, white content like image) */}
      {drawerMounted ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setEditOpen(false)} />
          <aside className={`fixed top-0 right-0 h-full w-96 bg-black text-white shadow-2xl border-l border-white/5 transform transition-transform duration-300 ${drawerVisible ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold">Display name</h3>
                <button className="p-2 rounded hover:bg-gray-100" onClick={() => setEditOpen(false)}>✕</button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto bg-black">
                <p className="text-sm text-gray-300 mb-4">To help build credible and authentic connections with clients, they'll now see your display name. <a className="underline text-emerald-300" href="#">Learn more</a></p>

                <p className="text-sm text-gray-300 mb-4">We strongly recommend using your first name and first initial of your last name—or another name that represents you. Do not include the name of your service, profession, level, or any adjectives.</p>

                <label className="block text-sm mb-2 text-gray-300">Display name</label>
                <input value={displayName} onChange={(e)=> setDisplayName(e.target.value)} className="w-full rounded-md border border-[#24343d] bg-black/80 px-3 py-2 text-white" />

                <p className="text-sm text-gray-400 mt-3">Use only English letters. Periods and apostrophes are allowed.</p>
              </div>

              <div className="p-6 border-t-0">
                <div className="flex justify-end">
                  <Button size="sm" className="bg-gradient-to-r from-[#2b8dfd] to-[#b84bff] text-white px-6 py-3 rounded-md shadow-lg transform transition-transform hover:-translate-y-1" onClick={() => {
                    const profileData = { displayName };
                    sessionStorage.setItem('profileData', JSON.stringify(profileData));
                    setEditOpen(false);
                  }}>Save</Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
      {/* Languages side panel (opened from 'Speaks English') */}
      {languagesOpen ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setLanguagesOpen(false)} />
          <aside className={`fixed top-0 right-0 h-full w-96 bg-black text-white shadow-2xl border-l border-white/5 transform transition-transform duration-300 translate-x-0`}>
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold">Languages</h3>
                <button className="p-2 rounded hover:bg-gray-100" onClick={() => setLanguagesOpen(false)}>✕</button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto bg-black">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Add language</label>
                    <select value={selectedLangName} onChange={(e) => setSelectedLangName(e.target.value)} className="w-full rounded-md border border-[#24343d] bg-black/80 px-3 py-2 text-white">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Proficiency level</label>
                    <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="w-full rounded-md border border-[#24343d] bg-black/80 px-3 py-2 text-white">
                      <option>Basic</option>
                      <option>Conversational</option>
                      <option>Fluent</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-[#0b1720] text-white rounded-md px-4 py-2 border border-white/10" onClick={() => {
                      if (selectedLangIndex !== null) {
                        // update existing
                        setLanguages(prev => prev.map((l, i) => i === selectedLangIndex ? { name: selectedLangName, level: selectedLevel } : l));
                        setSelectedLangIndex(null);
                      } else {
                        setLanguages(prev => [...prev, { name: selectedLangName, level: selectedLevel }]);
                      }
                      // reset fields
                      setSelectedLangName('English');
                      setSelectedLevel('Basic');
                    }}>Add</button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {languages.map((lang, idx) => (
                      <div key={idx} className="rounded-lg border border-white/8 p-4 bg-white/5 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">{lang.name}</div>
                          <div className="text-sm text-gray-300">{lang.level}</div>
                        </div>
                        <div className="relative">
                          <button className="text-gray-300 px-2" onClick={() => setMenuOpenIndex(menuOpenIndex === idx ? null : idx)}>...</button>
                          {menuOpenIndex === idx ? (
                            <div className="absolute right-0 mt-2 w-28 bg-black/90 text-white rounded shadow-lg border border-white/5">
                              <button className="w-full text-left px-3 py-2 hover:bg-white/5" onClick={() => {
                                setMenuOpenIndex(null);
                                setSelectedLangIndex(idx);
                                setSelectedLangName(lang.name);
                                setSelectedLevel(lang.level);
                                // keep drawer open and prefill fields
                              }}>Edit</button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t-0">
                <div className="flex justify-end">
                  <Button size="sm" className="bg-gradient-to-r from-[#2b8dfd] to-[#b84bff] text-white px-6 py-3 rounded-md shadow-lg transform transition-transform hover:-translate-y-1" onClick={() => setLanguagesOpen(false)}>Save</Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      {/* Preview side panel */}
      {previewOpen ? (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setPreviewOpen(false)} />
          <aside className="ml-auto w-[85%] md:w-3/4 h-full bg-black text-white shadow-2xl">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold">Preview dashboard</h3>
                <button className="p-2 rounded hover:bg-white/5" onClick={() => setPreviewOpen(false)}>✕</button>
              </div>
              <div className="flex-1 bg-black">
                <iframe src="/seller-dashboard" title="Dashboard Preview" className="w-full h-full bg-black" />
              </div>
            </div>
          </aside>
        </div>
      ) : null}
      {/* Share modal */}
      {shareOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShareOpen(false)} />
          <div className="relative z-10 w-[720px] bg-black text-white rounded-md shadow-2xl p-8">
            <button className="absolute top-4 right-4 text-white/80" onClick={() => setShareOpen(false)}>✕</button>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Share the expertise</h2>
              <p className="text-gray-300 mt-2">Let people know about this freelancer.</p>

              <div className="mt-8 flex items-center justify-center gap-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#3b5998] flex items-center justify-center">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg" alt="facebook" className="w-6 h-6 invert" />
                  </div>
                  <div className="text-sm text-gray-300">Facebook</div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#0A66C2] flex items-center justify-center">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="linkedin" className="w-6 h-6 invert" />
                  </div>
                  <div className="text-sm text-gray-300">LinkedIn</div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#1DA1F2] flex items-center justify-center">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg" alt="twitter" className="w-6 h-6 invert" />
                  </div>
                  <div className="text-sm text-gray-300">Twitter</div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/whatsapp.svg" alt="whatsapp" className="w-6 h-6 invert" />
                  </div>
                  <div className="text-sm text-gray-300">WhatsApp</div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f517.svg" alt="link" className="w-6 h-6 invert" />
                  </div>
                  <div className="text-sm text-gray-300">Copy Link</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
