/**
 * Spotify Now Playing API Tests
 */

import { NextRequest } from 'next/server';
import { GET } from '../now-playing/route';
import * as spotify from '@/lib/api/spotify';

// Mock dependencies
jest.mock('@/lib/api/spotify', () => ({
  getCurrentOrRecentTrack: jest.fn(),
}));

jest.mock('@/lib/middleware/rate-limit', () => ({
  apiRateLimiter: {
    checkLimit: jest.fn().mockResolvedValue({ allowed: true, remaining: 99, resetTime: Date.now() + 60000 }),
  },
}));

describe('Spotify API - GET /api/spotify/now-playing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return currently playing track', async () => {
    const mockGetCurrentOrRecentTrack = spotify.getCurrentOrRecentTrack as jest.Mock;

    mockGetCurrentOrRecentTrack.mockResolvedValue({
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      albumArt: 'https://example.com/album-art.jpg',
      spotifyUrl: 'https://open.spotify.com/track/xyz',
      isPlaying: true,
      duration: 354000,
      progress: 120000,
    });

    const request = new NextRequest('http://localhost:3000/api/spotify/now-playing');

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.name).toBe('Bohemian Rhapsody');
    expect(data.data.isPlaying).toBe(true);
    expect(response.headers.get('X-Cache')).toBe('MISS');
  });

  it('should return null when nothing is playing', async () => {
    const mockGetCurrentOrRecentTrack = spotify.getCurrentOrRecentTrack as jest.Mock;

    mockGetCurrentOrRecentTrack.mockResolvedValue(null);

    const request = new NextRequest('http://localhost:3000/api/spotify/now-playing');

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toBeNull();
  });

  it('should cache responses for 30 seconds', async () => {
    const mockGetCurrentOrRecentTrack = spotify.getCurrentOrRecentTrack as jest.Mock;

    mockGetCurrentOrRecentTrack.mockResolvedValue({
      name: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      albumArt: 'https://example.com/art.jpg',
      spotifyUrl: 'https://open.spotify.com/track/test',
      isPlaying: true,
    });

    const request1 = new NextRequest('http://localhost:3000/api/spotify/now-playing');
    const response1 = await GET(request1);

    expect(response1.headers.get('X-Cache')).toBe('MISS');

    // Second request should hit cache
    const request2 = new NextRequest('http://localhost:3000/api/spotify/now-playing');
    const response2 = await GET(request2);

    expect(response2.headers.get('X-Cache')).toBe('HIT');
    expect(mockGetCurrentOrRecentTrack).toHaveBeenCalledTimes(1); // Only called once
  });

  it('should handle Spotify API authentication errors gracefully', async () => {
    const mockGetCurrentOrRecentTrack = spotify.getCurrentOrRecentTrack as jest.Mock;

    const authError: any = new Error('Authentication required');
    authError.response = { status: 401 };

    mockGetCurrentOrRecentTrack.mockRejectedValue(authError);

    const request = new NextRequest('http://localhost:3000/api/spotify/now-playing');

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toBeNull();
  });

  it('should set appropriate cache headers', async () => {
    const mockGetCurrentOrRecentTrack = spotify.getCurrentOrRecentTrack as jest.Mock;

    mockGetCurrentOrRecentTrack.mockResolvedValue({
      name: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      albumArt: 'https://example.com/art.jpg',
      spotifyUrl: 'https://open.spotify.com/track/test',
      isPlaying: false,
    });

    const request = new NextRequest('http://localhost:3000/api/spotify/now-playing');

    const response = await GET(request);

    expect(response.headers.get('Cache-Control')).toContain('s-maxage=30');
    expect(response.headers.get('Cache-Control')).toContain('stale-while-revalidate');
  });
});
