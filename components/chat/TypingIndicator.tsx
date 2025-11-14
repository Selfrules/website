'use client';

import { Bot } from 'lucide-react';

/**
 * TypingIndicator - Loading animation for AI response
 *
 * Features:
 * - Animated dots
 * - Neobrutalist styling
 * - Matches assistant message style
 */
export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border-2 border-black bg-primary">
        <Bot className="h-4 w-4 text-black" />
      </div>

      {/* Typing animation */}
      <div className="flex items-center rounded-brutal-lg border-2 border-black bg-white px-4 py-3 shadow-brutal-sm">
        <div className="flex gap-1">
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-black"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-black"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-black"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}
