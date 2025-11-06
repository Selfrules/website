import { Briefcase, BookOpen, Music } from 'lucide-react';
import { SpotifyWidget } from '@/components/integrations/SpotifyWidget';

interface WhatImUpToProps {
  locale: string;
}

export default function WhatImUpTo({ locale }: WhatImUpToProps) {
  const translations = {
    it: {
      subtitle: 'What I\'m Up To',
      title: 'Cosa sto facendo ora',
      description: 'Una finestra sul mio presente. Lavoro, apprendimento e musica.',
      currentWork: {
        title: 'Lavoro attuale',
        company: 'Product Manager @ QubicaAMF',
        achievement: 'Sto rendendo i pagamenti 12% più veloci',
        detail: 'Ottimizzando il checkout flow e riducendo i click da 7 a 3. A volte la risposta non è complessa.',
      },
      learning: {
        title: 'Learning in public',
        thisWeek: 'Questa settimana',
        topic: 'Come l\'AI sta cambiando il mio workflow',
        description: 'Sto esplorando come Claude e GPT-4 possano accelerare il product discovery. Non sostituiscono il pensiero critico, lo amplificano.',
      },
      soundtrack: {
        title: 'Soundtrack del momento',
        description: 'La musica che accompagna il mio lavoro in questo momento',
      },
    },
    en: {
      subtitle: 'What I\'m Up To',
      title: 'What I\'m doing now',
      description: 'A window into my present. Work, learning, and music.',
      currentWork: {
        title: 'Current work',
        company: 'Product Manager @ QubicaAMF',
        achievement: 'Making payments 12% faster',
        detail: 'Optimizing checkout flow and reducing clicks from 7 to 3. Sometimes the answer isn\'t complex.',
      },
      learning: {
        title: 'Learning in public',
        thisWeek: 'This week',
        topic: 'How AI is changing my workflow',
        description: 'Exploring how Claude and GPT-4 can accelerate product discovery. They don\'t replace critical thinking, they amplify it.',
      },
      soundtrack: {
        title: 'Current soundtrack',
        description: 'The music accompanying my work right now',
      },
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-brutalist-bg-dark">
      <div className="brutal-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-primary/10 dark:bg-purple-primary/20
                       border-4 border-purple-primary rounded-brutal text-purple-primary font-medium mb-4">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm">{t.subtitle}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-display-2 font-heading font-black mb-4 text-brutalist-text-light dark:text-brutalist-text-dark">
            {t.title}
          </h2>
          <p className="text-xl text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Work */}
          <div className="bg-primary/5 dark:bg-primary/10 border-4 border-black dark:border-white
                         rounded-brutal shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#FFFFFF] p-6 lg:p-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-primary border-3 border-black rounded-lg">
                <Briefcase className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-black text-brutalist-text-light dark:text-brutalist-text-dark mb-1">
                  {t.currentWork.title}
                </h3>
                <p className="text-sm font-medium text-purple-primary">
                  {t.currentWork.company}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-lg font-bold text-brutalist-text-light dark:text-brutalist-text-dark">
                {t.currentWork.achievement}
              </p>
              <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 leading-relaxed">
                {t.currentWork.detail}
              </p>
            </div>
          </div>

          {/* Learning in Public */}
          <div className="bg-purple-primary/5 dark:bg-purple-primary/10 border-4 border-black dark:border-white
                         rounded-brutal shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#FFFFFF] p-6 lg:p-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-purple-primary border-3 border-black rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-black text-brutalist-text-light dark:text-brutalist-text-dark mb-1">
                  {t.learning.title}
                </h3>
                <p className="text-sm font-medium text-purple-primary">
                  {t.learning.thisWeek}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-lg font-bold text-brutalist-text-light dark:text-brutalist-text-dark">
                {t.learning.topic}
              </p>
              <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 leading-relaxed">
                {t.learning.description}
              </p>
            </div>
          </div>
        </div>

        {/* Spotify Widget - Full Width Below */}
        <div className="mt-8">
          <div className="bg-green-50 dark:bg-green-900/20 border-4 border-black dark:border-white
                         rounded-brutal shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#FFFFFF] p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Header */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-green-500 border-3 border-black rounded-lg">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-black text-brutalist-text-light dark:text-brutalist-text-dark mb-1">
                      {t.soundtrack.title}
                    </h3>
                    <p className="text-sm text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                      {t.soundtrack.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Spotify Widget */}
              <div className="flex justify-center lg:justify-end">
                <SpotifyWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
