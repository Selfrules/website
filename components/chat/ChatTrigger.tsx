'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatInterface from './ChatInterface';

/**
 * ChatTrigger - Floating button to open/close chat
 *
 * Features:
 * - Fixed position bottom-right
 * - Neobrutalist design with thick border & shadow
 * - Animated on hover
 * - Opens ChatInterface modal
 */
export default function ChatTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-8 z-50 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full border-4 border-black bg-gradient-to-br from-[#FF006E] to-[#7209B7] shadow-brutal-lg hover:-translate-y-1 hover:shadow-brutal transition-all focus:outline-none group"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="h-6 w-6 md:h-7 md:w-7 text-white" strokeWidth={3} aria-hidden="true" style={{ pointerEvents: 'none' }} />
        ) : (
          <MessageCircle className="h-6 w-6 md:h-7 md:w-7 text-white group-hover:scale-110 transition-transform" strokeWidth={2.5} aria-hidden="true" style={{ pointerEvents: 'none' }} />
        )}

        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFD60A] border-2 border-black rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat Interface Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40">
          <ChatInterface onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
