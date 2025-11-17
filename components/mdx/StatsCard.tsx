'use client';

import { Users, FileText, Clock, TrendingUp, BarChart3, LucideIcon } from 'lucide-react';

type IconName = 'users' | 'fileText' | 'clock' | 'trendingUp' | 'barChart';
type TrendType = 'positive' | 'negative' | 'neutral';
type ColorVariant = 'blue' | 'purple' | 'yellow' | 'pink' | 'teal';

interface StatsCardProps {
  icon: IconName;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    type: TrendType;
  };
  color?: ColorVariant;
}

interface StatsGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}

const iconMap: Record<IconName, LucideIcon> = {
  users: Users,
  fileText: FileText,
  clock: Clock,
  trendingUp: TrendingUp,
  barChart: BarChart3,
};

const colorMap: Record<ColorVariant, string> = {
  blue: 'bg-electric-blue',
  purple: 'bg-deep-purple',
  yellow: 'bg-cyber-yellow text-brutalist-text-primary',
  pink: 'bg-neon-pink',
  teal: 'bg-teal',
};

const trendColorMap: Record<TrendType, string> = {
  positive: 'bg-[#10B981] text-white',
  negative: 'bg-[#EF4444] text-white',
  neutral: 'bg-cyber-yellow text-brutalist-text-primary',
};

/**
 * StatsCard - Dashboard metric card for MDX articles
 * @component
 * @category MDX Components
 *
 * @example
 * ```mdx
 * <StatsGrid columns={3}>
 *   <StatsCard
 *     icon="users"
 *     label="Total Users"
 *     value="12,456"
 *     trend={{ value: "+23%", type: "positive" }}
 *     color="blue"
 *   />
 *   <StatsCard
 *     icon="trendingUp"
 *     label="Conversions"
 *     value="234"
 *     trend={{ value: "+34%", type: "positive" }}
 *     color="pink"
 *   />
 * </StatsGrid>
 * ```
 */
export function StatsCard({
  icon,
  label,
  value,
  trend,
  color = 'blue',
}: StatsCardProps) {
  const Icon = iconMap[icon];
  const iconColor = colorMap[color];

  return (
    <div className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-6">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 ${iconColor} text-white rounded-brutal border-2 border-black flex items-center justify-center`}
        >
          <Icon className="h-6 w-6" strokeWidth={2.5} />
        </div>
        {trend && (
          <span
            className={`px-2 py-1 ${trendColorMap[trend.type]} border-2 border-black rounded text-xs font-bold`}
          >
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-brutalist-text-tertiary text-sm mb-1 font-body">{label}</p>
      <p className="font-heading font-bold text-3xl text-brutalist-text-primary">{value}</p>
    </div>
  );
}

/**
 * StatsGrid - Grid layout wrapper for StatsCard components
 * @component
 * @category MDX Components
 *
 * @example
 * ```mdx
 * <StatsGrid columns={4}>
 *   <StatsCard ... />
 *   <StatsCard ... />
 * </StatsGrid>
 * ```
 */
export function StatsGrid({ children, columns = 4 }: StatsGridProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 my-8`}>
      {children}
    </div>
  );
}

export default StatsCard;
