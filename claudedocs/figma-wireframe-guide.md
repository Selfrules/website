# Guida Completa: Wireframe Figma per mattia_web

**Obiettivo**: Creare un wireframe completo del portfolio website di Mattia usando il design system neobrutalist

## 📋 Setup Iniziale Figma

### 1. Creazione del File
1. Crea nuovo file Figma → Nome: "Mattia Portfolio - Wireframe"
2. Crea 3 pages:
   - **"Design System"** (componenti riutilizzabili)
   - **"Desktop Wireframe"** (layout 1440px)
   - **"Mobile Wireframe"** (layout 375px)

### 2. Setup Grid System
**Desktop (1440px):**
- Frame: 1440 x auto
- Layout Grid: 12 colonne
- Gutter: 24px
- Margin: 80px (left/right)

**Mobile (375px):**
- Frame: 375 x auto
- Layout Grid: 4 colonne
- Gutter: 16px
- Margin: 20px (left/right)

---

## 🎨 Design System Setup (Page 1)

### Palette Colori
Crea un frame "Colors" con questi rettangoli:

**Primari:**
- `#FFD93D` - Primary (yellow) - 100x100px
- `#6C5CE7` - Secondary (purple) - 100x100px
- `#FF6B9D` - Accent (pink) - 100x100px

**Neon Accents:**
- `#00F5FF` - Neon Cyan - 100x100px
- `#FF2E97` - Neon Pink - 100x100px

**Neutrali:**
- `#FFFFFF` - White (light mode bg)
- `#0A0A0A` - Dark (dark mode bg)
- `#000000` - Black (borders)

### Tipografia
Crea frame "Typography" con text samples:

**Heading Font: Space Grotesk**
- Display 1: 72px / Bold / Line 1.1
- Display 2: 56px / Bold / Line 1.1
- H1: 48px / Bold / Line 1.2
- H2: 40px / Bold / Line 1.2
- H3: 32px / Bold / Line 1.2

**Body Font: Inter**
- Body Large: 20px / Regular / Line 1.6
- Body: 16px / Regular / Line 1.6
- Body Small: 14px / Regular / Line 1.5

**Mono Font: JetBrains Mono**
- Code: 14px / Regular / Line 1.5

### Stili Neobrutalist

**Frame "Brutal Elements" - Crea questi componenti:**

#### 1. Brutal Border
- Stroke: 4px solid #000000
- Applicare a tutti gli elementi interattivi

#### 2. Brutal Shadow
- Effect: Drop Shadow
- X: 8px, Y: 8px
- Blur: 0px
- Color: #000000
- NO gradual fade - hard shadow

#### 3. Border Radius
- Cards: 12px
- Buttons: 8px
- Avatars: 9999px (full circle)

#### 4. Component: Brutal Card
Rettangolo:
- Width: varia
- Height: varia
- Fill: #FFFFFF
- Border: 4px solid #000000
- Corner Radius: 12px
- Shadow: 8px 8px 0px #000000

#### 5. Component: Primary Button
Rettangolo + testo:
- Padding: 16px 32px
- Background: #FFD93D
- Border: 4px solid #000000
- Corner Radius: 8px
- Shadow: 8px 8px 0px #000000
- Text: 16px Bold, #000000
- Hover state: Shadow 4px 4px 0px #000000, translate -4px -4px

#### 6. Component: Secondary Button
Come primary ma:
- Background: #FFFFFF
- Border: 4px solid #000000
- Text: #000000

#### 7. Component: Badge
Rettangolo piccolo:
- Padding: 8px 16px
- Background: Primary/10% opacity
- Border: 4px solid Primary color
- Corner Radius: 8px
- Text: 12px Medium

---

## 📱 Sezioni del Sito - Wireframe Desktop

### Sezione 1: HERO (Full Screen - 100vh)

