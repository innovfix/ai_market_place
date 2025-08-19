"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JoinDialog } from "@/components/auth/JoinDialog";
import { useState } from "react";

export function Header() {
  const [joinOpen, setJoinOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M12 2l9 16H3L12 2z" />
            </svg>
            <span className="font-medium">AI Market</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#agents" className="hover:text-foreground">Explore</Link>
            <Link href="#sell" className="hover:text-foreground">Become a Seller</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary">
            <Link href="#signin">Sign in</Link>
          </Button>
          <Button onClick={() => setJoinOpen(true)}>Join</Button>
        </div>
      </div>
      <JoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </header>
  );
}

 