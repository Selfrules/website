# Blog Section - Specifiche Implementazione

## Overview
La sezione blog "Dal blog" presenta gli articoli più recenti con:
- Titolo sezione centrato con badge label "LATEST THINKING"
- Sottotitolo con highlight rosa
- Featured article principale con gradiente colorato
- Grid di articoli secondari con card bianche
- Category badge per ogni articolo
- Reading time e data pubblicazione
- Link "Leggi articolo" con freccia
- Design che bilancia impatto visivo e leggibilità

## Struttura HTML

```html
<section class="blog-section">
  <!-- Section container -->
  <div class="blog-container">
    
    <!-- Section header -->
    <div class="blog-header">
      <div class="section-badge">
        <span>LATEST THINKING</span>
      </div>
      <h2 class="section-title">Dal blog</h2>
      <p class="section-subtitle">
        Pensieri su design, sviluppo, product management e 
        <span class="highlight-pink">tutto quello che ho imparato fallendo.</span>
      </p>
    </div>
    
    <!-- Blog grid -->
    <div class="blog-grid">
      
      <!-- Featured article (large, colored gradient) -->
      <article class="blog-article featured-article">
        <div class="article-inner">
          <!-- Category badge -->
          <span class="category-badge badge-yellow">PRODUCT</span>
          
          <!-- Title -->
          <h3 class="article-title">
            Il fallimento come feature, non come bug
          </h3>
          
          <!-- Excerpt -->
          <p class="article-excerpt">
            Ho sprecato 3 mesi su un contratto di 50 pagine che nessuno ha mai letto. 
            Oggi uso un accordo di 2 pagine e funziona meglio. Ecco perché il fallimento 
            è la migliore forma di apprendimento.
          </p>
          
          <!-- Meta info -->
          <div class="article-meta">
            <div class="meta-left">
              <span class="meta-item">
                <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/>
                </svg>
                8 min
              </span>
              <span class="meta-item">
                <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2"/>
                </svg>
                5 Nov 2025
              </span>
            </div>
            
            <!-- CTA Button -->
            <button class="btn-read-more">
              Leggi ora
            </button>
          </div>
        </div>
      </article>
      
      <!-- Secondary articles -->
      <article class="blog-article secondary-article">
        <div class="article-inner">
          <span class="category-badge badge-outline">STRATEGY</span>
          
          <h3 class="article-title">
            Product-Market Fit: Il mito da sfatare
          </h3>
          
          <p class="article-excerpt">
            Non esiste un momento magico dove "trovi" il PMF. È un processo 
            continuo di aggiustamenti.
          </p>
          
          <div class="article-meta">
            <div class="meta-left">
              <span class="meta-item">
                <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/>
                </svg>
                6 min
              </span>
              <span class="meta-item">
                <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2"/>
                </svg>
                28 Ott 2025
              </span>
            </div>
            
            <a href="#" class="link-read-more">
              Leggi articolo →
            </a>
          </div>
        </div>
      </article>
      
      <article class="blog-article secondary-article">
        <div class="article-inner">
          <span class="category-badge badge-outline">OKRS</span>
          
          <h3 class="article-title">
            OKR che funzionano vs OKR che sembrano fighi
          </h3>
          
          <p class="article-excerpt">
            La differenza tra OKR che portano risultati e quelli che finiscono 
            in un Google Doc dimenticato.
          </p>
          
          <div class="article-meta">
            <div class="meta-left">
              <span class="meta-item">
                <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/>
                </svg>
                7 min
              </span>
              <span class="meta-item">
                <svg class="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2"/>
                </svg>
                15 Ott 2025
              </span>
            </div>
            
            <a href="#" class="link-read-more">
              Leggi articolo →
            </a>
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
.blog-section {
  padding: 100px 24px;
  background: linear-gradient(180deg, #F8F8F8 0%, #FEFEFE 100%);
  border-bottom: 4px solid #000;
}

.blog-container {
  max-width: 1200px;
  margin: 0 auto;
}
```

### Section Header
```css
.blog-header {
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
  
  background: #FF1B8D;
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
  max-width: 700px;
  margin: 0 auto;
}

.highlight-pink {
  color: #FF1B8D;
  font-weight: 600;
  position: relative;
  display: inline;
}

.highlight-pink::after {
  content: '';
  position: absolute;
  left: -2px;
  right: -2px;
  bottom: 2px;
  height: 8px;
  background: rgba(255, 27, 141, 0.15);
  z-index: -1;
}
```

