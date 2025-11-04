'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  strength?: number;
  disabled?: boolean;
  onClick?: () => void;
}

const variantStyles = {
  primary: 'bg-primary text-brutalist-text-light border-brutal border-brutalist-border',
  secondary: 'bg-secondary text-white border-brutal border-brutalist-border',
  accent: 'bg-accent text-white border-brutal border-brutalist-border',
};

export default function MagneticButton({
  children,
  className,
  variant = 'primary',
  strength = 0.3,
  disabled = false,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative px-8 py-4 font-bold rounded-brutal shadow-brutal',
        'transition-all text-sentence-case',
        variantStyles[variant],
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        boxShadow: isHovered && !disabled
          ? '12px 12px 0px #000000'
          : '8px 8px 0px #000000',
      }}
      whileTap={
        !disabled
          ? {
              scale: 0.95,
              boxShadow: '4px 4px 0px #000000',
            }
          : {}
      }
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
    >
      <span className="relative z-10">{children}</span>
      {/* Magnetic field indicator (optional visual effect) */}
      {isHovered && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-brutal opacity-10 bg-gradient-radial from-white to-transparent"
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          exit={{ scale: 0 }}
        />
      )}
    </motion.button>
  );
}