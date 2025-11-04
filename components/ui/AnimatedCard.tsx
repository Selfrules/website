'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { brutalHover } from '@/lib/animations';

export interface AnimatedCardProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  hoverable?: boolean;
}

export function AnimatedCard({
  className,
  variant = 'default',
  hoverable = true,
  children,
  ...props
}: AnimatedCardProps) {
  const baseStyles = cn(
    'border-brutal border-brutalist-border rounded-brutal shadow-brutal',
    'bg-brutalist-surface-light dark:bg-brutalist-surface-dark'
  );

  const variantStyles = {
    default: 'bg-brutalist-surface-light dark:bg-brutalist-surface-dark',
    primary: 'bg-primary text-brutalist-text-light',
    secondary: 'bg-secondary text-white',
    accent: 'bg-accent text-white',
  };

  return (
    <motion.div
      className={cn(baseStyles, variantStyles[variant], className)}
      variants={hoverable ? brutalHover : undefined}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </motion.div>
  );
}
