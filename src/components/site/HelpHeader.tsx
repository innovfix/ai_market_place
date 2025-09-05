"use client";

import Link from "next/link";

export function HelpHeader() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <span className="text-white font-bold">fi</span>
            </div>
            <span className="text-lg font-semibold text-black">help.</span>
          </Link>

          <nav className="flex items-center gap-6">
            <a className="text-sm text-gray-700 hover:underline">Go to Fiverr</a>
            <a className="text-sm text-gray-700 hover:underline">Go to Fiverr Pro</a>
            <a className="text-sm text-gray-700 hover:underline">My support requests</a>
            <a className="text-sm text-gray-700 hover:underline">English (US)</a>
            <a className="text-sm text-gray-700 hover:underline">Sign in</a>
          </nav>
        </div>
      </div>
    </header>
  );
}



