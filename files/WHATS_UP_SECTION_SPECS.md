# What I'm Up To Section - Specifiche Implementazione

## Overview
La sezione "What I'm up to" mostra in real-time cosa stai facendo professionalmente, cosa stai imparando e la tua playlist del momento. Caratteristiche:
- Titolo sezione centrato con badge label
- Tre card affiancate con contenuto diverso
- Icone colorate circolari in alto a sinistra di ogni card
- Card "Lavoro attuale" con link a QubicaAMF e metric badge
- Card "Learning in Public" con highlight text
- Card "Now Playing" con Spotify player embedded
- Design pulito e spazioso
- Background off-white

## Struttura HTML

```html
<section class="whats-up-section">
  <!-- Section container -->
  <div class="whats-up-container">
    
    <!-- Section header -->
    <div class="whats-up-header">
      <div class="section-badge">
        <span>COSA STO FACENDO</span>
      </div>
      <h2 class="section-title">What I'm up to</h2>
      <p class="section-subtitle">
        Una finestra sulla mia vita professionale <span class="highlight-text">in real-time</span>
      </p>
    </div>
    
    <!-- Cards grid -->
    <div class="whats-up-grid">
      
      <!-- Card 1: Current Work -->
      <article class="whats-up-card">
        <!-- Icon -->
        <div class="card-icon icon-blue">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        
        <!-- Card content -->
        <div class="card-content">
          <h3 class="card-title">Lavoro attuale</h3>
          
          <p class="card-text">
            Product Manager @ <a href="#" class="link-styled">QubicaAMF</a> - Sto 
            rendendo i pagamenti 12% più veloci. Come? Ascoltando chi usa il sistema 
            ogni giorno invece di fare meeting su meeting.
          </p>
          
          <!-- Metric badge -->
          <div class="metric-badge">
            <span class="metric-icon">📈</span>
            <span class="metric-text">-12% tempi</span>
          </div>
        </div>
      </article>
      
      <!-- Card 2: Learning in Public -->
      <article class="whats-up-card">
        <!-- Icon -->
        <div class="card-icon icon-magenta">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="card-content">
          <h3 class="card-title">Learning in Public</h3>
          
          <p class="card-text">
            Questa settimana: come <span class="highlight-pink">l'AI sta cambiando</span> 
            il mio workflow. Non sostituisce il mio lavoro, lo amplifica. Il trucco? 
            Sapere cosa delegare e cosa tenere.
          </p>
        </div>
      </article>
      
      <!-- Card 3: Now Playing -->
      <article class="whats-up-card card-spotify">
        <!-- Icon -->
        <div class="card-icon icon-yellow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="card-content">
          <h3 class="card-title">Now Playing</h3>
          
          <!-- Spotify embed placeholder -->
          <div class="spotify-player">
            <div class="spotify-artwork">
              <img src="/api/placeholder/200/200" alt="Album cover" />
            </div>
            <div class="spotify-info">
              <p class="spotify-track">Deep Focus Playlist</p>
              <p class="spotify-artist">Coding & Creating</p>
            </div>
            <div class="spotify-visualizer">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </div>
          </div>
        </div>
      </article>
      
    </div>
  </div>
</section>
```

## Styling CSS/Tailwind

### Section Container
```css
.whats-up-section {
  padding: 100px 24px;
  background: linear-gradient(180deg, #FEFEFE 0%, #F8F8F8 100%);
  border-bottom: 4px solid #000;
}

.whats-up-container {
  max-width: 1200px;
  margin: 0 auto;
}
```

### Section Header
```css
.whats-up-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-badge {
  display: inline-flex;
  padding: 10px 20px;
  margin-bottom: 24px;
  
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
  
  background: #1E90FF;
  border: 3px solid #000;
  border-radius: 6px;
  box-shadow: 4px 4px 0 #000;
}

.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 900;
  line-height: 1.2;
  color: #1A1A1A;
  margin-bottom: 16px;
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  line-height: 1.6;
  color: #404040;
}

.highlight-text {
  color: #1E90FF;
  font-weight: 600;
}
```

