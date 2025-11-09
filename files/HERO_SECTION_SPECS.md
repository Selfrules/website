# Hero Section - Specifiche Implementazione

## Overview
La Hero Section è il punto di ingresso visivo del portfolio, caratterizzata da:
- Grande headline multi-linea con sottotitolo
- Forme geometriche decorative sparse (cerchi, quadrati, rombi)
- Texture di sfondo con griglia sottile
- Due CTA button affiancati
- Badge label in alto "PM • DESIGNER • DEV"
- Design neobrutalist con elementi playful

## Struttura HTML

```html
<section class="hero-section">
  <!-- Background decorative elements -->
  <div class="hero-decorations">
    <div class="geometric-shape shape-circle pink top-left"></div>
    <div class="geometric-shape shape-diamond magenta middle-left"></div>
    <div class="geometric-shape shape-circle purple bottom-left"></div>
    <div class="geometric-shape shape-circle blue top-right"></div>
    <div class="geometric-shape shape-square yellow bottom-right"></div>
  </div>
  
  <!-- Background grid texture -->
  <div class="grid-texture"></div>
  
  <!-- Main content container -->
  <div class="hero-content-wrapper">
    <!-- Top badge label -->
    <div class="hero-badge">
      <span class="badge-icon">✨</span>
      <span class="badge-text">PM • DESIGNER • DEV</span>
    </div>
    
    <!-- Main headline -->
    <h1 class="hero-title">
      <span class="title-line line-1">Ho fallito come designer.</span>
      <span class="title-line line-2">Poi come developer.</span>
      <span class="title-line line-3">Ora sono un PM che sa</span>
      <span class="title-line line-4 highlight">davvero cosa costruire.</span>
    </h1>
    
    <!-- Subtitle -->
    <p class="hero-subtitle">
      Perché? Perché ho imparato che <strong>il prodotto perfetto non esiste.</strong><br>
      Esiste solo quello che risolve problemi reali per persone reali.
    </p>
    
    <!-- CTA Buttons -->
    <div class="hero-cta-group">
      <button class="btn-primary btn-hero">
        Parliamone →
      </button>
      <button class="btn-secondary btn-hero">
        Leggi la storia
      </button>
    </div>
  </div>
</section>
```

## Styling CSS/Tailwind

### Section Container
```css
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  
  /* Background color - off-white con sfumatura */
  background: linear-gradient(180deg, #FEFEFE 0%, #F5F5F5 100%);
  
  /* Border bottom brutalist */
  border-bottom: 4px solid #000;
  
  overflow: hidden;
}

/* Grid texture background */
.grid-texture {
  position: absolute;
  inset: 0;
  z-index: 0;
  
  /* Grid pattern sottile */
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  
  pointer-events: none;
}
```

### Geometric Shapes (Decorazioni)
```css
.hero-decorations {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.geometric-shape {
  position: absolute;
  border: 3px solid #000;
  
  /* Ombra hard neobrutalist */
  box-shadow: 6px 6px 0 #000;
}

/* Circle variants */
.shape-circle {
  border-radius: 50%;
}

.shape-circle.pink {
  top: 8%;
  left: 5%;
  width: 80px;
  height: 80px;
  background: #FF1B8D;
}

.shape-circle.purple {
  bottom: 12%;
  left: 8%;
  width: 60px;
  height: 60px;
  background: #9333EA;
}

.shape-circle.blue {
  top: 15%;
  right: 10%;
  width: 100px;
  height: 100px;
  background: #1E90FF;
}

/* Diamond shape */
.shape-diamond {
  top: 45%;
  left: 3%;
  width: 50px;
  height: 50px;
  background: #FF1B8D;
  transform: rotate(45deg);
}

/* Square shape */
.shape-square {
  bottom: 20%;
  right: 8%;
  width: 90px;
  height: 90px;
  background: #FFD93D;
  border-radius: 8px;
}

/* Animazione float sottile */
@keyframes float-gentle {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

.geometric-shape {
  animation: float-gentle 6s ease-in-out infinite;
}

.shape-circle.purple { animation-delay: 0.5s; }
.shape-circle.blue { animation-delay: 1s; }
.shape-diamond { animation-delay: 1.5s; }
.shape-square { animation-delay: 2s; }
```

### Content Wrapper
```css
.hero-content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}
```

### Top Badge Label
```css
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  padding: 10px 20px;
  margin-bottom: 32px;
  
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
  
  /* Brutalist structure */
  background: #FF1B8D;
  border: 3px solid #000;
  border-radius: 6px;
  box-shadow: 4px 4px 0 #000;
  
  transition: all 0.2s ease;
}

.hero-badge:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000;
}

.badge-icon {
  font-size: 16px;
}
```

