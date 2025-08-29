"use client";

import { LoggedInHeader } from "@/components/site/LoggedInHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Settings, Volume2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

export default function MessagesPage() {
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

  return (
    <div className="min-h-screen bg-black">
      <LoggedInHeader />
      
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6 text-white" />
            <h1 className="text-2xl font-bold text-white">
              Inbox ({messages.length})
            </h1>
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
            <MoreHorizontal className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-3">
          {messages.map((message) => (
            <Card key={message.id} className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0 relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gray-700 text-white text-lg font-medium">
                        A
                      </AvatarFallback>
                    </Avatar>
                    {message.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white font-medium truncate">
                        {message.sender}
                      </h3>
                      <span className="text-gray-500 text-xs flex-shrink-0 ml-2">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-1 font-medium">
                      {message.subject}
                    </p>
                    <p className="text-gray-400 text-sm truncate">
                      {message.preview}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Large empty area to match the design */}
        <div className="mt-6 bg-gray-900 rounded-lg border border-gray-700" style={{ minHeight: '300px' }}>
          <div className="p-8 text-center">
            <Mail className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-gray-400 text-lg font-medium mb-2">Select a conversation</h3>
            <p className="text-gray-500">Choose a message from your inbox to view the conversation.</p>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
              <Volume2 className="h-5 w-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
              <Settings className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          
          <div className="text-right">
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer">
              See All In Inbox
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Empty state if no messages */}
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md mx-auto">
              <Mail className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">No messages</h3>
              <p className="text-gray-400">Your inbox is empty. Start a conversation with sellers!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
