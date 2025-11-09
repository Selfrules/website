'use client';

import { useTranslations } from 'next-intl';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { Check, Lightbulb, Users, GraduationCap } from 'lucide-react';

interface CollaborationCard {
  id: number;
  number: string;
  titleKey: string;
  descriptionKey: string;
  featuresKeys: string[];
  color: string;
  icon: any;
}

export default function WorkTogether() {
  const t = useTranslations('workTogether');
  const analytics = useAnalytics();

  const collaborations: CollaborationCard[] = [
    {
      id: 1,
      number: '01',
      titleKey: 'modes.consulting.title',
      descriptionKey: 'modes.consulting.description',
      featuresKeys: ['modes.consulting.features.1', 'modes.consulting.features.2', 'modes.consulting.features.3'],
      color: '#0D7EFF',
      icon: Lightbulb,
    },
    {
      id: 2,
      number: '02',
      titleKey: 'modes.brainstorming.title',
      descriptionKey: 'modes.brainstorming.description',
      featuresKeys: ['modes.brainstorming.features.1', 'modes.brainstorming.features.2', 'modes.brainstorming.features.3'],
      color: '#FF006E',
      icon: Users,
    },
    {
      id: 3,
      number: '03',
      titleKey: 'modes.mentorship.title',
      descriptionKey: 'modes.mentorship.description',
      featuresKeys: ['modes.mentorship.features.1', 'modes.mentorship.features.2', 'modes.mentorship.features.3'],
      color: '#7209B7',
      icon: GraduationCap,
    },
  ];

  return (
    <section id="work" className="bg-[#FFFCF2] py-16 md:py-24 border-b-4 border-[#000] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <NeoBadge color="yellow">{t('badge')}</NeoBadge>
          </div>
          <h2 className="text-h1 mb-4 md:mb-6 text-[#0A0A0A]">{t('title')}</h2>
          <p className="text-body text-[#2D2D2D] max-w-[600px] mx-auto">
            {t('subtitle.part1')} <strong className="text-[#FF006E]">{t('subtitle.part2')}</strong>
          </p>
        </div>

        {/* Grid - Mobile First: Stack, Desktop: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {collaborations.map((collab) => {
            const Icon = collab.icon;
            return (
              <article
                key={collab.id}
                className="bg-white border-4 border-[#000] rounded-lg shadow-brutal p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg"
              >
                {/* Icon & Number */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-lg border-4 border-[#000] flex items-center justify-center"
                    style={{ backgroundColor: collab.color }}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <span
                    className="text-6xl opacity-10"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 900,
                      color: collab.color,
                    }}
                  >
                    {collab.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-h3 mb-3 text-[#0A0A0A]">
                  {t(collab.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-body-small text-[#2D2D2D] mb-5">
                  {t(collab.descriptionKey)}
                </p>

                {/* Features List */}
                <ul className="space-y-2.5">
                  {collab.featuresKeys.map((featureKey, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: collab.color }} strokeWidth={3} />
                      <span className="text-body-small text-[#2D2D2D] leading-snug">
                        {t(featureKey)}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Call to Action Banner */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block bg-gradient-to-r from-[#0D7EFF] via-[#FF006E] to-[#7209B7] border-4 border-[#000] rounded-lg shadow-brutal p-6 md:p-8 max-w-[700px] -rotate-1">
            <p className="text-body md:text-body-large text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              {t('cta.title')}
            </p>
            <a
              href="#ask-me"
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-[#FFD60A] text-[#0A0A0A] border-4 border-[#000] rounded shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' }}
            >
              {t('cta.button')}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
