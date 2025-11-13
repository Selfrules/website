# [DS-003] Aggiornare CLAUDE.md con Linee Guida Design System

## Metadata
- **Story ID**: DS-003
- **Epic**: [EPIC-001 - Design System](./../epic.md)
- **Priorità**: 🔴 Critica
- **Dimensione**: 🟢 S (2-4h)
- **Execution Environment**: 🌐 **Claude Code Web**
- **Stato**: ✅ Done
- **Assegnata a**: Claude Code
- **Data Creazione**: 2025-11-13
- **Data Completamento**: 2025-11-13

---

## User Story

**Come** Claude Code
**Voglio** istruzioni esplicite e non ambigue su quale design system usare in CLAUDE.md
**Così che** ogni volta che sviluppo nuove funzionalità uso sempre il design system custom

---

## Descrizione Dettagliata

### Contesto
Attualmente `CLAUDE.md` contiene alcune linee guida sul design system neobrutalist, ma:
- Non è abbastanza esplicito che il design system custom ha PRIORITÀ su Tailwind vanilla
- Non c'è un chiaro riferimento a dove trovare componenti e utility da usare
- Mancano esempi concreti di cosa fare/non fare

### Obiettivo Specifico
Aggiornare `CLAUDE.md` con una sezione dedicata e dettagliata che:
- Stabilisce chiaramente la priorità del design system custom
- Fornisce riferimenti espliciti ai design tokens (DS-001)
- Include esempi DO/DON'T
- Linkare alla pagina design-system per riferimenti visivi

---

## Criteri di Accettazione

- [ ] **AC1**: Esiste una sezione "Design System Priority" in CLAUDE.md
  - Scenario: Claude Code legge CLAUDE.md prima di sviluppare
  - Risultato atteso: Capisce immediatamente di usare il design system custom

- [ ] **AC2**: Tutti i design tokens sono documentati con esempi
  - Scenario: Claude Code deve usare un colore
  - Risultato atteso: Sa usare `bg-electric-blue` invece di `bg-[#0D7EFF]`

- [ ] **AC3**: Esistono esempi DO/DON'T per pattern comuni
  - Scenario: Claude Code deve creare un button
  - Risultato atteso: Segue l'esempio DO che usa componenti/utility custom

- [ ] **AC4**: Link diretti ai componenti riusabili
  - Scenario: Claude Code deve creare una card
  - Risultato atteso: Trova il link a `/components/ui/Card.tsx` e lo riusa

- [ ] **AC5**: Istruzioni per consultare pagina design-system
  - Scenario: Claude Code ha dubbi su come stilizzare qualcosa
  - Risultato atteso: Sa che può consultare `/design-system` per esempi visivi

---

## Test Plan

### Test da Creare PRE-Sviluppo

Nessun test automatico richiesto - questa è documentazione.

### Checklist di Verifica
- [ ] Leggere CLAUDE.md aggiornato come Claude Code
- [ ] Verificare che ogni sezione sia chiara e non ambigua
- [ ] Chiedere feedback ad altri developer (se possibile)
- [ ] Verificare link interni funzionanti
- [ ] Spell check e grammar check
- [ ] Formattazione markdown corretta

---

## Linee Guida Tecniche

### Struttura da Aggiungere a CLAUDE.md

Aggiungere questa sezione dopo "Brand Identity & Content Guidelines":

