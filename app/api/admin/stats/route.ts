/**
 * Admin Dashboard Stats API - FIREBASE VERSION
 * Provides aggregated statistics for admin dashboard
 * Protected by admin authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import {
  COLLECTIONS,
  countDocumentsAdmin,
  queryDocumentsAdmin,
} from '@/lib/firebase';
import { handleApiError, formatSuccessResponse } from '@/lib/utils/errors';
import { addCorsHeaders } from '@/lib/middleware/cors';
import { Timestamp } from 'firebase-admin/firestore';

interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  totalConversations: number;
  totalQuestions: number;
  pendingQuestions: number;
  totalBookings: number;
  pageViews: number;
}

/**
 * GET /api/admin/stats
 * Retrieve dashboard statistics
 * Requires admin authentication
 */
export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Calculate date 30 days ago for pageViews
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoTimestamp = Timestamp.fromDate(thirtyDaysAgo);

    // Execute all count queries in parallel for better performance
    const [
      totalArticles,
      publishedArticles,
      totalConversations,
      totalQuestions,
      pendingQuestions,
      totalBookings,
      recentAnalyticsEvents,
    ] = await Promise.all([
      // Count all blog posts
      countDocumentsAdmin(COLLECTIONS.BLOG_POSTS, []),

      // Count published blog posts
      countDocumentsAdmin(COLLECTIONS.BLOG_POSTS, [
        { field: 'published', operator: '==', value: true }
      ]),

      // Count all chat conversations
      countDocumentsAdmin(COLLECTIONS.CHAT_CONVERSATIONS, []),

      // Count all questions
      countDocumentsAdmin(COLLECTIONS.QUESTIONS, []),

      // Count pending questions
      countDocumentsAdmin(COLLECTIONS.QUESTIONS, [
        { field: 'status', operator: '==', value: 'pending' }
      ]),

      // Count all calendar bookings
      countDocumentsAdmin(COLLECTIONS.CALENDAR_BOOKINGS, []),

      // Get analytics events from last 30 days for page view count
      queryDocumentsAdmin(
        COLLECTIONS.ANALYTICS_EVENTS,
        [
          { field: 'eventType', operator: '==', value: 'page_view' },
          { field: 'timestamp', operator: '>=', value: thirtyDaysAgoTimestamp }
        ],
        undefined,
        'desc',
        10000 // Reasonable limit for counting
      ),
    ]);

    // Count page views from analytics events
    const pageViews = recentAnalyticsEvents.length;

    const stats: DashboardStats = {
      totalArticles,
      publishedArticles,
      totalConversations,
      totalQuestions,
      pendingQuestions,
      totalBookings,
      pageViews,
    };

    const response = NextResponse.json(
      formatSuccessResponse(stats),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}
