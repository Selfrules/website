# Journey Timeline Section - Specifiche Implementazione

## Overview
La sezione "Il mio percorso" presenta una timeline verticale del percorso professionale con:
- Titolo sezione centrato con badge label sopra
- Timeline verticale con linea centrale e nodi circolari
- Card esperienza alternata sinistra/destra
- Badge colorati per ruolo professionale
- Skills badge inline in stile code
- Elementi decorativi di sfondo (forme geometriche)
- Label finale "12 anni di fallimenti trasformati in esperienza 💪"
- Texture di sfondo con pattern geometrico

## Struttura HTML

```html
<section class="journey-section">
  <!-- Background texture pattern -->
  <div class="journey-bg-pattern"></div>
  
  <!-- Background decorative elements -->
  <div class="journey-decorations">
    <div class="deco-shape shape-note yellow top-right"></div>
  </div>
  
  <!-- Section container -->
  <div class="journey-container">
    <!-- Section header -->
    <div class="journey-header">
      <div class="section-badge">
        <span>IL MIO PERCORSO</span>
      </div>
      <h2 class="section-title">Da zero a Product Manager</h2>
      <p class="section-subtitle">
        La maggior parte dei PM arriva dalla consulenza. Io ho fatto design, sviluppo,
        imprenditoria. <strong>Questo è il mio superpotere.</strong>
      </p>
    </div>
    
    <!-- Timeline wrapper -->
    <div class="timeline-wrapper">
      <!-- Vertical line -->
      <div class="timeline-line"></div>
      
      <!-- Timeline items -->
      <div class="timeline-items">
        
        <!-- Item 1: Selfrules (Left) -->
        <div class="timeline-item item-left">
          <!-- Node circle -->
          <div class="timeline-node">
            <div class="node-icon">😊</div>
          </div>
          
          <!-- Card content -->
          <div class="timeline-card">
            <!-- Card header with period and role badge -->
            <div class="card-header">
              <span class="period-badge">2012-2018</span>
              <span class="role-badge badge-purple">DESIGNER & FOUNDER</span>
            </div>
            
            <!-- Company name -->
            <h3 class="company-name">Selfrules</h3>
            
            <!-- Description -->
            <p class="card-description">
              Ho fondato un'agenzia. Ho fallito. Ho imparato. Ho ricominciato. Ho avuto 
              successo. Ho venduto. In 6 anni ho capito che essere imprenditore significa 
              dire molti più "no" che "sì".
            </p>
            
            <!-- Achievements list -->
            <ul class="achievement-list">
              <li>→ Fondato e venduto un'agenzia di design</li>
              <li>→ Gestito team di 5 designer</li>
              <li>→ Portfolio di 50+ progetti</li>
            </ul>
            
            <!-- Skills -->
            <div class="skills-section">
              <span class="skills-label">SKILLS:</span>
              <div class="skills-tags">
                <span class="skill-tag">UI/UX Design</span>
                <span class="skill-tag">Branding</span>
                <span class="skill-tag">Business Strategy</span>
                <span class="skill-tag">Team Management</span>
                <span class="skill-tag">Adobe Suite</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Item 2: FLOWING (Right) -->
        <div class="timeline-item item-right">
          <!-- Node circle -->
          <div class="timeline-node">
            <div class="node-icon">💻</div>
          </div>
          
          <!-- Card content -->
          <div class="timeline-card">
            <!-- Card header -->
            <div class="card-header">
              <span class="period-badge">2016-2020</span>
              <span class="role-badge badge-yellow">FULL-STACK DEVELOPER</span>
            </div>
            
            <h3 class="company-name">FLOWING</h3>
            
            <p class="card-description">
              Cinque anni a costruire piattaforme web API-first. Ho scritto codice che 
              ancora gira in produzione. Ho capito che la differenza tra un buon prodotto 
              e un grande prodotto sta nei dettagli che nessuno nota... finché non mancano.
            </p>
            
            <ul class="achievement-list">
              <li>→ Sviluppato 10+ piattaforme web enterprise</li>
              <li>→ Architetture scalabili e API-first</li>
              <li>→ Codice ancora in produzione oggi</li>
            </ul>
            
            <div class="skills-section">
              <span class="skills-label">SKILLS:</span>
              <div class="skills-tags">
                <span class="skill-tag">React</span>
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">API Design</span>
                <span class="skill-tag">PostgreSQL</span>
                <span class="skill-tag">Git</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Item 3: ActiveProspect (Left) -->
        <div class="timeline-item item-left">
          <div class="timeline-node">
            <div class="node-icon">📊</div>
          </div>
          
          <div class="timeline-card">
            <div class="card-header">
              <span class="period-badge">2021-2023</span>
              <span class="role-badge badge-blue">PRODUCT OWNER</span>
            </div>
            
            <h3 class="company-name">ActiveProspect</h3>
            
            <p class="card-description">
              Lead generation B2B per Fortune 500. Ho imparato che quando un cliente 
              enterprise dice "urgente", significa "per ieri". Il mio ruolo? Traduttore. 
              Prendevo requisiti complessi e li trasformavo in user story actionable.
            </p>
            
            <ul class="achievement-list">
              <li>→ Gestito prodotti B2B per Fortune 500</li>
              <li>→ Ridotti falsi positivi del 30%</li>
              <li>→ Condotta ricerca con C-level clienti</li>
            </ul>
            
            <div class="skills-section">
              <span class="skills-label">SKILLS:</span>
              <div class="skills-tags">
                <span class="skill-tag">Product Strategy</span>
                <span class="skill-tag">User Research</span>
                <span class="skill-tag">Stakeholder Mgmt</span>
                <span class="skill-tag">Agile/Scrum</span>
                <span class="skill-tag">Jira</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Item 4: QubicaAMF (Right) -->
        <div class="timeline-item item-right">
          <div class="timeline-node">
            <div class="node-icon">🎯</div>
          </div>
          
          <div class="timeline-card card-current">
            <div class="card-header">
              <span class="period-badge">2023-Oggi</span>
              <span class="role-badge badge-blue">PRODUCT MANAGER</span>
            </div>
            
            <h3 class="company-name">QubicaAMF</h3>
            
            <p class="card-description">
              Gestisco integrazioni POS e pagamenti per bowling centers. Ho ridotto i 
              tempi di pagamento del 12% in 6 mesi. Come? Ascoltando i cassieri frustrati 
              alle 22 di sabato sera. Il problema non era la velocità, ma i click necessari.
            </p>
            
            <ul class="achievement-list">
              <li>→ -12% tempi di pagamento in 6 mesi</li>
              <li>→ +9% adoption integrazioni POS</li>
              <li>→ -25% incidenti post-release</li>
            </ul>
            
            <div class="skills-section">
              <span class="skills-label">SKILLS:</span>
              <div class="skills-tags">
                <span class="skill-tag">Product Management</span>
                <span class="skill-tag">Payment Systems</span>
                <span class="skill-tag">OKRs</span>
                <span class="skill-tag">Data Analysis</span>
                <span class="skill-tag">Cross-functional Leadership</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
    <!-- Bottom label -->
    <div class="journey-bottom-label">
      <div class="label-card">
        <span class="label-text">12 anni di fallimenti trasformati in esperienza 💪</span>
      </div>
    </div>
    
  </div>
</section>
```

