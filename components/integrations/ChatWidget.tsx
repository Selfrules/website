'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, RotateCcw } from 'lucide-react';
import { useChatStore } from '@/lib/stores/chatStore';
import { useChatStream } from '@/lib/hooks/useChat';
import { cn } from '@/lib/utils';

export function ChatWidget() {
  const { isOpen, toggleChat, closeChat } = useChatStore();

  return (
    <>
      <ChatButton onClick={toggleChat} isOpen={isOpen} />
      <AnimatePresence>{isOpen && <ChatPanel onClose={closeChat} />}</AnimatePresence>
    </>
  );
}

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'w-16 h-16 rounded-full',
        'bg-primary border-4 border-black',
        'shadow-brutal',
        'flex items-center justify-center',
        'transition-transform',
        'hover:scale-105 active:scale-95'
      )}
      whileHover={{ x: -4, y: -4 }}
      transition={{ type: 'spring', stiffness: 400 }}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-6 h-6 text-black" />
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MessageCircle className="w-6 h-6 text-black" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

interface ChatPanelProps {
  onClose: () => void;
}

function ChatPanel({ onClose }: ChatPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'fixed bottom-28 right-6 z-40',
        'w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)]',
        'bg-white border-4 border-black rounded-brutal-lg',
        'shadow-brutal',
        'flex flex-col overflow-hidden'
      )}
    >
      <ChatHeader onClose={onClose} />
      <MessageList />
      <ChatInput />
    </motion.div>
  );
}

interface ChatHeaderProps {
  onClose: () => void;
}

function ChatHeader({ onClose }: ChatHeaderProps) {
  const { clearSession } = useChatStore();

  const handleReset = () => {
    if (confirm('Clear conversation history?')) {
      clearSession();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b-4 border-black bg-primary">
      <div>
        <h3 className="font-bold text-lg">Chat with Mattia</h3>
        <p className="text-xs text-black/70">AI-powered assistant</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleReset}
          className="p-2 hover:bg-black/10 rounded-lg transition-colors"
          aria-label="Clear conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          className="p-2 hover:bg-black/10 rounded-lg transition-colors"
          aria-label="Close chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function MessageList() {
  const { currentSession, isStreaming } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages, isStreaming]);

  if (!currentSession || currentSession.messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div>
          <p className="text-lg font-bold mb-2">Start a conversation</p>
          <p className="text-sm text-black/60">
            Ask me anything about Mattia, his work, or projects
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {currentSession.messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isStreaming && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}

interface MessageBubbleProps {
  message: {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  };
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-lg border-3 border-black p-3',
          isUser
            ? 'bg-secondary text-white'
            : 'bg-gray-100 text-black'
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <p className="text-xs mt-1 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 border-3 border-black rounded-lg p-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-black rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatInput() {
  const [input, setInput] = useState('');
  const { mutate: sendMessage, isPending, isError, error } = useChatStream();
  const { currentSession } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isPending) return;

    sendMessage({
      message: input.trim(),
      sessionId: currentSession?.id,
    });

    setInput('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="border-t-4 border-black p-4 bg-gray-50">
      {isError && (
        <div className="mb-2 p-2 bg-red-100 border-2 border-red-500 rounded text-xs text-red-700">
          Failed to send message. Please try again.
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className={cn(
            'flex-1 px-3 py-2 rounded-lg',
            'border-3 border-black',
            'resize-none overflow-hidden',
            'focus:outline-none focus:ring-2 focus:ring-secondary',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          disabled={isPending}
          rows={1}
          maxLength={1000}
        />
        <button
          type="submit"
          disabled={!input.trim() || isPending}
          className={cn(
            'px-4 py-2 rounded-lg',
            'bg-secondary text-white',
            'border-3 border-black',
            'shadow-brutal-sm',
            'transition-all',
            'hover:shadow-brutal-active hover:translate-x-[2px] hover:translate-y-[2px]',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-brutal-sm disabled:hover:translate-x-0 disabled:hover:translate-y-0'
          )}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
      <p className="text-xs text-black/50 mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}
