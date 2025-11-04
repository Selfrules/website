'use client';

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

const journeyData: JourneyData[] = [
  {
    id: '1',
    date: '2024',
    company: 'Current',
    role: 'Senior Product Manager',
    description: 'Leading product strategy and innovation for AI-powered platforms',
    achievements: [
      'Reduced page load time by 78% through systematic optimization',
      'Shipped 3 major products impacting 5M+ users',
      'Established data-driven product culture',
    ],
    technologies: ['AI/ML', 'React', 'Node.js', 'PostgreSQL'],
    highlight: true,
    icon: <Rocket className="w-5 h-5" />,
    metrics: {
      impact: 'User Growth',
      value: '+340%',
    },
  },
  {
    id: '2',
    date: '2022-2023',
    company: 'TechCorp',
    role: 'Product Manager',
    description: 'Transitioned from development to product management, bringing technical depth to product decisions',
    achievements: [
      'Led cross-functional team of 12 engineers and designers',
      'Launched payment platform processing $10M+ monthly',
      'Reduced customer churn by 45% through UX improvements',
    ],
    technologies: ['Python', 'AWS', 'Stripe API', 'Analytics'],
    icon: <Target className="w-5 h-5" />,
    metrics: {
      impact: 'Revenue Impact',
      value: '$2.5M ARR',
    },
  },
  {
    id: '3',
    date: '2020-2022',
    company: 'StartupXYZ',
    role: 'Full-Stack Developer',
    description: 'Failed forward: learned that perfect code means nothing without product-market fit',
    achievements: [
      'Built MVP that validated core hypothesis in 6 weeks',
      'Implemented CI/CD reducing deployment time by 80%',
      'Learned the hard way: users don\'t care about your tech stack',
    ],
    technologies: ['TypeScript', 'Next.js', 'GraphQL', 'Docker'],
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: '4',
    date: '2018-2020',
    company: 'DesignStudio',
    role: 'UI/UX Designer',
    description: 'Started as a designer, discovered I was better at understanding problems than making things pretty',
    achievements: [
      'Designed interfaces for 20+ client projects',
      'Increased conversion rates by average of 35%',
      'Realized my strength was in systems thinking, not pixels',
    ],
    technologies: ['Figma', 'Sketch', 'Principle', 'User Research'],
    icon: <Lightbulb className="w-5 h-5" />,
  },
];

export default function Journey() {
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
                         border-2 border-secondary rounded-brutal text-secondary
                         font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Il mio percorso</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-display-2 font-heading font-black mb-4">
              Dal fallimento al
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ml-3">
                successo
              </span>
            </h2>
            <p className="text-xl text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 max-w-2xl mx-auto">
              Ogni fallimento mi ha insegnato qualcosa. Ogni successo mi ha ricordato quanto ancora devo imparare.
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
                Pronto per il prossimo capitolo?
              </h3>
              <p className="text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                Costruiamo qualcosa di straordinario insieme.
              </p>
              <button className="px-8 py-3 bg-primary text-brutalist-text-light font-bold
                               border-brutal border-black rounded-brutal shadow-brutal
                               hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1
                               transition-all">
                Parliamone →
              </button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}