"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeaderSearchWithSuggestions } from "@/components/marketplace/HeaderSearchWithSuggestions";
import { NotificationDropdown } from "@/components/site/NotificationDropdown";
import { MessageDropdown } from "@/components/site/MessageDropdown";
import { OrdersDropdown } from "@/components/site/OrdersDropdown";
import { 
  Bell, 
  Mail, 
  Heart, 
  ShoppingCart, 
  ChevronDown, 
  Search,
  User,
  LogOut,
  CreditCard,
  Package,
  FileText,
  LayoutDashboard,
  UserPlus,
  DollarSign,
  Crown,
  Users,
  Shield,
  Globe,
  HelpCircle
} from "lucide-react";
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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface LoggedInHeaderProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

export function LoggedInHeader({ 
  userName = "Tessa", 
  userAvatar = "/profile1.jpeg",
  notificationCount = 1 
}: LoggedInHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
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
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens/sessions
    router.push('/');
  };

  // No help dropdown: clicking the help icon navigates directly to the help center

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-blue-950/90 via-purple-950/80 to-indigo-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-gradient-to-r from-blue-950/70 via-purple-950/60 to-indigo-950/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left side - Logo */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="relative z-10 text-white">
                <path fill="currentColor" d="M12 2l9 16H3L12 2z" />
              </svg>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">AI Market</span>
          </Link>
        </div>

  {/* Center - Search */}
  <div className="flex-1 max-w-2xl mx-8">
          <HeaderSearchWithSuggestions
            query={searchQuery}
            setQuery={setSearchQuery}
            placeholder="What service are you looking for today?"
          />
        </div>

  {/* Right side - Navigation */}
  <div className="flex items-center gap-3">
          {/* Notifications */}
          <NotificationDropdown notificationCount={notificationCount} />

          {/* Messages */}
          <MessageDropdown />

          {/* Favorites */}
          <button 
            onClick={() => router.push('/dashboard/lists')}
            className="p-2 text-white hover:text-blue-200 transition-colors cursor-pointer"
          >
            <Heart className="h-5 w-5" />
          </button>

          {/* Orders */}
          <OrdersDropdown />

          {/* Help: navigate directly to the help center */}
          <div>
            <button
              onClick={() => window.open('/help-center', '_blank')}
              className="p-2 text-white hover:text-blue-200 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>

          {/* Switch to Selling */}
          <button
            onClick={() => router.push('/seller-dashboard')}
            className="text-green-400 hover:text-green-300 transition-colors font-medium cursor-pointer"
          >
            Switch to Selling
          </button>

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
              
              <DropdownMenuItem 
                onClick={() => router.push('/dashboard/profile')}
                className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => router.push('/seller-dashboard')}
                className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="cursor-pointer text-green-400 hover:bg-gray-800 hover:text-green-300 focus:bg-gray-800 focus:text-green-300">
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Refer a friend</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-gray-700" />
              
              <DropdownMenuItem onClick={() => router.push('/dashboard/billing')} className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing and payments</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-gray-700" />
              
              
              
              
              
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
              
              <DropdownMenuItem onClick={() => window.open('/help-center', '_blank')} className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & support</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-gray-700" />
              
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
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
                      name="language"
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
                        name="currency"
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
