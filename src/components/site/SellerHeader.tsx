'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  MessageSquare, 
  Heart, 
  ShoppingBag, 
  ChevronDown,
  Search,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Globe,
  Volume2,
  VolumeX
} from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { MessageDropdown } from './MessageDropdown';
import { OrdersDropdown } from './OrdersDropdown';

export function SellerHeader() {
  const router = useRouter();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [marketingDropdownOpen, setMarketingDropdownOpen] = useState(false);
  const [analyticsDropdownOpen, setAnalyticsDropdownOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const profileRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
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

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <header className="bg-black border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center h-16">
          {/* Only AI Market Logo */}
          <Link href="/dashboard" className="cursor-pointer">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 rounded">
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[14px] border-l-transparent border-r-transparent border-b-white"></div>
              <span className="text-white font-semibold text-lg">AI Market</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
