# [PF-009] Remove Legacy JavaScript Polyfills

## Metadata
- **Story ID**: PF-009
- **Epic**: [EPIC-008](../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟢 S (1-2h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data Completamento**: -

## User Story
**Come** utente mobile **Voglio** JavaScript bundle più leggero senza polyfills non necessari **Così che** la pagina si carichi più velocemente

## Problema Attuale (Lighthouse Confirmed)

### 🟠 Lighthouse Measurement
```
Legacy JavaScript: 11 KiB savings possible
File: 117-cb1ce7b62bfd23de.js (10.6 KiB)

Polyfills non necessari per browser moderni:
- Array.prototype.at
- Array.prototype.flat
- Array.prototype.flatMap
- Object.fromEntries
- Object.hasOwn
- String.prototype.trimEnd
- String.prototype.trimStart
```

**Problema**: Next.js sta transpilando codice moderno in ES5/ES6 legacy, aggiungendo polyfills per browser obsoleti che non supportiamo.

**Browser Support Attuale** (da .browserslistrc o package.json):
- Probabilmente include browser molto vecchi (es: IE 11, Chrome <90)

**Browser Support Target** (moderno):
- Chrome ≥90, Firefox ≥90, Safari ≥14, Edge ≥90
- Questi browser supportano TUTTE le feature moderne

### Impatto
- **Bundle size**: +11 KiB non necessari
- **Parse/Execute time**: +10-20ms per utente
- **Compatibilità**: Supportiamo browser che non usiamo più

## Criteri di Accettazione
- [ ] **AC1**: `.browserslistrc` aggiornato per target browser moderni
- [ ] **AC2**: SWC compiler configurato per non transpilare Baseline features
- [ ] **AC3**: Lighthouse non segnala più "Legacy JavaScript"
- [ ] **AC4**: Bundle chunk size ridotto di ~11 KiB
- [ ] **AC5**: Sito funziona su Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- [ ] **AC6**: No regressioni su browser supportati

## Implementazione Guidata

### Step 1: Verificare Browser Support Corrente

```bash
# Check se esiste .browserslistrc
cat .browserslistrc

# Se non esiste, controllare in package.json
cat package.json | grep -A5 "browserslist"
```

### Step 2: Creare/Aggiornare `.browserslistrc`

**File**: `.browserslistrc` (creare se non esiste)

```
# Modern browsers (Last 2 years)
> 0.5%
last 2 versions
Firefox ESR
not dead
not IE 11
not op_mini all

# Supporto specifico
Chrome >= 90
Firefox >= 90
Safari >= 14
Edge >= 90
```

**Questo target include ~95% utenti globali con supporto completo ES2021+**

### Step 3: Configurare Next.js SWC Compiler

**File**: `next.config.mjs`

Aggiungere configurazione compiler:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config ...

  // Compiler options
  compiler: {
    // Remove console.logs in production (optional)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Experimental: modern JS output
  experimental: {
    // Use modern JS output (ES2022) for browsers that support it
    browsersListForSwc: true,
    legacyBrowsers: false,
  },
}
```

**Note**:
- `browsersListForSwc: true` → SWC usa `.browserslistrc` per decidere target
- `legacyBrowsers: false` → Disabilita polyfills per browser obsoleti

### Step 4: Verificare TypeScript Target

**File**: `tsconfig.json`

Assicurarsi che `target` sia moderno:

```json
{
  "compilerOptions": {
    "target": "ES2022", // ✅ Modern (NOT ES5 or ES2015)
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    // ... altri settings
  }
}
```

**Cambio suggerito**:
- Se `target: "ES5"` o `"ES2015"` → cambia in `"ES2022"`
- Se `lib` include solo ES5/ES2015 → aggiungi `"ES2022"`

### Step 5: Aggiornare package.json browserslist (Alternative)

**Se preferisci package.json invece di .browserslistrc**:

```json
{
  "browserslist": [
    "Chrome >= 90",
    "Firefox >= 90",
    "Safari >= 14",
    "Edge >= 90",
    "> 0.5%",
    "not dead"
  ]
}
```

## Test Plan

```bash
# 1. Build production
npm run build

# 2. Analizza bundle
npm run build && npx @next/bundle-analyzer

# Verificare:
# - Chunk "117-*.js" ridotto di ~11 KiB
# - Nessun polyfill per Array.at, Object.fromEntries, etc.

# 3. Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Verificare:
# - "Legacy JavaScript" warning NON appare
# - Performance score migliora di +2-3 punti

# 4. Browser compatibility test
# Testare su:
# - Chrome 90+ ✅
# - Firefox 90+ ✅
# - Safari 14+ ✅
# - Edge 90+ ✅
#
# NON testare su (non supportati):
# - IE 11 ❌
# - Chrome <90 ❌
```

### Manual Verification

```bash
# Cerca polyfills nel bundle
npm run build
cat .next/static/chunks/117-*.js | grep -o "Array.prototype.at\|Object.fromEntries"

# Output atteso: NESSUN match (polyfills rimossi)
```

## Definition of Done
- [ ] `.browserslistrc` creato/aggiornato con target moderni
- [ ] `next.config.mjs` configurato con `legacyBrowsers: false`
- [ ] `tsconfig.json` target impostato su ES2022
- [ ] Build production senza errori
- [ ] Lighthouse: "Legacy JavaScript" warning risolto ✅
- [ ] Bundle size ridotto di ~11 KiB
- [ ] Sito testato e funzionante su Chrome/Firefox/Safari/Edge moderni
- [ ] No regressioni funzionali

## Metriche di Successo

**Prima** (Lighthouse Misurato):
- **Legacy JavaScript warning**: 10.6 KiB polyfills
- Chunk `117-cb1ce7b62bfd23de.js`: ~30 KiB
- Polyfills presenti: Array.at, Object.fromEntries, String.trimEnd, etc.

**Dopo** (target):
- **Legacy JavaScript warning**: ✅ Resolved
- Chunk `117-*.js`: ~19 KiB (-11 KiB, -37%)
- Nessun polyfill per feature moderne
- **Lighthouse Performance**: +2-3 punti
- **TTI (Time to Interactive)**: -10-20ms

## Files da Modificare
- ✏️ `.browserslistrc` (creare o aggiornare)
- ✏️ `next.config.mjs` (aggiungere experimental.legacyBrowsers: false)
- 👀 `tsconfig.json` (verificare target ES2022)

## Rischi e Mitigazioni

### ⚠️ Rischio: Utenti con browser obsoleti

**Probabilità**: Bassa (<5% utenti)
**Impatto**: Sito non funziona su browser pre-2020

**Mitigazione**:
1. Mostra banner "Browser non supportato" per User-Agent obsoleti
2. Aggiungi `.browserslistrc` a documentazione
3. Testa su Browserstack/LambdaTest per conferma

### ⚠️ Rischio: Regressioni funzionali

**Probabilità**: Molto bassa
**Impatto**: Feature non funziona su browser supportati

**Mitigazione**:
1. Test manuale su Chrome/Firefox/Safari/Edge
2. E2E tests (Playwright/Cypress) su matrix browser
3. Rollback immediato se problemi

## Note Tecniche

### Perché i Polyfills Erano Presenti?
Next.js di default transpila per compatibilità massima. Se non specifichi target browser, assume supporto IE 11 (obsoleto dal 2022).

### Browser Support Statistics (Can I Use)
```
Array.prototype.at: 94% browser support (Chrome 92+, Safari 15.4+)
Object.fromEntries: 95% support (Chrome 73+, Safari 12.1+)
String.prototype.trimEnd: 97% support (Chrome 66+, Safari 12+)
```

Tutti i browser moderni supportano queste feature native.

### Alternative: Differential Loading
Se vuoi supportare sia browser moderni che legacy:
- Usa `next-script-loader` con `module`/`nomodule`
- Crea 2 bundle: moderno (ES2022) + legacy (ES5 + polyfills)
- Browser scelgono automaticamente

**Non raccomandato** per questo progetto (target B2B moderno).

## Riferimenti
- [Next.js: Supported Browsers](https://nextjs.org/docs/architecture/supported-browsers)
- [Browserslist Config](https://github.com/browserslist/browserslist)
- [Can I Use: Browser Support Tables](https://caniuse.com)
- [Web.dev: Serve modern code](https://web.dev/serve-modern-code-to-modern-browsers/)

---

## Tracking
**Creata**: 2025-11-19
**Assegnata a**: Claude Code
**Dipendenze**: Nessuna
**Lighthouse Issue**: "Legacy JavaScript" warning
**Estimated Savings**: 11 KiB, +2-3 Lighthouse points
