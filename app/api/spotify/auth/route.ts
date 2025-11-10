import { NextRequest, NextResponse } from 'next/server';

/**
 * Spotify OAuth Authorization Route
 *
 * Initiates the Spotify OAuth flow by redirecting the user to Spotify's
 * authorization page.
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
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI ||
                       `${process.env.NEXT_PUBLIC_APP_URL}/api/spotify/callback`;

    if (!clientId) {
      console.error('❌ Missing SPOTIFY_CLIENT_ID in environment variables');
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

    console.log('🎵 Redirecting to Spotify authorization...');
    console.log('   Client ID:', clientId.substring(0, 10) + '...');
    console.log('   Redirect URI:', redirectUri);
    console.log('   Scopes:', scopes.join(', '));

    // Redirect to Spotify
    return NextResponse.redirect(authUrl.toString());

  } catch (error) {
    console.error('❌ Error initiating Spotify authorization:', error);
    return NextResponse.json(
      {
        error: 'Failed to initiate authorization',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
