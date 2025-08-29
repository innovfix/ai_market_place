"use client";

import { agents } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { LoggedInHeader } from "@/components/site/LoggedInHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardSellPage() {
  const router = useRouter();
  const topSellers = agents.slice(0, 6);

  return (
    <div className="min-h-screen bg-black">
      <LoggedInHeader />
      
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <section className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gradient-to-b from-gray-900 via-gray-900/50 to-black p-8 md:p-12">
          <div className="max-w-2xl">
            <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-5xl text-white">Join the AI Seller Community</h1>
            <p className="text-gray-400">Launch your AI agent to thousands of buyers. Keep ownership, set pricing, and get paid.</p>
            <div className="mt-6 flex gap-3">
              <Button 
                className="px-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" 
                onClick={() => router.push("/onboarding")}
              >
                Get Started
              </Button>
              <Button 
                variant="secondary" 
                asChild
                className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 text-white backdrop-blur-sm hover:border-gray-500 transition-all duration-300 cursor-pointer"
              >
                <a href="#sellers">See Top Sellers</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="sellers" className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">Top Sellers</h2>
          <p className="mb-6 text-sm text-gray-400">Creators who have successfully deployed their AI agents.</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topSellers.map((a) => (
              <div key={a.id} className="rounded-2xl border border-gray-700 bg-gray-900 p-4 hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-600">
                    {a.imageUrl ? <Image src={a.imageUrl} alt={a.name} fill className="object-cover" /> : 
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{a.name.charAt(0)}</span>
                      </div>
                    }
                  </div>
                  <div>
                    <div className="font-medium text-white">{a.seller?.name ?? a.provider}</div>
                    <div className="text-xs text-gray-400">{a.name}</div>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-gray-400">{a.description}</p>
                
                {/* Stats */}
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>⭐</span>
                    <span>{a.rating || '5.0'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📦</span>
                    <span>{a.downloads || 0} sales</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💰</span>
                    <span>${a.priceUSD}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Selling Info Section */}
        <section className="mt-16 rounded-2xl border border-gray-700 bg-gray-900 p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Why Sell on AI Market?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
                <div className="text-blue-400 text-2xl mb-3">🚀</div>
                <h3 className="text-white font-semibold mb-2">Easy Setup</h3>
                <p className="text-gray-400 text-sm">Get your AI agent listed in minutes with our simple onboarding process.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
                <div className="text-green-400 text-2xl mb-3">💰</div>
                <h3 className="text-white font-semibold mb-2">Keep More Revenue</h3>
                <p className="text-gray-400 text-sm">Low fees mean you keep more of what you earn from your AI agent sales.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
                <div className="text-purple-400 text-2xl mb-3">🌐</div>
                <h3 className="text-white font-semibold mb-2">Global Reach</h3>
                <p className="text-gray-400 text-sm">Access thousands of potential buyers from around the world.</p>
              </div>
            </div>
            <div className="mt-8">
              <Button 
                className="px-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" 
                onClick={() => router.push("/onboarding")}
              >
                Start Selling Today
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
