"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SellerTopNav } from "@/components/site/SellerTopNav";

export function CreateGigContent({ includeTopNav = true, seller = "Tecsxa" }: { includeTopNav?: boolean; seller?: string }) {
  const [step, setStep] = useState(1);
  const pricingRef = useRef<HTMLDivElement | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [keywords, setKeywords] = useState("");
  const [priceActual, setPriceActual] = useState<number | "">(129);
  const [priceDiscounted, setPriceDiscounted] = useState<number | "">(99);
  const [priceNotes, setPriceNotes] = useState("");
  const [desc, setDesc] = useState("");
  const [faqQ, setFaqQ] = useState("");
  const [faqA, setFaqA] = useState("");
  const [faqs, setFaqs] = useState<Array<{ q: string; a: string }>>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [publishVerified, setPublishVerified] = useState(false);
  const [reqQ, setReqQ] = useState("");
  const [reqRequired, setReqRequired] = useState(true);
  const [reqType, setReqType] = useState<"free" | "multiple">("free");
  const [reqOptions, setReqOptions] = useState("");
  const [requirements, setRequirements] = useState<Array<{ q: string; required: boolean; type: "free" | "multiple"; options?: string[] }>>([]);

  const canAddTag = useMemo(() => tagInput.trim().length > 0 && tags.length < 5 && !tags.includes(tagInput.trim()), [tagInput, tags]);

  function addTag() {
    if (!canAddTag) return;
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  }
  function removeTag(i: number) {
    setTags(tags.filter((_, idx) => idx !== i));
  }

  const CATEGORIES: Record<string, string[]> = {
    "AI Agents": ["Sales Agent", "Support Agent", "Research Agent", "Codegen Agent"],
    "Automation": ["Workflows", "APIs", "Web Scraping"],
    "LLM Apps": ["Chatbots", "Assistants", "RAG"],
  };

  const SAMPLE_REQUIREMENT_TEMPLATES: Array<{ q: string; options: string[] }> = [
    {
      q: "If you’re ordering for a business, what’s your industry?",
      options: ["3D design", "e-commerce", "accounting", "marketing", "etc."],
    },
    {
      q: "Is this order part of a bigger project you're working on?",
      options: ["Building a mobile app", "creating an animation", "developing a game", "etc."],
    },
  ];

  function addImagesFromFiles(fileList: FileList | null) {
    if (!fileList) return;
    const files = Array.from(fileList).filter(f => f.type.startsWith("image/"));
    if (files.length === 0) return;
    const remainingSlots = Math.max(0, 3 - gallery.length);
    const next = files.slice(0, remainingSlots).map((f) => URL.createObjectURL(f));
    if (next.length) setGallery([...gallery, ...next]);
  }
  function removeImage(index: number) {
    setGallery(gallery.filter((_, i) => i !== index));
  }
  function setPrimaryImage(index: number) {
    if (index === 0) return;
    const next = [...gallery];
    const [img] = next.splice(index, 1);
    setGallery([img, ...next]);
  }

  return (
    <div>
      {includeTopNav ? <SellerTopNav seller={seller} /> : null}

      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-10">
      {/* Steps header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-4 text-sm">
          <Step n={1} label="Overview" active={step===1} />
          <Step n={2} label="Pricing" active={step===2} />
          <Step n={3} label="Description & FAQ" active={step===3} />
          <Step n={4} label="Requirements" active={step===4} />
          <Step n={5} label="Gallery" active={step===5} />
          <Step n={6} label="Publish" active={step===6} />
        </div>
        <Button variant="secondary">Save</Button>
      </div>

      {step === 1 ? (
        <>
        <h1 className="text-2xl font-semibold tracking-tight">Publish your Agent</h1>
        <div className="mt-6 grid gap-6 rounded-2xl border p-6">
          {/* Agent title */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[220px_1fr] md:items-start">
            <div>
              <div className="text-sm font-medium">Agent title</div>
              <p className="mt-1 text-sm text-muted-foreground">Include keywords buyers might search for.</p>
            </div>
            <div>
              <div className="relative">
                <input
                  value={title}
                  onChange={(e)=> setTitle(e.target.value.slice(0,80))}
                  placeholder="I will do something I'm really good at"
                  className="h-12 w-full rounded-[10px] border bg-background px-3 text-sm"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{title.length} / 80 max</span>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[220px_1fr] md:items-start">
            <div>
              <div className="text-sm font-medium">Category</div>
              <p className="mt-1 text-sm text-muted-foreground">Choose a category and subcategory.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <select value={category} onChange={(e)=>{ setCategory(e.target.value); setSubCategory(""); }} className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm">
                <option value="">SELECT A CATEGORY</option>
                {Object.keys(CATEGORIES).map((c)=> <option key={c}>{c}</option>)}
              </select>
              <select value={subCategory} onChange={(e)=>setSubCategory(e.target.value)} className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm">
                <option value="">SELECT A SUBCATEGORY</option>
                {(CATEGORIES[category] ?? []).map((s)=> <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Search tags */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[220px_1fr] md:items-start">
            <div>
              <div className="text-sm font-medium">Search tags</div>
              <p className="mt-1 text-sm text-muted-foreground">Use up to 5 tags to help buyers find your agent.</p>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <input value={tagInput} onChange={(e)=>setTagInput(e.target.value)} placeholder="Add tag" className="h-10 w-60 rounded-[10px] border bg-background px-3 text-sm" />
                <Button onClick={addTag} disabled={!canAddTag}>Add</Button>
                <span className="text-xs text-muted-foreground">5 tags maximum. Letters and numbers only.</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((t,i)=> (
                  <span key={t+String(i)} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
                    {t}
                    <button onClick={()=>removeTag(i)} className="text-muted-foreground hover:text-destructive">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Positive keywords */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[220px_1fr] md:items-start">
            <div>
              <div className="text-sm font-medium">Positive keywords</div>
              <p className="mt-1 text-sm text-muted-foreground">Enter terms buyers may use when searching.</p>
            </div>
            <input value={keywords} onChange={(e)=>setKeywords(e.target.value)} placeholder="e.g., agent automation, sales outreach" className="h-12 w-full rounded-[10px] border bg-background px-3 text-sm" />
          </div>

          <div className="flex justify-end">
            <Button 
              className="px-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
              onClick={()=>{ setStep(2); setTimeout(()=> pricingRef.current?.scrollIntoView({ behavior: "smooth" }), 50); }}
            >
              Save & Continue
            </Button>
          </div>
        </div>
        </>
      ) : null}

      {step === 2 ? (
        <div ref={pricingRef} className="mt-8 grid gap-6">
          <h2 className="text-xl font-semibold tracking-tight">Pricing</h2>
          {/* Prices */}
          <PriceEditor />
          {/* Description bullets */}
          <div className="rounded-2xl border p-4">
            <label className="mb-2 block text-sm font-medium">Description (bulleted)</label>
            <textarea
              value={priceNotes}
              onChange={(e)=>setPriceNotes(e.target.value)}
              placeholder={"One bullet per line\nExample:\n• Up to 20 pages\n• Responsive design\n• Source code included"}
              className="h-40 w-full resize-none rounded-[10px] border bg-background p-3 text-sm"
            />
          </div>
          <div className="flex justify-end">
            <Button 
              className="px-5 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
              onClick={()=> setStep(3)}
            >
              Continue
            </Button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-8 grid gap-8">
          <h2 className="text-xl font-semibold tracking-tight">Description</h2>
          <div className="rounded-2xl border p-4">
            <label className="mb-2 block text-sm font-medium">Briefly Describe Your Agent</label>
            <textarea
              value={desc}
              onChange={(e)=> setDesc(e.target.value.slice(0,1200))}
              placeholder="Describe what the buyer will get. Use bullets or short paragraphs."
              className="h-60 w-full resize-none rounded-[10px] border bg-background p-3 text-sm"
            />
            <div className="mt-1 text-right text-xs text-muted-foreground">{desc.length} / 1200 Characters</div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold tracking-tight">Frequently Asked Questions</h3>
            <div className="rounded-2xl border p-4">
              <div className="grid gap-3">
                <input
                  value={faqQ}
                  onChange={(e)=> setFaqQ(e.target.value)}
                  placeholder="Add a Question: e.g., Do you support custom tools?"
                  className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm"
                />
                <textarea
                  value={faqA}
                  onChange={(e)=> setFaqA(e.target.value.slice(0,300))}
                  placeholder="Add an Answer: e.g., Yes, I can integrate custom tools via API."
                  className="h-24 w-full resize-none rounded-[10px] border bg-background p-3 text-sm"
                />
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    variant="secondary" 
                    className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm hover:border-white/30 transition-all duration-300"
                    onClick={()=> { setFaqQ(""); setFaqA(""); }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={()=> { if (faqQ.trim() && faqA.trim()) { setFaqs([...faqs, { q: faqQ.trim(), a: faqA.trim() }]); setFaqQ(""); setFaqA(""); } }}
                  >
                    Add
                  </Button>
                </div>
              </div>
              {faqs.length > 0 ? (
                <ul className="mt-4 space-y-3 text-sm">
                  {faqs.map((f, i)=> (
                    <li key={i} className="rounded-[10px] border p-3">
                      <div className="font-medium">Q: {f.q}</div>
                      <div className="mt-1 text-muted-foreground">A: {f.a}</div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              className="px-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
              onClick={()=> setStep(4)}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="mt-8 grid gap-8">
          <h2 className="text-xl font-semibold tracking-tight">Requirements</h2>
          {/* Sample questions (preset) */}
          <div className="rounded-2xl border p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-medium">Sample questions</h3>
              <div className="text-xs text-muted-foreground">These optional questions will be added for all buyers.</div>
            </div>
            <ul className="space-y-4">
              {SAMPLE_REQUIREMENT_TEMPLATES.map((t, i) => (
                <li key={i} className="rounded-[10px] border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">{i + 1}. {t.q}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{t.options.join(", ")}</div>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setRequirements([
                          ...requirements,
                          { q: t.q, required: false, type: "multiple", options: t.options },
                        ]);
                      }}
                    >Use</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="text-sm text-muted-foreground">Get all the information you need from buyers to get started.</div>
            <div className="mt-4 grid gap-4">
              <label className="block text-sm font-medium">Add a question</label>
              <textarea
                value={reqQ}
                onChange={(e)=> setReqQ(e.target.value.slice(0,400))}
                placeholder="Request necessary details such as data sources, brand guidelines, or API keys."
                className="h-24 w-full resize-none rounded-[10px] border bg-background p-3 text-sm"
              />
              <div className="flex items-center justify-between gap-3">
                <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={reqRequired} onChange={(e)=> setReqRequired(e.target.checked)} /> Required</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Get it in a form of:</span>
                  <select value={reqType} onChange={(e)=> setReqType(e.target.value as any)} className="h-10 rounded-[10px] border bg-background px-3 text-sm">
                    <option value="free">Free text</option>
                    <option value="multiple">Multiple choice</option>
                  </select>
                </div>
              </div>
              {reqType === "multiple" ? (
                <input
                  value={reqOptions}
                  onChange={(e)=> setReqOptions(e.target.value)}
                  placeholder="Enter options separated by commas"
                  className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm"
                />
              ) : null}
              <div className="flex items-center justify-end gap-2">
                <Button variant="secondary" onClick={()=> { setReqQ(""); setReqOptions(""); setReqType("free"); setReqRequired(true); }}>Cancel</Button>
                <Button onClick={()=> {
                  if (!reqQ.trim()) return;
                  const entry = { q: reqQ.trim(), required: reqRequired, type: reqType, options: reqType === "multiple" ? reqOptions.split(",").map(o=>o.trim()).filter(Boolean) : undefined };
                  setRequirements([...requirements, entry]);
                  setReqQ(""); setReqOptions(""); setReqType("free"); setReqRequired(true);
                }}>Add</Button>
              </div>
            </div>
          </div>
          {requirements.length > 0 ? (
            <div className="rounded-2xl border p-4">
              <h3 className="mb-2 text-base font-medium">Your Questions</h3>
              <ul className="space-y-3 text-sm">
                {requirements.map((r,i)=> (
                  <li key={i} className="rounded-[10px] border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{i+1}. {r.q}</div>
                      <span className="text-xs text-muted-foreground">{r.required ? "Required" : "Optional"} • {r.type === "free" ? "Free text" : "Multiple choice"}</span>
                    </div>
                    {r.type === "multiple" && r.options && r.options.length ? (
                      <div className="mt-1 text-muted-foreground">Options: {r.options.join(", ")}</div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="flex justify-end">
            <Button className="btn-grad px-5" onClick={()=> setStep(5)}>Save & Continue</Button>
          </div>
        </div>
      ) : null}

      {step === 5 ? (
        <div className="mt-8 grid gap-8">
          <h2 className="text-xl font-semibold tracking-tight">Gallery</h2>
          <div className="rounded-2xl border p-4">
            <div className="text-sm text-muted-foreground">Images (up to 3). First image is Primary.</div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={`relative aspect-[4/3] overflow-hidden rounded-[10px] border ${gallery[i] ? "" : "border-dashed"}`}>
                  {gallery[i] ? (
                    <>
                      <img src={gallery[i]} alt={`Image ${i+1}`} className="h-full w-full object-cover" />
                      {i === 0 ? (
                        <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">Primary</div>
                      ) : null}
                      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
                        {i !== 0 && (
                          <button onClick={()=> setPrimaryImage(i)} className="rounded bg-background/80 px-2 py-1 text-xs">Set primary</button>
                        )}
                        <button onClick={()=> removeImage(i)} className="rounded bg-background/80 px-2 py-1 text-xs">Remove</button>
                      </div>
                    </>
                  ) : (
                    <label className="flex h-full w-full cursor-pointer items-center justify-center p-4 text-center text-sm text-muted-foreground">
                      <input type="file" accept="image/*" multiple className="hidden" onChange={(e)=> addImagesFromFiles(e.target.files)} />
                      Drag & drop a Photo or Browse
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="btn-grad px-5" onClick={()=> setStep(6)}>Save & Continue</Button>
          </div>
        </div>
      ) : null}

      {step === 6 ? (
        <div className="mt-8 grid gap-8">
          <h2 className="text-xl font-semibold tracking-tight">Publish</h2>
          <div className="rounded-2xl border p-8 text-center">
            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border text-left">
              <div className="flex items-center justify-between gap-4 p-4">
                <div>
                  <div className="text-base font-semibold">Identity verification</div>
                  <div className="mt-1 text-sm text-muted-foreground">Fill out your personal and business information to verify your identity. <a href="#" className="underline">Learn more</a></div>
                </div>
                {publishVerified ? (
                  <span className="rounded-full bg-emerald-600/10 px-3 py-1 text-sm font-medium text-emerald-600">Verified</span>
                ) : (
                  <Button onClick={()=> setPublishVerified(true)}>Verify</Button>
                )}
              </div>
            </div>
            <div className="mt-8 text-2xl font-semibold">You're almost there!</div>
            <div className="mt-1 text-sm text-muted-foreground">Let’s publish your Agent and get you ready to start selling.</div>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={()=> setStep(5)} className="text-sm text-muted-foreground hover:text-foreground">Back</button>
            <Button className="btn-grad px-5" disabled={!publishVerified} onClick={()=> alert("Your agent has been published!")}>Publish your Agent</Button>
          </div>
        </div>
      ) : null}
      </div>
      </div>
  );
}

export default function CreateGigPage() {
  return <CreateGigContent includeTopNav={true} seller="Tecsxa" />;
}

function Step({ n, label, active }: { n: number; label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs ${active ? "bg-foreground text-background" : "text-muted-foreground"}`}>{n}</span>
      <span className={active ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}

function PriceEditor() {
  // Using top-level component state via window hooks would be complex; this simple editor reads/writes through DOM props passed via closure
  const [actual, setActual] = useState<number | "">(129);
  const [discounted, setDiscounted] = useState<number | "">(99);
  const offer = typeof actual === "number" && typeof discounted === "number" && actual > 0
    ? Math.max(0, Math.round(((actual - discounted) / actual) * 100))
    : 0;
  const isMultiple5 = (v: number) => v % 5 === 0;
  const normalize5 = (v: number) => Math.round(v / 5) * 5;
  return (
    <div className="rounded-2xl border p-4">
      <div className="grid gap-4 sm:grid-cols-3 sm:items-end">
        <div>
          <label className="mb-1 block text-sm font-medium">Actual price ($)</label>
          <input
            type="number"
            step={5}
            value={actual as number}
            onChange={(e)=> setActual(e.target.value === "" ? "" : Number(e.target.value))}
            onBlur={()=>{ if (typeof actual === "number") setActual(normalize5(actual)); }}
            className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm"
          />
          {typeof actual === "number" && !isMultiple5(actual) ? (
            <div className="mt-1 text-xs text-destructive">Must be a multiple of 5</div>
          ) : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Discounted price ($)</label>
          <input
            type="number"
            step={5}
            value={discounted as number}
            onChange={(e)=> setDiscounted(e.target.value === "" ? "" : Number(e.target.value))}
            onBlur={()=>{ if (typeof discounted === "number") setDiscounted(normalize5(discounted)); }}
            className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm"
          />
          {typeof discounted === "number" && !isMultiple5(discounted) ? (
            <div className="mt-1 text-xs text-destructive">Must be a multiple of 5</div>
          ) : null}
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Offer</div>
          <div className="mt-1 rounded-[10px] border bg-secondary px-3 py-2 text-lg font-semibold">{offer}% off</div>
        </div>
      </div>
    </div>
  );
}


