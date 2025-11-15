import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, BookOpen } from 'lucide-react';

/**
 * @component LearningObjectives
 * @category Blog Components
 * @description Box "Cosa imparerai" con lista di obiettivi e link CTA
 */

export interface LearningObjectivesProps {
  /** Lista di obiettivi di apprendimento */
  objectives: string[];
  /** Testo del CTA (default: "Vai alla soluzione") */
  ctaText?: string;
  /** URL del CTA anchor */
  ctaHref?: string;
  /** Colore del tema (default: electric-blue) */
  color?: 'electric-blue' | 'neon-pink' | 'deep-purple' | 'teal' | 'cyber-yellow';
  className?: string;
}

const colorMap = {
  'electric-blue': {
    bg: 'bg-electric-blue/5',
    border: 'border-electric-blue',
    text: 'text-electric-blue',
    icon: 'bg-electric-blue',
  },
  'neon-pink': {
    bg: 'bg-neon-pink/5',
    border: 'border-neon-pink',
    text: 'text-neon-pink',
    icon: 'bg-neon-pink',
  },
  'deep-purple': {
    bg: 'bg-deep-purple/5',
    border: 'border-deep-purple',
    text: 'text-deep-purple',
    icon: 'bg-deep-purple',
  },
  'teal': {
    bg: 'bg-teal/5',
    border: 'border-teal',
    text: 'text-teal',
    icon: 'bg-teal',
  },
  'cyber-yellow': {
    bg: 'bg-cyber-yellow/5',
    border: 'border-cyber-yellow',
    text: 'text-cyber-yellow',
    icon: 'bg-cyber-yellow',
  },
};

export const LearningObjectives = React.forwardRef<HTMLDivElement, LearningObjectivesProps>(
  ({ objectives, ctaText = 'Vai alla soluzione', ctaHref = '#solution', color = 'electric-blue', className }, ref) => {
    const colors = colorMap[color];

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border-brutal border-black rounded-brutal shadow-brutal',
          'p-brutal-lg',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-brutal-md">
          <div className={cn('w-12 h-12 rounded-brutal border-brutal-thin border-black flex items-center justify-center', colors.icon)}>
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-h4 font-heading font-bold text-brutalist-text-primary">
            📌 Cosa imparerai in questo articolo
          </h3>
        </div>

        {/* Objectives List */}
        <ul className="space-y-3 mb-brutal-md">
          {objectives.map((objective, index) => (
            <li key={index} className="flex gap-3 text-body-small text-brutalist-text-secondary">
              <span className={cn('font-bold', colors.text)}>→</span>
              <span>{objective}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={ctaHref}
          className={cn(
            'inline-flex items-center gap-2 font-heading font-bold text-body-small uppercase tracking-wider',
            colors.text,
            'hover:underline transition-all'
          )}
        >
          {ctaText}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    );
  }
);

LearningObjectives.displayName = 'LearningObjectives';
