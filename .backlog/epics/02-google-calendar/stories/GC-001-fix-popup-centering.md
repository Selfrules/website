# [GC-001] Fix Google Calendar Popup Centering & Responsiveness

## Metadata
- **Story ID**: GC-001
- **Epic**: [EPIC-002](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: ✅ Completato | **Data Completamento**: 2025-11-13

## User Story
**Come** utente **Voglio** che il popup Google Calendar si apra centrato e completamente visibile **Così che** possa facilmente prenotare una chiamata

## Criteri di Accettazione
- [x] **AC1**: Popup si apre centrato su viewport (desktop e mobile)
- [x] **AC2**: Tutto il contenuto del widget è visibile (no scroll necessario per azioni critiche)
- [x] **AC3**: Popup è responsive e si adatta a diverse dimensioni schermo (mobile, tablet, desktop)
- [x] **AC4**: Click fuori dal popup lo chiude (overlay)
- [x] **AC5**: ESC key chiude il popup (accessibilità)
- [x] **AC6**: Animazione di apertura/chiusura fluida

## Implementazione Tecnica

### Diagnosi Problema
```typescript
// Probabili problemi da investigare:
// 1. CSS positioning non corretto (absolute vs fixed)
// 2. z-index troppo basso
// 3. Viewport calculation errata per centering
// 4. iframe/widget di Google non caricato correttamente
```

### Soluzione Proposta
```tsx
// Componente Modal/Popup corretto
<div className="fixed inset-0 z-50 flex items-center justify-center">
  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black/50"
    onClick={closePopup}
  />

  {/* Content - centrato */}
  <div className="relative bg-white border-brutal shadow-brutal-lg rounded-brutal max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
    {/* Google Calendar Widget */}
    <iframe src={googleCalendarUrl} />
  </div>
</div>
```

### Files da Modificare
- Componente popup esistente (identificare quale)
- Probabilmente in `/components/` o `/app/[locale]/`

## Test Plan
```typescript
// e2e/google-calendar-popup.spec.ts
test('popup opens centered and is fully visible', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Parliamone'); // Hero CTA

  // Popup è visibile
  const popup = page.locator('[data-testid="calendar-popup"]');
  await expect(popup).toBeVisible();

  // È centrato
  const box = await popup.boundingBox();
  const viewport = page.viewportSize();
  expect(Math.abs(box.x + box.width/2 - viewport.width/2)).toBeLessThan(50);
});

test('popup closes on ESC', async ({ page }) => {
  // Open popup
  // Press ESC
  // Verify closed
});

test('popup closes on overlay click', async ({ page }) => {
  // Open popup
  // Click overlay
  // Verify closed
});
```

**Mobile Test**: Test su viewport mobile (375x667)

## Definition of Done
- [x] Popup centrato su desktop (1920x1080, 1366x768)
- [x] Popup centrato su tablet (768x1024)
- [x] Popup centrato su mobile (375x667, 414x896)
- [x] Widget completamente visibile senza scroll orizzontale
- [x] Overlay funziona
- [x] ESC key funziona
- [x] Animazioni fluide
- [x] Test E2E data-testids aggiornati
- [x] Zero errori linting

---

## Implementazione Completata

### Data Completamento
2025-11-13

### Modifiche Effettuate
**File**: `components/ui/GoogleCalendarPopup.tsx`

**Refactoring principale**:
1. **Flexbox-based centering**: Sostituito il pattern `left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` con container flexbox (`flex items-center justify-center`)
2. **Container structure migliorata**:
   - Main container: `fixed inset-0 z-50 flex items-center justify-center p-4`
   - Overlay: `absolute inset-0` dentro il flex container
   - Modal: `relative` (automaticamente centrato dal flex parent)
3. **Responsive padding**: Aggiunto `p-4` al container per evitare che il modal tocchi i bordi dello schermo su mobile
4. **Test IDs**: Aggiunti `data-testid="calendar-popup"` e `data-testid="calendar-popup-overlay"` per E2E testing

### Funzionalità Verificate
- ✅ **Centering**: Funziona su tutte le viewport sizes (flexbox approach)
- ✅ **ESC key close**: Già implementato, mantenuto
- ✅ **Overlay click close**: Già implementato, mantenuto
- ✅ **Body scroll prevention**: Già implementato, mantenuto
- ✅ **Smooth animations**: Framer Motion animations già presenti, mantenute
- ✅ **Responsive design**: `w-full max-w-[800px] h-[90vh] max-h-[700px]` garantisce adattamento

### Note Tecniche
- Il precedente approccio usava positioning fisso con translate, che funzionava ma era meno robusto
- Il nuovo approccio flexbox è più standard, manutenibile, e garantisce centering perfetto
- Nessuna breaking change nelle props o API del componente
- Compatibilità garantita con il resto del codebase
