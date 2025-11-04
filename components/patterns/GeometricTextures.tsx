'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GeometricTexturesProps {
  className?: string;
  variant?: 'hero' | 'section' | 'card';
  animated?: boolean;
  colors?: {
    square?: string;
    circle?: string;
    triangle?: string;
  };
}

const defaultColors = {
  square: 'border-neon-cyan',
  circle: 'border-neon-pink',
  triangle: 'border-primary',
};

const positions = {
  hero: {
    square: 'top-20 left-10 lg:left-20',
    circle: 'top-40 right-10 lg:right-32',
    triangle: 'bottom-20 left-1/3',
  },
  section: {
    square: 'top-10 left-5',
    circle: 'bottom-10 right-5',
    triangle: 'top-1/2 left-1/2',
  },
  card: {
    square: '-top-4 -left-4',
    circle: '-bottom-4 -right-4',
    triangle: 'top-1/2 -right-6',
  },
};

export default function GeometricTextures({
  className,
  variant = 'section',
  animated = true,
  colors = defaultColors,
}: GeometricTexturesProps) {
  const MotionComponent = animated ? motion.div : 'div';

  const animationProps = animated
    ? {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, type: 'spring', stiffness: 100 },
      }
    : {};

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Rounded Square */}
      <MotionComponent
        className={cn(
          'absolute w-14 h-14 border-4 rounded-lg',
          colors.square || defaultColors.square,
          positions[variant].square,
          'hidden lg:block',
        )}
        style={{ transform: 'rotate(15deg)' }}
        {...animationProps}
        {...(animated && {
          animate: {
            ...animationProps.animate,
            rotate: [15, 20, 15],
          },
          transition: {
            ...animationProps.transition,
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        })}
      />

      {/* Circle */}
      <MotionComponent
        className={cn(
          'absolute w-12 h-12 border-4 rounded-full',
          colors.circle || defaultColors.circle,
          positions[variant].circle,
          'hidden lg:block',
        )}
        {...animationProps}
        {...(animated && {
          animate: {
            ...animationProps.animate,
            y: [0, -10, 0],
          },
          transition: {
            ...animationProps.transition,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        })}
      />

      {/* Triangle (using CSS) */}
      <MotionComponent
        className={cn(
          'absolute w-0 h-0',
          positions[variant].triangle,
          'hidden lg:block',
        )}
        style={{
          borderLeft: '25px solid transparent',
          borderRight: '25px solid transparent',
          borderBottom: `43px solid ${
            colors.triangle === 'border-primary' ? '#FFD93D' :
            colors.triangle === 'border-neon-cyan' ? '#00D9FF' :
            colors.triangle === 'border-neon-pink' ? '#FF0099' :
            '#FFD93D'
          }`,
          transform: 'rotate(-20deg)',
        }}
        {...animationProps}
        {...(animated && {
          animate: {
            ...animationProps.animate,
            rotate: [-20, -15, -20],
          },
          transition: {
            ...animationProps.transition,
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        })}
      />
    </div>
  );
}