"use client";

import Link from "next/link";
import { Music, Instagram, Linkedin, Facebook, Send, Globe, User, X } from "lucide-react";

export function Footer() {
  return (
  <footer className="w-full bg-gradient-to-r from-[#2b1b4f] via-[#3a0f5a] to-[#170629] text-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-60"></div>
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="relative z-10 text-white">
                  <path fill="currentColor" d="M12 2l9 16H3L12 2z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-white">AI Market</span>
            </Link>
            <span className="text-sm text-gray-400">© AI Market International Ltd. 2025</span>
          </div>

          {/* flexible spacer to push left and right blocks to extremes */}
          <div className="flex-1" />

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white"><Music className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Send className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></a>
            </div>

            <div className="mx-3 h-1 w-1 bg-gray-600 rounded-full" />

            <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Globe className="w-4 h-4" />
                <span className="text-sm">English</span>
              </a>
              <span className="text-sm text-gray-400">₹ INR</span>
              <button aria-label="accessibility" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
