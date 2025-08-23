"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AIAgent } from "@/types/agent";

type Tab = "screenshots" | "live" | "comments";

export default function AgentMediaTabs({ agent }: { agent: AIAgent }) {
  const [tab, setTab] = useState<Tab>("screenshots");

  // Derive screenshots list: prefer agent.screenshots, fallback to single imageUrl
  const screenshots = agent.screenshots && agent.screenshots.length > 0 ? agent.screenshots : (agent.imageUrl ? [agent.imageUrl] : []);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" className="rounded-[10px] px-5">
          <a href={agent.docsUrl} target="_blank" rel="noreferrer">Live Preview</a>
        </Button>
        {/* Screenshots option removed as requested; image stays below */}
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="rounded-[10px] px-5">Comments</Button>
          </DialogTrigger>
          <DialogContent aria-label="Comments" className="max-w-3xl">
            <CommentsList comments={agent.comments ?? []} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-4 rounded-2xl border p-4">
        <div className="relative w-full overflow-hidden rounded-[10px] bg-secondary">
          {screenshots.length > 0 ? (
            <div className="relative mx-auto aspect-video max-w-full">
              <Image src={screenshots[0]} alt={`${agent.name} image`} fill className="object-contain" />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-sm text-muted-foreground">No image available</div>
          )}
        </div>
      </div>
    </div>
  );
}

function Lightbox({ screenshots }: { screenshots: string[] }) {
  const [index, setIndex] = useState(0);
  const current = screenshots[index] ?? null;

  function prev() {
    setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  }
  function next() {
    setIndex((i) => (i + 1) % screenshots.length);
  }

  if (!current) {
    return <div className="aspect-video flex items-center justify-center text-sm text-muted-foreground">No screenshots</div>;
  }

  return (
    <div className="relative">
      <div className="relative mx-auto aspect-video w-full">
        <Image src={current} alt={`Screenshot ${index + 1}`} fill className="object-contain rounded-[10px]" />
      </div>
      {screenshots.length > 1 ? (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border bg-background/80 p-2 backdrop-blur"
            onClick={prev}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border bg-background/80 p-2 backdrop-blur"
            onClick={next}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      ) : null}
    </div>
  );
}

function CommentsList({ comments }: { comments: import("@/types/agent").AgentComment[] }) {
  if (!comments || comments.length === 0) {
    return <div className="text-sm text-muted-foreground">No comments yet.</div>;
  }
  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="flex items-center justify-between">
        <input
          placeholder="Search comments"
          className="h-9 w-full max-w-xs rounded-[10px] border bg-background px-3 text-sm"
        />
        <select className="ml-auto h-9 rounded-[10px] border bg-background px-3 text-sm">
          <option>Newest first</option>
          <option>Oldest first</option>
        </select>
      </div>
      <div className="text-lg font-semibold">{comments.length} comments found.</div>
      {comments.map((c) => (
        <div key={c.id} className="rounded-2xl border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-secondary font-semibold">{c.author.slice(0,1).toUpperCase()}</div>
              <div className="font-medium">{c.author} {c.purchased ? <span className="ml-2 rounded bg-secondary px-2 py-0.5 text-xs">PURCHASED</span> : null}</div>
            </div>
            <div className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</div>
          </div>
          <p className="mt-2 text-sm leading-6 text-foreground/90">{c.content}</p>
          {typeof c.replies === "number" && c.replies > 0 ? (
            <button className="mt-2 text-sm underline">{c.replies} other replies</button>
          ) : null}
        </div>
      ))}
    </div>
  );
}


