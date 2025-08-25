"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { SellerTopNav } from "@/components/site/SellerTopNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  lastMessage: string;
  lastTime: string;
  messages: Array<{ author: string; text: string; time: string; me?: boolean; avatarUrl?: string }>;
}

const SAMPLE: Conversation[] = [
  {
    id: "c1",
    name: "Ajay Kumar",
    handle: "@ajayceo1985",
    avatarUrl: "/profile1.jpeg",
    lastMessage: "Please let me know your thoughts",
    lastTime: "5 months",
    messages: [
      { author: "Ajay Kumar", text: "my budget 2 lakhs", time: "Mar 12, 2:58 AM" },
      { author: "Me", text: "Sorry, not possible.", time: "Mar 12, 2:58 AM", me: true },
      { author: "Ajay Kumar", text: "Let me share the similar sample first.", time: "Mar 12, 2:59 AM" },
      { author: "Ajay Kumar", text: "Also it will cost you around $3800 USD for the exact clone of the sample...", time: "Mar 13, 12:51 AM" },
      { author: "Ajay Kumar", text: "Please let me know your thoughts", time: "Mar 13, 12:51 AM" },
    ],
  },
  {
    id: "c2",
    name: "Abdul Muizz",
    handle: "@abdulmuizz667",
    avatarUrl: "/profile1.jpeg",
    lastMessage: "Features are also listed there",
    lastTime: "6 months",
    messages: [
      { author: "Abdul Muizz", text: "Hello!", time: "Mar 10, 9:00 AM" },
    ],
  },
];

export default function MessagesPage() {
  const params = useParams<{ seller: string }>();
  const searchParams = useSearchParams();
  const seller = params?.seller ? decodeURIComponent(params.seller) : "";
  const [activeId, setActiveId] = useState(SAMPLE[0].id);
  
  // Set active conversation from URL query parameter
  useEffect(() => {
    const conversationId = searchParams.get('conversation');
    if (conversationId && SAMPLE.find(c => c.id === conversationId)) {
      setActiveId(conversationId);
    }
  }, [searchParams]);
  
  const convo = useMemo(() => SAMPLE.find((c) => c.id === activeId)!, [activeId]);

  return (
    <div>
      <SellerTopNav seller={seller} />
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[280px_1fr_280px]">
          {/* Left: conversation list */}
          <aside className="rounded-2xl border">
            <div className="border-b p-3 text-sm font-medium">All messages</div>
            <div>
              {SAMPLE.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`flex w-full items-center gap-3 border-b p-3 text-left hover:bg-accent ${activeId === c.id ? "bg-accent" : ""}`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={c.avatarUrl} alt={c.name} />
                    <AvatarFallback>{c.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{c.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{c.lastMessage}</div>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">{c.lastTime}</div>
                </button>
              ))}
            </div>
          </aside>

          {/* Middle: chat */}
          <main className="rounded-2xl border">
            <div className="flex items-center justify-between border-b p-3">
              <div className="min-w-0">
                <div className="truncate text-lg font-semibold">{convo.name} <span className="text-sm text-muted-foreground">{convo.handle}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm">Mark</Button>
              </div>
            </div>
            <div className="h-[480px] overflow-auto p-4">
              {convo.messages.map((m, i) => (
                <div key={i} className={`mb-4 flex items-start gap-3 ${m.me ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={m.avatarUrl ?? "/profile1.jpeg"} alt={m.author} />
                    <AvatarFallback>{m.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}</AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[75%] rounded-2xl border p-3 text-sm ${m.me ? "bg-secondary" : ""}`}>
                    <div className="mb-1 font-medium">{m.author}</div>
                    <div className="leading-relaxed">{m.text}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-3">
              <div className="flex items-center gap-2">
                <input placeholder="Type a message..." className="h-11 w-full rounded-[10px] border bg-background px-3 text-sm" />
                <Button>Send</Button>
              </div>
            </div>
          </main>

          {/* Right: profile summary */}
          <aside className="rounded-2xl border p-4">
            <div className="mb-3 text-sm font-medium">About {convo.name}</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>From: India</div>
              <div>On platform since: 2016</div>
              <div>Languages: English (Fluent)</div>
              <div>Rating: 4.9</div>
            </div>
            <Button className="mt-4 w-full">Tell Me More</Button>
          </aside>
        </div>
      </div>
    </div>
  );
}


