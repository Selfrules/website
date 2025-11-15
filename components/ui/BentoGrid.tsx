'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  rowSpan?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  hoverable?: boolean;
  animated?: boolean;
  delay?: number;
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
  6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
};

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

const variantClasses = {
  default: 'bg-white border-brutal border-brutalist-border',
  primary: 'bg-primary/10 border-brutal border-primary',
  secondary: 'bg-secondary/10 border-brutal border-secondary',
  accent: 'bg-accent/10 border-brutal border-accent',
};

export function BentoGrid({
  children,
  className,
  columns = 3,
  gap = 'md',
  animated = false,
}: BentoGridProps) {
  return (
    <motion.div
      className={cn(
        'grid auto-rows-[minmax(200px,_auto)]',
        columnClasses[columns],
        gapClasses[gap],
        className
      )}
      initial={animated ? { opacity: 0 } : {}}
      animate={animated ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function BentoGridItem({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  variant = 'default',
  hoverable = true,
  animated = false,
  delay = 0,
}: BentoGridItemProps) {
  const spanClasses = cn(
    colSpan > 1 && `md:col-span-${colSpan}`,
    rowSpan > 1 && `row-span-${rowSpan}`
  );

  const content = (
    <div
      className={cn(
        'relative h-full rounded-brutal shadow-brutal p-6 transition-all',
        variantClasses[variant],
        hoverable && 'hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1',
        spanClasses,
        className
      )}
    >
      {children}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay,
          type: 'spring',
          stiffness: 100,
        }}
        whileHover={
          hoverable
            ? {
                scale: 1.02,
                transition: { type: 'spring', stiffness: 400 },
              }
            : {}
        }
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// Preset layouts for common bento grid patterns
export const BentoPresets = {
  // 2x2 grid with one large item
  featured: (items: React.ReactNode[]) => (
    <>
      <BentoGridItem colSpan={2} rowSpan={2}>
        {items[0]}
      </BentoGridItem>
      {items.slice(1, 5).map((item, index) => (
        <BentoGridItem key={index}>{item}</BentoGridItem>
      ))}
    </>
  ),

  // Alternating large and small items
  alternating: (items: React.ReactNode[]) =>
    items.map((item, index) => (
      <BentoGridItem
        key={index}
        colSpan={index % 3 === 0 ? 2 : 1}
        rowSpan={index % 3 === 0 ? 2 : 1}
      >
        {item}
      </BentoGridItem>
    )),

  // Masonry-style layout
  masonry: (items: React.ReactNode[]) =>
    items.map((item, index) => {
      const patterns = [
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 2 },
        { colSpan: 2, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 3 },
        { colSpan: 2, rowSpan: 2 },
      ];
      const pattern = patterns[index % patterns.length];
      return (
        <BentoGridItem
          key={index}
          colSpan={pattern.colSpan as any}
          rowSpan={pattern.rowSpan as any}
        >
          {item}
        </BentoGridItem>
      );
    }),
};