import React from 'react';
import { cn } from '@/lib/utils';

/**
 * @component TeamComposition
 * @category Blog Components
 * @description Display numerico della composizione del team
 */

export interface TeamMember {
  /** Numero di membri */
  count: number;
  /** Ruolo/titolo */
  role: string;
  /** Colore del tema */
  color?: 'blue' | 'pink' | 'purple' | 'yellow' | 'teal';
}

export interface TeamCompositionProps {
  /** Lista di membri del team */
  members: TeamMember[];
  /** Layout: horizontal o vertical */
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

const colorMap = {
  blue: 'bg-electric-blue',
  pink: 'bg-neon-pink',
  purple: 'bg-deep-purple',
  yellow: 'bg-cyber-yellow',
  teal: 'bg-teal',
};

export const TeamComposition = React.forwardRef<HTMLDivElement, TeamCompositionProps>(
  ({ members, layout = 'horizontal', className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border-brutal border-black rounded-brutal shadow-brutal p-brutal-lg',
          className
        )}
      >
        <div
          className={cn(
            'grid gap-6',
            layout === 'horizontal' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'
          )}
        >
          {members.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Count Circle */}
              <div
                className={cn(
                  'w-20 h-20 rounded-brutal border-brutal border-black flex items-center justify-center mb-3',
                  member.color ? colorMap[member.color] : 'bg-electric-blue'
                )}
              >
                <span className="text-h2 font-heading font-black text-white">
                  {member.count}
                </span>
              </div>

              {/* Role */}
              <p className="text-body font-heading font-bold text-brutalist-text-primary">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

TeamComposition.displayName = 'TeamComposition';
