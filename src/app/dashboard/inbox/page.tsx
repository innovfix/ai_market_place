"use client";

import { useState, useEffect, useRef } from "react";
import { LoggedInHeader } from "@/components/site/LoggedInHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Archive, 
  Star, 
  MoreHorizontal, 
  ArrowLeft,
  Send,
  Paperclip,
  Smile
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  online?: boolean;
  starred?: boolean;
}

export default function InboxPage() {
  const router = useRouter();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "starred">("all");
  const [archivedMessages, setArchivedMessages] = useState<string[]>([]);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close filter dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setFilterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ama_kenn_86721",
      senderAvatar: "/profile1.jpeg",
      subject: "Me: what you want",
      preview: "Hi there! I saw your project and I'm interested in helping you with your AI development needs. I have extensive experience...",
      timestamp: "4 months ago",
      read: false,
      online: true,
      starred: false
    },
    {
      id: "2",
      sender: "sarah_dev_2024",
      subject: "Project Proposal Follow-up",
      preview: "Thank you for considering my proposal. I wanted to follow up on the AI chatbot project we discussed...",
      timestamp: "2 weeks ago",
      read: true,
      online: false,
      starred: true
    },
    {
      id: "3",
      sender: "mike_designer",
      subject: "UI/UX Design Consultation",
      preview: "I'd love to help you create a stunning user interface for your AI marketplace platform...",
      timestamp: "1 week ago",
      read: true,
      online: true,
      starred: false
    },
    {
      id: "4",
      sender: "alex_coder",
      subject: "Backend Development Service",
      preview: "I can help you build a robust backend for your marketplace. I specialize in Node.js and databases...",
      timestamp: "3 days ago",
      read: false,
      online: false,
      starred: false
    },
    {
      id: "5",
      sender: "emma_writer",
      subject: "Content Creation Proposal",
      preview: "Looking to help with your content needs. I can write engaging copy for your AI agents descriptions...",
      timestamp: "1 day ago",
      read: false,
      online: true,
      starred: true
    }
  ]);

  // Filter messages based on search and active filter
  const filteredMessages = messages.filter(message => {
    // Don't show archived messages
    if (archivedMessages.includes(message.id)) return false;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        message.sender.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.preview.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }
    
    // Apply status filter
    switch (activeFilter) {
      case "unread":
        return !message.read;
      case "starred":
        return message.starred;
      case "all":
      default:
        return true;
    }
  });

  const handleSendReply = () => {
    if (replyText.trim() && selectedMessage) {
      // Mark message as read when replying
      setMessages(prev => prev.map(msg => 
        msg.id === selectedMessage.id ? { ...msg, read: true } : msg
      ));
      
      // Here you would normally send the message to your backend
      console.log("Sending reply:", replyText);
      setReplyText("");
      
      // You could also add the sent message to a conversation history
    }
  };

  const toggleStarred = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const markAsUnread = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: false } : msg
    ));
  };

  const archiveMessage = (messageId: string) => {
    setArchivedMessages(prev => [...prev, messageId]);
    // If the archived message was selected, clear selection
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const archiveSelected = () => {
    if (selectedMessage) {
      archiveMessage(selectedMessage.id);
    }
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    // Mark as read when opened
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  const getUnreadCount = () => {
    return messages.filter(msg => !msg.read && !archivedMessages.includes(msg.id)).length;
  };

  const getStarredCount = () => {
    return messages.filter(msg => msg.starred && !archivedMessages.includes(msg.id)).length;
  };

  return (
    <div className="min-h-screen bg-black">
      <LoggedInHeader />
      
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Inbox</h1>
              <p className="text-gray-400">Manage your conversations</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={archiveSelected}
              disabled={!selectedMessage}
              variant="outline" 
              className="border-gray-700 text-white hover:bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </Button>
            <div className="relative" ref={filterDropdownRef}>
              <Button 
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                variant="outline" 
                className="border-gray-700 text-white hover:bg-gray-800 cursor-pointer"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              {filterDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setActiveFilter("all");
                        setFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded cursor-pointer ${
                        activeFilter === "all" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      All messages
                    </button>
                    <button
                      onClick={() => {
                        setActiveFilter("unread");
                        setFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded cursor-pointer ${
                        activeFilter === "unread" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      Unread only
                    </button>
                    <button
                      onClick={() => {
                        setActiveFilter("starred");
                        setFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded cursor-pointer ${
                        activeFilter === "starred" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      Starred only
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Left Sidebar - Message List */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700 h-full">
              <CardContent className="p-0">
                {/* Search */}
                <div className="p-4 border-b border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search conversations"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 cursor-text"
                    />
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex border-b border-gray-700">
                  <button 
                    onClick={() => setActiveFilter("all")}
                    className={`flex-1 px-4 py-3 text-sm font-medium cursor-pointer transition-colors ${
                      activeFilter === "all" 
                        ? "text-blue-400 border-b-2 border-blue-400" 
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    All messages
                  </button>
                  <button 
                    onClick={() => setActiveFilter("unread")}
                    className={`flex-1 px-4 py-3 text-sm font-medium cursor-pointer transition-colors relative ${
                      activeFilter === "unread" 
                        ? "text-blue-400 border-b-2 border-blue-400" 
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Unread
                    {getUnreadCount() > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                        {getUnreadCount()}
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveFilter("starred")}
                    className={`flex-1 px-4 py-3 text-sm font-medium cursor-pointer transition-colors ${
                      activeFilter === "starred" 
                        ? "text-blue-400 border-b-2 border-blue-400" 
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Starred
                    {getStarredCount() > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-yellow-500 text-white rounded-full">
                        {getStarredCount()}
                      </span>
                    )}
                  </button>
                </div>

                {/* Messages List */}
                <div className="overflow-y-auto h-full">
                  {filteredMessages.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                        <Search className="h-8 w-8 text-gray-500" />
                      </div>
                      <h3 className="text-white text-lg font-medium mb-2">No messages found</h3>
                      <p className="text-gray-400">
                        {searchQuery ? "Try a different search term" : 
                         activeFilter === "unread" ? "All messages are read" :
                         activeFilter === "starred" ? "No starred messages" : "No messages"}
                      </p>
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => handleMessageClick(message)}
                        className={`p-4 border-b border-gray-800 cursor-pointer transition-colors hover:bg-gray-800 ${
                          selectedMessage?.id === message.id ? "bg-gray-800" : ""
                        } ${!message.read ? "bg-blue-900/10" : ""}`}
                      >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            {message.senderAvatar && (
                              <AvatarImage src={message.senderAvatar} alt={message.sender} />
                            )}
                            <AvatarFallback className="bg-gray-700 text-white">
                              {message.sender.split("_")[0].slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {message.online && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm truncate ${!message.read ? "font-semibold text-white" : "font-medium text-gray-300"}`}>
                              {message.sender}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              {message.starred && <Star className="h-3 w-3 text-yellow-400 fill-current" />}
                              <span>{message.timestamp}</span>
                            </div>
                          </div>
                          <p className={`text-sm mb-1 truncate ${!message.read ? "font-medium text-white" : "text-gray-400"}`}>
                            {message.subject}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {message.preview}
                          </p>
                        </div>
                      </div>
                    </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Conversation View */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="bg-gray-900 border-gray-700 h-full flex flex-col">
                {/* Conversation Header */}
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        {selectedMessage.senderAvatar && (
                          <AvatarImage src={selectedMessage.senderAvatar} alt={selectedMessage.sender} />
                        )}
                        <AvatarFallback className="bg-gray-700 text-white">
                          {selectedMessage.sender.split("_")[0].slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {selectedMessage.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedMessage.sender}</h3>
                      <p className="text-xs text-gray-400">
                        {selectedMessage.online ? "Online" : "Last seen 2 hours ago"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleStarred(selectedMessage.id)}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <Star className={`h-4 w-4 ${selectedMessage.starred ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
                    </button>
                    <div className="relative">
                      <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </button>
                      {/* You could add a dropdown menu here for more actions */}
                    </div>
                  </div>
                </div>

                {/* Conversation Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {/* Sample conversation */}
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      {selectedMessage.senderAvatar && (
                        <AvatarImage src={selectedMessage.senderAvatar} alt={selectedMessage.sender} />
                      )}
                      <AvatarFallback className="bg-gray-700 text-white text-xs">
                        {selectedMessage.sender.split("_")[0].slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-800 rounded-lg p-3 max-w-md">
                        <p className="text-sm text-white">{selectedMessage.preview}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{selectedMessage.timestamp}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1 flex justify-end">
                      <div className="bg-blue-600 rounded-lg p-3 max-w-md">
                        <p className="text-sm text-white">Thanks for reaching out! I'd like to learn more about your experience and pricing.</p>
                      </div>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-600 text-white text-xs">
                        YOU
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* Reply Box */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your message..."
                        rows={3}
                        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 resize-none cursor-text"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                            <Paperclip className="h-4 w-4 text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                            <Smile className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                        <Button 
                          onClick={handleSendReply}
                          disabled={!replyText.trim()}
                          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-gray-900 border-gray-700 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">Pick up where you left off</h3>
                  <p className="text-gray-400">Select a conversation and chat away.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
