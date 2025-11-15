'use client';

import { useState } from 'react';
import { MessageCircle, Mail, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { NeoBadge } from '@/components/ui/NeoBadge';
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
      badge: 'Chiedimi qualsiasi cosa',
      title: 'Hai una domanda? Chiedi. Anche quella scomoda.',
      description: 'Chat con il mio AI clone oppure domanda anonima. Rispondo in 48 ore. Tutte. ',
      descriptionHighlight: 'Sì, anche "Quanto guadagni?" o "Hai mai pensato di mollare tutto?"',
      chatMode: {
        title: 'Parla con il mio AI clone',
        description: 'Alimentato da Claude AI, conosce tutto il mio background e può rispondere alle tue domande su: Design, sviluppo, product management • Come sono passato da un ruolo all\'altro • Errori che ho fatto (sono tanti) e cosa ho imparato • Consigli per il tuo percorso. È come parlare con me, ma disponibile 24/7 e con pazienza infinita per le domande ripetitive.',
        buttonText: 'Inizia chat',
      },
      formMode: {
        title: 'Chiedi anonimo',
        description: 'Preferisci scrivere? Lascia la tua domanda qui. Rispondo pubblicamente sul blog (così aiuta anche altri). Niente nome richiesto. Niente giudizio. Solo domande reali e risposte oneste.',
      },
    },
    en: {
      badge: 'Ask me anything',
      title: 'Got a question? Ask. Even the uncomfortable one.',
      description: 'Chat with my AI clone or ask anonymously. I reply in 48 hours. All of them. ',
      descriptionHighlight: 'Yes, even "How much do you make?" or "Ever thought of quitting?"',
      chatMode: {
        title: 'Talk to my AI clone',
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
    <section id="ask-me" className="bg-dark py-16 md:py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-5 w-16 h-16 bg-electric-blue border-brutal border-cyber-yellow rounded-full opacity-30 animate-float" />
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-neon-pink border-brutal border-cyber-yellow rotate-45 opacity-30 animate-wiggle" />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-cyber-yellow" />
            <NeoBadge color="yellow">{t.badge}</NeoBadge>
          </div>
          <h2 className="text-h1 text-white mb-4 md:mb-6">
            {t.title}
          </h2>
          <p className="text-body text-white/80 max-w-[600px] mx-auto">
            {t.description}
            <strong className="text-cyber-yellow">{t.descriptionHighlight}</strong>
          </p>
        </div>

        {/* Two Column Layout - Mobile First: Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* AI Chatbot Card */}
          <div className="bg-surface-dark border-brutal border-electric-blue rounded-lg shadow-brutal p-6 md:p-8 relative overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-glow-blue pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-electric-blue rounded-lg flex items-center justify-center mb-5 border-brutal-thin border-black">
                <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>

              <h3 className="text-h3 text-white mb-3">
                {t.chatMode.title}
              </h3>

              <p className="text-body-small md:text-body text-white/90 mb-3">
                Alimentato da Claude AI, conosce tutto il mio background e può rispondere alle tue domande su:
              </p>

              <ul className="text-body-small md:text-body text-white/90 space-y-2 mb-4 ml-4">
                <li className="flex gap-2">
                  <span className="text-electric-blue">•</span>
                  <span>Design, sviluppo, product management</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-electric-blue">•</span>
                  <span>Come sono passato da un ruolo all&apos;altro</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-electric-blue">•</span>
                  <span>Errori che ho fatto (sono tanti) e cosa ho imparato</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-electric-blue">•</span>
                  <span>Consigli per il tuo percorso</span>
                </li>
              </ul>

              <p className="text-body-small md:text-body text-white/80 italic mb-6">
                È come parlare con me, ma disponibile 24/7 e con pazienza infinita per le domande ripetitive.
              </p>

              <Button variant="primary" size="lg" onClick={handleChatClick} className="w-full">
                {t.chatMode.buttonText}
              </Button>
            </div>
          </div>

          {/* Anonymous Form Card */}
          <div className="bg-surface-dark border-brutal border-neon-pink rounded-lg shadow-brutal p-6 md:p-8 relative overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-glow-pink pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-neon-pink rounded-lg flex items-center justify-center mb-5 border-brutal-thin border-black">
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
