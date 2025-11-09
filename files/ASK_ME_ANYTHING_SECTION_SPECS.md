# Ask Me Anything Section - Specifiche Implementazione

## Overview
La sezione "Hai domande? Chiedi pure" offre due modalità di contatto:
- Titolo sezione centrato con badge label "ASK ME ANYTHING"
- Sottotitolo con highlight giallo "Rispondo a tutte entro 48 ore"
- Due card affiancate: Chatbot AI e Form anonimo
- Card chatbot con bordo blu e icon chat
- Card form con bordo magenta e icon email
- Entrambe con CTA button distintivo
- Background dark per contrasto
- Design simmetrico e bilanciato

## Struttura HTML

```html
<section class="ask-section">
  <!-- Section container -->
  <div class="ask-container">
    
    <!-- Section header -->
    <div class="ask-header">
      <div class="section-badge">
        <span class="badge-icon">✨</span>
        <span>ASK ME ANYTHING</span>
      </div>
      <h2 class="section-title">Hai domande? Chiedi pure</h2>
      <p class="section-subtitle">
        Puoi chattare con il mio gemello digitale AI o lasciare una domanda 
        anonima. <span class="highlight-yellow">Rispondo a tutte entro 48 ore.</span>
      </p>
    </div>
    
    <!-- Options grid -->
    <div class="ask-options-grid">
      
      <!-- Option 1: AI Chatbot -->
      <article class="ask-option-card card-blue">
        <!-- Icon -->
        <div class="option-icon icon-blue">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <!-- Content -->
        <div class="option-content">
          <h3 class="option-title">Chatta con il mio gemello digitale</h3>
          <p class="option-description">
            Alimentato da Claude AI, conosce tutto il mio background e può 
            rispondere alle tue domande su design, sviluppo, product management, 
            o qualsiasi altra cosa.
          </p>
          
          <!-- CTA Button -->
          <button class="btn-option btn-blue">
            Inizia chat
          </button>
        </div>
      </article>
      
      <!-- Option 2: Anonymous Form -->
      <article class="ask-option-card card-magenta">
        <!-- Icon -->
        <div class="option-icon icon-magenta">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <!-- Content -->
        <div class="option-content">
          <h3 class="option-title">Chiedi in anonimo</h3>
          <p class="option-description">
            Preferisci scrivere? Lascia la tua domanda qui. Rispondo 
            pubblicamente sul blog o privatamente via email se la fornisci.
          </p>
          
          <!-- Form -->
          <form class="anonymous-form">
            <!-- Name input (optional) -->
            <div class="form-group">
              <input 
                type="text" 
                class="form-input" 
                placeholder="Nome (opzionale)"
                id="name-input"
              />
            </div>
            
            <!-- Email input (optional) -->
            <div class="form-group">
              <input 
                type="email" 
                class="form-input" 
                placeholder="Email (opzionale)"
                id="email-input"
              />
            </div>
            
            <!-- Question textarea (required) -->
            <div class="form-group">
              <textarea 
                class="form-textarea" 
                placeholder="La tua domanda *"
                rows="4"
                id="question-input"
                required
              ></textarea>
            </div>
            
            <!-- Submit button -->
            <button type="submit" class="btn-option btn-magenta">
              Invia domanda
              <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </article>
      
    </div>
    
  </div>
</section>
```

## Styling CSS/Tailwind

### Section Container
```css
.ask-section {
  padding: 100px 24px;
  background: #1A1A1A;
  border-bottom: 4px solid #000;
  position: relative;
  overflow: hidden;
}

/* Subtle gradient overlay */
.ask-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%);
  pointer-events: none;
}

.ask-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
```

### Section Header
```css
.ask-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  margin-bottom: 24px;
  
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #000;
  
  background: #FFD93D;
  border: 3px solid #000;
  border-radius: 6px;
  box-shadow: 4px 4px 0 #000;
}

.badge-icon {
  font-size: 16px;
}

.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 900;
  line-height: 1.2;
  color: #fff;
  margin-bottom: 16px;
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  max-width: 800px;
  margin: 0 auto;
}

.highlight-yellow {
  color: #FFD93D;
  font-weight: 700;
}
```

### Options Grid
```css
.ask-options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

@media (max-width: 968px) {
  .ask-options-grid {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
  }
}
```

