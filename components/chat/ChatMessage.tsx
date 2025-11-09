'use client';

import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

/**
 * ChatMessage - Individual message bubble
 *
 * Features:
 * - Different styles for user/assistant
 * - Markdown support for assistant responses
 * - Timestamp display
 * - Neobrutalist styling
 */
export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border-2 border-black ${
          isUser ? 'bg-secondary' : 'bg-primary'
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-black" />
        ) : (
          <Bot className="h-4 w-4 text-black" />
        )}
      </div>

      {/* Message content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div
          className={`rounded-lg border-2 border-black px-4 py-2 ${
            isUser
              ? 'bg-secondary text-black'
              : 'bg-white text-black shadow-[4px_4px_0px_#000000]'
          }`}
        >
          {isUser ? (
            <p className="text-sm">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-headings:font-heading prose-p:text-black prose-a:text-secondary prose-a:underline prose-strong:text-black prose-code:rounded prose-code:border prose-code:border-black prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-black">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <span className="mt-1 text-xs text-gray-500">
          {message.timestamp.toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
