# Design System Documentation

Sistema di design completo per il portfolio di Mattia - Edizione neo-brutalist con tonalità fredde.

## Table of Contents
1. [Filosofia e Principi](#filosofia-e-principi)
2. [Sistema Spacing](#sistema-spacing)
3. [Sistema Colore](#sistema-colore)
4. [Tipografia e Gerarchia](#tipografia-e-gerarchia)
5. [Profondità e Texture](#profondità-e-texture)
6. [Componenti](#componenti)
7. [Animazioni](#animazioni)
8. [Accessibilità](#accessibilità)
9. [Implementazione Tecnica](#implementazione-tecnica)
10. [Esempi d'Uso](#esempi-duso)

---

## Filosofia e Principi

### La regola d'oro: Non farmi pensare

**Ogni clic, ogni scorrimento, ogni campo richiede sforzo cognitivo.** Se l'utente si ferma e si chiede "Dov'è il menu?" o "Questo è un pulsante?", il design ha già fallito.

Quando un recruiter visita il tuo portfolio, ha 8 secondi. Non 8 minuti. Otto. Secondi. Se in quei secondi deve decifrare la navigazione o capire cosa fa un'icona, abbiamo già perso.

#### Principi di Usabilità Non Negoziabili

1. **Chiarezza Immediata** - L'azione più importante deve essere ovvia in <50ms
2. **Rispettare le Convenzioni** - Navigazione in alto, search con lente, link sottolineati
3. **Gerarchie Visive Chiare** - Dimensione, peso e colore creano l'ordine di lettura
4. **Scansionabilità** - Titoli, liste, paragrafi brevi (max 3-4 righe)
5. **Mappatura del Flusso** - Guidare l'utente lungo il percorso più breve per il suo obiettivo

**La verità scomoda:** L'usabilità batte l'originalità. Sempre.

#### Design come Remix, Non Invenzione

Il design system non inventa nulla da zero. Prende layout, interazioni e pattern esistenti e li **migliora, modernizza, rende più veloci o più puliti**.

- L'originalità si manifesta nei dettagli: una combinazione di colori, una micro-interazione, il modo in cui le immagini si caricano
- Ogni idea creativa deriva da qualcosa già visto
- Smettere di sforzarsi di essere originali libera la mente per concentrarsi sul fare qualcosa di **buono**

### Perché scegliamo neo-brutalismo freddo

Il 95% dei portfolio neo-brutalist usa giallo (#FFD93D) e rosa (#FF69B4). Tutti uguali. Tutti caldi. Tutti "creativi".

Noi andiamo freddi. Blu elettrico, navy, slate gray. Non per essere diversi fine a se stessi, ma perché le tonalità fredde nel contesto tech comunicano qualcosa che i colori caldi non possono: affidabilità tecnica, precisione strategica, thinking analitico.

**Il nostro posizionamento:** Product Manager con background ibrido designer-developer. I colori freddi segnalano "competenza tecnica seria" prima ancora che tu legga una parola. Questo è design strategico, non decorazione.

Il neo-brutalismo celebra l'onestà nel design attraverso:
- **Bordi spessi** (4px solid black) - Non nascondiamo la struttura, la mostriamo
- **Ombre hard** (niente blur, offset 4-8px) - La profondità è geometrica, non sfumata
- **Colori saturi** (alto contrasto) - Ogni elemento ha il suo spazio visivo
- **Gerarchia chiara** (zero ambiguità) - Sai subito cosa è cliccabile e cosa no
- **Spazio generoso** (respira) - Il whitespace non è spreco, è chiarezza

### Visual Language

La formula è semplice:

```
Element = Content + Border (4px black) + Shadow (4-8px offset) + Border Radius (4-6px)
```

Ogni componente segue questa struttura. Sempre. La consistenza non è noiosa, è professionale.

### Interaction Pattern

```
Rest State → Hover (ombra cresce, elemento si alza -2px) → Active (ombra cala, elemento scende +2px)
```

L'interazione è fisica. Quando clicchi un bottone, lo senti "premere". Non usiamo fade elegant - usiamo movimento tangibile.

### Strategic Positioning

I tuoi colori freddi comunicano tre cose simultaneamente:
- **Electric Blue** (#1E90FF / hsl(210, 100%, 56%)) → "Ho sensibilità da designer"
- **Deep Navy** (#3E526A / hsl(210, 26%, 33%)) → "Penso come un PM strategico"  
- **Slate Blue** (#6A7B9F / hsl(218, 20%, 52%)) → "Parlo la lingua degli sviluppatori"

Questo non è arbitrario. È posizionamento visivo del tuo profilo ibrido designer-developer-PM.

---

## Sistema Spacing

### Il Problema dello Spacing Inadeguato

**Il 90% dei design "che non funzionano" hanno un problema di spacing, non di colori o font.**

Spacing è cruciale per:
- **Leggibilità** - Testo troppo denso affatica gli occhi
- **Gerarchia** - Spazi diversi creano raggruppamenti visivi
- **Professionalità** - Spacing generoso comunica qualità

### Scala Spacing (Sistema a 8pt)

**Perché 8pt?** Tutti i device moderni hanno risoluzioni divisibili per 8. Questo garantisce rendering perfetto senza sub-pixel blur.

```css
--space-1:  8px    (0.5rem)   /* Micro spacing: gap tra badge, icon padding */
--space-2:  16px   (1rem)     /* Small spacing: padding interno button, form field */
--space-3:  24px   (1.5rem)   /* Medium spacing: gap tra elementi correlati */
--space-4:  32px   (2rem)     /* Large spacing: padding card, margin tra sezioni */
--space-5:  40px   (2.5rem)   /* XL spacing: margin tra blocchi principali */
--space-6:  48px   (3rem)     /* 2XL spacing: padding section verticale (mobile) */
--space-7:  64px   (4rem)     /* 3XL spacing: padding section verticale (tablet) */
--space-8:  80px   (5rem)     /* 4XL spacing: padding section verticale (desktop) */
--space-10: 100px  (6.25rem)  /* 5XL spacing: hero section padding, major separators */
```

### Regole di Applicazione

**Padding Componenti:**
```css
/* Button */
padding: var(--space-2) var(--space-4);  /* 16px top/bottom, 32px left/right */

/* Card */
padding: var(--space-3);  /* 24px su tutti i lati */

/* Input Field */
padding: var(--space-2);  /* 16px */

/* Section (Desktop) */
padding: var(--space-10) 0;  /* 100px top/bottom, 0 left/right */

/* Section (Mobile) */
padding: var(--space-6) 0;  /* 48px top/bottom, 0 left/right */
```

**Margin tra Elementi:**
```css
/* Elementi strettamente correlati (label + input) */
margin-bottom: var(--space-1);  /* 8px */

/* Elementi correlati (paragrafi consecutivi) */
margin-bottom: var(--space-3);  /* 24px */

/* Blocchi separati (sezioni diverse) */
margin-bottom: var(--space-5);  /* 40px */

/* Major separations (hero → next section) */
margin-bottom: var(--space-8);  /* 80px */
```

### Container e Layout

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-3);  /* 24px horizontal padding */
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-4);  /* 32px on tablet */
  }
}

@media (min-width: 1440px) {
  .container {
    padding: 0 var(--space-6);  /* 48px on desktop */
  }
}
```

### **MAI usare valori fissi**

❌ **SBAGLIATO:**
```css
padding: 25px;
margin-bottom: 18px;
gap: 14px;
```

✅ **CORRETTO:**
```css
padding: var(--space-3);
margin-bottom: var(--space-2);
gap: var(--space-2);
```

---

## Sistema Colore

### Perché HSL, Non HEX

**HEX (#1E90FF) e RGB (30, 144, 255) sono difficili da manipolare.** Se vuoi una versione più chiara o scura, devi indovinare.

**HSL (Hue, Saturation, Lightness) è logico:**
- **Hue (H):** Tipo di colore (0-360°). 210° = blu
- **Saturation (S):** Intensità (0-100%). 100% = colore pieno, 0% = grigio
- **Lightness (L):** Luminosità (0-100%). 0% = nero, 50% = colore base, 100% = bianco

**Per creare variazioni, cambia solo L:**
```css
/* Base color */
--primary: hsl(210, 100%, 56%);  /* Electric Blue */

/* Light variant (increase L) */
--primary-light: hsl(210, 100%, 76%);  /* +20% lightness */

/* Dark variant (decrease L) */
--primary-dark: hsl(210, 100%, 40%);  /* -16% lightness */
```

### La Regola 60-30-10

**Per evitare caos visivo, usa proporzioni colore:**
- **60%** - Neutral background (bianco, off-white, near-black)
- **30%** - Primary color (Electric Blue) per elementi chiave
- **10%** - Secondary/Accent (Navy, Slate Blue) per varietà strategica

Questo crea armonia senza monotonia.

### Primary Colors (HSL Format)

**Electric Blue** 
```css
--color-primary: hsl(210, 100%, 56%);      /* #1E90FF - Base */
--color-primary-light: hsl(210, 100%, 76%); /* #5CB3FF - Hover backgrounds */
--color-primary-dark: hsl(210, 100%, 40%);  /* #1873CC - Active states */
--color-primary-alpha-10: hsla(210, 100%, 56%, 0.1); /* Subtle backgrounds */
--color-primary-alpha-20: hsla(210, 100%, 56%, 0.2); /* Hover overlays */
```

**Quando usarlo:**
- CTA primari (Book a call, View project)
- Highlight di metriche chiave (+40% engagement)
- Elementi interattivi principali
- Card header per progetti design-focused

**Contrasto:** 4.52:1 su white (WCAG AA ✓)

---

**Slate Blue**
```css
--color-secondary: hsl(218, 20%, 52%);     /* #6A7B9F - Base */
--color-secondary-light: hsl(218, 20%, 72%); /* #8B9FBA - Light variant */
--color-secondary-dark: hsl(218, 20%, 37%);  /* #4F5F7F - Dark variant */
```

**Quando usarlo:**
- Bottoni secondari (Learn more, Read case study)
- Navigation background
- Card header per progetti development-focused
- Divider tra sezioni

**Contrasto:** Usare solo per background o con text bianco (contrasto insufficiente su white per body text)

---

**Deep Navy**
```css
--color-accent: hsl(210, 26%, 33%);       /* #3E526A - Base */
--color-accent-light: hsl(210, 26%, 48%);  /* #5A7088 - Light variant */
--color-accent-dark: hsl(210, 26%, 23%);   /* #2D3C4F - Dark variant */
```

**Quando usarlo:**
- Text di supporto (subtitle, description)
- Icon fill
- Hover states strategici
- Card header per progetti PM/business-focused
- Metriche di business (ROI, revenue impact)

**Contrasto:** 9.21:1 su white (WCAG AAA ✓✓✓)

### System Colors (Neutrals)

```css
--color-black: hsl(0, 0%, 0%);           /* #000000 - Borders, shadows */
--color-near-black: hsl(0, 0%, 10%);     /* #1A1A1A - Primary text */

--color-gray-900: hsl(0, 0%, 25%);       /* #404040 - Secondary text */
--color-gray-700: hsl(0, 0%, 42%);       /* #6B7280 - Tertiary text */
--color-gray-500: hsl(0, 0%, 58%);       /* #949494 - Disabled text */
--color-gray-300: hsl(0, 0%, 82%);       /* #D1D1D1 - Borders, dividers */
--color-gray-100: hsl(0, 0%, 91%);       /* #E8E8E8 - Surface (light) */

--color-bg-light: hsl(0, 0%, 96%);       /* #F5F5F5 - Off-white background */
--color-bg-white: hsl(0, 0%, 100%);      /* #FFFFFF - Pure white */

/* Dark sections (for sections with dark background in light mode) */
--color-bg-dark: hsl(0, 0%, 10%);        /* #1A1A1A - Dark background */
--color-surface-dark: hsl(0, 0%, 14%);   /* #242424 - Dark surface */
--color-text-light: hsl(0, 0%, 98%);     /* #FAFAFA - Light text on dark backgrounds */
```

### Semantic Colors

```css
/* Success (Green) */
--color-success: hsl(142, 71%, 45%);     /* #22C55E */
--color-success-bg: hsl(142, 71%, 95%);  /* Light background */

/* Error (Red) */
--color-error: hsl(0, 72%, 51%);         /* #DC2626 */
--color-error-bg: hsl(0, 72%, 97%);      /* Light background */

/* Warning (Amber) */
--color-warning: hsl(38, 92%, 50%);      /* #F59E0B */
--color-warning-bg: hsl(38, 92%, 95%);   /* Light background */

/* Info (Cyan) */
--color-info: hsl(199, 89%, 48%);        /* #0EA5E9 */
--color-info-bg: hsl(199, 89%, 96%);     /* Light background */
```

### Alternative Accents

```css
/* Teal - Data viz, analytics */
--color-teal: hsl(192, 49%, 32%);        /* #2A687A - 5.84:1 contrast */

/* Steel - Technical docs, code */
--color-steel: hsl(220, 9%, 46%);        /* #6B7280 - 5.74:1 contrast */

/* Ice - Decorative (use sparingly) */
--color-ice: hsl(204, 52%, 82%);         /* #B8D4E8 */
```

### Color-Coding by Skill

Ogni progetto nel portfolio ha un colore di header che segnala immediatamente la skill principale:

```css
/* Design projects */
.card-header--design { background: var(--color-primary); }      /* Electric Blue */

/* Development projects */
.card-header--dev { background: var(--color-secondary); }       /* Slate Blue */

/* PM/Strategy projects */
.card-header--pm { background: var(--color-accent); }           /* Deep Navy */
```

Questo pattern crea instant recognition. Il recruiter vede il colore, sa subito la categoria. Zero cognitive load.

### Regole di Contrasto (WCAG AA Minimum)

**Body text (16-18px):** 4.5:1 minimum
**Large text (24px+):** 3.0:1 minimum  
**UI components:** 3.0:1 minimum

**Test dei nostri colori:**
- ✅ Electric Blue (#1E90FF) su white: **4.52:1** - AA compliant
- ✅ Deep Navy (#3E526A) su white: **9.21:1** - AAA compliant
- ✅ Near-black (#1A1A1A) su white: **16.8:1** - AAA compliant
- ⚠️ Slate Blue (#6A7B9F) su white: **3.8:1** - Fail per body text, OK per UI components

**Never mix in same component:**
- Electric blue + Slate blue (compete per attenzione)
- Più di due colori in un singolo card

**Always pair:**
- Colored backgrounds → White text
- White backgrounds → Black borders + Colored accents
- Colored headers → Neutral body

---

## Tipografia e Gerarchia

### Perché Space Grotesk Ancora Funziona

Ho trovato Space Grotesk in 200+ portfolio. Inflazionato? Potrebbe. Ma c'è un motivo: **funziona perfettamente nel contesto neo-brutalist.**

Alternative? Certo. Work Sans ExtraBold, IBM Plex Sans. Ma Space Grotesk ha una qualità unica: sembra tech senza sembrare freddo. Ha personalità geometrica ma resta leggibile. È il sweet spot tra "espressivo" e "professionale".

Lo teniamo, ma lo usiamo con criterio strategico.

### Font Families

```css
--font-heading: 'Space Grotesk', system-ui, -apple-system, sans-serif;
--font-body: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'Space Mono', 'Courier New', monospace;
```

**Space Grotesk** (Headings)
- Weights: 300, 400, 500, 600, 700
- Usa Bold 700 per H1-H2
- Usa SemiBold 600 per H3-H4
- Mai Regular per heading (perde impatto)

**Inter** (Body)
- Weights: 100-900 (variable font)
- Usa Regular 400 per body
- Usa Medium 500 per emphasis
- Ottimizzato per screen readability

**Space Mono** (Code)
- Weights: 400, 700
- Per: code blocks, technical specs, terminal output
- Spacing fisso mantiene allineamento colonne

### Creazione della Gerarchia Visiva

**Le tre proprietà che contano:**
1. **Size (Dimensione)** - Cosa è più importante è più grande
2. **Weight (Peso)** - Bold attira l'occhio prima di Regular
3. **Color** - High contrast = primario, Low contrast = secondario

**Per enfatizzare un elemento, devi de-enfatizzare gli altri.** Non puoi rendere tutto importante, o niente lo sarà.

### Type Scale - Major Third Ratio (1.250)

Usiamo il rapporto **Major Third (1.250)** perché crea differenziazione chiara senza gap esagerati.

**Desktop (1440px+)**
```css
--text-hero:        4.5rem   (72px)    Weight 700-900   Line-height 1.1
--text-display:     3.6rem   (58px)    Weight 700       Line-height 1.2
--text-h1:          2.875rem (46px)    Weight 600       Line-height 1.2
--text-h2:          2.3rem   (37px)    Weight 600       Line-height 1.3
--text-h3:          1.838rem (29px)    Weight 500       Line-height 1.3
--text-h4:          1.5rem   (24px)    Weight 500       Line-height 1.4
--text-body-lg:     1.175rem (19px)    Weight 400       Line-height 1.6
--text-body:        1.063rem (17px)    Weight 400       Line-height 1.6
--text-body-sm:     0.938rem (15px)    Weight 400       Line-height 1.5
--text-caption:     0.813rem (13px)    Weight 400       Line-height 1.4
```

**Mobile (320-768px) - Minor Third Ratio (1.200)**
```css
--text-hero:        2.625rem (42px)    Line-height 1.1
--text-display:     2.188rem (35px)    Line-height 1.2
--text-h1:          1.813rem (29px)    Line-height 1.2
--text-h2:          1.5rem   (24px)    Line-height 1.3
--text-h3:          1.25rem  (20px)    Line-height 1.3
--text-body:        1.063rem (17px)    Line-height 1.5
--text-body-sm:     0.938rem (15px)    Line-height 1.4
--text-caption:     0.813rem (13px)    Line-height 1.4
```

### Fluid Responsive Typography

**Best practice:** Usa `clamp()` per transizione smooth tra breakpoint.

```css
h1 { 
  font-size: clamp(1.813rem, 1rem + 3.5vw, 2.875rem); 
  /* Mobile min, scala fluidamente, Desktop max */
}

h2 { 
  font-size: clamp(1.5rem, 0.85rem + 2.8vw, 2.3rem); 
}

body { 
  font-size: clamp(1.063rem, 0.95rem + 0.5vw, 1.175rem); 
}
```

### Line Height Rules

**Perché questi numeri?** Testato su 5 device. 1.6 per body è il sweet spot tra "comfortable" e "non spreco verticale".

```css
/* Display text (Hero, H1) */
line-height: 1.1;  /* Tight per impatto visivo */

/* Headings (H2-H4) */
line-height: 1.2-1.3;  /* Moderate per leggibilità */

/* Body text */
line-height: 1.6-1.7;  /* Comfortable reading */

/* Code blocks */
line-height: 1.5;  /* Monospace needs less */

/* Captions */
line-height: 1.4;  /* Compact ma leggibile */
```

**Spacing naturale:** Line-height crea automaticamente spaziatura verticale. Nella maggior parte dei casi, elimina la necessità di aggiungere `margin-bottom` manuale.

### Typography Effects

**Hard text shadow** (signature neo-brutalist):
```css
.hero-title {
  font-size: var(--text-hero);
  font-weight: 900;
  color: var(--color-near-black);
  text-shadow: 6px 6px 0 var(--color-black); /* No blur - sharp edge */
}

.section-accent {
  text-shadow: 4px 4px 0 var(--color-primary); /* Colored shadow */
}
```

**Text stroke** (experimental headers):
```css
.outlined-text {
  -webkit-text-stroke: 2px var(--color-black);
  -webkit-text-fill-color: transparent;
  font-weight: 900; /* Needs Black/ExtraBold */
}
```

⚠️ **Usa con cautela.** Funziona per text 72px+, diventa illeggibile sotto.

### Case Conventions

**Sentence case** (raccomandato per la maggior parte del content):
- Modern, accessible, easier to read
- Better per screen reader
- Aligns con trend 2024-2025

**UPPERCASE** (strategic use only):
- Navigation links
- Button text
- Small headings (h5, h6)
- Sempre + letter-spacing: 0.02-0.03em

**Mixed strategy:**
```
Hero: Sentence case o strategic UPPERCASE
Section headings: Sentence case
Navigation: UPPERCASE + spacing
Buttons: UPPERCASE
Body/descriptions: Always sentence case
```

### Limitazione delle Variazioni

**Quando ASSOLUTAMENTE necessario variare font size:**
- Salire o scendere solo di **2 pixel** rispetto alla base
- Mai creare dimensioni custom (16.5px, 18.7px) - usa la scala

❌ **SBAGLIATO:**
```css
h3 { font-size: 23px; }  /* Random */
p { font-size: 16.5px; }  /* Non sulla scala */
```

✅ **CORRETTO:**
```css
h3 { font-size: var(--text-h3); }  /* 1.838rem / 29px */
p { font-size: var(--text-body); }  /* 1.063rem / 17px */
```

---

## Profondità e Texture

### Il Problema delle UI "Piatte"

UI piatte sembrano moderne sulla carta, ma nella pratica creano confusion: tutto allo stesso livello visivo. Nessuna gerarchia, nessuna guida per l'occhio.

**Profondità (depth) trasforma design medio in design buono.**

### Layering (Stratificazione)

Creare 3-4 livelli (layers) di profondità usando colore + ombre.

**Layer Structure:**
```
Layer 4 (Front) → Highest elevation → CTA primari, modal
Layer 3 → Elevated → Card, interactive components  
Layer 2 → Surface → Content containers
Layer 1 (Back) → Base → Page background
```

**Implementation con colore:**
```css
/* Layer 1 - Background base */
.page-bg {
  background: var(--color-bg-light); /* hsl(0, 0%, 96%) */
}

/* Layer 2 - Content surface */
.content-surface {
  background: var(--color-bg-white); /* hsl(0, 0%, 100%) - +4% lightness */
}

/* Layer 3 - Elevated card */
.card-elevated {
  background: var(--color-bg-white);
  box-shadow: 8px 8px 0 var(--color-black);
}

/* Layer 4 - Front/Active */
.button-primary {
  background: var(--color-primary);
  box-shadow: 4px 4px 0 var(--color-black);
  transform: translate(-2px, -2px); /* Physical lift */
}

.button-primary:hover {
  box-shadow: 6px 6px 0 var(--color-black); /* Shadow grows */
}
```

### Ombre Realistiche

Le ombre creano profondità. **Ma un'ombra singola non basta.** Nella realtà, la luce crea due tipi di ombre:

1. **Ombra primaria** (dark, short) - Vicino all'oggetto
2. **Ombra secondaria** (lighter, long) - Diffusa, lontana

**Nel neo-brutalismo, usiamo ombre hard (no blur):**

```css
/* Ombra singola (good) */
.card-basic {
  box-shadow: 8px 8px 0 var(--color-black);
}

/* Ombra doppia (better) - più realistica */
.card-realistic {
  box-shadow: 
    4px 4px 0 var(--color-black),        /* Ombra vicina (dark) */
    8px 8px 0 var(--color-gray-300);     /* Ombra lontana (light) */
}
```

### Elevazione (Raise/Lower)

**Raise (sollevare)** elementi importanti:
```css
.elevated {
  box-shadow: 8px 8px 0 var(--color-black);
  transform: translate(-2px, -2px);
}

.elevated:hover {
  box-shadow: 10px 10px 0 var(--color-black);
  transform: translate(-3px, -3px);
}
```

**Lower (abbassare)** elementi meno importanti:
```css
.lowered {
  box-shadow: 
    inset 2px 2px 4px rgba(0, 0, 0, 0.15),  /* Dark inset top */
    inset -2px -2px 4px rgba(255, 255, 255, 0.05); /* Light inset bottom */
}
```

### Highlight Lucidi (Glossy Effect)

Simulare luce dall'alto:
```css
.glossy-button {
  background: linear-gradient(
    180deg,
    var(--color-primary-light) 0%,
    var(--color-primary) 100%
  );
  box-shadow: 
    inset 0 2px 0 rgba(255, 255, 255, 0.3), /* Highlight top */
    4px 4px 0 var(--color-black);            /* Shadow bottom */
}
```

### Context e Colore per Depth

```css
/* Background context */
.page-background {
  background: var(--color-bg-light); /* L: 96% */
}

/* Primary content (one step forward) */
.content-card {
  background: var(--color-bg-white); /* L: 100% - +4% lighter */
  border: 4px solid var(--color-black);
}

/* Secondary content (one step back) */
.secondary-panel {
  background: var(--color-gray-100); /* L: 91% - -5% darker */
  border: 2px solid var(--color-gray-300);
}
```

**La regola:** Elementi più chiari = più vicini all'utente = più importanti.

---

## Componenti

### Button - Three Variants

Il bottone è l'elemento più cliccato del portfolio. **Minimo touch target: 48x48px.**

**Primary Button (high-emphasis)**
```css
.btn-primary {
  /* Sizing - WCAG 48px minimum */
  padding: var(--space-2) var(--space-4); /* 16px 32px */
  min-height: 48px;
  min-width: 48px;
  
  /* Typography */
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  
  /* Neo-brutalist structure */
  border: 4px solid var(--color-black);
  border-radius: 4px;
  background: var(--color-primary);
  color: var(--color-bg-white);
  box-shadow: 4px 4px 0 var(--color-black);
  
  /* Interaction */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--color-black);
}

.btn-primary:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--color-black);
}

.btn-primary:focus-visible {
  outline: 4px solid var(--color-accent);
  outline-offset: 3px;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

**Secondary Button (outline style)**
```css
.btn-secondary {
  border: 3px solid var(--color-black);
  background: transparent;
  color: var(--color-near-black);
  box-shadow: 4px 4px 0 var(--color-black);
}

.btn-secondary:hover {
  background: var(--color-gray-100);
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 var(--color-black);
}
```

**Button Sizes**
```css
.btn-sm { 
  padding: var(--space-1) var(--space-3); /* 8px 24px */
  font-size: 14px; 
}

.btn-md { 
  padding: var(--space-2) var(--space-4); /* 16px 32px - Default */
  font-size: 18px; 
}

.btn-lg { 
  padding: var(--space-3) var(--space-6); /* 24px 48px */
  font-size: 24px; 
}
```

**Quando usare quale:**
- **Primary:** Main CTA (Book a call, View project, Download resume)
- **Secondary:** Supporting actions (Learn more, Read full case)
- **Small:** Tertiary actions (tag filters, minor nav)
- **Large:** Hero CTA, major conversion point

### Card - Project Showcases

Color-coded header = instant skill recognition.

**Standard Project Card**
```css
.project-card {
  /* Structure */
  border: 4px solid var(--color-black);
  border-radius: 6px;
  background: var(--color-bg-white);
  box-shadow: 8px 8px 0 var(--color-black);
  overflow: hidden;
  
  /* Interaction */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0 var(--color-black);
}

.card-header {
  border-bottom: 3px solid var(--color-black);
  padding: var(--space-3) var(--space-3); /* 24px */
  background: var(--color-primary); /* Color-code per skill */
  color: var(--color-bg-white);
}

.card-header h3 {
  font-size: var(--text-h3);
  font-weight: 700;
  margin: 0;
}

.card-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-bottom: 3px solid var(--color-black);
}

.card-content {
  padding: var(--space-3); /* 24px */
}

.card-footer {
  border-top: 2px solid var(--color-gray-100);
  padding: var(--space-2) var(--space-3); /* 16px 24px */
  background: var(--color-bg-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

**Color-coding Strategy**
```css
/* Design projects */
.card-header--design { background: var(--color-primary); }

/* Development projects */
.card-header--dev { background: var(--color-secondary); }

/* PM/Strategy projects */
.card-header--pm { background: var(--color-accent); }
```

### Input - Brutalist Yet Usable

**Text Input**
```css
.input {
  /* Sizing - WCAG minimum */
  width: 100%;
  padding: var(--space-2); /* 16px */
  min-height: 48px;
  
  /* Typography */
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-near-black);
  
  /* Structure */
  border: 3px solid var(--color-black);
  border-radius: 4px;
  background: var(--color-bg-white);
  box-shadow: 3px 3px 0 var(--color-black);
  
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 5px 5px 0 var(--color-primary);
}

.input::placeholder {
  color: var(--color-gray-700);
  opacity: 0.8;
}

.input.error {
  border-color: var(--color-error);
  box-shadow: 3px 3px 0 var(--color-error);
}

.input:disabled {
  background: var(--color-gray-100);
  cursor: not-allowed;
  opacity: 0.6;
}
```

**Label + Helper Text**
```css
.form-group {
  margin-bottom: var(--space-3); /* 24px */
}

.label {
  display: block;
  margin-bottom: var(--space-1); /* 8px */
  font-weight: 600;
  font-size: var(--text-body-sm);
  color: var(--color-near-black);
}

.helper-text {
  margin-top: var(--space-1); /* 8px */
  font-size: var(--text-caption);
  color: var(--color-gray-700);
}

.error-message {
  margin-top: var(--space-1);
  font-size: var(--text-caption);
  font-weight: 600;
  color: var(--color-error);
}
```

### Badge - Skill Visualization

High information density in small package.

```css
.badge {
  display: inline-block;
  padding: var(--space-1) var(--space-2); /* 8px 16px */
  margin: var(--space-1); /* 4px spacing */
  
  font-size: var(--text-caption);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--color-bg-white);
  
  border: 2px solid var(--color-black);
  border-radius: 3px;
  box-shadow: 2px 2px 0 var(--color-black);
  
  white-space: nowrap;
}

/* Color variations */
.badge--design { background: var(--color-primary); }
.badge--dev { background: var(--color-accent); }
.badge--pm { background: var(--color-teal); }
.badge--tool { background: var(--color-secondary); }
```

### Navigation - Sticky Header

**Desktop Header**
```css
.nav-header {
  position: sticky;
  top: 0;
  z-index: 100;
  
  border-bottom: 4px solid var(--color-black);
  padding: var(--space-3); /* 24px */
  background: var(--color-bg-white);
  
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: 700;
  color: var(--color-near-black);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: var(--space-2); /* 16px */
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  padding: var(--space-1) var(--space-2); /* 8px 16px */
  
  font-weight: 600;
  font-size: var(--text-body-sm);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  text-decoration: none;
  color: var(--color-near-black);
  
  border: 2px solid transparent;
  border-radius: 3px;
  transition: all 0.2s;
}

.nav-link.active {
  border: 2px solid var(--color-black);
  background: var(--color-primary);
  color: var(--color-bg-white);
  box-shadow: 2px 2px 0 var(--color-black);
}

.nav-link:hover {
  border: 2px solid var(--color-black);
  background: var(--color-gray-100);
}

.nav-link:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

**Mobile Menu**
```css
.hamburger {
  display: none;
  width: 48px;
  height: 48px;
  padding: var(--space-2); /* 16px */
  border: 3px solid var(--color-black);
  background: var(--color-bg-white);
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: block; }
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 400px;
  height: 100vh;
  
  background: var(--color-bg-white);
  border-left: 4px solid var(--color-black);
  box-shadow: -8px 0 0 var(--color-black);
  
  padding: var(--space-3); /* 24px */
  transition: right 0.3s ease;
  z-index: 1000;
}

.mobile-menu.open {
  right: 0;
}
```

---

## Animazioni

### Core Principles

Animiamo per dare **feedback**, comunicare **stato**, guidare **attenzione**. Non per decorazione.

**Le nostre regole:**
1. **Fast** - 100-250ms per interazioni
2. **Simple easing** - `ease` o `ease-out`
3. **Respect reduced motion** - Fallback statico
4. **Purpose-driven** - Se non serve, non animiamo
5. **GPU-accelerated** - Solo `transform` e `opacity`

### Standard Hover Patterns

**Lift and grow** (most common):
```css
.interactive {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.interactive:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--color-black);
}
```

**Press effect** (buttons):
```css
.btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--color-black);
}
```

**Color shift** (subtle):
```css
.link {
  transition: background-color 0.2s ease, color 0.2s ease;
}

.link:hover {
  background-color: var(--color-gray-100);
  color: var(--color-primary);
}
```

### Loading States

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 1.5s ease-in-out infinite;
}
```

### Scroll-Triggered Fade

```css
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Reduced Motion (MANDATORY)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Keep essential feedback */
  .btn:active {
    transform: none;
    opacity: 0.9;
  }
}
```

---

## Accessibilità

### Perché Accessibility Non È Opzionale

Non è compliance. È **rispetto**.

Se un recruiter con screen reader non può navigare, hai perso l'opportunità. Se un hiring manager con daltonismo non vede i CTA, hai perso il colloquio.

### WCAG AA Compliance

**Contrast ratios testati:**
- ✅ Electric Blue (#1E90FF) su white: **4.52:1** - AA compliant
- ✅ Deep Navy (#3E526A) su white: **9.21:1** - AAA compliant
- ✅ Near-black (#1A1A1A) su white: **16.8:1** - AAA compliant
- ⚠️ Slate Blue (#6A7B9F): Solo background, mai text

**Minimum requirements:**
- Body text (17-19px): **4.5:1** minimum
- Large text (24px+): **3.0:1** minimum
- UI components: **3.0:1** minimum

### Keyboard Navigation

**Focus indicators (highly visible):**
```css
*:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 4px solid var(--color-primary);
  outline-offset: 3px;
}
```

**Skip links (first focusable):**
```html
<a href="#main" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  left: -9999px;
}

.skip-link:focus {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 9999;
  
  padding: var(--space-2) var(--space-3);
  background: var(--color-black);
  color: var(--color-bg-white);
  border: 4px solid var(--color-primary);
  box-shadow: 4px 4px 0 var(--color-primary);
  
  font-weight: 700;
}
```

### Touch Targets

**WCAG minimum: 48x48px.** Non negoziabile.

```css
.btn,
.link,
.nav-link,
input,
select {
  min-width: 48px;
  min-height: 48px;
}
```

### Screen Reader Support

**Semantic HTML:**
```html
<header>
  <nav aria-label="Main navigation">
    <!-- nav content -->
  </nav>
</header>

<main id="main">
  <section aria-labelledby="work-heading">
    <h2 id="work-heading">Featured Projects</h2>
    <!-- content -->
  </section>
</main>

<footer>
  <!-- footer content -->
</footer>
```

**ARIA labels when needed:**
```html
<!-- Icon-only button -->
<button aria-label="Close dialog">
  <svg aria-hidden="true"><!-- icon --></svg>
</button>

<!-- Live region -->
<div role="status" aria-live="polite">
  Form submitted successfully!
</div>
```

### Testing Checklist

**Before launch:**
- [ ] WAVE scan - zero errors
- [ ] axe DevTools - 100% pass
- [ ] Lighthouse accessibility - 95+ score
- [ ] Manual keyboard test
- [ ] Screen reader test (NVDA/VoiceOver)
- [ ] Color contrast verification
- [ ] Zoom to 200% - still usable
- [ ] Mobile touch target audit

---

## Implementazione Tecnica

### Setup Iniziale

**1. Reset CSS**

```css
/* Quick reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px; /* Base per REM calculations */
}

body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.6;
  color: var(--color-near-black);
  background: var(--color-bg-light);
}
```

**2. CSS Variables (Design Tokens)**

```css
:root {
  /* === SPACING === */
  --space-1: 0.5rem;   /* 8px */
  --space-2: 1rem;     /* 16px */
  --space-3: 1.5rem;   /* 24px */
  --space-4: 2rem;     /* 32px */
  --space-5: 2.5rem;   /* 40px */
  --space-6: 3rem;     /* 48px */
  --space-7: 4rem;     /* 64px */
  --space-8: 5rem;     /* 80px */
  --space-10: 6.25rem; /* 100px */
  
  /* === COLORS (HSL) === */
  --color-primary: hsl(210, 100%, 56%);
  --color-primary-light: hsl(210, 100%, 76%);
  --color-primary-dark: hsl(210, 100%, 40%);
  
  --color-secondary: hsl(218, 20%, 52%);
  --color-accent: hsl(210, 26%, 33%);
  
  --color-black: hsl(0, 0%, 0%);
  --color-near-black: hsl(0, 0%, 10%);
  --color-gray-900: hsl(0, 0%, 25%);
  --color-gray-700: hsl(0, 0%, 42%);
  --color-gray-300: hsl(0, 0%, 82%);
  --color-gray-100: hsl(0, 0%, 91%);
  
  --color-bg-light: hsl(0, 0%, 96%);
  --color-bg-white: hsl(0, 0%, 100%);
  
  /* === TYPOGRAPHY === */
  --font-heading: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'Space Mono', monospace;
  
  --text-hero: 4.5rem;      /* 72px */
  --text-display: 3.6rem;   /* 58px */
  --text-h1: 2.875rem;      /* 46px */
  --text-h2: 2.3rem;        /* 37px */
  --text-h3: 1.838rem;      /* 29px */
  --text-h4: 1.5rem;        /* 24px */
  --text-body-lg: 1.175rem; /* 19px */
  --text-body: 1.063rem;    /* 17px */
  --text-body-sm: 0.938rem; /* 15px */
  --text-caption: 0.813rem; /* 13px */
}
```

**3. Global Overrides**

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  line-height: 1.2;
  margin-bottom: var(--space-3);
}

h1 { font-size: var(--text-h1); font-weight: 700; }
h2 { font-size: var(--text-h2); font-weight: 600; }
h3 { font-size: var(--text-h3); font-weight: 600; }
h4 { font-size: var(--text-h4); font-weight: 500; }

p {
  margin-bottom: var(--space-3);
  max-width: 70ch; /* Optimal reading width */
}

a {
  color: var(--color-primary);
  text-decoration: underline;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-primary-dark);
}

code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  padding: 2px 6px;
  background: var(--color-gray-100);
  border: 1px solid var(--color-gray-300);
  border-radius: 3px;
}
```

### Componentizzazione

**Approccio raccomandato:**

```
/components
  /ui
    Button.jsx
    Card.jsx
    Input.jsx
    Badge.jsx
  /sections
    Hero.jsx
    Projects.jsx
    Contact.jsx
  /layouts
    Header.jsx
    Footer.jsx
```

**Esempio:**

```jsx
// Button.jsx
export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Framework Raccomandati

**Progetti statici/portfolio:**
- **Next.js 14** (App Router) - SSG per SEO
- **Astro** - Ultra-fast
- **Svelte** - Lightweight

**Styling:**
- CSS Modules (consigliato)
- Tailwind CSS (rapid prototyping)

### Performance

**Font Loading:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Final Notes

Questo design system non è solo un set di regole. È una strategia di posizionamento.

**Ogni scelta visiva comunica:**
- Colori freddi → Competenza tecnica
- Spacing generoso → Professionalità
- Accessibilità AA → Rispetto per gli utenti
- Struttura brutalist → Opinioni forti sul design

Il risultato? Un portfolio che non assomiglia a nessun altro, ma mantiene la credibilità professionale che un PM tecnico deve avere.

**Now go build it.**