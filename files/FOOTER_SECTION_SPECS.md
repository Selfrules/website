# Footer Section - Specifiche Implementazione

## Overview
Il footer presenta informazioni di contatto e navigazione con:
- Background dark neobrutalist
- Nome e bio breve a sinistra
- Social icons colorati con border e shadow
- Due colonne di link (Link veloci e Risorse)
- Copyright e credits in basso
- Border top colorato con gradiente
- Design pulito e organizzato

## Struttura HTML

```html
<footer class="main-footer">
  <!-- Colored top border -->
  <div class="footer-border"></div>
  
  <!-- Footer container -->
  <div class="footer-container">
    
    <!-- Footer content grid -->
    <div class="footer-content">
      
      <!-- Column 1: Brand & Social -->
      <div class="footer-brand">
        <!-- Name/Logo -->
        <div class="footer-logo">
          <span class="logo-text">
            Mattia <span class="logo-accent">Cintura</span>
          </span>
        </div>
        
        <!-- Bio -->
        <p class="footer-bio">
          Product Manager con un passato da designer e developer. 
          Trasformo fallimenti in feature e idee in prodotti che le 
          persone amano usare.
        </p>
        
        <!-- Social links -->
        <div class="social-links">
          <!-- LinkedIn -->
          <a href="#" class="social-link social-blue" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          
          <!-- Twitter -->
          <a href="#" class="social-link social-magenta" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          
          <!-- GitHub -->
          <a href="#" class="social-link social-purple" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          
          <!-- Email -->
          <a href="mailto:" class="social-link social-yellow" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- Column 2: Quick Links -->
      <div class="footer-nav">
        <h3 class="footer-nav-title">Link veloci</h3>
        <ul class="footer-nav-list">
          <li><a href="#" class="footer-link">Home</a></li>
          <li><a href="#" class="footer-link">Il mio percorso</a></li>
          <li><a href="#" class="footer-link">Blog</a></li>
          <li><a href="#" class="footer-link">Contatti</a></li>
        </ul>
      </div>
      
      <!-- Column 3: Resources -->
      <div class="footer-nav">
        <h3 class="footer-nav-title">Risorse</h3>
        <ul class="footer-nav-list">
          <li><a href="#" class="footer-link">Product Tools</a></li>
          <li><a href="#" class="footer-link">Design Resources</a></li>
          <li><a href="#" class="footer-link">Dev Stack</a></li>
          <li><a href="#" class="footer-link">Newsletter</a></li>
        </ul>
      </div>
      
    </div>
    
    <!-- Footer bottom -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <!-- Copyright -->
        <p class="footer-copyright">
          © 2025 Mattia Cintura. Fatto con 
          <span class="heart">❤️</span> e troppi caffè
        </p>
        
        <!-- Meta links -->
        <div class="footer-meta">
          <a href="#" class="footer-meta-link">Privacy Policy</a>
          <span class="separator">•</span>
          <a href="#" class="footer-meta-link">Terms</a>
          <span class="separator">•</span>
          <a href="#" class="footer-meta-link">Cookie</a>
        </div>
      </div>
      
      <!-- Credits -->
      <p class="footer-credits">
        Design neobrutalist • Built with React & Tailwind • Deployed con amore
      </p>
    </div>
    
  </div>
</footer>
```

## Styling CSS/Tailwind

### Footer Container
```css
.main-footer {
  position: relative;
  background: #1A1A1A;
  color: #fff;
}

/* Colored gradient border on top */
.footer-border {
  width: 100%;
  height: 4px;
  background: linear-gradient(
    90deg,
    #1E90FF 0%,
    #FF1B8D 33%,
    #9333EA 66%,
    #FFD93D 100%
  );
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px 32px;
}
```

### Footer Content Grid
```css
.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 60px;
  padding-bottom: 48px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

### Brand Section
```css
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-logo {
  margin-bottom: 8px;
}

.logo-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
}

.logo-accent {
  color: #1E90FF;
}

.footer-bio {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  max-width: 400px;
}
```

### Social Links
```css
.social-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.social-link {
  width: 48px;
  height: 48px;
  border: 3px solid #000;
  border-radius: 8px;
  box-shadow: 4px 4px 0 #000;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  transition: all 0.2s ease;
  text-decoration: none;
}

.social-link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000;
}

.social-link:active {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 #000;
}

/* Color variants */
.social-blue {
  background: #1E90FF;
  color: #fff;
}

.social-magenta {
  background: #FF1B8D;
  color: #fff;
}

.social-purple {
  background: #9333EA;
  color: #fff;
}

.social-yellow {
  background: #FFD93D;
  color: #000;
}

.social-link svg {
  width: 20px;
  height: 20px;
}
```

### Navigation Sections
```css
.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-nav-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.footer-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  
  display: inline-block;
  position: relative;
  transition: color 0.2s ease;
}

.footer-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background: #1E90FF;
  transition: width 0.3s ease;
}

.footer-link:hover {
  color: #fff;
}

