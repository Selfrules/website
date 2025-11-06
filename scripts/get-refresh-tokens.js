#!/usr/bin/env node

/**
 * Helper script to obtain Spotify and Google Calendar refresh tokens
 * Run: node scripts/get-refresh-tokens.js
 */

const http = require('http');
const { URL } = require('url');

console.log('🔐 OAuth Refresh Token Helper\n');
console.log('='.repeat(60));

// ============================================================================
// SPOTIFY REFRESH TOKEN
// ============================================================================

console.log('\n📱 SPOTIFY REFRESH TOKEN\n');
console.log('1. Client ID:', process.env.SPOTIFY_CLIENT_ID || '3c4b81a879b04deca3827c31c21d1ab4');
console.log('2. Client Secret:', process.env.SPOTIFY_CLIENT_SECRET || '1a522f0b4a484e8abcf018972b2d69a8');
console.log('\n3. Visit this URL to authorize:');

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID || '3c4b81a879b04deca3827c31c21d1ab4';
const spotifyRedirectUri = 'http://localhost:3000/callback';
const spotifyScopes = 'user-read-currently-playing user-read-playback-state';

const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&response_type=code&redirect_uri=${encodeURIComponent(spotifyRedirectUri)}&scope=${encodeURIComponent(spotifyScopes)}`;

console.log('\n' + spotifyAuthUrl);
console.log('\n4. After authorization, you\'ll be redirected to:');
console.log('   http://localhost:3000/callback?code=YOUR_CODE');
console.log('\n5. Copy the CODE and run:');
console.log(`   curl -X POST https://accounts.spotify.com/api/token \\`);
console.log(`     -H "Content-Type: application/x-www-form-urlencoded" \\`);
console.log(`     -d "grant_type=authorization_code" \\`);
console.log(`     -d "code=YOUR_CODE_HERE" \\`);
console.log(`     -d "redirect_uri=${spotifyRedirectUri}" \\`);
console.log(`     -d "client_id=${spotifyClientId}" \\`);
console.log(`     -d "client_secret=${process.env.SPOTIFY_CLIENT_SECRET || '1a522f0b4a484e8abcf018972b2d69a8'}"`);

// ============================================================================
// GOOGLE CALENDAR REFRESH TOKEN
// ============================================================================

console.log('\n\n' + '='.repeat(60));
console.log('\n📅 GOOGLE CALENDAR REFRESH TOKEN\n');
console.log('1. Go to: https://developers.google.com/oauthplayground');
console.log('\n2. Click ⚙️ (Settings) in top right');
console.log('   ☑️ Check "Use your own OAuth credentials"');
console.log('   - OAuth Client ID:', process.env.GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID');
console.log('   - OAuth Client Secret:', process.env.GOOGLE_CLIENT_SECRET || 'YOUR_CLIENT_SECRET');
console.log('\n3. In left panel, select:');
console.log('   📁 Google Calendar API v3');
console.log('      ☑️ https://www.googleapis.com/auth/calendar');
console.log('      ☑️ https://www.googleapis.com/auth/calendar.events');
console.log('\n4. Click "Authorize APIs"');
console.log('   - Login with: mattia@selfrules.org');
console.log('   - Accept permissions');
console.log('\n5. Click "Exchange authorization code for tokens"');
console.log('   - Copy the "refresh_token" value');
console.log('   - Paste it in .env as GOOGLE_REFRESH_TOKEN');

console.log('\n\n' + '='.repeat(60));
console.log('\n✅ QUICK SUMMARY\n');
console.log('Spotify:  Visit URL above → Get code → Run curl command');
console.log('Google:   OAuth Playground → Configure → Authorize → Get refresh_token');
console.log('\nSee SETUP_TOKENS.md for detailed step-by-step instructions');
console.log('='.repeat(60) + '\n');

// ============================================================================
// OPTIONAL: Start a simple HTTP server to catch callbacks
// ============================================================================

if (process.argv.includes('--server')) {
  console.log('\n🌐 Starting callback server on http://localhost:3000...\n');

  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost:3000');

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<h1>❌ Authorization Failed</h1><p>Error: ${error}</p>`);
        console.error('❌ Authorization error:', error);
        return;
      }

      if (code) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <h1>✅ Authorization Code Received!</h1>
          <p><strong>Code:</strong> <code>${code}</code></p>
          <p>Now run this curl command to get your refresh token:</p>
          <pre>
curl -X POST https://accounts.spotify.com/api/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=authorization_code" \\
  -d "code=${code}" \\
  -d "redirect_uri=${spotifyRedirectUri}" \\
  -d "client_id=${spotifyClientId}" \\
  -d "client_secret=${process.env.SPOTIFY_CLIENT_SECRET || '1a522f0b4a484e8abcf018972b2d69a8'}"
          </pre>
          <p>Copy the <strong>refresh_token</strong> from the response and add it to your .env file</p>
        `);

        console.log('\n✅ Authorization code received:');
        console.log(code);
        console.log('\n📋 Run this command to get refresh token:');
        console.log(`\ncurl -X POST https://accounts.spotify.com/api/token \\`);
        console.log(`  -H "Content-Type: application/x-www-form-urlencoded" \\`);
        console.log(`  -d "grant_type=authorization_code" \\`);
        console.log(`  -d "code=${code}" \\`);
        console.log(`  -d "redirect_uri=${spotifyRedirectUri}" \\`);
        console.log(`  -d "client_id=${spotifyClientId}" \\`);
        console.log(`  -d "client_secret=${process.env.SPOTIFY_CLIENT_SECRET || '1a522f0b4a484e8abcf018972b2d69a8'}"\n`);

        setTimeout(() => {
          console.log('\nServer will close in 5 seconds...');
          setTimeout(() => process.exit(0), 5000);
        }, 1000);
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  server.listen(3000, () => {
    console.log('✅ Server ready! Visit the Spotify authorization URL above.');
  });
}
