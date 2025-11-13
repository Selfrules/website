# [SP-001] Integrazione Spotify API Now Playing

## Metadata
- **Story ID**: SP-001 | **Epic**: [EPIC-005](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 💻 **Claude Code Locale**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** visitatore **Voglio** vedere cosa sta ascoltando Mattia su Spotify **Così che** possa scoprire la sua musica e sentirlo più vicino

## Criteri di Accettazione
- [ ] **AC1**: API endpoint `/api/spotify/now-playing` funzionante
- [ ] **AC2**: Mostra canzone attualmente in ascolto (titolo, artista, copertina)
- [ ] **AC3**: Auto-refresh ogni 30s per aggiornare
- [ ] **AC4**: Fallback quando Mattia è offline/non sta ascoltando
- [ ] **AC5**: Link alla canzone su Spotify

## Implementazione

### 1. Spotify OAuth Setup
```typescript
// lib/spotify/auth.ts
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

export async function getAccessToken() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
}
```

### 2. API Route
```typescript
// app/api/spotify/now-playing/route.ts
export async function GET() {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  if (response.status === 204) {
    return Response.json({ isPlaying: false });
  }

  const song = await response.json();

  return Response.json({
    isPlaying: true,
    title: song.item.name,
    artist: song.item.artists.map(a => a.name).join(', '),
    albumArt: song.item.album.images[0].url,
    songUrl: song.item.external_urls.spotify,
  });
}
```

### 3. Frontend Integration
```tsx
// components/NowPlaying.tsx
export function NowPlaying() {
  const { data, isLoading } = useQuery({
    queryKey: ['now-playing'],
    queryFn: () => fetch('/api/spotify/now-playing').then(r => r.json()),
    refetchInterval: 30000, // 30s
  });

  if (isLoading) return <Skeleton />;

  if (!data?.isPlaying) {
    return <OfflineState />;
  }

  return (
    <a href={data.songUrl} target="_blank" className="border-brutal shadow-brutal rounded-brutal p-brutal-md">
      <img src={data.albumArt} alt="Album art" />
      <h4>{data.title}</h4>
      <p>{data.artist}</p>
      <span>🎵 Ascoltando ora</span>
    </a>
  );
}
```

## Setup Steps
1. Creare Spotify App su [developer.spotify.com](https://developer.spotify.com)
2. Ottenere Client ID e Client Secret
3. Autorizzare app con scope `user-read-currently-playing`
4. Salvare Refresh Token in env variables

## Test Plan
```typescript
test('API returns now playing', async () => {
  const response = await fetch('/api/spotify/now-playing');
  const data = await response.json();

  if (data.isPlaying) {
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('artist');
  }
});

test('handles offline state', async () => {
  // Mock Spotify API 204 response
  // Verify fallback displayed
});
```

## Environment Variables
```env
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

## Definition of Done
- [ ] Spotify Developer App creato
- [ ] OAuth flow completato
- [ ] API route funzionante
- [ ] Frontend mostra now playing
- [ ] Auto-refresh ogni 30s
- [ ] Fallback per offline
- [ ] Link a Spotify funzionante
- [ ] Tests passano