## Styling CSS/Tailwind

### Section Container
```css
.journey-section {
  position: relative;
  padding: 100px 24px;
  background: #FEFEFE;
  border-bottom: 4px solid #000;
  overflow: hidden;
}

.journey-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}
```

### Background Pattern
```css
.journey-bg-pattern {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.4;
  
  /* Subtle dot pattern */
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  
  pointer-events: none;
}
```

### Decorative Elements
```css
.journey-decorations {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* Post-it note shape in top right */
.deco-shape.shape-note {
  position: absolute;
  top: 10%;
  right: 5%;
  width: 120px;
  height: 120px;
  
  background: #FFD93D;
  border: 3px solid #000;
  border-radius: 4px;
  box-shadow: 6px 6px 0 #000;
  
  /* Slight rotation */
  transform: rotate(8deg);
}

.deco-shape.shape-note::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.1);
}

.deco-shape.shape-note::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 10px;
  right: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.1);
}
```

### Section Header
```css
.journey-header {
  text-align: center;
  margin-bottom: 80px;
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
  
  background: #9333EA;
  border: 3px solid #000;
  border-radius: 6px;
  box-shadow: 4px 4px 0 #000;
}

.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 900;
  line-height: 1.2;
  color: #1A1A1A;
  margin-bottom: 20px;
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  line-height: 1.6;
  color: #404040;
  max-width: 700px;
  margin: 0 auto;
}

.section-subtitle strong {
  font-weight: 700;
  color: #9333EA;
}
```

