"use client";

import Link from "next/link";
import { Bell, CircleHelp, ChevronDown, Mail, Settings, Volume2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { agents } from "@/data/agents";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SellerTopNav({ seller }: { seller: string }) {
  const base = `/users/${encodeURIComponent(seller)}`;
  const sellerInfo = agents.find((a) => a.seller?.name.toLowerCase() === seller.toLowerCase())?.seller;
  return (
    <div className="border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="text-xl font-semibold">AI Market</div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link className="hover:text-foreground" href={`${base}/dashboard`}>Dashboard</Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 hover:text-foreground">
                <span>My Business</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Manage</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`${base}/orders`}>Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${base}/manage-agents`}>Agents</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${base}/messages`}>Messages</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${base}/profile`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`${base}/earnings`}>Earnings</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative"><Bell className="h-5 w-5" /><span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-pink-500" /></div>
          {/* Inbox dropdown for seller */}
          <div className="relative">
            <Link href={`${base}/messages`} className="relative rounded-full p-2 hover:bg-accent inline-flex">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Go to messages</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="absolute inset-0 rounded-full hover:bg-accent" />
              <DropdownMenuContent className="w-[360px] p-0" align="end">
                <div className="border-b p-3 text-sm font-medium">Inbox (0)</div>
                <div className="max-h-80 overflow-auto">
                  {[{name:"Ajay Kumar",handle:"@ajayceo1985",text:"Please let me know your thoughts",time:"5 months"},{name:"Abdul Muizz",handle:"@abdulmuizz667",text:"Features are also listed there",time:"6 months"}].map((m,i)=> (
                    <Link key={i} href={`${base}/messages?conversation=${i+1}`} className="flex gap-3 border-b p-3 hover:bg-accent transition-colors">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={sellerInfo?.avatarUrl} alt={m.name} />
                        <AvatarFallback>{m.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-sm"><span className="font-medium truncate">{m.name}</span><span className="truncate text-muted-foreground">{m.handle}</span></div>
                        <div className="truncate text-sm text-muted-foreground">{m.text}</div>
                        <div className="text-xs text-muted-foreground">{m.time}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t p-2 text-sm">
                  <div className="flex items-center gap-3 px-1">
                    <Volume2 className="h-4 w-4" />
                    <Settings className="h-4 w-4" />
                  </div>
                  <Link href={`${base}/messages`} className="px-2 text-primary hover:underline">See All in Inbox</Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CircleHelp className="h-5 w-5" />
          <div className="relative">
            <Avatar className="h-7 w-7">
              <AvatarImage src={sellerInfo?.avatarUrl} alt={seller} />
              <AvatarFallback>{seller.split(" ").map(n=>n[0]).slice(0,2).join("")}</AvatarFallback>
            </Avatar>
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
}


