/**
 * Blog API Routes
 * Handles CRUD operations for blog posts
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { createBlogPostSchema, getBlogPostsSchema } from '@/lib/validations/schemas';
import { handleApiError, formatSuccessResponse, NotFoundError } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';

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

    // Build query filters
    const where: any = {};
    if (validatedParams.category) where.category = validatedParams.category;
    if (validatedParams.locale) where.locale = validatedParams.locale;
    if (validatedParams.published !== undefined) where.published = validatedParams.published;

    // Fetch posts with pagination
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        take: validatedParams.limit,
        skip: validatedParams.offset,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          category: true,
          locale: true,
          coverImage: true,
          readingTime: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.blogPost.count({ where }),
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
    const post = await prisma.blogPost.create({
      data: {
        ...validatedData,
        publishedAt: validatedData.publishedAt ? new Date(validatedData.publishedAt) : null,
      },
    });

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
