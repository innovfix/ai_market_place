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
    <div className="border-b border-white/10 bg-gradient-to-r from-slate-900/95 via-purple-950/90 to-slate-900/95 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="text-xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">AI Market</div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link 
              className="relative px-3 py-2 rounded-lg text-purple-200 hover:text-white transition-all duration-300 hover:bg-purple-500/20 hover:border border-purple-500/30 group" 
              href={`${base}/dashboard`}
            >
              <span className="relative z-10">Dashboard</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-blue-200 hover:text-white transition-all duration-300 hover:bg-blue-500/20 hover:border border-blue-500/30 group">
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
          <div className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group">
            <Bell className="h-5 w-5 text-purple-200 group-hover:text-purple-100" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 animate-pulse" />
          </div>
          
          {/* Inbox dropdown for seller */}
          <div className="relative">
            <Link href={`${base}/messages`} className="relative rounded-lg p-2 hover:bg-blue-500/20 hover:border border-blue-500/30 inline-flex transition-all duration-300 group">
              <Mail className="h-5 w-5 text-blue-200 group-hover:text-blue-100" />
              <span className="sr-only">Go to messages</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="absolute inset-0 rounded-lg hover:bg-blue-500/20" />
              <DropdownMenuContent className="w-[360px] p-0 border-white/20 bg-slate-900/95 backdrop-blur-xl" align="end">
                <div className="border-b border-white/10 p-3 text-sm font-medium text-white bg-gradient-to-r from-blue-950/50 to-purple-950/50">Inbox (0)</div>
                <div className="max-h-80 overflow-auto">
                  {[{name:"Ajay Kumar",handle:"@ajayceo1985",text:"Please let me know your thoughts",time:"5 months"},{name:"Abdul Muizz",handle:"@abdulmuizz667",text:"Features are also listed there",time:"6 months"}].map((m,i)=> (
                    <Link key={i} href={`${base}/messages?conversation=${i+1}`} className="flex gap-3 border-b border-white/10 p-3 hover:bg-white/10 transition-colors">
                      <Avatar className="h-10 w-10 ring-2 ring-blue-500/30">
                        <AvatarImage src={sellerInfo?.avatarUrl} alt={m.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">{m.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-sm"><span className="font-medium truncate text-white">{m.name}</span><span className="truncate text-blue-300">{m.handle}</span></div>
                        <div className="truncate text-sm text-gray-300">{m.text}</div>
                        <div className="text-xs text-gray-400">{m.time}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-white/10 p-2 text-sm bg-gradient-to-r from-blue-950/30 to-purple-950/30">
                  <div className="flex items-center gap-3 px-1">
                    <Volume2 className="h-4 w-4 text-blue-300 hover:text-blue-200 cursor-pointer" />
                    <Settings className="h-4 w-4 text-purple-300 hover:text-purple-200 cursor-pointer" />
                  </div>
                  <Link href={`${base}/messages`} className="px-2 text-blue-300 hover:text-blue-200 hover:underline transition-colors">See All in Inbox</Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group">
            <CircleHelp className="h-5 w-5 text-emerald-200 group-hover:text-emerald-100" />
          </div>
          
          <div className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group">
            <Avatar className="h-8 w-8 ring-2 ring-emerald-500/30 group-hover:ring-emerald-500/50 transition-all duration-300">
              <AvatarImage src={sellerInfo?.avatarUrl} alt={seller} />
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-semibold">{seller.split(" ").map(n=>n[0]).slice(0,2).join("")}</AvatarFallback>
            </Avatar>
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}


