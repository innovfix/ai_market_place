"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, Settings, Volume2, VolumeX, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  online?: boolean;
}

export function MessageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const messages: Message[] = [
    {
      id: "1",
      sender: "ama_kenn_86721",
      subject: "Me: what you want",
      preview: "Hi there! I saw your project and I'm interested in helping you...",
      timestamp: "4 months",
      read: false,
      online: true
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
        className="p-2 text-white hover:text-blue-200 transition-colors cursor-pointer"
      >
        <Mail className="h-5 w-5" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 z-50 mt-2 w-80 bg-black border border-gray-700 rounded-lg shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">
                Inbox ({messages.length})
              </span>
            </div>
          </div>

          {/* Messages List */}
          <div className="max-h-80 overflow-y-auto">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className="p-4 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0 relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gray-700 text-white text-sm font-medium">
                        A
                      </AvatarFallback>
                    </Avatar>
                    {message.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-medium text-sm truncate">
                        {message.sender}
                      </h4>
                      <span className="text-gray-500 text-xs flex-shrink-0 ml-2">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-1 font-medium">
                      {message.subject}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {message.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Large empty area */}
          <div className="bg-gray-900 p-6 min-h-32">
            <div className="text-center">
              <Mail className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Select a conversation</p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-900 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
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
                    router.push('/seller-dashboard/account/notifications');
                  }}
                  className="p-1 hover:bg-gray-700 rounded transition-colors cursor-pointer"
                  title="Open notification settings"
                >
                  <Settings className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              
              <button 
                onClick={() => {
                  setIsOpen(false);
                  router.push('/dashboard/inbox');
                }}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer"
              >
                See All In Inbox
              </button>
            </div>
          </div>

          {/* Empty state */}
          {messages.length === 0 && (
            <div className="p-8 text-center">
              <Mail className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No messages</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
