# Collaborazioni Section - Specifiche Implementazione

## Overview
La sezione "Come possiamo lavorare insieme" presenta le modalità di collaborazione con:
- Titolo sezione centrato con badge label "COLLABORAZIONI"
- Sottotitolo con highlight rosa "Vendo risultati"
- Tre card di servizio in grid layout
- Icone colorate circolari per ogni servizio
- Numerazione visual (01, 02, 03) in grande trasparente
- Lista benefici con checkmark
- CTA gradient in fondo alla sezione
- Design neobrutalist pulito

## Struttura HTML

```html
<section class="work-together-section">
  <!-- Section container -->
  <div class="work-together-container">
    
    <!-- Section header -->
    <div class="work-together-header">
      <div class="section-badge">
        <span>COLLABORAZIONI</span>
      </div>
      <h2 class="section-title">Come possiamo lavorare insieme</h2>
      <p class="section-subtitle">
        Non vendo consulenze. Non vendo ore. <span class="highlight-pink">Vendo risultati.</span>
      </p>
    </div>
    
    <!-- Services grid -->
    <div class="services-grid">
      
      <!-- Service 1: Strategic Consultations -->
      <article class="service-card">
        <!-- Number background -->
        <div class="card-number">01</div>
        
        <!-- Icon -->
        <div class="card-icon icon-blue">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <!-- Content -->
        <div class="card-content">
          <h3 class="card-title">Consulenze strategiche</h3>
          <p class="card-description">
            Sblocchiamo il tuo prodotto in 90 minuti
          </p>
          
          <!-- Benefits list -->
          <ul class="benefits-list">
            <li>
              <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Analisi del problema reale (non quello che pensi di avere)
            </li>
            <li>
              <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Strategia concreta da implementare subito
            </li>
            <li>
              <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Roadmap prioritizzata per i prossimi 3 mesi
            </li>
          </ul>
        </div>
      </article>
      
      <!-- Service 2: Brainstorming Sessions -->
      <article class="service-card">
        <div class="card-number">02</div>
        
        <div class="card-icon icon-magenta">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="card-content">
          <h3 class="card-title">Brainstorming sessions</h3>
          <p class="card-description">
            Due cervelli, un problema, infinite soluzioni
          </p>
          
          <ul class="benefits-list">
            <li>
              <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Sessioni da 60 minuti focus su un problema specifico
            </li>
            <li>
              <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Approccio design thinking + esperienza tecnica
            </li>
            <li>
              <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Actionable output, non solo idee
            </li>
          </ul>
        </div>
      </article>
      
      <!-- Service 3: Mentorship -->
      <article class="service-card">
        <div class="card-number">03</div>
        
        <div class="card-icon icon-purple">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="card-content">
          <h3 class="card-title">Mentorship</h3>
          <p class="card-description">
            Il percorso che avrei voluto qualcuno mi mostrasse
          </p>
          
          <ul class="benefits-list">
            <li>
              <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              1-on-1 mensile per product managers
            </li>
            <li>
              <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Design → Dev → PM career transition
            </li>
            <li>
              <svg class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Portfolio review e career strategy
            </li>
          </ul>
        </div>
      </article>
      
    </div>
    
    <!-- Bottom CTA -->
    <div class="section-cta">
      <div class="cta-card">
        <p class="cta-text">Pronto a trasformare la tua idea in prodotto?</p>
        <button class="btn-cta-primary">
          Prenota una chiamata
        </button>
      </div>
    </div>
    
  </div>
</section>
```

## Styling CSS/Tailwind

### Section Container
```css
.work-together-section {
  padding: 100px 24px;
  background: linear-gradient(180deg, #FEFEFE 0%, #F5F5F5 100%);
  border-bottom: 4px solid #000;
}

.work-together-container {
  max-width: 1200px;
  margin: 0 auto;
}
```

### Section Header
```css
.work-together-header {
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
  
  background: #FFD93D;
  border: 3px solid #000;
  border-radius: 6px;
  box-shadow: 4px 4px 0 #000;
}

.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(32px, 5vw, 48px);
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

.highlight-pink {
  color: #FF1B8D;
  font-weight: 700;
}
```

### Services Grid
```css
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 64px;
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

### Service Card
```css
.service-card {
  position: relative;
  background: #fff;
  border: 4px solid #000;
  border-radius: 8px;
  box-shadow: 8px 8px 0 #000;
  padding: 36px 28px;
  
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  transition: all 0.3s ease;
  overflow: hidden;
}

