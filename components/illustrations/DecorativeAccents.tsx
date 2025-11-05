'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AccentItem {
  type: 'plus' | 'dot' | 'star' | 'cross';
  color: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  delay?: number;
}

interface DecorativeAccentsProps {
  className?: string;
  accents?: AccentItem[];
  preset?: 'hero' | 'section' | 'card' | 'random';
  animated?: boolean;
}

const defaultPresets: Record<string, AccentItem[]> = {
  hero: [
    { type: 'plus', color: 'text-neon-lime', position: { top: '10%', left: '5%' }, size: 'lg', animated: true },
    { type: 'dot', color: 'text-neon-pink', position: { top: '20%', right: '10%' }, size: 'md', animated: true, delay: 0.2 },
    { type: 'star', color: 'text-neon-cyan', position: { bottom: '15%', left: '15%' }, size: 'md', animated: true, delay: 0.4 },
    { type: 'plus', color: 'text-neon-orange', position: { bottom: '25%', right: '5%' }, size: 'sm', animated: true, delay: 0.6 },
    { type: 'cross', color: 'text-secondary', position: { top: '40%', left: '8%' }, size: 'sm', animated: true, delay: 0.8 },
  ],
  section: [
    { type: 'plus', color: 'text-primary', position: { top: '5%', left: '3%' }, size: 'md', animated: true },
    { type: 'dot', color: 'text-accent', position: { bottom: '10%', right: '5%' }, size: 'sm', animated: true, delay: 0.3 },
    { type: 'star', color: 'text-neon-purple', position: { top: '50%', right: '2%' }, size: 'sm', animated: true, delay: 0.5 },
  ],
  card: [
    { type: 'plus', color: 'text-primary/50', position: { top: '-8px', left: '-8px' }, size: 'sm' },
    { type: 'dot', color: 'text-accent/50', position: { bottom: '-4px', right: '-4px' }, size: 'sm' },
  ],
  random: [],
};

const AccentShape = ({ type, size = 'md' }: { type: AccentItem['type']; size?: AccentItem['size'] }) => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  };

  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  switch (type) {
    case 'plus':
      return <span className={cn('font-bold', sizes[size!])}>+</span>;
    case 'dot':
      return <div className={cn('rounded-full bg-current', dotSizes[size!])} />;
    case 'star':
      return <span className={cn('font-bold', sizes[size!])}>✦</span>;
    case 'cross':
      return <span className={cn('font-bold', sizes[size!])}>×</span>;
    default:
      return null;
  }
};

export default function DecorativeAccents({
  className,
  accents,
  preset = 'section',
  animated = true,
}: DecorativeAccentsProps) {
  const items = accents || (preset === 'random' ? generateRandomAccents() : defaultPresets[preset]);

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {items.map((accent, index) => {
        const shouldAnimate = animated && (accent.animated !== false);
        const animationVariant = index % 3;

        const animations = {
          0: shouldAnimate
            ? {
                rotate: [0, 15, 0],
                scale: [1, 1.1, 1],
              }
            : {},
          1: shouldAnimate
            ? {
                y: [0, -5, 0],
                opacity: [1, 0.7, 1],
              }
            : {},
          2: shouldAnimate
            ? {
                x: [0, 3, 0],
                rotate: [0, -10, 0],
              }
            : {},
        };

        return (
          <motion.div
            key={index}
            className={cn('absolute', accent.color)}
            style={accent.position}
            animate={animations[animationVariant as keyof typeof animations]}
            transition={{
              duration: 2 + index * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: accent.delay || 0,
            }}
          >
            <AccentShape type={accent.type} size={accent.size} />
          </motion.div>
        );
      })}
    </div>
  );
}

// Helper function to generate random accents
function generateRandomAccents(): AccentItem[] {
  const colors = ['text-primary', 'text-secondary', 'text-accent', 'text-neon-cyan', 'text-neon-pink', 'text-neon-lime', 'text-neon-orange'];
  const types: AccentItem['type'][] = ['plus', 'dot', 'star', 'cross'];
  const accents: AccentItem[] = [];

  const count = Math.floor(Math.random() * 5) + 3; // 3-7 accents

  for (let i = 0; i < count; i++) {
    accents.push({
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      position: {
        top: Math.random() > 0.5 ? `${Math.random() * 80}%` : undefined,
        bottom: Math.random() > 0.5 ? `${Math.random() * 80}%` : undefined,
        left: Math.random() > 0.5 ? `${Math.random() * 80}%` : undefined,
        right: Math.random() > 0.5 ? `${Math.random() * 80}%` : undefined,
      },
      size: (['sm', 'md', 'lg'] as const)[Math.floor(Math.random() * 3)],
      animated: true,
      delay: i * 0.2,
    });
  }

  return accents;
}