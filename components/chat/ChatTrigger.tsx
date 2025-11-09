'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatInterface from './ChatInterface';

/**
 * ChatTrigger - Floating button matching Figma prototype exactly
 */
export default function ChatTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      {isOpen && <ChatInterface onClose={() => setIsOpen(false)} />}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#FF006E] to-[#7209B7] border-4 border-[#000] rounded-full shadow-brutal-lg hover:-translate-y-1 hover:shadow-brutal transition-all z-40 flex items-center justify-center group"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={3} />
        ) : (
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" strokeWidth={2.5} />
        )}

        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFD60A] border-2 border-[#000] rounded-full animate-pulse" />
        )}
      </button>
    </>
  );
}
