'use client';

import { ArrowRight } from 'lucide-react';

type Urgency = 'urgent' | 'medium' | 'info';

interface RecommendationCardProps {
  title: string;
  description: string;
  urgency?: Urgency;
  actionable?: boolean;
}

const urgencyConfig = {
  urgent: {
    border: 'border-neon-pink',
    indicator: 'bg-neon-pink',
  },
  medium: {
    border: 'border-cyber-yellow',
    indicator: 'bg-cyber-yellow',
  },
  info: {
    border: 'border-teal',
    indicator: 'bg-teal',
  },
};

/**
 * RecommendationCard - Actionable recommendation for MDX articles
 * @component
 * @category MDX Components
 */
export default function RecommendationCard({
  title,
  description,
  urgency = 'info',
  actionable = false,
}: RecommendationCardProps) {
  const config = urgencyConfig[urgency];

  return (
    <div
      className={`my-8 bg-white border-brutal ${config.border} rounded-brutal shadow-brutal p-6 relative`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.indicator}`} />
      <div className="pl-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h4 className="font-heading font-bold text-lg text-brutalist-text-primary flex-1">
            {title}
          </h4>
          {actionable && (
            <ArrowRight className="w-5 h-5 text-brutalist-text-tertiary flex-shrink-0" />
          )}
        </div>
        <p className="text-sm text-brutalist-text-secondary">{description}</p>
      </div>
    </div>
  );
}
