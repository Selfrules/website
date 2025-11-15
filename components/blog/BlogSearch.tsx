'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { fadeInUp } from '@/lib/animations';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultsCount?: number;
}

export default function BlogSearch({
  value,
  onChange,
  placeholder = 'Search articles...',
  resultsCount,
}: BlogSearchProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <div
        className={`relative transition-all ${
          isFocused
            ? 'ring-4 ring-primary ring-offset-2 rounded-brutal'
            : ''
        }`}
      >
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Search className="w-5 h-5 text-brutalist-text-light/60" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-white border-4 border-black rounded-brutal shadow-brutal text-brutalist-text-light placeholder:text-brutalist-text-light/40 font-body text-body focus:outline-none transition-all"
          aria-label="Search blog posts"
        />

        {/* Clear Button */}
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-brutalist-text-light" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <AnimatePresence>
        {value && resultsCount !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-brutalist-text-light/70"
          >
            {resultsCount === 0 ? (
              <span>No articles found</span>
            ) : (
              <span>
                Found {resultsCount} article{resultsCount !== 1 ? 's' : ''}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