**Layout Structure:**
```
[Grid: 12 columns, 2 parti uguali (6 + 6)]

Left Column (6 cols):
├─ Badge "Product Manager" (inline, top)
├─ Main Headline (4 righe)
│  ├─ "Ho fallito come designer"
│  ├─ "e developer" (gradient)
│  ├─ "Ora costruisco prodotti che"
│  └─ "risolvono problemi reali" (underline giallo ondulato)
├─ Subtitle (2 righe, 20px, opacity 80%)
├─ Support text (16px, opacity 70%)
├─ CTA Buttons Row
│  ├─ Primary: "Prenota una call" (Calendar icon left)
│  └─ Secondary: "Esplora il portfolio"
└─ Stats Row (3 metriche)
   ├─ 78% (giallo) - "Load times ottimizzati"
   ├─ 5M+ (viola) - "Utenti impattati"
   └─ 12 (rosa) - "Prodotti spediti"

Right Column (6 cols):
└─ Visual Card Stack
   ├─ Main Card (rotated 3deg)
   │  ├─ Gradient border (yellow→purple→pink)
   │  ├─ White inner card
   │  ├─ 🚀 Emoji (60px)
   │  ├─ "Ship Fast" title
   │  └─ Description text
   ├─ Accent Card Top-Right (cyan, lightning ⚡)
   └─ Accent Card Bottom-Left (pink, bulb 💡)

Bottom Center:
└─ Scroll Indicator (mouse icon, primary color)
```

**Dimensioni Esatte:**
- Container max-width: 1280px
- Left content: width 580px
- Right visual: width 500px, height 600px
- Main card: 400x500px, rotate 3deg
- Accent cards: 128x128px (top), 112x112px (bottom)
- Badge height: 40px
- Headline: 56px font size
- Button height: 56px
- Stats: 48px numbers, 14px labels

**Background Elements:**
- Grid pattern diagonal (opacity 5%)
- Cross pattern overlay (opacity 8%, fades on scroll)
- Geometric shapes scattered (squares, circles, triangles con borders)

---

### Sezione 2: JOURNEY (Timeline Verticale)

**Layout Structure:**
```
[Full width container, centered content]

Header (centered):
├─ Badge "Career Evolution" (secondary color)
├─ Title "Dal fallimento al" + "successo" (gradient)
└─ Subtitle (20px, max-width 700px)

Timeline (vertical line al centro, alternating cards):
├─ Item 1 (RIGHT side) - Product Manager
│  ├─ Date badge (left of line)
│  ├─ Icon (Rocket, in circle con primary bg)
│  ├─ Card Content:
│  │  ├─ Role Title (24px bold)
│  │  ├─ Company (18px, secondary color)
│  │  ├─ Description (16px)
│  │  ├─ Metrics Box (primary bg/10%)
│  │  │  ├─ "78%" (32px bold)
│  │  │  └─ Impact text (14px)
│  │  ├─ Achievements (bullet list, 3 items)
│  │  └─ Tech Badges (inline, primary variant)
│  └─ Highlight state (glow effect, primary border)
├─ Item 2 (LEFT side) - Product Owner
│  └─ [Same structure, no highlight]
├─ Item 3 (RIGHT side) - Developer
│  └─ [Same structure]
└─ Item 4 (LEFT side) - Designer
   └─ [Same structure]

Skills Chart (below timeline):
└─ Radar Chart Component
   ├─ Title "Core Skills"
   ├─ Chart: 6 axes (PM, Dev, Design, Strategy, Data, Communication)
   ├─ Filled polygon (primary color, 20% opacity)
   └─ Border: primary color, 2px

Certifications Grid (3 columns):
└─ 6 Certification Cards
   ├─ Icon (top-left, colored circle)
   ├─ Title (18px bold)
   ├─ Tagline (14px, italic)
   ├─ Issuer (14px, secondary color)
   ├─ Date (12px, opacity 60%)
   └─ Brutal card style with hover effect

Bottom CTA:
└─ Centered card
   ├─ Title "Vuoi saperne di più?"
   ├─ Subtitle
   └─ Primary Button "Scarica CV"
```

**Dimensioni Esatte:**
- Timeline line: 4px width, primary color
- Timeline dots: 48px circles
- Card max-width: 600px
- Card padding: 32px
- Certification cards: 360px width, auto height
- Radar chart: 500x500px

---

### Sezione 3: WHAT I'M UP TO (Current Activities)

