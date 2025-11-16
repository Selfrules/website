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
      badge: 'Le domande scomode',
      title: 'Hai una domanda? Falla. Soprattutto quella che ti frena.',
      description: 'Chat con un AI che ha letto anni di miei errori. Oppure chiedi anonimo. Rispondo sempre. In 48 ore, pubblicamente se utile ad altri. ',
      descriptionHighlight: 'Sì, anche "Quanto guadagni?" (te lo dico). O "Mai pensato di mollare?" (tre volte).',
      chatMode: {
        title: 'Parla con il mio AI clone',
        intro: 'Ho dato a Claude AI anni di progetti, fallimenti, e cambi di rotta. Chiedimi di:',
        buttonText: 'Inizia chat',
        ironicCloser: 'Come parlare con me, ma senza che controlli l\'orologio. E con meno parolacce.',
      },
      formMode: {
        title: 'Chiedi anonimo',
        description: 'Quella domanda che su LinkedIn suonerebbe "poco professionale"?\nQuella che pensi sia "stupida"? (Spoiler: non lo è).\n\nZero nome. Zero email. Zero giudizio.',
      },
    },
    en: {
      badge: 'The uncomfortable questions',
      title: 'Got a question? Ask it. Especially the one holding you back.',
      description: 'Chat with an AI trained on years of my mistakes. Or ask anonymously. I always reply. In 48 hours, publicly if it helps others. ',
      descriptionHighlight: 'Yes, even "How much do you make?" (I\'ll tell you). Or "Ever thought of quitting?" (three times).',
      chatMode: {
        title: 'Talk to my AI clone',
        intro: 'I gave Claude AI years of projects, failures, and career pivots. Ask me to:',
        buttonText: 'Start chat',
        ironicCloser: 'Like talking to me, but without me checking the clock. And with fewer curse words.',
      },
      formMode: {
        title: 'Ask anonymously',
        description: 'That question that would sound "unprofessional" on LinkedIn?\nThe one you think is "stupid"? (Spoiler: it\'s not).\n\nZero name. Zero email. Zero judgment.',
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
                {t.chatMode.intro}
              </p>

              <ul className="text-body-small md:text-body text-white/90 space-y-2 mb-4 ml-4">
                <li className="flex gap-2">
                  <span className="text-electric-blue">•</span>
                  <span>
                    {locale === 'it' ? (
                      <><strong>Spiegare</strong> come sono passato da designer a dev a PM (e perché non in quest&apos;ordine)</>
                    ) : (
                      <><strong>Explain</strong> how I went from designer to dev to PM (and why not in that order)</>
                    )}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-electric-blue">•</span>
                  <span>
                    {locale === 'it' ? (
                      <><strong>Raccontare</strong> l&apos;errore del 2015 che mi è costato 6 mesi di lavoro</>
                    ) : (
                      <><strong>Tell you</strong> about the 2015 mistake that cost me 6 months of work</>
                    )}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-electric-blue">•</span>
                  <span>
                    {locale === 'it' ? (
                      <><strong>Confrontare</strong> il mio percorso con il tuo (cosa funzionerebbe, cosa no)</>
                    ) : (
                      <><strong>Compare</strong> my path to yours (what would work, what wouldn&apos;t)</>
                    )}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-electric-blue">•</span>
                  <span>
                    {locale === 'it' ? (
                      <><strong>Rispondere</strong> alla domanda che non fai a voce alta</>
                    ) : (
                      <><strong>Answer</strong> the question you don&apos;t ask out loud</>
                    )}
                  </span>
                </li>
              </ul>

              <p className="text-body-small md:text-body text-white/80 italic mb-6">
                {t.chatMode.ironicCloser}
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

              <p className="text-body-small md:text-body text-white/90 mb-6 whitespace-pre-line">
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
