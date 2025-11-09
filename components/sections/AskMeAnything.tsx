'use client';

import { useState } from 'react';
import { MessageCircle, Mail, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnonymousQuestionForm } from '@/components/forms/AnonymousQuestionForm';
import { useChatStore } from '@/lib/stores/chatStore';

interface AskMeAnythingProps {
  locale: string;
}

export default function AskMeAnything({ locale }: AskMeAnythingProps) {
  const [activeMode, setActiveMode] = useState<'chat' | 'form'>('chat');
  const { toggleChat } = useChatStore();

  const translations = {
    it: {
      badge: 'Ask me anything',
      title: 'Hai domande? Chiedi pure',
      description: 'Puoi chattare con il mio gemello digitale AI o lasciare una domanda anonima. ',
      descriptionHighlight: 'Rispondo a tutte entro 48 ore.',
      chatMode: {
        title: 'Chatta con il mio gemello digitale',
        description: 'Alimentato da Claude AI, conosce tutto il mio background e può rispondere alle tue domande su design, sviluppo, product management, o qualsiasi altra cosa.',
        buttonText: 'Inizia chat',
      },
      formMode: {
        title: 'Chiedi in anonimo',
        description: 'Preferisci scrivere? Lascia la tua domanda qui. Rispondo pubblicamente sul blog o privatamente via email se la fornisci.',
      },
    },
    en: {
      badge: 'Ask me anything',
      title: 'Have questions? Ask away',
      description: 'You can chat with my AI digital twin or leave an anonymous question. ',
      descriptionHighlight: 'I respond to all within 48 hours.',
      chatMode: {
        title: 'Chat with my digital twin',
        description: 'Powered by Claude AI, knows all my background and can answer your questions about design, development, product management, or anything else.',
        buttonText: 'Start chat',
      },
      formMode: {
        title: 'Ask anonymously',
        description: 'Prefer to write? Leave your question here. I respond publicly on the blog or privately via email if you provide it.',
      },
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const handleChatClick = () => {
    toggleChat();
  };

  return (
    <section id="ask-me" className="bg-[#0A0A0A] py-16 md:py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-5 w-16 h-16 bg-[#0D7EFF] border-4 border-[#FFD60A] rounded-full opacity-30 animate-float" />
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-[#FF006E] border-4 border-[#FFD60A] rotate-45 opacity-30 animate-wiggle" />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#FFD60A]" />
            <span
              className="inline-block px-4 py-2 bg-transparent border-3 border-[#FFD60A] text-[#FFD60A] rounded shadow-brutal-sm"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {t.badge}
            </span>
          </div>
          <h2 className="text-h1 text-white mb-4 md:mb-6">
            {t.title}
          </h2>
          <p className="text-body text-white/80 max-w-[600px] mx-auto">
            {t.description}
            <strong className="text-[#FFD60A]">{t.descriptionHighlight}</strong>
          </p>
        </div>

        {/* Two Column Layout - Mobile First: Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* AI Chatbot Card */}
          <div className="bg-[#1A1A1A] border-4 border-[#0D7EFF] rounded-lg shadow-brutal p-6 md:p-8 relative overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D7EFF]/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0D7EFF] rounded-lg flex items-center justify-center mb-5 border-3 border-[#000]">
                <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>

              <h3 className="text-h3 text-white mb-3">
                {t.chatMode.title}
              </h3>

              <p className="text-body-small md:text-body text-white/90 mb-6">
                {t.chatMode.description}
              </p>

              <button
                onClick={handleChatClick}
                className="w-full px-6 py-3 md:py-4 bg-[#0D7EFF] text-white border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {t.chatMode.buttonText}
              </button>
            </div>
          </div>

          {/* Anonymous Form Card */}
          <div className="bg-[#1A1A1A] border-4 border-[#FF006E] rounded-lg shadow-brutal p-6 md:p-8 relative overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF006E]/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FF006E] rounded-lg flex items-center justify-center mb-5 border-3 border-[#000]">
                <Mail className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>

              <h3 className="text-h3 text-white mb-3">
                {t.formMode.title}
              </h3>

              <p className="text-body-small md:text-body text-white/90 mb-6">
                {t.formMode.description}
              </p>

              <AnonymousQuestionForm locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
