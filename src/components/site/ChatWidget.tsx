"use client";

import { useState } from "react";
import { X, MessageSquare } from "lucide-react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [conversationOpen, setConversationOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div>
      {/* Floating button */}
      <div className="fixed right-6 bottom-6 z-50 flex items-end">
        <div className="flex flex-col items-end gap-3">
          {open && (
            <div className="w-80 max-w-xs bg-black text-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-800 to-purple-800 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="font-medium">AI Market Support</div>
                </div>
                <button aria-label="close" onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/10">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {!conversationOpen ? (
                <div className="p-4">
                  <p className="text-sm text-gray-300 mb-3">Hi there — how can we help you today?</p>
                  <div className="space-y-2">
                    <button onClick={() => { setSelectedRole('seller'); setConversationOpen(true); }} className="w-full text-left px-3 py-2 rounded-full border border-gray-700 hover:bg-gray-900 text-white">I need help as a freelancer (seller)</button>
                    <button onClick={() => { setSelectedRole('buyer'); setConversationOpen(true); }} className="w-full text-left px-3 py-2 rounded-full border border-gray-700 hover:bg-gray-900 text-white">I need help as a client (buyer)</button>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="rounded-lg bg-gray-900 p-3 text-sm text-white mb-3">You selected: <strong>{selectedRole === 'seller' ? 'Freelancer (seller)' : 'Client (buyer)'}</strong></div>
                  <div className="h-40 overflow-y-auto text-sm text-gray-300 mb-3">This is a placeholder chat area. Implement your chat integration here to allow messaging without leaving the page.</div>
                  <div className="flex items-center gap-2">
                    <input placeholder="Type a message" className="flex-1 h-9 rounded-md border border-gray-700 bg-[#060606] px-3 text-sm text-white" />
                    <button className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full">Send</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Floating icon button */}
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Open chat"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg flex items-center justify-center text-white border-2 border-white/20 cursor-pointer"
          >
            {/* Triangle icon similar to site logo */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 3l9 16H3L12 3z" fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWidget;
