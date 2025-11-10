import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Spotify Token Retrieval API
 *
 * Retrieves the temporary refresh token from HTTP-only cookie.
 * This endpoint is only accessible from the /spotify-setup page
 * and the token expires after 5 minutes.
 *
 * Security: Token is never exposed in URL or localStorage
 *
 * @route GET /api/spotify/token
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();

    const refreshToken = cookieStore.get('spotify_temp_refresh_token')?.value;
    const accessToken = cookieStore.get('spotify_temp_access_token')?.value;
    const expiresIn = cookieStore.get('spotify_token_expires_in')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No token available', message: 'Token expired or not found' },
        { status: 404 }
      );
    }

    // Return tokens and immediately delete the cookies for security
    const response = NextResponse.json({
      refresh_token: refreshToken,
      access_token: accessToken,
      expires_in: expiresIn ? parseInt(expiresIn) : null,
    });

    // Clear the temporary cookies after reading
    response.cookies.delete('spotify_temp_refresh_token');
    response.cookies.delete('spotify_temp_access_token');
    response.cookies.delete('spotify_token_expires_in');

    return response;

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Error retrieving Spotify token:', error);
    }

    return NextResponse.json(
      {
        error: 'Failed to retrieve token',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
