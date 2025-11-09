'use client';

import { motion } from 'framer-motion';
import { Quote, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  verified?: boolean;
}

interface TestimonialProps {
  testimonial: TestimonialData;
  animated?: boolean;
  delay?: number;
  className?: string;
}

interface TestimonialPropsExtended extends TestimonialProps {
  onClick?: () => void;
}

export default function Testimonial({
  testimonial,
  animated = true,
  delay = 0,
  className = '',
  onClick,
}: TestimonialPropsExtended) {
  const cardContent = (
    <button
      onClick={onClick}
      className={cn(
        'relative h-64 p-6 bg-white dark:bg-brutalist-surface-dark',
        'border-4 border-black rounded-brutal shadow-brutal',
        'hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1',
        'transition-all duration-300 cursor-pointer',
        'text-left w-full flex flex-col',
        className
      )}
    >
      {/* Quote icon */}
      <div className="absolute -top-3 -left-3 p-2 bg-primary border-4 border-black rounded-brutal">
        <Quote className="w-5 h-5 text-black" />
      </div>

      {/* Verified badge */}
      {testimonial.verified && (
        <div className="absolute -top-3 -right-3 flex items-center gap-1 px-2 py-1 bg-green-500 text-white border-2 border-black rounded-brutal text-xs font-bold">
          <CheckCircle className="w-3 h-3" />
          <span>Verified</span>
        </div>
      )}

      {/* Quote text - truncated */}
      <blockquote className="mt-4 mb-auto flex-1 overflow-hidden">
        <p className="text-base text-brutalist-text-light/90 dark:text-brutalist-text-dark/90 leading-relaxed line-clamp-4">
          &quot;{testimonial.quote}&quot;
        </p>
      </blockquote>

      {/* Read more indicator */}
      <div className="text-xs font-bold text-primary mb-3">
        Read full testimonial →
      </div>

      {/* Author info */}
      <div className="pt-3 border-t-4 border-brutalist-border">
        <p className="font-bold text-base mb-1">{testimonial.author}</p>
        <p className="text-xs text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
          {testimonial.role}
        </p>
        <p className="text-xs text-primary font-bold mt-1">{testimonial.company}</p>
      </div>
    </button>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.5,
          delay,
          type: 'spring',
          stiffness: 100,
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}
