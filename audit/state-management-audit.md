# State Management Audit

**Audit Date:** 2026-01-26
**Auditor:** Claude Code (Front-End Developer Audit)
**Project:** selfrules.org (Mattia's Personal Website)
**Tech Stack:** Next.js 14, Zustand 4.5.7, React Query (TanStack) 5.90.7

---

## Executive Summary

This audit evaluates the state management architecture across the codebase, focusing on Zustand stores, React Query integration, and local component state patterns. The most critical finding is **significant inconsistency between documented state patterns and actual implementation**, with Zustand stores created but not fully utilized.

### Overall Assessment

| Category | Score | Status |
|----------|-------|--------|
| Store Architecture | 6/10 | :yellow_circle: Needs Improvement |
| Store Utilization | 3/10 | :red_circle: Critical |
| React Query Integration | 8/10 | :green_circle: Good |
| State Separation | 5/10 | :yellow_circle: Needs Improvement |
| Documentation Alignment | 2/10 | :red_circle: Critical |
| Type Safety | 8/10 | :green_circle: Good |
| Persistence Patterns | 7/10 | :green_circle: Acceptable |

---

## Table of Contents

1. [State Management Overview](#1-state-management-overview)
2. [Zustand Store Analysis](#2-zustand-store-analysis)
3. [React Query Integration](#3-react-query-integration)
4. [Critical Issues](#4-critical-issues)
5. [Component State Patterns](#5-component-state-patterns)
6. [Best Practices Compliance](#6-best-practices-compliance)
7. [Recommendations](#7-recommendations)
8. [Priority Matrix](#8-priority-matrix)

---

## 1. State Management Overview

### 1.1 Architecture Summary

The codebase implements a **three-tier state management** approach:

| Layer | Technology | Purpose | Status |
|-------|-----------|---------|--------|
| **Global State** | Zustand | UI state (chat, booking wizard) | :yellow_circle: Partially Implemented |
| **Server State** | React Query | API data (calendar, Spotify, chat API) | :green_circle: Well Implemented |
| **Local State** | React useState | Component-specific UI | :green_circle: Correctly Used |

### 1.2 File Structure

```
lib/
├── stores/
│   ├── bookingStore.ts    # Booking wizard state
│   └── chatStore.ts       # Chat widget state (with persistence)
├── hooks/
│   ├── useAnalytics.ts    # Analytics tracking
│   ├── useCalendar.ts     # Calendar API (React Query)
│   ├── useChat.ts         # Chat streaming (React Query)
│   └── useSpotify.ts      # Spotify API (React Query)
components/
└── providers/
    ├── AnalyticsProvider.tsx  # Analytics context
    └── ReactQueryProvider.tsx # Query client provider
```

### 1.3 Documentation vs Reality

**CLAUDE.md States:**
> Global State: Zustand stores for theme, language, user preferences

**Reality:**
- :x: **No theme store exists** (next-themes package installed but no Zustand integration)
- :x: **No language store exists** (i18n handled by URL routing via `[locale]`)
- :x: **No user preferences store exists**
- :white_check_mark: `bookingStore.ts` exists for booking wizard
- :white_check_mark: `chatStore.ts` exists for chat widget

---

## 2. Zustand Store Analysis

### 2.1 Booking Store

**File:** `lib/stores/bookingStore.ts` (63 lines)

```typescript
interface BookingStore {
  // State
  currentStep: BookingStep;
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  bookingDetails: Partial<BookingDetails>;

  // Actions
  setStep: (step: BookingStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  setSelectedDate: (date: Date) => void;
  setSelectedSlot: (slot: TimeSlot) => void;
  setBookingDetails: (details: Partial<BookingDetails>) => void;
  resetBooking: () => void;
}
```

**Assessment:**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Type Safety | :green_circle: Excellent | Full TypeScript interface with proper types |
| State Shape | :green_circle: Good | Flat structure, easy to update |
| Actions | :green_circle: Good | Clear, focused actions |
| Selectors | :yellow_circle: Acceptable | Uses `get()` internally, no computed selectors |
| Persistence | :x: Missing | No persist middleware (booking state lost on refresh) |

**Code Quality:**
- :white_check_mark: Uses `create<BookingStore>` with proper typing
- :white_check_mark: Actions use `set` and `get` correctly
- :white_check_mark: `STEP_ORDER` constant for wizard navigation
- :yellow_circle: Could benefit from computed selectors (e.g., `isLastStep`, `canProceed`)

### 2.2 Chat Store

**File:** `lib/stores/chatStore.ts` (91 lines)

```typescript
interface ChatStore {
  // State
  isOpen: boolean;
  currentSession: ChatSession | null;
  isStreaming: boolean;

  // Actions
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  setStreaming: (streaming: boolean) => void;
  clearSession: () => void;
  loadSession: (session: ChatSession) => void;
}
```

**Assessment:**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Type Safety | :green_circle: Excellent | Full TypeScript with Message and ChatSession types |
| State Shape | :green_circle: Good | Normalized with session containing messages |
| Actions | :green_circle: Good | Clear CRUD-like operations |
| Persistence | :green_circle: Good | Uses `persist` middleware with `partialize` |
| Selectors | :yellow_circle: Acceptable | No computed selectors |

**Code Quality:**
- :white_check_mark: Uses `persist` middleware correctly
- :white_check_mark: `partialize` excludes UI state (`isOpen`, `isStreaming`) from storage
- :white_check_mark: Session ID generation using `crypto.randomUUID()`
- :x: **Critical**: Store is barely used (see Section 4)

### 2.3 Store Typing Patterns

**Good Pattern Found:**

```typescript
// bookingStore.ts - Correct pattern
export const useBookingStore = create<BookingStore>((set, get) => ({
  // ...
}));
```

**Good Persistence Pattern:**

```typescript
// chatStore.ts - Correct persist pattern
export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // ...
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ currentSession: state.currentSession }),
    }
  )
);
```

---

## 3. React Query Integration

### 3.1 Query Hooks Analysis

**File:** `lib/hooks/useCalendar.ts`

```typescript
export function useAvailableSlots(date: Date | null) {
  return useQuery<AvailableSlotsResponse>({
    queryKey: ['calendar', 'slots', date?.toISOString()],
    queryFn: async () => { /* ... */ },
    enabled: !!date,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useBooking() {
  const queryClient = useQueryClient();
  return useMutation<BookingConfirmation, Error, BookingDetails>({
    mutationFn: async (details) => { /* ... */ },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['calendar', 'slots', variables.slot.start],
      });
    },
  });
}
```

**Assessment:** :green_circle: Excellent

| Criterion | Notes |
|-----------|-------|
| Query Keys | Well-structured hierarchical keys |
| Conditional Fetching | Uses `enabled` option correctly |
| Cache Invalidation | Proper `invalidateQueries` on mutation success |
| Error Types | Generic types properly specified |
| Stale Time | Reasonable caching (5 min for slots) |

---

**File:** `lib/hooks/useSpotify.ts`

```typescript
export function useNowPlaying() {
  return useQuery<SpotifyTrack | null>({
    queryKey: ['spotify', 'now-playing'],
    queryFn: async () => { /* ... */ },
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
    staleTime: 20000,
    retry: 1,
  });
}
```

**Assessment:** :green_circle: Excellent

| Criterion | Notes |
|-----------|-------|
| Polling | Smart polling with `refetchInterval` |
| Background Handling | Disables polling in background tabs |
| Error Handling | Limited retries (1) to prevent spam |
| Null Handling | Proper 204 response handling |

---

**File:** `lib/hooks/useChat.ts`

```typescript
export function useChatStream() {
  const { addMessage, updateLastMessage, setStreaming } = useChatStore();

  return useMutation({
    mutationFn: async ({ message, sessionId }: SendMessageOptions) => {
      // Manages Zustand store + streaming
    },
    onError: (error) => {
      setStreaming(false);
    },
  });
}
```

**Assessment:** :yellow_circle: Needs Improvement

| Criterion | Notes |
|-----------|-------|
| Store Integration | :white_check_mark: Correctly integrates with Zustand |
| Stream Handling | :white_check_mark: Proper SSE parsing |
| Error Handling | :yellow_circle: Only logs errors, no user feedback |
| Type Safety | :yellow_circle: Missing proper typing for stream response |

---

### 3.2 React Query Provider

**File:** `components/providers/ReactQueryProvider.tsx`

```typescript
export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

**Assessment:** :green_circle: Good

- :white_check_mark: Uses `useState` for stable client instance
- :white_check_mark: Reasonable default `staleTime`
- :white_check_mark: Disables `refetchOnWindowFocus` to prevent unnecessary requests
- :yellow_circle: Could add `retry` and `networkMode` defaults
- :x: Missing React Query DevTools for development

---

## 4. Critical Issues

### Issue #1: Unused Chat Store (CRITICAL)

**Severity:** :red_circle: Critical
**Impact:** High - Duplicated state logic, wasted code

The `chatStore` exists with full functionality but is **barely used** in the actual implementation:

**ChatInterface.tsx (252 lines) - Does NOT use chatStore:**

```typescript
// Component manages its own local state
const [messages, setMessages] = useState<Message[]>([...]);
const [isLoading, setIsLoading] = useState(false);
const [inputValue, setInputValue] = useState('');
const [sessionId, setSessionId] = useState<string>('');

// Uses sessionStorage directly instead of Zustand persist
useEffect(() => {
  const storedSessionId = sessionStorage.getItem('chatSessionId');
  // ...
}, []);
```

**ChatTrigger.tsx - Does NOT use chatStore:**

```typescript
// Uses local state instead of store
const [isOpen, setIsOpen] = useState(false);

// Should be:
// const { isOpen, toggleChat } = useChatStore();
```

**AskMeAnything.tsx - Partially uses chatStore:**

```typescript
// Only uses toggleChat, which doesn't sync with ChatTrigger
const { toggleChat } = useChatStore();
```

**Impact Analysis:**

| Issue | Consequence |
|-------|-------------|
| Duplicate state | `isOpen` exists in both chatStore AND ChatTrigger local state |
| No synchronization | Opening chat from AskMeAnything doesn't open ChatTrigger's chat |
| Wasted persistence | chatStore has persist middleware but ChatInterface uses sessionStorage directly |
| Code complexity | 91 lines of store code + 252 lines of component code managing same data |

---

### Issue #2: Missing Documented Stores (CRITICAL)

**Severity:** :red_circle: Critical
**Impact:** Medium - Documentation misleads developers

CLAUDE.md documents stores that don't exist:

| Store | Documented | Exists |
|-------|-----------|--------|
| Theme Store | :white_check_mark: Yes | :x: No |
| Language Store | :white_check_mark: Yes | :x: No |
| User Preferences Store | :white_check_mark: Yes | :x: No |

**Current Implementation:**
- **Theme**: Handled by `next-themes` package (not Zustand)
- **Language**: Handled by URL routing (`/[locale]/`)
- **User Preferences**: Not implemented anywhere

---

### Issue #3: Inconsistent State Sources (HIGH)

**Severity:** :large_orange_diamond: High
**Impact:** Medium - Difficult to debug state issues

| Component | State Source | Should Be |
|-----------|-------------|-----------|
| ChatTrigger | Local `useState` | `useChatStore` |
| ChatInterface | Local `useState` + `sessionStorage` | `useChatStore` |
| AskMeAnything | `useChatStore.toggleChat()` | `useChatStore` (full) |
| useChat hook | `useChatStore` | Correct :white_check_mark: |

---

### Issue #4: Booking Store Not Persisted (MEDIUM)

**Severity:** :yellow_circle: Medium
**Impact:** Low-Medium - Lost booking progress on refresh

The `bookingStore` doesn't use `persist` middleware:

```typescript
// Current - no persistence
export const useBookingStore = create<BookingStore>((set, get) => ({
  // ...
}));

// Should add persist like chatStore
export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({ /* ... */ }),
    { name: 'booking-storage' }
  )
);
```

---

## 5. Component State Patterns

### 5.1 Good Patterns Found

**GoogleCalendarPopup.tsx - Custom Hook Pattern:**

```typescript
export function useGoogleCalendar() {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    openCalendar: () => setIsOpen(true),
    closeCalendar: () => setIsOpen(false),
  };
}
```

:white_check_mark: Encapsulates related state
:white_check_mark: Returns semantic action names
:yellow_circle: Could be a Zustand store for global access

---

**Header.tsx - Derived State:**

```typescript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// Derived from URL
const isActive = (path: string) => pathname === path;
```

:white_check_mark: Simple local state for UI-only concerns
:white_check_mark: Derived state computed from pathname

---

### 5.2 Anti-Patterns Found

**ChatInterface.tsx - Prop Drilling Alternative Issue:**

The component loads conversation history from the API but doesn't use the Zustand store:

```typescript
// Anti-pattern: Duplicates store functionality
const loadConversationHistory = async (sessionId: string) => {
  // ... fetches from API
  setMessages(historicalMessages); // Sets local state
};
```

Should use:

```typescript
const { loadSession, currentSession } = useChatStore();
// Load into store, render from store
```

---

## 6. Best Practices Compliance

### 6.1 Zustand Best Practices Checklist

| Practice | Status | Notes |
|----------|--------|-------|
| Single store per domain | :white_check_mark: Pass | Booking and Chat are separate |
| Flat state shape | :white_check_mark: Pass | Both stores are flat |
| Actions inside store | :white_check_mark: Pass | All actions defined in store |
| TypeScript generics | :white_check_mark: Pass | `create<StoreType>` pattern |
| Selector hooks | :x: Fail | No custom selector hooks for performance |
| DevTools middleware | :x: Fail | No devtools in development |
| Immer for complex updates | N/A | State is simple enough |

### 6.2 React Query Best Practices Checklist

| Practice | Status | Notes |
|----------|--------|-------|
| Unique query keys | :white_check_mark: Pass | Hierarchical keys used |
| Error boundaries | :x: Fail | No error boundaries for queries |
| Loading states | :white_check_mark: Pass | Components handle loading |
| Optimistic updates | :x: Fail | Not implemented where beneficial |
| Prefetching | :x: Fail | No prefetching for predictable navigations |
| DevTools | :x: Fail | Not included in provider |

### 6.3 Performance Considerations

| Issue | Impact | Recommendation |
|-------|--------|----------------|
| No selector optimization | Medium | Add `useShallow` or custom selectors |
| Full store subscription | Medium | Components subscribe to entire store |
| Missing memoization | Low | Actions don't need memoization in Zustand |

**Example Selector Pattern to Add:**

```typescript
// lib/stores/selectors.ts
import { useShallow } from 'zustand/react/shallow';

export const useChatUI = () =>
  useChatStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      isStreaming: state.isStreaming,
      toggleChat: state.toggleChat,
    }))
  );

export const useChatMessages = () =>
  useChatStore((state) => state.currentSession?.messages ?? []);
```

---

## 7. Recommendations

### 7.1 Immediate Actions (P0)

#### R1: Integrate ChatInterface with chatStore

**Priority:** P0 (Critical)
**Effort:** 2-3 hours
**Impact:** High

1. Remove local `useState` for messages, isLoading, sessionId
2. Use `useChatStore` for all state
3. Remove `sessionStorage` calls (store handles persistence)

```typescript
// ChatInterface.tsx (refactored)
export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const {
    currentSession,
    isStreaming,
    addMessage,
    updateLastMessage,
    setStreaming,
  } = useChatStore();

  const messages = currentSession?.messages ?? [];
  // ... rest of component
}
```

#### R2: Integrate ChatTrigger with chatStore

**Priority:** P0 (Critical)
**Effort:** 30 minutes
**Impact:** High

```typescript
// ChatTrigger.tsx (refactored)
export default function ChatTrigger() {
  const { isOpen, toggleChat, closeChat } = useChatStore();
  // Remove local useState
}
```

### 7.2 Short-term Actions (P1)

#### R3: Add DevTools for Development

**Priority:** P1 (High)
**Effort:** 30 minutes
**Impact:** Medium - Better debugging

```typescript
// lib/stores/chatStore.ts
import { devtools, persist } from 'zustand/middleware';

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set, get) => ({ /* ... */ }),
      { name: 'chat-storage' }
    ),
    { name: 'ChatStore' }
  )
);
```

```typescript
// components/providers/ReactQueryProvider.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function ReactQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
```

#### R4: Add Persist to bookingStore

**Priority:** P1 (High)
**Effort:** 1 hour
**Impact:** Medium - Better UX for booking flow

```typescript
export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({ /* existing code */ }),
    {
      name: 'booking-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        selectedDate: state.selectedDate,
        selectedSlot: state.selectedSlot,
        bookingDetails: state.bookingDetails,
      }),
    }
  )
);
```

#### R5: Update CLAUDE.md Documentation

**Priority:** P1 (High)
**Effort:** 30 minutes
**Impact:** Medium - Accurate documentation

Update State Management section to reflect reality:

```markdown
### State Management & Data Flow
- **Global State**: Zustand stores for chat UI and booking wizard
- **Theme**: Handled by next-themes package
- **Locale**: Handled by URL routing ([locale] parameter)
- **Server State**: React Query for API data
```

### 7.3 Medium-term Actions (P2)

#### R6: Add Selector Hooks

**Priority:** P2 (Medium)
**Effort:** 2 hours
**Impact:** Medium - Performance optimization

Create `lib/stores/selectors.ts` with optimized selectors using `useShallow`.

#### R7: Add Computed Selectors to bookingStore

**Priority:** P2 (Medium)
**Effort:** 1 hour
**Impact:** Low - Better DX

```typescript
// Add to bookingStore
isFirstStep: () => get().currentStep === 'date',
isLastStep: () => get().currentStep === 'confirmation',
canProceed: () => {
  const { currentStep, selectedDate, selectedSlot, bookingDetails } = get();
  switch (currentStep) {
    case 'date': return !!selectedDate;
    case 'time': return !!selectedSlot;
    case 'details': return !!(bookingDetails.name && bookingDetails.email);
    default: return false;
  }
},
```

#### R8: Add Error Boundaries for React Query

**Priority:** P2 (Medium)
**Effort:** 2 hours
**Impact:** Medium - Better error UX

```typescript
// components/providers/QueryErrorBoundary.tsx
export function QueryErrorBoundary({ children }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallback={<ErrorFallback />}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
```

---

## 8. Priority Matrix

| Issue | Severity | Effort | Priority | Timeline |
|-------|----------|--------|----------|----------|
| Integrate ChatInterface with store | :red_circle: Critical | Medium | P0 | Week 1 |
| Integrate ChatTrigger with store | :red_circle: Critical | Low | P0 | Week 1 |
| Update CLAUDE.md documentation | :red_circle: Critical | Low | P1 | Week 1 |
| Add DevTools middleware | :large_orange_diamond: High | Low | P1 | Week 1 |
| Add persist to bookingStore | :large_orange_diamond: High | Low | P1 | Week 2 |
| Add selector hooks | :yellow_circle: Medium | Medium | P2 | Week 2 |
| Add computed selectors | :yellow_circle: Medium | Low | P2 | Week 3 |
| Add React Query error boundaries | :yellow_circle: Medium | Medium | P2 | Week 3 |
| Add optimistic updates | :green_circle: Low | High | P3 | Future |
| Add prefetching | :green_circle: Low | Medium | P3 | Future |

---

## Appendix A: Store Usage Map

### Current Usage

| Store | Hook | Files Using |
|-------|------|-------------|
| `useChatStore` | `toggleChat` | AskMeAnything.tsx |
| `useChatStore` | Full store | useChat.ts hook only |
| `useBookingStore` | Not found | No production usage found |

### Expected Usage (After Fixes)

| Store | Hook | Files Should Use |
|-------|------|------------------|
| `useChatStore` | `isOpen, toggleChat, closeChat` | ChatTrigger.tsx |
| `useChatStore` | `currentSession, messages, addMessage, etc.` | ChatInterface.tsx |
| `useChatStore` | `toggleChat` | AskMeAnything.tsx |
| `useBookingStore` | Full store | GoogleCalendarPopup.tsx, booking flow components |

---

## Appendix B: Recommended Store Structure

### Enhanced Chat Store

```typescript
// lib/stores/chatStore.ts (proposed)
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ChatStore {
  // UI State
  isOpen: boolean;
  isStreaming: boolean;

  // Data State
  currentSession: ChatSession | null;

  // Computed (via getters)
  readonly messages: Message[];
  readonly hasMessages: boolean;

  // Actions
  open: () => void;
  close: () => void;
  toggle: () => void;
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  setStreaming: (streaming: boolean) => void;
  clearSession: () => void;
  loadSession: (session: ChatSession) => void;
}

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        isOpen: false,
        currentSession: null,
        isStreaming: false,

        // Computed
        get messages() {
          return get().currentSession?.messages ?? [];
        },
        get hasMessages() {
          return (get().currentSession?.messages?.length ?? 0) > 0;
        },

        // Actions
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
        toggle: () => set((state) => ({ isOpen: !state.isOpen })),
        // ... rest of actions
      }),
      { name: 'chat-storage', partialize: (state) => ({ currentSession: state.currentSession }) }
    ),
    { name: 'ChatStore', enabled: process.env.NODE_ENV === 'development' }
  )
);
```

---

**Report Generated:** 2026-01-26
**Total Issues Identified:** 8
**Critical Issues:** 3
**Estimated Fix Effort:** 6-8 developer hours (P0-P1)
