# [GC-001] Fix Google Calendar Popup Centering & Responsiveness

## Metadata
- **Story ID**: GC-001
- **Epic**: [EPIC-002](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** utente **Voglio** che il popup Google Calendar si apra centrato e completamente visibile **Così che** possa facilmente prenotare una chiamata

## Criteri di Accettazione
- [ ] **AC1**: Popup si apre centrato su viewport (desktop e mobile)
- [ ] **AC2**: Tutto il contenuto del widget è visibile (no scroll necessario per azioni critiche)
- [ ] **AC3**: Popup è responsive e si adatta a diverse dimensioni schermo (mobile, tablet, desktop)
- [ ] **AC4**: Click fuori dal popup lo chiude (overlay)
- [ ] **AC5**: ESC key chiude il popup (accessibilità)
- [ ] **AC6**: Animazione di apertura/chiusura fluida

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
- [ ] Popup centrato su desktop (1920x1080, 1366x768)
- [ ] Popup centrato su tablet (768x1024)
- [ ] Popup centrato su mobile (375x667, 414x896)
- [ ] Widget completamente visibile senza scroll orizzontale
- [ ] Overlay funziona
- [ ] ESC key funziona
- [ ] Animazioni fluide
- [ ] Test E2E passano
- [ ] Zero errori console
