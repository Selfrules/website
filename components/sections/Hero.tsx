'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Calendar, ArrowRight, MousePointer2 } from 'lucide-react';
import CTAButton from '@/components/ui/CTAButton';
import MagneticButton from '@/components/ui/MagneticButton';
import GeometricTextures from '@/components/patterns/GeometricTextures';
import GridPattern from '@/components/patterns/GridPattern';
import DecorativeAccents from '@/components/illustrations/DecorativeAccents';
import { ScrollAnimation } from '@/components/animations/ScrollAnimations';
import { MagneticHover } from '@/components/animations/HoverEffects';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function Hero() {
  const t = useTranslations('hero');
  const { scrollY } = useScroll();
  const analytics = useAnalytics();

  // Parallax transforms
  const textureY = useTransform(scrollY, [0, 500], [0, -50]);
  const patternOpacity = useTransform(scrollY, [0, 300], [0.08, 0]);
  const headlineY = useTransform(scrollY, [0, 300], [0, -30]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-brutalist-bg-dark">
      {/* Background Patterns */}
      <GridPattern
        variant="diagonal"
        className="absolute inset-0"
        opacity={0.05}
      />

      <motion.div
        className="absolute inset-0"
        style={{ opacity: patternOpacity }}
      >
        <GridPattern
          variant="cross"
          color="text-primary/10"
        />
      </motion.div>

      {/* Geometric Textures */}
      <motion.div style={{ y: textureY }}>
        <GeometricTextures
          variant="hero"
          animated={true}
          colors={{
            square: 'border-neon-cyan',
            circle: 'border-neon-pink',
            triangle: 'border-primary',
          }}
        />
      </motion.div>

      {/* Decorative Accents */}
      <DecorativeAccents
        preset="hero"
        animated={true}
        className="z-0"
      />

      <div className="brutal-container relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Content Side */}
          <div className="space-y-8">
            {/* Animated Badge */}
            <ScrollAnimation animation="fadeInDown" delay={0}>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20
                         border-4 border-primary rounded-brutal text-primary font-medium"
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">{t('badge')}</span>
              </div>
            </ScrollAnimation>

            {/* Main Headline */}
            <ScrollAnimation animation="fadeInUp" delay={0.1}>
              <motion.h1
                style={{ y: headlineY }}
                className="text-4xl md:text-5xl lg:text-display-2 font-heading font-black
                         text-brutalist-text-light dark:text-brutalist-text-dark leading-[1.1]"
              >
                <span className="block">
                  {t('headline1')}
                </span>
                <span className="block mt-2 text-transparent bg-clip-text
                               bg-gradient-to-r from-primary via-secondary to-accent">
                  {t('headline2')}
                </span>
                <span className="block mt-2">
                  {t('headline3')}
                  <br className="hidden lg:block" />
                  <span className="relative">
                    {t('headline4')}
                    <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10">
                      <motion.path
                        d="M0,5 Q50,0 100,5 T200,5"
                        stroke="#FFD93D"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </svg>
                  </span>{' '}
                  {t('headline5')}
                </span>
              </motion.h1>
            </ScrollAnimation>

            {/* Subtitle */}
            <ScrollAnimation animation="fadeInUp" delay={0.2}>
              <p className="text-lg md:text-xl lg:text-2xl text-brutalist-text-light/80
                         dark:text-brutalist-text-dark/80 leading-relaxed max-w-xl">
                {t('subtitle')}
              </p>
            </ScrollAnimation>

            {/* Supporting Text */}
            <ScrollAnimation animation="fadeInUp" delay={0.25}>
              <p className="text-base md:text-lg text-brutalist-text-light/70
                         dark:text-brutalist-text-dark/70 leading-relaxed max-w-xl">
                {t('supportText')}
              </p>
            </ScrollAnimation>

            {/* CTA Buttons */}
            <ScrollAnimation animation="fadeInUp" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton
                  icon={Calendar}
                  iconPosition="left"
                  variant="primary"
                  size="lg"
                  iconAnimation={false}
                  className="group"
                  onClick={() => analytics.trackCTAClick('book_call', 'hero_section')}
                >
                  {t('cta')}
                </CTAButton>

                <MagneticButton
                  variant="secondary"
                  strength={0.3}
                  onClick={() => analytics.trackCTAClick('explore_portfolio', 'hero_section')}
                >
                  {t('explore')}
                </MagneticButton>
              </div>
            </ScrollAnimation>

            {/* Stats */}
            <ScrollAnimation animation="fadeInUp" delay={0.4}>
              <div className="flex gap-8 pt-8">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">
                    78%
                  </div>
                  <div className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                    {t('stats.loadTimes')}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-secondary">
                    5M+
                  </div>
                  <div className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                    {t('stats.usersImpacted')}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-accent">
                    12
                  </div>
                  <div className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                    {t('stats.productsShipped')}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Visual Side */}
          <div className="relative lg:h-[600px]">
            <MagneticHover strength={0.2}>
              <div className="relative w-full h-full">
                {/* Main Visual Card */}
                <div className="absolute inset-0 lg:inset-auto lg:w-[400px] lg:h-[500px]
                             bg-gradient-to-br from-primary via-secondary to-accent
                             rounded-brutal border-brutal border-black shadow-brutal
                             transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-4 bg-white dark:bg-brutalist-surface-dark
                               rounded-brutal flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🚀</div>
                      <h3 className="text-2xl font-bold mb-2">
                        {t('card.shipFast')}
                      </h3>
                      <p className="text-sm opacity-80">
                        {t('card.shipDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Static Accent Cards */}
                <div className="absolute top-10 -right-10 w-32 h-32 bg-neon-cyan/20
                           border-4 border-neon-cyan rounded-brutal shadow-brutal hidden lg:block">
                  <div className="flex items-center justify-center h-full text-4xl">
                    ⚡
                  </div>
                </div>

                <div className="absolute bottom-10 -left-10 w-28 h-28 bg-neon-pink/20
                           border-4 border-neon-pink rounded-brutal shadow-brutal hidden lg:block">
                  <div className="flex items-center justify-center h-full text-3xl">
                    💡
                  </div>
                </div>
              </div>
            </MagneticHover>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <MousePointer2 className="w-6 h-6 text-primary" />
        </div>
      </div>
    </section>
  );
}