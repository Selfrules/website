# TODO List - Prossima Sessione

Priorità e task da completare nella prossima sessione di sviluppo.

---

## 🔴 Alta Priorità - UI e Design System

### 1. Verifica Conformità Design System
**Status**: ⏳ Pending
**Descrizione**: Controllare che tutta la UI sia conforme a `DESIGN_SYSTEM.md`

**Checklist**:
- [ ] Verificare bordi: tutti i componenti usano `border-4 border-black`
- [ ] Verificare shadows: tutti usano `shadow-brutal` (8px offset, no blur)
- [ ] Verificare colori: uso corretto di primary/secondary/accent
- [ ] Verificare typography: Space Grotesk per heading, Inter per body
- [ ] Verificare border radius: 8-12px dove appropriato
- [ ] Verificare hover effects: pattern consistente (shadow grow, translate)

**File da controllare**:
- `components/sections/Hero.tsx`
- `components/sections/Journey.tsx`
- `components/sections/Projects.tsx`
- `components/sections/Blog.tsx`
- `components/blog/BlogCard.tsx`
- `components/ui/CTAButton.tsx`

### 2. Migliorare Leggibilità Testo
**Status**: ⏳ Pending
**Descrizione**: Controllare e ottimizzare la leggibilità del testo su tutte le sezioni

**Checklist**:
- [ ] Verificare contrasto colori testo (WCAG AA: minimo 4.5:1)
- [ ] Controllare line-height: body text deve avere 1.6
- [ ] Verificare font-size minimo: 16px su mobile per body
- [ ] Controllare lunghezza righe: max 70-80 caratteri per riga
- [ ] Verificare spacing tra paragrafi: sufficiente breathing room
- [ ] Test leggibilità su dispositivi mobile
- [ ] Test leggibilità in dark mode

**File da controllare**:
- Tutti i componenti sections
- MDX components (`mdx-components.tsx`)
- Global styles (`globals.css`)

### 3. Ottimizzare Animazioni
**Status**: ⏳ Pending
**Descrizione**: Ridurre il numero di animazioni e migliorare quelle esistenti

**Actions**:
- [ ] **Audit animazioni**: Identificare tutte le animazioni nella homepage
- [ ] **Rimuovere decorative**: Mantenere solo animazioni funzionali/meaningful
- [ ] **Ridurre motion sickness**: Rispettare `prefers-reduced-motion`
- [ ] **Ottimizzare performance**: Usare `transform` e `opacity` (GPU-accelerated)
- [ ] **Timing corretto**: Max 300-500ms per micro-interactions

**Regola generale**: "Un'animazione deve avere uno scopo. Se non lo ha, rimuovila."

**File da modificare**:
- `components/sections/Hero.tsx` (ridurre floating shapes?)
- `components/sections/Journey.tsx` (semplificare scroll animations?)
- `lib/animations.ts` (se esiste)

### 4. Fix Hover CTA Buttons
**Status**: ⏳ Pending
**Descrizione**: Sistemare le animazioni hover sui pulsanti CTA per allinearle al design system

**Specifiche**:
- [ ] Hover: shadow cresce da 8px a 12px
- [ ] Hover: elemento si muove di -4px (x e y)
- [ ] Active: shadow si riduce a 4px
- [ ] Active: elemento si muove di +4px (x e y)
- [ ] Transizione: 200ms con easing brutal `cubic-bezier(0.25, 0.1, 0.25, 1)`
- [ ] Nessun bordo che cambia colore al hover
- [ ] Nessun background che cambia gradualmente

**File da modificare**:
- `components/ui/CTAButton.tsx` - Fix hover animation
- `components/ui/MagneticButton.tsx` - Verificare consistenza

---

## 🟡 Media Priorità - Content e Struttura

### 5. Consolidare Design System
**Status**: ⏳ Pending
**Descrizione**: Avere un UNICO file di design system da usare come riferimento

**Actions**:
- [ ] **Scegliere source of truth**: Decidere se usare `DESIGN_SYSTEM.md` esistente o altro
- [ ] **Rimuovere duplicati**: Eliminare `claudedocs/DESIGN_SYSTEM_GUIDE.md` se duplicato
- [ ] **Unificare documentazione**: Merge di tutti i documenti design in uno solo
- [ ] **Update README**: Link chiaro al design system nella root del progetto
- [ ] **Cleanup**: Rimuovere documentazione obsoleta/frammentata

**File da consolidare**:
- `DESIGN_SYSTEM.md` (potenziale source of truth)
- `claudedocs/DESIGN_SYSTEM_GUIDE.md` (verificare se duplicato)
- Eventuali altri file design sparsi

### 6. Creare Design System Showcase
**Status**: ⏳ Pending
**Descrizione**: Pagina `/design-system` per vedere tutti i componenti live

**Features**:
- [ ] Route: `/design-system` o `/components`
- [ ] Showcase di tutti i componenti UI:
  - Buttons (tutte le varianti e size)
  - Cards (hoverable, clickable, variants)
  - Inputs, Badges, Typography
  - Patterns (dots, grid, diagonals)
  - Illustrations
  - Colors palette
  - Animations demo
- [ ] Code snippets per ogni componente
- [ ] Props table per ogni componente
- [ ] Dark/Light mode toggle

