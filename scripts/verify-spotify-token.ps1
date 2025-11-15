# Spotify Token Verification Script (PowerShell)
# Quick check to verify if Spotify integration is working

Write-Host "🎵 Verifying Spotify Integration..." -ForegroundColor Cyan
Write-Host ""

# Check if dev server is running
try {
    $null = Invoke-WebRequest -Uri "http://localhost:3000/api/spotify/debug" -Method GET -TimeoutSec 2 -ErrorAction Stop
} catch {
    Write-Host "❌ Dev server is not running on port 3000" -ForegroundColor Red
    Write-Host "   Run: npm run dev" -ForegroundColor Yellow
    exit 1
}

# Call debug endpoint
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/spotify/debug" -Method GET

Write-Host "Token Refresh Status: $($response.tests.tokenRefresh.status)" -ForegroundColor White
Write-Host ""

if ($response.tests.tokenRefresh.status -eq "success") {
    Write-Host "✅ Spotify token is valid!" -ForegroundColor Green
    Write-Host "   Currently Playing: $($response.tests.currentlyPlaying.status)" -ForegroundColor Gray
    Write-Host "   Recently Played: $($response.tests.recentlyPlayed.status)" -ForegroundColor Gray
    Write-Host ""

    if ($response.tests.currentlyPlaying.status -eq "nothing_playing" -and $response.tests.recentlyPlayed.status -eq "success") {
        Write-Host "ℹ️  No music currently playing, but integration is working" -ForegroundColor Blue
        Write-Host "   Start playing on Spotify to see the widget in action" -ForegroundColor Gray
    } elseif ($response.tests.currentlyPlaying.status -eq "success") {
        Write-Host "🎶 Music is playing! Widget should show:" -ForegroundColor Green
        Write-Host "   Track: $($response.tests.currentlyPlaying.data.trackName)" -ForegroundColor White
        Write-Host "   Artist: $($response.tests.currentlyPlaying.data.artistName)" -ForegroundColor White
    }

    Write-Host ""
    Write-Host "Full debug info: http://localhost:3000/api/spotify/debug" -ForegroundColor Gray

} elseif ($response.tests.tokenRefresh.status -eq "failed") {
    Write-Host "❌ Spotify token is INVALID!" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Error: $($response.tests.tokenRefresh.error)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📚 Follow the guide to regenerate your token:" -ForegroundColor Cyan
    Write-Host "   docs\SPOTIFY_TOKEN_REFRESH.md" -ForegroundColor White
    Write-Host ""
    Write-Host "Quick steps:" -ForegroundColor Cyan
    Write-Host "   1. Go to https://developer.spotify.com/dashboard" -ForegroundColor Gray
    Write-Host "   2. Get authorization code with required scopes" -ForegroundColor Gray
    Write-Host "   3. Exchange for refresh token" -ForegroundColor Gray
    Write-Host "   4. Update .env.local with new token" -ForegroundColor Gray
    Write-Host "   5. Restart dev server" -ForegroundColor Gray

} else {
    Write-Host "⚠️  Unknown status" -ForegroundColor Yellow
    Write-Host "   Full response:" -ForegroundColor Gray
    $response | ConvertTo-Json -Depth 10
}

Write-Host ""
