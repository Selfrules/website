# E-E-A-T Trustworthiness Signals Assessment - selfrules.org

**Audit Date:** 2026-01-26
**Subtask ID:** subtask-3-4 (E-E-A-T Assessment - Phase 3)
**Auditor:** Claude (SEO Consultant Skill)

---

## Executive Summary

selfrules.org has **moderate-to-weak Trustworthiness signals** with critical compliance gaps. While HTTPS is active and the author biography is comprehensive, essential trust elements are missing: **Privacy Policy returns 404 (GDPR violation risk)**, Terms of Service returns 404, no direct contact information (email/phone), testimonials lack verification, and security headers only protect API routes. This represents a significant compliance and credibility gap that requires immediate attention.

**Overall Trustworthiness Score: 2/5**

| Category | Score | Max | Assessment |
|----------|-------|-----|------------|
| HTTPS & Security | 3 | 5 | Active HTTPS, missing HSTS, partial security headers |
| Contact Information | 2 | 5 | Booking CTA only, no email/phone/address |
| About/Author Info | 4 | 5 | Strong bio, missing photo and social links |
| Legal Pages | 1 | 5 | **CRITICAL:** Privacy & Terms both 404 |
| Disclosure Practices | 1 | 5 | No disclosures present |
| Business Transparency | 2 | 5 | Employer named, no business registration |
| Testimonial Verification | 2 | 5 | Present but unverifiable |

---

## HTTPS & Security Status

### HTTPS Verification

| Check | Status | Evidence |
|-------|--------|----------|
| HTTPS Active | ✅ Pass | Site loads over `https://selfrules.org` |
| HTTP Redirect | ✅ Pass | Vercel handles redirect |
| Valid SSL Certificate | ✅ Pass | WebFetch successful |
| Canonical URLs Use HTTPS | ✅ Pass | `metadataBase: new URL('https://selfrules.org')` |
| Mixed Content | ✅ Pass | No HTTP resources detected |

### HTTPS Gaps

| Check | Status | Impact |
|-------|--------|--------|
| HSTS Header | ❌ Missing | Protocol downgrade attacks possible |
| HSTS Preload | ❌ Not submitted | Browsers won't enforce HTTPS before first visit |
| Explicit HTTP→HTTPS Config | ⚠️ Implicit | Relies entirely on Vercel infrastructure |

### Security Headers Audit

| Header | API Routes | Main Pages | Status |
|--------|------------|------------|--------|
| X-Frame-Options | ✅ DENY | ❌ Missing | 🔴 Critical |
| X-Content-Type-Options | ✅ nosniff | ❌ Missing | 🔴 Critical |
| Referrer-Policy | ✅ origin-when-cross-origin | ❌ Missing | 🟡 Medium |
| Strict-Transport-Security | ❌ Missing | ❌ Missing | 🔴 Critical |
| Content-Security-Policy | ❌ Missing | ❌ Missing | 🔴 Critical |

**Critical Finding:** Security headers configured in `next.config.mjs` only apply to `/api/:path*` routes. Main pages (homepage, blog, etc.) have **zero security headers**, leaving users vulnerable to clickjacking and MIME-type attacks.

### HTTPS & Security Score: 3/5

**Breakdown:**
- HTTPS Active: +1.5
- Valid Certificate: +0.5
- Canonical URLs: +0.5
- Missing HSTS: -0.5
- Partial Security Headers: -1.0

---

## Contact Information Assessment

### Contact Methods Available

| Contact Type | Present | Details | Trust Signal |
|--------------|---------|---------|--------------|
| Email Address | ❌ No | Not displayed on site | 🔴 Missing |
| Phone Number | ❌ No | Not displayed on site | 🔴 Missing |
| Physical Address | ❌ No | Only "Italia 🇮🇹" | 🔴 Missing |
| Contact Form | ⚠️ Partial | "Ask Me Anything" section | 🟡 Indirect |
| Calendar Booking | ✅ Yes | "Prenota una call" CTAs | ✅ Good |
| Social Media Links | ⚠️ Partial | Twitter @mattiadluca in metadata, no LinkedIn on site | 🟡 Incomplete |

### Contact Information Analysis

