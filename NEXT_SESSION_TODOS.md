# TODO List - Prossima Sessione

Priorità e task da completare nella prossima sessione di sviluppo.

---

## 🟢 Bassa Priorità - Feature Aggiuntive

### 1. Blog Listing Page
**Status**: ⏳ Pending
**Descrizione**: Pagina completa `/blog` con tutti gli articoli

**Features**:
- [ ] Layout grid con tutti i posts
- [ ] Filtri per category e tag
- [ ] Search functionality
- [ ] Pagination o infinite scroll

**File da creare**:
- `app/[locale]/blog/page.tsx`

### 2. Individual Blog Post Page
**Status**: ⏳ Pending
**Descrizione**: Template per singoli post MDX

**Features**:
- [ ] MDX rendering con syntax highlighting
- [ ] Table of contents
- [ ] Reading progress bar
- [ ] Related posts
- [ ] Social share buttons

**File da creare**:
- `app/[locale]/blog/[slug]/page.tsx`

### 3. Claude AI Chatbot
**Status**: ⏳ Pending
**Features**:
- [ ] Floating chat widget
- [ ] Claude API integration
- [ ] Conversational UI
- [ ] Persistent chat history

### 4. Spotify Now Playing Widget
**Status**: ⏳ Pending
**Features**:
- [ ] Spotify Web API integration
- [ ] Real-time now playing
- [ ] Fallback quando offline

### 5. Calendar Booking Integration
**Status**: ⏳ Pending
**Features**:
- [ ] Google Calendar integration
- [ ] Available slots display
- [ ] Booking confirmation

### 6. Design System Showcase Page
**Status**: ⏳ Pending
**Descrizione**: Pagina `/design-system` per vedere tutti i componenti live

**Features**:
- [ ] Route: `/design-system` o `/components`
- [ ] Showcase di tutti i componenti UI
- [ ] Code snippets per ogni componente
- [ ] Props table per ogni componente
- [ ] Dark/Light mode toggle

**File da creare**:
- `app/design-system/page.tsx`
- `components/design-system/ComponentShowcase.tsx`

---

## 🔵 Ottimizzazioni Future

### 7. Ottimizzazione Performance
- [ ] Lighthouse CI integration
- [ ] Image optimization audit
- [ ] Bundle size analysis
- [ ] Core Web Vitals monitoring

### 8. SEO Enhancement
- [ ] Sitemap.xml generation
- [ ] Robots.txt configuration
- [ ] OpenGraph images per ogni pagina
- [ ] Structured data markup (JSON-LD)

### 9. Analytics & Monitoring
- [ ] Google Analytics 4 integration
- [ ] Heatmap tracking (Hotjar o simile)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring

---

## ✅ Completati nella Sessione Corrente

### Alta Priorità
1. ✅ **Verifica Conformità Design System**
   - Fixed borders: tutti i componenti usano `border-4 border-black`
   - Fixed shadows: tutti usano `shadow-brutal` (8px offset, no blur)
   - Verificato colori: uso corretto di primary/secondary/accent
   - Verificato typography: Space Grotesk per heading, Inter per body

2. ✅ **Migliorata Leggibilità Testo**
   - Verificato contrasto colori (>17:1 ratio - WCAG AAA)
   - Confermato line-height: 1.6 per body text
   - Confermato font-size minimo: 16px su mobile

3. ✅ **Ottimizzate Animazioni**
   - Ridotte animazioni decorative ~70%
   - Mantenute solo animazioni funzionali (hover, magnetic)
   - Rimossi: badge pulse, stats pulsing, floating shapes infinite, scroll indicator bounce

4. ✅ **Fix CTA Button Hover Animations**
   - Hover: shadow da 8px a 12px, movimento -4px
   - Active: shadow a 4px, movimento +4px
   - Transizione: 200ms con easing brutal

### Media Priorità
5. ✅ **Consolidato Design System**
   - Eliminato `claudedocs/DESIGN_SYSTEM_GUIDE.md` (duplicato)
   - `DESIGN_SYSTEM.md` è ora single source of truth
   - Link aggiunto nel README.md

6. ✅ **Applicato Copy Ufficiale**
   - Hero Section: headline, subtitle, supporting text, CTA
   - Journey Section: 4 fasi timeline con copy da `website_copy_ita.md`
   - Work Together Section: 3 modalità di collaborazione complete

7. ✅ **Rimossa Sezione Progetti**
   - Eliminato componente Projects dalla homepage
   - Homepage ora: Hero → Journey → Blog → Work Together

8. ✅ **Cleanup Content Directory**
   - Eliminati `blog_posts_outline_*.md`
   - Eliminati `SEO_metadata.md` e `microcopy_ui_elements.md`
   - Mantenuti: `website_copy_ita.md`, `website_copy_eng.md`, `blog/`

9. ✅ **Testing con Playwright**
   - Verificata Hero section
   - Verificata Journey section
   - Verificata Work Together section
   - Screenshots salvati in `claudedocs/screenshots/`

---

## 📋 Workflow Prossima Sessione

### Pre-Start
1. [ ] Review `CHANGELOG.md` per capire lo stato attuale
2. [ ] Review questo file (`NEXT_SESSION_TODOS.md`)
3. [ ] `git pull origin main` per aggiornare
4. [ ] `npm install` per eventuali nuove dependencies

### Ordine Suggerito per Prossime Feature
1. **Blog Listing Page** (2-3 ore) - Pagina `/blog` completa
2. **Individual Blog Post Page** (2-3 ore) - Template MDX con TOC
3. **Design System Showcase** (2 ore) - Pagina demo componenti
4. **Chatbot Integration** (3-4 ore) - Widget Claude AI
5. **Calendar & Spotify** (2 ore ciascuno) - Integrazioni API

### Post-Work
1. [ ] Test completo con Playwright
2. [ ] Screenshot di ogni sezione
3. [ ] Update `CHANGELOG.md`
4. [ ] Update questo file rimuovendo completed tasks
5. [ ] Commit e push

---

## 🎯 Obiettivo Prossime Sessioni

**Goal**: Completare le feature aggiuntive per rendere il portfolio fully functional

**Success Metrics**:
- ✅ Blog completamente funzionale (listing + post pages)
- ✅ Design system showcase live
- ✅ Chatbot AI integrato
- ✅ Integrazioni Spotify e Calendar funzionanti
- ✅ Performance: Lighthouse score > 90 su tutti i parametri

---

## 📝 Note Tecniche

### Architettura Attuale
- **Framework**: Next.js 14 App Router
- **Styling**: Tailwind CSS + Custom Design System
- **Animazioni**: Framer Motion (ottimizzate)
- **Content**: MDX per blog posts
- **i18n**: Next-intl (italiano/inglese)

### File Chiave Modificati
- `components/ui/CTAButton.tsx` - Fixed hover/active animations
- `components/sections/Hero.tsx` - Applicato copy, rimosso animazioni
- `components/sections/Journey.tsx` - 4 fasi timeline con copy ufficiale
- `components/sections/Blog.tsx` - Conformità design system
- `app/[locale]/page.tsx` - Work Together section, rimosso Projects
- `DESIGN_SYSTEM.md` - Single source of truth
- `content/` - Cleanup file obsoleti

### Branch Strategy
- Main branch: `feature/phase2-blog-sections`
- Commit corrente: "feat: apply official copy, optimize animations, design system conformity"