**Layout Structure:**
```
[Full width container, 2-column grid below 1-column]

Header (centered):
├─ Badge "What I'm Up To" (purple)
├─ Title "Cosa sto facendo ora"
└─ Description

Grid Layout (2 columns):
├─ Card 1: Current Work
│  ├─ Icon + Title Row
│  │  ├─ Briefcase icon (primary bg, 40x40px)
│  │  ├─ "Lavoro attuale" (20px bold)
│  │  └─ "Product Manager @ QubicaAMF" (14px, purple)
│  ├─ Achievement (18px bold)
│  │  └─ "Sto rendendo i pagamenti 12% più veloci"
│  └─ Detail text (16px, opacity 70%)
│     └─ "Ottimizzando checkout... 7 a 3 click"
└─ Card 2: Learning in Public
   ├─ Icon + Title Row
   │  ├─ BookOpen icon (purple bg)
   │  ├─ "Learning in public"
   │  └─ "Questa settimana" (14px, purple)
   ├─ Topic (18px bold)
   │  └─ "Come l'AI sta cambiando il mio workflow"
   └─ Description (16px, opacity 70%)

Full Width Card: Spotify Widget
└─ Card 3: Current Soundtrack
   ├─ Left: Icon + Title
   │  ├─ Music icon (green bg)
   │  ├─ "Soundtrack del momento"
   │  └─ Description
   └─ Right: Spotify Widget Component
      ├─ Album cover (120x120px)
      ├─ Song title (16px bold)
      ├─ Artist (14px, opacity 80%)
      ├─ Progress bar (green, 4px height)
      └─ Spotify logo + "Now Playing" badge
```

**Dimensioni Esatte:**
- Card padding: 32px
- Card gap: 32px
- Icon boxes: 40x40px
- Spotify widget: 400px width
- Card backgrounds: primary/5%, purple/5%, green/5%

---

### Sezione 4: BLOG (Latest Articles)

**Layout Structure:**
```
[Full width container]

Header (centered):
├─ Badge "Insights & Stories" (accent color)
├─ Title "Dal mio blog"
└─ Subtitle + "View All" link (right aligned)

Grid Layout (3 columns):
├─ Blog Card 1 (Featured - spans 2 cols)
│  ├─ Featured Image (800x400px, brutal border)
│  ├─ Category Badge (top-left overlay)
│  ├─ Content Area
│  │  ├─ Title (32px bold, 2 lines max)
│  │  ├─ Excerpt (16px, 3 lines max, opacity 70%)
│  │  ├─ Meta Row
│  │  │  ├─ Author avatar (32px circle)
│  │  │  ├─ Author name
│  │  │  ├─ Date
│  │  │  └─ Read time
│  │  └─ Tags (inline badges)
│  └─ Hover: Shadow effect, subtle lift
├─ Blog Card 2 (Normal - 1 col)
│  ├─ Image (400x240px)
│  ├─ Category Badge
│  └─ Content (same structure, smaller)
└─ Blog Card 3 (Normal - 1 col)
   └─ [Same as Card 2]

Row 2 (3 equal columns):
├─ Blog Card 4
├─ Blog Card 5
└─ Blog Card 6

Bottom CTA:
└─ Centered Button "Vedi tutti gli articoli" (secondary)
```

**Dimensioni Esatte:**
- Featured card: 2 cols width (832px), height auto
- Normal card: 1 col width (400px), height auto
- Image aspect ratio: 16:9
- Card padding: 24px
- Gap between cards: 32px
- Badge height: 28px
- Avatar: 32px circle

---

### Sezione 5: ASK ME ANYTHING (Chatbot CTA)

**Layout Structure:**
```
[Full width container, centered content]

Header (centered):
├─ Badge "AI-Powered" (primary)
├─ Title "Chiedimi qualsiasi cosa"
└─ Subtitle "Claude AI conosce il mio background"

Interactive Demo Card:
└─ Large Centered Card (800px width)
   ├─ Chat Interface Preview
   │  ├─ Message Bubble 1 (user, right)
   │  │  ├─ Avatar (right)
   │  │  ├─ Text: "Come gestisci i team remoti?"
   │  │  └─ Timestamp
   │  ├─ Message Bubble 2 (AI, left)
   │  │  ├─ AI Avatar (Mattia photo, left)
   │  │  ├─ Text: "Nel mio lavoro con team..."
   │  │  └─ Typing indicator
   │  └─ Suggested Questions (chips)
   │     ├─ "Product strategy?"
   │     ├─ "Tecnologie preferite?"
   │     └─ "Work together?"
   └─ CTA Button: "Inizia la conversazione"
      └─ Opens chat modal

Features Grid (3 columns below):
├─ Feature 1
│  ├─ Icon (Brain)
│  ├─ Title "AI contestuale"
│  └─ Description
├─ Feature 2
│  ├─ Icon (Clock)
│  ├─ Title "Risposte istantanee"
│  └─ Description
└─ Feature 3
   ├─ Icon (Shield)
   ├─ Title "Privacy-first"
   └─ Description
```

