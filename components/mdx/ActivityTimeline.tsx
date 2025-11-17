'use client';

import { FileText, MessageCircle, Calendar, Users, Code, LucideIcon } from 'lucide-react';

type IconName = 'fileText' | 'messageCircle' | 'calendar' | 'users' | 'code';
type ColorVariant = 'blue' | 'pink' | 'purple' | 'yellow' | 'teal';

interface TimelineEvent {
  title: string;
  subtitle: string;
  timestamp: string;
  icon: IconName;
  color: ColorVariant;
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
  title?: string;
}

const iconMap: Record<IconName, LucideIcon> = {
  fileText: FileText,
  messageCircle: MessageCircle,
  calendar: Calendar,
  users: Users,
  code: Code,
};

const colorMap: Record<ColorVariant, string> = {
  blue: 'bg-electric-blue',
  pink: 'bg-neon-pink',
  purple: 'bg-deep-purple',
  yellow: 'bg-cyber-yellow text-brutalist-text-primary',
  teal: 'bg-teal',
};

/**
 * ActivityTimeline - Project timeline component for MDX articles
 * @component
 * @category MDX Components
 */
export default function ActivityTimeline({ events, title }: ActivityTimelineProps) {
  return (
    <div className="my-8 bg-white border-brutal border-black rounded-brutal shadow-brutal p-6">
      {title && (
        <h3 className="text-h3 font-heading font-bold mb-6 text-brutalist-text-primary">
          {title}
        </h3>
      )}
      <div className="space-y-6">
        {events.map((event, index) => {
          const Icon = iconMap[event.icon];
          const isLast = index === events.length - 1;

          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 ${colorMap[event.color]} text-white rounded-brutal border-2 border-black flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2.5} />
                </div>
                {!isLast && <div className="w-0.5 h-full bg-black/20 mt-2" />}
              </div>
              <div className="flex-1 pb-6">
                <p className="font-heading font-bold text-brutalist-text-primary mb-1">
                  {event.title}
                </p>
                <p className="text-sm text-brutalist-text-secondary mb-2">{event.subtitle}</p>
                <p className="text-xs text-brutalist-text-tertiary">{event.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
