"use client";

import { LoggedInHeader } from "@/components/site/LoggedInHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Mail, Settings, Volume2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsPage() {
  const router = useRouter();
  const notifications: Notification[] = [
    {
      id: "1",
      type: "success",
      title: "Good news! Your information was verified.",
      message: "Your account verification has been completed successfully.",
      timestamp: "4 months",
      read: false
    },
    {
      id: "2",
      type: "info",
      title: "Thanks for filling out Form W-9.",
      message: "You completed the check and you are now compliant.",
      timestamp: "4 months",
      read: false
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <LoggedInHeader />
      
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-white" />
            <h1 className="text-2xl font-bold text-white">
              Notifications ({notifications.length})
            </h1>
          </div>
          <button onClick={() => router.push('/seller-dashboard/account/notifications')} className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
            <Settings className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card key={notification.id} className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Notification Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Bell className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium mb-1 leading-tight">
                      {notification.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {notification.message}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {notification.timestamp}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0">
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state if no notifications */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md mx-auto">
              <Bell className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">No notifications</h3>
              <p className="text-gray-400">You're all caught up! Check back later for updates.</p>
            </div>
          </div>
        )}

        {/* Bottom controls */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
              <Volume2 className="h-5 w-5 text-gray-400" />
            </button>
            <button onClick={() => router.push('/seller-dashboard/account/notifications')} className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
              <Settings className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
