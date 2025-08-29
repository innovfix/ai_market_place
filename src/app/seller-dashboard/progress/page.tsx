'use client';

import { SellerDashboardHeader } from '@/components/site/SellerDashboardHeader';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  Check,
  HelpCircle,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SellerProgressPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black">
      <SellerDashboardHeader />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-white mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Level overview</h1>
          <div className="flex items-center space-x-2 text-blue-400 cursor-pointer hover:text-blue-300">
            <span className="text-sm">How the level system works</span>
            <HelpCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Level Progress */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700 p-6">
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/profile1.jpeg" alt="Ashok Kumar" />
                  <AvatarFallback className="bg-gray-700 text-white text-xl">AK</AvatarFallback>
                </Avatar>
                
                {/* Level Progress Indicator */}
                <div className="mb-4">
                  <div className="flex items-center justify-center space-x-4 mb-2">
                    {/* Level 1 - Active */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mb-1">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <span className="text-xs text-pink-500 font-medium">New</span>
                    </div>
                    
                    {/* Connector */}
                    <div className="w-8 h-0.5 bg-gray-600"></div>
                    
                    {/* Level 2 - Inactive */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mb-1">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-400">Level 1</span>
                    </div>
                    
                    {/* Connector */}
                    <div className="w-8 h-0.5 bg-gray-600"></div>
                    
                    {/* Level 3 - Inactive */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mb-1">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-400">Level 2</span>
                    </div>
                    
                    {/* Connector */}
                    <div className="w-8 h-0.5 bg-gray-600"></div>
                    
                    {/* Top Level - Inactive */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mb-1">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-400">Top</span>
                    </div>
                  </div>
                </div>

                {/* Progress Tracker */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-4">Progress tracker</h3>
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                      <div key={item} className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                        <Check className="w-3 h-3 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm text-center">
                    Once you qualify for the next level in all 6 metrics, you'll advance to Level 1.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Performance Metrics */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-700 p-6 mb-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">My performance metrics</h2>
                <p className="text-gray-400">Keep an eye on these stats to monitor your progress in the level system.</p>
              </div>

              {/* Top Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Success Score */}
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Success score</h3>
                  <div className="text-2xl font-bold text-white mb-2">-</div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>0</span>
                    <span>10</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-blue-500 h-1 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>

                {/* Rating */}
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Rating</h3>
                  <div className="text-2xl font-bold text-white mb-2">-</div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>0</span>
                    <span>5</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-blue-500 h-1 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>

                {/* Response Rate */}
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Response rate</h3>
                  <div className="text-2xl font-bold text-white mb-2">-</div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>0</span>
                    <span>100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div className="bg-blue-500 h-1 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Orders */}
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Orders</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">0</span>
                    <span className="text-gray-400">/5</span>
                  </div>
                </div>

                {/* Unique Clients */}
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Unique clients</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">0</span>
                    <span className="text-gray-400">/3</span>
                  </div>
                </div>

                {/* Earnings */}
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Earnings</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">₹0</span>
                    <span className="text-gray-400">/₹36,855.22</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
