"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PlusOfferModal } from "./PlusOfferModal";

export default function SecurityStep() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneSent, setPhoneSent] = useState(false);
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showOffer, setShowOffer] = useState(false);

  const canContinue = emailVerified && phoneVerified;
  const CODE = "123456"; // demo code

  function isValidEmail(v: string) {
    return /.+@.+\..+/.test(v);
  }
  function isValidPhone(v: string) {
    return /^\+?[0-9\-\s]{7,}$/.test(v);
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-10">
      <PlusOfferModal open={canContinue && showOffer} onOpenChange={(v)=>{ setShowOffer(v); }} />
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-4 text-sm">
          <Step n={1} label="Personal Info" />
          <Step n={2} label="Professional Info" />
          <Step n={3} label="Account Security" active />
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-semibold tracking-tight">Account Security</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Trust and safety is a big deal in our community. Please verify your email and phone number so that we can keep your account secured.
        </p>

        {/* Email */}
        <div className="mt-6 rounded-2xl border p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-medium">Email <span className="text-muted-foreground font-normal">Private</span></div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <input
                  disabled={emailVerified}
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-10 w-80 rounded-[10px] border bg-background px-3 text-sm"
                />
                {!emailSent ? (
                  <Button onClick={()=>{ if (isValidEmail(email)) setEmailSent(true); }} disabled={!isValidEmail(email)}>
                    Send code
                  </Button>
                ) : !emailVerified ? (
                  <>
                    <input
                      value={emailCode}
                      onChange={(e)=>setEmailCode(e.target.value)}
                      placeholder="Enter 6‑digit code"
                      className="h-10 w-44 rounded-[10px] border bg-background px-3 text-sm"
                    />
                    <Button onClick={()=> setEmailVerified(emailCode === CODE)} disabled={emailCode.length < 6}>Verify</Button>
                    <Button variant="secondary" onClick={()=>{ setEmailSent(false); setEmailCode(""); }}>Resend</Button>
                    <div className="text-xs text-muted-foreground">Demo code: {CODE}</div>
                  </>
                ) : null}
              </div>
            </div>
            <StatusPill ok={emailVerified} />
          </div>
        </div>

        {/* Phone */}
        <div className="mt-4 rounded-2xl border p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-medium">Phone Number <span className="text-muted-foreground font-normal">Private</span></div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <input
                  disabled={phoneVerified}
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                  placeholder="+1 555 123 4567"
                  className="h-10 w-60 rounded-[10px] border bg-background px-3 text-sm"
                />
                {!phoneSent ? (
                  <Button onClick={()=>{ if (isValidPhone(phone)) setPhoneSent(true); }} disabled={!isValidPhone(phone)}>
                    Send code
                  </Button>
                ) : !phoneVerified ? (
                  <>
                    <input
                      value={phoneCode}
                      onChange={(e)=>setPhoneCode(e.target.value)}
                      placeholder="Enter 6‑digit code"
                      className="h-10 w-44 rounded-[10px] border bg-background px-3 text-sm"
                    />
                    <Button onClick={()=> setPhoneVerified(phoneCode === CODE)} disabled={phoneCode.length < 6}>Verify</Button>
                    <Button variant="secondary" onClick={()=>{ setPhoneSent(false); setPhoneCode(""); }}>Resend</Button>
                    <div className="text-xs text-muted-foreground">Demo code: {CODE}</div>
                  </>
                ) : null}
              </div>
            </div>
            <StatusPill ok={phoneVerified} />
          </div>
        </div>

        <div className="mt-6 text-right">
          <Button className="btn-grad px-5" disabled={!canContinue} onClick={()=> setShowOffer(true)}>Continue</Button>
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

function StatusPill({ ok }: { ok: boolean }) {
  return (
    <div className={`rounded-full border px-3 py-1 text-sm ${ok ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30"}`}>
      {ok ? "Verified" : "Unverified"}
    </div>
  );
}