### Cards Grid
```css
.whats-up-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

@media (max-width: 1024px) {
  .whats-up-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

### Card Base Style
```css
.whats-up-card {
  background: #fff;
  border: 4px solid #000;
  border-radius: 8px;
  box-shadow: 8px 8px 0 #000;
  padding: 32px;
  
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.whats-up-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 11px 11px 0 #000;
}

/* Subtle background gradient on hover */
.whats-up-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(30, 144, 255, 0.03) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.whats-up-card:hover::before {
  opacity: 1;
}
```

### Card Icon
```css
.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid #000;
  box-shadow: 4px 4px 0 #000;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  flex-shrink: 0;
  
  transition: all 0.3s ease;
}

.whats-up-card:hover .card-icon {
  transform: rotate(10deg) scale(1.05);
  box-shadow: 5px 5px 0 #000;
}

.card-icon svg {
  width: 24px;
  height: 24px;
}

/* Icon color variants */
.icon-blue {
  background: #1E90FF;
  color: #fff;
}

.icon-magenta {
  background: #FF1B8D;
  color: #fff;
}

.icon-yellow {
  background: #FFD93D;
  color: #000;
}
```

### Card Content
```css
.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.card-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  color: #1A1A1A;
}

.card-text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: #404040;
}

/* Styled link */
.link-styled {
  color: #1E90FF;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.link-styled:hover {
  border-bottom-color: #1E90FF;
}

/* Highlight text in card */
.highlight-pink {
  color: #FF1B8D;
  font-weight: 600;
  position: relative;
}

.highlight-pink::after {
  content: '';
  position: absolute;
  left: -2px;
  right: -2px;
  bottom: 0;
  height: 8px;
  background: rgba(255, 27, 141, 0.15);
  z-index: -1;
}
```

### Metric Badge
```css
.metric-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  
  background: #F0F9FF;
  border: 2px solid #1E90FF;
  border-radius: 6px;
  
  align-self: flex-start;
  
  transition: all 0.2s ease;
}

.whats-up-card:hover .metric-badge {
  background: #E0F2FE;
  border-width: 3px;
}

.metric-icon {
  font-size: 18px;
}

.metric-text {
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #1E90FF;
}
```

### Spotify Player
```css
.card-spotify {
  background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);
  border-color: #000;
}

.card-spotify .card-title,
.card-spotify .card-text {
  color: #FAFAFA;
}

