"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { SellerTopNav } from "@/components/site/SellerTopNav";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { agents } from "@/data/agents";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function SellerProfilePage() {
  const params = useParams<{ seller: string }>();
  const seller = params?.seller ? decodeURIComponent(params.seller) : "";

  const sellerInfo = useMemo(() => {
    return agents.find((a) => a.seller?.name.toLowerCase() === seller.toLowerCase())?.seller;
  }, [seller]);
  const handle = useMemo(() => `@${seller.replace(/\s+/g, "").toLowerCase()}${seller.length > 3 ? "" : "_"}`,[seller]);

  const [about, setAbout] = useState(
    "am completed 25 + app development projects and i had 4 years experience especially we are expert in ecommerce,inventory and multi vendor appication which are most popular."
  );
  const [education, setEducation] = useState({ school: "Community Care College", degree: "Other Degree. electronics engineering", year: "2017" });
  const [educationList, setEducationList] = useState<Array<{ country: string; school: string; degree: string; major: string; year: string }>>([
    { country: "India", school: "Community Care College", degree: "Other", major: "electronics engineering", year: "2017" },
  ]);
  const [certs, setCerts] = useState<Array<{ name: string; by: string; year: string }>>([]);
  const [skills, setSkills] = useState<Array<{ name: string; level: string }>>([
    { name: "Android development", level: "Pro" },
    { name: "Web development", level: "Beginner" },
  ]);

  return (
    <div>
      <SellerTopNav seller={seller} />
      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border">
              {sellerInfo?.avatarUrl ? (
                <Image src={sellerInfo.avatarUrl} alt={seller} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold">
                  {seller.split(" ").map((n) => n[0]).slice(0,2).join("")}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-semibold">{seller}</div>
                <button className="rounded-full border p-1 text-muted-foreground" aria-label="Edit name">✎</button>
                <div className="text-lg text-muted-foreground">{handle}</div>
              </div>
              <div className="mt-2 text-sm">
                <span className="text-muted-foreground">{sellerInfo?.location ?? "India"}</span>
                <span className="mx-2">•</span>
                <a href="#" className="underline">{sellerInfo?.languages?.length ? `Speaks ${sellerInfo.languages.join(", ")}` : "Speaks English"}</a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Share</Button>
            <Button variant="secondary">Preview</Button>
          </div>
        </div>

        {/* About */}
        <section className="mt-8 rounded-2xl border p-6">
          <div className="mb-3 text-xl font-semibold">About</div>
          <p className="whitespace-pre-line leading-relaxed">{about}</p>
          <div className="mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">+ Edit details</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>About</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Tagline</label>
                    <input placeholder="Stand out with a short tagline that describes what you do." className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm" />
                    <div className="mt-1 text-xs text-destructive">Please enter at least 3 characters.</div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Description</label>
                    <textarea
                      value={about}
                      onChange={(e)=> setAbout(e.target.value)}
                      maxLength={600}
                      rows={8}
                      className="w-full rounded-[10px] border bg-background p-3 text-sm"
                    />
                    <div className="mt-1 text-right text-xs text-muted-foreground">{about.length}/600 characters</div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary">Cancel</Button>
                  <Button onClick={()=>{ /* persist later */ }}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Portfolio */}
        <section className="mt-6 rounded-2xl border p-6">
          <div className="mb-2 text-xl font-semibold">Portfolio of past projects</div>
          <p className="text-sm text-muted-foreground">Attract and impress potential clients by displaying your best work.</p>
          <div className="mt-4">
            <Button>Start portfolio</Button>
          </div>
        </section>

        {/* Intro video */}
        <section className="mt-6 rounded-2xl border p-6">
          <div className="mb-2 text-xl font-semibold">Intro video</div>
          <p className="text-sm text-muted-foreground">Make a connection with potential buyers while building credibility and gaining trust.</p>
          <div className="mt-4">
            <Button variant="outline">Add intro video</Button>
          </div>
        </section>

        {/* Education & Certifications */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border p-6">
            <div className="mb-2 text-xl font-semibold">Education</div>
            {educationList.map((e, i) => (
              <div key={i} className="mb-3 space-y-1 text-sm">
                <div className="font-medium">{e.school}</div>
                <div className="text-muted-foreground">{e.degree} Degree. {e.major}</div>
                <div className="text-muted-foreground">{e.country}, graduated {e.year}</div>
              </div>
            ))}
            <div className="mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">+ Edit education</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Education</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-3">
                    <div className="grid gap-3 md:grid-cols-2">
                      <input placeholder="College/university country" className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm" id="edu-country" />
                      <input placeholder="College/university name" className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm" id="edu-school" />
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                      <input placeholder="Degree" className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm" id="edu-degree" />
                      <input placeholder="Major" className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm" id="edu-major" />
                      <input placeholder="Year of graduation" className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm" id="edu-year" />
                    </div>
                    <div className="flex items-center justify-end">
                      <Button
                        onClick={() => {
                          const c = (document.getElementById("edu-country") as HTMLInputElement)?.value.trim();
                          const s = (document.getElementById("edu-school") as HTMLInputElement)?.value.trim();
                          const d = (document.getElementById("edu-degree") as HTMLInputElement)?.value.trim();
                          const m = (document.getElementById("edu-major") as HTMLInputElement)?.value.trim();
                          const y = (document.getElementById("edu-year") as HTMLInputElement)?.value.trim();
                          if (c && s && d && m && y) setEducationList([...educationList, { country: c, school: s, degree: d, major: m, year: y }]);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="mt-2 space-y-2">
                      {educationList.map((e, i) => (
                        <div key={i} className="rounded-xl border p-3 text-sm">
                          <div className="font-medium">{e.degree} - {e.major}</div>
                          <div className="text-muted-foreground">{e.school}</div>
                          <div className="text-muted-foreground">{e.country}, graduated {e.year}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="secondary">Save</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </section>
          <section className="rounded-2xl border p-6">
            <div className="mb-2 text-xl font-semibold">Certifications</div>
            <p className="text-sm text-muted-foreground">Showcase your mastery with certifications earned in your field.</p>
            <div className="mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">+ Add certifications</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Certifications</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-3">
                    <input id="cert-name" placeholder="Certificate or award name" className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm" />
                    <input id="cert-by" placeholder="Certified or awarded by (Ex. Adobe)" className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm" />
                    <input id="cert-year" placeholder="Year" className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm" />
                    <div className="flex items-center justify-end">
                      <Button onClick={()=>{
                        const n = (document.getElementById("cert-name") as HTMLInputElement)?.value.trim();
                        const b = (document.getElementById("cert-by") as HTMLInputElement)?.value.trim();
                        const y = (document.getElementById("cert-year") as HTMLInputElement)?.value.trim();
                        if (n && b && y) setCerts([...certs, { name: n, by: b, year: y }]);
                      }}>Add</Button>
                    </div>
                    <div className="space-y-2">
                      {certs.map((c, i)=> (
                        <div key={i} className="rounded-xl border p-3 text-sm"><span className="font-medium">{c.name}</span> • {c.by} • {c.year}</div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>

        {/* Skills */}
        <section className="mt-6 rounded-2xl border p-6">
          <div className="mb-2 text-xl font-semibold">Skills and expertise</div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s.name} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">{s.name}</span>
            ))}
          </div>
          <div className="mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">+ Edit skills and expertise</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Skills and expertise</DialogTitle>
                </DialogHeader>
                <div className="grid gap-3">
                  <div className="grid gap-3 md:grid-cols-[1fr_200px]">
                    <input id="skill-name" placeholder="Add skill or expertise (Ex. JavaScript)" className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm" />
                    <select id="skill-level" className="h-11 rounded-[10px] border bg-background px-3 text-sm">
                      <option value="">Experience level</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Pro</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button onClick={()=>{
                      const n = (document.getElementById("skill-name") as HTMLInputElement)?.value.trim();
                      const l = (document.getElementById("skill-level") as HTMLSelectElement)?.value;
                      if (n && l) setSkills([...skills, { name: n, level: l }]);
                    }}>Add</Button>
                  </div>
                  <div className="space-y-2">
                    {skills.map((s, i)=> (
                      <div key={i} className="rounded-xl border p-3 text-sm">
                        <div className="font-medium">{s.name}</div>
                        <div className="text-muted-foreground">{s.level}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </div>
  );
}


