'use client';

import { useTranslations } from 'next-intl';
import { Timeline, TimelineItem } from '@/components/ui/Timeline';
import { Badge } from '@/components/ui/Badge';
import { ScrollAnimation } from '@/components/animations/ScrollAnimations';
import GridPattern from '@/components/patterns/GridPattern';
import { Briefcase, Rocket, Code, Lightbulb, Target, TrendingUp } from 'lucide-react';

interface JourneyData {
  id: string;
  date: string;
  company: string;
  role: string;
  description: string;
  achievements: string[];
  technologies: string[];
  highlight?: boolean;
  icon?: React.ReactNode;
  metrics?: {
    impact: string;
    value: string;
  };
}

export default function Journey() {
  const t = useTranslations('journey');

  const journeyData: JourneyData[] = [
    {
      id: '4',
      date: t('experiences.pm.date'),
      company: t('experiences.pm.company'),
      role: t('experiences.pm.role'),
      description: t('experiences.pm.description'),
      achievements: [
        t('experiences.pm.achievements.1'),
        t('experiences.pm.achievements.2'),
        t('experiences.pm.achievements.3'),
      ],
      technologies: [
        t('experiences.pm.technologies.1'),
        t('experiences.pm.technologies.2'),
        t('experiences.pm.technologies.3'),
        t('experiences.pm.technologies.4'),
      ],
      highlight: true,
      icon: <Rocket className="w-5 h-5" />,
      metrics: {
        impact: t('experiences.pm.metrics.impact'),
        value: t('experiences.pm.metrics.value'),
      },
    },
    {
      id: '3',
      date: t('experiences.po.date'),
      company: t('experiences.po.company'),
      role: t('experiences.po.role'),
      description: t('experiences.po.description'),
      achievements: [
        t('experiences.po.achievements.1'),
        t('experiences.po.achievements.2'),
        t('experiences.po.achievements.3'),
      ],
      technologies: [
        t('experiences.po.technologies.1'),
        t('experiences.po.technologies.2'),
        t('experiences.po.technologies.3'),
        t('experiences.po.technologies.4'),
      ],
      icon: <Target className="w-5 h-5" />,
      metrics: {
        impact: t('experiences.po.metrics.impact'),
        value: t('experiences.po.metrics.value'),
      },
    },
    {
      id: '2',
      date: t('experiences.dev.date'),
      company: t('experiences.dev.company'),
      role: t('experiences.dev.role'),
      description: t('experiences.dev.description'),
      achievements: [
        t('experiences.dev.achievements.1'),
        t('experiences.dev.achievements.2'),
        t('experiences.dev.achievements.3'),
      ],
      technologies: [
        t('experiences.dev.technologies.1'),
        t('experiences.dev.technologies.2'),
        t('experiences.dev.technologies.3'),
        t('experiences.dev.technologies.4'),
      ],
      icon: <Code className="w-5 h-5" />,
    },
    {
      id: '1',
      date: t('experiences.designer.date'),
      company: t('experiences.designer.company'),
      role: t('experiences.designer.role'),
      description: t('experiences.designer.description'),
      achievements: [
        t('experiences.designer.achievements.1'),
        t('experiences.designer.achievements.2'),
        t('experiences.designer.achievements.3'),
      ],
      technologies: [
        t('experiences.designer.technologies.1'),
        t('experiences.designer.technologies.2'),
        t('experiences.designer.technologies.3'),
        t('experiences.designer.technologies.4'),
      ],
      icon: <Lightbulb className="w-5 h-5" />,
    },
  ];
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white to-primary/5 dark:from-brutalist-bg-dark dark:to-primary/10">
      {/* Background Pattern */}
      <GridPattern
        variant="grid"
        className="absolute inset-0"
        opacity={0.03}
        size="lg"
      />

      <div className="brutal-container relative z-10">
        {/* Section Header */}
        <ScrollAnimation animation="fadeInUp">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10
                         border-4 border-secondary rounded-brutal text-secondary
                         font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">{t('badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-display-2 font-heading font-black mb-4">
              {t('title')}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ml-3">
                {t('titleHighlight')}
              </span>
            </h2>
            <p className="text-xl text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimation>

        {/* Timeline */}
        <Timeline orientation="vertical" animated>
          {journeyData.map((item, index) => (
            <TimelineItem
              key={item.id}
              date={item.date}
              title={item.role}
              icon={item.icon}
              variant={item.highlight ? 'primary' : 'default'}
              active={item.highlight}
              animated={true}
              delay={index * 0.1}
            >
              <div className="space-y-4">
                {/* Company */}
                <div className="text-lg font-bold text-secondary">
                  {item.company}
                </div>

                {/* Description */}
                <p className="text-brutalist-text-light/80 dark:text-brutalist-text-dark/80">
                  {item.description}
                </p>

                {/* Metrics */}
                {item.metrics && (
                  <div className="flex items-center gap-4 p-3 bg-primary/10 rounded-brutal border-2 border-primary">
                    <div className="text-2xl font-bold text-primary">
                      {item.metrics.value}
                    </div>
                    <div className="text-sm text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                      {item.metrics.impact}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                <ul className="space-y-2">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant={item.highlight ? 'primary' : 'outline'}
                      size="sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </TimelineItem>
          ))}
        </Timeline>

        {/* Call to Action */}
        <ScrollAnimation animation="fadeInUp" delay={0.5}>
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 bg-white dark:bg-brutalist-surface-dark
                         border-brutal border-black rounded-brutal shadow-brutal">
              <h3 className="text-2xl font-bold">
                {t('cta.title')}
              </h3>
              <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                {t('cta.subtitle')}
              </p>
              <button className="px-8 py-3 bg-primary text-brutalist-text-light font-bold
                               border-brutal border-black rounded-brutal shadow-brutal
                               hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1
                               transition-all">
                {t('cta.button')}
              </button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}