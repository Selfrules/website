'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Send,
  Eye,
  Sparkles,
  ArrowLeft,
  Loader2,
  Languages,
} from 'lucide-react';

interface ArticleForm {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  locale: string;
  coverImage: string;
  tags: string;
}

const categories = ['Design', 'Dev', 'Product', 'Personal', 'AMA'];

export default function NewArticlePage() {
  const router = useRouter();
  const [form, setForm] = useState<ArticleForm>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'Product',
    locale: 'en',
    coverImage: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [preview, setPreview] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === 'title' && !form.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const handleAiAssist = async () => {
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    try {
      const response = await fetch('/api/admin/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          context: {
            title: form.title,
            category: form.category,
            locale: form.locale,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setForm((prev) => ({
          ...prev,
          content: prev.content + '\n\n' + data.content,
        }));
        setAiPrompt('');
        setShowAiPanel(false);
      } else {
        alert(data.error || 'AI generation failed');
      }
    } catch (error) {
      console.error('AI assist error:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = async (published: boolean) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          published,
          publishedAt: published ? new Date().toISOString() : null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/articles');
      } else {
        alert(data.error || 'Failed to save article');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-brutalist-text-light/10 rounded-brutal border-2 border-transparent hover:border-black transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-heading font-black">Create Article</h1>
            <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
              Write a new blog post with AI assistance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary font-bold border-4 border-secondary rounded-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all"
          >
            <Eye className="w-5 h-5" />
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={loading || !form.title}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white font-bold border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={loading || !form.title || !form.content}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            Publish
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold mb-2">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border-4 border-black rounded-brutal focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-lg font-bold"
              placeholder="Enter article title..."
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-bold mb-2">
              URL Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                /blog/
              </span>
              <input
                id="slug"
                name="slug"
                type="text"
                value={form.slug}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border-4 border-black rounded-brutal focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                placeholder="article-url-slug"
                required
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="content" className="text-sm font-bold">
                Content * (MDX Supported)
              </label>
              <button
                onClick={() => setShowAiPanel(!showAiPanel)}
                className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 font-bold border-2 border-purple-500 rounded-brutal hover:shadow-brutal-hover hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                AI Assist
              </button>
            </div>

            {/* AI Panel */}
            {showAiPanel && (
              <div className="mb-4 p-4 bg-purple-50 border-4 border-purple-500 rounded-brutal">
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-brutal focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
                  placeholder="Describe what you want to write about... (e.g., 'Write an introduction about product management principles')"
                  rows={3}
                />
                <button
                  onClick={handleAiAssist}
                  disabled={aiLoading || !aiPrompt.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white font-bold border-2 border-purple-800 rounded-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all disabled:opacity-50"
                >
                  {aiLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Content
                    </>
                  )}
                </button>
              </div>
            )}

            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full px-4 py-3 border-4 border-black rounded-brutal focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-mono text-sm"
              placeholder="Write your article content here... MDX is supported for rich content."
              rows={20}
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-bold mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              className="w-full px-4 py-3 border-4 border-black rounded-brutal focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
              placeholder="Short summary for article cards..."
              rows={3}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="brutal-card p-6">
            <h3 className="text-lg font-bold mb-4">Metadata</h3>

            {/* Category */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-bold mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border-4 border-black rounded-brutal focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-bold"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Locale */}
            <div className="mb-4">
              <label htmlFor="locale" className="block text-sm font-bold mb-2">
                Language *
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, locale: 'en' }))}
                  className={`flex-1 px-4 py-2 font-bold border-4 rounded-brutal transition-all ${
                    form.locale === 'en'
                      ? 'bg-primary text-white border-black shadow-brutal'
                      : 'border-black/20 hover:border-black'
                  }`}
                >
                  <Languages className="w-4 h-4 inline mr-2" />
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, locale: 'it' }))}
                  className={`flex-1 px-4 py-2 font-bold border-4 rounded-brutal transition-all ${
                    form.locale === 'it'
                      ? 'bg-primary text-white border-black shadow-brutal'
                      : 'border-black/20 hover:border-black'
                  }`}
                >
                  <Languages className="w-4 h-4 inline mr-2" />
                  IT
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label htmlFor="tags" className="block text-sm font-bold mb-2">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={form.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border-4 border-black rounded-brutal focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                placeholder="tag1, tag2, tag3"
              />
              <p className="text-xs text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 mt-1">
                Comma-separated tags
              </p>
            </div>

            {/* Cover Image */}
            <div>
              <label htmlFor="coverImage" className="block text-sm font-bold mb-2">
                Cover Image URL
              </label>
              <input
                id="coverImage"
                name="coverImage"
                type="url"
                value={form.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-2 border-4 border-black rounded-brutal focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Help Card */}
          <div className="brutal-card p-6 bg-primary/10">
            <h3 className="text-lg font-bold mb-2">💡 Writing Tips</h3>
            <ul className="text-sm space-y-2 text-brutalist-text-light/80 dark:text-brutalist-text-dark/80">
              <li>• Start with the problem, not the solution</li>
              <li>• Use everyday metaphors for complex concepts</li>
              <li>• Keep paragraphs to 3-4 lines max</li>
              <li>• Use &quot;we&quot; instead of &quot;you should&quot;</li>
              <li>• MDX allows you to embed React components</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
