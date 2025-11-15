'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Code, Rocket, Palette, TrendingUp, FileText, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

interface SkillsMatrixProps {
  className?: string;
  animated?: boolean;
  delay?: number;
}

export default function SkillsMatrix({
  className = '',
  animated = true,
  delay = 0,
}: SkillsMatrixProps) {
  const t = useTranslations('journey');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Organize skills by category with color-coding
  // Design = Electric Blue, Development = Slate Blue, PM/Strategy = Deep Navy
  const skillCategories: SkillCategory[] = [
    {
      id: 'design',
      title: 'UI/UX Design',
      icon: <Palette className="w-5 h-5" />,
      skills: [
        'User Interface',
        'User Experience',
        'Wireframing',
        'Prototyping',
        'Design Systems',
        'Accessibility',
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: <Code className="w-5 h-5" />,
      skills: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Responsive Design',
      ],
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: <Code className="w-5 h-5" />,
      skills: [
        'Node.js',
        'API Design',
        'Database Design',
        'PostgreSQL',
        'Authentication',
        'REST & GraphQL',
      ],
    },
    {
      id: 'product',
      title: 'Product Management',
      icon: <Rocket className="w-5 h-5" />,
      skills: [
        'Product Strategy',
        'Roadmapping',
        'User Research',
        'Stakeholder Management',
        'Prioritization',
        'Business Case Development',
      ],
    },
    {
      id: 'business',
      title: 'Business Strategy',
      icon: <TrendingUp className="w-5 h-5" />,
      skills: [
        'Market Analysis',
        'Competitive Research',
        'Business Modeling',
        'Product Marketing',
        'Go-to-Market Strategy',
        'Metrics & Analytics',
      ],
    },
    {
      id: 'communication',
      title: 'Communication & Leadership',
      icon: <Users className="w-5 h-5" />,
      skills: [
        'Technical Writing',
        'Documentation',
        'Team Leadership',
        'Cross-functional Collaboration',
        'Presentation Skills',
        'Mentoring',
      ],
    },
  ];

  // Get color based on category
  const getCategoryColor = (categoryId: string) => {
    if (categoryId === 'design') return 'bg-primary text-white';
    if (categoryId === 'frontend' || categoryId === 'backend') return 'bg-secondary text-white';
    return 'bg-accent text-white'; // PM, business, communication
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Desktop version: Static display with all skills visible
  const DesktopView = () => (
    <div className="hidden md:block">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <motion.article
            key={category.id}
            initial={animated ? { opacity: 0, y: 20 } : false}
            whileInView={animated ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.4,
              delay: delay + index * 0.1,
              type: 'spring',
              stiffness: 100,
            }}
            className="brutal-card overflow-hidden"
          >
            {/* Category header with color-coding */}
            <header className={`flex items-center gap-3 p-6 border-b-4 border-black ${getCategoryColor(category.id)}`}>
              <div className="text-white">
                {category.icon}
              </div>
              <h3 className="text-lg font-bold">{category.title}</h3>
            </header>

            {/* Skills content */}
            <div className="p-6">

              {/* Skills list as badges */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex px-3 py-1 bg-white border-2 border-black rounded-md text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );

  // Mobile version: Expandable toggle cards
  const MobileView = () => (
    <div className="md:hidden space-y-4">
      {skillCategories.map((category, index) => {
        const isExpanded = expandedCategory === category.id;

        return (
          <motion.article
            key={category.id}
            initial={animated ? { opacity: 0, y: 20 } : false}
            whileInView={animated ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.4,
              delay: delay + index * 0.1,
            }}
          >
            <div className="brutal-card overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full flex items-center justify-between p-4 ${getCategoryColor(category.id)}`}
                aria-expanded={isExpanded}
                aria-controls={`skills-${category.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-white">
                    {category.icon}
                  </div>
                  <h3 className="text-base font-bold">{category.title}</h3>
                </div>

                {/* Expand/collapse icon */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-white"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              {/* Expandable skills list */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    id={`skills-${category.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t-4 border-brutalist-border">
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex px-3 py-1 bg-white border-2 border-black rounded-md text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.article>
        );
      })}
    </div>
  );

  return (
    <section className={cn('brutal-card p-6', className)}>
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-heading font-black">
          {t('skills.title')}
        </h2>
        <div className="px-3 py-1 bg-primary/20 border-2 border-primary rounded-brutal text-sm font-bold">
          {t('skills.badge')}
        </div>
      </div>

      <p className="text-brutalist-text-light/70 mb-6">
        {t('skills.description')}
      </p>

      {/* Render desktop or mobile version */}
      <DesktopView />
      <MobileView />
    </section>
  );
}
