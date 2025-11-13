# [DS-002] Sistema di Auto-Catalogazione Componenti

## Metadata
- **Story ID**: DS-002
- **Epic**: [EPIC-001 - Design System](./../epic.md)
- **Priorità**: 🟠 Alta
- **Dimensione**: 🔴 L (3-5 giorni)
- **Execution Environment**: 💻 **Claude Code Locale** (richiede automazione/MCP)
- **Stato**: ✅ Done
- **Assegnata a**: Claude Code
- **Data Creazione**: 2025-11-13
- **Data Completamento**: 2025-11-13

---

## User Story

**Come** developer
**Voglio** che ogni nuovo componente creato venga automaticamente catalogato nella pagina design-system
**Così che** la documentazione sia sempre aggiornata senza intervento manuale

---

## Descrizione Dettagliata

### Contesto
Attualmente quando viene creato un nuovo componente in `/components/ui/`, bisogna manualmente:
1. Aggiungerlo alla pagina `/app/[locale]/design-system/page.tsx`
2. Scrivere esempi di utilizzo
3. Documentare props e varianti
4. Categorizzarlo

Questo processo è error-prone e spesso viene dimenticato, causando documentazione obsoleta.

### Obiettivo Specifico
Creare un sistema che:
- Scansiona automaticamente la cartella `/components/ui/`
- Estrae metadata dai componenti (props, varianti, JSDoc)
- Genera automaticamente la sezione nel design-system page
- Mantiene esempi di codice sincronizzati

---

## Criteri di Accettazione

- [ ] **AC1**: Quando creo un nuovo componente in `/components/ui/`, viene automaticamente rilevato
  - Scenario: Creo `/components/ui/NewButton.tsx`
  - Risultato atteso: Il componente appare nella pagina design-system al prossimo build

- [ ] **AC2**: Metadata del componente vengono estratti automaticamente
  - Scenario: Il componente ha JSDoc con descrizione e props
  - Risultato atteso: Descrizione e props vengono mostrati nella documentazione

- [ ] **AC3**: Varianti del componente vengono rilevate e documentate
  - Scenario: Componente ha prop `variant` con valori "primary", "secondary"
  - Risultato atteso: Tutte le varianti vengono mostrate con esempi visivi

- [ ] **AC4**: Componenti vengono categorizzati automaticamente
  - Scenario: Componente ha tag `@category` in JSDoc
  - Risultato atteso: Viene inserito nella categoria corretta (Buttons, Cards, Forms, etc.)

- [ ] **AC5**: Sistema supporta hot-reload in development
  - Scenario: Modifico un componente in dev mode
  - Risultato atteso: La documentazione si aggiorna automaticamente

---

## Test Plan

### Test da Creare PRE-Sviluppo (TDD)

#### Test del Parser
```typescript
// File: lib/design-system/component-parser.test.ts
describe('Component Parser', () => {
  it('should extract component metadata from file', async () => {
    const metadata = await parseComponent('/components/ui/Button.tsx');

    expect(metadata).toHaveProperty('name', 'Button');
    expect(metadata).toHaveProperty('description');
    expect(metadata).toHaveProperty('props');
    expect(metadata).toHaveProperty('category');
  });

  it('should extract variants from union type props', () => {
    // Test extraction of variant prop types
  });

  it('should extract JSDoc comments', () => {
    // Test JSDoc parsing
  });
});
```

#### Test del Generator
```typescript
// File: lib/design-system/doc-generator.test.ts
describe('Documentation Generator', () => {
  it('should generate component showcase section', () => {
    const metadata = {
      name: 'Button',
      props: { variant: ['primary', 'secondary'] }
    };

    const showcase = generateShowcase(metadata);
    expect(showcase).toContain('<Button variant="primary">');
    expect(showcase).toContain('<Button variant="secondary">');
  });
});
```

#### Test E2E
```typescript
// File: e2e/design-system-auto-catalog.spec.ts
test('new component appears in design system page', async ({ page }) => {
  // Create new component
  // Navigate to /design-system
  // Verify component is listed
});
```

### Checklist di Testing
- [ ] Parser tests passano
- [ ] Generator tests passano
- [ ] E2E test passa
- [ ] Test manuale: creare nuovo componente e verificare che appaia
- [ ] Test manuale: modificare componente e verificare aggiornamento
- [ ] Performance: build time non aumenta significativamente (<10%)

---

## Linee Guida Tecniche

### Architettura Proposta

#### 1. Component Parser (`lib/design-system/component-parser.ts`)
```typescript
/**
 * Scansiona la cartella /components/ui/ e estrae metadata
 */
interface ComponentMetadata {
  name: string;
  filePath: string;
  description: string;
  category: string;
  props: PropDefinition[];
  variants: VariantDefinition[];
  examples: ExampleCode[];
}

export async function scanComponents(): Promise<ComponentMetadata[]> {
  // Usa typescript compiler API per parsare files
  // Estrae JSDoc, props types, varianti
}
```

