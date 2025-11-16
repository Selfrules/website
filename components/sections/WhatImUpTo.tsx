'use client';

import { Briefcase, BookOpen, Music, TrendingUp } from 'lucide-react';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { ActivityCard } from '@/components/ui/ActivityCard';
import { SpotifyWidget, RecentPodcasts } from '@/components/integrations';
import { useTranslations } from 'next-intl';

interface WhatImUpToProps {
  locale: string;
}

export default function WhatImUpTo({ locale }: WhatImUpToProps) {
  const t = useTranslations('whatImUpTo');

  return (
    <section id="now" className="bg-white py-16 md:py-24 border-b-4 border-black relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-glow-mixed rounded-full blur-3xl" />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <NeoBadge color="blue">{t('badge')}</NeoBadge>
          </div>
          <h2 className="text-h1 mb-4 md:mb-6 text-brutalist-text-primary">{t('title')}</h2>
          <p className="text-body text-brutalist-text-secondary max-w-[600px] mx-auto">
            {t('description')}<strong className="text-electric-blue">{t('descriptionHighlight')}</strong>
          </p>
        </div>

        {/* Grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Current Work */}
          <ActivityCard
            title={t('currentWork.title')}
            icon={Briefcase}
            color="blue"
            metric={{
              label: (
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-electric-blue">{t('currentWork.metric.value')}</span>
                    <span className="text-sm text-brutalist-text-primary">{t('currentWork.metric.label')}</span>
                  </div>
                  <span className="text-xs text-brutalist-text-secondary mt-1">
                    {t('currentWork.metric.context')}
                  </span>
                </div>
              ),
              icon: TrendingUp
            }}
          >
            <div className="space-y-3">
              <p className="text-body-small text-brutalist-text-secondary leading-relaxed">
                <strong className="text-electric-blue">{t('currentWork.role')}</strong> @ <strong className="text-electric-blue">{t('currentWork.company')}</strong>
              </p>

              <p className="text-body-small text-brutalist-text-secondary leading-relaxed">
                {t('currentWork.intro')}
              </p>

              <p className="text-body-small text-brutalist-text-secondary leading-relaxed">
                {t('currentWork.secret')}
              </p>

              <div className="bg-white/50 border-l-4 border-electric-blue p-3 rounded">
                <p className="text-xs text-brutalist-text-secondary mb-2 font-heading font-semibold">
                  {t('currentWork.exampleLabel')}
                </p>
                <ul className="text-body-small text-brutalist-text-secondary space-y-1">
                  {t.raw('currentWork.examples').map((example: string, index: number) => (
                    <li key={index}>• {example}</li>
                  ))}
                </ul>
              </div>

              <p className="text-body-small text-brutalist-text-secondary italic">
                {t('currentWork.conclusion')}
              </p>
            </div>
          </ActivityCard>

          {/* Card 2 - Learning in Public */}
          <ActivityCard
            title={t('learning.title')}
            icon={BookOpen}
            color="pink"
          >
            <div className="space-y-3">
              <p className="text-body-small text-brutalist-text-secondary leading-relaxed">
                <strong className="text-neon-pink">{t('learning.topic')}</strong>
              </p>

              {t.raw('learning.paragraphs').map((paragraph: string, index: number) => (
                <p key={index} className="text-body-small text-brutalist-text-secondary leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="bg-white/50 border-l-4 border-neon-pink p-3 rounded">
                <p className="text-xs text-brutalist-text-secondary mb-2 font-heading font-semibold">
                  {t('learning.exampleLabel')}
                </p>
                <ul className="text-body-small text-brutalist-text-secondary space-y-2">
                  {t.raw('learning.examples').map((example: string, index: number) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-neon-pink shrink-0">→</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/50 border-l-4 border-neon-pink p-3 rounded">
                <p className="text-xs text-brutalist-text-secondary mb-2 font-heading font-semibold">
                  {t('learning.resultLabel')}
                </p>
                <ul className="text-body-small text-brutalist-text-secondary space-y-1">
                  {t.raw('learning.results').map((result: string, index: number) => (
                    <li key={index}>• {result}</li>
                  ))}
                </ul>
              </div>

              <p className="text-body-small text-brutalist-text-secondary italic">
                {t('learning.conclusion')}
              </p>

              <div className="mt-4 pt-4 border-t border-brutalist-text-secondary/20">
                <p className="text-body-small text-brutalist-text-primary font-semibold">
                  {t('learning.why')}
                </p>
              </div>
            </div>
          </ActivityCard>

          {/* Card 3 - Spotify Widget */}
          <ActivityCard
            title={t('spotify.title')}
            icon={Music}
            color="yellow"
            className="md:col-span-2 lg:col-span-1"
          >
            <div className="space-y-6">
              <SpotifyWidget />
              <RecentPodcasts />
            </div>
          </ActivityCard>
        </div>
      </div>
    </section>
  );
}
