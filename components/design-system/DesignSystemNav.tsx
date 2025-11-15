'use client';

import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface NavSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface DesignSystemNavProps {
  sections: NavSection[];
}

/**
 * Design System navigation component with automatic scroll tracking
 *
 * Uses Intersection Observer to automatically update the active section
 * based on which section is currently visible in the viewport.
 *
 * @component
 * @category Design System
 */
export function DesignSystemNav({ sections }: DesignSystemNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  useEffect(() => {
    // Create Intersection Observer to track which section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px', // Trigger when section reaches 20% from top
        threshold: 0,
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-32 self-start">
      <nav className="bg-white border-brutal border-black rounded-brutal shadow-brutal p-4">
        <p className="text-xs font-bold text-brutalist-text-tertiary uppercase mb-3 font-heading">
          Navigation
        </p>
        <ul className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <li key={section.id}>
                <button
                  onClick={() => handleNavClick(section.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-electric-blue text-white'
                      : 'text-brutalist-text-secondary hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