#### 2. Documentation Generator (`lib/design-system/doc-generator.ts`)
```typescript
/**
 * Genera JSX per il design system page da metadata
 */
export function generateDesignSystemPage(
  components: ComponentMetadata[]
): React.ReactElement {
  // Genera sezioni categorizzate
  // Genera showcase con tutte le varianti
  // Genera code examples
}
```

#### 3. Build-time Plugin o Script
```typescript
// File: scripts/generate-design-system.ts
/**
 * Script eseguito durante build per rigenerare design-system page
 */
async function generateDesignSystem() {
  const components = await scanComponents();
  const pageContent = generateDesignSystemPage(components);

  // Write to /app/[locale]/design-system/page.tsx
  // O genera un JSON che il page importa
}
```

### Formato JSDoc per Componenti

Ogni componente deve seguire questo formato:
```typescript
/**
 * @component Button
 * @description Componente button neobrutalist con varianti di colore
 * @category Buttons
 *
 * @example
 * <Button variant="primary">Click me</Button>
 *
 * @example
 * <Button variant="secondary" size="lg">Large Button</Button>
 */
export function Button({ variant, size, children }: ButtonProps) {
  // ...
}
```

### Opzioni di Implementazione

**Opzione A: Build-time Generation** (Consigliata)
- Script che gira durante `npm run build`
- Genera file statico o JSON
- Pro: Performance runtime ottimale
- Contro: Richiede rebuild per vedere modifiche

**Opzione B: Runtime Generation** (Solo per dev)
- Scansiona componenti a runtime
- Pro: Hot reload automatico
- Contro: Overhead di performance

**Implementazione Ibrida** (Ideale):
- Runtime in development (hot reload)
- Build-time in production (performance)

---

## Implementazione Guidata

### Step 1: Preparazione
- [ ] Leggere epic e DS-001
- [ ] Installare dipendenze necessarie (`typescript`, `@babel/parser`, etc.)
- [ ] Creare branch: `claude/ds-002-auto-catalog`
- [ ] Creare test per parser e generator

### Step 2: Sviluppo Parser
- [ ] Implementare `component-parser.ts`
- [ ] Testare con componenti esistenti (Button, Card)
- [ ] Verificare estrazione corretta di metadata

### Step 3: Sviluppo Generator
- [ ] Implementare `doc-generator.ts`
- [ ] Generare showcase per ogni componente
- [ ] Generare code examples

### Step 4: Integrazione Build
- [ ] Creare script `generate-design-system.ts`
- [ ] Integrare in `package.json` (pre-build hook)
- [ ] Testare build completo

### Step 5: Development Experience
- [ ] Implementare hot-reload per dev mode (se tempo permette)
- [ ] Aggiungere logging utile per debugging

### Step 6: Testing e Refinement
- [ ] Testare con tutti i componenti esistenti
- [ ] Verificare categorizzazione corretta
- [ ] Ottimizzare performance se necessario

---

## Dipendenze

### Dipendenze Tecniche
- [ ] `typescript`: Per TypeScript Compiler API
- [ ] `@babel/parser` o `ts-morph`: Per parsing avanzato
- [ ] `react-docgen-typescript`: Alternative per metadata extraction
- [ ] `fs-extra`: Per file system operations

### Dipendenze da Altre Stories
- [ ] DS-001: Design tokens devono essere definiti prima

---

## Risorse e Riferimenti

### Design
- Pagina design-system attuale: `/app/[locale]/design-system/page.tsx`

### Documentazione
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)
- [Storybook Docs](https://storybook.js.org/docs/react/writing-docs/docs-page) - Ispirazione

### Esempi Simili
- Storybook autodocs
- Docusaurus component showcase
- Chakra UI docs generation

---

## Note per Claude Code

### Attenzione Speciale A:
- Questa story richiede **Claude Code Locale** per accesso a MCP/agenti di file system
- Build time non deve aumentare significativamente
- Deve funzionare sia su Windows che Unix systems
- Gestire edge cases: componenti senza JSDoc, props complessi

### Files da Creare:
- `/lib/design-system/component-parser.ts` - Parser di componenti
- `/lib/design-system/doc-generator.ts` - Generator di documentazione
- `/scripts/generate-design-system.ts` - Build script
- Test files corrispondenti

### Files da Modificare:
- `/package.json` - Aggiungere build script
- `/app/[locale]/design-system/page.tsx` - Integrare output generato

### Comandi da Eseguire:
```bash
# Installare dipendenze
npm install typescript @babel/parser fs-extra --save-dev

# Test parser
npm test -- component-parser.test.ts

# Eseguire generazione manuale
npm run generate:design-system

# Build completo
npm run build
```

---

## Definition of Done

- [ ] Tutti i criteri di accettazione sono soddisfatti
- [ ] Parser estrae metadata da tutti i componenti esistenti
- [ ] Generator produce showcase validi
- [ ] Build script funziona senza errori
- [ ] Pagina design-system mostra tutti i componenti
- [ ] Tutti i test passano
- [ ] Build time <10% più lento
- [ ] Hot-reload funziona in dev (se implementato)
- [ ] Documentazione script creata
- [ ] Branch pushed

---

## Storia delle Modifiche

| Data | Modifiche | Stato |
|------|-----------|-------|
| 2025-11-13 | Story creata | Todo |
