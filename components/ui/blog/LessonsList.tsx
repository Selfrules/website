import React from 'react';
import { cn } from '@/lib/utils';
import { Award } from 'lucide-react';

/**
 * @component LessonsList
 * @category Blog Components
 * @description Lista di lessons learned con numeri e descrizioni
 */

export interface Lesson {
  /** Titolo della lezione */
  title: string;
  /** Descrizione dettagliata */
  description: string;
}

export interface LessonsListProps {
  /** Titolo della sezione (opzionale) */
  title?: string;
  /** Lista di lessons */
  lessons: Lesson[];
  /** Colore del tema */
  color?: 'blue' | 'pink' | 'purple' | 'yellow' | 'teal';
  className?: string;
}

const colorMap = {
  blue: {
    bg: 'bg-electric-blue',
    text: 'text-electric-blue',
    bgLight: 'bg-electric-blue/5',
  },
  pink: {
    bg: 'bg-neon-pink',
    text: 'text-neon-pink',
    bgLight: 'bg-neon-pink/5',
  },
  purple: {
    bg: 'bg-deep-purple',
    text: 'text-deep-purple',
    bgLight: 'bg-deep-purple/5',
  },
  yellow: {
    bg: 'bg-cyber-yellow',
    text: 'text-cyber-yellow',
    bgLight: 'bg-cyber-yellow/5',
  },
  teal: {
    bg: 'bg-teal',
    text: 'text-teal',
    bgLight: 'bg-teal/5',
  },
};

export const LessonsList = React.forwardRef<HTMLDivElement, LessonsListProps>(
  ({ title, lessons, color = 'blue', className }, ref) => {
    const colors = colorMap[color];

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border-brutal border-black rounded-brutal shadow-brutal p-brutal-lg',
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center gap-3 mb-brutal-lg">
            <div className={cn('w-10 h-10 rounded-brutal border-brutal-thin border-black flex items-center justify-center', colors.bg)}>
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-h3 font-heading font-bold text-brutalist-text-primary">
              {title}
            </h3>
          </div>
        )}

        {/* Lessons List */}
        <div className="space-y-6">
          {lessons.map((lesson, index) => (
            <div key={index} className={cn('rounded-brutal p-brutal-md border-l-brutal-thick', colors.bgLight, colors.text)}>
              <div className="flex gap-4">
                {/* Number Badge */}
                <div className="shrink-0">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-brutal border-brutal-thin border-black flex items-center justify-center',
                      colors.bg
                    )}
                  >
                    <span className="text-h4 font-heading font-black text-white">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-body font-heading font-bold text-brutalist-text-primary mb-2">
                    {lesson.title}
                  </h4>
                  <p className="text-body-small text-brutalist-text-secondary">
                    {lesson.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

LessonsList.displayName = 'LessonsList';
