"use client";

import { useState } from "react";
import Image from "next/image";
import { XIcon, Send, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatWidgetProps {
  name?: string;
  avatarUrl?: string;
  status?: string;
  subtitle?: string;
  quickPrompts?: string[];
}

export function ChatWidget({
  name = "Support",
  avatarUrl,
  status = "Online",
  subtitle = "Avg. response time: 2 Hrs",
  quickPrompts = [
    "Hey, I'm looking for an AI agent to automate…",
    "Can you share pricing/licensing details?",
    "Do you support self-hosted models?",
  ],
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 rounded-full border bg-background/90 px-2 py-2 sm:px-4 shadow-md backdrop-blur"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-secondary">
            {avatarUrl ? <Image src={avatarUrl} alt={name} fill className="object-cover" /> : null}
          </div>
          <div className="mr-1 text-left hidden sm:block">
            <div className="text-sm font-medium">Message {name}</div>
            <div className="text-xs text-muted-foreground">{status} • {subtitle}</div>
          </div>
        </button>
      )}

      {open ? (
        <div className="fixed right-4 bottom-20 w-[min(96vw,380px)] h-[70vh] rounded-[10px] border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <button className="rounded-full border p-1 sm:hidden" onClick={() => setOpen(false)}>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="relative h-9 w-9 overflow-hidden rounded-full bg-secondary">
                {avatarUrl ? <Image src={avatarUrl} alt={name} fill className="object-cover" /> : null}
              </div>
              <div>
                <div className="text-sm font-medium">Message {name}</div>
                <div className="text-xs text-muted-foreground">{status} • {subtitle}</div>
              </div>
            </div>
            <button className="rounded-[10px] p-1 text-muted-foreground hover:bg-secondary" onClick={() => setOpen(false)}>
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex h-[calc(100%-56px)] flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-3 text-xs text-muted-foreground">
                Ask a question or share your project details (requirements, timeline, budget, etc.).
              </div>
              <div className="space-y-2">
                {quickPrompts.map((q) => (
                  <button key={q} onClick={() => setMessage(q)} className="w-full rounded-[10px] border px-3 py-2 text-left text-sm hover:bg-secondary">
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t p-3">
              <div className="flex items-center gap-2">
                <Input placeholder="Type your message…" value={message} onChange={(e) => setMessage(e.target.value)} className="h-12 flex-1" />
                <Button className="h-12 px-4" onClick={() => setMessage("")}> <Send className="mr-2 h-4 w-4" /> Send </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}


