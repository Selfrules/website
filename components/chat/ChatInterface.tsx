'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FirestoreMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: { toDate: () => Date } | string;
}

interface ChatInterfaceProps {
  onClose: () => void;
}

/**
 * ChatInterface - Main chat UI
 *
 * Features:
 * - Neobrutalist card design
 * - Message history with auto-scroll
 * - Streaming responses
 * - Session persistence
 */
export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize session ID
  useEffect(() => {
    const storedSessionId = sessionStorage.getItem('chatSessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      // Load conversation history
      loadConversationHistory(storedSessionId);
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      sessionStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversationHistory = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chat?sessionId=${sessionId}&limit=50`);
      if (!response.ok) return;

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const conversation = data.data[0];
        const historicalMessages = conversation.messages.map((msg: FirestoreMessage): Message => ({
          role: msg.role,
          content: msg.content,
          timestamp: typeof msg.timestamp === 'object' && 'toDate' in msg.timestamp
            ? msg.timestamp.toDate()
            : new Date(msg.timestamp),
        }));
        setMessages(historicalMessages);
      }
    } catch (error) {
      console.error('Failed to load conversation history:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !sessionId) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call streaming API
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: content.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      // Add placeholder for assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantContent += parsed.content;
                  // Update assistant message
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      ...updated[updated.length - 1],
                      content: assistantContent,
                    };
                    return updated;
                  });
                }
              } catch (e) {
                // Ignore parsing errors for partial chunks
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Scusa, ho avuto un problema. Riprova tra un attimo!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[600px] w-[400px] flex-col rounded-brutal-lg border-4 border-black bg-white shadow-[12px_12px_0px_#000000]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D7EFF] to-[#7209B7] border-b-4 border-black p-4 rounded-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FFD60A] border-3 border-black rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="text-white" style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '16px' }}>
              Chat con Mattia
            </h3>
            <p className="text-white/80 text-xs">Rispondo subito</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg border-2 border-white/30 p-2 transition-all hover:bg-white/10 focus:outline-none"
          aria-label="Close chat"
        >
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <p className="text-lg font-semibold text-black">Ciao! 👋</p>
              <p className="mt-2 text-sm text-gray-600">
                Sono il digital twin di Mattia.<br />
                Chiedimi di design, prodotto o dev!
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t-4 border-black p-4">
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
