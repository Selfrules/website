'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

/**
 * Spotify Setup Page
 *
 * Interactive page to authorize the Spotify integration and obtain refresh token.
 * Displays success state with token or error messages.
 *
 * SECURITY: Tokens are retrieved from HTTP-only cookies via API, NOT from URL params.
 * This prevents exposure in browser history, referrer headers, and server logs.
 *
 * Flow:
 * 1. User clicks "Authorize with Spotify"
 * 2. Redirects to /api/spotify/auth
 * 3. User authorizes on Spotify
 * 4. Callback sets tokens in HTTP-only cookies
 * 5. This page fetches tokens from /api/spotify/token (cookie auto-deleted)
 */
export default function SpotifySetupPage() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<{
    refresh_token?: string;
    access_token?: string;
    expires_in?: number;
  } | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const success = searchParams.get('success') === 'true';
  const error = searchParams.get('error');
  const errorMessage = searchParams.get('message');

  // Fetch tokens from API when success (tokens stored in HTTP-only cookies)
  useEffect(() => {
    if (success && !tokens && !loading) {
      setLoading(true);
      fetch('/api/spotify/token')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to retrieve token');
          }
          return res.json();
        })
        .then((data) => {
          setTokens(data);
          // Auto-copy to clipboard
          if (data.refresh_token) {
            navigator.clipboard.writeText(data.refresh_token);
            setCopied(true);
          }
        })
        .catch((err) => {
          setFetchError(err.message || 'Unknown error');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [success, tokens, loading]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#1a1a1a] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎵 Spotify Integration
          </h1>
          <p className="text-gray-400">
            Setup the "Now Playing" widget for your website
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border-4 border-black rounded-brutal shadow-brutal p-8">
          {/* Initial State - No params */}
          {!success && !error && (
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1DB954] border-4 border-black rounded-full mb-4">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Authorize Spotify Access
                </h2>
                <p className="text-gray-600 mb-6">
                  Click the button below to connect your Spotify account.
                  This will allow the website to display your currently
                  playing music.
                </p>
              </div>

              <a
                href="/api/spotify/auth"
                className="inline-block bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold py-4 px-8 border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all"
              >
                Authorize with Spotify
              </a>

              <div className="mt-8 p-4 bg-yellow-50 border-3 border-yellow-400 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> You'll be redirected to Spotify to
                  authorize access. Make sure you're logged in with the account:{' '}
                  <code className="bg-yellow-200 px-2 py-1 rounded">
                    mattia@selfrules.org
                  </code>
                </p>
              </div>
            </div>
          )}

          {/* Loading State (fetching from cookie) */}
          {success && loading && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 border-4 border-black rounded-full mb-4 animate-pulse">
                <svg
                  className="w-10 h-10 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Retrieving Token...
              </h2>
              <p className="text-gray-400">
                Securely fetching your refresh token
              </p>
            </div>
          )}

          {/* Success State */}
          {success && tokens?.refresh_token && !loading && (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 border-4 border-black rounded-full mb-4">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Authorization Successful!
                </h2>
                <p className="text-gray-600">
                  Your Spotify refresh token has been generated.
                </p>
              </div>

              {/* Refresh Token Display */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Refresh Token (auto-copied to clipboard)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={tokens.refresh_token}
                    className="w-full p-3 pr-24 border-3 border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
                  />
                  <button
                    onClick={() => handleCopy(tokens.refresh_token!)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded border-2 border-black text-sm font-bold"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border-3 border-blue-400 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-blue-900 mb-2">
                  Next Steps:
                </h3>
                <ol className="list-decimal list-inside text-sm text-blue-800 space-y-2">
                  <li>
                    Open your <code className="bg-blue-200 px-2 py-1 rounded">.env</code> file
                  </li>
                  <li>
                    Find the line:{' '}
                    <code className="bg-blue-200 px-2 py-1 rounded">
                      SPOTIFY_REFRESH_TOKEN=
                    </code>
                  </li>
                  <li>Paste the token after the equals sign</li>
                  <li>Save the file and restart your development server</li>
                  <li>
                    Visit your homepage to see the "Now Playing" widget in
                    action!
                  </li>
                </ol>
              </div>

              {/* Debug Info (collapsible) */}
              <details className="mb-4">
                <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 font-bold">
                  Show Debug Information
                </summary>
                <div className="mt-3 p-4 bg-gray-100 border-2 border-gray-300 rounded-lg font-mono text-xs space-y-2">
                  {tokens.access_token && (
                    <div>
                      <strong>Access Token:</strong>{' '}
                      <span className="text-gray-600">
                        {tokens.access_token.substring(0, 40)}...
                      </span>
                    </div>
                  )}
                  {tokens.expires_in && (
                    <div>
                      <strong>Expires In:</strong>{' '}
                      <span className="text-gray-600">{tokens.expires_in} seconds</span>
                    </div>
                  )}
                  <div>
                    <strong>Refresh Token:</strong>{' '}
                    <span className="text-gray-600">
                      {tokens.refresh_token!.substring(0, 40)}...
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <strong className="text-green-600">Security:</strong>{' '}
                    <span className="text-gray-600">
                      Token retrieved from HTTP-only cookie, not URL params
                    </span>
                  </div>
                </div>
              </details>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="flex-1 text-center bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all"
                >
                  Go to Homepage
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-6 border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all"
                >
                  Authorize Again
                </button>
              </div>
            </div>
          )}

          {/* Token Fetch Error State */}
          {success && fetchError && !loading && (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 border-4 border-black rounded-full mb-4">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">
                  Token Retrieval Failed
                </h2>
                <p className="text-gray-600 mb-4">
                  Couldn't retrieve the refresh token from secure storage
                </p>
              </div>

              {/* Error Details */}
              <div className="bg-red-50 border-3 border-red-400 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-red-900 mb-2">Possible Causes:</h3>
                <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                  <li>Token cookie expired (5-minute limit)</li>
                  <li>Browser cookies disabled</li>
                  <li>Page was refreshed after successful auth</li>
                  <li>Server error: {fetchError}</li>
                </ul>
              </div>

              {/* Solution */}
              <div className="bg-yellow-50 border-3 border-yellow-400 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-yellow-900 mb-2">Solution:</h3>
                <p className="text-sm text-yellow-800">
                  Please try authorizing again. Make sure cookies are enabled and don't refresh the page during the process.
                </p>
              </div>

              {/* Retry Button */}
              <a
                href="/api/spotify/auth"
                className="block text-center bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold py-3 px-6 border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all"
              >
                Try Again
              </a>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 border-4 border-black rounded-full mb-4">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">
                  Authorization Failed
                </h2>
                <p className="text-gray-600 mb-4">
                  {errorMessage || 'An error occurred during authorization'}
                </p>
              </div>

              {/* Error Details */}
              <div className="bg-red-50 border-3 border-red-400 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-red-900 mb-2">Error Details:</h3>
                <p className="text-sm text-red-800 font-mono">
                  {error === 'access_denied'
                    ? 'You denied access to your Spotify account.'
                    : error === 'no_code'
                    ? 'No authorization code was received from Spotify.'
                    : error === 'token_exchange_failed'
                    ? `Failed to exchange code for tokens: ${errorMessage}`
                    : `Error code: ${error}`}
                </p>
              </div>

              {/* Troubleshooting */}
              <div className="bg-yellow-50 border-3 border-yellow-400 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-yellow-900 mb-2">
                  Troubleshooting:
                </h3>
                <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
                  <li>Make sure you're logged into the correct Spotify account</li>
                  <li>Check that your .env file has valid SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET</li>
                  <li>Verify the redirect URI in Spotify dashboard matches: <code>http://127.0.0.1:3000/api/spotify/callback</code> (use 127.0.0.1 NOT localhost)</li>
                  <li>Try clearing your browser cookies and cache</li>
                </ul>
              </div>

              {/* Retry Button */}
              <div className="flex gap-4">
                <a
                  href="/api/spotify/auth"
                  className="flex-1 text-center bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold py-3 px-6 border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all"
                >
                  Try Again
                </a>
                <Link
                  href="/"
                  className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 border-4 border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all"
                >
                  Go Back
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>
            Need help? Check{' '}
            <a
              href="https://developer.spotify.com/documentation/web-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Spotify Web API docs
            </a>{' '}
            or the{' '}
            <code className="bg-gray-800 px-2 py-1 rounded">SETUP_TOKENS.md</code>{' '}
            file.
          </p>
        </div>
      </div>
    </div>
  );
}