**What's Present:**
1. **Booking CTAs:** Multiple "Prenota una call" / "Book a call" buttons
2. **Location Indicator:** "Italia 🇮🇹 | Lavoro ovunque 🌍" (Italy-based, works globally)
3. **Contact Form:** "Ask Me Anything" section with form submission

**What's Missing:**
1. **Direct Email:** No `hello@selfrules.org` or similar
2. **Phone Number:** No contact number (even for business inquiries)
3. **Physical Address:** No office/business address
4. **LinkedIn Profile Link:** Not linked from website (exists but not discoverable)

### Impact on Trust

| Gap | Trust Impact | Business Impact |
|-----|--------------|-----------------|
| No email | Users can't verify identity | Cold inquiries impossible |
| No phone | Reduced credibility for consulting | Emergency contact unavailable |
| No address | Can't verify business location | Legal entity unclear |
| No LinkedIn | Can't verify professional history | Social proof hidden |

### Contact Information Score: 2/5

**Breakdown:**
- Booking system: +1.0
- Contact form: +0.5
- Location indicator: +0.25
- Missing email: -0.75
- Missing phone: -0.5
- Missing address: -0.5

---

## About Page / Author Information

### Author Identity Signals

| Signal | Present | Details | Quality |
|--------|---------|---------|---------|
| Full Name | ✅ Yes | "Mattia Filippo De Luca" | ✅ Complete |
| Professional Title | ✅ Yes | "Product Manager" | ✅ Clear |
| Photo/Headshot | ❌ No | Text-only presentation | 🔴 Missing |
| Current Employer | ✅ Yes | QubicaAMF (2023-present) | ✅ Named |
| Career History | ✅ Yes | 13-year timeline documented | ✅ Detailed |
| Certifications | ✅ Yes | 6+ from recognized bodies | ✅ Strong |
| LinkedIn Link | ❌ No | Profile exists (it.linkedin.com/in/selfrules) but not linked | 🔴 Missing |
| GitHub Link | ⚠️ Metadata | Exists but not prominently displayed | 🟡 Partial |

### Career Timeline Documented

| Period | Company | Role | Verification |
|--------|---------|------|--------------|
| 2023-present | QubicaAMF | Product Manager | ✅ Verifiable company |
| 2020-2023 | ActiveProspect | Product Owner | ✅ Verifiable company |
| 2016-2020 | FLOWING | Designer & Developer | ✅ Named agency |
| 2012-2018 | Selfrules | Founder | ✅ Self-owned |

### Certifications Listed

| Certification | Issuer | Year | Verification Link |
|---------------|--------|------|-------------------|
| Product Knowledge Professional | Product Compass | 2024 | ❌ Not linked |
| AI for Product | Reforge | 2024 | ❌ Not linked |
| Product Leader | Product School | 2023/2025 | ❌ Not linked |
| Product Marketing | Product Marketing Alliance | 2023 | ❌ Not linked |
| Google PM Specialization | Google/Coursera | 2022/2023 | ❌ Not linked |
| Certified ScrumMaster | Scrum Alliance | 2019/2021 | ❌ Not linked |
| Certified Product Owner | Scrum Alliance | 2020/2021 | ❌ Not linked |

**Gap:** All certifications are text-only listings without Credly badges or verification links.

### About/Author Score: 4/5

**Breakdown:**
- Comprehensive bio: +1.5
- Career timeline: +1.0
- Certifications: +0.75
- Current employer: +0.5
- Missing photo: -0.5
- Missing LinkedIn link: -0.25

---

## Legal Pages Assessment

### Privacy Policy

| Check | Status | URL Tested | Result |
|-------|--------|------------|--------|
| Page Exists | ❌ **FAIL** | `/privacy` | 404 Not Found |
| Locale Version (IT) | ❌ **FAIL** | `/it/privacy` | 404 Not Found |
| Locale Version (EN) | ❌ **FAIL** | `/en/privacy` | 404 Not Found |
| Footer Link Present | ✅ Yes | "Privacy" in footer | Links to 404 |

**CRITICAL COMPLIANCE ISSUE:**