### Blog Grid Layout
```css
.blog-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

/* Featured article spans full width */
.featured-article {
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

### Base Article Card
```css
.blog-article {
  background: #fff;
  border: 4px solid #000;
  border-radius: 8px;
  box-shadow: 8px 8px 0 #000;
  
  transition: all 0.3s ease;
  overflow: hidden;
}

.blog-article:hover {
  transform: translate(-3px, -3px);
  box-shadow: 11px 11px 0 #000;
}

.article-inner {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}
```

### Featured Article (Gradient)
```css
.featured-article {
  background: linear-gradient(
    135deg,
    #1E90FF 0%,
    #9333EA 100%
  );
  border-color: #000;
}

.featured-article:hover {
  box-shadow: 11px 11px 0 #000;
}

.featured-article .article-title,
.featured-article .article-excerpt,
.featured-article .meta-item {
  color: #fff;
}

.featured-article .category-badge {
  background: #FFD93D;
  color: #000;
  border-color: #000;
}
```

### Category Badge
```css
.category-badge {
  display: inline-flex;
  padding: 6px 14px;
  
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  border: 2px solid #000;
  border-radius: 4px;
  
  align-self: flex-start;
}

.badge-yellow {
  background: #FFD93D;
  color: #000;
}

.badge-outline {
  background: transparent;
  color: #1A1A1A;
  border-width: 2px;
}

.secondary-article .badge-outline {
  background: #F5F5F5;
}
```

### Article Content
```css
.article-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  color: #1A1A1A;
  margin: 0;
}

.featured-article .article-title {
  font-size: 36px;
  color: #fff;
}

.article-excerpt {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: #404040;
  margin: 0;
  flex: 1;
}

.featured-article .article-excerpt {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.95);
}
```

### Article Meta
```css
.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  margin-top: auto;
}

.featured-article .article-meta {
  border-top-color: rgba(255, 255, 255, 0.2);
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #6B7280;
}

.featured-article .meta-item {
  color: rgba(255, 255, 255, 0.9);
}

.meta-icon {
  opacity: 0.7;
}
```

### CTA Links and Buttons
```css
/* Featured article button */
.btn-read-more {
  padding: 12px 24px;
  
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #000;
  
  background: #FFD93D;
  border: 3px solid #000;
  border-radius: 6px;
  box-shadow: 4px 4px 0 #000;
  
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-read-more:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000;
}

.btn-read-more:active {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 #000;
}

