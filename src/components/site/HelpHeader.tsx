"use client";

import Link from "next/link";

export function HelpHeader() {
  return (
    <header className="w-full border-b bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-black font-bold">fi</span>
            </div>
            <span className="text-lg font-semibold text-white">help.</span>
          </Link>

          <nav className="flex items-center gap-6">
            <a className="text-sm text-gray-300 hover:underline">Go to AI Market</a>
            <a className="text-sm text-gray-300 hover:underline">My support requests</a>
            <a className="text-sm text-gray-300 hover:underline">English (US)</a>
            <a className="text-sm text-gray-300 hover:underline">Sign in</a>
          </nav>
        </div>
      </div>
    </header>
  );
}



