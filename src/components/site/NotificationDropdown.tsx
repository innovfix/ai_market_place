"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Mail, Settings, Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationDropdownProps {
  notificationCount?: number;
}

export function NotificationDropdown({ notificationCount = 2 }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(true);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Play notification sound when enabled
  const playNotificationSound = () => {
    if (soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        console.log("Audio not supported");
      }
    }
  };

  const toggleSound = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    
    // Play sound when turning on
    if (newSoundState) {
      setTimeout(() => {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
          console.log("Audio not supported");
        }
      }, 100);
    }
  };

  return (
    <div className="relative">
      <button 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-blue-200 transition-colors cursor-pointer"
      >
        <Bell className="h-5 w-5" />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 z-50 mt-2 w-96 bg-black border border-gray-700 rounded-lg shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">
                Notifications ({notifications.length})
              </span>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="p-4 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Bell className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm leading-tight mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-gray-400 text-xs mb-2">
                      {notification.message}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {notification.timestamp}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0">
                    <button className="p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-900 border-t border-gray-700">
            <div className="flex items-center justify-start gap-2">
              <button 
                onClick={toggleSound}
                className="p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer"
                title={soundEnabled ? "Disable sound notifications" : "Enable sound notifications"}
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 text-blue-400" />
                ) : (
                  <VolumeX className="h-4 w-4 text-red-400" />
                )}
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  router.push('/dashboard/settings');
                }}
                className="p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer"
                title="Open settings"
              >
                <Settings className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Empty state */}
          {notifications.length === 0 && (
            <div className="p-8 text-center">
              <Bell className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No notifications</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
