import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Ciao! 👋 Sono l'assistente virtuale di Mattia. Come posso aiutarti?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('contatt') || input.includes('email') || input.includes('chiamat')) {
      return "Puoi prenotare una chiamata con Mattia tramite la sezione 'Ask Me Anything' oppure scrivergli direttamente a mattia@example.com 📧";
    }
    
    if (input.includes('consulenz') || input.includes('collabor') || input.includes('lavor')) {
      return "Mattia offre consulenze strategiche, brainstorming sessions e mentorship per PM. Vuoi saperne di più su una di queste opzioni? 💼";
    }
    
    if (input.includes('esperienz') || input.includes('percors') || input.includes('cv')) {
      return "Mattia ha un percorso unico: da designer a developer fino a Product Manager. Ha lavorato dal 2012 ad oggi in vari ruoli. Vuoi esplorare la timeline completa? 🚀";
    }
    
    if (input.includes('blog') || input.includes('articol') || input.includes('legg')) {
      return "Nel blog trovi articoli su Product Management, Design Systems e molto altro. Dai un'occhiata alla sezione Blog! 📚";
    }

    if (input.includes('ciao') || input.includes('hello') || input.includes('hi')) {
      return "Ciao! Come posso esserti utile oggi? Posso aiutarti con info su consulenze, il percorso di Mattia o come contattarlo! 😊";
    }
    
    return "Interessante domanda! Per informazioni dettagliate, ti consiglio di esplorare il sito o prenotare una chiamata con Mattia. Cosa ti interessa di più? 🤔";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-[400px] h-[500px] bg-white border-4 border-[#000] rounded-lg shadow-brutal-lg z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0D7EFF] to-[#7209B7] border-b-4 border-[#000] p-4 rounded-t flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FFD60A] border-3 border-[#000] rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#0A0A0A]" />
              </div>
              <div>
                <h3 
                  className="text-white"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                  }}
                >
                  Chat con Mattia
                </h3>
                <p 
                  className="text-white/80 text-xs"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Rispondo subito
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-white border-2 border-[#000] rounded flex items-center justify-center hover:bg-[#FF006E] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FFFCF2]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 border-3 border-[#000] rounded-lg shadow-brutal-sm ${
                    message.sender === 'user'
                      ? 'bg-[#0D7EFF] text-white'
                      : 'bg-white text-[#0A0A0A]'
                  }`}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-4 border-[#000] p-3 bg-white rounded-b">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Scrivi un messaggio..."
                className="flex-1 px-3 py-2 border-3 border-[#000] rounded focus:outline-none focus:ring-2 focus:ring-[#0D7EFF]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                }}
              />
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 bg-[#0D7EFF] border-3 border-[#000] rounded shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4 text-white" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

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
