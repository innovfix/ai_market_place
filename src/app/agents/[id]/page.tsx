"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { agents } from "@/data/agents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PricingPlans from "@/components/marketplace/PricingPlans";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatWidget } from "@/components/site/ChatWidget";
import AgentMediaTabs from "@/components/marketplace/AgentMediaTabs";
import { use } from "react";

export default function AgentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const agent = agents.find((a) => a.id === id);
  
  if (!agent) return notFound();

  return (
    <>
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Hero Section with Gradient Background */}
        <div className="relative mb-8 rounded-2xl bg-gradient-to-br from-blue-950/40 via-purple-950/30 to-indigo-950/40 p-8 border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(59,130,246,0.1)_0%,rgba(147,51,234,0.05)_50%,rgba(99,102,241,0.02)_100%)]" />
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">{agent.name}</h1>
            <p className="text-blue-200 text-lg mb-6 max-w-3xl">{agent.description}</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {agent.capabilities.map((cap, index) => (
                <Badge 
                  key={cap} 
                  variant="secondary"
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    index % 3 === 0 
                      ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-200 hover:bg-blue-500/30 hover:border-blue-400/50" 
                      : index % 3 === 1 
                      ? "bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-200 hover:bg-purple-500/30 hover:border-purple-400/50"
                      : "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-200 hover:bg-emerald-500/30 hover:border-emerald-400/50"
                  }`}
                >
                  {cap}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 md:gap-8 md:grid-cols-[1.6fr_1fr]">
          <div>
            <AgentMediaTabs agent={agent} />
            {/* Configuration block removed as requested */}
            {agent.seller ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-lg font-semibold text-purple-100">Get to know {agent.seller.name}</h3>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-purple-500/30">
                      {agent.seller.avatarUrl ? <AvatarImage src={agent.seller.avatarUrl} alt={agent.seller.name} /> : null}
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">{agent.seller.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-white">{agent.seller.name}</div>
                      {agent.seller.title ? (
                        <div className="text-sm text-purple-200">{agent.seller.title}</div>
                      ) : null}
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 text-white shadow-lg">
                    Contact seller
                  </Button>
                </div>
                <Separator className="my-4 bg-white/10" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-purple-300 mb-1">Member since</div>
                    <div className="font-medium text-white">{agent.seller.memberSince ?? "—"}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-purple-300 mb-1">Avg. response time</div>
                    <div className="font-medium text-white">{agent.seller.responseTime ?? "—"}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-purple-300 mb-1">Last delivery</div>
                    <div className="font-medium text-white">{agent.seller.lastDelivery ?? "—"}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-purple-300 mb-1">Languages</div>
                    <div className="font-medium text-white">{agent.seller.languages?.join(", ") ?? "—"}</div>
                  </div>
                </div>
                {agent.seller.bio ? (
                  <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-purple-200">{agent.seller.bio}</p>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <aside className="space-y-4">
            <PricingPlans basePriceUSD={agent.priceUSD} />
            
            {/* Details Card */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-5 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-emerald-100 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-emerald-300 mb-1">Provider</div>
                  <div className="font-medium text-white">{agent.provider}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-emerald-300 mb-1">Model</div>
                  <div className="font-medium text-white">{agent.model}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-emerald-300 mb-1">Version</div>
                  <div className="font-medium text-white">v{agent.version}</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-emerald-300 mb-1">Last Updated</div>
                  <div className="font-medium text-white">{new Date(agent.lastUpdated).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            
            {/* Links Card */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-5 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-blue-100 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Links
              </h3>
              <div className="flex flex-col gap-3 text-sm">
                <Link 
                  href={agent.docsUrl} 
                  className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 text-blue-200 hover:text-blue-100" 
                  target="_blank"
                >
                  📚 Documentation
                </Link>
                {agent.repoUrl ? (
                  <Link 
                    href={agent.repoUrl} 
                    className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 text-blue-200 hover:text-blue-100" 
                    target="_blank"
                  >
                    🔗 Source Code
                  </Link>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <ChatWidget
        name={agent.seller ? agent.seller.name : "Seller"}
        avatarUrl={agent.seller ? agent.seller.avatarUrl : undefined}
        subtitle={agent.seller && agent.seller.responseTime ? "Avg. response time: " + agent.seller.responseTime : ""}
      />
    </>
  );
}



