'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  gap?: number;
  gradient?: boolean;
  gradientWidth?: number;
}

const speeds = {
  slow: 40,
  normal: 20,
  fast: 10,
};

export default function Marquee({
  children,
  className,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  gap = 32,
  gradient = true,
  gradientWidth = 200,
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  useEffect(() => {
    if (marqueeRef.current) {
      const width = marqueeRef.current.scrollWidth;
      setMarqueeWidth(width);
    }
  }, [children]);

  const duration = speeds[speed];

  return (
    <div
      className={cn(
        'relative flex overflow-hidden',
        pauseOnHover && '[&:hover_.marquee-content]:pause',
        className
      )}
      style={{
        ['--marquee-duration' as string]: `${duration}s`,
        ['--marquee-gap' as string]: `${gap}px`,
      }}
    >
      {/* Gradient masks */}
      {gradient && (
        <>
          <div
            className="absolute left-0 top-0 z-10 h-full bg-gradient-to-r from-white dark:from-brutalist-bg-dark to-transparent"
            style={{ width: `${gradientWidth}px` }}
          />
          <div
            className="absolute right-0 top-0 z-10 h-full bg-gradient-to-l from-white dark:from-brutalist-bg-dark to-transparent"
            style={{ width: `${gradientWidth}px` }}
          />
        </>
      )}

      {/* Marquee content */}
      <div
        className={cn(
          'marquee-content flex',
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        )}
        style={{ gap: `${gap}px` }}
      >
        {/* Original content */}
        <div ref={marqueeRef} className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface MarqueeItemProps {
  children: React.ReactNode;
  className?: string;
}

export function MarqueeItem({ children, className }: MarqueeItemProps) {
  return (
    <div className={cn('flex-shrink-0', className)}>
      {children}
    </div>
  );
}

// Preset marquee components
interface TextMarqueeProps {
  texts: string[];
  className?: string;
  separator?: string | React.ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
}

export function TextMarquee({
  texts,
  className,
  separator = '•',
  speed = 'normal',
}: TextMarqueeProps) {
  return (
    <Marquee speed={speed} className={className}>
      {texts.map((text, index) => (
        <React.Fragment key={index}>
          <MarqueeItem className="text-xl font-bold text-brutalist-text-light dark:text-brutalist-text-dark">
            {text}
          </MarqueeItem>
          {index < texts.length - 1 && (
            <MarqueeItem className="text-xl text-primary">
              {separator}
            </MarqueeItem>
          )}
        </React.Fragment>
      ))}
    </Marquee>
  );
}

interface LogoMarqueeProps {
  logos: Array<{
    name: string;
    src?: string;
    icon?: React.ReactNode;
  }>;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export function LogoMarquee({
  logos,
  className,
  speed = 'normal',
}: LogoMarqueeProps) {
  return (
    <Marquee speed={speed} className={className} gap={48}>
      {logos.map((logo, index) => (
        <MarqueeItem
          key={index}
          className="flex items-center justify-center h-20 px-8 bg-white dark:bg-brutalist-surface-dark border-brutal border-brutalist-border rounded-brutal shadow-brutal"
        >
          {logo.src ? (
            <Image
              src={logo.src}
              alt={logo.name}
              width={96}
              height={48}
              className="h-12 w-auto object-contain"
              loading="lazy"
            />
          ) : logo.icon ? (
            <div className="h-12 flex items-center">{logo.icon}</div>
          ) : (
            <span className="text-lg font-bold">{logo.name}</span>
          )}
        </MarqueeItem>
      ))}
    </Marquee>
  );
}

interface CardMarqueeProps {
  cards: React.ReactNode[];
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export function CardMarquee({
  cards,
  className,
  speed = 'normal',
}: CardMarqueeProps) {
  return (
    <Marquee speed={speed} className={className} gap={24}>
      {cards.map((card, index) => (
        <MarqueeItem key={index}>{card}</MarqueeItem>
      ))}
    </Marquee>
  );
}