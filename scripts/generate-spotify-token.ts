/**
 * Spotify Token Generation Helper
 * Generates the authorization URL for Spotify OAuth flow
 */

import * as readline from 'readline';

const SPOTIFY_SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
];

async function generateAuthUrl() {
  console.log('🎵 Spotify Token Generation\n');

  // Read environment variables
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    console.error('❌ Error: SPOTIFY_CLIENT_ID not found in environment variables');
    console.log('\nPlease set it in your .env.local file:');
    console.log('   SPOTIFY_CLIENT_ID=your_client_id_here\n');
    process.exit(1);
  }

  console.log('✅ Client ID found:', clientId.substring(0, 8) + '...\n');

  // Determine redirect URI based on environment
  const redirectUri = process.env.NODE_ENV === 'production'
    ? 'https://yourdomain.com/api/spotify/auth/callback'
    : 'http://localhost:3000/api/spotify/auth/callback';

  console.log(`📍 Redirect URI: ${redirectUri}\n`);

  // Build authorization URL
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', SPOTIFY_SCOPES.join(' '));
  authUrl.searchParams.set('show_dialog', 'true'); // Force consent screen

  console.log('━'.repeat(80));
  console.log('📋 AUTHORIZATION URL');
  console.log('━'.repeat(80));
  console.log('\n' + authUrl.toString() + '\n');
  console.log('━'.repeat(80));
  console.log('\n');

  console.log('📖 Instructions:\n');
  console.log('1. Make sure your dev server is running:');
  console.log('   npm run dev\n');
  console.log('2. Copy the URL above and open it in your browser');
  console.log('3. Log in to Spotify and approve the permissions');
  console.log('4. You will be redirected to a success page');
  console.log('5. Copy the REFRESH TOKEN from that page');
  console.log('6. Add it to your .env.local file:');
  console.log('   SPOTIFY_REFRESH_TOKEN=your_refresh_token_here\n');
  console.log('7. Restart the dev server\n');

  console.log('━'.repeat(80));
  console.log('🔐 Required Scopes:');
  console.log('━'.repeat(80));
  SPOTIFY_SCOPES.forEach(scope => {
    console.log(`   • ${scope}`);
  });
  console.log('\n');

  // Ask if user wants to open the URL automatically
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Do you want to open this URL in your browser now? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      console.log('\n🌐 Opening browser...\n');

      // Platform-specific browser opening
      const { exec } = require('child_process');
      const platform = process.platform;

      let command;
      if (platform === 'win32') {
        command = `start "${authUrl.toString()}"`;
      } else if (platform === 'darwin') {
        command = `open "${authUrl.toString()}"`;
      } else {
        command = `xdg-open "${authUrl.toString()}"`;
      }

      exec(command, (error: any) => {
        if (error) {
          console.error('Failed to open browser automatically.');
          console.log('Please copy and paste the URL manually.');
        } else {
          console.log('✅ Browser opened! Follow the instructions in the browser.');
        }
        rl.close();
      });
    } else {
      console.log('\nPlease copy the URL above and open it manually in your browser.\n');
      rl.close();
    }
  });
}

generateAuthUrl();