> **GDPR Violation Risk:** Under GDPR Article 13, websites collecting any personal data (including contact forms, analytics, cookies) MUST provide an accessible privacy policy. The footer links to a privacy page that doesn't exist, which is a **direct compliance violation**.

**Impact:**
- **Legal:** Potential fines under GDPR (up to €20M or 4% of annual turnover)
- **Trust:** Users clicking "Privacy" encounter broken page
- **SEO:** Broken internal links waste crawl budget

### Terms of Service

| Check | Status | URL Tested | Result |
|-------|--------|------------|--------|
| Page Exists | ❌ **FAIL** | `/terms` | 404 Not Found |
| Locale Version (IT) | ❌ **FAIL** | `/it/terms` | Assumed 404 |
| Locale Version (EN) | ❌ **FAIL** | `/en/terms` | Assumed 404 |
| Footer Link Present | ✅ Yes | "Termini" in footer | Links to 404 |

**Business Impact:**
- No legal protection for consulting services
- No liability limitations documented
- No service terms for potential clients

### Legal Pages Score: 1/5

**Breakdown:**
- Footer links present: +0.25
- Privacy page 404: -1.5
- Terms page 404: -1.0
- GDPR compliance risk: -0.75

---

## Disclosure Practices

### Transparency Signals

| Disclosure Type | Present | Status |
|-----------------|---------|--------|
| Conflict of Interest | ❌ No | No disclosure statement |
| AI Content Disclosure | ❌ No | No AI usage disclosure |
| Affiliate Relationships | ❌ No | No affiliate disclosure |
| Sponsored Content | ❌ No | No sponsored content policy |
| Data Collection Notice | ❌ No | Privacy policy missing |
| Cookie Policy | ❌ No | Not present |
| Analytics Disclosure | ❌ No | Umami tracking undisclosed |

### Missing Disclosures Analysis

**Why This Matters:**

1. **AI Content:** Site may use AI for content generation (indicated by "Auto-Claude" workflow). No disclosure could raise trust concerns if discovered.

2. **Analytics:** Umami Analytics is integrated (GDPR-compliant, cookie-free), but users aren't informed about any data collection.

3. **Business Relationships:** No disclosure of:
   - Whether testimonials are paid/solicited
   - Whether consulting recommendations involve affiliates
   - Relationship with named companies

### Disclosure Practices Score: 1/5

---

## Business Transparency

### Business Registration Information

| Information | Present | Details |
|-------------|---------|---------|
| Company Name | ⚠️ Partial | "Selfrules" mentioned as past company |
| VAT/P.IVA Number | ❌ No | Not displayed |
| Registered Address | ❌ No | Not displayed |
| Company Registration | ❌ No | Not referenced |
| Chamber of Commerce | ❌ No | Not referenced |

### Current Employment vs. Business

| Entity | Status | Clarity |
|--------|--------|---------|
| QubicaAMF | ✅ Current employer | Clear |
| Consulting Services | ⚠️ Offered | Unclear if separate entity |
| "Selfrules" | ⚠️ Past/Current | Was agency 2012-2018, now personal brand? |

**Ambiguity:** It's unclear whether consulting services are:
- Freelance work under personal name
- A registered sole proprietorship (ditta individuale)
- A company (SRL/SRLS)

This matters for Italian law and invoice legitimacy.

### Business Transparency Score: 2/5

---

## Testimonial Verification

### Testimonials Present

| Name | Title/Company | Verifiable | Notes |
|------|---------------|------------|-------|
| Sarah Chen | Founder & CEO, TechFlow AI | ⚠️ Unverified | Company not found in search |
| Marco Bianchi | PM, FinanceHub | ⚠️ Generic name | Common Italian name |
| Alex Kumar | Tech Lead, DataStream | ⚠️ Unverified | Company not verified |
| Elena Rossi | Senior Designer, Creative Labs | ⚠️ Generic name | Common Italian name |
| Livia L. | Not specified | ❌ Anonymous | Initial only |
| Andrea F. | Not specified | ❌ Anonymous | Initial only |
| Carlo T. | Not specified | ❌ Anonymous | Initial only |

### Testimonial Verification Issues

