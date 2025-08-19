"use client";

import { useMemo, useState } from "react";
import { agents } from "@/data/agents";
import { AgentCard } from "@/components/marketplace/AgentCard";
import { AgentFilters } from "@/components/marketplace/AgentFilters";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => Array.from(new Set(agents.flatMap((a) => a.tags))).sort(), []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return agents.filter((a) => {
      const matchesQuery =
        !q ||
        [a.name, a.description, a.model, a.provider, ...a.tags].some((t) => t.toLowerCase().includes(q));
      const matchesTags = selectedTags.length === 0 || selectedTags.every((t) => a.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [query, selectedTags]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-black to-transparent p-8 md:p-12 text-foreground">
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
          <div className="absolute -inset-[40%] bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_70%)]" />
        </div>
        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">AI Agent Marketplace</p>
          <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
            BUY. SELL. DEPLOY.
          </h1>
          <p className="mb-6 text-sm text-muted-foreground md:text-base">
            Vetted agents with open configs, transparent costs, and one-click deploys.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="#agents">Browse agents</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="https://vercel.com/" target="_blank" rel="noreferrer">Start Deploying</a>
            </Button>
          </div>
        </div>
      </section>

      <div className="my-8">
        <AgentFilters
          query={query}
          setQuery={setQuery}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          allTags={allTags}
        />
      </div>

      <section id="agents" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((agent) => (
          <AgentCard key={agent.id} agent={agent} href={`/agents/${agent.id}`} />
        ))}
      </section>

      <section className="mt-12 rounded-2xl border bg-black/20 p-2 md:p-4">
        <div className="grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="relative p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(200px_200px_at_25%_20%,black,transparent)]">
              <div className="absolute left-4 top-6 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_60%)]" />
            </div>
            <div className="mb-4 h-40 rounded-xl border bg-black/30" />
            <h3 className="text-lg font-semibold">Build with the AI SDK.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ship AI products faster with a framework built to eliminate boilerplate code and
              standardize integrating model providers.
            </p>
            <button className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground hover:text-foreground">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="relative p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(200px_200px_at_50%_10%,black,transparent)]">
              <div className="absolute right-10 top-6 h-36 w-56 rounded-xl bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_60%)]" />
            </div>
            <div className="mb-4 h-40 rounded-xl border bg-black/30" />
            <h3 className="text-lg font-semibold">Iterate on ideas faster.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Stay in the flow by managing feature flags and preview comments from within the
              toolbar on preview URLs.
            </p>
            <button className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground hover:text-foreground">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="relative p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(220px_220px_at_75%_20%,black,transparent)]">
              <div className="absolute right-6 top-4 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_60%)]" />
            </div>
            <div className="mb-4 h-40 rounded-xl border bg-black/30" />
            <h3 className="text-lg font-semibold">Deploy to AI-ready infra.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Managed infrastructure to launch performant AI projects at scale instantly.
            </p>
            <button className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground hover:text-foreground">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* AI SDK hero-style section (moved to the end) */}
      <section className="relative mt-12 overflow-hidden rounded-2xl border bg-black/40 p-6 md:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
              <span className="text-white/90">AI SDK</span> Build conversational streaming user
              interfaces in JavaScript and TypeScript.
            </h2>
          </div>
          <Button className="self-start rounded-full px-5" variant="secondary">Get a Demo</Button>
        </div>

        <div className="relative mt-8 grid gap-8 md:grid-cols-[320px_120px_1fr]">
          <div className="flex flex-col gap-4">
            {[
              { label: "OpenAI", color: "bg-blue-500" },
              { label: "Anthropic", color: "bg-red-500" },
              { label: "Hugging Face", color: "bg-yellow-400" },
              { label: "The next big thing", color: "bg-emerald-500" },
            ].map((p, i) => (
              <div key={i} className="inline-flex items-center gap-3 rounded-full border px-4 py-2">
                <span className={`h-2 w-2 rounded-full ${p.color}`} />
                <span className="text-sm">{p.label}</span>
              </div>
            ))}
          </div>

          <div className="relative hidden items-center justify-center md:flex">
            <svg width="140" height="200" viewBox="0 0 140 200" className="opacity-80">
              <defs>
                <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path d="M0 20 C 60 20, 60 60, 120 100" stroke="url(#g1)" strokeWidth="4" fill="none" />
              <path d="M0 60 C 60 60, 60 90, 120 100" stroke="url(#g2)" strokeWidth="4" fill="none" />
              <path d="M0 100 C 60 100, 60 110, 120 100" stroke="url(#g3)" strokeWidth="4" fill="none" />
              <path d="M0 140 C 60 140, 60 120, 120 100" stroke="url(#g4)" strokeWidth="4" fill="none" />
            </svg>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-2xl border bg-black/60 p-5">
              <div className="h-16 w-28 rounded-md border bg-black/40" />
              <div className="mt-3 h-2 w-24 rounded bg-white/20" />
              <div className="mt-2 h-2 w-20 rounded bg-white/10" />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-black/60 p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-black/50">
                <div className="h-8 w-8 rounded-full border" />
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl border bg-black/30 p-6">
            <div className="h-10 rounded-full border bg-black/40" />
            <div className="mt-4 h-5 w-3/4 rounded bg-white/10" />
            <div className="mt-2 h-5 w-2/3 rounded bg-white/5" />
            <div className="mt-6 h-24 rounded-xl border bg-black/40" />
          </div>
        </div>
      </section>
    </div>
  );
}
