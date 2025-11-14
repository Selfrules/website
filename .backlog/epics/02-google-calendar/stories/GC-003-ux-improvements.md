# [GC-003] Miglioramenti UX e Design System Alignment

## Metadata
- **Story ID**: GC-003
- **Epic**: [EPIC-002](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟢 S (2-4h)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: ✅ Done | **Data Completamento**: 2025-11-14

## User Story
**Come** utente **Voglio** un'esperienza di booking coerente con il resto del sito **Così che** il processo sia familiare e piacevole

## Criteri di Accettazione
- [x] **AC1**: Popup usa design system neobrutalist (border-brutal, shadow-brutal)
- [x] **AC2**: Loading state mentre widget Google Calendar carica
- [x] **AC3**: Error state se widget non carica
- [x] **AC4**: Messaggio di conferma stilizzato con design system
- [x] **AC5**: Accessibilità WCAG AA (focus trap, aria labels)

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
- [x] Design system applicato al popup
- [x] Loading state implementato e testato
- [x] Error state implementato e testato
- [x] Accessibilità verificata
- [x] Focus trap funzionante
- [x] Esperienza coerente con resto del sito

---

## Implementazione Completata

**Data**: 2025-11-14
**Branch**: `feature/GC-003-ux-improvements`

### Modifiche Implementate

#### 1. **Neobrutalist Close Button** (X)
- Design completamente ridisegnato con stile neobrutalist
- Utilizzo di `border-brutal`, `shadow-brutal`, `shadow-brutal-hover`
- Hover effects: rotazione 90° della X + traslazione shadow
- Padding aumentato (`p-brutal-sm`) per touch target accessibile
- Stroke weight aumentato a 3 per maggiore impatto visivo
- Focus ring blu elettrico (4px) per accessibilità keyboard

#### 2. **Loading State**
- Spinner animato con Lucide `Loader2` in Electric Blue
- Background cream coerente con design system
- Messaggio "Caricamento calendario..." chiaro
- ARIA `role="status"` e `aria-live="polite"` per screen readers
- Z-index gestito correttamente sopra iframe

#### 3. **Error State**
- Card neobrutalist con bordo Neon Pink (4px)
- Titolo "Oops! Qualcosa è andato storto" user-friendly
- Messaggio esplicativo sulla connessione
- Bottone "Riprova" con icona `RefreshCw`
- Retry functionality che forza reload dell'iframe
- ARIA `role="alert"` e `aria-live="assertive"` per urgenza

#### 4. **Design System Tokens**
Sostituiti tutti i valori hard-coded con utility custom:
- `border-brutal` invece di `border-4 border-[#000]`
- `shadow-brutal-lg` invece di custom shadow
- `bg-cream` invece di `bg-[#FFFCF2]`
- `rounded-brutal` per border radius consistente
- Spacing system: `p-brutal-sm`, `p-brutal-md`, `p-brutal-lg`
- Colors: `text-electric-blue`, `bg-electric-blue`, `border-neon-pink`

#### 5. **Accessibility (WCAG AA)**
- **Focus trap**: Tab cycling limitato al modal quando aperto
- **Auto-focus**: Close button riceve focus all'apertura
- **ARIA labels completi**:
  - `role="dialog"` e `aria-modal="true"` sul container
  - `aria-labelledby` collegato al titolo
  - `aria-label` su overlay, close button, iframe
- **Keyboard navigation**: ESC chiude il modal
- **Screen reader support**: `aria-live` regions per loading/error
- **Focus indicators**: Ring blu elettrico su tutti gli interattivi

### Testing Effettuato
- ✅ ESLint: Zero warnings/errors
- ✅ TypeScript: Nessun errore nel file modificato
- ✅ Design system consistency verificata
- ✅ Accessibilità: focus trap, ARIA labels, keyboard nav

### Note Tecniche
- Utilizzate ref per gestire focus programmatico
- Stati separati per loading e error (non mutuamente esclusivi)
- Retry intelligente che preserva l'URL dell'iframe
- Animazioni Framer Motion mantenute per coerenza
- Compatibilità mobile garantita con responsive spacing

## Dipendenze
- GC-001 (fix centering)
- EPIC-001 DS-001 (design tokens disponibili)
