import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';
import type { BadgeVariant } from './Badge';
import { ArrowRight, Award, LucideIcon } from 'lucide-react';

export interface ExperienceCardProps {
  /** Date or time period (e.g., "2021 - 2023") */
  date: string;
  /** Role or position title */
  role: string;
  /** Color theme for the card (matches Badge variants) */
  roleColor: BadgeVariant;
  /** Company or organization name */
  company: string;
  /** Brief description of the role/experience */
  description: string;
  /** List of key achievements or responsibilities */
  achievements?: string[];
  /** List of skills acquired or utilized */
  skills: string[];
  /** List of certifications earned (optional) */
  certifications?: Array<{
    name: string;
    icon?: LucideIcon;
  }>;
  /** Whether this is the current/active position */
  isCurrent?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ExperienceCard component for displaying work experience, education, or milestones
 *
 * A comprehensive card component that displays professional experience with:
 * - Date badge and role badge
 * - Company/organization name
 * - Description
 * - Achievements list with arrow icons
 * - Skills tags
 * - Optional certifications with icons
 *
 * Used in Journey/Timeline sections to showcase career progression.
 *
 * @component
 * @category Display
 *
 * @example
 * ```tsx
 * <ExperienceCard
 *   date="2021 - 2023"
 *   role="Senior Product Manager"
 *   roleColor="design"
 *   company="QubicaAMF"
 *   description="Led product strategy for bowling center management systems"
 *   achievements={[
 *     "Increased user engagement by 40%",
 *     "Launched 3 major features"
 *   ]}
 *   skills={["Product Strategy", "UX Design", "Data Analysis"]}
 *   certifications={[
 *     { name: "Certified Scrum Product Owner", icon: Award }
 *   ]}
 *   isCurrent
 * />
 * ```
 */
export const ExperienceCard = React.forwardRef<HTMLDivElement, ExperienceCardProps>(
  (
    {
      date,
      role,
      roleColor,
      company,
      description,
      achievements = [],
      skills,
      certifications = [],
      isCurrent = false,
      className,
      ...props
    },
    ref
  ) => {
    // Dynamic color classes for arrow icons based on roleColor
    const arrowColorClasses: Record<BadgeVariant, string> = {
      default: 'text-brutalist-text-primary',
      design: 'text-electric-blue',
      dev: 'text-teal',
      pm: 'text-deep-purple',
      tool: 'text-neon-pink',
      featured: 'text-cyber-yellow',
      primary: 'text-electric-blue',
      secondary: 'text-neon-pink',
      accent: 'text-cyber-yellow',
      outline: 'text-brutalist-text-primary',
    };

    // Dynamic color classes for certification badges
    const certificationColorClasses: Record<BadgeVariant, string> = {
      default: 'bg-white text-brutalist-text-primary',
      design: 'bg-electric-blue text-white',
      dev: 'bg-teal text-white',
      pm: 'bg-deep-purple text-white',
      tool: 'bg-neon-pink text-white',
      featured: 'bg-cyber-yellow text-dark',
      primary: 'bg-electric-blue text-white',
      secondary: 'bg-neon-pink text-white',
      accent: 'bg-cyber-yellow text-dark',
      outline: 'bg-white text-brutalist-text-primary',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-cream border-brutal border-black rounded-lg shadow-brutal p-5 md:p-6',
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg',
          isCurrent && 'bg-gradient-to-br from-electric-blue/5 to-transparent',
          className
        )}
        {...props}
      >
        {/* Date & Role Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-block px-3 py-1 bg-white border-2 border-black rounded shadow-brutal-sm text-brutalist-text-primary font-mono text-xs font-bold">
            {date}
          </span>
          <Badge variant={roleColor} size="sm">
            {role}
          </Badge>
          {isCurrent && (
            <Badge variant="outline" size="sm">
              Current
            </Badge>
          )}
        </div>

        {/* Company/Organization */}
        <h3 className="text-h3 mb-3 text-brutalist-text-primary">{company}</h3>

        {/* Description */}
        <p className="text-body-small md:text-body text-brutalist-text-secondary mb-4">
          {description}
        </p>

        {/* Achievements */}
        {achievements.length > 0 && (
          <ul className="mb-4 space-y-1.5">
            {achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-2 text-body-small text-brutalist-text-secondary">
                <ArrowRight
                  className={cn(
                    'w-4 h-4 flex-shrink-0 mt-0.5',
                    arrowColorClasses[roleColor]
                  )}
                />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Skills */}
        <div className="mb-3">
          <p className="text-xs font-bold mb-2 text-brutalist-text-primary font-heading">
            Skills:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white border-2 border-black rounded-sm text-xs text-brutalist-text-primary font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <p className="text-xs font-bold mb-2 text-brutalist-text-primary font-heading">
              Certifications:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {certifications.map((cert, i) => {
                const CertIcon = cert.icon || Award;
                return (
                  <span
                    key={i}
                    className={cn(
                      'px-2 py-1 border-2 border-black rounded-sm text-xs flex items-center gap-1 font-mono',
                      certificationColorClasses[roleColor]
                    )}
                  >
                    <CertIcon className="w-3 h-3" />
                    {cert.name}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

ExperienceCard.displayName = 'ExperienceCard';
