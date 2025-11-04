'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SimpleIllustrationProps {
  className?: string;
  type?: 'blob' | 'burst' | 'wave' | 'circle';
  icon?: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  borderColor?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  rotation?: number;
}

const sizes = {
  sm: {
    container: 'w-16 h-16',
    icon: 24,
  },
  md: {
    container: 'w-24 h-24',
    icon: 32,
  },
  lg: {
    container: 'w-32 h-32',
    icon: 40,
  },
};

const shapes = {
  blob: 'rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]',
  burst: 'rounded-[95%_5%_95%_5%_/_5%_95%_5%_95%]',
  wave: 'rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]',
  circle: 'rounded-full',
};

export default function SimpleIllustration({
  className,
  type = 'blob',
  icon: Icon,
  iconColor = 'text-primary',
  bgColor = 'bg-white',
  borderColor = 'border-brutalist-border',
  size = 'md',
  animated = true,
  rotation = 0,
}: SimpleIllustrationProps) {
  const sizeConfig = sizes[size];

  return (
    <motion.div
      className={cn(
        'relative flex items-center justify-center border-3 shadow-[4px_4px_0px_#000000]',
        sizeConfig.container,
        bgColor,
        borderColor,
        shapes[type],
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
      animate={
        animated
          ? type === 'blob'
            ? {
                borderRadius: [
                  '40% 60% 70% 30% / 40% 50% 60% 50%',
                  '60% 40% 30% 70% / 60% 30% 70% 40%',
                  '40% 60% 70% 30% / 40% 50% 60% 50%',
                ],
              }
            : type === 'burst'
            ? {
                rotate: [rotation, rotation + 360],
              }
            : type === 'wave'
            ? {
                scale: [1, 1.05, 1],
              }
            : {}
        : {}
      }
      transition={
        animated
          ? type === 'blob'
            ? {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : type === 'burst'
            ? {
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }
            : type === 'wave'
            ? {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {}
        : {}
      }
    >
      {Icon && (
        <motion.div
          animate={animated ? { y: [0, -3, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={sizeConfig.icon} className={cn(iconColor, 'stroke-[2.5]')} />
        </motion.div>
      )}
    </motion.div>
  );
}