### Option Card Base
```css
.ask-option-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 4px solid;
  border-radius: 12px;
  box-shadow: 8px 8px 0;
  padding: 36px;
  
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.ask-option-card:hover {
  transform: translate(-3px, -3px);
}

/* Blue variant (Chatbot) */
.card-blue {
  border-color: #1E90FF;
  box-shadow: 8px 8px 0 #1E90FF;
}

.card-blue:hover {
  box-shadow: 11px 11px 0 #1E90FF;
  background: rgba(30, 144, 255, 0.05);
}

/* Magenta variant (Form) */
.card-magenta {
  border-color: #FF1B8D;
  box-shadow: 8px 8px 0 #FF1B8D;
}

.card-magenta:hover {
  box-shadow: 11px 11px 0 #FF1B8D;
  background: rgba(255, 27, 141, 0.05);
}
```

### Option Icon
```css
.option-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 3px solid #000;
  box-shadow: 5px 5px 0 #000;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  flex-shrink: 0;
  
  transition: all 0.3s ease;
}

.ask-option-card:hover .option-icon {
  transform: rotate(10deg) scale(1.05);
  box-shadow: 6px 6px 0 #000;
}

.option-icon svg {
  width: 32px;
  height: 32px;
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
```

### Option Content
```css
.option-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.option-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  margin: 0;
}

.option-description {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}
```

### CTA Buttons
```css
.btn-option {
  padding: 16px 32px;
  
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 700;
  text-transform: none;
  color: #fff;
  
  border: 3px solid #000;
  border-radius: 6px;
  box-shadow: 5px 5px 0 #000;
  
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
}

.btn-option:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 #000;
}

.btn-option:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #000;
}

/* Blue variant */
.btn-blue {
  background: #1E90FF;
}

.btn-blue:hover {
  background: #1873CC;
}

/* Magenta variant */
.btn-magenta {
  background: #FF1B8D;
}

.btn-magenta:hover {
  background: #E0177A;
}

.btn-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.btn-option:hover .btn-icon {
  transform: translateX(4px);
}
```

### Anonymous Form
```css
.anonymous-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.form-group {
  width: 100%;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 14px 16px;
  
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #fff;
  
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  
  transition: all 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #FF1B8D;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 27, 141, 0.2);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
  font-family: 'Inter', sans-serif;
}

/* Submit button extends full width on form */
.anonymous-form .btn-option {
  width: 100%;
  margin-top: 8px;
}
```

## Responsive Design

### Tablet (768px - 968px)
```css
@media (max-width: 968px) {
  .ask-options-grid {
    gap: 24px;
  }
  
  .ask-option-card {
    padding: 32px;
  }
}
```

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .ask-section {
    padding: 60px 20px;
  }
  
  .ask-header {
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
  
  .ask-options-grid {
    gap: 20px;
  }
  
  .ask-option-card {
    padding: 28px 24px;
    gap: 20px;
  }
  
  .option-icon {
    width: 64px;
    height: 64px;
  }
  
  .option-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .option-title {
    font-size: 24px;
  }
  
  .option-description {
    font-size: 15px;
  }
  
  .btn-option {
    width: 100%;
    padding: 14px 28px;
  }
  
  .form-input,
  .form-textarea {
    font-size: 15px;
    padding: 12px 14px;
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

.ask-option-card {
  animation: fade-in-up 0.6s ease-out backwards;
}

.card-blue {
  animation-delay: 0.1s;
}

.card-magenta {
  animation-delay: 0.2s;
}

/* Icon animation */
@keyframes icon-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(5deg);
  }
}

.option-icon {
  animation: icon-float 3s ease-in-out infinite;
}

.card-blue .option-icon {
  animation-delay: 0.5s;
}

.card-magenta .option-icon {
  animation-delay: 1s;
}

/* Glow effect on hover */
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 8px 8px 0 #1E90FF;
  }
  50% {
    box-shadow: 8px 8px 20px rgba(30, 144, 255, 0.4), 8px 8px 0 #1E90FF;
  }
}

