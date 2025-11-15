/**
 * Spotify Recent Podcasts API Tests
 */

import { NextRequest } from 'next/server';
import { GET } from '../recent-podcasts/route';
import * as spotify from '@/lib/api/spotify';

// Mock dependencies
jest.mock('@/lib/api/spotify', () => ({
  getRecentPodcasts: jest.fn(),
}));

jest.mock('@/lib/middleware/rate-limit', () => ({
  apiRateLimiter: {
    checkLimit: jest.fn().mockResolvedValue({ allowed: true, remaining: 99, resetTime: Date.now() + 60000 }),
  },
}));

describe('Spotify API - GET /api/spotify/recent-podcasts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return recent podcasts', async () => {
    const mockGetRecentPodcasts = spotify.getRecentPodcasts as jest.Mock;

    mockGetRecentPodcasts.mockResolvedValue([
      {
        title: 'How to Build a Startup',
        show: 'Y Combinator',
        image: 'https://example.com/podcast1.jpg',
        url: 'https://open.spotify.com/episode/abc123',
        playedAt: '2025-01-15T10:00:00Z',
      },
      {
        title: 'The Future of AI',
        show: 'Lex Fridman Podcast',
        image: 'https://example.com/podcast2.jpg',
        url: 'https://open.spotify.com/episode/def456',
        playedAt: '2025-01-14T15:30:00Z',
      },
    ]);

    const request = new NextRequest('http://localhost:3000/api/spotify/recent-podcasts');

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toHaveLength(2);
    expect(data.data[0].title).toBe('How to Build a Startup');
    expect(data.data[0].show).toBe('Y Combinator');
    expect(response.headers.get('X-Cache')).toBe('MISS');
  });

  it('should return empty array when no podcasts', async () => {
    const mockGetRecentPodcasts = spotify.getRecentPodcasts as jest.Mock;

    mockGetRecentPodcasts.mockResolvedValue([]);

    const request = new NextRequest('http://localhost:3000/api/spotify/recent-podcasts');

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toHaveLength(0);
  });

  it('should cache responses for 24 hours', async () => {
    const mockGetRecentPodcasts = spotify.getRecentPodcasts as jest.Mock;

    mockGetRecentPodcasts.mockResolvedValue([
      {
        title: 'Test Podcast',
        show: 'Test Show',
        image: 'https://example.com/test.jpg',
        url: 'https://open.spotify.com/episode/test',
        playedAt: '2025-01-15T10:00:00Z',
      },
    ]);

    const request1 = new NextRequest('http://localhost:3000/api/spotify/recent-podcasts');
    const response1 = await GET(request1);

    expect(response1.headers.get('X-Cache')).toBe('MISS');

    // Second request should hit cache
    const request2 = new NextRequest('http://localhost:3000/api/spotify/recent-podcasts');
    const response2 = await GET(request2);

    expect(response2.headers.get('X-Cache')).toBe('HIT');
    expect(mockGetRecentPodcasts).toHaveBeenCalledTimes(1); // Only called once
  });

  it('should set appropriate cache headers', async () => {
    const mockGetRecentPodcasts = spotify.getRecentPodcasts as jest.Mock;

    mockGetRecentPodcasts.mockResolvedValue([]);

    const request = new NextRequest('http://localhost:3000/api/spotify/recent-podcasts');

    const response = await GET(request);

    expect(response.headers.get('Cache-Control')).toContain('s-maxage=86400'); // 24 hours
    expect(response.headers.get('Cache-Control')).toContain('stale-while-revalidate');
  });

  it('should handle Spotify API authentication errors gracefully', async () => {
    const mockGetRecentPodcasts = spotify.getRecentPodcasts as jest.Mock;

    const authError: any = new Error('Authentication required');
    authError.response = { status: 401 };

    mockGetRecentPodcasts.mockRejectedValue(authError);

    const request = new NextRequest('http://localhost:3000/api/spotify/recent-podcasts');

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toEqual([]);
  });

  it('should include all podcast metadata', async () => {
    const mockGetRecentPodcasts = spotify.getRecentPodcasts as jest.Mock;

    mockGetRecentPodcasts.mockResolvedValue([
      {
        title: 'Episode Title',
        show: 'Show Name',
        image: 'https://example.com/image.jpg',
        url: 'https://open.spotify.com/episode/xyz',
        playedAt: '2025-01-15T10:00:00Z',
      },
    ]);

    const request = new NextRequest('http://localhost:3000/api/spotify/recent-podcasts');

    const response = await GET(request);
    const data = await response.json();

    const podcast = data.data[0];
    expect(podcast).toHaveProperty('title');
    expect(podcast).toHaveProperty('show');
    expect(podcast).toHaveProperty('image');
    expect(podcast).toHaveProperty('url');
    expect(podcast).toHaveProperty('playedAt');
  });
});
