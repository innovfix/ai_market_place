'use client';

import React, { useState } from 'react';
import { SellerDashboardHeader } from '@/components/site/SellerDashboardHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  MessageSquare,
  TrendingUp,
  DollarSign,
  X,
  ChevronRight,
  Eye,
  MoreVertical,
  ChevronDown,
  Share2,
  Square,
} from 'lucide-react';
import SetAvailabilityModal from '@/components/site/SetAvailabilityModal';
// ...existing imports...

export default function SellerDashboardPage() {
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  // profile dialog removed — navigation restored

  return (
    <div className="min-h-screen bg-black">
      <SellerDashboardHeader />
      
      <div className="max-w-7xl mx-auto p-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="bg-gray-900 border-gray-700 p-6">
              <div className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/profile1.jpeg" alt="Tessa" />
                  <AvatarFallback className="bg-gray-700 text-white">T</AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold text-white mb-1">Tessa</h2>
                <p className="text-gray-400 text-sm mb-4">@Tessa7</p>
                
                <Button 
                  onClick={() => window.location.href = '/seller-dashboard/profile'}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 cursor-pointer"
                >
                  View profile
                </Button>
              </div>
            </Card>

            {/* Level Overview */}
            <Card className="bg-gray-900 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Level overview</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">My level</span>
                  <Badge className="bg-green-600 text-white">New seller</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Success score</span>
                  <span className="text-white">-</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white ml-1">-</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Response rate</span>
                  <span className="text-white">-</span>
                </div>
              </div>
              
              <Button 
                onClick={() => window.location.href = '/seller-dashboard/progress'}
                className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 cursor-pointer"
              >
                View progress
              </Button>
            </Card>

            {/* Availability */}
            <Card className="bg-gray-900 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Availability</h3>
              <p className="text-gray-400 text-sm mb-4">
                While unavailable, your Gigs are hidden and you will not receive new orders.
              </p>
              
              <Button 
                onClick={() => setAvailabilityOpen(true)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 cursor-pointer"
              >
                Set your availability
              </Button>
              
              {/* Set Availability Modal */}
              <SetAvailabilityModal open={availabilityOpen} onOpenChange={setAvailabilityOpen} />
            </Card>

            {/* Earnings */}
            <Card className="bg-gray-900 border-gray-700 p-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Earned in August</span>
                <span className="text-white font-semibold">US$0</span>
              </div>
            </Card>

            {/* Inbox */}
            <Card className="bg-gray-900 border-gray-700 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Inbox</h3>
                <span className="text-blue-400 text-sm cursor-pointer hover:underline">View All</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-pink-600 text-white">A</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm font-medium">ama_kenn_86721</span>
                    <span className="text-gray-400 text-xs">4 months</span>
                    <Star className="w-3 h-3 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-sm">Me: what you want</p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Message */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Welcome, Tessa</h1>
                  <p className="text-gray-400">Find important messages, tips, and links to helpful resources here:</p>
                </div>
              </div>
            </div>

            {/* Notification Cards */}
            <div className="space-y-4">
              {/* Seller Plus Kickstart */}
              <Card className="bg-gray-900 border-gray-700 p-6 relative">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
                <button className="absolute top-4 right-12 text-gray-400 hover:text-white cursor-pointer">
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                <h3 className="text-lg font-semibold text-white mb-2">Join Seller Plus Kickstart and grow your business</h3>
                <p className="text-gray-400 mb-4">
                  Check out all the exclusive tools and resources that can help you fast-track your success
                </p>
              </Card>

              {/* Auto Replies */}
              <Card className="bg-gray-900 border-gray-700 p-6 relative">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
                <button className="absolute top-4 right-12 text-gray-400 hover:text-white cursor-pointer">
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                <h3 className="text-lg font-semibold text-white mb-2">Set up inbox auto replies</h3>
                <p className="text-gray-400 mb-4">
                  Greet new potential buyers with an auto reply to their first message.
                </p>
              </Card>
            </div>

            {/* Active Orders */}
            <Card className="bg-gray-900 border-gray-700 p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Active orders</h3>
                  <span className="text-gray-400">- 0 ($0)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 cursor-pointer">
                    Active orders (0)
                  </Button>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                </div>
                <p className="text-gray-400">No active orders yet</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

  {/* profile dialog removed */}
    </div>
  );
}
