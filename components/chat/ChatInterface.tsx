'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send } from 'lucide-react';

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
 * ChatInterface - Main chat UI matching Figma prototype exactly
 */
export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Ciao! 👋 Sono l'assistente virtuale di Mattia. Come posso aiutarti?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize session ID
  useEffect(() => {
    const storedSessionId = sessionStorage.getItem('chatSessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
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

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call streaming API
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: userMessage.content,
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    // {/* Chat Window */}
    <div className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-[400px] h-[500px] bg-white border-brutal border-black rounded-brutal shadow-brutal-lg z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-electric-blue to-deep-purple border-b-brutal border-black p-4 rounded-t-brutal flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-cyber-yellow border-brutal-thin border-black rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-brutalist-text-primary" />
          </div>
          <div>
            <h3 className="text-white font-heading font-bold text-base">
              Chat con Mattia
            </h3>
            <p className="text-white/80 text-xs font-body">
              Rispondo subito
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-white border-brutal-thin border-black rounded-brutal flex items-center justify-center hover:bg-neon-pink hover:text-white transition-colors"
        >
          <X className="w-4 h-4 text-brutalist-text-primary" strokeWidth={3} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream">
        {messages.map((message, index) => (
          <div
            key={`${message.timestamp.getTime()}-${message.role}-${index}`}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 border-brutal-thin border-black rounded-brutal shadow-brutal-sm font-body text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'bg-electric-blue text-white'
                  : 'bg-white text-brutalist-text-primary'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t-brutal border-black p-3 bg-white rounded-b-brutal">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Scrivi un messaggio..."
            className="flex-1 px-3 py-2 border-brutal-thin border-black rounded-brutal focus:outline-none focus:ring-2 focus:ring-electric-blue text-brutalist-text-primary font-body text-sm"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="w-10 h-10 bg-electric-blue border-brutal-thin border-black rounded-brutal shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
