# [SP-002] Widget Podcast Recenti

## Metadata
- **Story ID**: SP-002 | **Epic**: [EPIC-005](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟢 S (2-4h)
- **Execution Environment**: 💻 **Claude Code Locale**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** visitatore **Voglio** vedere podcast che Mattia ha ascoltato **Così che** possa scoprire contenuti interessanti

## Criteri di Accettazione
- [ ] **AC1**: Mostra 1-2 podcast ascoltati recentemente
- [ ] **AC2**: Include: titolo, show, copertina
- [ ] **AC3**: Link al podcast su Spotify
- [ ] **AC4**: Aggiornamento periodico (es. daily)

## Implementazione

### 1. API Route
```typescript
// app/api/spotify/recent-podcasts/route.ts
export async function GET() {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    'https://api.spotify.com/v1/me/player/recently-played?limit=50',
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  const data = await response.json();

  // Filter only podcasts (type: 'episode')
  const podcasts = data.items
    .filter(item => item.track.type === 'episode')
    .slice(0, 2) // Top 2
    .map(item => ({
      title: item.track.name,
      show: item.track.show.name,
      image: item.track.images[0]?.url,
      url: item.track.external_urls.spotify,
    }));

  return Response.json(podcasts);
}
```

### 2. Frontend Component
```tsx
// components/RecentPodcasts.tsx
export function RecentPodcasts() {
  const { data: podcasts } = useQuery({
    queryKey: ['recent-podcasts'],
    queryFn: () => fetch('/api/spotify/recent-podcasts').then(r => r.json()),
    staleTime: 24 * 60 * 60 * 1000, // Update daily
  });

  return (
    <div>
      <h3>Podcast ascoltati di recente</h3>
      <div className="grid gap-brutal-sm">
        {podcasts?.map(podcast => (
          <a
            key={podcast.url}
            href={podcast.url}
            className="border-brutal shadow-brutal-sm rounded-brutal p-brutal-sm"
          >
            <img src={podcast.image} alt={podcast.title} />
            <h4>{podcast.title}</h4>
            <p className="text-sm text-slate-blue">{podcast.show}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
```

## Integration in Now Playing Section
```tsx
// In homepage Now Playing section
<section className="now-playing">
  <NowPlaying />
  <RecentPodcasts />
</section>
```

## Test Plan
```typescript
test('API returns recent podcasts', async () => {
  const response = await fetch('/api/spotify/recent-podcasts');
  const podcasts = await response.json();

  expect(podcasts).toHaveLength(2);
  expect(podcasts[0]).toHaveProperty('title');
  expect(podcasts[0]).toHaveProperty('show');
});
```

## Definition of Done
- [ ] API route creato
- [ ] Frontend component creato
- [ ] Filtra solo podcast (non musica)
- [ ] Mostra top 2 podcast
- [ ] Link funzionanti
- [ ] Integrato in Now Playing section
- [ ] Tests passano

## Dipendenze
- [ ] SP-001 (Spotify OAuth setup)
