'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { ArrowRight, Award, Code, Palette, Rocket } from 'lucide-react';

interface Milestone {
  id: string;
  dateKey: string;
  roleKey: string;
  roleColor: 'blue' | 'pink' | 'yellow' | 'purple';
  companyKey: string;
  descriptionKey: string;
  achievementsKeys: string[];
  skillsKeys: string[];
  certificationsKeys?: string[];
  isCurrent?: boolean;
  icon: any;
}

export default function Journey() {
  const t = useTranslations('journey');

  const milestones: Milestone[] = [
    {
      id: '1',
      dateKey: 'experiences.designer.date',
      roleKey: 'experiences.designer.role',
      roleColor: 'purple',
      companyKey: 'experiences.designer.company',
      descriptionKey: 'experiences.designer.description',
      achievementsKeys: ['experiences.designer.achievements.1', 'experiences.designer.achievements.2', 'experiences.designer.achievements.3'],
      skillsKeys: ['experiences.designer.technologies.1', 'experiences.designer.technologies.2', 'experiences.designer.technologies.3', 'experiences.designer.technologies.4', 'experiences.designer.technologies.5'],
      icon: Palette,
    },
    {
      id: '2',
      dateKey: 'experiences.developer.date',
      roleKey: 'experiences.developer.role',
      roleColor: 'yellow',
      companyKey: 'experiences.developer.company',
      descriptionKey: 'experiences.developer.description',
      achievementsKeys: ['experiences.developer.achievements.1', 'experiences.developer.achievements.2', 'experiences.developer.achievements.3'],
      skillsKeys: ['experiences.developer.technologies.1', 'experiences.developer.technologies.2', 'experiences.developer.technologies.3', 'experiences.developer.technologies.4', 'experiences.developer.technologies.5', 'experiences.developer.technologies.6'],
      certificationsKeys: ['experiences.developer.certifications.1'],
      icon: Code,
    },
    {
      id: '3',
      dateKey: 'experiences.po.date',
      roleKey: 'experiences.po.role',
      roleColor: 'pink',
      companyKey: 'experiences.po.company',
      descriptionKey: 'experiences.po.description',
      achievementsKeys: ['experiences.po.achievements.1', 'experiences.po.achievements.2', 'experiences.po.achievements.3'],
      skillsKeys: ['experiences.po.technologies.1', 'experiences.po.technologies.2', 'experiences.po.technologies.3', 'experiences.po.technologies.4', 'experiences.po.technologies.5', 'experiences.po.technologies.6'],
      certificationsKeys: ['experiences.po.certifications.1', 'experiences.po.certifications.2'],
      icon: Rocket,
    },
    {
      id: '4',
      dateKey: 'experiences.pm.date',
      roleKey: 'experiences.pm.role',
      roleColor: 'blue',
      companyKey: 'experiences.pm.company',
      descriptionKey: 'experiences.pm.description',
      achievementsKeys: ['experiences.pm.achievements.1', 'experiences.pm.achievements.2', 'experiences.pm.achievements.3', 'experiences.pm.achievements.4'],
      skillsKeys: ['experiences.pm.technologies.1', 'experiences.pm.technologies.2', 'experiences.pm.technologies.3', 'experiences.pm.technologies.4', 'experiences.pm.technologies.5', 'experiences.pm.technologies.6', 'experiences.pm.technologies.7'],
      certificationsKeys: ['experiences.pm.certifications.1', 'experiences.pm.certifications.2', 'experiences.pm.certifications.3', 'experiences.pm.certifications.4'],
      isCurrent: true,
      icon: Award,
    },
  ];

  return (
    <section id="journey" className="bg-white py-16 md:py-24 border-b-4 border-black relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-5 w-20 h-20 bg-cyber-yellow border-3 border-black rotate-12 opacity-20" />
      <div className="absolute bottom-20 left-5 w-16 h-16 bg-neon-pink border-3 border-black rounded-full opacity-20" />

      <div className="container max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <NeoBadge color="purple">{t('badge')}</NeoBadge>
          </div>
          <h2 className="text-h1 mb-4 md:mb-6 text-brutalist-text-primary">
            {t('title')}{' '}
            <span className="inline-block relative z-10">
              {t('titleHighlight')}
              <span className="absolute -bottom-1 left-0 w-full h-2 bg-cyber-yellow -rotate-1 z-[-1]" />
            </span>
          </h2>
          <p className="text-body text-brutalist-text-secondary max-w-[700px] mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline - Mobile First, Vertical */}
        <div className="relative">
          {/* Connecting Line - Mobile: Left aligned, Desktop: Center */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-timeline md:-translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-12 md:space-y-20">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.id}
                  className="relative"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Dot Indicator */}
                  <div
                    className={`
                      absolute left-0 md:left-1/2 top-8 md:-translate-x-1/2
                      rounded-full border-4 border-black z-10 flex items-center justify-center
                      ${milestone.isCurrent
                        ? 'w-12 h-12 bg-electric-blue ring-8 ring-electric-blue/20'
                        : 'w-10 h-10 bg-white'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${milestone.isCurrent ? 'text-white' : 'text-brutalist-text-primary'}`} />
                  </div>

                  {/* Content Card - Mobile: Full width with left padding, Desktop: Half width */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <div
                      className={`
                        bg-cream border-4 border-black rounded-lg shadow-brutal p-5 md:p-6
                        transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg
                        ${milestone.isCurrent ? 'bg-gradient-to-br from-electric-blue/5 to-transparent' : ''}
                      `}
                    >
                      {/* Date & Role */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-block px-3 py-1 bg-white border-3 border-black rounded shadow-brutal text-brutalist-text-primary font-mono text-xs font-bold">
                          {t(milestone.dateKey)}
                        </span>
                        <NeoBadge color={milestone.roleColor} className="px-3 py-1 text-xs">
                          {t(milestone.roleKey)}
                        </NeoBadge>
                        {milestone.isCurrent && (
                          <NeoBadge color="neutral" className="px-3 py-1 text-xs">
                            {t('current')}
                          </NeoBadge>
                        )}
                      </div>

                      {/* Company */}
                      <h3 className="text-h3 mb-3 text-brutalist-text-primary">
                        {t(milestone.companyKey)}
                      </h3>

                      {/* Description */}
                      <p className="text-body-small md:text-body text-brutalist-text-secondary mb-4">
                        {t(milestone.descriptionKey)}
                      </p>

                      {/* Achievements */}
                      {milestone.achievementsKeys.length > 0 && (
                        <ul className="mb-4 space-y-1.5">
                          {milestone.achievementsKeys.map((achievementKey, i) => (
                            <li key={i} className="flex items-start gap-2 text-body-small text-brutalist-text-secondary">
                              <ArrowRight
                                className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                  milestone.roleColor === 'blue' ? 'text-electric-blue' :
                                  milestone.roleColor === 'pink' ? 'text-neon-pink' :
                                  milestone.roleColor === 'yellow' ? 'text-cyber-yellow' : 'text-deep-purple'
                                }`}
                              />
                              <span>{t(achievementKey)}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Skills */}
                      <div className="mb-3">
                        <p className="text-xs font-bold mb-2 text-brutalist-text-primary font-heading">
                          {t('skillsLabel')}:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {milestone.skillsKeys.map((skillKey, i) => (
                            <span key={i} className="px-2 py-1 bg-white border-3 border-black rounded-sm text-xs text-brutalist-text-primary font-mono">
                              {t(skillKey)}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Certifications */}
                      {milestone.certificationsKeys && milestone.certificationsKeys.length > 0 && (
                        <div>
                          <p className="text-xs font-bold mb-2 text-brutalist-text-primary font-heading">
                            {t('certificationsLabel')}:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {milestone.certificationsKeys.map((certKey, i) => (
                              <span
                                key={i}
                                className={`px-2 py-1 border-3 border-black rounded-sm text-xs flex items-center gap-1 font-mono ${
                                  milestone.roleColor === 'blue' ? 'bg-electric-blue text-white' :
                                  milestone.roleColor === 'pink' ? 'bg-neon-pink text-white' :
                                  milestone.roleColor === 'yellow' ? 'bg-cyber-yellow text-brutalist-text-primary' : 'bg-deep-purple text-white'
                                }`}
                              >
                                <Award className="w-3 h-3" />
                                {t(certKey)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* End Message */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-electric-blue border-4 border-black rounded-lg shadow-brutal px-6 py-4 rotate-1">
            <p className="text-body text-white font-heading font-bold">
              {t('endMessage')} 💪
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}