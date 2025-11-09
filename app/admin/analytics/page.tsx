'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Calendar,
  Map,
  Download,
  BarChart3,
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalPageViews: number;
    uniqueVisitors: number;
    avgSessionDuration: number;
    bounceRate: number;
    trends: {
      pageViews: number;
      visitors: number;
      duration: number;
      bounce: number;
    };
  };
  topPages: Array<{
    path: string;
    views: number;
    avgTime: number;
  }>;
  traffic: Array<{
    date: string;
    views: number;
    visitors: number;
  }>;
  events: Array<{
    name: string;
    count: number;
    category: string;
  }>;
  heatmapData: Array<{
    x: number;
    y: number;
    intensity: number;
  }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      // TODO: Implement API endpoint for analytics
      // Placeholder data for now
      setData({
        overview: {
          totalPageViews: 12547,
          uniqueVisitors: 3892,
          avgSessionDuration: 245, // seconds
          bounceRate: 42.5, // percentage
          trends: {
            pageViews: 15.3,
            visitors: 8.7,
            duration: -5.2,
            bounce: 3.1,
          },
        },
        topPages: [
          { path: '/', views: 4523, avgTime: 180 },
          { path: '/blog', views: 2341, avgTime: 320 },
          { path: '/blog/product-management', views: 1876, avgTime: 425 },
          { path: '/blog/design-failure', views: 1234, avgTime: 380 },
          { path: '#contact', views: 987, avgTime: 95 },
        ],
        traffic: [
          { date: '2024-01-01', views: 420, visitors: 145 },
          { date: '2024-01-02', views: 385, visitors: 132 },
          { date: '2024-01-03', views: 456, visitors: 167 },
          { date: '2024-01-04', views: 502, visitors: 189 },
          { date: '2024-01-05', views: 478, visitors: 172 },
          { date: '2024-01-06', views: 391, visitors: 138 },
          { date: '2024-01-07', views: 445, visitors: 158 },
        ],
        events: [
          { name: 'hero_cta_clicked', count: 234, category: 'engagement' },
          { name: 'chat_opened', count: 187, category: 'interaction' },
          { name: 'blog_shared', count: 156, category: 'social' },
          { name: 'form_submitted', count: 89, category: 'conversion' },
        ],
        heatmapData: [], // Placeholder for heatmap
      });
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatTrend = (value: number): React.ReactNode => {
    const isPositive = value > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    return (
      <span
        className={`inline-flex items-center gap-1 text-sm font-bold ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}
      >
        <Icon className="w-4 h-4" />
        {Math.abs(value)}%
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
          Loading analytics...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
          Failed to load analytics data
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-black mb-2">Analytics</h1>
          <p className="text-lg text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
            Visitor insights and engagement metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Time Range Selector */}
          <div className="flex gap-2">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as typeof timeRange)}
                className={`px-4 py-2 font-bold rounded-brutal border-4 transition-all ${
                  timeRange === range
                    ? 'bg-primary text-white border-black shadow-brutal'
                    : 'border-transparent hover:border-black'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white font-bold border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="brutal-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-primary/20 border-4 border-primary rounded-brutal">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            {formatTrend(data.overview.trends.pageViews)}
          </div>
          <div className="text-3xl font-bold mb-1">
            {data.overview.totalPageViews.toLocaleString()}
          </div>
          <div className="text-sm font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
            Total Page Views
          </div>
        </div>

        <div className="brutal-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-secondary/20 border-4 border-secondary rounded-brutal">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            {formatTrend(data.overview.trends.visitors)}
          </div>
          <div className="text-3xl font-bold mb-1">
            {data.overview.uniqueVisitors.toLocaleString()}
          </div>
          <div className="text-sm font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
            Unique Visitors
          </div>
        </div>

        <div className="brutal-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-accent/20 border-4 border-accent rounded-brutal">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            {formatTrend(data.overview.trends.duration)}
          </div>
          <div className="text-3xl font-bold mb-1">
            {formatDuration(data.overview.avgSessionDuration)}
          </div>
          <div className="text-sm font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
            Avg Session Duration
          </div>
        </div>

        <div className="brutal-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-red-100 border-4 border-red-500 rounded-brutal">
              <MousePointer className="w-6 h-6 text-red-600" />
            </div>
            {formatTrend(data.overview.trends.bounce)}
          </div>
          <div className="text-3xl font-bold mb-1">
            {data.overview.bounceRate}%
          </div>
          <div className="text-sm font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
            Bounce Rate
          </div>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="brutal-card p-6">
        <h2 className="text-2xl font-heading font-black mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Traffic Overview
        </h2>
        <div className="relative h-64">
          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between h-full gap-2">
            {data.traffic.map((day, idx) => {
              const maxViews = Math.max(...data.traffic.map((d) => d.views));
              const height = (day.views / maxViews) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary border-4 border-black rounded-brutal hover:shadow-brutal-hover transition-all cursor-pointer group relative"
                    style={{ height: `${height}%`, minHeight: '8px' }}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {day.views} views
                      <br />
                      {day.visitors} visitors
                    </div>
                  </div>
                  <span className="text-xs text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                    {new Date(day.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="brutal-card p-6">
          <h2 className="text-2xl font-heading font-black mb-6">Top Pages</h2>
          <div className="space-y-4">
            {data.topPages.map((page, idx) => {
              const maxViews = data.topPages[0].views;
              const percentage = (page.views / maxViews) * 100;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm truncate">{page.path}</span>
                    <span className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                      {page.views.toLocaleString()} views
                    </span>
                  </div>
                  <div className="w-full h-3 bg-brutalist-text-light/10 dark:bg-brutalist-text-dark/10 rounded-brutal overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-brutal"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-brutalist-text-light/50 dark:text-brutalist-text-dark/50 mt-1">
                    Avg time: {formatDuration(page.avgTime)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Events */}
        <div className="brutal-card p-6">
          <h2 className="text-2xl font-heading font-black mb-6">Top Events</h2>
          <div className="space-y-4">
            {data.events.map((event, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-brutalist-text-light/5 dark:bg-brutalist-text-dark/5 rounded-brutal border-2 border-brutalist-text-light/10"
              >
                <div>
                  <div className="font-bold text-sm">{event.name}</div>
                  <div className="text-xs text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                    {event.category}
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {event.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap Placeholder */}
      <div className="brutal-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-black flex items-center gap-2">
            <Map className="w-6 h-6" />
            Click Heatmap
          </h2>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold border-2 border-purple-500 rounded-brutal">
            Coming Soon
          </span>
        </div>
        <div className="aspect-video bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-brutal border-4 border-brutalist-text-light/10 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-16 h-16 text-brutalist-text-light/20 dark:text-brutalist-text-dark/20 mx-auto mb-4" />
            <p className="text-lg font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
              Interactive heatmap visualization
            </p>
            <p className="text-sm text-brutalist-text-light/40 dark:text-brutalist-text-dark/40">
              See where users click, scroll, and engage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
