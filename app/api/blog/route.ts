/**
 * Blog API Routes - FIREBASE VERSION
 * Handles CRUD operations for blog posts
 * Migrated from Prisma to Firestore
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  COLLECTIONS,
  BlogPost,
  queryDocumentsAdmin,
  createDocumentAdmin,
  countDocumentsAdmin,
} from '@/lib/firebase';
import { createBlogPostSchema, getBlogPostsSchema } from '@/lib/validations/schemas';
import { handleApiError, formatSuccessResponse, NotFoundError } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * GET /api/blog
 * Retrieve blog posts with optional filtering
 */
export async function GET(req: NextRequest) {
  try {
    // Rate limiting
    await apiRateLimiter.checkLimit(req);

    // Parse and validate query parameters
    const { searchParams } = new URL(req.url);
    const params = {
      category: searchParams.get('category') || undefined,
      locale: searchParams.get('locale') || undefined,
      published: searchParams.get('published') === 'true' ? true : undefined,
      limit: parseInt(searchParams.get('limit') || '10'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    const validatedParams = getBlogPostsSchema.parse(params);

    // Build Firestore filters
    const filters: Array<{ field: string; operator: FirebaseFirestore.WhereFilterOp; value: any }> = [];
    if (validatedParams.category) {
      filters.push({ field: 'category', operator: '==', value: validatedParams.category });
    }
    if (validatedParams.locale) {
      filters.push({ field: 'locale', operator: '==', value: validatedParams.locale });
    }
    if (validatedParams.published !== undefined) {
      filters.push({ field: 'published', operator: '==', value: validatedParams.published });
    }

    // Fetch posts with pagination
    const [posts, total] = await Promise.all([
      queryDocumentsAdmin<BlogPost>(
        COLLECTIONS.BLOG_POSTS,
        filters,
        'publishedAt',
        'desc',
        validatedParams.limit
      ),
      countDocumentsAdmin(COLLECTIONS.BLOG_POSTS, filters),
    ]);

    const response = NextResponse.json(
      formatSuccessResponse(posts, undefined, {
        total,
        limit: validatedParams.limit,
        offset: validatedParams.offset,
      }),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/blog
 * Create a new blog post
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    await apiRateLimiter.checkLimit(req);

    // Parse and validate request body
    const body = await req.json();
    const validatedData = createBlogPostSchema.parse(body);

    // Create blog post
    const post = await createDocumentAdmin<BlogPost>(
      COLLECTIONS.BLOG_POSTS,
      {
        title: validatedData.title,
        slug: validatedData.slug,
        content: validatedData.content,
        excerpt: validatedData.excerpt,
        category: validatedData.category,
        locale: validatedData.locale,
        coverImage: validatedData.coverImage,
        readingTime: validatedData.readingTime,
        published: validatedData.published,
        publishedAt: validatedData.publishedAt
          ? Timestamp.fromDate(new Date(validatedData.publishedAt))
          : undefined,
        metadata: validatedData.metadata,
      }
    );

    const response = NextResponse.json(
      formatSuccessResponse(post, 'Blog post created successfully'),
      { status: 201 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * OPTIONS /api/blog
 * Handle preflight requests
 */
export async function OPTIONS(req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, req);
}