/* Secondary article link */
.link-read-more {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #1E90FF;
  text-decoration: none;
  
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.link-read-more:hover {
  border-bottom-color: #1E90FF;
  gap: 8px;
}

.link-read-more:focus-visible {
  outline: 3px solid #1E90FF;
  outline-offset: 4px;
  border-radius: 2px;
}
```

## Responsive Design

### Tablet (768px - 1024px)
```css
@media (max-width: 1024px) {
  .blog-grid {
    gap: 24px;
  }
  
  .article-inner {
    padding: 28px;
  }
  
  .featured-article .article-title {
    font-size: 32px;
  }
  
  .article-title {
    font-size: 24px;
  }
}
```

### Mobile (< 768px)
```css
@media (max-width: 768px) {
  .blog-section {
    padding: 60px 20px;
  }
  
  .blog-header {
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
  
  .blog-grid {
    gap: 20px;
  }
  
  .article-inner {
    padding: 24px;
    gap: 14px;
  }
  
  .featured-article .article-title {
    font-size: 26px;
  }
  
  .article-title {
    font-size: 20px;
  }
  
  .article-excerpt {
    font-size: 15px;
  }
  
  .featured-article .article-excerpt {
    font-size: 16px;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .btn-read-more,
  .link-read-more {
    width: 100%;
    text-align: center;
    justify-content: center;
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

.blog-article {
  animation: fade-in-up 0.6s ease-out backwards;
}

.featured-article {
  animation-delay: 0.1s;
}

.secondary-article:nth-of-type(2) {
  animation-delay: 0.2s;
}

.secondary-article:nth-of-type(3) {
  animation-delay: 0.3s;
}

/* Badge animation */
@keyframes badge-pop {
  0% {
    transform: scale(0) rotate(-10deg);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.category-badge {
  animation: badge-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

.featured-article .category-badge {
  animation-delay: 0.3s;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .blog-article,
  .category-badge {
    animation: none;
  }
}
```

### Hover animation on arrow
```css
.link-read-more::after {
  content: '→';
  transition: transform 0.2s ease;
  display: inline-block;
}

.link-read-more:hover::after {
  transform: translateX(4px);
}
```

## Alternative Gradient Variations

Se vuoi variare i gradienti per articoli featured diversi:

```css
/* Variant 1: Blue to Purple (default) */
.featured-article.variant-1 {
  background: linear-gradient(135deg, #1E90FF 0%, #9333EA 100%);
}

/* Variant 2: Pink to Purple */
.featured-article.variant-2 {
  background: linear-gradient(135deg, #FF1B8D 0%, #9333EA 100%);
}

/* Variant 3: Blue to Teal */
.featured-article.variant-3 {
  background: linear-gradient(135deg, #1E90FF 0%, #2A687A 100%);
}

/* Variant 4: Purple to Pink */
.featured-article.variant-4 {
  background: linear-gradient(135deg, #9333EA 0%, #FF1B8D 100%);
}
```

## Accessibilità

### Semantic HTML
```html
<article class="blog-article" role="article" aria-labelledby="article-1-title">
  <div class="article-inner">
    <span class="category-badge" aria-label="Category: Product">PRODUCT</span>
    <h3 id="article-1-title" class="article-title">...</h3>
    <p class="article-excerpt">...</p>
    <div class="article-meta">
      <time datetime="2025-11-05">5 Nov 2025</time>
    </div>
  </div>
</article>
```

### Focus states
```css
.blog-article:focus-within {
  outline: 4px solid #1E90FF;
  outline-offset: 4px;
}

.btn-read-more:focus-visible {
  outline: 4px solid #000;
  outline-offset: 3px;
}
```

### Skip link per tastiera
```css
.blog-article a.skip-to-content {
  position: absolute;
  left: -9999px;
}

.blog-article a.skip-to-content:focus {
  position: static;
  left: auto;
}
```

## Dynamic Content Loading

Se vuoi caricare articoli dinamicamente:

```javascript
// Fetch blog posts
async function loadBlogPosts() {
  try {
    const response = await fetch('/api/blog/posts?limit=3');
    const posts = await response.json();
    
    const blogGrid = document.querySelector('.blog-grid');
    
    posts.forEach((post, index) => {
      const isFeatured = index === 0;
      const articleHTML = createArticleCard(post, isFeatured);
      blogGrid.innerHTML += articleHTML;
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
}

function createArticleCard(post, isFeatured) {
  const articleClass = isFeatured ? 'featured-article' : 'secondary-article';
  const badgeClass = isFeatured ? 'badge-yellow' : 'badge-outline';
  
  return `
    <article class="blog-article ${articleClass}">
      <div class="article-inner">
        <span class="category-badge ${badgeClass}">${post.category}</span>
        <h3 class="article-title">${post.title}</h3>
        <p class="article-excerpt">${post.excerpt}</p>
        <div class="article-meta">
          <div class="meta-left">
            <span class="meta-item">${post.readingTime} min</span>
            <span class="meta-item">${post.date}</span>
          </div>
          ${isFeatured 
            ? `<button class="btn-read-more">Leggi ora</button>` 
            : `<a href="${post.url}" class="link-read-more">Leggi articolo →</a>`
          }
        </div>
      </div>
    </article>
  `;
}

loadBlogPosts();
```

## Note Implementazione

1. **Featured article gradiente**: Usa linear-gradient 135deg da #1E90FF a #9333EA
2. **Category badge**: Yellow (#FFD93D) per featured, outline per secondary
3. **Text contrast**: Bianco su featured (gradient background), nero su secondary
4. **Icon SVG**: Clock e calendar inline con 16x16px
5. **Hover states**: Card si sollevano (-3px) con ombra che cresce
6. **Meta border**: Top border con opacity 0.1 (nero) o 0.2 (bianco su featured)
7. **CTA differentiation**: Button per featured, text link con arrow per secondary
8. **Reading time**: Sempre visibile con icon clock
9. **Grid layout**: Featured full-width, secondary in 2 colonne
10. **Mobile**: Single column, tutto stack verticalmente

Questa implementazione bilancia l'impatto visivo del featured article (con gradiente colorato bold) con la pulizia delle card secondarie, mantenendo readability e usability su tutti i device.
