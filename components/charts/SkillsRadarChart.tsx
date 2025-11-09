'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useTheme } from 'next-themes';

export interface SkillData {
  skill: string;
  value: number;
  fullMark: number;
}

interface TooltipPayload {
  value: number;
  name: string;
  dataKey: string;
  payload: SkillData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

interface SkillsRadarChartProps {
  className?: string;
  animated?: boolean;
  delay?: number;
}

export default function SkillsRadarChart({
  className = '',
  animated = true,
  delay = 0,
}: SkillsRadarChartProps) {
  const t = useTranslations('journey');
  const { theme } = useTheme();

  // Skills data according to PRD specifications
  const skillsData: SkillData[] = [
    {
      skill: t('skills.productManagement'),
      value: 95,
      fullMark: 100,
    },
    {
      skill: t('skills.frontendDev'),
      value: 85,
      fullMark: 100,
    },
    {
      skill: t('skills.backendDev'),
      value: 80,
      fullMark: 100,
    },
    {
      skill: t('skills.uiuxDesign'),
      value: 90,
      fullMark: 100,
    },
    {
      skill: t('skills.businessStrategy'),
      value: 85,
      fullMark: 100,
    },
    {
      skill: t('skills.technicalWriting'),
      value: 75,
      fullMark: 100,
    },
  ];

  // Neobrutalist color scheme
  const isDark = theme === 'dark';
  const fillColor = isDark ? '#5CB3FF' : '#1E90FF'; // primary light/primary (Electric Blue)
  const strokeColor = '#000000'; // black borders
  const gridColor = isDark ? '#4A5568' : '#CBD5E0'; // subtle grid
  const textColor = isDark ? '#E2E8F0' : '#1A202C'; // text

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="brutal-card p-3 border-4 border-black shadow-brutal">
          <p className="text-sm font-bold">{payload[0].payload.skill}</p>
          <p className="text-lg font-black text-primary">
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  const chartContent = (
    <div className={`brutal-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-heading font-black">
          {t('skills.title')}
        </h3>
        <div className="px-3 py-1 bg-primary/20 border-2 border-primary rounded-brutal text-sm font-bold">
          {t('skills.badge')}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={skillsData}>
          {/* Neobrutalist thick grid */}
          <PolarGrid
            stroke={gridColor}
            strokeWidth={2}
            strokeDasharray="0"
          />

          {/* Axis labels with custom styling */}
          <PolarAngleAxis
            dataKey="skill"
            tick={{
              fill: textColor,
              fontSize: 12,
              fontWeight: 'bold',
              fontFamily: 'var(--font-heading)',
            }}
            stroke={strokeColor}
            strokeWidth={2}
          />

          {/* Radius axis (percentage scale) */}
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{
              fill: textColor,
              fontSize: 10,
              fontWeight: 'bold',
            }}
            stroke={strokeColor}
            strokeWidth={2}
          />

          {/* Radar area with neobrutalist styling */}
          <Radar
            name="Skills"
            dataKey="value"
            stroke={strokeColor}
            fill={fillColor}
            fillOpacity={0.6}
            strokeWidth={4}
            dot={{
              r: 6,
              fill: fillColor,
              stroke: strokeColor,
              strokeWidth: 3,
            }}
            activeDot={{
              r: 8,
              fill: fillColor,
              stroke: strokeColor,
              strokeWidth: 4,
            }}
          />

          {/* Custom tooltip */}
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 bg-brutalist-text-light/5 dark:bg-brutalist-text-dark/5 rounded-brutal border-2 border-brutalist-border"
          >
            <div className="w-3 h-3 rounded-full bg-primary border-2 border-black" />
            <span className="text-xs font-bold truncate">{skill.skill}</span>
            <span className="text-xs font-black text-primary ml-auto">
              {skill.value}%
            </span>
          </div>
        ))}
      </div>

      {/* Additional info */}
      <p className="mt-4 text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 text-center">
        {t('skills.description')}
      </p>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.6,
          delay,
          type: 'spring',
          stiffness: 100,
        }}
      >
        {chartContent}
      </motion.div>
    );
  }

  return chartContent;
}
