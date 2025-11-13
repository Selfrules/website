# [SP-003] UI/UX Sezione Now Playing

## Metadata
- **Story ID**: SP-003 | **Epic**: [EPIC-005](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟢 S (2-4h)
- **Execution Environment**: 🌐 **Claude Code Web**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** visitatore **Voglio** una sezione Now Playing visivamente accattivante **Così che** l'esperienza sia piacevole

## Criteri di Accettazione
- [ ] **AC1**: Design neobrutalist coerente con resto del sito
- [ ] **AC2**: Animazioni subtili (Framer Motion)
- [ ] **AC3**: Loading states eleganti (skeleton)
- [ ] **AC4**: Offline state chiaro e friendly
- [ ] **AC5**: Mobile responsive
- [ ] **AC6**: Dark mode compatibile

## Design Mockup

```tsx
<section className="now-playing py-brutal-xl">
  <div className="container">
    <h2 className="text-3xl font-bold mb-brutal-md">
      🎵 Now Playing
    </h2>

    <div className="grid md:grid-cols-2 gap-brutal-md">
      {/* Currently Playing */}
      <div className="border-brutal shadow-brutal rounded-brutal bg-white p-brutal-md">
        {isPlaying ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4"
          >
            <img
              src={albumArt}
              alt="Album"
              className="w-24 h-24 rounded-brutal border-brutal-thin"
            />
            <div>
              <span className="text-sm text-electric-blue font-bold">
                🔊 Ascoltando ora
              </span>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-slate-blue">{artist}</p>
              <a
                href={songUrl}
                className="text-sm underline"
                target="_blank"
              >
                Ascolta su Spotify →
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-brutal-md">
            <span className="text-6xl">🎧</span>
            <p className="text-slate-blue mt-4">
              Al momento non sto ascoltando nulla
            </p>
          </div>
        )}
      </div>

      {/* Recent Podcasts */}
      <div className="border-brutal shadow-brutal rounded-brutal bg-white p-brutal-md">
        <h3 className="font-bold mb-brutal-sm">
          🎙️ Podcast recenti
        </h3>
        <div className="space-y-brutal-sm">
          {podcasts.map(podcast => (
            <PodcastCard key={podcast.url} {...podcast} />
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

## Loading State (Skeleton)
```tsx
function NowPlayingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-24 w-24 bg-slate-200 rounded-brutal" />
      <div className="h-4 bg-slate-200 rounded mt-2" />
      <div className="h-4 bg-slate-200 rounded mt-2 w-3/4" />
    </div>
  );
}
```

## Animations
```tsx
// Subtle pulse on album art
<motion.img
  animate={{ scale: [1, 1.02, 1] }}
  transition={{ repeat: Infinity, duration: 2 }}
/>

// Fade in on load
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

## Test Plan
- [ ] Verifica visiva desktop
- [ ] Verifica visiva mobile
- [ ] Test loading state
- [ ] Test offline state
- [ ] Test dark mode
- [ ] Test animazioni

## Definition of Done
- [ ] Design system applicato
- [ ] Animazioni implementate
- [ ] Loading states implementati
- [ ] Offline state friendly
- [ ] Mobile responsive
- [ ] Dark mode funziona
- [ ] Verifica visiva completata

## Dipendenze
- [ ] SP-001 (Now Playing API)
- [ ] SP-002 (Podcasts API)
- [ ] EPIC-001 DS-001 (Design tokens)
