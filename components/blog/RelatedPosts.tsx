'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { BlogPost } from '@/lib/blog/mdx';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface RelatedPostsProps {
  posts: BlogPost[];
  locale: string;
  className?: string;
}

export default function RelatedPosts({
  posts,
  locale,
  className = '',
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className={`${className}`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="inline-block px-4 py-2 bg-electric-blue border-4 border-black rounded-brutal shadow-brutal mb-4">
            <h2 className="font-heading font-black text-h3 text-white">
              Related articles
            </h2>
          </div>
          <p className="text-brutalist-text-secondary text-body-lg max-w-2xl">
            Continue exploring similar topics and deepen your understanding
          </p>
        </motion.div>

        {/* Related Posts Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={fadeInUp}>
              <BlogCard post={post} locale={locale} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
