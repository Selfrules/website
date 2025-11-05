'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Page transition variants
export const pageTransitionVariants = {
  slideFromRight: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  slideFromLeft: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
  slideFromTop: {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  slideFromBottom: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
  },
  rotate: {
    initial: { rotate: -180, scale: 0.5, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    exit: { rotate: 180, scale: 0.5, opacity: 0 },
  },
  brutal: {
    initial: {
      x: -50,
      y: -50,
      opacity: 0,
      rotate: -5,
      scale: 0.9,
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
    },
    exit: {
      x: 50,
      y: 50,
      opacity: 0,
      rotate: 5,
      scale: 0.9,
    },
  },
};

// Transition configurations
export const transitionConfigs = {
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  },
  smooth: {
    type: 'tween',
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1],
  },
  quick: {
    type: 'tween',
    duration: 0.3,
    ease: 'easeInOut',
  },
  slow: {
    type: 'tween',
    duration: 0.8,
    ease: [0.43, 0.13, 0.23, 0.96],
  },
  bounce: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof pageTransitionVariants;
  transition?: keyof typeof transitionConfigs;
  delay?: number;
}

export function PageTransition({
  children,
  className,
  variant = 'fade',
  transition = 'smooth',
  delay = 0,
}: PageTransitionProps) {
  const transitionConfig = {
    ...transitionConfigs[transition],
    delay,
  };

  return (
    <motion.div
      className={className}
      variants={pageTransitionVariants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transitionConfig}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedRouteProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedRoute({ children, className }: AnimatedRouteProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={transitionConfigs.smooth}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: boolean;
  staggerDelay?: number;
}

export function SectionTransition({
  children,
  className,
  direction = 'up',
  stagger = false,
  staggerDelay = 0.1,
}: SectionTransitionProps) {
  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
  };

  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        }}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: directionVariants[direction],
              visible: {
                x: 0,
                y: 0,
                opacity: 1,
                transition: transitionConfigs.smooth,
              },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={directionVariants[direction]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={transitionConfigs.smooth}
    >
      {children}
    </motion.div>
  );
}

interface ModalTransitionProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}

export function ModalTransition({ children, isOpen, className }: ModalTransitionProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className={cn('fixed inset-0 flex items-center justify-center z-50', className)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={transitionConfigs.bounce}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface TabTransitionProps {
  children: React.ReactNode;
  activeKey: string;
  className?: string;
}

export function TabTransition({ children, activeKey, className }: TabTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeKey}
        className={className}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={transitionConfigs.quick}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface AccordionTransitionProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}

export function AccordionTransition({ children, isOpen, className }: AccordionTransitionProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className={className}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={transitionConfigs.smooth}
          style={{ overflow: 'hidden' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';