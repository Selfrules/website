/**
 * Spotify Debug Endpoint
 * Provides detailed diagnostic information for Spotify integration
 *
 * WARNING: Remove or secure this endpoint before deploying to production!
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const debug: any = {
    timestamp: new Date().toISOString(),
    environment: {
      hasClientId: !!process.env.SPOTIFY_CLIENT_ID,
      hasClientSecret: !!process.env.SPOTIFY_CLIENT_SECRET,
      hasRefreshToken: !!process.env.SPOTIFY_REFRESH_TOKEN,
      clientIdLength: process.env.SPOTIFY_CLIENT_ID?.length || 0,
      refreshTokenLength: process.env.SPOTIFY_REFRESH_TOKEN?.length || 0,
    },
    tests: {},
  };

  // Test 1: Token refresh
  try {
    debug.tests.tokenRefresh = { status: 'testing...' };

    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET || !process.env.SPOTIFY_REFRESH_TOKEN) {
      debug.tests.tokenRefresh = {
        status: 'failed',
        error: 'Missing environment variables',
      };
      return NextResponse.json(debug, { status: 200 });
    }

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      debug.tests.tokenRefresh = {
        status: 'failed',
        httpStatus: tokenResponse.status,
        error: errorText,
      };
      return NextResponse.json(debug, { status: 200 });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    debug.tests.tokenRefresh = {
      status: 'success',
      tokenPreview: accessToken.substring(0, 20) + '...',
      expiresIn: tokenData.expires_in,
      scope: tokenData.scope,
    };

    // Test 2: Currently playing
    debug.tests.currentlyPlaying = { status: 'testing...' };

    const nowPlayingResponse = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    debug.tests.currentlyPlaying = {
      status: nowPlayingResponse.status === 204 ? 'nothing_playing' :
              nowPlayingResponse.ok ? 'success' : 'failed',
      httpStatus: nowPlayingResponse.status,
    };

    if (nowPlayingResponse.ok && nowPlayingResponse.status !== 204) {
      const nowPlayingData = await nowPlayingResponse.json();
      debug.tests.currentlyPlaying.data = {
        hasItem: !!nowPlayingData.item,
        isPlaying: nowPlayingData.is_playing,
        trackName: nowPlayingData.item?.name,
        artistName: nowPlayingData.item?.artists?.[0]?.name,
        progress: `${nowPlayingData.progress_ms}ms / ${nowPlayingData.item?.duration_ms}ms`,
      };
    }

    // Test 3: Recently played
    debug.tests.recentlyPlayed = { status: 'testing...' };

    const recentResponse = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!recentResponse.ok) {
      const errorText = await recentResponse.text();
      debug.tests.recentlyPlayed = {
        status: 'failed',
        httpStatus: recentResponse.status,
        error: errorText,
      };
    } else {
      const recentData = await recentResponse.json();
      debug.tests.recentlyPlayed = {
        status: 'success',
        httpStatus: recentResponse.status,
        hasItems: !!recentData.items?.length,
        data: recentData.items?.[0] ? {
          trackName: recentData.items[0].track?.name,
          artistName: recentData.items[0].track?.artists?.[0]?.name,
          playedAt: recentData.items[0].played_at,
        } : null,
      };
    }

  } catch (error: any) {
    debug.error = {
      message: error.message,
      stack: error.stack,
    };
  }

  return NextResponse.json(debug, { status: 200 });
}
