/**
 * MDX Blog System
 *
 * This module provides utilities for managing blog posts written in MDX format.
 * Posts are stored in the `/content/blog` directory and rendered using next-mdx-remote.
 *
 * Key features:
 * - Server-side MDX compilation with compileMDX (eliminates client-side overhead)
 * - Frontmatter parsing with gray-matter
 * - Reading time calculation
 * - Related posts based on tags and category
 * - Post filtering by category, tags, and publication status
 *
 * Architecture:
 * - getPostBySlug(): Returns raw MDX string (used for metadata)
 * - getCompiledPost(): Returns pre-compiled React components (used for rendering)
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@/mdx-components'
import type { ReactElement } from 'react'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  readingTime: string
  coverImage?: string
  published: boolean
  content?: string
}

export interface CompiledBlogPost extends BlogPost {
  compiledContent: ReactElement
}

export function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => fileName.replace(/\.mdx$/, ''))
  } catch (error) {
    console.error('Error reading posts directory:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Calculate reading time (average 200 words per minute)
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    const readingTime = Math.ceil(words / wordsPerMinute)

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      author: data.author || 'Mattia Filippo De Luca',
      category: data.category || 'General',
      tags: data.tags || [],
      readingTime: `${readingTime} min read`,
      coverImage: data.coverImage,
      published: data.published !== false,
      content
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter(post => post.published)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

  return posts
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => post.category === category)
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => post.tags.includes(tag))
}

export async function getRelatedPosts(slug: string, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  const currentPost = getPostBySlug(slug)

  if (!currentPost) return []

  // Find related posts based on shared tags and category
  const relatedPosts = allPosts
    .filter(post => post.slug !== slug)
    .map(post => {
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag))
      const sameCategory = post.category === currentPost.category
      const score = sharedTags.length + (sameCategory ? 2 : 0)
      return { post, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)

  return relatedPosts
}

/**
 * Get blog post with pre-compiled MDX content (server-side)
 *
 * This eliminates client-side MDX compilation overhead and creates
 * architecture consistency with homepage (pure server components).
 *
 * Benefits:
 * - Zero client-side compilation time
 * - Reduced hydration boundaries (from 4+ to 1)
 * - No flickering during render
 * - Faster initial page load
 *
 * @param slug - Post slug
 * @returns Post data with compiled MDX content as React components
 */
export async function getCompiledPost(slug: string): Promise<CompiledBlogPost | null> {
  const post = getPostBySlug(slug)

  if (!post) return null

  try {
    // Compile MDX on server (no client-side compilation needed)
    const { content } = await compileMDX({
      source: post.content || '',
      components: components as any,
      options: {
        parseFrontmatter: false, // Already parsed by gray-matter
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
          format: 'mdx',
        },
      },
    })

    // Return post with compiled content
    return {
      ...post,
      compiledContent: content,
    }
  } catch (error) {
    console.error(`Error compiling MDX for post ${slug}:`, error)
    return null
  }
}