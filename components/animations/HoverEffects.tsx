'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';

interface MagneticHoverProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticHover({
  children,
  className,
  strength = 0.25,
}: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

interface TiltEffectProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltEffect({
  children,
  className,
  maxTilt = 15,
}: TiltEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    setRotateY(percentX * maxTilt);
    setRotateX(-percentY * maxTilt);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn('transform-gpu', className)}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: 'sm' | 'md' | 'lg';
}

export function GlowEffect({
  children,
  className,
  glowColor = 'primary',
  glowSize = 'md',
}: GlowEffectProps) {
  const [isHovered, setIsHovered] = useState(false);

  const glowSizes = {
    sm: '0 0 20px',
    md: '0 0 40px',
    lg: '0 0 60px',
  };

  const glowColors = {
    primary: 'rgba(255, 217, 61, 0.5)',
    secondary: 'rgba(108, 92, 231, 0.5)',
    accent: 'rgba(255, 107, 107, 0.5)',
    neon: 'rgba(0, 217, 255, 0.5)',
  };

  return (
    <motion.div
      className={cn('relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-brutal"
        animate={{
          boxShadow: isHovered
            ? `${glowSizes[glowSize]} ${glowColors[glowColor as keyof typeof glowColors]}`
            : '0 0 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: -1 }}
      />
      {children}
    </motion.div>
  );
}

interface ShadowLiftProps {
  children: React.ReactNode;
  className?: string;
  liftDistance?: number;
}

export function ShadowLift({
  children,
  className,
  liftDistance = 8,
}: ShadowLiftProps) {
  return (
    <motion.div
      className={cn('shadow-brutal transition-shadow', className)}
      whileHover={{
        y: -liftDistance,
        boxShadow: `${liftDistance * 2}px ${liftDistance * 2}px 0px #000000`,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

interface IconRotateProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
  continuous?: boolean;
}

export function IconRotate({
  children,
  className,
  rotation = 180,
  continuous = false,
}: IconRotateProps) {
  if (continuous) {
    return (
      <motion.div
        className={className}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      whileHover={{ rotate: rotation }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

interface PulseEffectProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export function PulseEffect({
  children,
  className,
  scale = 1.05,
}: PulseEffectProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

interface ShakeEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  onHover?: boolean;
}

export function ShakeEffect({
  children,
  className,
  intensity = 2,
  onHover = true,
}: ShakeEffectProps) {
  const shakeAnimation = {
    x: [0, -intensity, intensity, -intensity, intensity, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  };

  if (onHover) {
    return (
      <motion.div className={className} whileHover={shakeAnimation}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      animate={shakeAnimation}
      transition={{
        ...shakeAnimation.transition,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      {children}
    </motion.div>
  );
}