.footer-link:hover::after {
  width: 100%;
}
```

### Footer Bottom
```css
.footer-bottom {
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-copyright {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.heart {
  color: #FF1B8D;
  display: inline-block;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  10%, 30% {
    transform: scale(1.1);
  }
  20%, 40% {
    transform: scale(1);
  }
}

/* Meta links */
.footer-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-meta-link {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-meta-link:hover {
  color: #1E90FF;
}

.separator {
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
}

/* Credits */
.footer-credits {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  margin: 16px 0 0;
}
```

## Responsive Design

### Tablet (640px - 968px)
```css
@media (max-width: 968px) {
  .footer-container {
    padding: 60px 24px 32px;
  }
  
  .footer-content {
    padding-bottom: 40px;
  }
}
```

### Mobile (< 640px)
```css
@media (max-width: 640px) {
  .footer-container {
    padding: 48px 20px 24px;
  }
  
  .footer-content {
    padding-bottom: 32px;
    gap: 32px;
  }
  
  .footer-brand {
    gap: 20px;
  }
  
  .logo-text {
    font-size: 24px;
  }
  
  .footer-bio {
    font-size: 15px;
  }
  
  .social-links {
    gap: 10px;
  }
  
  .social-link {
    width: 44px;
    height: 44px;
  }
  
  .footer-nav-title {
    font-size: 16px;
  }
  
  .footer-nav-list {
    gap: 10px;
  }
  
  .footer-link {
    font-size: 14px;
  }
  
  .footer-bottom {
    padding-top: 24px;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .footer-copyright {
    font-size: 13px;
  }
  
  .footer-meta {
    flex-wrap: wrap;
  }
  
  .footer-credits {
    font-size: 11px;
    margin-top: 12px;
  }
}
```

## Animazioni

### Social links hover
```css
@keyframes icon-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.social-link:hover {
  animation: icon-bounce 0.4s ease;
}
```

### Entrance animation
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer-brand {
  animation: fade-in 0.6s ease-out 0.1s backwards;
}

.footer-nav:nth-of-type(1) {
  animation: fade-in 0.6s ease-out 0.2s backwards;
}

.footer-nav:nth-of-type(2) {
  animation: fade-in 0.6s ease-out 0.3s backwards;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .footer-brand,
  .footer-nav,
  .social-link,
  .heart {
    animation: none;
  }
}
```

## Alternative Layout Variations

### Centered footer variant
```css
.footer-content.centered {
  grid-template-columns: 1fr;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.footer-content.centered .social-links {
  justify-content: center;
}

.footer-content.centered .footer-nav-list {
  align-items: center;
}
```

### Compact footer variant
```css
.footer-container.compact {
  padding: 48px 24px 24px;
}

.footer-content.compact {
  gap: 32px;
  padding-bottom: 32px;
}
```

## Accessibilità

### Semantic HTML
```html
<footer class="main-footer" role="contentinfo">
  <nav aria-label="Footer navigation">
    <div class="footer-nav">
      <h3 class="footer-nav-title">Link veloci</h3>
      <ul class="footer-nav-list">
        <li><a href="#home" class="footer-link">Home</a></li>
        <!-- Altri link -->
      </ul>
    </div>
  </nav>
</footer>
```

### Focus states
```css
.footer-link:focus-visible,
.footer-meta-link:focus-visible {
  outline: 3px solid #1E90FF;
  outline-offset: 4px;
  border-radius: 2px;
}

.social-link:focus-visible {
  outline: 3px solid #FFD93D;
  outline-offset: 4px;
}
```

### ARIA labels
```html
<div class="social-links" role="list" aria-label="Social media links">
  <a href="#" class="social-link" role="listitem" aria-label="LinkedIn profile">
    <svg><!-- Icon --></svg>
  </a>
  <!-- Altri social -->
</div>
```

## Dark Mode Considerations

Se implementi dark mode, il footer rimane dark ma con contrasti regolati:

```css
@media (prefers-color-scheme: light) {
  /* Footer mantiene dark theme per design consistency */
  .main-footer {
    background: #1A1A1A;
    color: #fff;
  }
}
```

## Note Implementazione

1. **Top border gradient**: 4px height, linear da blue a yellow
2. **Grid layout**: 2fr 1fr 1fr (brand più largo delle nav columns)
3. **Social icons**: 48x48px, 3px border, 4px shadow offset
4. **Social colors**:
   - LinkedIn: Blue (#1E90FF)
   - Twitter: Magenta (#FF1B8D)
   - GitHub: Purple (#9333EA)
   - Email: Yellow (#FFD93D)
5. **Link underline animation**: Da 0 a 100% width al hover
6. **Heart animation**: Heartbeat infinite loop
7. **Text colors**: 
   - Titoli: White (#fff)
   - Bio/body: White 75% opacity
   - Copyright: White 60% opacity
   - Credits: White 40% opacity
8. **Border bottom**: 2px solid white 10% opacity
9. **Spacing**: 80px top padding, 32px bottom padding
10. **Mobile**: Single column layout, stack tutto verticalmente

Questo footer completa il sito con un design coerente neobrutalist, mantenendo la personalità colorata e l'accessibilità, mentre fornisce tutte le informazioni essenziali e i link di navigazione.
