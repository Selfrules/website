/**
 * Spotify Web API Integration
 * Handles authentication and data fetching from Spotify
 */

import axios from 'axios';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  spotifyUrl: string;
  isPlaying: boolean;
  duration?: number;
  progress?: number;
}

interface SpotifyPodcast {
  title: string;
  show: string;
  image: string;
  url: string;
  playedAt: string;
}

export interface SpotifyRecommendation {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  spotifyUrl: string;
  previewUrl: string | null;
}

let cachedAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

/**
 * Get valid Spotify access token (with auto-refresh)
 */
async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedAccessToken && Date.now() < tokenExpiresAt) {
    return cachedAccessToken;
  }

  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    throw new Error('Missing Spotify API credentials');
  }

  try {
    const response = await axios.post<SpotifyTokenResponse>(
      SPOTIFY_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
      }
    );

    cachedAccessToken = response.data.access_token;
    tokenExpiresAt = Date.now() + (response.data.expires_in - 60) * 1000; // 60s buffer

    return cachedAccessToken;
  } catch (error) {
    console.error('Spotify token refresh error:', error);
    throw new Error('Failed to refresh Spotify access token');
  }
}

/**
 * Get currently playing track
 */
export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  try {
    const token = await getAccessToken();

    const response = await axios.get(SPOTIFY_NOW_PLAYING_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204 || !response.data) {
      return null; // Nothing playing
    }

    const { item, is_playing, progress_ms } = response.data;

    if (!item) return null;

    return {
      name: item.name,
      artist: item.artists.map((artist: any) => artist.name).join(', '),
      album: item.album.name,
      albumArt: item.album.images[0]?.url || '',
      spotifyUrl: item.external_urls.spotify,
      isPlaying: is_playing,
      duration: item.duration_ms,
      progress: progress_ms,
    };
  } catch (error: any) {
    if (error.response?.status === 204) {
      return null; // Nothing playing
    }
    console.error('Spotify now playing error:', error);
    throw error;
  }
}

/**
 * Get recently played track (fallback when nothing is currently playing)
 */
export async function getRecentlyPlayed(): Promise<SpotifyTrack | null> {
  try {
    const token = await getAccessToken();

    const response = await axios.get(SPOTIFY_RECENTLY_PLAYED_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data?.items?.length) {
      return null;
    }

    const item = response.data.items[0].track;

    return {
      name: item.name,
      artist: item.artists.map((artist: any) => artist.name).join(', '),
      album: item.album.name,
      albumArt: item.album.images[0]?.url || '',
      spotifyUrl: item.external_urls.spotify,
      isPlaying: false,
    };
  } catch (error) {
    console.error('Spotify recently played error:', error);
    throw error;
  }
}

/**
 * Get currently playing or recently played track
 */
export async function getCurrentOrRecentTrack(): Promise<SpotifyTrack | null> {
  try {
    const nowPlaying = await getNowPlaying();
    if (nowPlaying) {
      return nowPlaying;
    }

    return await getRecentlyPlayed();
  } catch (error) {
    console.error('Spotify API error:', error);
    return null; // Graceful fallback
  }
}

/**
 * Get recently played podcast episodes
 */
export async function getRecentPodcasts(limit: number = 2): Promise<SpotifyPodcast[]> {
  try {
    const token = await getAccessToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data?.items?.length) {
      return [];
    }

    // Filter only podcast episodes and take top N
    const podcasts = response.data.items
      .filter((item: any) => item.track.type === 'episode')
      .slice(0, limit)
      .map((item: any) => ({
        title: item.track.name,
        show: item.track.show.name,
        image: item.track.images?.[0]?.url || item.track.show?.images?.[0]?.url || '',
        url: item.track.external_urls.spotify,
        playedAt: item.played_at,
      }));

    return podcasts;
  } catch (error) {
    console.error('Spotify recent podcasts error:', error);
    return []; // Graceful fallback
  }
}

/**
 * Get personalized track recommendations based on recently played music
 */
export async function getRecommendations(limit: number = 3): Promise<SpotifyRecommendation[]> {
  try {
    const token = await getAccessToken();

    // Get recently played tracks to use as seeds
    const recentResponse = await axios.get(
      `https://api.spotify.com/v1/me/player/recently-played?limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!recentResponse.data?.items?.length) {
      return [];
    }

    // Extract seed tracks and artists (Spotify API allows max 5 seeds)
    const recentTracks = recentResponse.data.items
      .filter((item: any) => item.track.type === 'track') // Only music tracks
      .slice(0, 5);

    if (recentTracks.length === 0) {
      return [];
    }

    // Use first 2-3 tracks as seeds
    const seedTracks = recentTracks.slice(0, 2).map((item: any) => item.track.id);
    // Use first 2-3 artists as seeds
    const seedArtists = recentTracks.slice(0, 2).map((item: any) => item.track.artists[0]?.id);

    // Get recommendations from Spotify
    const recommendationsResponse = await axios.get(
      `https://api.spotify.com/v1/recommendations`,
      {
        params: {
          seed_tracks: seedTracks.join(','),
          seed_artists: seedArtists.join(','),
          limit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!recommendationsResponse.data?.tracks?.length) {
      return [];
    }

    // Map recommendations to our format
    const recommendations = recommendationsResponse.data.tracks.map((track: any) => ({
      name: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(', '),
      album: track.album.name,
      albumArt: track.album.images[0]?.url || '',
      spotifyUrl: track.external_urls.spotify,
      previewUrl: track.preview_url,
    }));

    return recommendations;
  } catch (error) {
    console.error('Spotify recommendations error:', error);
    return []; // Graceful fallback
  }
}
