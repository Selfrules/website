# React Best Practices Audit

**Audit Date:** 2026-01-26
**Auditor:** Claude Code (Front-End Developer Audit)
**Project:** selfrules.org (Mattia's Personal Website)
**Tech Stack:** Next.js 14, React 18, TypeScript, Framer Motion

---

## Executive Summary

This audit analyzes React best practices across the codebase, focusing on hooks usage, memoization strategies, list key handling, and component optimization patterns. The analysis reveals **several opportunities for improvement**, particularly in memoization and list key handling, while showing generally solid patterns for hooks usage and custom hook architecture.

### Overall Assessment

| Category | Score | Status |
|----------|-------|--------|
| useEffect Dependencies | 8/10 | :green_circle: Good |
| useEffect Cleanup | 7/10 | :green_circle: Acceptable |
| useState Patterns | 9/10 | :green_circle: Excellent |
| Custom Hooks Architecture | 9/10 | :green_circle: Excellent |
| Memoization (useMemo) | 2/10 | :red_circle: Critical |
| Memoization (useCallback) | 3/10 | :red_circle: Critical |
| Memoization (React.memo) | 2/10 | :red_circle: Critical |
| List Keys | 4/10 | :red_circle: Critical |
| Inline Functions in JSX | 5/10 | :yellow_circle: Needs Improvement |
| Component Re-render Optimization | 4/10 | :red_circle: Critical |

---

## Table of Contents

1. [Hooks Analysis](#1-hooks-analysis)
2. [Memoization Analysis](#2-memoization-analysis)
3. [List Key Analysis](#3-list-key-analysis)
4. [Inline Functions Analysis](#4-inline-functions-analysis)
5. [Component Re-render Analysis](#5-component-re-render-analysis)
6. [Custom Hooks Review](#6-custom-hooks-review)
7. [Critical Issues Summary](#7-critical-issues-summary)
8. [Recommendations](#8-recommendations)
9. [Implementation Roadmap](#9-implementation-roadmap)

---

## 1. Hooks Analysis

### 1.1 useEffect Usage

**Total useEffect instances found:** 13 (excluding node_modules)

#### File-by-File Analysis

| File | Count | Dependencies | Cleanup | Issues |
|------|-------|-------------|---------|--------|
| `ChatInterface.tsx` | 2 | :green_circle: Correct | :yellow_circle: Partial | None |
| `GoogleCalendarPopup.tsx` | 3 | :green_circle: Correct | :green_circle: Yes | Minor: `analytics` in deps |
| `Header.tsx` | 1 | :green_circle: Correct | N/A | None |
| `Marquee.tsx` | 1 | :green_circle: Correct | N/A | None |
| `DesignSystemNav.tsx` | 1 | :green_circle: Correct | :yellow_circle: Missing | Scroll listener |
| `UmamiScript.tsx` | 1 | :green_circle: Correct | N/A | None |
| `AnalyticsProvider.tsx` | 2 | :green_circle: Correct | N/A | None |
| `prototipo-BlogArticle.tsx` | 2 | :yellow_circle: Partial | :red_circle: Missing | Multiple issues |

#### Detailed Issues

**Issue #1: Missing Cleanup for Event Listeners**

**File:** `components/design-system/DesignSystemNav.tsx:28`
```typescript
// Current (missing cleanup)
useEffect(() => {
  const handleScroll = () => {
    // ...
  };
  window.addEventListener('scroll', handleScroll);
  // Missing: return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**Severity:** :yellow_circle: Medium
**Impact:** Memory leak on component unmount

---

**Issue #2: Analytics Object in Dependencies**

**File:** `components/ui/GoogleCalendarPopup.tsx:28-44`
```typescript
useEffect(() => {
  if (isOpen) {
    analytics.trackCalendarAction('opened');
    // ...
  }
}, [isOpen, analytics]); // `analytics` causes re-runs
```

**Severity:** :yellow_circle: Medium
**Impact:** Potential unnecessary re-executions

**Recommendation:** The `useAnalytics` hook should return stable references via `useCallback`, which it already does. However, the `analytics` object itself is recreated on each render. Consider using `useRef` for the analytics instance or memoizing the hook return.

---

**Issue #3: Prototype File Issues (Multiple)**

**File:** `claudedocs/prototipo-BlogArticle.tsx:96-109`
```typescript
// Issue 1: Missing cleanup for scroll listener
useEffect(() => {
  const handleScroll = () => {
    // ...
  };
  window.addEventListener('scroll', handleScroll);
  // Missing cleanup
}, []);

// Issue 2: Potential missing dependency
useEffect(() => {
  const observer = new IntersectionObserver(/* ... */);
  // `activeSection` state setter used but not in deps
}, []); // May need dependencies
```

**Severity:** :yellow_circle: Medium (prototype file)
**Impact:** Memory leaks, stale closures

---

### 1.2 useState Patterns

**Assessment:** :green_circle: Generally Excellent

The codebase demonstrates good useState practices:

**Positive Patterns:**

1. **Lazy Initialization for QueryClient**
```typescript
// ReactQueryProvider.tsx
const [queryClient] = useState(
  () => new QueryClient({ /* config */ })
);
```
:green_circle: Correct lazy initialization prevents recreation on each render

2. **Proper State Grouping**
```typescript
// ChatInterface.tsx
const [messages, setMessages] = useState<Message[]>([/* initial */]);
const [isLoading, setIsLoading] = useState(false);
const [inputValue, setInputValue] = useState('');
const [sessionId, setSessionId] = useState<string>('');
```
:green_circle: Related state properly grouped

3. **Functional Updates for Arrays**
```typescript
// ChatInterface.tsx
setMessages((prev) => [...prev, userMessage]);
```
:green_circle: Correct functional updates to avoid stale state

---

### 1.3 useRef Patterns

**Assessment:** :green_circle: Good

```typescript
// ChatInterface.tsx
const messagesEndRef = useRef<HTMLDivElement>(null);

// GoogleCalendarPopup.tsx
const modalRef = useRef<HTMLDivElement>(null);
const closeButtonRef = useRef<HTMLButtonElement>(null);

// useAnalytics.ts
const sessionIdRef = useRef<string | null>(null);
```

:green_circle: Properly typed refs
:green_circle: DOM refs for focus management
:green_circle: Value refs for stable references across renders

---

## 2. Memoization Analysis

### 2.1 useMemo Usage

**Total useMemo instances found:** 0 (excluding node_modules)

**Critical Finding:** The codebase has **NO usage of useMemo** anywhere in custom components.

#### Missed Opportunities

**Case #1: Journey Component Milestones Array**

**File:** `components/sections/Journey.tsx:79-128`
```typescript
// Current: Recreated on every render
const milestones: Milestone[] = [
  { id: '1', dateKey: '...', /* ... */ },
  { id: '2', dateKey: '...', /* ... */ },
  { id: '3', dateKey: '...', /* ... */ },
  { id: '4', dateKey: '...', /* ... */ },
];
```

**Recommendation:**
```typescript
// Optimized with useMemo
const milestones = useMemo<Milestone[]>(() => [
  { id: '1', dateKey: '...', /* ... */ },
  // ...
], []); // Static data - empty deps

// Or better: Move outside component
const MILESTONES: Milestone[] = [/* ... */];
```

**Impact:** 4 objects recreated on every render

---

**Case #2: SkillsMatrix Categories Array**

**File:** `components/sections/SkillsMatrix.tsx:32-111`
```typescript
// Current: 6 category objects recreated every render
const skillCategories: SkillCategory[] = [
  { id: 'design', title: 'UI/UX Design', icon: <Palette />, skills: [...] },
  // ... 5 more categories
];
```

**Impact:** 6 objects + 6 icon components + 36 skill strings recreated per render

---

**Case #3: Color Mapping Objects**

**File:** `components/sections/Journey.tsx:237-244, 281-288`
```typescript
// Created inside map loop - recreated for EACH milestone on EACH render
const arrowColorClasses: Record<NeoBadgeColor, string> = {
  blue: 'text-electric-blue',
  pink: 'text-neon-pink',
  // ... 7 more
};
```

**Impact:** Object created 4 times per render (inside loop)

**Recommendation:** Move to module scope or memoize:
```typescript
// Module scope (best for static data)
const ARROW_COLOR_CLASSES: Record<NeoBadgeColor, string> = {
  blue: 'text-electric-blue',
  // ...
};
```

---

**Case #4: Computed Values in WhatImUpTo**

**File:** `components/sections/WhatImUpTo.tsx`

The `renderMarkdown` function is called multiple times with the same translation keys. Results could be memoized if performance becomes an issue.

---

### 2.2 useCallback Usage

**Total useCallback instances found:** 1

**Location:** `components/ui/GoogleCalendarPopup.tsx:21`
```typescript
const handleClose = useCallback(() => {
  analytics.trackCalendarAction('closed');
  onClose();
}, [analytics, onClose]);
```

:green_circle: Correctly used with stable dependencies

#### Missing useCallback Opportunities

**Case #1: ChatInterface Event Handlers**

**File:** `components/chat/ChatInterface.tsx:80-179`
```typescript
// Current: Recreated every render
const handleSendMessage = async () => { /* ... */ };
const handleKeyPress = (e: React.KeyboardEvent) => { /* ... */ };

// With useCallback (not strictly necessary here since no child prop passing)
const handleSendMessage = useCallback(async () => {
  // ...
}, [inputValue, sessionId, analytics]);
```

**Impact:** Low - these aren't passed to memoized children

---

**Case #2: CertificationsSection Handlers**

**File:** `components/sections/CertificationsSection.tsx:31-34`
```typescript
// Current: Recreated every render
const handleCertificationClick = (cert: CertificationData) => {
  setSelectedCertification(cert);
  setIsModalOpen(true);
};
```

**Impact:** Low-Medium - passed to child `CertificationBadge` components

---

### 2.3 React.memo Usage

**Total React.memo instances found:** 0 (excluding node_modules)

**Critical Finding:** No components use `React.memo` for optimization.

#### High-Impact Candidates for React.memo

| Component | Re-render Trigger | Impact |
|-----------|-------------------|--------|
| `CertificationBadge` | Parent state changes | Medium |
| `SpotifySkeleton` | Parent polling data | Low |
| `SpotifyOffline` | Parent polling data | Low |
| `SpotifyNowPlaying` | Parent polling data | Medium |
| `ActivityCard` | Parent i18n changes | Medium |
| `NeoBadge` | Parent renders | Low |

**Example Implementation:**
```typescript
// Current
function CertificationBadge({ certification, onClick, animated, delay }) {
  // ...
}

// Optimized
const CertificationBadge = memo(function CertificationBadge({
  certification,
  onClick,
  animated,
  delay
}) {
  // ...
});
```

---

## 3. List Key Analysis

### 3.1 Index as Key (Anti-Pattern)

**Total instances using index as key:** 22

This is a **critical issue** that can cause:
- Incorrect component state preservation
- Broken animations
- Performance degradation during reordering/filtering

#### Detailed Index Key Violations

| File | Line | Context | Severity |
|------|------|---------|----------|
| `Journey.tsx` | 248 | Achievement list items | :red_circle: High |
| `Journey.tsx` | 266 | Skills badges | :red_circle: High |
| `Journey.tsx` | 293 | Certification badges | :red_circle: High |
| `WhatImUpTo.tsx` | 126 | Example list items | :yellow_circle: Medium |
| `WhatImUpTo.tsx` | 149 | Paragraph elements | :yellow_circle: Medium |
| `WhatImUpTo.tsx` | 160 | Learning examples | :yellow_circle: Medium |
| `WhatImUpTo.tsx` | 174 | Results list | :yellow_circle: Medium |
| `ExperienceCard.tsx` | 152 | Achievements | :red_circle: High |
| `ExperienceCard.tsx` | 173 | Skills | :red_circle: High |
| `ExperienceCard.tsx` | 193 | Certifications | :red_circle: High |
| `BentoGrid.tsx` | 138, 147, 169 | Grid items | :yellow_circle: Medium |
| `Marquee.tsx` | 123, 157, 194 | Marquee items | :yellow_circle: Medium |
| `SkillsRadarChart.tsx` | 181 | Chart labels | :green_circle: Low |
| `DecorativeAccents.tsx` | 106 | Decorative elements | :green_circle: Low |
| `RecentPodcasts.tsx` | 122 | Podcast items | :red_circle: High |
| `SpotifyRecommendations.tsx` | 126 | Recommendations | :red_circle: High |
| `ComponentShowcase.tsx` | 111 | Showcase items | :yellow_circle: Medium |

---

### 3.2 Good Key Patterns

**ChatInterface.tsx (Correct Approach):**
```typescript
{messages.map((message, index) => (
  <div key={`${message.timestamp.getTime()}-${message.role}-${index}`}>
    {/* ... */}
  </div>
))}
```

:green_circle: Composite key with unique timestamp + role + index fallback

**Journey.tsx (Milestones - Correct):**
```typescript
{milestones.map((milestone, index) => (
  <motion.div key={milestone.id}>
    {/* ... */}
  </motion.div>
))}
```

:green_circle: Using unique `id` property

---

### 3.3 Recommended Fixes

**Pattern 1: Use Unique Identifiers When Available**
```typescript
// Before (bad)
{skills.map((skill, i) => (
  <span key={i}>{skill}</span>
))}

// After (good) - for simple string arrays
{skills.map((skill) => (
  <span key={skill}>{skill}</span>
))}
```

**Pattern 2: Create Composite Keys**
```typescript
// For items without IDs but with unique combinations
{achievements.map((achievement, index) => (
  <li key={`achievement-${milestoneId}-${index}`}>
    {achievement}
  </li>
))}
```

**Pattern 3: Add IDs to Data Structures**
```typescript
// Add id to translation data or create utility
const examplesWithIds = useMemo(() =>
  examples.map((ex, i) => ({ id: `example-${i}`, text: ex })),
  [examples]
);
```

---

## 4. Inline Functions Analysis

### 4.1 Inline Arrow Functions in onClick

**Total inline onClick functions found:** 27+

#### High-Impact Violations

**File:** `components/sections/Hero.tsx:91-94`
```typescript
<NeoButton
  onClick={() => {
    analytics.trackCTAClick('book_call', 'hero', { variant: 'primary' });
    openCalendar();
  }}
>
```

**Impact:** Function recreated every render, but NeoButton is not memoized so impact is minimal.

---

**File:** `components/sections/CertificationsSection.tsx:43`
```typescript
{certifications.map((cert, index) => (
  <CertificationBadge
    onClick={() => handleCertificationClick(cert)}
    // ...
  />
))}
```

**Impact:** Creates N new functions per render (one per certification)

**Recommendation:**
```typescript
// Option 1: Pass certification and handle in parent
<CertificationBadge
  onClick={handleCertificationClick}
  certification={cert}
/>

// Option 2: Use useCallback if CertificationBadge is memoized
const handleClick = useCallback((cert: CertificationData) => {
  setSelectedCertification(cert);
  setIsModalOpen(true);
}, []);
```

---

**File:** `components/sections/SkillsMatrix.tsx:190`
```typescript
{skillCategories.map((category) => (
  <button onClick={() => toggleCategory(category.id)}>
    {/* ... */}
  </button>
))}
```

**Impact:** 6 new functions per render

---

### 4.2 Acceptable Inline Functions

These inline functions are acceptable because they're:
1. In components that don't need memoization
2. Not passed to memoized children
3. Simple state setters

```typescript
// Acceptable - simple toggle
onClick={() => setMobileMenuOpen(!mobileMenuOpen)}

// Acceptable - no children to trigger re-renders
onClick={() => setIsMobileExpanded(!isMobileExpanded)}
```

---

## 5. Component Re-render Analysis

### 5.1 Components Likely to Have Excessive Re-renders

| Component | Trigger | Frequency | Optimization Needed |
|-----------|---------|-----------|---------------------|
| `Journey` | Any parent render | Low | :yellow_circle: Move static data outside |
| `WhatImUpTo` | Spotify polling (30s) | Medium | :yellow_circle: Memoize sub-components |
| `SkillsMatrix` | State changes | Low | :yellow_circle: Move static data outside |
| `CertificationsSection` | Modal state | Medium | :red_circle: Memoize list items |
| `Header` | Route changes | Low | :green_circle: Acceptable |
| `ChatInterface` | Message streaming | High | :yellow_circle: Optimize message list |

---

### 5.2 Re-render Cascades

**Scenario: Spotify Widget Polling**
```
SpotifyWidget (data changes every 30s)
└── WhatImUpTo (re-renders)
    └── ActivityCard x3 (re-render)
        └── All children re-render
```

**Recommendation:** Wrap ActivityCard children in `memo()` or use composition patterns.

---

**Scenario: Chat Message Streaming**
```
ChatInterface (messages state updates rapidly during streaming)
└── All messages re-render (22 keys, composite key helps)
    └── Each message div re-renders
```

**Current mitigation:** Composite keys prevent DOM recreation, but React still reconciles all items.

**Recommendation:**
```typescript
// Virtualize long message lists
import { FixedSizeList } from 'react-window';

// Or memoize individual messages
const ChatMessage = memo(function ChatMessage({ message }) {
  // ...
});
```

---

## 6. Custom Hooks Review

### 6.1 useAnalytics

**File:** `lib/hooks/useAnalytics.ts`

**Assessment:** :green_circle: Excellent

**Strengths:**
- All tracking functions wrapped in `useCallback`
- Stable function references across renders
- Proper dependency arrays
- Async/await with error handling

```typescript
const track = useCallback(async (...) => { ... }, []);
const trackPageView = useCallback(async () => { ... }, [track]);
const trackCTAClick = useCallback(async (...) => { ... }, [track]);
// ... etc
```

:green_circle: Dependencies correctly chain from `track` function

---

### 6.2 useNowPlaying (Spotify)

**File:** `lib/hooks/useSpotify.ts`

**Assessment:** :green_circle: Excellent

```typescript
export function useNowPlaying() {
  return useQuery<SpotifyTrack | null>({
    queryKey: ['spotify', 'now-playing'],
    queryFn: async () => { ... },
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
    staleTime: 20000,
    retry: 1,
  });
}
```

**Strengths:**
- Proper React Query configuration
- Background polling disabled (saves resources)
- Appropriate stale time
- Limited retries

---

### 6.3 useGoogleCalendar

**File:** `components/ui/GoogleCalendarPopup.tsx:217-228`

**Assessment:** :yellow_circle: Acceptable (could be improved)

```typescript
export function useGoogleCalendar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const openCalendar = () => setIsOpen(true);
  const closeCalendar = () => setIsOpen(false);

  return { isOpen, openCalendar, closeCalendar };
}
```

**Issue:** `openCalendar` and `closeCalendar` are recreated every render.

**Recommendation:**
```typescript
export function useGoogleCalendar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const openCalendar = useCallback(() => setIsOpen(true), []);
  const closeCalendar = useCallback(() => setIsOpen(false), []);

  return { isOpen, openCalendar, closeCalendar };
}
```

---

## 7. Critical Issues Summary

### Severity: Critical (:red_circle:)

| Issue | Files Affected | Impact |
|-------|----------------|--------|
| No useMemo usage | All components with computed data | Performance |
| No React.memo usage | All reusable components | Performance |
| 22+ index-as-key violations | Journey, WhatImUpTo, BentoGrid, etc. | Correctness |
| Inline functions in loops | CertificationsSection, SkillsMatrix | Performance |

### Severity: High (:orange_circle:)

| Issue | Files Affected | Impact |
|-------|----------------|--------|
| Static data inside components | Journey, SkillsMatrix | Performance |
| Color mapping recreated in loops | Journey | Performance |
| Missing useCallback in hooks | useGoogleCalendar | Performance |

### Severity: Medium (:yellow_circle:)

| Issue | Files Affected | Impact |
|-------|----------------|--------|
| Missing event listener cleanup | DesignSystemNav, BlogArticle | Memory |
| Analytics object in dependencies | GoogleCalendarPopup | Minor |

---

## 8. Recommendations

### 8.1 Immediate Actions (Week 1)

#### R1: Move Static Data Outside Components
**Priority:** P0 (Critical)
**Effort:** 2-4 hours
**Impact:** High

Move constant arrays outside component functions:

```typescript
// Before (in Journey.tsx)
export default function Journey() {
  const milestones = [/* 50+ lines */];
  // ...
}

// After
const MILESTONES: Milestone[] = [/* ... */];

export default function Journey() {
  // Use MILESTONES directly
}
```

**Files to Update:**
- `components/sections/Journey.tsx` - milestones array
- `components/sections/SkillsMatrix.tsx` - skillCategories array
- `components/ui/Header.tsx` - translations object (move to i18n)

---

#### R2: Fix Index Key Violations
**Priority:** P0 (Critical)
**Effort:** 4-6 hours
**Impact:** High

**Files to Update (Priority Order):**
1. `Journey.tsx` - 3 violations
2. `ExperienceCard.tsx` - 3 violations
3. `WhatImUpTo.tsx` - 4 violations
4. `RecentPodcasts.tsx` - 1 violation
5. `SpotifyRecommendations.tsx` - 1 violation
6. `BentoGrid.tsx` - 3 violations
7. `Marquee.tsx` - 3 violations

**Strategy:**
- For string arrays: Use string value as key
- For objects: Add unique id property
- For translation arrays: Create composite key with parent id

---

### 8.2 Short-term Actions (Week 2)

#### R3: Add React.memo to Reusable Components
**Priority:** P1 (High)
**Effort:** 1-2 days
**Impact:** Medium

**Components to Memoize:**
```typescript
// High priority (passed new props on each render)
export const CertificationBadge = memo(function CertificationBadge(...) { });
export const ActivityCard = memo(function ActivityCard(...) { });
export const SpotifyNowPlaying = memo(function SpotifyNowPlaying(...) { });

// Medium priority
export const NeoBadge = memo(function NeoBadge(...) { });
export const NeoButton = memo(function NeoButton(...) { });
```

---

#### R4: Add useCallback to Event Handlers
**Priority:** P1 (High)
**Effort:** 4-6 hours
**Impact:** Medium

```typescript
// CertificationsSection.tsx
const handleCertificationClick = useCallback((cert: CertificationData) => {
  setSelectedCertification(cert);
  setIsModalOpen(true);
}, []);

// SkillsMatrix.tsx
const toggleCategory = useCallback((categoryId: string) => {
  setExpandedCategory(prev => prev === categoryId ? null : categoryId);
}, []);
```

---

#### R5: Fix useGoogleCalendar Hook
**Priority:** P1 (High)
**Effort:** 30 minutes
**Impact:** Low

```typescript
export function useGoogleCalendar() {
  const [isOpen, setIsOpen] = useState(false);

  const openCalendar = useCallback(() => setIsOpen(true), []);
  const closeCalendar = useCallback(() => setIsOpen(false), []);

  return useMemo(() => ({
    isOpen,
    openCalendar,
    closeCalendar
  }), [isOpen, openCalendar, closeCalendar]);
}
```

---

### 8.3 Medium-term Actions (Week 3-4)

#### R6: Add useMemo for Computed Values
**Priority:** P2 (Medium)
**Effort:** 1 day
**Impact:** Medium

```typescript
// Journey.tsx - memoize color mappings
const arrowColorClasses = useMemo(() => ({
  blue: 'text-electric-blue',
  // ...
}), []);

// renderMarkdown results (if performance is an issue)
const renderedDescription = useMemo(
  () => renderMarkdown(t(milestone.descriptionKey)),
  [t, milestone.descriptionKey]
);
```

---

#### R7: Fix Event Listener Cleanup
**Priority:** P2 (Medium)
**Effort:** 1-2 hours
**Impact:** Low (memory leaks)

```typescript
// DesignSystemNav.tsx
useEffect(() => {
  const handleScroll = () => { /* ... */ };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

#### R8: Consider Virtualization for Long Lists
**Priority:** P3 (Low)
**Effort:** 1-2 days
**Impact:** Medium (for scale)

For ChatInterface messages if list grows long:
```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={400}
  itemCount={messages.length}
  itemSize={60}
>
  {({ index, style }) => (
    <ChatMessage style={style} message={messages[index]} />
  )}
</FixedSizeList>
```

---

## 9. Implementation Roadmap

### Phase 1: Critical Fixes (Week 1)

| Task | Effort | Owner | Status |
|------|--------|-------|--------|
| Move static data outside components | 4h | Dev | :white_large_square: |
| Fix 15 high-priority key violations | 6h | Dev | :white_large_square: |
| Fix useGoogleCalendar hook | 30m | Dev | :white_large_square: |
| Add event listener cleanup | 1h | Dev | :white_large_square: |

### Phase 2: Performance Optimization (Week 2)

| Task | Effort | Owner | Status |
|------|--------|-------|--------|
| Add React.memo to 6 components | 4h | Dev | :white_large_square: |
| Add useCallback to event handlers | 4h | Dev | :white_large_square: |
| Fix remaining 7 key violations | 3h | Dev | :white_large_square: |

### Phase 3: Advanced Optimization (Week 3-4)

| Task | Effort | Owner | Status |
|------|--------|-------|--------|
| Add useMemo for computed values | 4h | Dev | :white_large_square: |
| Audit inline function impact | 2h | Dev | :white_large_square: |
| Consider virtualization | 8h | Dev | :white_large_square: |

---

## Appendix A: Quick Reference

### When to Use Each Hook

| Hook | Use Case | Example |
|------|----------|---------|
| `useMemo` | Expensive calculations, object/array creation | `useMemo(() => items.filter(...), [items])` |
| `useCallback` | Function passed to memoized child | `useCallback(() => onClick(id), [onClick, id])` |
| `React.memo` | Component receives same props frequently | `memo(function Card(props) { })` |
| `useRef` | DOM refs, mutable values between renders | `useRef<HTMLDivElement>(null)` |

### Key Guidelines

| Situation | Key Strategy |
|-----------|-------------|
| Array of objects with ID | `key={item.id}` |
| Array of unique strings | `key={string}` |
| Nested lists | `key={`${parentId}-${childId}`}` |
| Static lists (never reorder) | `key={index}` (only if truly static) |

---

## Appendix B: Files Requiring Changes

### High Priority

1. `components/sections/Journey.tsx`
   - Move milestones array outside
   - Fix 3 index-as-key violations
   - Move color mappings to module scope

2. `components/sections/SkillsMatrix.tsx`
   - Move skillCategories outside
   - Add useCallback to toggleCategory
   - Fix inline onClick functions

3. `components/sections/CertificationsSection.tsx`
   - Add useCallback to handleCertificationClick
   - Consider React.memo for CertificationBadge

4. `components/ui/GoogleCalendarPopup.tsx`
   - Fix useGoogleCalendar hook
   - Review analytics dependency

### Medium Priority

5. `components/sections/WhatImUpTo.tsx` - Fix 4 key violations
6. `components/ui/ExperienceCard.tsx` - Fix 3 key violations
7. `components/ui/BentoGrid.tsx` - Fix 3 key violations
8. `components/design-system/DesignSystemNav.tsx` - Add cleanup

---

**Report Generated:** 2026-01-26
**Total Issues Identified:** 50+
**Critical Issues:** 4 categories
**Estimated Optimization Effort:** 3-4 developer days
