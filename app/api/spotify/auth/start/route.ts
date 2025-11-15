/**
 * Spotify OAuth Start Endpoint
 * Generates authorization URL and redirects user to Spotify login
 */

import { NextRequest, NextResponse } from 'next/server';

const SPOTIFY_SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
];

export async function GET(req: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Configuration Error</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      max-width: 600px;
    }
    h1 { color: #e74c3c; }
    code {
      background: #f0f0f0;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>❌ Configuration Error</h1>
    <p><strong>SPOTIFY_CLIENT_ID</strong> not found in environment variables.</p>
    <p>Please add it to your <code>.env.local</code> file:</p>
    <pre>SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here</pre>
    <p>Get your credentials from: <a href="https://developer.spotify.com/dashboard" target="_blank">Spotify Developer Dashboard</a></p>
  </div>
</body>
</html>
    `;

    return new NextResponse(html, {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Build authorization URL
  const redirectUri = `${req.nextUrl.origin}/api/spotify/callback`;

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', SPOTIFY_SCOPES.join(' '));
  authUrl.searchParams.set('show_dialog', 'true');

  // Check if user wants to see the URL or be redirected
  const show = req.nextUrl.searchParams.get('show');

  if (show === 'true') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spotify Authorization</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #1DB954 0%, #191414 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      max-width: 800px;
      width: 100%;
    }
    h1 { color: #1DB954; margin-bottom: 20px; }
    .url-box {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      word-break: break-all;
      font-family: monospace;
      font-size: 12px;
    }
    .btn {
      background: #1DB954;
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin: 10px 5px;
      transition: background 0.2s;
    }
    .btn:hover { background: #1ed760; }
    .btn-secondary {
      background: #191414;
    }
    .btn-secondary:hover { background: #282828; }
    .instructions {
      background: #e8f5e9;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .instructions h2 {
      color: #2e7d32;
      margin-top: 0;
    }
    .instructions ol {
      margin: 10px 0;
      padding-left: 20px;
    }
    .scopes {
      background: #fff3e0;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .scopes h3 {
      color: #e65100;
      margin-top: 0;
    }
    code {
      background: rgba(0,0,0,0.05);
      padding: 2px 6px;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎵 Spotify Authorization</h1>

    <div class="instructions">
      <h2>📖 What will happen:</h2>
      <ol>
        <li>You'll be redirected to Spotify's login page</li>
        <li>Log in with your Spotify account (the one you want to track)</li>
        <li>Approve the requested permissions</li>
        <li>You'll be redirected back with your refresh token</li>
        <li>Copy the refresh token and add it to <code>.env.local</code></li>
      </ol>
    </div>

    <div class="scopes">
      <h3>🔐 Required Permissions:</h3>
      <ul>
        ${SPOTIFY_SCOPES.map(scope => `<li><code>${scope}</code></li>`).join('')}
      </ul>
      <p><small>These permissions allow the app to read what you're currently playing and your recent listening history.</small></p>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <button class="btn" onclick="window.location.href='${authUrl.toString()}'">
        🚀 Start Authorization
      </button>
      <button class="btn btn-secondary" onclick="copyUrl()">
        📋 Copy URL
      </button>
    </div>

    <details style="margin-top: 30px;">
      <summary style="cursor: pointer; color: #666;">Show authorization URL</summary>
      <div class="url-box" id="urlBox">${authUrl.toString()}</div>
    </details>
  </div>

  <script>
    function copyUrl() {
      const url = '${authUrl.toString()}';
      navigator.clipboard.writeText(url).then(() => {
        alert('✅ URL copied to clipboard!');
      });
    }
  </script>
</body>
</html>
    `;

    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Default: redirect to Spotify authorization
  return NextResponse.redirect(authUrl.toString());
}
