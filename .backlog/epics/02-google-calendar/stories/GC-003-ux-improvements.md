# [GC-003] Miglioramenti UX e Design System Alignment

## Metadata
- **Story ID**: GC-003
- **Epic**: [EPIC-002](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟢 S (2-4h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** utente **Voglio** un'esperienza di booking coerente con il resto del sito **Così che** il processo sia familiare e piacevole

## Criteri di Accettazione
- [ ] **AC1**: Popup usa design system neobrutalist (border-brutal, shadow-brutal)
- [ ] **AC2**: Loading state mentre widget Google Calendar carica
- [ ] **AC3**: Error state se widget non carica
- [ ] **AC4**: Messaggio di conferma stilizzato con design system
- [ ] **AC5**: Accessibilità WCAG AA (focus trap, aria labels)

## Implementazione

### Loading State
```tsx
{isLoading && (
  <div className="flex items-center justify-center p-brutal-xl">
    <Spinner /> {/* O skeleton */}
    <p>Caricamento calendario...</p>
  </div>
)}
```

### Error State
```tsx
{error && (
  <div className="border-brutal border-red-500 bg-red-50 p-brutal-md rounded-brutal">
    <p>Impossibile caricare il calendario.</p>
    <Button onClick={retry}>Riprova</Button>
  </div>
)}
```

### Design System Styling
```tsx
<div className="border-brutal shadow-brutal-lg rounded-brutal bg-white">
  {/* Google Calendar Widget */}
</div>
```

## Test
- [ ] Test loading state (throttle network)
- [ ] Test error state (block API)
- [ ] Accessibilità test (keyboard navigation)
- [ ] Screen reader test

## Definition of Done
- [ ] Design system applicato al popup
- [ ] Loading state implementato e testato
- [ ] Error state implementato e testato
- [ ] Accessibilità verificata
- [ ] Focus trap funzionante
- [ ] Esperienza coerente con resto del sito

## Dipendenze
- GC-001 (fix centering)
- EPIC-001 DS-001 (design tokens disponibili)
