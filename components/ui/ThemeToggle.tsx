'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-store';
import { cn } from '@/lib/utils';

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'relative inline-flex items-center',
          'w-16 h-9',
          'border-brutal border-brutalist-border rounded-brutal shadow-brutal-sm',
          'bg-brutalist-surface-light',
          className
        )}
        aria-label="Toggle theme"
      >
        <span className="sr-only">Loading theme toggle</span>
      </div>
    );
  }

  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center',
        'w-16 h-9',
        'border-brutal border-brutalist-border rounded-brutal shadow-brutal-sm',
        'transition-all duration-200 ease-brutal',
        'hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px]',
        'active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary',
        'overflow-hidden',
        isLight ? 'bg-primary' : 'bg-accent', // Electric Blue for light, Deep Navy for dark
        className
      )}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      aria-pressed={!isLight}
    >
      {/* Switch Track - Updated to cold tone colors */}
      <motion.div
        className="absolute inset-0 rounded-brutal"
        animate={{
          backgroundColor: isLight ? '#1E90FF' : '#7A90AA', // Electric Blue for light, Lighter Deep Navy for dark
        }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 400 }}
      />

      {/* Switch Handle */}
      <motion.div
        layout
        className={cn(
          'relative z-10',
          'w-6 h-6 mx-1',
          'bg-white rounded-brutal-sm',
          'border-2 border-black',
          'flex items-center justify-center'
        )}
        animate={{
          x: isLight ? 0 : 30,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      >
        {/* Icon with layout animation */}
        <motion.div
          layout
          className="flex items-center justify-center"
          initial={false}
          animate={{
            rotate: isLight ? 0 : 360,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
            type: 'spring',
          }}
        >
          {isLight ? (
            <Sun
              className="w-4 h-4 text-primary"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          ) : (
            <Moon
              className="w-4 h-4 text-secondary"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          )}
        </motion.div>
      </motion.div>

      {/* Background Icons (Optional decorative) */}
      <motion.div
        className="absolute right-2 top-1/2 -translate-y-1/2"
        initial={false}
        animate={{
          opacity: isLight ? 0 : 0.3,
          scale: isLight ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <Moon className="w-4 h-4 text-white" strokeWidth={2} aria-hidden="true" />
      </motion.div>

      <motion.div
        className="absolute left-2 top-1/2 -translate-y-1/2"
        initial={false}
        animate={{
          opacity: isLight ? 0.3 : 0,
          scale: isLight ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        <Sun className="w-4 h-4 text-white" strokeWidth={2} aria-hidden="true" />
      </motion.div>
    </button>
  );
}
