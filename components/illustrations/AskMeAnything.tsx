'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Lightbulb, HelpCircle } from 'lucide-react';

interface AskMeAnythingProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: {
    container: 'w-40 h-32',
    blob: 'w-14 h-14',
    icon: 20,
    connectorBar: 'w-12 h-1',
    accentSize: 'text-xs',
  },
  md: {
    container: 'w-52 h-40',
    blob: 'w-16 h-16',
    icon: 24,
    connectorBar: 'w-16 h-1',
    accentSize: 'text-sm',
  },
  lg: {
    container: 'w-64 h-48',
    blob: 'w-20 h-20',
    icon: 32,
    connectorBar: 'w-20 h-1',
    accentSize: 'text-base',
  },
};

export default function AskMeAnything({
  className,
  animated = true,
  size = 'md',
}: AskMeAnythingProps) {
  const sizeConfig = sizes[size];

  return (
    <div className={cn('relative', sizeConfig.container, className)}>
      {/* Decorative Accents */}
      <motion.div
        className={cn('absolute top-2 left-8 text-neon-lime font-bold', sizeConfig.accentSize)}
        animate={animated ? { rotate: [0, 15, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        +
      </motion.div>
      <motion.div
        className={cn('absolute bottom-2 right-12 text-neon-orange font-bold', sizeConfig.accentSize)}
        animate={animated ? { rotate: [0, -15, 0] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        +
      </motion.div>
      <motion.div
        className={cn('absolute top-1/3 right-4 text-neon-purple font-bold', sizeConfig.accentSize)}
        animate={animated ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        +
      </motion.div>

      {/* Dots */}
      <motion.div
        className="absolute top-4 right-8 w-1 h-1 bg-neon-pink rounded-full"
        animate={animated ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-8 left-4 w-1 h-1 bg-neon-blue rounded-full"
        animate={animated ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Main Container */}
      <div className="relative flex items-center justify-center h-full">
        {/* Lightbulb Blob */}
        <motion.div
          className={cn(
            'relative bg-white border-brutal border-brutalist-border rounded-[32px] shadow-brutal-sm flex items-center justify-center',
            sizeConfig.blob
          )}
          style={{ transform: 'rotate(12deg)' }}
          animate={animated ? { rotate: [12, 8, 12] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Lightbulb
            size={sizeConfig.icon}
            className="text-neon-yellow"
            strokeWidth={2.5}
          />
          {/* Connector tail */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-white border border-brutalist-border rounded-full" />
        </motion.div>

        {/* Connecting Bar */}
        <div
          className={cn(
            'bg-white border-t-2 border-b-2 border-brutalist-border mx-1',
            sizeConfig.connectorBar
          )}
        />

        {/* Question Mark Blob */}
        <motion.div
          className={cn(
            'relative bg-white border-brutal border-brutalist-border rounded-[32px] shadow-brutal-sm flex items-center justify-center',
            sizeConfig.blob
          )}
          style={{ transform: 'rotate(-12deg)' }}
          animate={animated ? { rotate: [-12, -8, -12] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <HelpCircle
            size={sizeConfig.icon}
            className="text-secondary"
            strokeWidth={2.5}
          />
          {/* Connector tail */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-white border border-brutalist-border rounded-full" />
        </motion.div>
      </div>

      {/* More Floating Accents */}
      <motion.div
        className="absolute bottom-4 left-1/3"
        animate={animated ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-2 h-2 bg-neon-lime rounded-full" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-6"
        animate={animated ? { x: [0, 4, 0] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-2 h-2 bg-neon-orange rounded-full" />
      </motion.div>
    </div>
  );
}