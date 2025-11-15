/**
 * ReadingProgressBar - Shows reading progress as user scrolls through article
 * @component
 * @category Blog Components
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;

      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true });

    // Initial calculation
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <>
      {/* Desktop version - top fixed bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-electric-blue via-deep-purple to-neon-pink"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Mobile version - bottom fixed indicator */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <div className="relative w-16 h-16">
          {/* Background circle */}
          <svg className="w-16 h-16 -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="url(#progress-gradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-100"
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0D7EFF" />
                <stop offset="50%" stopColor="#7209B7" />
                <stop offset="100%" stopColor="#FF006E" />
              </linearGradient>
            </defs>
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-brutalist-text-primary font-heading">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
