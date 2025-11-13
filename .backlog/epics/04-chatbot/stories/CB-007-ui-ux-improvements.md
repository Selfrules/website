# [CB-007] UI/UX Chatbot e Apertura da Homepage

## Metadata
- **Story ID**: CB-007 | **Epic**: [EPIC-004](./../epic.md)
- **Priorità**: 🟡 Media | **Dimensione**: 🟢 S (2-4h)
- **Execution Environment**: 🌐 **Claude Code Web**
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** utente **Voglio** aprire chatbot facilmente dalla homepage **Così che** possa iniziare una conversazione rapidamente

## Criteri di Accettazione
- [ ] **AC1**: Pulsante "Inizia chat" nella homepage apre chatbot
- [ ] **AC2**: Chatbot usa design system neobrutalist
- [ ] **AC3**: Typing indicator quando bot sta scrivendo
- [ ] **AC4**: Scroll automatico a ultimo messaggio
- [ ] **AC5**: Mobile responsive
- [ ] **AC6**: Accessibilità keyboard navigation

## Implementazione

### 1. Homepage CTA
```tsx
// app/[locale]/page.tsx
<Button
  variant="primary"
  onClick={() => openChatbot()}
  data-testid="open-chat-btn"
>
  Inizia chat
</Button>
```

### 2. Chatbot UI Component
```tsx
// components/Chatbot.tsx
<div className="fixed bottom-4 right-4 z-50">
  {/* Minimized: Floating button */}
  {!isOpen && (
    <button
      className="border-brutal shadow-brutal-hover rounded-full bg-electric-blue p-4"
      onClick={() => setIsOpen(true)}
    >
      💬
    </button>
  )}

  {/* Maximized: Chat window */}
  {isOpen && (
    <div className="border-brutal shadow-brutal-lg rounded-brutal bg-white w-96 h-[600px] flex flex-col">
      {/* Header */}
      <div className="border-b-brutal p-brutal-sm bg-electric-blue">
        <h3>Chat con Mattia</h3>
        <button onClick={() => setIsOpen(false)}>✕</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-brutal-sm">
        {messages.map(msg => (
          <Message key={msg.id} {...msg} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input */}
      <form className="border-t-brutal p-brutal-sm">
        <input
          className="border-brutal rounded-brutal p-2 w-full"
          placeholder="Scrivi un messaggio..."
        />
        <button type="submit">Invia</button>
      </form>
    </div>
  )}
</div>
```

### 3. Typing Indicator
```tsx
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-slate-blue">
      <div className="flex gap-1">
        <span className="animate-bounce">●</span>
        <span className="animate-bounce delay-100">●</span>
        <span className="animate-bounce delay-200">●</span>
      </div>
      <span>Mattia sta scrivendo...</span>
    </div>
  );
}
```

## Design System Elements
- **Colors**: `bg-electric-blue` (primary), `bg-white`, `text-brutal-black`
- **Borders**: `border-brutal`
- **Shadows**: `shadow-brutal-lg`
- **Radius**: `rounded-brutal`
- **Spacing**: `p-brutal-sm`, `p-brutal-md`

## Test Plan
```typescript
// E2E test
test('open chatbot from homepage', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="open-chat-btn"]');

  const chatbot = page.locator('[data-testid="chatbot"]');
  await expect(chatbot).toBeVisible();
});

test('send message and receive response', async ({ page }) => {
  // Open chatbot
  // Type message
  // Submit
  // Wait for typing indicator
  // Verify response appears
});
```

## Accessibility
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] ARIA labels
- [ ] Focus trap quando aperto
- [ ] Screen reader compatible

## Definition of Done
- [ ] Pulsante homepage apre chatbot
- [ ] UI usa design system
- [ ] Typing indicator funziona
- [ ] Auto-scroll a ultimo messaggio
- [ ] Mobile responsive
- [ ] Accessibilità verificata
- [ ] E2E tests passano
- [ ] Dark mode compatibile

## Dipendenze
- [ ] CB-001 (Chat API funzionante)
- [ ] EPIC-001 DS-001 (Design tokens)
