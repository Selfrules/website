# [EPIC-010] Homepage & Footer Fixes

## Metadata
- **Epic ID**: EPIC-010
- **Priorità**: 🔴 Alta
- **Stato**: In Progress
- **Execution Environment**: 🌐 Claude Code Web
- **Stima Totale**: S (3-5 giorni)
- **Data Creazione**: 2025-11-15
- **Ultima Modifica**: 2025-11-15

## Contesto e Problema
<!-- Descrivi il problema attuale, il contesto di business e perché questa epica è importante -->

### Problema Corrente
Sono stati identificati vari bug e inconsistenze visive e di contenuto nelle sezioni Homepage (Hero, Journey, Blog) e Footer del sito. Questi problemi impattano la coerenza del design system, l'accuratezza delle informazioni professionali e l'esperienza utente complessiva.

**Problemi Specifici**:
1. **Hero Section**: Pulsante "come sono arrivato qui" ha sfondo neutro invece di bianco nello stato non-hover
2. **Journey Section**:
   - Informazioni linguistiche errate (menziona spagnolo, non parlato)
   - Numero progetti inconsistente (200+ non accurato)
   - Date employment Flowing errate (dovrebbe essere 2016-2020)
3. **Blog Section Homepage**:
   - Card "da non perdere" manca gradiente di sfondo
   - Card hanno bordo grigio invece di nero (violazione design system)
4. **Footer**:
   - Titoli "Navigazione" e "Risorse" hanno colore nero invece di giallo
   - Indicatore lingua "IT" testuale invece di emoji bandiera 🇮🇹
   - Branding "Mattia De Luca" invece di "MFDL"
5. **Blog Page**: Pulsante "← Home" ha sfondo trasparente invece di bianco

### Impatto
- **Utenti**: Informazioni professionali non accurate (lingue, progetti, date) creano confusione e riducono credibilità
- **Business**: Branding inconsistente ("Mattia De Luca" vs "MFDL") e informazioni errate danneggiano percezione professionale
- **Tecnico**: Violazioni design system (bordi grigi, colori errati) creano debito tecnico e inconsistenza UI

## Obiettivo
<!-- Cosa vogliamo ottenere con questa epica -->

### Risultato Atteso
Correggere tutte le inconsistenze visive e di contenuto nelle sezioni Homepage e Footer, garantendo:
1. Aderenza al design system neobrutalist (bordi neri, colori corretti)
2. Accuratezza informazioni professionali (lingue, progetti, date employment)
3. Coerenza branding (MFDL, emoji bandiera italiana)
4. UI/UX consistente tra homepage e pagina blog

### Metriche di Successo
- [ ] Tutti i componenti Card utilizzano bordi neri (border-brutal) come da design system
- [ ] Informazioni professionali accurate e verificate (lingue, progetti, date)
- [ ] Footer con branding MFDL e colori gialli per titoli sezioni
- [ ] Gradiente applicato a card "da non perdere" nel blog section
- [ ] Pulsanti con background consistente (bianco) in stati non-hover

## User Stories
<!-- Lista delle user stories che compongono questa epica -->

- [ ] **HF-001** Fix hero button background color (🟢 S) - [Link](./stories/HF-001-hero-button-background.md)
- [ ] **HF-002** Update languages in Journey section (🟢 S) - [Link](./stories/HF-002-journey-languages.md)
- [ ] **HF-003** Fix project count consistency (🟢 S) - [Link](./stories/HF-003-project-count.md)
- [ ] **HF-004** Update Flowing employment dates (🟢 S) - [Link](./stories/HF-004-flowing-dates.md)
- [ ] **HF-005** Add gradient to featured blog card (🟢 S) - [Link](./stories/HF-005-featured-blog-gradient.md)
- [ ] **HF-006** Fix Card borders globally (🟡 M) - [Link](./stories/HF-006-card-borders.md)
- [x] **HF-007** Footer navigation titles yellow color (🟢 S) - [Link](./stories/HF-007-footer-titles-yellow.md) ✅ Done (2025-11-15)
- [ ] **HF-008** Footer Italian flag emoji (🟢 S) - [Link](./stories/HF-008-footer-flag-emoji.md)
- [ ] **HF-009** Footer MFDL branding (🟢 S) - [Link](./stories/HF-009-footer-mfdl.md)

**Totale**: 9 stories (8 Small, 1 Medium)

## Dipendenze
<!-- Altre epiche o sistemi esterni da cui questa dipende -->

### Dipendenze Tecniche
- [ ] Design System: Necessita accesso a utility Tailwind custom (border-brutal, shadow-brutal)
- [ ] Design System: Necessita accesso a gradienti definiti in tailwind.config.ts
- [ ] i18n: Modifiche devono essere applicate sia a versione IT che EN

### Dipendenze da Altre Epiche
- [ ] **EPIC-001** Design System: Alcune fix (HF-006) impattano componenti core del design system

## Vincoli e Considerazioni
<!-- Limitazioni tecniche, di budget, di tempo, etc. -->

### Vincoli Tecnici
- Modifiche al componente Card (HF-006) devono essere retrocompatibili con tutte le sezioni che lo utilizzano
- Gradienti devono utilizzare palette definita in tailwind.config.ts (no colori hard-coded)
- Tutte le modifiche devono mantenere accessibilità WCAG AA

### Vincoli di Business
- Informazioni professionali (lingue, progetti, date) devono essere verificate con Mattia prima del deployment
- Branding "MFDL" deve essere applicato consistentemente in tutto il sito

## Note e Risorse
<!-- Link a documenti, mockup, riferimenti esterni -->

- **Design System Reference**: `/app/[locale]/design-system/page.tsx`
- **Design Tokens**: `/tailwind.config.ts`
- **Card Component**: `/components/ui/Card.tsx`
- **Footer Component**: Identificare durante implementazione
- **Hero Section**: `/app/[locale]/page.tsx` (HeroSection component)
- **Journey Section**: `/app/[locale]/page.tsx` (JourneySection component)
- **Blog Section Homepage**: `/app/[locale]/page.tsx` (BlogSection component)

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude Code | Epic creata con 9 user stories identificate |