.service-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 11px 11px 0 #000;
}

/* Subtle gradient overlay on hover */
.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(30, 144, 255, 0.02) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.service-card:hover::before {
  opacity: 1;
}

/* All content above overlay */
.service-card > * {
  position: relative;
  z-index: 1;
}
```

### Card Number (Background)
```css
.card-number {
  position: absolute;
  top: -10px;
  right: 20px;
  
  font-family: 'Space Grotesk', sans-serif;
  font-size: 120px;
  font-weight: 900;
  line-height: 1;
  color: rgba(0, 0, 0, 0.03);
  
  user-select: none;
  pointer-events: none;
  z-index: 0;
}
```

### Card Icon
```css
.card-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid #000;
  box-shadow: 5px 5px 0 #000;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  flex-shrink: 0;
  
  transition: all 0.3s ease;
}

.service-card:hover .card-icon {
  transform: rotate(-10deg) scale(1.05);
  box-shadow: 6px 6px 0 #000;
}

.card-icon svg {
  width: 28px;
  height: 28px;
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

.icon-purple {
  background: #9333EA;
  color: #fff;
}
```

### Card Content
```css
.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  color: #1A1A1A;
  margin: 0;
}

.card-description {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.5;
  color: #404040;
  margin: 0;
}
```

### Benefits List
```css
.benefits-list {
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
  
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.benefits-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: #1A1A1A;
}

.check-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  color: #1E90FF;
}
```

### Bottom CTA Section
```css
.section-cta {
  margin-top: 64px;
  display: flex;
  justify-content: center;
}

.cta-card {
  max-width: 700px;
  width: 100%;
  padding: 40px 48px;
  
  background: linear-gradient(90deg, #1E90FF 0%, #FF1B8D 100%);
  border: 4px solid #000;
  border-radius: 12px;
  box-shadow: 10px 10px 0 #000;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  
  transition: all 0.3s ease;
}

.cta-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 13px 13px 0 #000;
}

.cta-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: #fff;
  margin: 0;
}

.btn-cta-primary {
  padding: 18px 40px;
  
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  
  background: #FFD93D;
  border: 4px solid #000;
  border-radius: 8px;
  box-shadow: 6px 6px 0 #000;
  
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-cta-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #000;
}

.btn-cta-primary:active {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0 #000;
}
```

## Responsive Design

### Tablet (768px - 1024px)
```css
@media (max-width: 1024px) {
  .services-grid {
    gap: 24px;
  }
  
  .service-card {
    padding: 32px 24px;
  }
  
  .card-number {
    font-size: 100px;
  }
}
```

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .work-together-section {
    padding: 60px 20px;
  }
  
  .work-together-header {
    margin-bottom: 48px;
  }
  
  .section-badge {
    font-size: 12px;
    padding: 8px 16px;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .section-subtitle {
    font-size: 16px;
  }
  
  .services-grid {
    gap: 20px;
    margin-bottom: 48px;
  }
  
  .service-card {
    padding: 28px 20px;
    gap: 20px;
  }
  
  .card-number {
    font-size: 80px;
    top: -5px;
    right: 15px;
  }
  
  .card-icon {
    width: 56px;
    height: 56px;
  }
  
  .card-icon svg {
    width: 24px;
    height: 24px;
  }
  
  .card-title {
    font-size: 22px;
  }
  
  .card-description {
    font-size: 16px;
  }
  
  .benefits-list {
    gap: 12px;
  }
  
  .benefits-list li {
    font-size: 14px;
  }
  
  .section-cta {
    margin-top: 48px;
  }
  
  .cta-card {
    padding: 32px 24px;
    gap: 20px;
  }
  
  .cta-text {
    font-size: 20px;
  }
  
  .btn-cta-primary {
    width: 100%;
    padding: 16px 32px;
  }
}
```

## Animazioni