**Riferimento**: Stile Storybook ma con design neobrutalist

**File da creare**:
- `app/design-system/page.tsx`
- `components/design-system/ComponentShowcase.tsx`

### 7. Rimuovere Sezione Progetti
**Status**: ⏳ Pending
**Descrizione**: Eliminare completamente la sezione progetti/portfolio dalla homepage

**Actions**:
- [ ] Rimuovere `<Projects locale={locale} />` da `app/[locale]/page.tsx`
- [ ] Valutare se eliminare componente o mantenerlo per futuro
- [ ] Se eliminato: rimuovere `components/sections/Projects.tsx`
- [ ] Se eliminato: rimuovere dati progetti mock
- [ ] Update navigation se linkava a sezione progetti
- [ ] Test che la homepage funzioni senza quella sezione

**Nota**: Verificare se il copy finale richiede progetti o meno

### 8. Applicare Copy Ufficiale
**Status**: ⏳ Pending
**Descrizione**: Sostituire tutto il contenuto placeholder con copy da `content/website_copy_ita.md`

**Sezioni da aggiornare**:
- [ ] **Hero**: Headline, subtitle, CTA da `## Hero Section`
- [ ] **Journey**: Content da `## My Journey Section`
- [ ] **Work Together**: Nuova sezione da creare se non esiste
- [ ] **Latest Thinking**: Copy per blog section
- [ ] **Ask Me Anything**: Nuova sezione chatbot
- [ ] **Footer**: Tagline e links

**File da modificare**:
- `components/sections/Hero.tsx`
- `components/sections/Journey.tsx`
- Creare `components/sections/WorkTogether.tsx`
- Creare `components/sections/AskMeAnything.tsx`
- Footer component (se esiste)

### 9. Cleanup Content Directory
**Status**: ⏳ Pending
**Descrizione**: Eliminare tutto ciò che non è inerente al copy nella directory `content/`

**Actions**:
- [ ] Review tutti i file in `content/`
- [ ] Mantenere solo:
  - `website_copy_ita.md` (source of truth italiano)
  - `website_copy_eng.md` (source of truth inglese)
  - `blog/` (posts MDX)
  - `SEO_metadata.md` (se usato)
  - `microcopy_ui_elements.md` (se usato)
- [ ] Eliminare:
  - `blog_posts_outline_*.md` (già implementato)
  - File obsoleti o draft

**Directory**: `content/`

---

## 🟢 Bassa Priorità - Feature Aggiuntive

### 10. Blog Listing Page
**Status**: ⏳ Pending
**Descrizione**: Pagina completa `/blog` con tutti gli articoli

**Features**:
- [ ] Layout grid con tutti i posts
- [ ] Filtri per category e tag
- [ ] Search functionality
- [ ] Pagination o infinite scroll

**File da creare**:
- `app/[locale]/blog/page.tsx`

### 11. Individual Blog Post Page
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

### 12. Claude AI Chatbot
**Status**: ⏳ Pending
**Features**:
- [ ] Floating chat widget
- [ ] Claude API integration
- [ ] Conversational UI
- [ ] Persistent chat history

### 13. Spotify Now Playing
**Status**: ⏳ Pending
**Features**:
- [ ] Spotify Web API integration
- [ ] Real-time now playing
- [ ] Fallback quando offline

### 14. Calendar Booking
**Status**: ⏳ Pending
**Features**:
- [ ] Google Calendar integration
- [ ] Available slots display
- [ ] Booking confirmation

---

## 📋 Workflow Prossima Sessione

### Pre-Start
1. [ ] Review `CHANGELOG.md` per capire lo stato attuale
2. [ ] Review questo file (`NEXT_SESSION_TODOS.md`)
3. [ ] `git pull origin master` per aggiornare
4. [ ] `npm install` per eventuali nuove dependencies

### Ordine Suggerito
1. **Design System Check** (1-2 ore) - Verifica conformità e fix
2. **Leggibilità** (30 min) - Test e ottimizzazioni contrasto
3. **Animazioni** (1 ora) - Riduzione e ottimizzazione
4. **CTA Buttons** (30 min) - Fix hover effects
5. **Copy Application** (2 ore) - Applicare contenuto ufficiale
6. **Cleanup** (30 min) - Rimuovere progetti, consolidare docs

### Post-Work
1. [ ] Test completo con Playwright
2. [ ] Screenshot di ogni sezione
3. [ ] Update `CHANGELOG.md`
4. [ ] Update questo file rimuovendo completed tasks
5. [ ] Commit e push

---

## 🎯 Obiettivo Sessione

**Goal**: Homepage completa con design system consistente, copy ufficiale applicato, leggibilità ottimizzata, animazioni ridotte.

**Success Metrics**:
- ✅ UI 100% conforme a design system
- ✅ Copy ufficiale applicato su tutte le sezioni
- ✅ Leggibilità: contrasto WCAG AA su tutto
- ✅ Animazioni ridotte del 30-50%
- ✅ CTA buttons con hover perfetto
- ✅ Un unico file design system di riferimento
- ✅ Content directory pulita

---

## 📝 Note

- Lavorare su feature branch: `feature/ui-improvements`
- Committare frequentemente (ogni task completato)
- Testing con Playwright dopo ogni major change
- Screenshot prima/dopo per confronto miglioramenti