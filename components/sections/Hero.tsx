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

export default function Hero() {
  const t = useTranslations('hero');
  const { scrollY } = useScroll();

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
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20
                         border-2 border-primary rounded-brutal text-primary font-medium"
                animate={{
                  borderRadius: ['8px', '12px', '8px'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm">Product Manager & Developer</span>
              </motion.div>
            </ScrollAnimation>

            {/* Main Headline */}
            <ScrollAnimation animation="fadeInUp" delay={0.1}>
              <motion.h1
                style={{ y: headlineY }}
                className="text-4xl md:text-5xl lg:text-display-2 font-heading font-black
                         text-brutalist-text-light dark:text-brutalist-text-dark leading-[1.1]"
              >
                <span className="block">
                  Ho fallito come designer.
                </span>
                <span className="block mt-2 text-transparent bg-clip-text
                               bg-gradient-to-r from-primary via-secondary to-accent">
                  Poi come developer.
                </span>
                <span className="block mt-2">
                  Ora sono un Product Manager
                  <br className="hidden lg:block" />
                  <span className="relative">
                    che sa davvero
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
                  cosa costruire.
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

            {/* CTA Buttons */}
            <ScrollAnimation animation="fadeInUp" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton
                  icon={Calendar}
                  iconPosition="left"
                  variant="primary"
                  size="lg"
                  iconAnimation={true}
                  className="group"
                >
                  {t('cta')}
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    →
                  </motion.span>
                </CTAButton>

                <MagneticButton
                  variant="secondary"
                  strength={0.3}
                >
                  Esplora il portfolio
                </MagneticButton>
              </div>
            </ScrollAnimation>

            {/* Stats */}
            <ScrollAnimation animation="fadeInUp" delay={0.4}>
              <div className="flex gap-8 pt-8">
                <div className="space-y-1">
                  <motion.div
                    className="text-3xl font-bold text-primary"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    78%
                  </motion.div>
                  <div className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                    Faster load times
                  </div>
                </div>
                <div className="space-y-1">
                  <motion.div
                    className="text-3xl font-bold text-secondary"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                  >
                    5M+
                  </motion.div>
                  <div className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                    Users impacted
                  </div>
                </div>
                <div className="space-y-1">
                  <motion.div
                    className="text-3xl font-bold text-accent"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                  >
                    12
                  </motion.div>
                  <div className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                    Products shipped
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Visual Side */}
          <div className="relative lg:h-[600px]">
            <MagneticHover strength={0.2}>
              <motion.div
                className="relative w-full h-full"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
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
                        Ship Fast
                      </h3>
                      <p className="text-sm opacity-80">
                        From idea to production in weeks, not months
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <motion.div
                  className="absolute top-10 -right-10 w-32 h-32 bg-neon-cyan/20
                           border-3 border-neon-cyan rounded-brutal shadow-brutal hidden lg:block"
                  animate={{
                    rotate: [0, 10, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="flex items-center justify-center h-full text-4xl">
                    ⚡
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-10 -left-10 w-28 h-28 bg-neon-pink/20
                           border-3 border-neon-pink rounded-brutal shadow-brutal hidden lg:block"
                  animate={{
                    rotate: [0, -10, 0],
                    x: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="flex items-center justify-center h-full text-3xl">
                    💡
                  </div>
                </motion.div>
              </motion.div>
            </MagneticHover>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <MousePointer2 className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
    </section>
  );
}