**Dimensioni Esatte:**
- Demo card: 800px width, 400px height
- Message bubbles: max-width 400px, padding 16px
- Avatar: 40px circle
- Suggested questions: height 36px, inline
- Feature cards: 260px width each

---

### Sezione 6: WORK TOGETHER (Contact & Booking)

**Layout Structure:**
```
[Full width, gradient background primary/5%]

Split Layout (2 columns):

Left Column (5 cols):
├─ Section Header
│  ├─ Badge "Let's Connect"
│  ├─ Title "Lavoriamo insieme"
│  └─ Subtitle (large, 24px)
├─ Value Propositions (3 items)
│  ├─ Item 1
│  │  ├─ Icon (Rocket, primary)
│  │  ├─ Title "Product Discovery"
│  │  └─ Description
│  ├─ Item 2
│  │  ├─ Icon (Code, secondary)
│  │  ├─ Title "Technical Leadership"
│  │  └─ Description
│  └─ Item 3
│     ├─ Icon (Users, accent)
│     ├─ Title "Team Coaching"
│     └─ Description
└─ Social Links Row
   ├─ LinkedIn (icon button)
   ├─ GitHub (icon button)
   ├─ Twitter (icon button)
   └─ Email (icon button)

Right Column (7 cols):
└─ Booking Card (elevated, white bg)
   ├─ Title "Prenota una call"
   ├─ Subtitle "30 min gratuiti per conoscerci"
   ├─ Calendar Interface Preview
   │  ├─ Month selector
   │  ├─ Week grid
   │  └─ Available slots (green highlights)
   ├─ Selected Slot Display
   │  ├─ Date badge
   │  ├─ Time badge
   │  └─ Timezone info
   └─ CTA Button: "Conferma appuntamento"
      └─ Google Calendar integration

Alternative CTA:
└─ "Preferisci scrivermi?" + Email link
```

**Dimensioni Esatte:**
- Left column width: 500px
- Right card width: 600px
- Calendar grid: 400px square
- Value prop icons: 56px circles
- Social icons: 48px squares
- Slot buttons: 80px width, 40px height

---

## 📱 Mobile Wireframe (375px)

### Principi Chiave Mobile-First:
1. **Stack verticalmente** - tutte le colonne diventano 100% width
2. **Ridimensiona testi** - headline da 56px → 36px
3. **Padding ridotto** - da 32px → 20px
4. **Touch targets** - min 44px height per bottoni
5. **Immagini responsive** - aspect ratio mantenuto

### Hero Mobile:
```
[Single Column]
├─ Badge (centered)
├─ Headline (36px, 4 righe stacked)
├─ Subtitle (18px, centered)
├─ CTA Buttons (stacked, full-width)
│  ├─ Primary (100% width, 52px height)
│  └─ Secondary (100% width, 52px height)
├─ Visual (centered, 300px width)
└─ Stats Row (3 columns, compact)
   └─ Each stat: 100px width
```

### Journey Mobile:
- Timeline diventa lista verticale
- Cards 100% width, padding 20px
- Alternating pattern rimosso (tutto centered)
- Certifications: 1 column grid

### Blog Mobile:
- Grid → 1 column
- Featured card: normal size
- All cards same structure
- 100% width, aspect ratio 16:9

### Work Together Mobile:
- Stack sections vertically
- Calendar full-width
- Value props stacked
- Social icons: centered row

---

## 🎯 Componenti Riutilizzabili da Creare

