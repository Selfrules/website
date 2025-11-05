'use client';

import { useTranslations } from 'next-intl';

export default function WorkTogether() {
  const t = useTranslations('workTogether');

  return (
    <section id="contact" className="brutal-section bg-gradient-to-b from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10">
      <div className="brutal-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-display-2 font-heading font-black mb-4">
            {t('title')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary ml-3">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-xl text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Work Modes Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Modalità 1: Consulenze */}
          <div className="brutal-card p-6 hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
            <div className="inline-flex px-3 py-1 bg-accent/20 text-accent font-bold text-sm rounded-brutal border-2 border-accent mb-4">
              {t('modes.consulting.badge')}
            </div>
            <h3 className="text-2xl font-bold mb-3">{t('modes.consulting.title')}</h3>
            <p className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80 mb-4">
              {t('modes.consulting.description')}
            </p>
            <div className="space-y-2 mb-4">
              <p className="text-sm">{t('modes.consulting.expectations.dont')}</p>
              <p className="text-sm">{t('modes.consulting.expectations.do')}</p>
            </div>
            <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
              {t('modes.consulting.idealFor')}
            </p>
          </div>

          {/* Modalità 2: Brainstorming */}
          <div className="brutal-card p-6 hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
            <div className="inline-flex px-3 py-1 bg-secondary/20 text-secondary font-bold text-sm rounded-brutal border-2 border-secondary mb-4">
              {t('modes.brainstorming.badge')}
            </div>
            <h3 className="text-2xl font-bold mb-3">{t('modes.brainstorming.title')}</h3>
            <p className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80 mb-4">
              {t('modes.brainstorming.description')}
            </p>
            <p className="text-sm mb-4">
              {t('modes.brainstorming.whatWeDo')}
            </p>
            <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
              {t('modes.brainstorming.idealFor')}
            </p>
          </div>

          {/* Modalità 3: Mentorship */}
          <div className="brutal-card p-6 hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
            <div className="inline-flex px-3 py-1 bg-primary/20 text-primary font-bold text-sm rounded-brutal border-2 border-primary mb-4">
              {t('modes.mentorship.badge')}
            </div>
            <h3 className="text-2xl font-bold mb-3">{t('modes.mentorship.title')}</h3>
            <p className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80 mb-4">
              {t('modes.mentorship.description')}
            </p>
            <p className="text-sm mb-4">
              {t('modes.mentorship.format')}
            </p>
            <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
              {t('modes.mentorship.notForYou')}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-accent text-white font-bold border-brutal border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
            {t('cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
