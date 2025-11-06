'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink, Shield } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface CertificationData {
  id: string;
  title: string;
  tagline: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  icon?: React.ReactNode;
}

interface CertificationBadgeProps {
  certification: CertificationData;
  onClick?: () => void;
  animated?: boolean;
  delay?: number;
  className?: string;
}

export default function CertificationBadge({
  certification,
  onClick,
  animated = true,
  delay = 0,
  className = '',
}: CertificationBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const badgeContent = (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative w-full p-6 bg-white dark:bg-brutalist-surface-dark',
        'border-4 border-black rounded-brutal shadow-brutal',
        'hover:shadow-brutal-hover hover:-translate-y-1',
        'transition-all duration-300 cursor-pointer',
        'text-left',
        className
      )}
    >
      {/* Badge icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/20 border-4 border-primary rounded-brutal">
          {certification.icon || <Award className="w-6 h-6 text-primary" />}
        </div>

        {/* Verification indicator */}
        {certification.verificationUrl && (
          <div
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-brutal text-xs font-bold transition-all',
              isHovered
                ? 'bg-green-500 text-white border-2 border-black'
                : 'bg-green-100 text-green-700 border-2 border-green-500'
            )}
          >
            <Shield className="w-3 h-3" />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-2 text-sentence-case">
        {certification.title}
      </h3>

      {/* Tagline */}
      <p className="text-sm text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 mb-3 line-clamp-2">
        {certification.tagline}
      </p>

      {/* Issuer and date */}
      <div className="flex items-center justify-between text-xs text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
        <span className="font-bold">{certification.issuer}</span>
        <span>{certification.date}</span>
      </div>

      {/* Verification link (shown on hover) */}
      {certification.verificationUrl && isHovered && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t-2 border-brutalist-border"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-primary">
            <ExternalLink className="w-3 h-3" />
            <span>Verify on blockchain →</span>
          </div>
        </motion.div>
      )}

      {/* Hover effect overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-primary/5 rounded-brutal pointer-events-none transition-opacity',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      />
    </button>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.4,
          delay,
          type: 'spring',
          stiffness: 100,
        }}
      >
        {badgeContent}
      </motion.div>
    );
  }

  return badgeContent;
}
