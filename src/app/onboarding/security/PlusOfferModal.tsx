"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PlusOfferModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [selected, setSelected] = React.useState<"free" | "plus">("free");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-label="Kickstart your business" className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">It’s official… You’re our newest seller!</DialogTitle>
          <p className="text-sm text-muted-foreground">Choose a plan to get started. You can switch anytime.</p>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Free */}
          <button
            type="button"
            onClick={()=>setSelected("free")}
            className={`rounded-2xl border p-5 text-left transition shadow-sm ${selected === "free" ? "ring-2 ring-primary border-primary/50" : "hover:border-foreground/30"}`}
          >
            <div className="mb-2 text-lg font-semibold">Free</div>
            <ul className="space-y-2 text-sm">
              <li>Basic onboarding</li>
              <li>Create and publish agents</li>
              <li>Standard support</li>
              <li>Community resources</li>
            </ul>
          </button>

          {/* Paid */}
          <button
            type="button"
            onClick={()=>setSelected("plus")}
            className={`rounded-2xl border p-5 text-left transition shadow-sm ${selected === "plus" ? "ring-2 ring-primary border-primary/50" : "hover:border-foreground/30"}`}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="text-lg font-semibold">Plus</div>
              <span className="rounded-full border px-2 py-0.5 text-xs">Most popular</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li>Guided onboarding</li>
              <li>Keyword research</li>
              <li>Buyer activity insights</li>
              <li>Priority support</li>
              <li>AI‑generated feedback</li>
              <li>Live walkthrough sessions</li>
            </ul>
            <div className="mt-4 text-xl font-semibold">$15 <span className="text-sm font-normal">/month</span></div>
          </button>
        </div>
        <DialogFooter>
          <div className="mr-auto text-sm text-muted-foreground">Selected: <span className="font-medium capitalize">{selected}</span></div>
          <Button variant="secondary" asChild>
            <a href="/onboarding/gig">Publish your Agent</a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


