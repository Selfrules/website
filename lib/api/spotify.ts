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
