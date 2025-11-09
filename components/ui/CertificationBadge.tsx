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
      className={cn(
        'group relative w-full h-48 p-4 bg-white dark:bg-brutalist-surface-dark',
        'border-4 border-black rounded-lg shadow-brutal',
        'hover:shadow-brutal-hover hover:-translate-y-1',
        'transition-all duration-300 cursor-pointer',
        'text-left flex flex-col',
        className
      )}
    >
      {/* Compact header with icon and title - Electric Blue accent */}
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-primary text-white border-2 border-black rounded-md flex-shrink-0">
          {certification.icon || <Award className="w-4 h-4 text-white" />}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold mb-1 line-clamp-2">
            {certification.title}
          </h3>
        </div>
      </div>

      {/* Tagline - compact */}
      <p className="text-xs text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 mb-auto line-clamp-2">
        {certification.tagline}
      </p>

      {/* Issuer and date - bottom aligned */}
      <div className="flex items-center justify-between text-xs text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 pt-2 border-t-2 border-brutalist-border mt-auto">
        <span className="font-bold truncate">{certification.issuer}</span>
        <span className="flex-shrink-0 ml-2">{certification.date}</span>
      </div>
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
