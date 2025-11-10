'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-[#FFFCF2] border-b-4 border-[#000] overflow-hidden">
      {/* Floating Geometric Shapes - Hidden on mobile for better readability */}
      <div className="hidden md:block absolute top-[10%] right-[5%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] bg-[#0D7EFF] border-4 border-[#000] rounded-full opacity-80 animate-float" />
      <div className="hidden md:block absolute top-[30%] left-[3%] w-[60px] h-[60px] md:w-[90px] md:h-[90px] bg-[#FF006E] border-4 border-[#000] rotate-45 opacity-80 animate-wiggle" />
      <div
        className="hidden md:block absolute bottom-[15%] right-[10%] w-[70px] h-[70px] md:w-[100px] md:h-[100px] bg-[#FFD60A] border-4 border-[#000] opacity-80 animate-float"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="hidden md:block absolute bottom-[30%] left-[8%] w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-[#7209B7] border-4 border-[#000] rounded-full opacity-70 animate-wiggle"
        style={{ animationDelay: '0.5s' }}
      />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-10">
          {/* Badge with Icon */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-[#FF006E]" />
            <NeoBadge color="pink">
              PM • Designer • Dev
            </NeoBadge>
          </motion.div>

          {/* Main Headline - More Dynamic */}
          <motion.h1
            className="text-hero max-w-[900px] text-[#0A0A0A] relative px-4 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="inline-block relative">
              {t('headline1')}
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#FFD60A] -rotate-1 -z-10" />
            </span>{' '}
            {t('headline2')}
            <br />
            {t('headline3')}
            <br />
            <span className="inline-block relative mt-2">
              {t('headline4')}
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#0D7EFF] rotate-1 -z-10" />
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
            <p className="text-body-large text-[#2D2D2D] leading-relaxed">
              {t('subtitle')}{' '}
              <strong className="text-[#FF006E]">
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
            <button
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0D7EFF] text-white border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {t('cta')} <ArrowRight className="w-5 h-5" />
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0A0A0A] border-3 border-[#000] rounded shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg active:translate-y-0 active:shadow-brutal-sm"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              {t('explore')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}