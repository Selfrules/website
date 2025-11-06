'use client';

import { useState } from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnonymousQuestionForm } from '@/components/forms/AnonymousQuestionForm';
import { useChatStore } from '@/lib/stores/chatStore';
import { cn } from '@/lib/utils';

interface AskMeAnythingProps {
  locale: string;
}

export default function AskMeAnything({ locale }: AskMeAnythingProps) {
  const [activeMode, setActiveMode] = useState<'chat' | 'form'>('chat');
  const { toggleChat } = useChatStore();

  const translations = {
    it: {
      subtitle: 'Ask Me Anything',
      title: 'Hai una domanda?',
      description: 'Scegli come preferisci interagire: chat in tempo reale o domanda anonima.',
      chatMode: {
        title: 'Chatta con me',
        description: 'Conversazione in tempo reale con AI. Risposte immediate, interazione diretta.',
        buttonText: 'Apri chat',
        badge: 'In tempo reale',
      },
      formMode: {
        title: 'Domanda anonima',
        description: 'Troppo timido per chattare? Inviami una domanda e ti risponderò sul blog.',
        badge: 'Completamente anonimo',
      },
    },
    en: {
      subtitle: 'Ask Me Anything',
      title: 'Have a question?',
      description: 'Choose how you prefer to interact: real-time chat or anonymous question.',
      chatMode: {
        title: 'Chat with me',
        description: 'Real-time conversation with AI. Immediate responses, direct interaction.',
        buttonText: 'Open chat',
        badge: 'Real-time',
      },
      formMode: {
        title: 'Anonymous question',
        description: 'Too shy to chat? Send me a question and I\'ll answer it on the blog.',
        badge: 'Completely anonymous',
      },
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const handleChatClick = () => {
    toggleChat();
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-purple-primary/5 via-primary/5 to-accent/5 dark:from-purple-primary/10 dark:via-primary/10 dark:to-accent/10">
      <div className="brutal-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 dark:bg-accent/20
                       border-4 border-accent rounded-brutal text-accent font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{t.subtitle}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-display-2 font-heading font-black mb-4 text-brutalist-text-light dark:text-brutalist-text-dark">
            {t.title}
          </h2>
          <p className="text-xl text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white dark:bg-brutalist-bg-dark border-4 border-black dark:border-white
                         rounded-brutal shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#FFFFFF] p-1">
            <button
              onClick={() => setActiveMode('chat')}
              className={cn(
                'px-6 py-3 rounded-lg font-bold transition-all',
                'flex items-center gap-2',
                activeMode === 'chat'
                  ? 'bg-purple-primary text-white'
                  : 'text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 hover:text-brutalist-text-light dark:hover:text-brutalist-text-dark'
              )}
            >
              <MessageCircle className="w-5 h-5" />
              Chat
            </button>
            <button
              onClick={() => setActiveMode('form')}
              className={cn(
                'px-6 py-3 rounded-lg font-bold transition-all',
                'flex items-center gap-2',
                activeMode === 'form'
                  ? 'bg-purple-primary text-white'
                  : 'text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 hover:text-brutalist-text-light dark:hover:text-brutalist-text-dark'
              )}
            >
              <Mail className="w-5 h-5" />
              Form
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-3xl mx-auto">
          {activeMode === 'chat' ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white dark:bg-brutalist-bg-dark border-4 border-black dark:border-white
                           rounded-brutal shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#FFFFFF] p-8 lg:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-purple-primary border-3 border-black rounded-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="inline-flex px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400
                                  font-bold text-xs rounded-brutal border-2 border-green-500 mb-2">
                      {t.chatMode.badge}
                    </div>
                    <h3 className="text-2xl font-heading font-black text-brutalist-text-light dark:text-brutalist-text-dark mb-2">
                      {t.chatMode.title}
                    </h3>
                    <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                      {t.chatMode.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 text-brutalist-text-light/80 dark:text-brutalist-text-dark/80">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-primary font-bold mt-1">✓</span>
                    <span>Risposte immediate basate su AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-primary font-bold mt-1">✓</span>
                    <span>Conversazione interattiva e contestuale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-primary font-bold mt-1">✓</span>
                    <span>Accesso a informazioni su progetti, background e competenze</span>
                  </li>
                </ul>

                <button
                  onClick={handleChatClick}
                  className={cn(
                    'w-full px-6 py-4 rounded-lg',
                    'bg-purple-primary text-white font-bold text-lg',
                    'border-4 border-black dark:border-white',
                    'shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#FFFFFF]',
                    'transition-all',
                    'hover:shadow-[4px_4px_0px_#000000] dark:hover:shadow-[4px_4px_0px_#FFFFFF]',
                    'hover:translate-x-[4px] hover:translate-y-[4px]',
                    'flex items-center justify-center gap-2'
                  )}
                >
                  <MessageCircle className="w-6 h-6" />
                  {t.chatMode.buttonText}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <div className="inline-flex px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400
                              font-bold text-xs rounded-brutal border-2 border-blue-500 mb-2">
                  {t.formMode.badge}
                </div>
                <h3 className="text-2xl font-heading font-black text-brutalist-text-light dark:text-brutalist-text-dark mb-2">
                  {t.formMode.title}
                </h3>
                <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                  {t.formMode.description}
                </p>
              </div>

              <AnonymousQuestionForm locale={locale} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
