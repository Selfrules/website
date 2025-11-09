# Implementation Guide - Mattia's Portfolio Website

## Overview
Questo documento contiene le istruzioni su come utilizzare le specifiche dettagliate per implementare il design del portfolio di Mattia nella codebase esistente.

## File Struttura

Sono stati creati 7 file di specifica, uno per ogni sezione principale del sito:

1. **HERO_SECTION_SPECS.md** - Sezione hero/landing
2. **JOURNEY_TIMELINE_SPECS.md** - Timeline percorso professionale
3. **WHATS_UP_SECTION_SPECS.md** - Cosa sto facendo attualmente
4. **BLOG_SECTION_SPECS.md** - Articoli blog in evidenza
5. **WORK_TOGETHER_SECTION_SPECS.md** - Modalità di collaborazione
6. **ASK_ME_ANYTHING_SECTION_SPECS.md** - Form contatto e chatbot
7. **FOOTER_SECTION_SPECS.md** - Footer informazioni e link

## Come Usare Queste Specifiche

### Per Claude Code

Quando Claude Code riceve questi file, deve:

1. **Leggere attentamente ogni file di specifica** per la sezione su cui sta lavorando
2. **Mantenere la struttura HTML** esattamente come descritta
3. **Applicare tutti gli stili CSS/Tailwind** preservando:
   - Dimensioni e spaziature esatte
   - Colori del design system
   - Border e shadow neobrutalist
   - Animazioni e transizioni
4. **Implementare le interazioni** descritte nelle sezioni JavaScript
5. **Garantire accessibilità** seguendo le linee guida ARIA e semantic HTML
6. **Rispettare il responsive design** con i breakpoint indicati

### Principi Chiave da Mantenere

#### 1. Design System Neobrutalist
```
- Bordi spessi: 4px solid black (o colorati per highlight)
- Ombre hard: 8px offset, no blur
- Border radius: 6-8px per card, 4px per elementi piccoli
- Transizioni: max 0.3s ease
- Hover: lift effect (-3px translate) + shadow growth
```

#### 2. Color Palette
```
Primary:
- Electric Blue: #1E90FF
- Deep Navy: #3E526A
- Slate Blue: #6A7B9F

Accents:
- Magenta: #FF1B8D
- Purple: #9333EA
- Yellow: #FFD93D

Neutrals:
- Black: #000000
- Near-black: #1A1A1A
- White: #FFFFFF
- Off-white: #F5F5F5
```

#### 3. Typography
```
Headings: Space Grotesk (700-900 weight)
Body: Inter (400-500 weight)
Code/Mono: Space Mono (400-700 weight)

Scale (desktop):
- Hero: 72px
- Display: 58px
- H1: 46px
- H2: 37px
- H3: 29px
- Body: 17px
```

#### 4. Spacing System
```
Section padding: 100px vertical, 24px horizontal
Card padding: 32-36px
Gap between elements: 16-24px
Grid gaps: 30px
Mobile reduction: ~40% di riduzione delle spaziature
```

#### 5. Component Patterns

**Card Standard:**
```css
background: #fff;
border: 4px solid #000;
border-radius: 8px;
box-shadow: 8px 8px 0 #000;
padding: 32px;
transition: all 0.3s ease;

&:hover {
  transform: translate(-3px, -3px);
  box-shadow: 11px 11px 0 #000;
}
```

**Button Primary:**
```css
padding: 16px 32px;
font-family: 'Space Grotesk';
font-weight: 700;
background: #1E90FF;
color: #fff;
border: 4px solid #000;
border-radius: 6px;
box-shadow: 6px 6px 0 #000;

&:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #000;
}

&:active {
  transform: translate(2px, 2px);
  box-shadow: 3px 3px 0 #000;
}
```

**Icon Circular:**
```css
width: 64px;
height: 64px;
border-radius: 50%;
border: 3px solid #000;
box-shadow: 5px 5px 0 #000;
display: flex;
align-items: center;
justify-content: center;
```

## Ordine di Implementazione Consigliato

1. **Setup design tokens** - Colori, spacing, typography in config
2. **Hero Section** - Prima impressione, critica per engagement
3. **Journey Timeline** - Storia e credibilità
4. **What I'm Up To** - Real-time engagement
5. **Collaborazioni** - Conversione principale
6. **Blog Section** - Content showcase
7. **Ask Me Anything** - Secondary conversion
8. **Footer** - Completamento e navigazione

## Responsive Breakpoints

```css
/* Mobile First Approach */
Base: 320px+ (mobile)
sm: 640px+ (large mobile)
md: 768px+ (tablet)
lg: 1024px+ (desktop)
xl: 1440px+ (large desktop)
```

### Regole Responsive Chiave

**Mobile (< 768px):**
- Single column layout per tutti i grid
- Padding ridotto: 60px vertical, 20px horizontal
- Font size ridotto: ~70% della dimensione desktop
- Card padding: 24px
- Icon size: 48px → 56px
- Stack elementi verticalmente
- Full-width buttons

**Tablet (768px - 1024px):**
- Grid 2 colonne dove appropriato
- Padding intermedio: 80px vertical, 32px horizontal
- Font size: ~85% della dimensione desktop
- Mantenere layout pulito e leggibile