| Issue | Count | Concern Level |
|-------|-------|---------------|
| No LinkedIn links | All | 🔴 High |
| No company verification | All | 🔴 High |
| Generic/common names | 4+ | 🟡 Medium |
| Initials only | 3+ | 🔴 High |
| No photos | All | 🟡 Medium |

**Risk Assessment:** The combination of:
- Generic names (Marco Bianchi, Elena Rossi)
- Unverifiable companies (TechFlow AI, FinanceHub)
- Missing external links

...raises questions about testimonial authenticity. This is a **trust red flag** that sophisticated visitors may notice.

### Testimonial Verification Score: 2/5

---

## Trustworthiness Score Summary

### Final Score: 2/5

**Score Breakdown:**

| Component | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| HTTPS & Security | 20% | 3/5 | 0.60 |
| Contact Information | 15% | 2/5 | 0.30 |
| About/Author Info | 15% | 4/5 | 0.60 |
| Legal Pages | 20% | 1/5 | 0.20 |
| Disclosure Practices | 10% | 1/5 | 0.10 |
| Business Transparency | 10% | 2/5 | 0.20 |
| Testimonial Verification | 10% | 2/5 | 0.20 |
| **Total** | **100%** | | **2.20/5 → 2/5** |

### Score Interpretation:

- **5/5:** Full transparency, complete legal compliance, verified trust elements
- **4/5:** Strong trust signals with minor gaps
- **3/5:** Basic trust elements present, some gaps
- **2/5:** Significant trust gaps, compliance issues ← **Current**
- **1/5:** Major trust concerns, missing critical elements

---

## Complete E-E-A-T Assessment

### Final E-E-A-T Scores

| Component | Score | Status | Gap from Target (4/5) |
|-----------|-------|--------|----------------------|
| Experience | 4/5 | ✅ Strong | On target |
| Expertise | 4/5 | ✅ Strong | On target |
| Authoritativeness | 2/5 | ❌ Critical gap | -2 points |
| **Trustworthiness** | **2/5** | ❌ Critical gap | -2 points |

### E-E-A-T Visual Summary

```
Experience        [████████░░] 4/5 - Strong personal narrative, minor media gaps
Expertise         [████████░░] 4/5 - Deep knowledge, missing verification links
Authoritativeness [████░░░░░░] 2/5 - No backlinks, minimal external presence
Trustworthiness   [████░░░░░░] 2/5 - Missing legal pages, partial contact info
```

**Overall E-E-A-T Score: 3/5** (Average: 3.0)

### Key Insight

> The site has **strong first-party content** (Experience + Expertise at 4/5) but **weak third-party validation** (Authoritativeness + Trustworthiness at 2/5). This imbalance limits ranking potential for competitive keywords and may raise red flags for careful visitors.

---

## Critical Issues Summary

### 🔴 Critical (Fix Within 1 Week)

| Issue | Impact | Compliance Risk | Effort |
|-------|--------|-----------------|--------|
| Privacy Policy 404 | GDPR violation | 🔴 Legal | 2-4 hours |
| Terms of Service 404 | Legal exposure | 🟡 Medium | 2-4 hours |
| Dead footer resource links | Poor UX, SEO | 🟢 Low | 1 hour |

### 🟡 High Priority (Fix Within 2 Weeks)

| Issue | Impact | Trust Impact | Effort |
|-------|--------|--------------|--------|
| No email contact | Credibility gap | Medium | 15 minutes |
| No LinkedIn link | Social proof hidden | Medium | 15 minutes |
| Security headers partial | User protection | Medium | 1 hour |
| No HSTS header | Protocol security | Low | 30 minutes |

### 🟢 Medium Priority (Fix Within 30 Days)

| Issue | Impact | Trust Impact | Effort |
|-------|--------|--------------|--------|
| No professional headshot | Identity unclear | Medium | 1-2 hours |
| Testimonials unverifiable | Credibility question | Medium | 1-2 weeks |
| No disclosure statements | Transparency gap | Low | 2-4 hours |
| No Credly badge links | Credential verification | Low | 2-4 hours |

---

## Improvement Roadmap for Solo Founder

### Week 1: Critical Compliance Fixes

**Must Complete:**