.card-blue:hover {
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse-magenta {
  0%, 100% {
    box-shadow: 8px 8px 0 #FF1B8D;
  }
  50% {
    box-shadow: 8px 8px 20px rgba(255, 27, 141, 0.4), 8px 8px 0 #FF1B8D;
  }
}

.card-magenta:hover {
  animation: glow-pulse-magenta 2s ease-in-out infinite;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ask-option-card,
  .option-icon,
  .card-blue:hover,
  .card-magenta:hover {
    animation: none;
  }
}
```

### Form submission animation
```css
@keyframes submit-success {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.anonymous-form.submitting .btn-option {
  animation: submit-success 0.6s ease;
}

/* Loading state */
.btn-option.loading {
  pointer-events: none;
  opacity: 0.7;
}

.btn-option.loading::after {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-left: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

## JavaScript Functionality

### Chat modal trigger
```javascript
// Open chat modal
document.querySelector('.btn-blue').addEventListener('click', function() {
  // Open chat interface/modal
  openChatModal();
});

function openChatModal() {
  // Implementation for AI chat interface
  console.log('Opening AI chat...');
}
```

### Form submission
```javascript
// Handle form submission
document.querySelector('.anonymous-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const btn = this.querySelector('.btn-magenta');
  const formData = {
    name: document.getElementById('name-input').value,
    email: document.getElementById('email-input').value,
    question: document.getElementById('question-input').value
  };
  
  // Add loading state
  btn.classList.add('loading');
  btn.textContent = 'Invio in corso...';
  
  try {
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Success feedback
      btn.classList.remove('loading');
      btn.classList.add('success');
      btn.innerHTML = `
        Inviato! ✓
      `;
      
      // Reset form
      setTimeout(() => {
        this.reset();
        btn.classList.remove('success');
        btn.innerHTML = `
          Invia domanda
          <svg class="btn-icon"><!-- Send icon --></svg>
        `;
      }, 3000);
    }
  } catch (error) {
    console.error('Error submitting question:', error);
    btn.classList.remove('loading');
    btn.textContent = 'Errore. Riprova';
    
    setTimeout(() => {
      btn.innerHTML = `
        Invia domanda
        <svg class="btn-icon"><!-- Send icon --></svg>
      `;
    }, 3000);
  }
});
```

## Accessibilità

### Semantic HTML
```html
<section class="ask-section" aria-labelledby="ask-heading">
  <h2 id="ask-heading" class="section-title">Hai domande? Chiedi pure</h2>
  
  <article class="ask-option-card" role="article">
    <div class="option-icon" aria-hidden="true">
      <!-- Icon -->
    </div>
    <!-- Content -->
  </article>
</section>
```

### Form accessibility
```html
<form class="anonymous-form" aria-label="Anonymous question form">
  <div class="form-group">
    <label for="name-input" class="sr-only">Nome (opzionale)</label>
    <input 
      type="text" 
      id="name-input"
      aria-label="Il tuo nome (opzionale)"
      placeholder="Nome (opzionale)"
    />
  </div>
  
  <div class="form-group">
    <label for="question-input" class="sr-only">La tua domanda</label>
    <textarea 
      id="question-input"
      aria-label="La tua domanda (richiesto)"
      placeholder="La tua domanda *"
      required
      aria-required="true"
    ></textarea>
  </div>
</form>

/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Focus states
```css
.ask-option-card:focus-within {
  outline: 4px solid #FFD93D;
  outline-offset: 4px;
}

.btn-option:focus-visible {
  outline: 4px solid #FFD93D;
  outline-offset: 4px;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #FF1B8D;
  box-shadow: 0 0 0 3px rgba(255, 27, 141, 0.2);
}
```

## Note Implementazione

1. **Background**: Dark (#1A1A1A) con subtle gradient overlay
2. **Card borders**: 4px solid color-coded (blue/magenta)
3. **Card shadows**: 8px offset stesso colore del border
4. **Backdrop blur**: 10px per glassmorphism effect
5. **Icon sizes**: 72x72px container, 32x32px SVG
6. **Icon colors**: Blue (#1E90FF) chatbot, Magenta (#FF1B8D) form
7. **Button full-width**: Form button estende 100% width
8. **Form inputs**: Dark background con border trasparente
9. **Focus glow**: Pink glow su form focus
10. **Hover animations**: Card lift + glow pulse effect
11. **Grid layout**: 2 colonne desktop, single column mobile
12. **Text contrast**: White/white-80% su dark background
13. **Badge yellow**: High contrast su dark bg

Questa implementazione crea un forte contrasto visivo con il background dark, highlight colorati che guidano l'attenzione, e una chiara differenziazione tra le due opzioni di contatto.
