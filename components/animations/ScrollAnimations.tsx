'use client';

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// Animation Variants
export const scrollAnimationVariants: Record<string, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  },
  blurIn: {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  },
  brutalSlide: {
    hidden: {
      x: -100,
      opacity: 0,
      rotate: -5,
    },
    visible: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  },
};

// Stagger Container Variants
export const staggerContainerVariants: Record<string, Variants> = {
  default: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  fast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  slow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
};

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?: keyof typeof scrollAnimationVariants;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number | 'all' | 'some';
  stagger?: boolean;
  staggerDelay?: number;
}

export function ScrollAnimation({
  children,
  className,
  animation = 'fadeInUp',
  delay = 0,
  duration,
  once = true,
  amount = 0.3,
  stagger = false,
  staggerDelay = 0.1,
}: ScrollAnimationProps) {
  const variants = scrollAnimationVariants[animation];

  // Override transition if custom duration is provided
  if (duration && variants.visible.transition) {
    variants.visible.transition.duration = duration;
  }

  // Add delay if provided
  if (delay && variants.visible.transition) {
    variants.visible.transition.delay = delay;
  }

  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  childAnimation?: keyof typeof scrollAnimationVariants;
  once?: boolean;
  amount?: number | 'all' | 'some';
}

export function ScrollStagger({
  children,
  className,
  staggerDelay = 0.1,
  childAnimation = 'fadeInUp',
  once = true,
  amount = 0.3,
}: ScrollStaggerProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={scrollAnimationVariants[childAnimation]}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Export a hook for custom scroll animations
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';

export function useScrollAnimation(options?: {
  once?: boolean;
  amount?: number | 'all' | 'some';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    amount: options?.amount ?? 0.3,
  });

  return { ref, isInView };
}