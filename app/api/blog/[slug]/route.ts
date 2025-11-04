/**
 * Blog Post by Slug API Routes
 * Handles individual blog post operations
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { updateBlogPostSchema } from '@/lib/validations/schemas';
import { handleApiError, formatSuccessResponse, NotFoundError } from '@/lib/utils/errors';
import { apiRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';

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

    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!post) {
      throw new NotFoundError('Blog post');
    }

    const response = NextResponse.json(
      formatSuccessResponse(post),
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

    const post = await prisma.blogPost.update({
      where: { slug: params.slug },
      data: {
        ...validatedData,
        publishedAt: validatedData.publishedAt ? new Date(validatedData.publishedAt) : undefined,
      },
    });

    const response = NextResponse.json(
      formatSuccessResponse(post, 'Blog post updated successfully'),
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

    await prisma.blogPost.delete({
      where: { slug: params.slug },
    });

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
