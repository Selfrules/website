'use client';

import React from 'react';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Lightweight scroll-triggered reveal animations
 * Based on Motion.dev examples: scroll-fade and scroll-triggered
 * Optimized for 60fps performance with minimal layout shifts
 */

// Simple fade-in animation (most performant)
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Fade in with subtle upward movement
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Fade in from left
const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Fade in from right
const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Subtle scale with fade (for cards and images)
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const revealVariants = {
  fadeIn,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
} as const;

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof revealVariants;
  delay?: number;
  once?: boolean;
  amount?: number;
}

/**
 * ScrollReveal component - triggers animations when element enters viewport
 *
 * @param variant - Animation style to use
 * @param delay - Delay before animation starts (in seconds)
 * @param once - Whether animation should only trigger once
 * @param amount - Percentage of element that must be visible (0-1)
 */
export function ScrollReveal({
  children,
  className,
  variant = 'fadeInUp',
  delay = 0,
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const selectedVariant = revealVariants[variant];

  // Create custom variants with delay if provided
  const customVariants: Variants = {
    hidden: selectedVariant.hidden,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...(typeof selectedVariant.visible === 'object' && 'transition' in selectedVariant.visible
          ? selectedVariant.visible.transition
          : {}),
        delay,
      },
    },
  };

  // If user prefers reduced motion, skip animations
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -100px 0px" }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  childVariant?: keyof typeof revealVariants;
  once?: boolean;
  amount?: number;
}

/**
 * ScrollStagger - Reveals children with staggered delays
 * Useful for lists and grids
 */
export function ScrollStagger({
  children,
  className,
  staggerDelay = 0.1,
  childVariant = 'fadeInUp',
  once = true,
  amount = 0.2,
}: ScrollStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -100px 0px" }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={revealVariants[childVariant]}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