### 1. Brutal Card (Master Component)
Variants:
- Default
- Hover (shadow ridotto, translate)
- Primary (colored border)
- Secondary (colored background)

### 2. Button System (Master Component)
Variants:
- Primary (yellow bg, black text)
- Secondary (white bg, black border)
- Icon Left
- Icon Right
- Loading state

### 3. Badge (Master Component)
Sizes: sm, md, lg
Variants: primary, secondary, accent, outline

### 4. Timeline Item (Master Component)
States:
- Default
- Active (highlighted)
- Completed

### 5. Blog Card (Master Component)
Variants:
- Featured (large)
- Standard (small)
- Compact (list view)

### 6. Input Field (Master Component)
States: default, focus, error, disabled
Types: text, email, textarea

---

## ✅ Checklist Finale

### Design System:
- [ ] Tutti i colori definiti in Styles
- [ ] Typography styles creati
- [ ] Componenti brutal (card, button, badge) come components
- [ ] Spacing system (8px base)
- [ ] Shadow styles saved

### Desktop Wireframe:
- [ ] Hero section completa (100vh)
- [ ] Journey timeline con 4 items
- [ ] What I'm Up To (3 cards)
- [ ] Blog grid (6 cards)
- [ ] Ask Me Anything (chat preview)
- [ ] Work Together (booking + contact)
- [ ] Footer (social + links)
- [ ] Floating chat button (bottom-right, 60x60px)

### Mobile Wireframe:
- [ ] Tutte le sezioni adaptate
- [ ] Stack verticale applicato
- [ ] Touch targets corretti (min 44px)
- [ ] Text sizes ridimensionati

### Interazioni (Prototyping):
- [ ] Hero CTA → Work Together section
- [ ] Blog cards → Detail page placeholder
- [ ] Chat button → Ask Me Anything
- [ ] Timeline items → Expand on click
- [ ] Calendar slots → Booking form

### Annotazioni:
- [ ] Aggiungere note con specifiche tecniche
- [ ] Documentare spacing system
- [ ] Indicare stati hover/active
- [ ] Segnalare animations (Framer Motion)

---

## 📐 Misure di Riferimento Rapide

### Spacing Scale (8px base):
- 4px (0.5x)
- 8px (1x)
- 16px (2x)
- 24px (3x)
- 32px (4x)
- 48px (6x)
- 64px (8x)
- 80px (10x)

### Border Weights:
- Thin: 2px
- Default: 4px
- Thick: 6px

### Shadow Presets:
- Small: 4px 4px 0px #000
- Medium: 8px 8px 0px #000
- Large: 12px 12px 0px #000
- Hover: 4px 4px 0px #000 (reduced)

### Icon Sizes:
- Small: 16px
- Medium: 24px
- Large: 32px
- Extra Large: 48px

---

## 🚀 Tips Avanzati

### Auto Layout:
- Usa Auto Layout per tutti i componenti
- Spacing: 8px base, incrementi di 8
- Padding: consistent (16px, 24px, 32px)
- Direction: vertical per cards, horizontal per buttons

### Component Properties:
- Boolean: hasIcon, isActive, isLoading
- Variant: primary | secondary | accent
- Size: sm | md | lg

### Organization:
- Frame names: "Section/Component/State"
- Esempio: "Hero/CTA Button/Hover"
- Colors: prefix con "Color/"
- Typography: prefix con "Text/"

### Collaboration:
- Aggiungi comments sulle decisioni design
- Link to components da tutti i frames
- Creare component set per variants
- Version history: save milestones

---

## 📚 Risorse Aggiuntive

### Plugin Figma Consigliati:
1. **Iconify** - Per icons (Lucide icon set)
2. **Unsplash** - Per placeholder images
3. **Content Reel** - Per testi dummy realistici
4. **Stark** - Per accessibility check

### Assets da Preparare:
- Logo Mattia (se disponibile)
- Photo profilo (avatar, 400x400px)
- Screenshots progetti (blog images)
- Social icons (LinkedIn, GitHub, Twitter, Email)

---

**Fine della guida. Tempo stimato realizzazione: 4-6 ore**

**Note**: Questo wireframe è progettato per essere tradotto 1:1 in codice React/Next.js con Tailwind CSS mantenendo il design system neobrutalist esistente.
