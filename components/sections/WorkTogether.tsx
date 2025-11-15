'use client';

import { useTranslations } from 'next-intl';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { Button } from '@/components/ui/Button';
import { CollaborationCard as CollaborationCardUI } from '@/components/ui/CollaborationCard';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { Lightbulb, Users, GraduationCap } from 'lucide-react';
import { GoogleCalendarPopup, useGoogleCalendar } from '@/components/ui/GoogleCalendarPopup';

interface CollaborationItem {
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
  const { isOpen, openCalendar, closeCalendar } = useGoogleCalendar();

  const collaborations: CollaborationItem[] = [
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
    <section id="work" className="bg-cream py-16 md:py-24 border-b-brutal-thick border-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-dot-pattern" style={{ backgroundSize: '30px 30px' }} />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <NeoBadge color="yellow">{t('badge')}</NeoBadge>
          </div>
          <h2 className="text-h1 mb-4 md:mb-6 text-brutalist-text-primary">{t('title')} <span className="text-neon-pink">{t('titleHighlight')}</span></h2>
          <p className="text-body text-brutalist-text-secondary max-w-[700px] mx-auto">
            {t('subtitle.part1')}<br/>
            <strong className="text-neon-pink">{t('subtitle.part2')}</strong>
          </p>
        </div>

        {/* Grid - Mobile First: Stack, Desktop: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {collaborations.map((collab) => (
            <CollaborationCardUI
              key={collab.id}
              number={collab.number}
              title={t(collab.titleKey)}
              description={t(collab.descriptionKey)}
              features={collab.featuresKeys.map(key => t(key))}
              icon={collab.icon}
              color={
                collab.color === '#0D7EFF' ? 'blue' :
                collab.color === '#FF006E' ? 'pink' : 'purple'
              }
            />
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="text-center">
          <div className="inline-block bg-gradient-brand border-brutal border-black rounded-brutal shadow-brutal p-6 md:p-8 max-w-[700px] -rotate-1">
            <p className="text-h3 md:text-h2 text-white mb-3 font-heading font-bold">
              {t('cta.title')}
            </p>
            <p className="text-body-small md:text-body text-white/90 mb-5 font-heading">
              {t('cta.description')}
            </p>
            <Button variant="accent" size="lg" onClick={openCalendar} className="uppercase">
              {t('cta.button')}
            </Button>
          </div>
        </div>

      </div>

      {/* Google Calendar Popup */}
      <GoogleCalendarPopup isOpen={isOpen} onClose={closeCalendar} />
    </section>
  );
}