.spotify-player {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.spotify-artwork {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.spotify-artwork img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spotify-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spotify-track {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.spotify-artist {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Audio visualizer */
.spotify-visualizer {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  height: 40px;
  padding: 8px 0;
}

.spotify-visualizer .bar {
  width: 4px;
  background: #1DB954; /* Spotify green */
  border-radius: 2px;
  animation: audio-wave 1s ease-in-out infinite;
}

.spotify-visualizer .bar:nth-child(1) {
  height: 20%;
  animation-delay: 0s;
}

.spotify-visualizer .bar:nth-child(2) {
  height: 50%;
  animation-delay: 0.2s;
}

.spotify-visualizer .bar:nth-child(3) {
  height: 80%;
  animation-delay: 0.4s;
}

.spotify-visualizer .bar:nth-child(4) {
  height: 40%;
  animation-delay: 0.6s;
}

.spotify-visualizer .bar:nth-child(5) {
  height: 60%;
  animation-delay: 0.8s;
}

@keyframes audio-wave {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.5);
  }
}
```

## Responsive Design

### Tablet (768px - 1024px)
```css
@media (max-width: 1024px) and (min-width: 768px) {
  .whats-up-grid {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .whats-up-card {
    padding: 28px;
  }
}
```

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .whats-up-section {
    padding: 60px 20px;
  }
  
  .whats-up-header {
    margin-bottom: 48px;
  }
  
  .section-badge {
    font-size: 12px;
    padding: 8px 16px;
  }
  
  .section-title {
    font-size: 32px;
  }
  
  .section-subtitle {
    font-size: 16px;
  }
  
  .whats-up-grid {
    gap: 20px;
  }
  
  .whats-up-card {
    padding: 24px;
    gap: 20px;
  }
  
  .card-icon {
    width: 48px;
    height: 48px;
  }
  
  .card-icon svg {
    width: 20px;
    height: 20px;
  }
  
  .card-title {
    font-size: 20px;
  }
  
  .card-text {
    font-size: 15px;
  }
  
  .spotify-player {
    padding: 16px;
  }
}
```

## Animazioni

### Entrance animations
```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.whats-up-card {
  animation: fade-in-up 0.6s ease-out backwards;
}

.whats-up-card:nth-child(1) {
  animation-delay: 0.1s;
}

.whats-up-card:nth-child(2) {
  animation-delay: 0.2s;
}

.whats-up-card:nth-child(3) {
  animation-delay: 0.3s;
}

/* Icon rotation on load */
@keyframes icon-pop {
  0% {
    transform: scale(0) rotate(-180deg);
  }
  50% {
    transform: scale(1.1) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.card-icon {
  animation: icon-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

.whats-up-card:nth-child(1) .card-icon {
  animation-delay: 0.3s;
}

.whats-up-card:nth-child(2) .card-icon {
  animation-delay: 0.4s;
}

.whats-up-card:nth-child(3) .card-icon {
  animation-delay: 0.5s;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .whats-up-card,
  .card-icon {
    animation: none;
  }
  
  .spotify-visualizer .bar {
    animation: none;
    height: 50% !important;
  }
}
```

## Integrazione Spotify (Optional)

Se vuoi integrare l'API Spotify vera:

```javascript
// Fetch Now Playing from Spotify API
async function updateNowPlaying() {
  try {
    const response = await fetch('/api/spotify/now-playing');
    const data = await response.json();
    
    if (data.isPlaying) {
      document.querySelector('.spotify-track').textContent = data.title;
      document.querySelector('.spotify-artist').textContent = data.artist;
      document.querySelector('.spotify-artwork img').src = data.albumArt;
    }
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
  }
}

// Update every 30 seconds
setInterval(updateNowPlaying, 30000);
updateNowPlaying();
```

## Accessibilità

### ARIA labels
```html
<article class="whats-up-card" role="article" aria-labelledby="work-title">
  <div class="card-icon icon-blue" aria-hidden="true">
    <!-- icon -->
  </div>
  <div class="card-content">
    <h3 id="work-title" class="card-title">Lavoro attuale</h3>
    <!-- content -->
  </div>
</article>
```

### Focus states
```css
.whats-up-card:focus-within {
  outline: 4px solid #1E90FF;
  outline-offset: 4px;
}

.link-styled:focus-visible {
  outline: 3px solid #1E90FF;
  outline-offset: 2px;
  border-radius: 2px;
}
```

## Note Implementazione

1. **Spaziatura consistente**: Tutte le card hanno lo stesso padding (32px) e gap interno (24px)
2. **Icone circolari**: Diametro 56px con bordo 3px e ombra hard 4px
3. **Color coding icone**:
   - Blue (#1E90FF): Lavoro/Work
   - Magenta (#FF1B8D): Learning/Education
   - Yellow (#FFD93D): Music/Entertainment
4. **Spotify card speciale**: Background dark con gradiente, testo bianco
5. **Audio visualizer**: 5 barre animate con Spotify green (#1DB954)
6. **Metric badge**: Background azzurro chiaro (#F0F9FF) con bordo blu
7. **Hover effects**: Tutte le card si sollevano (-3px) con ombra che cresce
8. **Link styling**: Sottolineatura animata al hover
9. **Responsive**: Mobile diventa single column, card maintain aspetto pulito

Questa implementazione mantiene la pulizia visiva e lo spacing generoso del design Figma, con card ben organizzate e contenuto facilmente scannable.
