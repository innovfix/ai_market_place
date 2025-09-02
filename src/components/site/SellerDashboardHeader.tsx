"use client";

import Link from "next/link";
import { NotificationDropdown } from "@/components/site/NotificationDropdown";
import { MessageDropdown } from "@/components/site/MessageDropdown";
import { 
  ChevronDown, 
  HelpCircle,
  Globe,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SellerDashboardHeaderProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

export function SellerDashboardHeader({ 
  userName = "Tessa", 
  userAvatar = "/profile1.jpeg",
  notificationCount = 1 
}: SellerDashboardHeaderProps) {
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [language, setLanguage] = useState<string>("English");
  const [currency, setCurrency] = useState<{ code: string; symbol: string }>({ code: "INR", symbol: "₹" });
  const languages = ["English", "हिन्दी (Hindi)", "Español (Spanish)", "Français (French)"];
  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
  ];
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [marketingDropdownOpen, setMarketingDropdownOpen] = useState(false);
  const [analyticsDropdownOpen, setAnalyticsDropdownOpen] = useState(false);
  const router = useRouter();
  const helpRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens/sessions
    router.push('/');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setHelpDropdownOpen(false);
      }
      if (businessRef.current && !businessRef.current.contains(event.target as Node)) {
        setBusinessDropdownOpen(false);
      }
      if (marketingRef.current && !marketingRef.current.contains(event.target as Node)) {
        setMarketingDropdownOpen(false);
      }
      if (analyticsRef.current && !analyticsRef.current.contains(event.target as Node)) {
        setAnalyticsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-blue-950/90 via-purple-950/80 to-indigo-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-gradient-to-r from-blue-950/70 via-purple-950/60 to-indigo-950/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="relative z-10 text-white">
                <path fill="currentColor" d="M12 2l9 16H3L12 2z" />
              </svg>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">AI Market</span>
          </Link>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-6">
            {/* Dashboard */}
            <Link href="/seller-dashboard" className="text-white font-medium hover:text-blue-200 transition-colors cursor-pointer">Dashboard</Link>
            
            {/* My Business */}
            <div className="relative" ref={businessRef}>
              <button
                onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
                className="flex items-center text-white hover:text-blue-200 transition-colors cursor-pointer"
              >
                My Business
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              {businessDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="py-2">
                    <button 
                      onClick={() => {
                        router.push('/dashboard/manage-agents');
                        setBusinessDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      Manage Agents
                    </button>
                    <button 
                      onClick={() => {
                        router.push('/dashboard/create-agent');
                        setBusinessDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      Create New Agent
                    </button>
                    <button 
                      onClick={() => {
                        router.push('/dashboard/profile');
                        setBusinessDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      Profile Settings
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Growth & Marketing */}
            <div className="relative" ref={marketingRef}>
              <button
                onClick={() => setMarketingDropdownOpen(!marketingDropdownOpen)}
                className="flex items-center text-white hover:text-blue-200 transition-colors cursor-pointer"
              >
                Growth & Marketing
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              {marketingDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-black border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="py-2">
                    <button 
                      onClick={() => {
                        router.push('/dashboard/promotions');
                        setMarketingDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      Promote Your Agents
                    </button>
                    <button 
                      onClick={() => {
                        router.push('/dashboard/marketing-tools');
                        setMarketingDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      Marketing Tools
                    </button>
                    <button 
                      onClick={() => {
                        router.push('/dashboard/seo-optimization');
                        setMarketingDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      SEO Optimization
                    </button>
                    <button 
                      onClick={() => {
                        router.push('/dashboard/buyer-requests');
                        setMarketingDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      Buyer Requests
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Analytics */}
            <div className="relative" ref={analyticsRef}>
              <button
                onClick={() => setAnalyticsDropdownOpen(!analyticsDropdownOpen)}
                className="flex items-center text-white hover:text-blue-200 transition-colors cursor-pointer"
              >
                Analytics
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              {analyticsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="py-2">
                    <button 
                      onClick={() => {
                        router.push('/dashboard/analytics/overview');
                        setAnalyticsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      Overview
                    </button>
                    <button 
                      onClick={() => {
                        router.push('/dashboard/analytics/performance');
                        setAnalyticsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      Performance
                    </button>
                    <button 
                      onClick={() => {
                        router.push('/dashboard/analytics/revenue');
                        setAnalyticsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      Revenue
                    </button>
                    <button 
                      onClick={() => {
                        router.push('/dashboard/analytics/traffic');
                        setAnalyticsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                      Traffic Sources
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right side - Icons */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <NotificationDropdown notificationCount={notificationCount} />

          {/* Messages */}
          <MessageDropdown />

          {/* Help */}
          <div className="relative" ref={helpRef}>
            <button 
              onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
              className="p-2 text-white hover:text-blue-200 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-5 w-5" />
            </button>

            {helpDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-black border border-gray-700 rounded-lg shadow-xl z-50">
                <div className="py-2">
                  <button 
                    onClick={() => {
                      router.push('/help-center');
                      setHelpDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                  >
                    Help Center
                  </button>
                  <button 
                    onClick={() => {
                      router.push('/fiverr-forum');
                      setHelpDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                  >
                    AI Market Forum
                  </button>
                  <button 
                    onClick={() => {
                      router.push('/fiverr-blog');
                      setHelpDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                  >
                    AI Market Blog
                  </button>
                  
                  <div className="border-t border-gray-700 my-2"></div>
                  
                  <button 
                    onClick={() => {
                      router.push('/ask-community');
                      setHelpDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                  >
                    Ask the Community
                  </button>
                  <button 
                    onClick={() => {
                      router.push('/contact-support');
                      setHelpDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-black border-gray-700">
              <DropdownMenuLabel className="font-normal bg-black text-white border-b border-gray-700 pb-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">{userName}</p>
                  <p className="text-xs leading-none text-gray-400">
                    Tessa@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              
              {/* Switch to Buying Button */}
              <div className="px-4 py-3 border-b border-gray-700">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full px-4 py-2 text-center bg-gray-800 hover:bg-gray-700 text-white rounded-lg cursor-pointer transition-colors"
                >
                  Switch to Buying
                </button>
              </div>
              
              <DropdownMenuItem 
                onClick={() => router.push('/dashboard/profile')}
                className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white"
              >
                Profile
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => router.push('/seller-dashboard/account')}
                className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white"
              >
                Account settings
              </DropdownMenuItem>
              
              <DropdownMenuItem className="cursor-pointer text-green-400 hover:bg-gray-800 hover:text-green-300 focus:bg-gray-800 focus:text-green-300">
                Refer a friend
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => router.push('/seller-dashboard/billing')} className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
                Billing and payments
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-gray-700" />
              
              <DropdownMenuItem onClick={() => setLanguageOpen(true)} className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    <span>{language}</span>
                  </div>
                  <span className="text-xs text-gray-500">Change</span>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => setCurrencyOpen(true)} className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    <span>{currency.symbol} {currency.code}</span>
                  </div>
                  <span className="text-xs text-gray-500">Change</span>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-gray-700" />
              
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer text-red-400 hover:bg-gray-800 hover:text-red-300 focus:bg-gray-800 focus:text-red-300"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Dialog */}
          <Dialog open={languageOpen} onOpenChange={setLanguageOpen}>
            <DialogContent className="bg-black border border-gray-700" aria-label="Language settings">
              <DialogHeader>
                <DialogTitle className="text-white">Choose your language</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <label key={lang} className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="seller_language"
                      checked={language === lang}
                      onChange={() => setLanguage(lang)}
                      className="accent-blue-500"
                    />
                    {lang}
                  </label>
                ))}
              </div>
              <DialogFooter>
                <Button onClick={() => setLanguageOpen(false)} className="bg-white text-black hover:bg-gray-100 cursor-pointer">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Currency Dialog */}
          <Dialog open={currencyOpen} onOpenChange={setCurrencyOpen}>
            <DialogContent className="bg-black border border-gray-700" aria-label="Currency settings">
              <DialogHeader>
                <DialogTitle className="text-white">Choose your currency</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                {currencies.map((c) => (
                  <label key={c.code} className="flex items-center justify-between text-sm text-gray-300 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="seller_currency"
                        checked={currency.code === c.code}
                        onChange={() => setCurrency({ code: c.code, symbol: c.symbol })}
                        className="accent-blue-500"
                      />
                      <span className="font-medium">{c.symbol} {c.code}</span>
                    </div>
                    <span className="text-gray-500">{c.name}</span>
                  </label>
                ))}
              </div>
              <DialogFooter>
                <Button onClick={() => setCurrencyOpen(false)} className="bg-white text-black hover:bg-gray-100 cursor-pointer">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
