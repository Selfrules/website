'use client';

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// Animation Variants - Explicitly typed for proper Framer Motion compatibility
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const rotateIn: Variants = {
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
};

const blurIn: Variants = {
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
};

const brutalSlide: Variants = {
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
};

// Export as Record with proper typing
export const scrollAnimationVariants: Record<string, Variants> = {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  rotateIn,
  blurIn,
  brutalSlide,
};

// Stagger Container Variants - Explicitly typed
const staggerDefault: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const staggerContainerVariants: Record<string, Variants> = {
  default: staggerDefault,
  fast: staggerFast,
  slow: staggerSlow,
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
  const baseVariants = scrollAnimationVariants[animation];

  // Create customized variants with duration and delay if provided
  const customVariants: Variants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(typeof baseVariants.visible === 'object' && 'transition' in baseVariants.visible
          ? baseVariants.visible.transition
          : {}),
        ...(duration !== undefined && { duration }),
        ...(delay !== undefined && { delay }),
      },
    },
  };

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
      variants={customVariants}
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