1. **Create Privacy Policy Page**
   - Create `/app/[locale]/privacy/page.tsx`
   - Include: Data collection, cookies, GDPR rights, contact for inquiries
   - Effort: 2-4 hours

2. **Create Terms of Service Page**
   - Create `/app/[locale]/terms/page.tsx`
   - Include: Service terms, liability, governing law
   - Effort: 2-4 hours

3. **Fix Dead Resource Links**
   - Remove or create destinations for: Tools, Design resources, Tech stack, Newsletter
   - Effort: 1 hour

**Expected Score Improvement:** 2/5 → 2.5/5

### Week 2: Contact & Security

1. **Add Contact Email**
   - Display: `hello@selfrules.org` or similar
   - Location: Footer, Contact section
   - Effort: 15 minutes

2. **Add LinkedIn Profile Link**
   - Location: Footer social icons, About section
   - Effort: 15 minutes

3. **Expand Security Headers**
   - Change `source: '/api/:path*'` to `source: '/(.*)'`
   - Add HSTS header
   - Effort: 1 hour

**Expected Score Improvement:** 2.5/5 → 3.0/5

### Week 3-4: Trust Building

1. **Add Professional Headshot**
   - Location: Hero section or About
   - Effort: 1-2 hours (photo + implementation)

2. **Verify Testimonials**
   - Request permission for full names + company links
   - Or replace with video testimonials
   - Effort: 1-2 weeks

3. **Add Credly Badge Embeds**
   - Link Scrum Alliance certifications
   - Effort: 2-4 hours

**Expected Score Improvement:** 3.0/5 → 3.5/5

### Month 2: Transparency

1. **Create Cookie/Privacy Notice**
   - Disclose Umami analytics usage
   - Effort: 2-4 hours

2. **Add Business Information**
   - Clarify consulting business structure
   - Add VAT number if applicable
   - Effort: 1-2 hours

3. **Add Disclosure Statements**
   - AI content disclosure (if applicable)
   - Testimonial disclosure
   - Effort: 1-2 hours

**Expected Score Improvement:** 3.5/5 → 4.0/5

---

## Competitive Trust Benchmark

### How Trustworthiness Compares:

| Competitor Type | Typical Score | selfrules.org |
|-----------------|---------------|---------------|
| Hobby/personal blog | 1-2/5 | - |
| New freelancer site | 2/5 | **2/5** ← Current |
| Established consultant | 3-4/5 | Target |
| Agency/company | 4-5/5 | - |

### What Competitors at 4/5+ Have:

1. **Complete legal pages** (Privacy, Terms, Cookie Policy)
2. **Direct contact info** (Email + Phone)
3. **Verifiable testimonials** (LinkedIn links, video)
4. **Professional photos** (Headshot, team)
5. **Business registration** (VAT, address)
6. **Transparency** (Disclosures, policies)

---

## Appendix: E-E-A-T Trustworthiness Definition

From Google's Search Quality Evaluator Guidelines:

> "Trustworthiness: Consider the accuracy, honesty, safety, and reliability of the page."

### What Google Looks For:

1. **Contact information** appropriate to the website type
2. **Legal pages** (Privacy Policy, Terms of Service)
3. **Transparent authorship** (who created the content)
4. **Honest representation** (claims match evidence)
5. **Security** (HTTPS, safe browsing)
6. **Clear disclosure** of any conflicts or sponsored content

### Why Trustworthiness Matters for Personal Brand:

- Personal brands offer **YMYL-adjacent services** (career/business impact)
- Consulting requires **high trust** for paid engagements
- Missing legal pages signal **unprofessional operation**
- Unverifiable claims **undermine expertise signals**

---

## Verification Method

This assessment was performed by:
- WebFetch analysis of https://selfrules.org trust elements
- WebFetch verification of /privacy and /terms pages (404 confirmed)
- Cross-reference with previous technical audit (subtask-1-4)
- Cross-reference with internal linking audit (subtask-2-4)
- Cross-reference with E-E-A-T assessments (subtasks 3-1, 3-2, 3-3)
- Comparison against E-E-A-T framework from seo-consultant skill

---

*Assessment completed as part of SEO Consultant Audit - E-E-A-T Assessment Phase*