**Desktop (1024px+):**
- Grid 3 colonne per services/features
- Full padding e spacing
- Font size completo
- Layout complesso OK

## Animazioni e Performance

### Linee Guida Animazioni

1. **Entrance animations:**
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

/* Stagger con animation-delay */
.element:nth-child(1) { animation-delay: 0.1s; }
.element:nth-child(2) { animation-delay: 0.2s; }
```

2. **Hover effects:**
- Duration: 0.2s - 0.3s
- Easing: ease o ease-out
- Transform: translate, scale, rotate
- NO opacity transitions per accessibilità

3. **Reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Performance Optimization

1. **GPU Acceleration:**
```css
.animated-element {
  will-change: transform;
  transform: translateZ(0);
}
```

2. **Lazy Loading:**
```html
<img loading="lazy" src="..." alt="...">
```

3. **Font Loading:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" href="..." as="font">
```

## Accessibilità (WCAG AA)

### Checklist Implementazione

- [ ] **Contrast ratios**: Minimum 4.5:1 per body text, 3:1 per large text
- [ ] **Keyboard navigation**: Tab order logico, focus indicators visibili
- [ ] **ARIA labels**: Per icon-only buttons e interactive elements
- [ ] **Semantic HTML**: h1-h6 gerarchia corretta, nav, main, footer
- [ ] **Alt text**: Descrittivo per tutte le immagini
- [ ] **Form labels**: Associati correttamente con input
- [ ] **Focus visible**: 3-4px outline su tutti gli elementi interattivi
- [ ] **Skip links**: "Skip to main content" per keyboard users
- [ ] **Touch targets**: Minimum 48x48px per mobile

### Focus States Standard

```css
*:focus-visible {
  outline: 3px solid #1E90FF;
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible {
  outline: 4px solid #1E90FF;
  outline-offset: 3px;
}
```

## Testing Checklist

Prima di considerare una sezione completa, verifica:

### Visual/Design
- [ ] Colori esatti dal design system
- [ ] Spaziature corrette (padding, margin, gap)
- [ ] Border width: 4px per card, 3px per elementi piccoli
- [ ] Shadow offset: 8px per card, 4-6px per button
- [ ] Border radius: 8px card, 6px button, 4px small
- [ ] Typography: font family, size, weight corretti
- [ ] Hover states funzionanti: lift + shadow growth

### Responsive
- [ ] Mobile (< 768px): single column, padding ridotto
- [ ] Tablet (768-1024px): layout intermedio
- [ ] Desktop (1024px+): full layout
- [ ] Breakpoint smooth senza jump
- [ ] Text readability su tutte le dimensioni
- [ ] Images mantengono aspect ratio

### Interattività
- [ ] Hover effects smooth
- [ ] Click/tap feedback (active state)
- [ ] Animazioni entrance su scroll
- [ ] Form validation (se applicabile)
- [ ] Loading states (se applicabile)
- [ ] Error states styled

### Accessibilità
- [ ] Keyboard navigation completa
- [ ] Focus indicators visibili
- [ ] Screen reader friendly (ARIA)
- [ ] Contrast ratios WCAG AA
- [ ] Touch targets minimum 48px
- [ ] Reduced motion rispettato

### Performance
- [ ] Images ottimizzate
- [ ] Lazy loading applicato
- [ ] No layout shift (CLS)
- [ ] Smooth animations (60fps)
- [ ] Fast load time (<3s)

## File References

Ogni file di specifica contiene:
- Struttura HTML completa
- Styling CSS/Tailwind dettagliato
- Responsive breakpoints
- Animazioni e interazioni
- Note di implementazione
- Esempi di codice
- Checklist accessibilità
- Varianti alternative

### Quick Navigation

```
Hero Section          → HERO_SECTION_SPECS.md
Journey Timeline      → JOURNEY_TIMELINE_SPECS.md
What I'm Up To       → WHATS_UP_SECTION_SPECS.md
Blog Section         → BLOG_SECTION_SPECS.md
Work Together        → WORK_TOGETHER_SECTION_SPECS.md
Ask Me Anything      → ASK_ME_ANYTHING_SECTION_SPECS.md
Footer               → FOOTER_SECTION_SPECS.md
```

## Note Finali per Claude Code

1. **Preserva la coerenza**: Ogni sezione deve sembrare parte dello stesso design system
2. **Rispetta le specifiche**: Dimensioni, colori e spaziature sono intenzionali
3. **Mantieni la semplicità**: Il neobrutalism è diretto, non complicare
4. **Testa su device reali**: Mobile-first ma desktop-perfect
5. **Accessibilità non è optional**: È parte fondamentale del design
6. **Performance matters**: Animazioni smooth, load veloce
7. **Documenta deviazioni**: Se devi cambiare qualcosa, documenta perché

## Support & Questions

Se qualcosa non è chiaro nelle specifiche:
1. Cerca nel file della sezione specifica
2. Controlla esempi di codice inclusi
3. Verifica design system documentation
4. Riferisci a DESIGN_SYSTEM.md per dettagli completi

**Remember**: Ogni scelta di design è intenzionale. Le specifiche sono dettagliate perché ogni pixel conta nel creare l'esperienza finale.

Good luck building! 🚀
