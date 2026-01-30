# 3 Visual Concepts for Brand Elevation: selfrules.org

**Audit Phase:** 4 - Creative Direction & Concepts
**Subtask:** 4.2 - Create 3 distinct Visual Concepts
**Date:** 2026-01-26
**Analyst:** Art Director Audit (Claude)

---

## Document Purpose

This document presents **three distinct visual concept directions** for elevating the selfrules.org brand. Each concept is designed to close the -3.9 gap between verbal brand (8.7/10) and visual brand (4.8/10) identified in the audit, while preserving the exceptional positioning as "the translator PM."

**Selection Guidance:** These concepts are not mutually exclusive elements but represent **three different strategic directions**. The final implementation may blend elements, but the primary direction should be chosen based on business priorities and audience targeting.

---

## Concept Overview Matrix

| Concept | Name | Model Reference | Risk Level | Transformation Scope | Primary Fix |
|---------|------|-----------------|------------|----------------------|-------------|
| **1** | "The Bridge" | Josh Comeau | Medium | High | Visual-verbal alignment |
| **2** | "The Trusted Expert" | Sara Soueidan | Low | Medium | Credibility & human presence |
| **3** | "Refined Brutal" | Tobias (softened) | Low-Medium | Low-Medium | Aesthetic evolution |

---

## Concept 1: "The Bridge"

### Name
**The Bridge** — *Where complexity meets clarity*

---

### Rationale

**Why this direction?**

The core brand promise is translation—turning chaos into clarity, making teams understand each other. The current design speaks a design-insider language (neobrutalism) that contradicts this promise. "The Bridge" concept makes the website itself a demonstration of translation in action.

**Strategic Foundation:**
- Josh W. Comeau's site teaches through its design—the medium IS the message
- selfrules.org claims to simplify complexity but visually adds to it
- If Mattia translates business problems, the site should translate the user's journey

**From Gap Analysis:**
> "The site promises to cut through noise but visually adds to it."

This concept directly addresses that gap by making every visual choice serve clarity, not aesthetics.

**Competitive Positioning:** Move diagonally on the positioning map toward Josh Comeau territory—approachable expertise with visual proof of capability.

---

### Visual Elements

#### Color Palette

