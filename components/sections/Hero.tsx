'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { GoogleCalendarPopup, useGoogleCalendar } from '@/components/ui/GoogleCalendarPopup';

export default function Hero() {
  const t = useTranslations('hero');
  const { isOpen, openCalendar, closeCalendar } = useGoogleCalendar();

  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-cream border-b-brutal-thick border-black overflow-hidden">
      {/* Floating Geometric Shapes - Hidden on mobile for better readability */}
      <div className="hidden md:block absolute top-[10%] right-[5%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] bg-electric-blue border-brutal border-black rounded-full opacity-80 animate-float" />
      <div className="hidden md:block absolute top-[30%] left-[3%] w-[60px] h-[60px] md:w-[90px] md:h-[90px] bg-neon-pink border-brutal border-black rotate-45 opacity-80 animate-wiggle" />
      <div className="hidden md:block absolute bottom-[15%] right-[10%] w-[70px] h-[70px] md:w-[100px] md:h-[100px] bg-cyber-yellow border-brutal border-black opacity-80 animate-float delay-1000" />
      <div className="hidden md:block absolute bottom-[30%] left-[8%] w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-deep-purple border-brutal border-black rounded-full opacity-70 animate-wiggle delay-500" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5 text-black bg-grid-pattern bg-grid-size" />

      <div className="container max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-10">
          {/* Badge with Icon */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-neon-pink" />
            <NeoBadge color="pink">
              PM • Designer • Dev
            </NeoBadge>
          </motion.div>

          {/* Main Headline - More Dynamic */}
          <motion.h1
            className="text-hero max-w-[900px] text-brutalist-text-primary relative px-4 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="inline-block relative">
              {t('headline1')}
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-cyber-yellow -rotate-1 -z-10" />
            </span>{' '}
            {t('headline2')}
            <br />
            {t('headline3')}
            <br />
            <span className="inline-block relative mt-2">
              {t('headline4')}
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-electric-blue rotate-1 -z-10" />
            </span>{' '}
            {t('headline5')}
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="max-w-[600px] space-y-4 px-4 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-body-large text-brutalist-text-secondary leading-relaxed">
              {t('subtitle')}{' '}
              <strong className="text-neon-pink">
                {t('subtitleHighlight')}
              </strong>
              {t('subtitleEnd')}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:justify-center mt-4 px-4 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button variant="primary" size="md" onClick={openCalendar}>
              {t('cta')} <ArrowRight className="w-5 h-5" />
            </Button>
            <a href="#journey" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="!bg-white w-full">
                {t('explore')}
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Google Calendar Popup */}
      <GoogleCalendarPopup isOpen={isOpen} onClose={closeCalendar} />
    </section>
  );
}