### Main Title
```css
.hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 900;
  line-height: 1.1;
  color: #1A1A1A;
  
  margin-bottom: 32px;
  
  /* Text shadow sottile per depth */
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.05);
}

.title-line {
  display: block;
}

/* Highlight line con underline colorato */
.title-line.highlight {
  position: relative;
  display: inline-block;
  
  color: #1E90FF;
}

.title-line.highlight::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 12px;
  
  background: #FFD93D;
  border: 2px solid #000;
  
  z-index: -1;
  
  /* Slight rotation for playful effect */
  transform: skewX(-2deg);
}

/* Responsive font size */
@media (max-width: 768px) {
  .hero-title {
    font-size: clamp(32px, 8vw, 48px);
    line-height: 1.15;
  }
  
  .title-line.highlight::after {
    height: 8px;
    bottom: 2px;
  }
}
```

### Subtitle
```css
.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 400;
  line-height: 1.6;
  color: #404040;
  
  max-width: 800px;
  margin: 0 auto 48px;
}

.hero-subtitle strong {
  font-weight: 700;
  color: #FF1B8D;
}
```

### CTA Button Group
```css
.hero-cta-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-hero {
  padding: 18px 36px;
  font-size: 18px;
  font-weight: 700;
  min-width: 200px;
}

/* Primary button */
.btn-primary.btn-hero {
  background: #1E90FF;
  color: #fff;
  border: 4px solid #000;
  border-radius: 6px;
  box-shadow: 6px 6px 0 #000;
  
  font-family: 'Space Grotesk', sans-serif;
  text-transform: none;
  letter-spacing: 0;
  
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary.btn-hero:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #000;
  background: #1873CC;
}

.btn-primary.btn-hero:active {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0 #000;
}

/* Secondary button */
.btn-secondary.btn-hero {
  background: #fff;
  color: #1A1A1A;
  border: 4px solid #000;
  border-radius: 6px;
  box-shadow: 6px 6px 0 #000;
  
  font-family: 'Space Grotesk', sans-serif;
  text-transform: none;
  letter-spacing: 0;
  
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-secondary.btn-hero:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #000;
  background: #F5F5F5;
}

.btn-secondary.btn-hero:active {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0 #000;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .hero-cta-group {
    flex-direction: column;
    gap: 12px;
  }
  
  .btn-hero {
    width: 100%;
    max-width: 320px;
  }
}
```

## Animazioni e Interazioni

### Fade-in animazione al caricamento
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

.hero-badge {
  animation: fade-in-up 0.6s ease-out 0.2s backwards;
}

.hero-title {
  animation: fade-in-up 0.6s ease-out 0.4s backwards;
}

.hero-subtitle {
  animation: fade-in-up 0.6s ease-out 0.6s backwards;
}

.hero-cta-group {
  animation: fade-in-up 0.6s ease-out 0.8s backwards;
}

/* Reduce motion per accessibility */
@media (prefers-reduced-motion: reduce) {
  .hero-badge,
  .hero-title,
  .hero-subtitle,
  .hero-cta-group {
    animation: none;
  }
  
  .geometric-shape {
    animation: none;
  }
}
```

## Responsive Breakpoints

### Tablet (768px - 1024px)
```css
@media (max-width: 1024px) {
  .hero-section {
    padding: 100px 32px 60px;
  }
  
  .hero-content-wrapper {
    max-width: 700px;
  }
  
  /* Riduci dimensione forme decorative */
  .shape-circle.pink { width: 60px; height: 60px; }
  .shape-circle.blue { width: 80px; height: 80px; }
  .shape-square { width: 70px; height: 70px; }
}
```

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
    padding: 80px 20px 60px;
  }
  
  /* Nascondi alcune forme decorative su mobile per pulizia */
  .shape-circle.pink,
  .shape-square {
    display: none;
  }
  
  /* Riposiziona forme rimanenti */
  .shape-circle.blue {
    top: 5%;
    right: 5%;
    width: 50px;
    height: 50px;
  }
  
  .shape-diamond {
    top: auto;
    bottom: 15%;
    left: 5%;
    width: 40px;
    height: 40px;
  }
  
  .hero-badge {
    font-size: 12px;
    padding: 8px 16px;
  }
  
  .hero-subtitle {
    font-size: 16px;
    margin-bottom: 32px;
  }
}
```

## Note Implementazione

1. **Z-index layers**:
   - Grid texture: `z-index: 0`
   - Geometric shapes: `z-index: 1`
   - Content wrapper: `z-index: 2`

2. **Performance**:
   - Forme geometriche usano `will-change: transform` per animazioni smooth
   - Grid texture è `pointer-events: none` per non interferire con interazioni

3. **Accessibilità**:
   - Titolo usa tag semantico `<h1>`
   - Badge decorativo può avere `aria-hidden="true"` se puramente estetico
   - Rispetta `prefers-reduced-motion` per animazioni

4. **Color palette**:
   - Pink: `#FF1B8D`
   - Blue: `#1E90FF`
   - Purple: `#9333EA`
   - Yellow: `#FFD93D`
   - Black: `#000000`

5. **Fonts**:
   - Headline: Space Grotesk 900
   - Subtitle: Inter 400/700
   - Badge: Space Grotesk 700

Questa implementazione mantiene la struttura visiva del Figma con tutti gli elementi caratteristici: forme geometriche, texture griglia, badge label, highlight colorato, e i due CTA button con styling neobrutalist.