### Entrance animations
```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-card {
  animation: fade-in-up 0.6s ease-out backwards;
}

.service-card:nth-child(1) {
  animation-delay: 0.1s;
}

.service-card:nth-child(2) {
  animation-delay: 0.2s;
}

.service-card:nth-child(3) {
  animation-delay: 0.3s;
}

/* Icon pop animation */
@keyframes icon-pop {
  0% {
    transform: scale(0) rotate(-180deg);
  }
  60% {
    transform: scale(1.15) rotate(15deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.card-icon {
  animation: icon-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

.service-card:nth-child(1) .card-icon {
  animation-delay: 0.3s;
}

.service-card:nth-child(2) .card-icon {
  animation-delay: 0.4s;
}

.service-card:nth-child(3) .card-icon {
  animation-delay: 0.5s;
}

/* CTA card entrance */
.cta-card {
  animation: fade-in-up 0.6s ease-out 0.6s backwards;
}

/* Check icon stagger */
@keyframes check-draw {
  from {
    stroke-dashoffset: 20;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.benefits-list li .check-icon {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  animation: check-draw 0.5s ease-out forwards;
}

.benefits-list li:nth-child(1) .check-icon {
  animation-delay: 0.5s;
}

.benefits-list li:nth-child(2) .check-icon {
  animation-delay: 0.6s;
}

.benefits-list li:nth-child(3) .check-icon {
  animation-delay: 0.7s;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .service-card,
  .card-icon,
  .cta-card,
  .check-icon {
    animation: none;
  }
}
```

## Alternative Icon Options

Se vuoi variare le icone:

```javascript
// Alternative icons per servizi
const serviceIcons = {
  consulting: `
    <svg><!-- Lightbulb icon --></svg>
  `,
  brainstorming: `
    <svg><!-- People/team icon --></svg>
  `,
  mentorship: `
    <svg><!-- Graduation cap icon --></svg>
  `
};
```

## Accessibilità

### Semantic HTML
```html
<section class="work-together-section" aria-labelledby="services-heading">
  <h2 id="services-heading" class="section-title">Come possiamo lavorare insieme</h2>
  
  <article class="service-card" role="article">
    <div class="card-icon" aria-hidden="true">
      <!-- Icon -->
    </div>
    <h3 class="card-title">Consulenze strategiche</h3>
    <!-- Content -->
  </article>
</section>
```

### Focus states
```css
.service-card:focus-within {
  outline: 4px solid #1E90FF;
  outline-offset: 4px;
}

.btn-cta-primary:focus-visible {
  outline: 4px solid #000;
  outline-offset: 4px;
}
```

### ARIA labels
```html
<ul class="benefits-list" aria-label="Service benefits">
  <li>
    <svg class="check-icon" aria-hidden="true">
      <!-- Check icon -->
    </svg>
    <span>Benefit text</span>
  </li>
</ul>
```

## Dynamic Content Loading

```javascript
// Service data structure
const services = [
  {
    id: 1,
    icon: 'lightbulb',
    iconColor: 'blue',
    title: 'Consulenze strategiche',
    description: 'Sblocchiamo il tuo prodotto in 90 minuti',
    benefits: [
      'Analisi del problema reale (non quello che pensi di avere)',
      'Strategia concreta da implementare subito',
      'Roadmap prioritizzata per i prossimi 3 mesi'
    ]
  },
  // ... altri servizi
];

// Render services
function renderServices() {
  const grid = document.querySelector('.services-grid');
  
  services.forEach((service, index) => {
    const card = createServiceCard(service, index + 1);
    grid.appendChild(card);
  });
}
```

## Note Implementazione

1. **Card numbers**: Font-size 120px, opacity 0.03, position absolute top-right
2. **Icon sizes**: 64x64px container, 28x28px SVG interno
3. **Icon colors**:
   - Blue (#1E90FF): Strategic/Consulting
   - Magenta (#FF1B8D): Collaborative/Brainstorming
   - Purple (#9333EA): Educational/Mentorship
4. **Check icons**: Color #1E90FF, 20x20px, flex-start aligned
5. **Number overlay**: Z-index 0, dietro tutto il content
6. **Hover effects**: Card lift (-3px), icon rotate (-10deg)
7. **CTA gradient**: Linear da #1E90FF a #FF1B8D (left to right)
8. **CTA button**: Yellow (#FFD93D) con black border, contrasta perfettamente con gradient
9. **Grid**: 3 colonne su desktop, single column su mobile
10. **Spacing**: Card padding 36px/28px, gap 24px tra elementi

Questa implementazione mantiene la pulizia visiva, la chiarezza dei servizi offerti e l'impatto del CTA finale con gradiente colorato.
