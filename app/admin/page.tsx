'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  MessageSquare,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  PlusCircle,
  ArrowRight,
} from 'lucide-react';

interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  totalConversations: number;
  totalQuestions: number;
  pendingQuestions: number;
  totalBookings: number;
  pageViews: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    publishedArticles: 0,
    totalConversations: 0,
    totalQuestions: 0,
    pendingQuestions: 0,
    totalBookings: 0,
    pageViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      // TODO: Implement API endpoint for dashboard stats
      // For now, using placeholder data
      setStats({
        totalArticles: 12,
        publishedArticles: 8,
        totalConversations: 156,
        totalQuestions: 42,
        pendingQuestions: 7,
        totalBookings: 23,
        pageViews: 3547,
      });
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Articles',
      value: stats.totalArticles,
      subtitle: `${stats.publishedArticles} published`,
      icon: FileText,
      color: 'primary',
      href: '/admin/articles',
    },
    {
      name: 'Conversations',
      value: stats.totalConversations,
      subtitle: 'Chat interactions',
      icon: MessageSquare,
      color: 'secondary',
      href: '/admin/conversations',
    },
    {
      name: 'Questions',
      value: stats.totalQuestions,
      subtitle: `${stats.pendingQuestions} pending`,
      icon: Users,
      color: 'accent',
      href: '/admin/conversations',
    },
    {
      name: 'Page Views',
      value: stats.pageViews.toLocaleString(),
      subtitle: 'Last 30 days',
      icon: Eye,
      color: 'primary',
      href: '/admin/analytics',
    },
  ];

  const quickActions = [
    {
      name: 'Create Article',
      description: 'Write a new blog post with AI assistance',
      icon: PlusCircle,
      href: '/admin/articles/new',
      color: 'primary',
    },
    {
      name: 'View Analytics',
      description: 'See visitor insights and heatmaps',
      icon: TrendingUp,
      href: '/admin/analytics',
      color: 'secondary',
    },
    {
      name: 'Manage Bookings',
      description: 'Review and confirm consultation calls',
      icon: Calendar,
      href: '/admin/bookings',
      color: 'accent',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-black mb-2">
          Dashboard
        </h1>
        <p className="text-lg text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
          Welcome back, Mattia! Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.name}
              href={card.href}
              className="brutal-card p-6 hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-${card.color}/20 border-4 border-${card.color} rounded-brutal`}>
                  <Icon className={`w-6 h-6 text-${card.color}`} />
                </div>
                <ArrowRight className="w-5 h-5 text-brutalist-text-light/40 group-hover:text-brutalist-text-light group-hover:translate-x-1 transition-all" />
              </div>
              <div className="text-3xl font-bold mb-1">
                {loading ? '...' : card.value}
              </div>
              <div className="text-sm font-bold text-brutalist-text-light/60 dark:text-brutalist-text-dark/60 mb-1">
                {card.name}
              </div>
              <div className="text-xs text-brutalist-text-light/50 dark:text-brutalist-text-dark/50">
                {card.subtitle}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-heading font-black mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                href={action.href}
                className="brutal-card p-6 hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all group"
              >
                <div className={`inline-flex p-3 bg-${action.color}/20 border-4 border-${action.color} rounded-brutal mb-4`}>
                  <Icon className={`w-6 h-6 text-${action.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {action.name}
                </h3>
                <p className="text-sm text-brutalist-text-light/70 dark:text-brutalist-text-dark/70">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-heading font-black mb-4">
          Recent Activity
        </h2>
        <div className="brutal-card p-6">
          <div className="space-y-4">
            {/* Activity Item */}
            <div className="flex items-start gap-4 pb-4 border-b-2 border-brutalist-text-light/10">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/20 border-2 border-primary rounded-brutal flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold">New chat conversation</p>
                <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                  User asked about product management consulting
                </p>
                <p className="text-xs text-brutalist-text-light/50 dark:text-brutalist-text-dark/50 mt-1">
                  2 hours ago
                </p>
              </div>
            </div>

            {/* Activity Item */}
            <div className="flex items-start gap-4 pb-4 border-b-2 border-brutalist-text-light/10">
              <div className="flex-shrink-0 w-10 h-10 bg-accent/20 border-2 border-accent rounded-brutal flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-bold">New anonymous question</p>
                <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                  &quot;How do you handle stakeholder disagreements?&quot;
                </p>
                <p className="text-xs text-brutalist-text-light/50 dark:text-brutalist-text-dark/50 mt-1">
                  5 hours ago
                </p>
              </div>
            </div>

            {/* Activity Item */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary/20 border-2 border-secondary rounded-brutal flex items-center justify-center">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-bold">Consultation booked</p>
                <p className="text-sm text-brutalist-text-light/60 dark:text-brutalist-text-dark/60">
                  90-minute strategic consulting session
                </p>
                <p className="text-xs text-brutalist-text-light/50 dark:text-brutalist-text-dark/50 mt-1">
                  1 day ago
                </p>
              </div>
            </div>
          </div>

          {/* View All Link */}
          <div className="mt-6 pt-4 border-t-2 border-brutalist-text-light/10">
            <Link
              href="/admin/activity"
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              View all activity
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
