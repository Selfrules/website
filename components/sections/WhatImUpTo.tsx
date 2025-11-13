'use client';

import { Briefcase, BookOpen, Music, TrendingUp } from 'lucide-react';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { SpotifyWidget } from '@/components/integrations/SpotifyWidget';

interface WhatImUpToProps {
  locale: string;
}

export default function WhatImUpTo({ locale }: WhatImUpToProps) {
  const translations = {
    it: {
      badge: 'What I\'m doing now',
      title: 'What I\'m up to',
      description: 'Una finestra sulla mia vita professionale in real-time. ',
      descriptionHighlight: 'Niente LinkedIn bullshit.',
      currentWork: {
        title: 'Lavoro attuale',
        company: 'QubicaAMF',
        description: 'Product Manager @ ',
        detail: 'Mi occupo di integrazioni di pagamento e visione di prodotto. Come? Ascoltando chi usa il sistema ogni giorno invece di fare meeting su meeting. La settimana scorsa: 6 ore di user interviews. 3 insight critici. 1 feature cancellata (perché risolveva il problema sbagliato). 2 quick wins implementate in 1 sprint. Questo è product management pragmatico.',
        metric: '+2 quick wins',
      },
      learning: {
        title: 'Learning in Public',
        thisWeek: 'Questa settimana: ',
        topic: 'come l\'AI sta cambiando il mio workflow.',
        detail: 'Non sostituisce il mio lavoro, lo amplifica. Il trucco? Sapere cosa delegare e cosa tenere. Claude scrive la prima bozza delle PRD. Io la raffino con context che solo un umano ha. Figma Make genera 20 varianti di mockup. Io scelgo quella che funziona per gli utenti. L\'AI è il mio junior designer/developer perfetto: veloce, instancabile, ma serve sempre una guida.',
      },
      spotify: {
        title: 'Now Playing',
      },
    },
    en: {
      badge: 'What I\'m doing',
      title: 'What I\'m up to',
      description: 'A window into my professional life ',
      descriptionHighlight: 'in real-time',
      currentWork: {
        title: 'Current work',
        company: 'QubicaAMF',
        description: 'Product Manager @ ',
        detail: 'Making payments 12% faster. How? Listening to people who use the system every day instead of having meetings about meetings.',
        metric: '-12% time',
      },
      learning: {
        title: 'Learning in Public',
        thisWeek: 'This week: ',
        topic: 'how AI is changing',
        detail: 'my workflow. It doesn\'t replace my work, it amplifies it. The trick? Knowing what to delegate and what to keep.',
      },
      spotify: {
        title: 'Now Playing',
      },
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <section id="now" className="bg-white py-16 md:py-24 border-b-4 border-[#000] relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0D7EFF]/10 to-[#FF006E]/10 rounded-full blur-3xl" />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <NeoBadge color="blue">{t.badge}</NeoBadge>
          </div>
          <h2 className="text-h1 mb-4 md:mb-6 text-[#0A0A0A]">{t.title}</h2>
          <p className="text-body text-[#2D2D2D] max-w-[600px] mx-auto">
            {t.description}<strong className="text-[#0D7EFF]">{t.descriptionHighlight}</strong>
          </p>
        </div>

        {/* Grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Current Work */}
          <div className="bg-[#FFFCF2] border-4 border-[#000] rounded-lg shadow-brutal p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D7EFF] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#0D7EFF] border-3 border-[#000] rounded-lg flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <Briefcase className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-h3 mb-3 text-[#0A0A0A]">
                {t.currentWork.title}
              </h3>
              <p className="text-body-small text-[#2D2D2D] leading-relaxed mb-3">
                {t.currentWork.description}<strong className="text-[#0D7EFF]">{t.currentWork.company}</strong>
              </p>
              <p className="text-body-small text-[#2D2D2D] leading-relaxed mb-3">
                Mi occupo di integrazioni di pagamento e visione di prodotto.
              </p>
              <p className="text-body-small text-[#2D2D2D] leading-relaxed mb-3">
                <strong className="text-[#0D7EFF]">Come?</strong> Ascoltando chi usa il sistema ogni giorno invece di fare meeting su meeting.
              </p>
              <div className="bg-white/50 border-l-4 border-[#0D7EFF] p-3 mb-3 rounded">
                <p className="text-xs text-[#2D2D2D] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
                  La settimana scorsa:
                </p>
                <ul className="text-body-small text-[#2D2D2D] space-y-1">
                  <li>• 6 ore di user interviews</li>
                  <li>• 3 insight critici</li>
                  <li>• 1 feature cancellata (risolveva il problema sbagliato)</li>
                  <li>• 2 quick wins implementate in 1 sprint</li>
                </ul>
              </div>
              <p className="text-body-small text-[#2D2D2D] italic">
                Questo è product management pragmatico.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#06FFA5]" />
                <span className="text-xs font-bold text-[#06FFA5]" style={{ fontFamily: 'Space Mono, monospace' }}>
                  {t.currentWork.metric}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 - Learning in Public */}
          <div className="bg-[#FFFCF2] border-4 border-[#000] rounded-lg shadow-brutal p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF006E] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#FF006E] border-3 border-[#000] rounded-lg flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-h3 mb-3 text-[#0A0A0A]">
                {t.learning.title}
              </h3>
              <p className="text-body-small text-[#2D2D2D] leading-relaxed mb-3">
                {t.learning.thisWeek}<strong className="text-[#FF006E]">{t.learning.topic}</strong>
              </p>
              <p className="text-body-small text-[#2D2D2D] leading-relaxed mb-3">
                Non sostituisce il mio lavoro, lo amplifica.
              </p>
              <p className="text-body-small text-[#2D2D2D] leading-relaxed mb-3">
                <strong className="text-[#FF006E]">Il trucco?</strong> Sapere cosa delegare e cosa tenere.
              </p>
              <div className="bg-white/50 border-l-4 border-[#FF006E] p-3 mb-3 rounded">
                <p className="text-xs text-[#2D2D2D] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
                  Esempi pratici:
                </p>
                <ul className="text-body-small text-[#2D2D2D] space-y-2">
                  <li className="flex gap-2">
                    <span className="text-[#FF006E]">→</span>
                    <span><strong>Claude</strong> scrive la prima bozza delle PRD. Io la raffino con context che solo un umano ha.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#FF006E]">→</span>
                    <span><strong>Figma Make</strong> genera 20 varianti di mockup. Io scelgo quella che funziona per gli utenti.</span>
                  </li>
                </ul>
              </div>
              <p className="text-body-small text-[#2D2D2D] italic">
                L&apos;AI è il mio junior designer/developer perfetto: veloce, instancabile, ma serve sempre una guida.
              </p>
            </div>
          </div>

          {/* Card 3 - Spotify Widget */}
          <div className="bg-[#FFFCF2] border-4 border-[#000] rounded-lg shadow-brutal p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-[#FFD60A] border-3 border-[#000] rounded-lg flex items-center justify-center mb-4">
              <Music className="w-6 h-6 text-[#0A0A0A]" strokeWidth={2.5} />
            </div>
            <h3 className="text-h3 mb-4 text-[#0A0A0A]">
              {t.spotify.title}
            </h3>

            {/* Spotify Widget */}
            <SpotifyWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
