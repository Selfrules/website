'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { fadeInUp } from '@/lib/animations';

interface BlogFiltersProps {
  categories: string[];
  tags: string[];
  selectedCategory: string | null;
  selectedTags: string[];
  onCategoryChange: (category: string | null) => void;
  onTagsChange: (tags: string[]) => void;
  onClearFilters: () => void;
}

export default function BlogFilters({
  categories,
  tags,
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagsChange,
  onClearFilters,
}: BlogFiltersProps) {
  const hasActiveFilters = selectedCategory !== null || selectedTags.length > 0;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Category Filters */}
      <div className="space-y-3">
        <h3 className="font-heading font-bold text-lg text-brutalist-text-light">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-4 py-2 border-4 border-black rounded-brutal font-heading font-bold text-sm transition-all ${
              selectedCategory === null
                ? 'bg-primary text-black shadow-brutal'
                : 'bg-white text-brutalist-text-light hover:shadow-brutal-sm'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 border-4 border-black rounded-brutal font-heading font-bold text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-black shadow-brutal'
                  : 'bg-white text-brutalist-text-light hover:shadow-brutal-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filters */}
      <div className="space-y-3">
        <h3 className="font-heading font-bold text-lg text-brutalist-text-light">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 border-2 border-black rounded-brutal-sm font-mono text-xs transition-all ${
                  isSelected
                    ? 'bg-secondary text-white shadow-brutal-sm'
                    : 'bg-white text-brutalist-text-light hover:shadow-brutal-xs'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters & Clear Button */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3 pt-3 border-t-4 border-black"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-sm text-brutalist-text-light">
              Active filters
            </h4>
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 px-3 py-1 bg-accent text-white border-2 border-black rounded-brutal-sm font-bold text-xs hover:shadow-brutal-xs transition-all"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <Badge variant="primary" size="sm">
                Category: {selectedCategory}
              </Badge>
            )}
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">
                #{tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
