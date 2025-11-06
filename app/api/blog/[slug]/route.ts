/**
 * Blog Post by Slug API Routes - FIREBASE VERSION
 * Handles individual blog post operations
 * Migrated from Prisma to Firestore
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  COLLECTIONS,
  BlogPost,
  queryDocumentsAdmin,
  updateDocumentAdmin,
  deleteDocumentAdmin,
} from '@/lib/firebase';
import { updateBlogPostSchema } from '@/lib/validations/schemas';
import { handleApiError, formatSuccessResponse, NotFoundError } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * GET /api/blog/[slug]
 * Retrieve a single blog post by slug
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await apiRateLimiter.checkLimit(req);

    const posts = await queryDocumentsAdmin<BlogPost>(
      COLLECTIONS.BLOG_POSTS,
      [{ field: 'slug', operator: '==', value: params.slug }],
      undefined,
      'desc',
      1
    );

    if (posts.length === 0) {
      throw new NotFoundError('Blog post');
    }

    const response = NextResponse.json(
      formatSuccessResponse(posts[0]),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/blog/[slug]
 * Update a blog post
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await apiRateLimiter.checkLimit(req);

    const body = await req.json();
    const validatedData = updateBlogPostSchema.parse(body);

    // Find post by slug first
    const posts = await queryDocumentsAdmin<BlogPost>(
      COLLECTIONS.BLOG_POSTS,
      [{ field: 'slug', operator: '==', value: params.slug }],
      undefined,
      'desc',
      1
    );

    if (posts.length === 0) {
      throw new NotFoundError('Blog post');
    }

    const { publishedAt, ...otherFields } = validatedData;
    const updateData: Partial<BlogPost> = { ...otherFields };

    if (publishedAt) {
      updateData.publishedAt = Timestamp.fromDate(new Date(publishedAt));
    }

    await updateDocumentAdmin<BlogPost>(
      COLLECTIONS.BLOG_POSTS,
      posts[0].id,
      updateData
    );

    const response = NextResponse.json(
      formatSuccessResponse(posts[0], 'Blog post updated successfully'),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/blog/[slug]
 * Delete a blog post
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await apiRateLimiter.checkLimit(req);

    // Find post by slug first
    const posts = await queryDocumentsAdmin<BlogPost>(
      COLLECTIONS.BLOG_POSTS,
      [{ field: 'slug', operator: '==', value: params.slug }],
      undefined,
      'desc',
      1
    );

    if (posts.length === 0) {
      throw new NotFoundError('Blog post');
    }

    await deleteDocumentAdmin(COLLECTIONS.BLOG_POSTS, posts[0].id);

    const response = NextResponse.json(
      formatSuccessResponse(null, 'Blog post deleted successfully'),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function OPTIONS(req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, req);
}
