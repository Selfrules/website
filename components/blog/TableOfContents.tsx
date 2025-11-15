'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export default function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the article
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = Array.from(
      article.querySelectorAll('h2, h3')
    ) as HTMLHeadingElement[];

    const headingData = headingElements.map((heading, index) => {
      // Ensure the heading has an ID
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      return {
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.substring(1)),
      };
    });

    setHeadings(headingData);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 1.0,
      }
    );

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.nav
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={`sticky top-24 bg-white dark:bg-surface-dark border-4 border-black rounded-brutal shadow-brutal p-6 ${className}`}
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b-4 border-black">
        <List className="w-5 h-5 text-primary" />
        <h2 className="font-heading font-bold text-lg text-brutalist-text-light dark:text-brutalist-text-dark">
          Table of contents
        </h2>
      </div>

      <ul className="space-y-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isH3 = heading.level === 3;

          return (
            <li
              key={heading.id}
              className={`${isH3 ? 'ml-4' : ''}`}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left w-full px-3 py-2 rounded-brutal-sm border-2 border-black text-sm transition-all ${
                  isActive
                    ? 'bg-primary text-black font-bold shadow-brutal-xs'
                    : 'bg-transparent text-brutalist-text-light dark:text-brutalist-text-dark hover:bg-gray-100 dark:hover:bg-brutalist-text-light/10'
                }`}
              >
                {heading.text}
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
