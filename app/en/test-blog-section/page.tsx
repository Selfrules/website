'use client';

import React from 'react';
import BlogNew from '@/components/sections/BlogNew';
import type { BlogPost } from '@/lib/blog/mdx';

export default function TestBlogSectionPage() {
  const handleArticleClick = (article: BlogPost) => {
    console.log('Article clicked:', article);
    alert(`Clicked on: ${article.title}`);
  };

  const handleViewAllClick = () => {
    console.log('View All clicked');
    alert('View All Articles clicked!');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Test Header */}
      <div className="bg-dark text-white py-6 border-b-brutal border-black">
        <div className="container mx-auto px-6">
          <h1 className="text-h2 font-heading">BlogSection Component Test</h1>
          <p className="text-body-sm text-white/80 mt-2 font-body">
            Testing BlogSection component from Designprototipo with design token mapping
          </p>
        </div>
      </div>

      {/* Blog Section Component */}
      <BlogNew
        onArticleClick={handleArticleClick}
        onViewAllClick={handleViewAllClick}
      />

      {/* Test Footer */}
      <div className="bg-dark text-white py-8 border-t-brutal border-black">
        <div className="container mx-auto px-6">
          <h3 className="text-h4 mb-4 font-heading">Design Tokens Used:</h3>
          <ul className="space-y-2 text-body-sm font-body">
            <li>✓ <code className="bg-white/10 px-2 py-1 rounded">bg-cream</code> - Section background</li>
            <li>✓ <code className="bg-white/10 px-2 py-1 rounded">bg-gradient-blog-hero</code> - Featured post gradient</li>
            <li>✓ <code className="bg-white/10 px-2 py-1 rounded">border-brutal</code> - 4px solid borders</li>
            <li>✓ <code className="bg-white/10 px-2 py-1 rounded">shadow-brutal</code> - Hard shadows</li>
            <li>✓ <code className="bg-white/10 px-2 py-1 rounded">rounded-brutal</code> - 6px border radius</li>
            <li>✓ <code className="bg-white/10 px-2 py-1 rounded">bg-cyber-yellow</code> - CTA buttons</li>
            <li>✓ <code className="bg-white/10 px-2 py-1 rounded">Badge variant="secondary|featured"</code> - Color-coded badges</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
