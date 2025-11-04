'use client';

import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { Badge } from '@/components/ui/Badge';
import { ScrollAnimation, ScrollStagger } from '@/components/animations/ScrollAnimations';
import { TiltEffect, ShadowLift } from '@/components/animations/HoverEffects';
import DotPattern from '@/components/patterns/DotPattern';
import { Github, ExternalLink, TrendingUp, Users, Zap, Code2 } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  metrics?: {
    users?: string;
    performance?: string;
    impact?: string;
  };
  links?: {
    github?: string;
    live?: string;
    case?: string;
  };
  featured?: boolean;
  category: 'product' | 'development' | 'design';
  color: 'primary' | 'secondary' | 'accent';
}

const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Analytics Platform',
    description: 'Built a real-time analytics dashboard that reduced decision time from days to minutes. Integrated ML models for predictive insights.',
    technologies: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
    metrics: {
      users: '50K+ daily',
      performance: '200ms response',
      impact: '+45% efficiency',
    },
    links: {
      live: 'https://example.com',
      case: '/case-studies/analytics-platform',
    },
    featured: true,
    category: 'product',
    color: 'primary',
  },
  {
    id: '2',
    title: 'Payment Gateway Integration',
    description: 'Designed and implemented secure payment processing handling $10M+ monthly transactions.',
    technologies: ['Node.js', 'Stripe', 'Redis', 'Docker'],
    metrics: {
      impact: '99.9% uptime',
      performance: '<100ms latency',
    },
    links: {
      github: 'https://github.com',
    },
    category: 'development',
    color: 'secondary',
  },
  {
    id: '3',
    title: 'E-commerce Platform Redesign',
    description: 'Complete UX overhaul resulting in 340% increase in conversion rate.',
    technologies: ['Next.js', 'Tailwind', 'Framer Motion'],
    metrics: {
      impact: '340% CVR increase',
      users: '2M+ monthly',
    },
    links: {
      live: 'https://example.com',
    },
    category: 'design',
    color: 'accent',
  },
  {
    id: '4',
    title: 'Developer Tools CLI',
    description: 'Open-source CLI tool that automates repetitive development tasks.',
    technologies: ['TypeScript', 'Node.js'],
    metrics: {
      users: '5K+ stars',
    },
    links: {
      github: 'https://github.com',
    },
    category: 'development',
    color: 'primary',
  },
  {
    id: '5',
    title: 'Mobile-First SaaS',
    description: 'Built a mobile-first SaaS platform for field service management.',
    technologies: ['React Native', 'AWS', 'GraphQL'],
    metrics: {
      users: '10K+ businesses',
    },
    links: {
      live: 'https://example.com',
    },
    category: 'product',
    color: 'secondary',
  },
];

const categoryIcons = {
  product: <Zap className="w-5 h-5" />,
  development: <Code2 className="w-5 h-5" />,
  design: <Users className="w-5 h-5" />,
};

export default function Projects() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <DotPattern
        className="absolute inset-0"
        color="text-secondary/5"
        size="md"
        opacity={0.5}
      />

      <div className="brutal-container relative z-10">
        {/* Section Header */}
        <ScrollAnimation animation="fadeInUp">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10
                         border-2 border-accent rounded-brutal text-accent
                         font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-display-2 font-heading font-black mb-4">
              Progetti che
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent ml-3">
                fanno la differenza
              </span>
            </h2>
            <p className="text-xl text-brutalist-text-light/70 dark:text-brutalist-text-dark/70 max-w-2xl mx-auto">
              Dal concept al lancio. Ogni progetto racconta una storia di problemi risolti e vite migliorate.
            </p>
          </div>
        </ScrollAnimation>

        {/* Bento Grid */}
        <BentoGrid columns={3} gap="md" animated>
          {projects.map((project, index) => (
            <BentoGridItem
              key={project.id}
              colSpan={project.featured ? 2 : 1}
              rowSpan={project.featured ? 2 : 1}
              variant={project.color}
              hoverable
              animated
              delay={index * 0.1}
            >
              <TiltEffect maxTilt={10}>
                <div className="h-full flex flex-col">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant={project.color}
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      {categoryIcons[project.category]}
                      {project.category}
                    </Badge>
                    {project.featured && (
                      <span className="text-xs font-bold text-primary">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm lg:text-base text-brutalist-text-light/70
                              dark:text-brutalist-text-dark/70 mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div
                          key={key}
                          className="px-3 py-2 bg-white/50 dark:bg-black/20
                                   border border-current rounded-brutal"
                        >
                          <div className="text-xs opacity-70 capitalize">
                            {key}
                          </div>
                          <div className="text-sm font-bold">{value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-black/5 dark:bg-white/5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {project.links && (
                    <div className="flex gap-2 mt-auto pt-4 border-t border-current/10">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live</span>
                        </a>
                      )}
                      {project.links.case && (
                        <a
                          href={project.links.case}
                          className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity"
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span>Case Study</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </TiltEffect>
            </BentoGridItem>
          ))}
        </BentoGrid>

        {/* View All Projects */}
        <ScrollAnimation animation="fadeInUp" delay={0.5}>
          <div className="mt-12 text-center">
            <ShadowLift liftDistance={6}>
              <button className="inline-flex items-center gap-2 px-8 py-4
                               bg-white dark:bg-brutalist-surface-dark
                               text-brutalist-text-light dark:text-brutalist-text-dark
                               font-bold border-brutal border-black rounded-brutal shadow-brutal
                               hover:bg-secondary hover:text-white transition-colors">
                <span>Vedi tutti i progetti</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            </ShadowLift>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}