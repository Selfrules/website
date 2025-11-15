'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ReadingProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-brutalist-bg-light">
      {/* Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black" />

      {/* Progress bar */}
      <motion.div
        className="h-full bg-primary origin-left"
        style={{ scaleX }}
      />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black" />
    </div>
  );
}
