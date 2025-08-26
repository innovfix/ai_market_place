"use client";

import { agents } from "@/data/agents";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const router = useRouter();
  const topSellers = agents.slice(0, 6);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <section className="relative overflow-hidden rounded-2xl border bg-[linear-gradient(180deg,white,rgba(221,36,118,0.04)_20%,rgba(255,81,47,0.05)_60%,transparent_100%)] p-8 md:p-12">
        <div className="max-w-2xl">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-5xl">Join the AI Seller Community</h1>
          <p className="text-muted-foreground">Launch your AI agent to thousands of buyers. Keep ownership, set pricing, and get paid.</p>
          <div className="mt-6 flex gap-3">
            <Button 
              className="px-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
              onClick={() => router.push("/onboarding")}
            >
              Get Started
            </Button>
            <Button 
              variant="secondary" 
              asChild
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm hover:border-white/30 transition-all duration-300"
            >
              <a href="#sellers">See Top Sellers</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="sellers" className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Top Sellers</h2>
        <p className="mb-6 text-sm text-muted-foreground">Creators who have successfully deployed their AI agents.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topSellers.map((a) => (
            <div key={a.id} className="rounded-2xl border p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border">
                  {a.imageUrl ? <Image src={a.imageUrl} alt={a.name} fill className="object-cover" /> : null}
                </div>
                <div>
                  <div className="font-medium">{a.seller?.name ?? a.provider}</div>
                  <div className="text-xs text-muted-foreground">{a.name}</div>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signup modal removed per request. */}
    </div>
  );
}


