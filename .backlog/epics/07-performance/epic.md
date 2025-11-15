# [EPIC-007] Production Performance Optimization

## Metadata
- **Epic ID**: EPIC-007
- **Priorità**: 🔴 Alta
- **Stato**: 📋 Not Started
- **Execution Environment**: 🌐 Claude Code Web
- **Stima Totale**: M (1-2 settimane)
- **Data Creazione**: 2025-11-15
- **Ultima Modifica**: 2025-11-15

## Contesto e Problema

### Problema Corrente
Il sito presenta diverse issue critiche di performance che impatterebbero significativamente lo **score Lighthouse** in produzione:
- Font caricati più volte tramite metodi render-blocking
- Bundle JavaScript eccessivamente grande (~2-3MB) senza code splitting
- Immagini non ottimizzate (manca AVIF, priority flags)
- Componenti duplicati (ChatTrigger caricato 2 volte)
- Mancanza di ISR/caching strategy
- Core Web Vitals sub-ottimali (LCP, CLS, INP)

### Impatto
- **Utenti**:
  - Tempi di caricamento lenti (FCP >2s, LCP >2.5s)
  - Esperienza mobile degradata
  - Consumo dati eccessivo
- **Business**:
  - Lighthouse score stimato: **60-70/100** (attuale)
  - SEO penalizzato da Core Web Vitals scadenti
  - Bounce rate elevato su connessioni lente
  - Conversion rate ridotta del 20-30% per ogni secondo extra
- **Tecnico**:
  - Deploy lento (bundle size eccessivo)
  - Costi infrastruttura più alti (bandwidth, compute)
  - Difficoltà debugging performance issues

## Obiettivo

### Risultato Atteso
Portare il sito a **Lighthouse score 90-95+** con tutti i Core Web Vitals in zona verde:
- **Performance**: 90+ (da ~65)
- **Accessibility**: 95+ (già buono)
- **Best Practices**: 95+ (già buono)
- **SEO**: 100 (già buono)

### Metriche di Successo
- [x] **LCP** (Largest Contentful Paint): <2.5s (target: <2s)
- [x] **FID/INP** (Interaction to Next Paint): <200ms (target: <100ms)
- [x] **CLS** (Cumulative Layout Shift): <0.1 (target: <0.05)
- [x] **FCP** (First Contentful Paint): <1.8s (target: <1.5s)
- [x] **TTI** (Time to Interactive): <3.8s (target: <3s)
- [x] **Bundle Size**: Riduzione del 40-50% (da ~2.5MB a ~1.2-1.5MB)
- [x] **Image Optimization**: 100% immagini con format moderni (AVIF/WebP)
- [x] **Font Loading**: Zero render-blocking fonts

## User Stories

### Critical Path (Week 1)
- [ ] [PF-001](./stories/PF-001-font-loading-optimization.md) Fix Font Loading & Render Blocking (🔴 S)
- [ ] [PF-002](./stories/PF-002-bundle-code-splitting.md) Bundle Size Reduction & Dynamic Imports (🔴 L)
- [ ] [PF-004](./stories/PF-004-component-deduplication.md) Remove Component Duplication (🔴 S)

### High Priority (Week 1-2)
- [ ] [PF-003](./stories/PF-003-image-optimization.md) Image Optimization & AVIF Support (🟠 M)
- [ ] [PF-006](./stories/PF-006-core-web-vitals.md) Core Web Vitals Improvements (🟠 L)
- [ ] [PF-007](./stories/PF-007-isr-caching.md) ISR & Caching Strategy (🟠 M)

### Medium Priority (Week 2)
- [ ] [PF-005](./stories/PF-005-api-optimization.md) API & Data Fetching Optimization (🟡 M)
- [ ] [PF-008](./stories/PF-008-nextjs-config.md) Next.js Build Configuration (🟡 S)

## Dipendenze

### Dipendenze Tecniche
- [ ] Next.js 14 (già installato)
- [ ] Sharp (image optimization - già installato)
- [ ] Lighthouse CI (da configurare in GitHub Actions)
- [ ] Bundle Analyzer (da installare: `@next/bundle-analyzer`)

### Dipendenze da Altre Epiche
Nessuna dipendenza bloccante. Questa epica può essere eseguita in parallelo con altre.

**Note**:
- EPIC-001 (Design System) beneficerebbe da queste ottimizzazioni
- EPIC-004 (Chatbot) dipende da PF-002 per code splitting

## Vincoli e Considerazioni

### Vincoli Tecnici
- Mantenere compatibilità con tutti i browser supportati (Chrome, Firefox, Safari, Edge)
- Non introdurre breaking changes nelle API esistenti
- Preservare tutte le funzionalità esistenti (no regressions)
- Garantire accessibilità WCAG AA (no degradation)

### Vincoli di Business
- Deployment graduale (feature flags per rollback rapido)
- Monitoraggio Real User Metrics (RUM) post-deploy
- Budget Vercel/hosting da considerare (bandwidth, compute)

### Best Practices
- Lighthouse CI in PR checks (block merge se score <85)
- Performance budgets:
  - JavaScript: <500KB (gzipped)
  - CSS: <100KB (gzipped)
  - Images: <1MB total per page
  - Fonts: <100KB total

## Ordine di Esecuzione Raccomandato

### Phase 1: Quick Wins (Giorno 1-2)
**Target**: +15-20 punti Lighthouse
1. **PF-001**: Font Loading (2-3h) → +5-8 punti
2. **PF-004**: Component Deduplication (1-2h) → +3-5 punti
3. **PF-008**: Next.js Config (1-2h) → +2-4 punti

### Phase 2: Bundle Optimization (Giorno 3-5)
**Target**: +10-15 punti Lighthouse
4. **PF-002**: Bundle & Code Splitting (1.5-2 giorni) → +8-12 punti
5. **PF-003**: Image Optimization (0.5-1 giorno) → +3-5 punti

### Phase 3: Advanced Optimization (Giorno 6-10)
**Target**: +5-10 punti Lighthouse
6. **PF-006**: Core Web Vitals (2-3 giorni) → +5-8 punti
7. **PF-007**: ISR & Caching (1-2 giorni) → +2-4 punti
8. **PF-005**: API Optimization (1 giorno) → +1-3 punti

**Totale stimato**: **+35-48 punti Lighthouse** (da 60-70 a 95-98)

## Note e Risorse

### Lighthouse Audits
Prima di iniziare, eseguire:
```bash
# Lighthouse report locale
npx lighthouse http://localhost:3000 --view

# Con CI/CD
npm install -g @lhci/cli
lhci autorun
```

### Performance Monitoring Tools
- **Lighthouse CI**: Automatic scoring in PRs
- **Vercel Analytics**: Real User Metrics
- **Chrome DevTools**: Performance tab, Coverage tab
- **Bundle Analyzer**: `npm run analyze` (da configurare)

### Reference Resources
- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Scoring Guide](https://web.dev/performance-scoring/)

### Lighthouse Score Breakdown (Estimated Current)
```
Performance: 65/100
  - First Contentful Paint: 2.1s
  - Largest Contentful Paint: 3.5s
  - Total Blocking Time: 450ms
  - Cumulative Layout Shift: 0.12
  - Speed Index: 3.2s

Opportunities:
  - Eliminate render-blocking resources: 890ms
  - Reduce unused JavaScript: 1.2MB
  - Properly size images: 150KB
  - Enable text compression: 200KB
  - Use modern image formats: 300KB
```

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-15 | Claude | Epic creata con analisi approfondita performance issues |
