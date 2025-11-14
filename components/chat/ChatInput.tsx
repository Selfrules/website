'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

/**
 * ChatInput - Text input for sending messages
 *
 * Features:
 * - Multi-line support (Shift+Enter)
 * - Send on Enter
 * - Disabled state during loading
 * - Neobrutalist button styling
 */
export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Scrivi il tuo messaggio..."
        rows={2}
        className="flex-1 resize-none rounded-brutal border-brutal border-black px-3 py-2 text-sm bg-white shadow-brutal-sm placeholder:text-gray-500 placeholder:opacity-70 focus:outline-none focus:border-primary focus:shadow-brutal-colored-blue disabled:bg-gray-100 disabled:text-gray-500 disabled:opacity-60 transition-all"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="flex h-full items-center justify-center rounded-brutal border-brutal border-black bg-primary px-4 shadow-brutal-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-brutal-sm focus:outline-none focus:ring-4 focus:ring-primary/30"
        aria-label="Send message"
      >
        <Send className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}