```markdown
## Design System Usage (PRIORITÀ MASSIMA)

### Regola d'Oro
**SEMPRE** utilizzare il design system custom. **MAI** utilizzare utility Tailwind vanilla quando esiste un'alternativa custom.

### Design Tokens Reference

Tutti i design tokens sono definiti in `tailwind.config.ts`. Utilizzare SEMPRE questi invece di valori hard-coded.

#### Colori

**Palette Principale (Badge e Progetti)**
| Uso | Utility Class | Hex | Text Color | Quando Usare |
|-----|---------------|-----|------------|--------------|
| Electric Blue | `bg-electric-blue` `text-electric-blue` | #0D7EFF | white | Design/UX projects, design badges |
| Teal | `bg-teal` `text-teal` | #2A687A | white | Development projects, dev badges |
| Deep Purple | `bg-deep-purple` `text-deep-purple` | #7209B7 | white | PM/Strategy projects, strategy badges |
| Cyber Yellow | `bg-cyber-yellow` `text-cyber-yellow` | #FFD60A | black (#0A0A0A) | ⭐ Featured/Special projects |
| Neon Pink | `bg-neon-pink` `text-neon-pink` | #FF006E | white | Analytics/Tools projects |

**Colori Strutturali**
| Uso | Utility Class | Hex | Quando Usare |
|-----|---------------|-----|--------------|
| Borders | `border-black` | #000000 | Bordi brutalist standard |
| Card Borders | `border-white` | #FFFFFF | Bordi card su sfondo scuro |
| Card Background | `bg-cream` | #FFFCF2 | Sfondo card light mode |

#### Borders
| Utility | Width | Quando Usare |
|---------|-------|--------------|
| `border-brutal` | 4px | Standard borders |
| `border-brutal-thick` | 6px | Emphasis borders |
| `border-brutal-thin` | 3px | Subtle borders |

#### Shadows
| Utility | Offset | Quando Usare |
|---------|--------|--------------|
| `shadow-brutal` | 8px | Standard elements |
| `shadow-brutal-hover` | 12px | Hover states |
| `shadow-brutal-sm` | 4px | Small elements |
| `shadow-brutal-lg` | 16px | Hero elements |

#### Border Radius
| Utility | Radius | Quando Usare |
|---------|--------|--------------|
| `rounded-brutal` | 6px | Standard |
| `rounded-brutal-lg` | 8px | Large elements |

#### Spacing (8pt Grid)
| Utility | Value | Quando Usare |
|---------|-------|--------------|
| `p-brutal-xs` / `m-brutal-xs` | 8px | Tight spacing |
| `p-brutal-sm` / `m-brutal-sm` | 16px | Small spacing |
| `p-brutal-md` / `m-brutal-md` | 24px | Medium spacing |
| `p-brutal-lg` / `m-brutal-lg` | 32px | Large spacing |
| `p-brutal-xl` / `m-brutal-xl` | 48px | Extra large spacing |

### Componenti Riusabili

**SEMPRE** riutilizzare componenti esistenti da `/components/ui/` prima di crearne di nuovi.

| Componente | Path | Quando Usare |
|------------|------|--------------|
| Button | `/components/ui/Button.tsx` | Tutti i bottoni, CTAs |
| Card | `/components/ui/Card.tsx` | Contenitori di contenuto, project cards |
| Badge | `/components/ui/Badge.tsx` | Tag, labels, categorie |

Per riferimenti visivi completi, consultare: `/app/[locale]/design-system/page.tsx`

### Pattern DO/DON'T

#### ✅ DO: Usa Design System Custom
```tsx
// Button con design system
<Button variant="primary" size="lg">
  Click me
</Button>

// Badge con colori corretti
<Badge variant="design">Design/UX</Badge>  // Electric Blue
<Badge variant="dev">Development</Badge>   // Teal
<Badge variant="pm">PM/Strategy</Badge>    // Deep Purple
<Badge variant="featured">Featured</Badge> // Cyber Yellow

// Card con utility custom
<div className="border-brutal shadow-brutal rounded-brutal bg-cream p-brutal-md">
  Content
</div>
```

#### ❌ DON'T: Usa Tailwind Vanilla
```tsx
// SBAGLIATO: Valori hard-coded
<button className="bg-[#0D7EFF] px-6 py-3 rounded-lg shadow-lg">
  Click me
</button>

// SBAGLIATO: Utility vanilla quando esiste alternativa custom
<div className="border-4 shadow-xl rounded-lg bg-white p-6">
  Content
