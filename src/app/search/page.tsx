"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { agents } from "@/data/agents";
import { AgentCard } from "@/components/marketplace/AgentCard";
import { AgentDetailDialog } from "@/components/marketplace/AgentDetailDialog";
import { AIAgent } from "@/types/agent";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [activeAgent, setActiveAgent] = useState<AIAgent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();
    if (!query) return agents;
    return agents.filter((a) => [a.name, a.description, a.model, a.provider, ...a.tags].some((t) => t.toLowerCase().includes(query)));
  }, [q]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Results for <span className="text-primary">{q || "all agents"}</span></h1>
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {["Category", "Service options", "Seller details", "Budget", "Delivery time"].map((label) => (
          <Button key={label} variant="outline" className="rounded-[10px] h-10 px-4 flex-1 sm:flex-none min-w-[160px]">
            {label}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        ))}
        <div className="sm:ml-auto w-full sm:w-auto text-right text-sm text-muted-foreground">{filtered.length} result{filtered.length === 1 ? "" : "s"}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((agent) => (
          <AgentCard key={agent.id} agent={agent} href={`/agents/${agent.id}`} onView={(a) => { setActiveAgent(a); setDialogOpen(true); }} />
        ))}
      </div>
      <AgentDetailDialog agent={activeAgent} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}


