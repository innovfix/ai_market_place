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
import { LoggedInHeader } from "@/components/site/LoggedInHeader";
import { OrderModal } from "@/components/marketplace/OrderModal";
import { use, useState } from "react";
import { AIAgent } from "@/types/agent";

export default function DashboardAgentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const agent = agents.find((a) => a.id === id);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  
  if (!agent) return notFound();

  return (
    <div className="min-h-screen bg-black">
      <LoggedInHeader />
      
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Dashboard-specific breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              All Services
            </Link>
            <span>/</span>
            <span className="text-white">{agent.name}</span>
          </div>
        </nav>

        {/* Hero Section with Dashboard styling */}
        <div className="relative mb-8 rounded-2xl bg-gradient-to-br from-blue-950/40 via-purple-950/30 to-indigo-950/40 p-8 border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(59,130,246,0.1)_0%,rgba(147,51,234,0.05)_50%,rgba(99,102,241,0.02)_100%)]" />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  {agent.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-blue-200 text-sm">by {agent.provider}</span>
                  <Badge variant="secondary" className="bg-green-900/30 text-green-300 border-green-700">
                    Active
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-900/30 text-blue-300 border-blue-700">
                    {agent.model}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white mb-1">${agent.priceUSD}</div>
                <div className="text-blue-200 text-sm">Starting price</div>
              </div>
            </div>
            
            <p className="text-blue-200 text-lg mb-6 max-w-4xl">{agent.description}</p>
            
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

            {/* Quick action buttons for dashboard users */}
            <div className="flex gap-3">
              <Button 
                onClick={() => setOrderModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white shadow-lg cursor-pointer"
              >
                Order Now
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 cursor-pointer"
              >
                Add to Favorites
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 cursor-pointer"
              >
                Contact Seller
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 md:gap-8 md:grid-cols-[1.6fr_1fr]">
          <div>
            <AgentMediaTabs agent={agent} />
            
            {/* Dashboard-specific stats section */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-blue-100">Performance Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-white">{agent.rating}</div>
                  <div className="text-xs text-blue-200">Rating</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-white">{agent.downloads.toLocaleString()}</div>
                  <div className="text-xs text-blue-200">Installs</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-white">4.8</div>
                  <div className="text-xs text-blue-200">Satisfaction</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-white">99%</div>
                  <div className="text-xs text-blue-200">Uptime</div>
                </div>
              </div>
            </div>
            
            {agent.seller ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-lg font-semibold text-purple-100">Meet {agent.seller.name}</h3>
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
                      <div className="text-xs text-green-400">• Online now</div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setChatOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 text-white shadow-lg"
                  >
                    Start Chat
                  </Button>
                </div>
                <Separator className="my-4 bg-white/10" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-purple-300 mb-1">Member since</div>
                    <div className="font-medium text-white">{agent.seller.memberSince ?? "—"}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-purple-300 mb-1">Response time</div>
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
            <PricingPlans 
              basePriceUSD={agent.priceUSD} 
              onOrderClick={() => setOrderModalOpen(true)}
            />
            
            {/* Enhanced Details Card for Dashboard */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-5 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-emerald-100 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                Technical Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-emerald-300">Provider</span>
                  <span className="font-medium text-white">{agent.provider}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-emerald-300">Model</span>
                  <span className="font-medium text-white">{agent.model}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-emerald-300">Version</span>
                  <span className="font-medium text-white">v{agent.version}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-emerald-300">Last Updated</span>
                  <span className="font-medium text-white">{new Date(agent.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-emerald-300">Category</span>
                  <span className="font-medium text-white">{agent.tags[0]}</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links for Dashboard Users */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-5 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-blue-100 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Quick Actions
              </h3>
              <div className="flex flex-col gap-3 text-sm">
                <Button 
                  variant="outline"
                  className="justify-start border-white/10 text-white hover:bg-blue-500/10 hover:border-blue-500/30 cursor-pointer"
                >
                  📚 View Documentation
                </Button>
                <Button 
                  variant="outline"
                  className="justify-start border-white/10 text-white hover:bg-blue-500/10 hover:border-blue-500/30 cursor-pointer"
                >
                  🔗 API Reference
                </Button>
                <Button 
                  variant="outline"
                  className="justify-start border-white/10 text-white hover:bg-blue-500/10 hover:border-blue-500/30 cursor-pointer"
                >
                  💬 Community Support
                </Button>
                <Button 
                  variant="outline"
                  className="justify-start border-white/10 text-white hover:bg-blue-500/10 hover:border-blue-500/30 cursor-pointer"
                >
                  📊 Usage Analytics
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      <ChatWidget
        name={agent.seller ? agent.seller.name : "Seller"}
        avatarUrl={agent.seller ? agent.seller.avatarUrl : undefined}
        subtitle={agent.seller && agent.seller.responseTime ? "Online • Avg. response: " + agent.seller.responseTime : "Online"}
        isOpen={chatOpen}
        onOpenChange={setChatOpen}
      />
      
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        agent={agent}
      />
    </div>
  );
}