### Timeline Structure
```css
.timeline-wrapper {
  position: relative;
  margin: 0 auto;
  max-width: 1000px;
}

/* Vertical center line */
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(
    to bottom,
    #9333EA 0%,
    #1E90FF 50%,
    #FFD93D 100%
  );
  transform: translateX(-50%);
  z-index: 0;
}

.timeline-items {
  position: relative;
  z-index: 1;
}
```

### Timeline Item Layout
```css
.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 60px;
}

/* Left-side items */
.timeline-item.item-left {
  grid-template-areas: "card node empty";
}

.timeline-item.item-left .timeline-card {
  grid-area: card;
  text-align: right;
}

.timeline-item.item-left .timeline-node {
  grid-area: node;
}

/* Right-side items */
.timeline-item.item-right {
  grid-template-areas: "empty node card";
}

.timeline-item.item-right .timeline-card {
  grid-area: card;
  text-align: left;
}

.timeline-item.item-right .timeline-node {
  grid-area: node;
}
```

### Timeline Node (Circle)
```css
.timeline-node {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  
  background: #fff;
  border: 4px solid #000;
  box-shadow: 0 0 0 8px #FEFEFE, 6px 6px 0 #000;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  position: relative;
  z-index: 2;
}

.node-icon {
  font-size: 28px;
}
```

### Timeline Card
```css
.timeline-card {
  background: #fff;
  border: 4px solid #000;
  border-radius: 8px;
  box-shadow: 8px 8px 0 #000;
  padding: 28px;
  
  transition: all 0.3s ease;
}

.timeline-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 11px 11px 0 #000;
}

/* Current position highlight */
.timeline-card.card-current {
  background: linear-gradient(135deg, #F0F9FF 0%, #EEF2FF 100%);
  border-color: #1E90FF;
  box-shadow: 8px 8px 0 #1E90FF;
}

.timeline-card.card-current:hover {
  box-shadow: 11px 11px 0 #1E90FF;
}
```

### Card Header
```css
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.period-badge {
  display: inline-block;
  padding: 6px 12px;
  
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  font-weight: 400;
  color: #1A1A1A;
  
  background: #fff;
  border: 2px solid #000;
  border-radius: 4px;
}

.role-badge {
  padding: 6px 14px;
  
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
  
  border: 2px solid #000;
  border-radius: 4px;
}

.role-badge.badge-purple {
  background: #9333EA;
}

.role-badge.badge-yellow {
  background: #FFD93D;
  color: #000;
}

.role-badge.badge-blue {
  background: #1E90FF;
}
```

### Card Content
```css
.company-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 16px;
}

.card-description {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #404040;
  margin-bottom: 20px;
}

.achievement-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.achievement-list li {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.8;
  color: #1A1A1A;
  padding: 4px 0;
}

.achievement-list li::before {
  content: '→';
  margin-right: 8px;
  color: #1E90FF;
  font-weight: 700;
}
```

### Skills Section
```css
.skills-section {
  border-top: 2px solid #E8E8E8;
  padding-top: 20px;
}

.skills-label {
  display: block;
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  color: #6B7280;
  margin-bottom: 12px;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  display: inline-block;
  padding: 6px 12px;
  
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  font-weight: 400;
  color: #1A1A1A;
  
  background: #F5F5F5;
  border: 2px solid #E8E8E8;
  border-radius: 4px;
  
  transition: all 0.2s ease;
}

.skill-tag:hover {
  border-color: #000;
  background: #fff;
}
```