</div>

// SBAGLIATO: Colori vecchi
<Badge className="bg-[#1E90FF]">Design</Badge>  // Vecchio Electric Blue
<Badge className="bg-slate-blue">Dev</Badge>    // Non esiste più
```

### Checklist per Nuovi Componenti

Quando crei un nuovo componente UI:
- [ ] Usa design tokens da `tailwind.config.ts`
- [ ] Applica utility brutalist (`border-brutal`, `shadow-brutal`, `rounded-brutal`)
- [ ] Rispetta 8pt grid per spacing
- [ ] Implementa tutte le varianti colore (electric-blue, teal, deep-purple, cyber-yellow, neon-pink)
- [ ] Aggiungi JSDoc con `@component` e `@category` per auto-catalogazione
- [ ] Testa dark mode
- [ ] Verifica contrasto WCAG AA
- [ ] Aggiungi animazioni Framer Motion se appropriato

### Riferimento Rapido

- **Design Tokens**: `tailwind.config.ts`
- **Componenti UI**: `/components/ui/`
- **Pagina Design System**: `/app/[locale]/design-system/page.tsx`
- **Esempi Pattern**: Vedi sezione "Neobrutalist Component Pattern" sopra
```

---

## Implementazione Guidata

### Step 1: Preparazione
- [ ] Leggere CLAUDE.md esistente
- [ ] Leggere DS-001 per conoscere tutti i design tokens
- [ ] Identificare dove inserire la nuova sezione
- [ ] Creare branch: `claude/ds-003-claude-guidelines`

### Step 2: Sviluppo
- [ ] Aggiungere nuova sezione "Design System Usage"
- [ ] Creare tabelle con design tokens
- [ ] Aggiungere esempi DO/DON'T
- [ ] Aggiungere checklist per nuovi componenti
- [ ] Aggiungere riferimenti quick

### Step 3: Review
- [ ] Rileggere come se fossi Claude Code che deve sviluppare
- [ ] Verificare che ogni istruzione sia chiara
- [ ] Verificare link interni
- [ ] Spell check

### Step 4: Commit
- [ ] Commit: "docs(design-system): add explicit design system guidelines to CLAUDE.md"
- [ ] Push

---

## Dipendenze

### Dipendenze da Altre Stories
- [ ] DS-001: Design tokens devono essere implementati prima

---

## Risorse e Riferimenti

### Documentazione
- CLAUDE.md esistente: `/CLAUDE.md`
- Design system page: `/app/[locale]/design-system/page.tsx`

### Esempi
- [GitHub Docs Style Guide](https://docs.github.com/en/contributing/style-guide-and-content-model)
- [Anthropic Claude Docs](https://docs.anthropic.com/)

---

## Note per Claude Code

### Attenzione Speciale A:
- Essere MOLTO esplicito - no ambiguità
- Usare tabelle per facilità di consultazione rapida
- Includere esempi concreti DO/DON'T
- Link a file specifici con path assoluti dal root

### Files da Modificare:
- `/CLAUDE.md` - Aggiungere sezione "Design System Usage"

### Posizionamento Sezione:
Inserire la nuova sezione **dopo** "Brand Identity & Content Guidelines" e **prima** di "API Integrations"

---

## Definition of Done

- [ ] Sezione "Design System Usage" aggiunta a CLAUDE.md
- [ ] Tutte le tabelle con design tokens incluse
- [ ] Esempi DO/DON'T chiari e completi
- [ ] Checklist per nuovi componenti presente
- [ ] Link interni verificati e funzionanti
- [ ] Markdown formattato correttamente
- [ ] Spell check completato
- [ ] Branch pushed

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-13 | Story creata | Todo |
| 2025-11-13 | Aggiornata mappatura colori: Electric Blue #0D7EFF, Teal #2A687A, Deep Purple #7209B7, Cyber Yellow #FFD60A, Neon Pink #FF006E | Todo |
