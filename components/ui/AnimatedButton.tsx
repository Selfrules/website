'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { brutalHover } from '@/lib/animations';

export interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'variants'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function AnimatedButton({
  className,
  variant = 'primary',
  size = 'md',
  disabled,
  children,
  ...props
}: AnimatedButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2',
    'font-heading font-bold text-sentence-case',
    'border-brutal border-brutalist-border rounded-brutal',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'
  );

  const variantStyles = {
    primary: cn('bg-primary text-brutalist-text-light shadow-brutal'),
    secondary: cn('bg-secondary text-white shadow-brutal'),
    accent: cn('bg-accent text-white shadow-brutal'),
    outline: cn(
      'bg-transparent text-brutalist-text-light shadow-brutal'
    ),
    ghost: cn(
      'bg-transparent text-brutalist-text-light border-transparent shadow-none'
    ),
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-body-sm',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-body-lg',
    xl: 'px-10 py-5 text-body-xl',
  };

  return (
    <motion.button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      variants={brutalHover}
      initial="rest"
      whileHover={disabled ? undefined : 'hover'}
      whileTap={disabled ? undefined : 'tap'}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
