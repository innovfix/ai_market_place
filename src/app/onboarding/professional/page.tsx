"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const OCCUPATIONS = [
  "AI Agent Developer",
  "AI Agent Designer",
  "Prompt Engineer",
  "AI Workflow Automator",
  "LLM Application Engineer",
  "RAG/Knowledge Engineer",
  "Agent Ops & Monitoring",
];

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;
const SUGGESTED_SKILLS = [
  "Agent Orchestration",
  "Tool/Function Integration",
  "Prompt Engineering",
  "Multi‑Agent Systems",
  "RAG / Vector Search",
  "Memory Systems",
  "Sales Agent Design",
  "Support/Service Agent",
  "Research/Analyst Agent",
  "Code Generation Agent",
  "Scheduler/Booking Agent",
  "Web Scraping / Data Extraction",
  "Safety / Guardrails",
  "Agent Evaluation",
  "Telemetry & Tracing",
  "LangChain",
  "LlamaIndex",
  "OpenAI Assistants API",
  "Anthropic Tool Use",
  "Bedrock Agents",
];

export default function ProfessionalInfoPage() {
  const router = useRouter();
  const [occupation, setOccupation] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [skills, setSkills] = useState<{ name: string; level: string }[]>([]);
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [education, setEducation] = useState<{ country: string; university: string; title: string; major: string; year: string }[]>([]);
  const [eduCountry, setEduCountry] = useState("");
  const [eduUniversity, setEduUniversity] = useState("");
  const [eduTitle, setEduTitle] = useState("");
  const [eduMajor, setEduMajor] = useState("");
  const [eduYear, setEduYear] = useState("");
  const [certs, setCerts] = useState<{ title: string; issuer: string; year: string }[]>([]);
  const [certTitle, setCertTitle] = useState("");
  const [certIssuer, setCertIssuer] = useState("");
  const [certYear, setCertYear] = useState("");
  const [website, setWebsite] = useState("");
  const [attempted, setAttempted] = useState(false);

  const addSkill = () => {
    if (!skillName.trim() || !skillLevel) return;
    setSkills([...skills, { name: skillName.trim(), level: skillLevel }]);
    setSkillName("");
    setSkillLevel("");
  };
  const removeSkill = (i: number) => setSkills(skills.filter((_, idx) => idx !== i));
  const addEducation = () => {
    if (!eduCountry || !eduUniversity.trim() || !eduTitle || !eduMajor.trim() || !eduYear) return;
    setEducation([
      ...education,
      { country: eduCountry, university: eduUniversity.trim(), title: eduTitle, major: eduMajor.trim(), year: eduYear },
    ]);
    setEduCountry("");
    setEduUniversity("");
    setEduTitle("");
    setEduMajor("");
    setEduYear("");
  };
  const removeEducation = (i: number) => setEducation(education.filter((_, idx) => idx !== i));
  const addCert = () => {
    if (!certTitle.trim() || !certIssuer.trim() || !certYear.trim()) return;
    setCerts([...certs, { title: certTitle.trim(), issuer: certIssuer.trim(), year: certYear.trim() }]);
    setCertTitle("");
    setCertIssuer("");
    setCertYear("");
  };
  const removeCert = (i: number) => setCerts(certs.filter((_, idx) => idx !== i));

  const years = Array.from({ length: 30 }, (_, i) => `${1998 + i}`);
  const COUNTRIES = [
    "United States",
    "India",
    "United Kingdom",
    "Canada",
    "Germany",
    "France",
    "Australia",
    "Singapore",
    "United Arab Emirates",
    "Other",
  ];
  const DEGREE_TITLES = [
    "B.Tech",
    "B.E.",
    "B.Sc",
    "M.Tech",
    "M.E.",
    "M.Sc",
    "Ph.D",
    "Diploma",
  ];
  const skillsInvalid = skills.length < 2 || skills.length > 5;
  const hasErrors = attempted && (!occupation || skillsInvalid);
  const filteredSuggestions = useMemo(() => {
    const q = skillName.toLowerCase().trim();
    if (!q) return SUGGESTED_SKILLS.slice(0, 8);
    return SUGGESTED_SKILLS.filter((s) => s.toLowerCase().includes(q)).slice(0, 8);
  }, [skillName]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-10">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-4 text-sm">
          <Step n={1} label="Personal Info" />
          <Step n={2} label="Professional Info" active />
          <Step n={3} label="Account Security" />
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-semibold tracking-tight">Professional Info</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Let buyers know what you do best building AI agents. Choose your occupation and 2–5 top skills.
        </p>

        <div className="mt-6 grid gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_160px_160px] sm:items-end">
            <div>
              <label className="mb-1 block text-sm font-medium">Your Occupation <span className="text-destructive">*</span></label>
              <select value={occupation} onChange={(e)=>setOccupation(e.target.value)} className={`h-11 w-full rounded-[10px] border bg-background px-3 text-sm ${attempted && !occupation ? "border-destructive" : ""}`}>
                <option value="">Select occupation</option>
                {OCCUPATIONS.map((o)=> <option key={o}>{o}</option>)}
              </select>
              {attempted && !occupation ? <p className="mt-1 text-sm text-destructive">Select an occupation.</p> : null}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">From</label>
              <select value={fromYear} onChange={(e)=>setFromYear(e.target.value)} className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm">
                <option value="">Year</option>
                {years.map((y)=> <option key={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">To</label>
              <select value={toYear} onChange={(e)=>setToYear(e.target.value)} className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm">
                <option value="">Year</option>
                {years.map((y)=> <option key={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="mb-2 block text-sm font-medium">Skills <span className="text-destructive">*</span></label>
            <p className="text-xs text-muted-foreground">List AI‑agent related skills and your experience level. Choose 2–5.</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="relative">
                <input
                  value={skillName}
                  onChange={(e)=>{ setSkillName(e.target.value); setShowSuggestions(true); }}
                  onFocus={()=>setShowSuggestions(true)}
                  onBlur={()=> setTimeout(()=> setShowSuggestions(false), 120)}
                  placeholder="Add Skill (e.g., Agent Orchestration)"
                  className="h-10 w-72 rounded-[10px] border bg-background px-3 text-sm"
                />
                {showSuggestions && filteredSuggestions.length > 0 ? (
                  <div className="absolute z-20 mt-1 w-full max-h-60 overflow-auto rounded-[10px] border bg-popover shadow-md">
                    {filteredSuggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="block w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-secondary"
                        onMouseDown={(e)=>{ e.preventDefault(); setSkillName(s); setShowSuggestions(false); }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <select value={skillLevel} onChange={(e)=>setSkillLevel(e.target.value)} className="h-10 w-48 rounded-[10px] border bg-background px-3 text-sm">
                <option value="">Experience Level</option>
                {SKILL_LEVELS.map((lv)=> <option key={lv}>{lv}</option>)}
              </select>
              <Button variant="secondary" onClick={()=>{ setSkillName(""); setSkillLevel(""); }}>Cancel</Button>
              <Button onClick={addSkill} disabled={!skillName || !skillLevel}>Add</Button>
            </div>
            <div className={`mt-3 overflow-hidden rounded-[10px] border ${attempted && skillsInvalid ? "border-destructive" : ""}`}>
              <div className="grid grid-cols-[1fr_200px_80px] bg-secondary px-3 py-2 text-sm font-medium"><span>Skill</span><span>Level</span><span></span></div>
              {skills.map((s, i)=> (
                <div key={i} className="grid grid-cols-[1fr_200px_80px] items-center border-t px-3 py-2 text-sm">
                  <span>{s.name}</span>
                  <span>{s.level}</span>
                  <button onClick={()=>removeSkill(i)} className="text-xs text-destructive underline">Remove</button>
                </div>
              ))}
            </div>
            {attempted && skillsInvalid ? (
              <p className="mt-1 text-sm text-destructive">Add between 2 and 5 skills.</p>
            ) : null}
          </div>

          {/* Education */}
          <div>
            <label className="mb-2 block text-sm font-medium">Education</label>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr]">
              <select value={eduCountry} onChange={(e)=>setEduCountry(e.target.value)} className="h-10 w-full rounded-[10px] border bg-background px-3 text-sm">
                <option value="">Country of College/University</option>
                {COUNTRIES.map((c)=> <option key={c}>{c}</option>)}
              </select>
              <input value={eduUniversity} onChange={(e)=>setEduUniversity(e.target.value)} placeholder="College/University Name" className="h-10 w-full rounded-[10px] border bg-background px-3 text-sm" />
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_160px] sm:items-center">
              <select value={eduTitle} onChange={(e)=>setEduTitle(e.target.value)} className="h-10 w-full rounded-[10px] border bg-background px-3 text-sm">
                <option value="">Title</option>
                {DEGREE_TITLES.map((t)=> <option key={t}>{t}</option>)}
              </select>
              <input value={eduMajor} onChange={(e)=>setEduMajor(e.target.value)} placeholder="Major" className="h-10 w-full rounded-[10px] border bg-background px-3 text-sm" />
              <select value={eduYear} onChange={(e)=>setEduYear(e.target.value)} className="h-10 w-full rounded-[10px] border bg-background px-3 text-sm">
                <option value="">Year</option>
                {years.map((y)=> <option key={y}>{y}</option>)}
              </select>
            </div>
            <div className="mt-2 flex gap-2">
              <Button variant="secondary" onClick={()=>{ setEduCountry(""); setEduUniversity(""); setEduTitle(""); setEduMajor(""); setEduYear(""); }}>Cancel</Button>
              <Button onClick={addEducation} disabled={!eduCountry || !eduUniversity || !eduTitle || !eduMajor || !eduYear}>Add</Button>
            </div>
            <div className="mt-3 overflow-hidden rounded-[10px] border">
              <div className="grid grid-cols-[1fr_200px_80px] bg-secondary px-3 py-2 text-sm font-medium"><span>Degree</span><span>Years</span><span></span></div>
              {education.map((e,i)=> (
                <div key={i} className="grid grid-cols-[1fr_200px_80px] items-center border-t px-3 py-2 text-sm">
                  <span>{`${e.title} ${e.major}`}</span>
                  <span>{`Graduated ${e.year}`}</span>
                  <button onClick={()=>removeEducation(i)} className="text-xs text-destructive underline">Remove</button>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="mb-2 block text-sm font-medium">Certification</label>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <input value={certTitle} onChange={(e)=>setCertTitle(e.target.value)} placeholder="Certificate or Award" className="h-10 w-72 rounded-[10px] border bg-background px-3 text-sm" />
              <input value={certIssuer} onChange={(e)=>setCertIssuer(e.target.value)} placeholder="Certified From (e.g., OpenAI)" className="h-10 w-72 rounded-[10px] border bg-background px-3 text-sm" />
              <select value={certYear} onChange={(e)=>setCertYear(e.target.value)} className="h-10 w-28 rounded-[10px] border bg-background px-3 text-sm">
                <option value="">Year</option>
                {years.map((y)=> <option key={y}>{y}</option>)}
              </select>
              <Button onClick={addCert} disabled={!certTitle || !certIssuer || !certYear}>Add</Button>
            </div>
            <div className="mt-3 overflow-hidden rounded-[10px] border">
              <div className="grid grid-cols-[1fr_1fr_120px_80px] bg-secondary px-3 py-2 text-sm font-medium"><span>Title</span><span>Issuer</span><span>Year</span><span></span></div>
              {certs.map((c,i)=> (
                <div key={i} className="grid grid-cols-[1fr_1fr_120px_80px] items-center border-t px-3 py-2 text-sm">
                  <span>{c.title}</span>
                  <span>{c.issuer}</span>
                  <span>{c.year}</span>
                  <button onClick={()=>removeCert(i)} className="text-xs text-destructive underline">Remove</button>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Website */}
          <div>
            <label className="mb-2 block text-sm font-medium">Personal Website</label>
            <p className="text-xs text-muted-foreground">Include a link to your website or portfolio with AI agent samples.</p>
            <input value={website} onChange={(e)=>setWebsite(e.target.value)} placeholder="https://example.com" className="mt-2 h-11 w-full rounded-[10px] border bg-background px-3 text-sm" />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Button variant="secondary" onClick={()=>router.push("/onboarding")}>Back</Button>
            <Button className="btn-grad px-5" onClick={()=>{
              setAttempted(true);
              if (occupation && !skillsInvalid) {
                router.push("/onboarding/security");
              }
            }}>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ n, label, active }: { n: number; label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs ${active ? "bg-foreground text-background" : "text-muted-foreground"}`}>{n}</span>
      <span className={active ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}


