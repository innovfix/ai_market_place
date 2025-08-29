"use client";

import { useState } from 'react';
import { LoggedInHeader } from '@/components/site/LoggedInHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Globe, 
  Clock, 
  Eye, 
  ExternalLink,
  Star,
  MessageSquare,
  Check,
  Target,
  Users
} from 'lucide-react';

// Profile Preview Modal Component
const ProfilePreviewModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Floating Modal Panel - Slides in from right */}
      <div className={`absolute top-0 right-0 h-full w-96 bg-black border-l border-gray-700 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header with title and close button */}
        <div className="sticky top-0 bg-black border-b border-gray-700 px-8 py-4 flex items-center justify-between z-10">
          <h1 className="text-xl font-semibold text-white">Your Profile</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Profile Content */}
        <div className="bg-black text-white p-6">
          {/* Profile Card */}
          <div className="mb-6 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="/profile1.jpeg" alt="Tessa" />
              <AvatarFallback className="bg-gray-700 text-white text-xl">T</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-white mb-1">Tessa</h2>
            <p className="text-gray-400 mb-4">@Tessa7</p>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center text-gray-300 text-sm">
                <MapPin className="w-3 h-3 mr-2 text-gray-400" />
                <span>Located in India</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Calendar className="w-3 h-3 mr-2 text-gray-400" />
                <span>Joined in April 2025</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Globe className="w-3 h-3 mr-2 text-gray-400" />
                <span>English (Basic)</span>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Reviews from freelancers</h3>
            
            <div className="text-center py-6">
              <div className="relative inline-block">
                <div className="bg-white rounded-full p-3 mb-3">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                    ))}
                  </div>
                </div>
                {/* Speech bubble tail */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"></div>
              </div>
              <p className="text-gray-400 text-xs mt-3">akraja7 doesn't have any reviews yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <LoggedInHeader />
      
      <div className="max-w-6xl mx-auto p-8">
        {/* Breadcrumb */}
        <div className="text-gray-400 mb-8">
          <span>Home</span> / <span>My Profile</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700 p-6 mb-6">
              <div className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src="/profile1.jpeg" alt="Tessa" />
                  <AvatarFallback className="bg-gray-700 text-white text-2xl">T</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold text-white mb-2">Tessa</h1>
                <p className="text-gray-400 mb-4">@Tessa7</p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Located in India</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Joined in April 2025</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Globe className="w-4 h-4 mr-2 text-gray-400" />
                    <span>English (Basic)</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-500">Preferred working hours</span>
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              onClick={() => setShowPreview(true)}
              className="w-full mb-4 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 cursor-pointer"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview public profile
            </Button>

            <Button 
              onClick={() => window.location.href = '/seller-dashboard'}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Explore AI Market
            </Button>

            <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-lg">
              <p className="text-gray-400 text-sm">
                You're currently on your buyer profile. To access your freelancer profile, switch to{' '}
                <span className="text-blue-400 cursor-pointer hover:underline">seller mode</span>
              </p>
            </div>
          </div>

          {/* Right Column - Profile Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">👋</span>
                <h2 className="text-2xl font-bold text-white">Let's help freelancers get to know you</h2>
              </div>
              <p className="text-gray-400">
                Get the most out of Fiverr by sharing a bit more about yourself and how you prefer to work with freelancers.
              </p>
            </div>

            {/* Profile Checklist */}
            <Card className="bg-gray-900 border-gray-700 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Profile checklist</h3>
                <span className="text-blue-400 font-semibold">65%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div className="bg-black h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-700 transition-colors">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">Share how you plan to use Fiverr</h4>
                    <p className="text-gray-400 text-sm">Tell us if you're here to find services or offer them.</p>
                  </div>
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-700 transition-colors">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">Set your communication preferences</h4>
                    <p className="text-gray-400 text-sm">Let freelancers know your collaboration preferences.</p>
                  </div>
                  <span className="text-blue-400 font-semibold">50%</span>
                </div>
              </div>
            </Card>

            {/* Reviews Section */}
            <Card className="bg-gray-900 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Reviews from freelancers</h3>
              
              <div className="text-center py-12">
                <div className="relative inline-block">
                  <div className="bg-white rounded-full p-4 mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-orange-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  {/* Speech bubble tail */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white"></div>
                </div>
                <p className="text-gray-400 mt-4">akraja7 doesn't have any reviews yet.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Profile Preview Modal */}
      <ProfilePreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} />
    </div>
  );
}
