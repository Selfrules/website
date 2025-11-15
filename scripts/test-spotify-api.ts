/**
 * Spotify API Test Script
 * Tests the Spotify integration end-to-end
 *
 * Usage: Set environment variables before running:
 *   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=xxx SPOTIFY_REFRESH_TOKEN=xxx npx tsx scripts/test-spotify-api.ts
 */

async function testSpotifyAPI() {
  console.log('🎵 Testing Spotify API Integration\n');

  // 1. Check environment variables
  console.log('1️⃣ Checking environment variables...');
  const requiredEnvVars = [
    'SPOTIFY_CLIENT_ID',
    'SPOTIFY_CLIENT_SECRET',
    'SPOTIFY_REFRESH_TOKEN',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars.join(', '));
    console.log('\n📝 Expected variables:');
    requiredEnvVars.forEach(varName => {
      console.log(`   - ${varName}: ${process.env[varName] ? '✅ Set' : '❌ Missing'}`);
    });
    return;
  }

  console.log('✅ All environment variables are set\n');

  // 2. Test token refresh
  console.log('2️⃣ Testing Spotify token refresh...');
  try {
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
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('❌ Token refresh failed:', tokenResponse.status, errorText);
      return;
    }

    const tokenData = await tokenResponse.json();
    console.log('✅ Token refresh successful');
    console.log(`   Access token: ${tokenData.access_token.substring(0, 20)}...`);
    console.log(`   Expires in: ${tokenData.expires_in}s\n`);

    const accessToken = tokenData.access_token;

    // 3. Test currently playing endpoint
    console.log('3️⃣ Testing currently playing endpoint...');
    const nowPlayingResponse = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(`   Status: ${nowPlayingResponse.status}`);

    if (nowPlayingResponse.status === 204) {
      console.log('⚠️  Nothing currently playing (status 204)');
      console.log('   Trying recently played instead...\n');

      // 4. Test recently played endpoint
      console.log('4️⃣ Testing recently played endpoint...');
      const recentResponse = await fetch(
        'https://api.spotify.com/v1/me/player/recently-played?limit=1',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!recentResponse.ok) {
        console.error('❌ Recently played failed:', recentResponse.status);
        return;
      }

      const recentData = await recentResponse.json();

      if (recentData.items && recentData.items.length > 0) {
        const track = recentData.items[0].track;
        console.log('✅ Recently played track found:');
        console.log(`   Track: ${track.name}`);
        console.log(`   Artist: ${track.artists.map((a: any) => a.name).join(', ')}`);
        console.log(`   Album: ${track.album.name}`);
        console.log(`   Played at: ${recentData.items[0].played_at}`);
      } else {
        console.log('⚠️  No recently played tracks found');
      }
    } else if (nowPlayingResponse.ok) {
      const nowPlayingData = await nowPlayingResponse.json();

      if (nowPlayingData.item) {
        console.log('✅ Currently playing:');
        console.log(`   Track: ${nowPlayingData.item.name}`);
        console.log(`   Artist: ${nowPlayingData.item.artists.map((a: any) => a.name).join(', ')}`);
        console.log(`   Album: ${nowPlayingData.item.album.name}`);
        console.log(`   Is playing: ${nowPlayingData.is_playing}`);
        console.log(`   Progress: ${nowPlayingData.progress_ms}ms / ${nowPlayingData.item.duration_ms}ms`);
      } else {
        console.log('⚠️  Response OK but no item in data');
      }
    } else {
      console.error('❌ Now playing request failed:', nowPlayingResponse.status);
      const errorText = await nowPlayingResponse.text();
      console.error('   Error:', errorText);
    }

    // 5. Test local API endpoint
    console.log('\n5️⃣ Testing local API endpoint...');
    try {
      const localResponse = await fetch('http://localhost:3000/api/spotify/now-playing');

      console.log(`   Status: ${localResponse.status}`);

      if (localResponse.ok) {
        const localData = await localResponse.json();
        console.log('✅ Local API response:');
        console.log(JSON.stringify(localData, null, 2));
      } else {
        console.log('⚠️  Local API not available (dev server might not be running)');
        console.log('   Run `npm run dev` first to test the local endpoint');
      }
    } catch (error) {
      console.log('⚠️  Could not connect to local API (dev server not running)');
      console.log('   This is expected if the dev server is not running');
    }

    console.log('\n✅ Spotify API test complete!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSpotifyAPI();
