'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, PlusCircle, Edit, Trash2, Eye, Calendar } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  locale: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      // TODO: Implement API endpoint for articles
      // Placeholder data for now
      setArticles([
        {
          id: '1',
          title: 'Product Management Principles',
          slug: 'product-management-principles',
          category: 'Product',
          locale: 'en',
          published: true,
          publishedAt: '2024-01-15T10:00:00Z',
          createdAt: '2024-01-10T10:00:00Z',
        },
        {
          id: '2',
          title: 'Come fallire come designer e sopravvivere',
          slug: 'come-fallire-come-designer',
          category: 'Personal',
          locale: 'it',
          published: true,
          publishedAt: '2024-01-20T10:00:00Z',
          createdAt: '2024-01-18T10:00:00Z',
        },
        {
          id: '3',
          title: 'Building Products That Matter',
          slug: 'building-products-that-matter',
          category: 'Product',
          locale: 'en',
          published: false,
          publishedAt: null,
          createdAt: '2024-01-25T10:00:00Z',
        },
      ]);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    if (filter === 'published') return article.published;
    if (filter === 'draft') return !article.published;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-black mb-2">Articles</h1>
          <p className="text-lg text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
            Manage your blog posts and create new content
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          New Article
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'published', 'draft'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as typeof filter)}
            className={`px-4 py-2 font-bold rounded-brutal border-4 transition-all ${
              filter === f
                ? 'bg-primary text-white border-black shadow-brutal'
                : 'border-transparent hover:border-black'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {loading ? (
          <div className="brutal-card p-8 text-center">
            <p className="text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
              Loading articles...
            </p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="brutal-card p-8 text-center">
            <FileText className="w-12 h-12 text-brutalist-text-light/40 mx-auto mb-4" />
            <p className="text-lg font-bold mb-2">No articles found</p>
            <p className="text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 mb-4">
              {filter === 'all'
                ? 'Start by creating your first article'
                : `No ${filter} articles yet`}
            </p>
            {filter === 'all' && (
              <Link
                href="/admin/articles/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Create Article
              </Link>
            )}
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div key={article.id} className="brutal-card p-6 hover:shadow-brutal-hover transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{article.title}</h3>
                    {article.published ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold border-2 border-green-500 rounded-brutal">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold border-2 border-yellow-500 rounded-brutal">
                        Draft
                      </span>
                    )}
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold border-2 border-primary rounded-brutal">
                      {article.locale.toUpperCase()}
                    </span>
                    <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs font-bold border-2 border-secondary rounded-brutal">
                      {article.category}
                    </span>
                  </div>
                  <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 mb-2">
                    /{article.slug}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-brutalist-text-light/50 dark:text-brutalist-text-dark/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.published
                        ? `Published ${new Date(article.publishedAt!).toLocaleDateString()}`
                        : `Created ${new Date(article.createdAt).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/blog/${article.slug}`}
                    target="_blank"
                    className="p-2 hover:bg-primary/10 rounded-brutal border-2 border-transparent hover:border-primary transition-all"
                    title="Preview"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="p-2 hover:bg-secondary/10 rounded-brutal border-2 border-transparent hover:border-secondary transition-all"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    className="p-2 hover:bg-red-100 rounded-brutal border-2 border-transparent hover:border-red-500 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
