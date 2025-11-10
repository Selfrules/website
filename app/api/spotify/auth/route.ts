import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/middleware/rate-limit';

/**
 * Spotify OAuth Authorization Route
 *
 * Initiates the Spotify OAuth flow by redirecting the user to Spotify's
 * authorization page.
 *
 * Rate Limit: 10 requests per 10 minutes per IP
 *
 * Required Scopes:
 * - user-read-currently-playing: Read the user's currently playing track
 * - user-read-playback-state: Read the user's playback state
 * - user-read-recently-played: Read the user's recently played tracks
 *
 * @route GET /api/spotify/auth
 */
export async function GET(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = await checkRateLimit(request, 'spotifyAuth');

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: `Rate limit exceeded. Try again in ${Math.ceil(
            (rateLimitResult.reset - Date.now()) / 1000
          )} seconds.`,
          limit: rateLimitResult.limit,
          remaining: rateLimitResult.remaining,
          reset: rateLimitResult.reset,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI ||
                       `${process.env.NEXT_PUBLIC_APP_URL}/api/spotify/callback`;

    if (!clientId) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Missing SPOTIFY_CLIENT_ID in environment variables');
      }
      return NextResponse.json(
        { error: 'Spotify client ID not configured' },
        { status: 500 }
      );
    }

    // Define required scopes for Now Playing widget
    const scopes = [
      'user-read-currently-playing',
      'user-read-playback-state',
      'user-read-recently-played',
    ];

    // Build Spotify authorization URL
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', scopes.join(' '));
    authUrl.searchParams.set('show_dialog', 'true'); // Force consent screen

    // Log only in development (don't expose client info in production logs)
    if (process.env.NODE_ENV === 'development') {
      console.log('🎵 Redirecting to Spotify authorization...');
      console.log('   Redirect URI:', redirectUri);
      console.log('   Scopes:', scopes.join(', '));
    }

    // Redirect to Spotify
    return NextResponse.redirect(authUrl.toString());

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Error initiating Spotify authorization:', error);
    }
    return NextResponse.json(
      {
        error: 'Failed to initiate authorization',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
