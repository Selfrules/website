'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  animated?: boolean;
}

interface TimelineItemProps {
  children: React.ReactNode;
  className?: string;
  date?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  active?: boolean;
  animated?: boolean;
  delay?: number;
}

const variantColors = {
  default: 'bg-brutalist-text-light dark:bg-brutalist-text-dark',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
};

const variantBorders = {
  default: 'border-brutalist-border',
  primary: 'border-primary',
  secondary: 'border-secondary',
  accent: 'border-accent',
};

export function Timeline({
  children,
  className,
  orientation = 'vertical',
  animated = true,
}: TimelineProps) {
  return (
    <div
      className={cn(
        'relative',
        orientation === 'vertical' ? 'flex flex-col' : 'flex flex-row overflow-x-auto',
        className
      )}
    >
      {/* Timeline line - left-aligned on desktop for better use of space */}
      <div
        className={cn(
          'absolute bg-brutalist-border',
          orientation === 'vertical'
            ? 'left-6 md:left-6 w-1 h-full'
            : 'top-10 h-1 w-full'
        )}
      />

      {/* Timeline items - left-aligned layout for wider cards on desktop */}
      <div
        className={cn(
          orientation === 'vertical'
            ? 'space-y-12'
            : 'flex space-x-12 pb-4'
        )}
      >
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                delay: animated ? index * 0.2 : 0,
                orientation,
              })
            : child
        )}
      </div>
    </div>
  );
}

export function TimelineItem({
  children,
  className,
  date,
  title,
  description,
  icon,
  variant = 'default',
  active = false,
  animated = true,
  delay = 0,
  orientation = 'vertical',
}: TimelineItemProps & { orientation?: 'vertical' | 'horizontal' }) {
  const itemContent = (
    <div
      className={cn(
        'relative',
        orientation === 'vertical'
          ? 'flex items-center justify-between md:justify-start w-full'
          : 'flex flex-col items-center min-w-[200px]',
        className
      )}
    >
      {/* Timeline dot/icon - left-aligned on all screen sizes */}
      <div
        className={cn(
          'absolute z-10 flex items-center justify-center',
          orientation === 'vertical'
            ? 'left-3 md:left-3'
            : 'top-6 left-1/2 -translate-x-1/2'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center rounded-full border-4 bg-white dark:bg-brutalist-surface-dark transition-all',
            active ? 'w-12 h-12' : 'w-10 h-10',
            active ? variantBorders[variant] : 'border-brutalist-border',
            active && 'shadow-brutal'
          )}
        >
          {icon || (
            <div
              className={cn(
                'rounded-full',
                active ? 'w-5 h-5' : 'w-3 h-3',
                variantColors[variant]
              )}
            />
          )}
        </div>
      </div>

      {/* Content - Left-aligned layout for better space usage */}
      <div
        className={cn(
          'flex-1',
          orientation === 'vertical'
            ? 'ml-20 w-full'
            : 'mt-20 text-center'
        )}
      >
        {orientation === 'vertical' ? (
          <>
            {/* Date positioned above card on mobile, inline on desktop */}
            {date && (
              <span className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 font-mono mb-2 block md:mb-3">
                {date}
              </span>
            )}

            {/* Card content - wider on desktop with left alignment */}
            <div
              className={cn(
                'p-6 bg-white dark:bg-brutalist-surface-dark rounded-brutal border-brutal shadow-brutal',
                'w-full md:max-w-3xl', // Wider cards on desktop
                active ? variantBorders[variant] : 'border-brutalist-border',
                'hover:shadow-brutal-hover hover:-translate-y-1 transition-all'
              )}
            >
              {title && (
                <h3 className="text-xl font-bold mb-2 text-sentence-case">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80 mb-4">
                  {description}
                </p>
              )}
              {children}
            </div>
          </>
        ) : (
          /* Horizontal layout */
          <>
            {date && (
              <span className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 font-mono mb-2">
                {date}
              </span>
            )}
            <div
              className={cn(
                'p-4 bg-white dark:bg-brutalist-surface-dark rounded-brutal border-brutal shadow-brutal',
                active ? variantBorders[variant] : 'border-brutalist-border',
                'hover:shadow-brutal-hover hover:-translate-y-1 transition-all'
              )}
            >
              {title && (
                <h3 className="text-lg font-bold mb-2 text-sentence-case">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-brutalist-text-light/80 dark:text-brutalist-text-dark/80 mb-2">
                  {description}
                </p>
              )}
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: orientation === 'vertical' ? 20 : 0, x: orientation === 'horizontal' ? 20 : 0 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.5,
          delay,
          type: 'spring',
          stiffness: 100,
        }}
      >
        {itemContent}
      </motion.div>
    );
  }

  return itemContent;
}

// Timeline connector for custom layouts
export function TimelineConnector({ className, orientation = 'vertical' }: {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}) {
  return (
    <div
      className={cn(
        'bg-brutalist-border',
        orientation === 'vertical' ? 'w-1 h-12' : 'h-1 w-12',
        className
      )}
    />
  );
}