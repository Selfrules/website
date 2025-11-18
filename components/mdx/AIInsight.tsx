'use client';

import { AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';

type Priority = 'high' | 'medium' | 'info';
type IconType = 'alert' | 'lightbulb' | 'sparkles';

interface AIInsightProps {
  title: string;
  description: string;
  priority?: Priority;
  icon?: IconType;
}

const priorityConfig = {
  high: {
    bg: 'bg-white',
    border: 'border-neon-pink',
    icon: 'bg-neon-pink',
  },
  medium: {
    bg: 'bg-white',
    border: 'border-cyber-yellow',
    icon: 'bg-cyber-yellow text-brutalist-text-primary',
  },
  info: {
    bg: 'bg-white',
    border: 'border-electric-blue',
    icon: 'bg-electric-blue',
  },
};

const iconMap = {
  alert: AlertTriangle,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
};

/**
 * AIInsight - Key insight card for MDX articles
 * @component
 * @category MDX Components
 */
export default function AIInsight({
  title,
  description,
  priority = 'info',
  icon = 'sparkles',
}: AIInsightProps) {
  const config = priorityConfig[priority];
  const Icon = iconMap[icon];

  return (
    <div
      className={`my-8 ${config.bg} border-4 ${config.border} rounded-lg shadow-brutal p-6`}
    >
      <div className="flex gap-4">
        <div
          className={`w-10 h-10 ${config.icon} text-white rounded-lg border-4 border-black flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h4 className="font-heading font-bold text-lg text-brutalist-text-primary mb-2">
            {title}
          </h4>
          <p className="text-sm text-brutalist-text-secondary">{description}</p>
        </div>
      </div>
    </div>
  );
}