### Bottom Label
```css
.journey-bottom-label {
  margin-top: 80px;
  text-align: center;
}

.label-card {
  display: inline-block;
  padding: 16px 32px;
  
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  
  background: linear-gradient(90deg, #1E90FF 0%, #9333EA 100%);
  border: 4px solid #000;
  border-radius: 8px;
  box-shadow: 8px 8px 0 #000;
  
  transition: all 0.3s ease;
}

.label-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0 #000;
}

.label-text {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

## Responsive Layout

### Tablet (< 1024px)
```css
@media (max-width: 1024px) {
  .timeline-item {
    gap: 30px;
  }
  
  .timeline-card {
    padding: 24px;
  }
  
  .company-name {
    font-size: 24px;
  }
  
  /* Hide decorative note on tablet */
  .deco-shape.shape-note {
    display: none;
  }
}
```

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .journey-section {
    padding: 60px 20px;
  }
  
  .journey-header {
    margin-bottom: 60px;
  }
  
  .section-badge {
    font-size: 12px;
    padding: 8px 16px;
  }
  
  /* Single column layout */
  .timeline-item {
    grid-template-columns: auto 1fr;
    grid-template-areas: "node card";
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .timeline-item.item-left,
  .timeline-item.item-right {
    grid-template-areas: "node card";
  }
  
  .timeline-card {
    text-align: left !important;
  }
  
  /* Move timeline line to left */
  .timeline-line {
    left: 32px;
  }
  
  .timeline-node {
    width: 56px;
    height: 56px;
    box-shadow: 0 0 0 6px #FEFEFE, 4px 4px 0 #000;
  }
  
  .node-icon {
    font-size: 24px;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .company-name {
    font-size: 22px;
  }
  
  .card-description {
    font-size: 15px;
  }
  
  .skills-tags {
    justify-content: flex-start;
  }
  
  .journey-bottom-label {
    margin-top: 60px;
  }
  
  .label-card {
    padding: 14px 24px;
    font-size: 16px;
  }
}
```

## Animazioni

### Scroll-triggered animations
```css
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Apply animations when element enters viewport */
.timeline-item.item-left .timeline-card {
  animation: slide-in-left 0.6s ease-out;
}

.timeline-item.item-right .timeline-card {
  animation: slide-in-right 0.6s ease-out;
}

.timeline-node {
  animation: fade-in 0.6s ease-out;
}

/* Stagger animations */
.timeline-item:nth-child(1) .timeline-card { animation-delay: 0.1s; }
.timeline-item:nth-child(2) .timeline-card { animation-delay: 0.2s; }
.timeline-item:nth-child(3) .timeline-card { animation-delay: 0.3s; }
.timeline-item:nth-child(4) .timeline-card { animation-delay: 0.4s; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .timeline-item .timeline-card,
  .timeline-node {
    animation: none;
  }
}
```

## JavaScript per Intersection Observer (Optional)

```javascript
// Animate timeline items on scroll
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
  observer.observe(item);
});
```

## Note Implementazione

1. **Allineamento perfetto**: La linea verticale deve essere esattamente centrata tra le card
2. **Node circle**: Il nodo deve "staccare" dalla linea con un'ombra bianca intorno (`box-shadow: 0 0 0 8px #FEFEFE`)
3. **Color coding**:
   - Purple (#9333EA): Designer/Founder
   - Yellow (#FFD93D): Developer
   - Blue (#1E90FF): Product Owner/Manager
4. **Skills tags**: Usano Space Mono per dare aspetto "code-like"
5. **Current position**: Card attuale ha sfumatura background blu chiaro e bordo blu
6. **Bottom label**: Gradiente da blu a viola con emoji 💪
7. **Responsive**: Su mobile, timeline diventa singola colonna con linea a sinistra

Questa implementazione mantiene tutti gli elementi visivi del Figma: timeline verticale colorata, card alternate, badge ruolo, skills tags, label finale e decorazioni.