| Element | Current | Proposed | Rationale |
|---------|---------|----------|-----------|
| **Primary Background** | Cream (#FFFCF2) | Clean White (#FFFFFF) + Subtle Warm (#FAFAF9) | Cleaner canvas = clarity perception |
| **Accent (Primary)** | Electric Blue (#0D7EFF) | Kept as-is | Maintains brand continuity |
| **Accent (Success)** | Cyber Yellow (#FFD60A) | Used for "translation results" only | Reserves impact for proof points |
| **Decorative Shapes** | 70-80% opacity | **Removed entirely** | Decorative noise contradicts translator promise |
| **New Element** | N/A | **Translation Gradient** | Subtle gradient showing "chaos → clarity" transition |

**Translation Gradient Concept:**
```
LEFT SIDE (Chaos):     Multiple colors, scattered
    ↓ TRANSITION ↓
RIGHT SIDE (Clarity):  Single Electric Blue, focused
```

#### Typography

| Element | Specification | Change from Current |
|---------|---------------|---------------------|
| **Headlines** | Space Grotesk 700-800 | +8% line height for breathing |
| **Body** | Inter 400-500 | +0.02em letter-spacing for readability |
| **Code/Proof** | JetBrains Mono | New: Used for metrics/numbers ("€150K saved") |
| **Annotation** | Inter 300 Italic | New: "Before/After" labels on visuals |

#### Layout

| Element | Current | Proposed | Rationale |
|---------|---------|----------|-----------|
| **Section Gaps** | 48px | 80px minimum | More breathing room = perceived clarity |
| **Card Density** | 3-4 elements competing | Single focus per viewport | One idea, one action |
| **Visual Proof** | None | Before/After comparison blocks | Demonstrates translation visually |
| **Hero** | Text + floating shapes | Text + ONE visual metaphor | The "bridge" icon/illustration |

#### Imagery Style

**NEW: Translation Diagrams**
- Before state: Scattered, multi-color elements (representing chaos)
- Arrow/bridge element: Electric Blue transition zone
- After state: Clean, organized, aligned (representing clarity)

**Photography:**
- Professional headshot with **warm, approachable expression**
- Shot in natural light, not studio-perfect (matches authenticity)
- Optional: Action shot showing collaboration (whiteboard, workshop)

#### Signature Element

**THE BRIDGE ICON**

A custom visual element representing translation:
```
[Chaos Cloud] ──────┤ BRIDGE ├────── [Clarity Diamond]
     Many colors        │              Single color (Electric Blue)
     Scattered          │              Focused
                   MATTIA'S ROLE
```

This icon becomes the signature element across:
- Logo integration
- Section transitions
- Footer treatment
- Social media avatar

---

### Emotional Target

**Primary Emotion:** Relieved understanding

**Emotional Journey:**
```
Landing:    "Ah, this is refreshingly clear" (VISUAL RELIEF)
     ↓
Scrolling:  "They practice what they preach" (TRUST CONFIRMATION)
     ↓
Reading:    "I can see the transformation they create" (EVIDENCE)
     ↓
Action:     "This person will clarify my chaos too" (CONFIDENCE)
```

**Target Feeling:**
> "This site feels like taking a deep breath after a chaotic meeting."

**Contrast with Current:**
- Current: "Interesting design" (design appreciation)
- Target: "Clear thinker" (capability appreciation)

---

### Implementation Notes

#### Phase 1: Foundation (Week 1-2)

1. **Remove all decorative floating shapes**
   - Files: `components/sections/Hero.tsx`, all section components
   - Replace with subtle gradient or nothing

2. **Add professional headshot to Hero section**
   - Position: Right side of hero, balanced with headline
   - Treatment: Soft border-brutal frame, not harsh

3. **Create Bridge signature icon**
   - SVG asset for reuse
   - Animate on scroll (chaos → clarity transition)

4. **Increase section spacing**
   - Global CSS update: section gaps from 48px → 80px
   - Add `section-spacer` utility class

#### Phase 2: Proof System (Week 3-4)

5. **Build "Before/After" component**
   - Two-panel card showing transformation
   - Left: chaos state (red tint, scattered elements)
   - Right: clarity state (blue tint, organized)
   - Center: Mattia's intervention description

6. **Add one real case study visual**
   - Mini-case showing actual transformation
   - Metric highlight (time saved, decisions made, etc.)

7. **Social proof integration**
   - Testimonial with headshot (if available)
   - Or: Metric callout ("€150K in decisions made in 6 weeks")

#### Phase 3: Refinement (Week 5+)

8. **Micro-interactions**
   - Bridge icon animates on hero load
   - Cards "organize" on hover (subtle chaos → order)

9. **Full section transitions**
   - Each section uses bridge concept as separator
   - Scroll reveals clarity emerging from complexity

---

### Risk/Benefit Analysis

#### Benefits

| Benefit | Impact | Confidence |
|---------|--------|------------|
| **Visual-verbal alignment** | Closes primary gap (-3.9 → ~0) | High |
| **Differentiation** | Bridge metaphor is ownable, memorable | High |
| **Trust building** | Shows capability, not just claims | High |
| **Audience fit** | Speaks to non-designers (clarity > aesthetics) | High |
| **SEO/UX** | Cleaner design = better performance | Medium |

#### Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Loses design-forward appeal** | Medium | Secondary audience still sees craft in execution |
| **Requires case study content** | Medium | Start with one transformation story, expand |
| **Bridge metaphor may feel corporate** | Low | Execute with warmth, not generic iconography |
| **Substantial redesign effort** | High | Phase implementation, start with hero |

#### Trade-off Summary

**Gives up:** Trend-forward neobrutalist identity that appeals to designers
**Gains:** Universal accessibility that proves translator positioning
**Net:** +3 to +4 points on visual-verbal alignment

---

## Concept 2: "The Trusted Expert"

### Name
**The Trusted Expert** — *Proven guidance, human connection*

---

### Rationale

**Why this direction?**

The most effective personal brands in the consultant space (Sara Soueidan, Dan Mall) succeed not through visual boldness but through **trust markers**: human presence, social proof, values display. This concept prioritizes credibility signals over aesthetic innovation.

**Strategic Foundation:**
- Sara Soueidan scores 8.0/10 on visual execution with understated design
- Dan Mall's 66,800+ subscriber count builds more trust than any animation
- selfrules.org has strong positioning but zero visual proof of claims

**From Competitive Benchmarking:**
> "4/5 benchmarks show the person... selfrules.org gap: Zero human presence despite 'vulnerable failure story' positioning."

This concept directly addresses that gap with human-centered design.

**Competitive Positioning:** Position alongside Sara Soueidan and Dan Mall—substance over style, expertise proven through evidence.

---

### Visual Elements

#### Color Palette

| Element | Current | Proposed | Rationale |
|---------|---------|----------|-----------|
| **Primary Background** | Cream (#FFFCF2) | Warm White (#FEFEFE) | Professional but not cold |
| **Primary Accent** | Electric Blue (#0D7EFF) | **Deep Blue (#1A56DB)** | More professional, less "startup" |
| **Trust Accent** | N/A | **Warm Gray (#6B7280)** | For testimonials, credentials |
| **Success Highlight** | Cyber Yellow (#FFD60A) | **Soft Gold (#F59E0B)** | Warmer, more premium |
| **Decorative Shapes** | 70-80% opacity | **5-10% opacity** | Present but ambient |

**Palette Evolution:**
Current palette is "energetic startup"; proposed is "established expert"

#### Typography

| Element | Specification | Change from Current |
|---------|---------------|---------------------|
| **Headlines** | Space Grotesk 600-700 | Slightly lighter weight = more professional |
| **Credential Text** | Inter 500, Small Caps | New: For awards, titles |
| **Testimonial Quotes** | Serif addition (Georgia) | New: Warmth for human words |
| **Body** | Inter 400 | Unchanged, excellent baseline |

#### Layout

| Element | Current | Proposed | Rationale |
|---------|---------|----------|-----------|
| **Hero Structure** | Headline dominant | **Photo + Headline equal** | Human presence as priority |
| **Trust Section** | None | **Credentials bar** | Awards, client logos, metrics |
| **Testimonials** | None | **Quote cards with photos** | Human voices validate claims |
| **CTA Approach** | Button-heavy | **Conversation starter** | "Let's talk about your chaos" |

#### Imagery Style

**Headshot Treatment:**
- **Size:** Large, confident (not thumbnail)
- **Style:** Professional but warm (not corporate stiff)
- **Position:** Hero-level prominence
- **Treatment:** Soft brutalist frame (border-2 rounded-brutal-lg)

**Testimonial Photos:**
- If available: Client headshots with quotes
- If not available: Initials with company context

**Background:**
- Subtle texture (paper grain) for warmth
- Reduced geometric elements (more organic shapes if any)

#### Signature Element

**THE MATTIA BADGE**

A "certified expert" visual treatment:
```
┌─────────────────────────────────────┐
│  ★  MATTIA DEMARIA                  │
│     PM • Design • Development       │
│     13 years of collaborative chaos │
└─────────────────────────────────────┘
```

This badge appears:
- Fixed in corner (subtle)
- In testimonial attributions
- As profile element for social sharing

---

### Emotional Target

**Primary Emotion:** Confident trust

**Emotional Journey:**
```
Landing:    "This person looks credible" (FIRST IMPRESSION TRUST)
     ↓
Scrolling:  "Others vouch for them" (SOCIAL PROOF)
     ↓
Reading:    "They've been through what I'm going through" (IDENTIFICATION)
     ↓
Action:     "I trust this person with my problem" (DECISION)
```

**Target Feeling:**
> "This is the expert I've been looking for—finally, someone real."

**Contrast with Current:**
- Current: "Interesting character" (personality appreciation)
- Target: "Credible expert" (competence appreciation)

---

### Implementation Notes

#### Phase 1: Human Foundation (Week 1)

1. **Add professional headshot to Hero**
   - Large format (min 400x400px)
   - Position: Prominent, not sidebar
   - Treatment: Warm lighting, approachable expression

2. **Create "Trust Bar" component**
   - Horizontal strip below hero or above fold
   - Contains: Years experience, projects, key metric
   - Example: "13 Years • 50+ Projects • €2M+ Decisions Facilitated"

3. **Reduce decorative element opacity**
   - All floating shapes: 70-80% → 10-15%
   - Or remove from hero entirely

#### Phase 2: Social Proof (Week 2-3)

4. **Build testimonial section**
   - 2-3 testimonials with photos if possible
   - Company context for credibility
   - Quote format with serif font

5. **Add credentials display**
   - Past clients (if shareable)
   - Or: Roles held, industries served
   - Style: Understated, professional

6. **Values statement section**
   - What Mattia believes about work
   - Example: "I believe shipping beats perfecting"
   - Positions as thought leader, not just doer

#### Phase 3: Authority Building (Week 4+)

7. **"As Seen In" or "Featured" if applicable**
   - Speaking engagements
   - Publications
   - Conference appearances

8. **Email capture for ongoing trust**
   - Newsletter signup with clear value
   - Reference: Dan Mall's 66k subscriber approach

---

### Risk/Benefit Analysis

#### Benefits

| Benefit | Impact | Confidence |
|---------|--------|------------|
| **Immediate trust building** | Major credibility increase | High |
| **Lower implementation risk** | Doesn't require full redesign | High |
| **Audience appropriate** | Business decision-makers respond to proof | High |
| **Defensible positioning** | Testimonials can't be copied | High |
| **Conversion focus** | Trust → action is direct path | High |

#### Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Testimonials required** | Medium | Start with metrics; gather testimonials over time |
| **May feel "consultant-generic"** | Medium | Maintain voice distinctiveness in copy |
| **Photo quality critical** | Low | Invest in professional photography |
| **Loses design distinctiveness** | Medium | Keep brutalist elements as subtle touches |

#### Trade-off Summary

**Gives up:** Strong visual design identity, designer-audience appeal
**Gains:** Universal trust signals, credibility proof, human connection
**Net:** +2 to +3 points on trust perception; moderate visual-verbal improvement

---

## Concept 3: "Refined Brutal"

### Name
**Refined Brutal** — *Bold with purpose, edge with warmth*

---

### Rationale

**Why this direction?**

The neobrutalist aesthetic isn't the problem—the execution is. This concept doesn't abandon the design identity but **refines it** to serve the audience rather than alienate them. The brutalism becomes a feature ("design-led PM") rather than a barrier.

**Strategic Foundation:**
- Tobias van Schneider uses bold design to filter for fit—confidence as proof
- The brutalist aesthetic can signal "I care about craft" to design-literate teams
- Not everyone needs to like the aesthetic; the right people should love it

**From Gap Analysis:**
> "Option A: Lean into the contradiction—own the 'designer who speaks business' angle"

This concept embraces that option with refinements that reduce friction.

**Competitive Positioning:** Move toward Tobias territory—but with more warmth. Bold AND approachable, not bold OR approachable.

---

### Visual Elements

#### Color Palette

| Element | Current | Proposed | Rationale |
|---------|---------|----------|-----------|
| **Primary Background** | Cream (#FFFCF2) | Kept as-is | Signature warmth |
| **Borders** | Full black (#000000) | **Softened black (#1A1A1A)** | 95% intensity, less harsh |
| **Decorative Shapes** | 70-80% opacity | **25-35% opacity** | Present but ambient |
| **Accent Colors** | Current palette | Kept as-is | Already strong |
| **New: Depth Layer** | N/A | **Shadow gradient** | Adds dimensionality |

**Key Change:** Soften the harsh contrasts while maintaining the brutalist DNA.

#### Typography

| Element | Specification | Change from Current |
|---------|---------------|---------------------|
| **Headlines** | Space Grotesk 800-900 | **Increased** weight for impact |
| **Body** | Inter 400 | +0.5 line-height for readability |
| **Code** | JetBrains Mono | Unchanged |
| **New: Display** | Space Grotesk 300 | Light weight for contrast |

**Key Change:** More typographic range—ultra bold headlines + light subheads.

#### Layout

| Element | Current | Proposed | Rationale |
|---------|---------|----------|-----------|
| **Hero** | Floating shapes + text | **Flagship typography + subtle motion** | Make type the star |
| **Borders** | 4-6px uniform | **Variable: 4px standard, 8px accents** | More intentional hierarchy |
| **Shadows** | Hard 8px | **Layered: 4px + 8px (subtle)** | Adds depth without losing edge |
| **Cards** | All equal treatment | **Featured card with larger border** | Create visual priorities |

#### Imagery Style

**Photography:**
- **Style:** High contrast, slightly desaturated
- **Treatment:** Brutalist frame (thick black border)
- **Effect:** Photo feels designed, not generic

**New: Pattern System**
- Create 2-3 proprietary patterns (not generic grids)
- Use at 10-15% opacity as section backgrounds
- Reference: Tobias's color blocks but more subtle

**Illustration:**
- If adding diagrams: Thick stroke, limited colors
- No gradients, no soft edges
- Everything stays on-brand

#### Signature Element

**THE MATTIA MONOGRAM**

Evolve the existing "M" into a bolder mark:
```
 ███╗   ███╗
 ████╗ ████║
 ██╔████╔██║ ← Refined "M" with brutalist DNA
 ██║╚██╔╝██║
 ██║ ╚═╝ ██║
 ╚═╝     ╚═╝
```

Treatment:
- Used as watermark (5% opacity) on sections
- Animated: Builds on page load
- Featured: Header fixed position

---

### Emotional Target

**Primary Emotion:** Intrigued respect

**Emotional Journey:**
```
Landing:    "Wow, this is distinctive" (ATTENTION)
     ↓
Scrolling:  "There's intention behind every choice" (RESPECT)
     ↓
Reading:    "This person has both style AND substance" (INTRIGUE)
     ↓
Action:     "I want to work with someone who gets design AND business" (DESIRE)
```

**Target Feeling:**
> "This site has personality—this person clearly knows design AND takes it seriously."

**Contrast with Current:**
- Current: "Too design-y for a PM" (skepticism)
- Target: "Design-led PM for design-forward teams" (fit signal)

---

### Implementation Notes

#### Phase 1: Softening (Week 1)

1. **Reduce decorative element opacity**
   - All floating shapes: 70-80% → 25-35%
   - Maintain presence, reduce competition

2. **Soften border color**
   - Change from #000000 to #1A1A1A
   - Subtle but meaningful reduction in harshness

3. **Add headshot with brutalist treatment**
   - Photo with 6px black border
   - Shadow offset for 3D effect
   - Maintains aesthetic while adding human element

#### Phase 2: Evolution (Week 2-3)

4. **Create layered shadow system**
   - Primary shadow: 4px offset
   - Secondary shadow: 8px offset at 30% opacity
   - Creates depth while keeping brutalist edge

5. **Develop proprietary pattern**
   - Geometric pattern based on M monogram
   - Use as subtle section backgrounds
   - Differentiator from generic brutalism

6. **Typography refinement**
   - Increase headline weight for impact
   - Add light-weight subhead style for contrast
   - More typographic hierarchy = more professional

#### Phase 3: Ownership (Week 4+)

7. **Animated M monogram**
   - Builds on page load
   - Becomes memorable signature
   - Used across touchpoints

8. **"Design-led PM" messaging integration**
   - Adjust positioning slightly to match aesthetic
   - Target: Design-forward companies, product-led teams
   - The aesthetic becomes a qualification signal

---

### Risk/Benefit Analysis

#### Benefits

| Benefit | Impact | Confidence |
|---------|--------|------------|
| **Maintains brand continuity** | Low disruption to existing identity | High |
| **Faster implementation** | Evolution, not revolution | High |
| **Distinctive positioning** | "Design-led PM" is ownable | Medium |
| **Filters for fit** | Right clients will self-select | Medium |
| **Design community appeal** | May generate referrals from designers | Medium |

#### Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Narrows target audience** | Medium-High | Accept trade-off; quality over quantity |
| **Still alienates non-designers** | Medium | Softening reduces friction |
| **Doesn't fully close gap** | Medium | Improvement, not transformation |
| **May still read as "designer portfolio"** | Medium | Messaging shift required |

#### Trade-off Summary

**Gives up:** Broadest possible audience appeal
**Gains:** Design-forward client filter, maintained identity, faster implementation
**Net:** +1 to +2 points on visual-verbal alignment; strong differentiation for specific segment

---

## Concept Comparison & Recommendation

### Side-by-Side Analysis

| Criterion | The Bridge | The Trusted Expert | Refined Brutal |
|-----------|------------|-------------------|----------------|
| **Gap Closure** | +3 to +4 | +2 to +3 | +1 to +2 |
| **Implementation Effort** | High | Medium | Low-Medium |
| **Risk Level** | Medium | Low | Low-Medium |
| **Audience Fit** | Broadest | Business-focused | Design-forward |
| **Identity Shift** | Major | Moderate | Minor |
| **Memorability** | High (Bridge metaphor) | Medium (Human face) | High (Bold aesthetic) |
| **Trust Building** | Through demonstration | Through social proof | Through confidence |

### When to Choose Each Concept

#### Choose "The Bridge" if:
- Primary goal is closing the visual-verbal gap entirely
- Target audience is non-designer decision-makers (CTOs, product leads)
- Willing to invest in significant redesign
- Have or can create "before/after" transformation content
- Want universal accessibility over niche appeal

#### Choose "The Trusted Expert" if:
- Primary goal is immediate trust and conversion
- Have testimonials or can gather them quickly
- Target audience values credentials over aesthetics
- Want lowest-risk implementation path
- Prioritize substance over style

#### Choose "Refined Brutal" if:
- Want to maintain current brand identity
- Target audience includes design-forward teams
- Comfortable with narrower but higher-fit audience
- Have limited time/resources for major redesign
- The aesthetic is personally important to Mattia

### Strategic Recommendation

**Primary Recommendation: Start with Concept 2 elements, evolve toward Concept 1**

**Rationale:**
1. **Quick wins matter:** Adding human presence and reducing decorative noise (Concept 2) provides immediate improvement with low risk
2. **Content dependency:** The Bridge concept requires transformation proof content that may need time to develop
3. **Iterative approach:** Begin with trust signals, test response, then expand to proof-in-design approach

**Implementation Roadmap:**

```
WEEK 1-2: Trusted Expert Foundation
├── Add professional headshot
├── Reduce decorative opacity (70% → 25%)
├── Create trust bar component
└── Soften borders (#000 → #1A1A1A)

WEEK 3-4: Bridge Elements
├── Design signature Bridge element
├── Create one Before/After section
├── Increase section spacing
└── Add testimonial if available

WEEK 5+: Full Bridge Execution
├── Implement Bridge visual system
├── Add transformation case study
├── Develop proof-in-design components
└── Complete visual-verbal alignment
```

This hybrid approach delivers:
- **Immediate improvement** through human presence and trust signals
- **Long-term transformation** through proof-in-design system
- **Risk mitigation** through phased implementation
- **Identity preservation** through gradual evolution

---

## Appendix: Visual Concept Mood Boards

### Concept 1: "The Bridge"

**Color Story:**
```
[Chaos]                          [Clarity]
Multi-color scattered     →      Electric Blue focused
Noise                            Signal
Complexity                       Simplicity
```

**Reference Sites:**
- Josh W. Comeau (proof-in-design approach)
- Stripe Documentation (clarity hierarchy)
- Linear.app (modern neobrutalism, softened)

**Key Visual Keywords:**
```
Clean | Clear | Demonstrated | Proven | Transformative
```

---

### Concept 2: "The Trusted Expert"

**Color Story:**
```
Warm White + Deep Blue + Soft Gold
= Professional warmth, earned authority
```

**Reference Sites:**
- Sara Soueidan (substance over style)
- Dan Mall (social proof integration)
- Nielsen Norman Group (expertise presentation)

**Key Visual Keywords:**
```
Trustworthy | Human | Credible | Approachable | Proven
```

---

### Concept 3: "Refined Brutal"

**Color Story:**
```
Cream + Softened Black + Bold Accents
= Edge with warmth, intentional boldness
```

**Reference Sites:**
- Tobias van Schneider (confident boldness)
- Pentagram partners (refined brutalism)
- Readymag (designed design)

**Key Visual Keywords:**
```
Bold | Intentional | Distinctive | Confident | Crafted
```

---

## Next Steps

With these three visual concepts defined, the next subtasks are:

1. **Subtask 4.3:** Reconstruct positioning statement for each concept direction
2. **Subtask 5.1:** Compile Executive Summary synthesizing all audit findings
3. **Implementation:** Choose concept direction and begin phased execution

**Decision Required:** Which concept direction aligns best with Mattia's business goals and personal brand values?

---

*Document generated as part of Art Director Brand Audit - Subtask 4.2*
*Approved for positioning statement development (Subtask 4.3)*

---

*End of 3 Visual Concepts Document*
