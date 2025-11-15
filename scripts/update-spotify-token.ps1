# Update Spotify Refresh Token in .env.local
# Usage: .\update-spotify-token.ps1 "your_new_refresh_token_here"

param(
    [Parameter(Mandatory=$true)]
    [string]$NewToken
)

$envFile = ".env.local"

if (-not (Test-Path $envFile)) {
    Write-Host "❌ Error: .env.local file not found!" -ForegroundColor Red
    Write-Host "   Creating new .env.local file..." -ForegroundColor Yellow
    New-Item -Path $envFile -ItemType File -Force | Out-Null
}

Write-Host "🔄 Updating Spotify refresh token in .env.local..." -ForegroundColor Cyan

# Read current content
$content = Get-Content $envFile -Raw -ErrorAction SilentlyContinue

if ($content -match 'SPOTIFY_REFRESH_TOKEN=') {
    # Replace existing token
    $newContent = $content -replace 'SPOTIFY_REFRESH_TOKEN=.*', "SPOTIFY_REFRESH_TOKEN=$NewToken"
    Write-Host "✅ Existing token replaced" -ForegroundColor Green
} else {
    # Append new token
    if ($content -and -not $content.EndsWith("`n")) {
        $newContent = $content + "`n"
    } else {
        $newContent = $content
    }
    $newContent += "SPOTIFY_REFRESH_TOKEN=$NewToken`n"
    Write-Host "✅ New token added" -ForegroundColor Green
}

# Write updated content
Set-Content -Path $envFile -Value $newContent -NoNewline

Write-Host ""
Write-Host "━" * 60 -ForegroundColor Gray
Write-Host "📝 Token updated in .env.local" -ForegroundColor Green
Write-Host "━" * 60 -ForegroundColor Gray
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Restart your dev server (Ctrl+C then 'npm run dev')" -ForegroundColor Gray
Write-Host "  2. Test with: curl http://localhost:3000/api/spotify/debug" -ForegroundColor Gray
Write-Host "  3. Verify widget shows current playback" -ForegroundColor Gray
Write-Host ""

# Show token preview
$tokenPreview = $NewToken.Substring(0, [Math]::Min(20, $NewToken.Length)) + "..."
Write-Host "Token preview: $tokenPreview" -ForegroundColor Gray
Write-Host ""
