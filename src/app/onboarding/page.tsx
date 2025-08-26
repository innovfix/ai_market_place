"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const bioLimit = 600;
  const [languages, setLanguages] = useState<{ lang: string; level: string }[]>([{ lang: "English", level: "Basic" }]);
  const [langInput, setLangInput] = useState("");
  const [levelInput, setLevelInput] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    displayName?: string;
    photoFile?: string;
    bio?: string;
    languages?: string;
  }>({});

  function validateAll() {
    const nextErrors: typeof errors = {};
    if (!firstName.trim() || firstName.trim().length < 2) nextErrors.firstName = "Please enter your full name";
    if (!lastName.trim() || lastName.trim().length < 2) nextErrors.lastName = "Please enter your last name";
    if (!displayName.trim() || displayName.trim().length < 2) nextErrors.displayName = "Add your display name.";
    if (!photoFile) nextErrors.photoFile = "Upload a profile picture.";
    if (!bio.trim() || bio.trim().length < 10) nextErrors.bio = "Add a short description.";
    if (!languages.length) nextErrors.languages = "Add at least one language.";
    return nextErrors;
  }

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview(null);
      return;
    }
    const url = URL.createObjectURL(photoFile);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-10">
      {/* Steps header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-4 text-sm">
          <Step n={1} label="Personal Info" active />
          <Step n={2} label="Professional Info" />
          <Step n={3} label="Account Security" />
        </div>
        <div className="text-xs text-muted-foreground">Completion Rate: <span className="font-medium">75%</span></div>
      </div>

      {/* Form */}
      <div className="mt-8">
        <h1 className="text-2xl font-semibold tracking-tight">Personal Info</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Tell us a bit about yourself. This information will appear on your public profile.
        </p>

        <div className="mt-6 grid gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">First Name <span className="text-destructive">*</span></label>
              <input
                value={firstName}
                onChange={(e)=>{ setFirstName(e.target.value); if (submitAttempted) setErrors(validateAll()); }}
                placeholder="First name"
                className={`h-11 w-full rounded-[10px] border bg-background px-3 text-sm ${submitAttempted && errors.firstName ? "border-destructive" : ""}`}
              />
              {submitAttempted && errors.firstName ? (<p className="mt-1 text-sm text-destructive">{errors.firstName}</p>) : null}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Last Name <span className="text-destructive">*</span></label>
              <input
                value={lastName}
                onChange={(e)=>{ setLastName(e.target.value); if (submitAttempted) setErrors(validateAll()); }}
                placeholder="Last name"
                className={`h-11 w-full rounded-[10px] border bg-background px-3 text-sm ${submitAttempted && errors.lastName ? "border-destructive" : ""}`}
              />
              {submitAttempted && errors.lastName ? (<p className="mt-1 text-sm text-destructive">{errors.lastName}</p>) : null}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Display Name <span className="text-destructive">*</span></label>
            <input
              value={displayName}
              onChange={(e)=>{ setDisplayName(e.target.value); if (submitAttempted) setErrors(validateAll()); }}
              placeholder="Type your display name"
              className={`h-11 w-full rounded-[10px] border bg-background px-3 text-sm ${submitAttempted && errors.displayName ? "border-destructive" : ""}`}
            />
            {submitAttempted && errors.displayName ? (<p className="mt-1 text-sm text-destructive">{errors.displayName}</p>) : null}
          </div>

          {/* Profile Picture */}
          <div className="grid gap-2">
            <label className="block text-sm font-medium">Profile Picture <span className="text-destructive">*</span></label>
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border">
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoPreview} alt="Profile preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">No photo</div>
                )}
              </div>
              <div>
                <input id="profile-photo" type="file" accept="image/*" className="hidden" onChange={(e)=>{
                  const f = e.target.files?.[0];
                  if (f) setPhotoFile(f);
                }} />
                <Button 
                  variant="outline" 
                  className="rounded-[10px] border-blue-500/30 text-blue-200 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300" 
                  onClick={() => document.getElementById("profile-photo")?.click()}
                >
                  Upload photo
                </Button>
                <p className="mt-1 text-xs text-muted-foreground">JPG or PNG, recommended 400×400.</p>
                {submitAttempted && errors.photoFile ? (<p className="mt-1 text-sm text-destructive">{errors.photoFile}</p>) : null}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <label className="block text-sm font-medium">Description <span className="text-destructive">*</span></label>
            <div className="relative">
              <textarea
                value={bio}
                onChange={(e)=> { setBio(e.target.value.slice(0, bioLimit)); if (submitAttempted) setErrors(validateAll()); }}
                placeholder="Tell buyers about your experience, specialties, and what makes your services stand out."
                className={`h-40 w-full resize-none rounded-[10px] border bg-background p-3 text-sm leading-relaxed ${submitAttempted && errors.bio ? "border-destructive" : ""}`}
              />
              <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-muted-foreground">{bio.length} / {bioLimit}</span>
            </div>
            {submitAttempted && errors.bio ? (<p className="mt-1 text-sm text-destructive">{errors.bio}</p>) : null}
          </div>

          {/* Languages */}
          <div className="grid gap-2">
            <label className="block text-sm font-medium">Languages <span className="text-destructive">*</span></label>
            <p className="text-xs text-muted-foreground">Select which languages you can communicate in and your proficiency level.</p>
            <div className="flex flex-wrap items-center gap-2">
              <input value={langInput} onChange={(e)=>setLangInput(e.target.value)} placeholder="Language" className="h-10 w-48 rounded-[10px] border bg-background px-3 text-sm" />
              <select value={levelInput} onChange={(e)=>setLevelInput(e.target.value)} className="h-10 w-48 rounded-[10px] border bg-background px-3 text-sm">
                <option value="">Language Level</option>
                <option>Basic</option>
                <option>Conversational</option>
                <option>Fluent</option>
                <option>Native/Bilingual</option>
              </select>
              <Button 
                variant="secondary" 
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm hover:border-white/30 transition-all duration-300"
                onClick={()=>{ setLangInput(""); setLevelInput(""); }}
              >
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={()=>{ if(langInput && levelInput){ setLanguages([...languages, { lang: langInput, level: levelInput }]); setLangInput(""); setLevelInput(""); } }}
              >
                Add
              </Button>
            </div>
            <div className={`mt-3 overflow-hidden rounded-[10px] border ${submitAttempted && errors.languages ? "border-destructive" : ""}`}>
              <div className="grid grid-cols-[1fr_200px] bg-secondary px-3 py-2 text-sm font-medium"><span>Language</span><span>Level</span></div>
              {languages.map((l, i)=> (
                <div key={i} className="grid grid-cols-[1fr_200px] border-t px-3 py-2 text-sm"><span>{l.lang}</span><span>{l.level}</span></div>
              ))}
            </div>
            {submitAttempted && errors.languages ? (<p className="mt-1 text-sm text-destructive">{errors.languages}</p>) : null}
          </div>
          <div className="pt-2">
            <Button
              className="px-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                setSubmitAttempted(true);
                const next = validateAll();
                setErrors(next);
                if (Object.keys(next).length === 0) {
                  router.push("/onboarding/professional");
                }
              }}
            >
              Save and continue
            </Button>
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


