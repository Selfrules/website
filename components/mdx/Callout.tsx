/**
 * Callout component for highlighting important information in MDX articles
 * @component
 * @category MDX Components
 */

import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CalloutType = 'info' | 'warning' | 'tip' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: React.ComponentType<{ className?: string }>;
    borderColor: string;
    bgColor: string;
    iconColor: string;
    titleColor: string;
  }
> = {
  info: {
    icon: Info,
    borderColor: 'border-electric-blue',
    bgColor: 'bg-electric-blue/5',
    iconColor: 'text-electric-blue',
    titleColor: 'text-electric-blue',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-cyber-yellow',
    bgColor: 'bg-cyber-yellow/10',
    iconColor: 'text-cyber-yellow',
    titleColor: 'text-black', // Black text for yellow background (WCAG AA)
  },
  tip: {
    icon: Lightbulb,
    borderColor: 'border-teal',
    bgColor: 'bg-teal/5',
    iconColor: 'text-teal',
    titleColor: 'text-teal',
  },
  danger: {
    icon: AlertCircle,
    borderColor: 'border-neon-pink',
    bgColor: 'bg-neon-pink/5',
    iconColor: 'text-neon-pink',
    titleColor: 'text-neon-pink',
  },
};

export default function Callout({
  type = 'info',
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'border-brutal-thick rounded-brutal p-brutal-md my-brutal-md',
        config.borderColor,
        config.bgColor,
        className
      )}
      role="note"
      aria-label={`${type} callout`}
    >
      <div className="flex gap-3">
        <Icon className={cn('w-6 h-6 flex-shrink-0 mt-0.5', config.iconColor)} />
        <div className="flex-1">
          {title && (
            <h4
              className={cn('font-bold mb-2', config.titleColor)}
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px' }}
            >
              {title}
            </h4>
          )}
          <div
            className="text-body-small text-brutalist-text-light"
            style={{ lineHeight: '1.6' }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
