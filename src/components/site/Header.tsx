"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JoinDialog } from "@/components/auth/JoinDialog";
import { useState } from "react";

export function Header() {
  const [joinOpen, setJoinOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-blue-950/90 via-purple-950/80 to-indigo-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-gradient-to-r from-blue-950/70 via-purple-950/60 to-indigo-950/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="relative z-10 text-white">
                <path fill="currentColor" d="M12 2l9 16H3L12 2z" />
              </svg>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">AI Market</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link 
              href="#agents" 
              className="relative px-3 py-2 rounded-lg text-blue-200 hover:text-white transition-all duration-300 hover:bg-blue-500/20 hover:border border-blue-500/30 group"
            >
              <span className="relative z-10">Explore</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/sell" 
              className="relative px-3 py-2 rounded-lg text-purple-200 hover:text-white transition-all duration-300 hover:bg-purple-500/20 hover:border border-purple-500/30 group"
            >
              <span className="relative z-10">Become a Seller</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setJoinOpen(true)}
            variant="secondary" 
            className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm hover:border-white/30 transition-all duration-300"
          >
            Sign in
          </Button>
          <Button 
            onClick={() => setJoinOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Join
          </Button>
        </div>
      </div>
      <JoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </header>
  );
}

 