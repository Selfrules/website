# WORKFLOW DETTAGLIATO - Implementazione Homepage Content

**Data**: 2025-11-09
**Source**: `claudedocs/homepage_content_complete.md`
**Target**: `messages/it.json` + vari componenti

## STRATEGIA

1. **Copywriter** estrae ESATTAMENTE il testo da `homepage_content_complete.md`
2. **Frontend** applica il contenuto nelle sezioni corrette di `messages/it.json`
3. **Nessuna invenzione**: Solo contenuto dal file sorgente
4. **Dettagli critici**: Skills, certifications, badges, subtitle parts - tutti i dettagli

---

## SEZIONE 1: HERO

### Source (homepage_content_complete.md lines 7-34)

```markdown
## 1. HERO SECTION

### Main Headline (5 lines)
Ho fallito come designer.
Poi come developer.
Ora sono un PM che sa davvero cosa costruire.

### Subtitle (conversational, relatable)
Perché? Perché ho imparato che il prodotto perfetto non esiste.
Esiste solo quello che risolve problemi reali per persone reali.
```

### Target: messages/it.json

**Current State:**
```json
"hero": {
  "badge": "PM • DESIGNER • DEV",
  "headline1": "Ho fallito",
  "headline2": "come designer.",
  "headline3": "Poi come developer.",
  "headline4": "Ora sono un PM",
  "headline5": "che sa davvero cosa costruire.",
  "subtitle": "Perché? Perché ho imparato che",
  "subtitleHighlight": "il prodotto perfetto non esiste",
  "subtitleEnd": ". Esiste solo quello che risolve problemi reali per persone reali.",
  "cta": "Parliamone",
  "explore": "Leggi la storia"
}
```

**Actions:**
- ✅ **MANTIENI** - Il contenuto è già corretto e corrisponde al file sorgente
- ✅ **NO CHANGES NEEDED** per Hero section

---

## SEZIONE 2: JOURNEY

### Source (homepage_content_complete.md lines 36-231)

#### Section Header (lines 40-48)

```markdown
**Badge**: Il mio percorso
**Title**: Da zero a Product Manager
**Subtitle**:
La maggior parte dei PM arriva dalla consulenza o dal business.
Io ho fatto design, sviluppo, imprenditoria.
Questo è il mio superpotere: parlo tutte e tre le lingue.
```

#### MILESTONE 1 - Selfrules (lines 52-82)

```markdown
#### MILESTONE 1: Web Designer & Business Owner (2012-2018)
**Company**: Selfrules (la mia agency)
**Role Badge**: Web Designer & Founder

**Opening Hook**:
Ho aperto un'agenzia a 25 anni. Pensavo di sapere tutto.
Disegnavo siti bellissimi. Gestivo clienti. Fatturavo.
E ho scoperto sulla mia pelle tre verità scomode:

**The Three Truths (achievements as lessons)**:
1. Design bellissimo che nessuno capisce come usare è solo arte, non prodotto
2. Mockup perfetto che non si può sviluppare è tempo sprecato
3. Il mio fallimento più costoso: 3 settimane su un design tecnicamente impossibile nel budget del cliente

**The Turning Point**:
Non ci fu un momento drammatico. Solo una realizzazione lenta e onesta:
lavorare da solo aveva un limite.

Potevo disegnare siti bellissimi. Gestire clienti. Fatturare.
Ma competere con agenzie che avevano team mentre io ero da solo? Estenuante.

Non volevo più essere "il miglior WebDesigner freelance della zona".
Volevo imparare da chi ne sapeva più di me. Volevo crescere, non solo resistere.

Così decisi di smettere di competere da solo e iniziare a lavorare in un team.

**Skills**: Adobe, Web design, User Research, Business, Client Management
```

#### MILESTONE 2 - Flowing (lines 86-146)

```markdown
#### MILESTONE 2: Design & Development (2016-2019)
**Company**: FLOWING
**Role Badge**: Designer & Developer

**Opening Hook**:
Non più solo wireframe da passare a qualcun altro.
Non più solo codice che qualcuno aveva già progettato.
In Flowing ho iniziato a fare quello che mi sembrava ovvio:
progettare l'esperienza e poi costruirla. Tutto.

**The Formative Project**:
Il progetto che mi ha formato di più?
CliensPiù - un software gestionale avanzato per studi legali.

Non un sito web. Un'applicazione vera, con cui avvocati dovevano lavorare 8 ore al giorno.

Questo cambiava tutto.

**Core Insight**:
Quando progetti qualcosa che le persone useranno quotidianamente per anni,
ogni frizione conta.

Un click in più? Moltiplicalo per 50 volte al giorno, per 3 anni.
Quella dropdown troppo piccola? Diventa frustrante alla ventesima pratica da gestire.

Ho imparato a pensare in flussi lunghi, non in singole schermate.
Come organizzi 500 pratiche legali senza far impazzire nessuno?
Come fai in modo che trovare un documento richieda 3 secondi invece di 3 minuti?

**Real Impact**:
La parte migliore? CliensPiù è ancora in uso oggi.
Dopo anni, funziona.

Questo non succede per caso - succede quando progetti e costruisci
pensando a chi dovrà viverci dentro, non solo a come appare nello screenshot.

Ho scritto codice che ancora oggi gira in produzione.
Ho capito che i dettagli che nessuno nota sono quelli che fanno la differenza.

Il loading spinner durante un caricamento? Dettaglio.
Ma quando manca, la gente clicca due volte. Caricamento duplicato.
Customer support in fiamme. Ripercussioni legali. Casino.
Ecco perché i dettagli contano.

**The Next Evolution**:
Ma c'era ancora un pezzo mancante.
Sapevo COME costruire. Sapevo COME disegnare.
Non sapevo ancora rispondere a: COSA costruire? E PERCHÉ?

**Skills**: React, Node.js, PostgreSQL, Full-stack Development, UX Implementation, System Architecture
```

#### MILESTONE 3 - ActiveProspect (lines 150-181)

```markdown
#### MILESTONE 3: Product Owner (2020-2023)
**Company**: ActiveProspect (B2B SaaS, Lead Generation)
**Role Badge**: Product Owner

**Opening Hook**:
Facevo da ponte tra business e tech.
Traducevo esigenze in funzionalità.
Roadmap. Backlog. Sprint planning.
Ma soprattutto: imparai a dire "no".

**The Hard Lessons**:
Il vero lavoro del Product non è dire "sì" a tutto.
È dire "no" alle cose giuste.

Una roadmap bella non serve a niente se non è allineata al business.
Il feedback degli utenti conta più di qualsiasi opinion di un stakeholder interno.

La lezione più difficile?
Non tutti i problemi vanno risolti con codice.
A volte la soluzione è un video di 3 minuti. O un PDF strutturato meglio.
O semplicemente parlare con il cliente prima di sviluppare.

**Key Achievements**:
- Gestito prodotto B2B SaaS con migliaia di utenti enterprise
- Introdotto framework di prioritizzazione RICE (senza chiamarlo così, solo buon senso)
- Ridotto feature bloat del 40% eliminando "nice to have" dalla roadmap

**Skills**: B2B SaaS, Lead Generation, Agile/Scrum, User Research, SQL, Analytics
**Certifications**: Certified ScrumMaster & Certified Scrum Product Owner (Scrum Alliance 2020), Google PM Specialization (Coursera 2023)
```

#### MILESTONE 4 - QubicaAMF (lines 185-231)

```markdown
#### MILESTONE 4: Product Manager (2023-oggi) - CURRENT
**Company**: QubicaAMF (Enterprise POS & Payments)
**Role Badge**: Product Manager
**Current Indicator**: Badge "Oggi"

**Opening Hook**:
Ora unifico tutto quello che ho imparato.
Design + Sviluppo + Business = Product Management.
Non più silos. Non più traduttori. Solo risultati.

**Real Impact (no bullshit metrics)**:
-12% tempi di pagamento in 6 mesi
Come? Non magia. Solo meno click inutili.
Da 7 passaggi a 3. Testato con 10 utenti reali prima del rollout.

+9% adoption integrazioni piattaforma
Come? Meno PDF di 47 pagine. Più video di 3 minuti.
E soprattutto: documentazione scritta per chi usa il sistema,
non per chi lo ha progettato.

-25% incidenti post-release
Come? Una stanza. Ogni venerdì. Product, Support, Engineering.
40 minuti a parlare di cosa è andato storto nella settimana.
Niente slide. Solo problemi reali e soluzioni pragmatiche.

**Current Work Philosophy**:
Il mio superpotere oggi?
Parlo tre lingue fluentemente:

1. Design Language: "L'utente si blocca qui perché la gerarchia visiva è sbagliata"
2. Developer Language: "Questa feature richiederebbe refactoring di 3 sprint"
3. Business Language: "Questo problema costa €15K/mese in support tickets"

Non serve un traduttore quando sei tu il traduttore.

**Skills**: Product Strategy, Platform Integration, API Design, User Research, Business Case, A/B Testing, Analytics
**Certifications**: AI for Product, Product Leader, Product Marketing Manager (Product School 2025), Product Knowledge Professional (Product Compass 2024)

**End Message (rotated card)**:
12 anni di fallimenti trasformati in esperienza 💪
```

### Target: messages/it.json - Journey Section

**Actions Required:**

1. **UPDATE journey.subtitle**
   ```json
   "subtitle": "La maggior parte dei PM arriva dalla consulenza o dal business. Io ho fatto design, sviluppo, imprenditoria. Questo è il mio superpotere: parlo tutte e tre le lingue."
   ```

2. **UPDATE journey.experiences.designer**
   ```json
   "designer": {
     "date": "2012-2018",
     "company": "Selfrules",
     "role": "Web Designer & Founder",
     "description": "Ho aperto un'agenzia a 25 anni. Pensavo di sapere tutto. Disegnavo siti bellissimi. Gestivo clienti. Fatturavo. E ho scoperto sulla mia pelle tre verità scomode:",
     "achievements": {
       "1": "Design bellissimo che nessuno capisce come usare è solo arte, non prodotto",
       "2": "Mockup perfetto che non si può sviluppare è tempo sprecato",
       "3": "Il mio fallimento più costoso: 3 settimane su un design tecnicamente impossibile nel budget del cliente"
     },
     "turningPoint": "Non ci fu un momento drammatico. Solo una realizzazione lenta e onesta: lavorare da solo aveva un limite. Potevo disegnare siti bellissimi. Gestire clienti. Fatturare. Ma competere con agenzie che avevano team mentre io ero da solo? Estenuante. Non volevo più essere \"il miglior WebDesigner freelance della zona\". Volevo imparare da chi ne sapeva più di me. Volevo crescere, non solo resistere. Così decisi di smettere di competere da solo e iniziare a lavorare in un team.",
     "technologies": {
       "1": "Adobe Creative Suite",
       "2": "Web Design",
       "3": "User Research",
       "4": "Business",
       "5": "Client Management"
     }
   }
   ```

3. **UPDATE journey.experiences.developer**
   ```json
   "developer": {
     "date": "2016-2019",
     "company": "FLOWING",
     "role": "Designer & Developer",
     "description": "Non più solo wireframe da passare a qualcun altro. Non più solo codice che qualcuno aveva già progettato. In Flowing ho iniziato a fare quello che mi sembrava ovvio: progettare l'esperienza e poi costruirla. Tutto.",
     "formativeProject": "Il progetto che mi ha formato di più? CliensPiù - un software gestionale avanzato per studi legali. Non un sito web. Un'applicazione vera, con cui avvocati dovevano lavorare 8 ore al giorno. Questo cambiava tutto.",
     "achievements": {
       "1": "Quando progetti qualcosa che le persone useranno quotidianamente per anni, ogni frizione conta. Un click in più? Moltiplicalo per 50 volte al giorno, per 3 anni. Quella dropdown troppo piccola? Diventa frustrante alla ventesima pratica da gestire.",
       "2": "Ho imparato a pensare in flussi lunghi, non in singole schermate. Come organizzi 500 pratiche legali senza far impazzire nessuno? Come fai in modo che trovare un documento richieda 3 secondi invece di 3 minuti?",
       "3": "CliensPiù è ancora in uso oggi. Dopo anni, funziona. Questo non succede per caso - succede quando progetti e costruisci pensando a chi dovrà viverci dentro, non solo a come appare nello screenshot."
     },
     "impact": "Ho scritto codice che ancora oggi gira in produzione. Ho capito che i dettagli che nessuno nota sono quelli che fanno la differenza. Il loading spinner durante un caricamento? Dettaglio. Ma quando manca, la gente clicca due volte. Caricamento duplicato. Customer support in fiamme. Ripercussioni legali. Casino. Ecco perché i dettagli contano.",
     "nextEvolution": "Ma c'era ancora un pezzo mancante. Sapevo COME costruire. Sapevo COME disegnare. Non sapevo ancora rispondere a: COSA costruire? E PERCHÉ?",
     "technologies": {
       "1": "React",
       "2": "Node.js",
       "3": "PostgreSQL",
       "4": "Full-stack Development",
       "5": "UX Implementation",
       "6": "System Architecture"
     }
   }
   ```

4. **UPDATE journey.experiences.po**
   ```json
   "po": {
     "date": "2020-2023",
     "company": "ActiveProspect",
     "role": "Product Owner",
     "description": "Facevo da ponte tra business e tech. Traducevo esigenze in funzionalità. Roadmap. Backlog. Sprint planning. Ma soprattutto: imparai a dire \"no\".",
     "achievements": {
       "1": "Il vero lavoro del Product non è dire \"sì\" a tutto. È dire \"no\" alle cose giuste.",
       "2": "Una roadmap bella non serve a niente se non è allineata al business. Il feedback degli utenti conta più di qualsiasi opinion di un stakeholder interno.",
       "3": "La lezione più difficile? Non tutti i problemi vanno risolti con codice. A volte la soluzione è un video di 3 minuti. O un PDF strutturato meglio. O semplicemente parlare con il cliente prima di sviluppare."
     },
     "keyAchievements": {
       "1": "Gestito prodotto B2B SaaS con migliaia di utenti enterprise",
       "2": "Introdotto framework di prioritizzazione RICE (senza chiamarlo così, solo buon senso)",
       "3": "Ridotto feature bloat del 40% eliminando \"nice to have\" dalla roadmap"
     },
     "technologies": {
       "1": "B2B SaaS",
       "2": "Lead Generation",
       "3": "Agile/Scrum",
       "4": "User Research",
       "5": "SQL",
       "6": "Analytics"
     },
     "certifications": {
       "1": "Certified ScrumMaster (Scrum Alliance 2020)",
       "2": "Certified Scrum Product Owner (Scrum Alliance 2020)",
       "3": "Google PM Specialization (Coursera 2023)"
     }
   }
   ```

5. **UPDATE journey.experiences.pm**
   ```json
   "pm": {
     "date": "2023-oggi",
     "company": "QubicaAMF",
     "role": "Product Manager",
     "description": "Ora unifico tutto quello che ho imparato. Design + Sviluppo + Business = Product Management. Non più silos. Non più traduttori. Solo risultati.",
     "achievements": {
       "1": "-12% tempi di pagamento in 6 mesi. Come? Non magia. Solo meno click inutili. Da 7 passaggi a 3. Testato con 10 utenti reali prima del rollout.",
       "2": "+9% adoption integrazioni piattaforma. Come? Meno PDF di 47 pagine. Più video di 3 minuti. E soprattutto: documentazione scritta per chi usa il sistema, non per chi lo ha progettato.",
       "3": "-25% incidenti post-release. Come? Una stanza. Ogni venerdì. Product, Support, Engineering. 40 minuti a parlare di cosa è andato storto nella settimana. Niente slide. Solo problemi reali e soluzioni pragmatiche."
     },
     "philosophy": {
       "intro": "Il mio superpotere oggi? Parlo tre lingue fluentemente:",
       "1": "Design Language: \"L'utente si blocca qui perché la gerarchia visiva è sbagliata\"",
       "2": "Developer Language: \"Questa feature richiederebbe refactoring di 3 sprint\"",
       "3": "Business Language: \"Questo problema costa €15K/mese in support tickets\"",
       "conclusion": "Non serve un traduttore quando sei tu il traduttore."
     },
     "technologies": {
       "1": "Product Strategy",
       "2": "Platform Integration",
       "3": "API Design",
       "4": "User Research",
       "5": "Business Case",
       "6": "A/B Testing",
       "7": "Analytics"
     },
     "certifications": {
       "1": "AI for Product (Product School 2025)",
       "2": "Product Leader (Product School 2025)",
       "3": "Product Marketing Manager (Product School 2025)",
       "4": "Product Knowledge Professional (Product Compass 2024)"
     }
   }
   ```

6. **VERIFY journey.skills** (già corretto)
   ```json
   "skills": "SKILLS"
   ```

7. **VERIFY journey.certifications** (già corretto)
   ```json
   "certifications": "CERTIFICAZIONI"
   ```

8. **UPDATE journey.endMessage**
   ```json
   "endMessage": "12 anni di fallimenti trasformati in esperienza"
   ```

---

## SEZIONE 3: COSA STO FACENDO (What I'm Up To)

### Source (homepage_content_complete.md lines 235-293)

```markdown
## 3. COSA STO FACENDO (What I'm Up To)

### Section Header
**Badge**: What I'm doing now
**Title**: What I'm up to
**Subtitle**:
Una finestra sulla mia vita professionale in real-time.
Niente LinkedIn bullshit. Solo cosa sto facendo davvero.

### Card 1: Current Work (Blue - Electric Blue accent)
**Icon**: Briefcase
**Title**: Lavoro attuale

**Content**:
Product Manager @ QubicaAMF

Mi occupo di integrazioni di pagamento e visione di prodotto.

Come? Ascoltando chi usa il sistema ogni giorno
invece di fare meeting su meeting.

La settimana scorsa: 6 ore di user interviews.
3 insight critici. 1 feature cancellata (perché risolveva il problema sbagliato).
2 quick wins implementate in 1 sprint.

Questo è product management pragmatico.

**Metric Badge**: +2 quick wins (green trending icon)

---

### Card 2: Learning in Public (Pink - accent)
**Icon**: BookOpen
**Title**: Learning in Public

**Content**:
Questa settimana: come l'AI sta cambiando il mio workflow.

Non sostituisce il mio lavoro, lo amplifica.
Il trucco? Sapere cosa delegare e cosa tenere.

Claude scrive la prima bozza delle PRD.
Io la raffino con context che solo un umano ha.

Figma Make genera 20 varianti di mockup.
Io scelgo quella che funziona per gli utenti.

L'AI è il mio junior designer/developer perfetto:
veloce, instancabile, ma serve sempre una guida.
```

### Target: WhatImUpTo.tsx (hardcoded translations)

**Actions Required:**

**UPDATE** `components/sections/WhatImUpTo.tsx` translations object (lines 13-56):

```typescript
const translations = {
  it: {
    badge: 'What I\'m doing now',
    title: 'What I\'m up to',
    description: 'Una finestra sulla mia vita professionale in real-time. ',
    descriptionHighlight: 'Niente LinkedIn bullshit.',
    currentWork: {
      title: 'Lavoro attuale',
      company: 'QubicaAMF',
      description: 'Product Manager @ ',
      detail: 'Mi occupo di integrazioni di pagamento e visione di prodotto. Come? Ascoltando chi usa il sistema ogni giorno invece di fare meeting su meeting. La settimana scorsa: 6 ore di user interviews. 3 insight critici. 1 feature cancellata (perché risolveva il problema sbagliato). 2 quick wins implementate in 1 sprint. Questo è product management pragmatico.',
      metric: '+2 quick wins',
    },
    learning: {
      title: 'Learning in Public',
      thisWeek: 'Questa settimana: ',
      topic: 'come l\'AI sta cambiando il mio workflow.',
      detail: 'Non sostituisce il mio lavoro, lo amplifica. Il trucco? Sapere cosa delegare e cosa tenere. Claude scrive la prima bozza delle PRD. Io la raffino con context che solo un umano ha. Figma Make genera 20 varianti di mockup. Io scelgo quella che funziona per gli utenti. L\'AI è il mio junior designer/developer perfetto: veloce, instancabile, ma serve sempre una guida.',
    },
    spotify: {
      title: 'Now Playing',
    },
  },
  // ... en version
};
```

---

## SEZIONE 4: BLOG

### Source (homepage_content_complete.md lines 297-303)

```markdown
## 4. BLOG SECTION

### Section Note
Content already works well with existing Blog component.
Keep current structure: featured posts, categories, read more CTA.
```

### Target: Blog.tsx (hardcoded translations)

**Actions Required:**

- ✅ **MANTIENI** - Il contenuto esistente è appropriato
- ✅ **NO CHANGES NEEDED** per Blog section

---

## SEZIONE 5: WORK TOGETHER

### Source (homepage_content_complete.md lines 307-473)

```markdown
## 5. LAVORIAMO INSIEME (Work Together)

### Section Header
**Badge**: Let's work together
**Title**: Come possiamo lavorare insieme
**Subtitle**:
Non vendo consulenze. Non vendo ore. Vendo risultati.

Se hai un problema concreto e vuoi qualcuno che capisca
design, tech e business senza bisogno di traduttori, possiamo parlare.

---

### Collaboration Mode 1: Consulenze Strategiche (Blue)
**Icon**: Lightbulb
**Number**: 01
**Title**: Sblocchiamo il tuo prodotto in 90 minuti

**Description**:
Hai un prodotto che non decolla?
Un team che gira in tondo?
Una roadmap che sembra strategica ma non porta risultati?

Prendiamoci 90 minuti.

**Features** (with checkmarks):
✓ Analisi tecno-strategica end-to-end
✓ Roadmap prioritizzata con business impact
✓ Follow-up session dopo 30 giorni

---

### Collaboration Mode 2: Brainstorming Sessions (Pink)
**Icon**: Users
**Number**: 02
**Title**: Dal caos alla chiarezza

**Description**:
Hai un'idea vaga? Un progetto che ancora non ha forma?
Un team che ha bisogno di allineamento?

Trasformiamo il caos in un piano.

**Features**:
✓ Workshop interattivo 2-3 ore
✓ Framework reusable per il team
✓ Documentazione session + next steps

---

### Collaboration Mode 3: Mentorship (Purple)
**Icon**: GraduationCap
**Number**: 03
**Title**: Cresci come Product Manager

**Description**:
Hai già un ruolo in product ma vuoi crescere?
Vuoi transizionare da design/dev a product?

Ti guido nel percorso. No teoria, solo pratica.

**Features**:
✓ 1-on-1 sessions bi-settimanali
✓ Code/design review su progetti reali
✓ Career path personalizzato + accountability

---

### Call to Action Banner (gradient border)
Pronto a costruire qualcosa che conta?

Parliamo. Senza impegno. Senza vendita aggressiva.
Solo una conversazione tra persone che vogliono risolvere problemi reali.

[CTA Button: "Iniziamo la conversazione" → open google calendar widget]
```

### Target: messages/it.json - WorkTogether Section

**Actions Required:**

1. **UPDATE workTogether.badge**
   ```json
   "badge": "Let's work together"
   ```

2. **UPDATE workTogether.subtitle** (split in 2 parts)
   ```json
   "subtitle": {
     "part1": "Non vendo consulenze. Non vendo ore. Vendo risultati.",
     "part2": "Se hai un problema concreto e vuoi qualcuno che capisca design, tech e business senza bisogno di traduttori, possiamo parlare."
   }
   ```

3. **UPDATE workTogether.modes.consulting**
   ```json
   "consulting": {
     "badge": "Consulenze strategiche",
     "title": "Sblocchiamo il tuo prodotto in 90 minuti",
     "description": "Hai un prodotto che non decolla? Un team che gira in tondo? Una roadmap che sembra strategica ma non porta risultati? Prendiamoci 90 minuti.",
     "features": {
       "1": "Analisi tecno-strategica end-to-end",
       "2": "Roadmap prioritizzata con business impact",
       "3": "Follow-up session dopo 30 giorni"
     }
   }
   ```

4. **UPDATE workTogether.modes.brainstorming**
   ```json
   "brainstorming": {
     "badge": "Brainstorming sessions",
     "title": "Dal caos alla chiarezza",
     "description": "Hai un'idea vaga? Un progetto che ancora non ha forma? Un team che ha bisogno di allineamento? Trasformiamo il caos in un piano.",
     "features": {
       "1": "Workshop interattivo 2-3 ore",
       "2": "Framework reusable per il team",
       "3": "Documentazione session + next steps"
     }
   }
   ```

5. **UPDATE workTogether.modes.mentorship**
   ```json
   "mentorship": {
     "badge": "Mentorship",
     "title": "Cresci come Product Manager",
     "description": "Hai già un ruolo in product ma vuoi crescere? Vuoi transizionare da design/dev a product? Ti guido nel percorso. No teoria, solo pratica.",
     "features": {
       "1": "1-on-1 sessions bi-settimanali",
       "2": "Code/design review su progetti reali",
       "3": "Career path personalizzato + accountability"
     }
   }
   ```

6. **UPDATE workTogether.cta**
   ```json
   "cta": {
     "title": "Pronto a costruire qualcosa che conta?",
     "description": "Parliamo. Senza impegno. Senza vendita aggressiva. Solo una conversazione tra persone che vogliono risolvere problemi reali.",
     "button": "Iniziamo la conversazione"
   }
   ```

**ALSO UPDATE** `components/sections/WorkTogether.tsx`:

- Line 64: Change badge from `{t('badge')}` → already correct
- Line 68: Change subtitle structure to use `part1` and `part2`:
  ```tsx
  <p className="text-body text-[#2D2D2D] max-w-[600px] mx-auto">
    {t('subtitle.part1')}<br/>
    <strong className="text-[#FF006E]">{t('subtitle.part2')}</strong>
  </p>
  ```
- Line 130-140: Update CTA section to match new structure

---

## SEZIONE 6: ASK ME ANYTHING

### Source (homepage_content_complete.md lines 477-536)

```markdown
## 6. ASK ME ANYTHING

### Section Header
**Badge**: Ask me anything
**Title**: Hai domande? Chiedi pure
**Subtitle**:
Puoi chattare con il mio gemello digitale AI
o lasciare una domanda anonima.

Rispondo a tutte entro 48 ore.
Sì, davvero tutte. Anche quelle scomode.

---

### Option 1: AI Chatbot (Blue card)
**Icon**: MessageCircle
**Title**: Chatta con il mio gemello digitale

**Content**:
Alimentato da Claude AI, conosce tutto il mio background
e può rispondere alle tue domande su:

- Design, sviluppo, product management
- Come sono passato da un ruolo all'altro
- Errori che ho fatto (sono tanti) e cosa ho imparato
- Consigli per il tuo percorso

È come parlare con me, ma disponibile 24/7
e con pazienza infinita per le domande ripetitive.

**CTA**: "Inizia chat"

---

### Option 2: Anonymous Questions (Pink card)
**Icon**: Mail
**Title**: Chiedi in anonimo

**Content**:
Preferisci scrivere? Lascia la tua domanda qui.

Rispondo pubblicamente sul blog (così aiuta anche altri).

Niente nome richiesto. Niente giudizio.
Solo domande reali e risposte oneste.

Le domande più frequenti?
- "Come hai fatto il salto da developer a PM?"
- "Vale la pena imparare a programmare se vuoi fare product?"
- "Come gestisci stakeholder impossibili?"
- "Quanto dovrebbe sapere un PM di tech?"

**Form**: [Existing AnonymousQuestionForm component]
```

### Target: AskMeAnything.tsx (hardcoded translations)

**Actions Required:**

**UPDATE** `components/sections/AskMeAnything.tsx` translations object (lines 17-47):

```typescript
const translations = {
  it: {
    badge: 'Ask me anything',
    title: 'Hai domande? Chiedi pure',
    description: 'Puoi chattare con il mio gemello digitale AI o lasciare una domanda anonima. ',
    descriptionHighlight: 'Rispondo a tutte entro 48 ore. Sì, davvero tutte. Anche quelle scomode.',
    chatMode: {
      title: 'Chatta con il mio gemello digitale',
      description: 'Alimentato da Claude AI, conosce tutto il mio background e può rispondere alle tue domande su: Design, sviluppo, product management • Come sono passato da un ruolo all\'altro • Errori che ho fatto (sono tanti) e cosa ho imparato • Consigli per il tuo percorso. È come parlare con me, ma disponibile 24/7 e con pazienza infinita per le domande ripetitive.',
      buttonText: 'Inizia chat',
    },
    formMode: {
      title: 'Chiedi in anonimo',
      description: 'Preferisci scrivere? Lascia la tua domanda qui. Rispondo pubblicamente sul blog (così aiuta anche altri). Niente nome richiesto. Niente giudizio. Solo domande reali e risposte oneste.',
      frequentQuestions: 'Le domande più frequenti? • "Come hai fatto il salto da developer a PM?" • "Vale la pena imparare a programmare se vuoi fare product?" • "Come gestisci stakeholder impossibili?"'
    },
  },
  // ... en version
};
```

---

## SEZIONE 7: FOOTER

### Source (homepage_content_complete.md lines 540-573)

```markdown
## 7. FOOTER

### Bio Section
**Name Display**: Mattia Filippo De Luca (with color split)

**Bio Text**:
Product Manager che parla designer, scrive codice,
e costruisce prodotti che risolvono problemi reali.

Basato in Italia 🇮🇹 | Lavoro Remote 🌍

### Social Links (with visual indicators)
- **LinkedIn** (Blue border) - Professional updates
- **Twitter** (Pink border) - Thoughts in real-time
- **GitHub** (Purple border) - Code I ship
- **Email** (Yellow border) - Direct line

### Bottom Bar
© 2025 Mattia Filippo De Luca.
Made with ❤️ and coffee ☕

**Legal Links**: Privacy | Terms
```

### Target: messages/it.json - Footer Section + Footer.tsx

**Actions Required:**

1. **UPDATE messages/it.json footer**
   ```json
   "footer": {
     "bio": "Product Manager che parla designer, scrive codice, e costruisce prodotti che risolvono problemi reali.",
     "location": "Basato in Italia 🇮🇹 | Lavoro Remote 🌍",
     "tagline": "Product Manager che parla design, codice e business. Costruisco prodotti che risolvono davvero problemi.",
     "badge": "Disponibile per consulenze",
     "navigation": "Link rapidi",
     "connect": "Connettiti",
     "getInTouch": "Contattami",
     "madeWith": "Made with",
     "andCoffee": "and coffee ☕",
     "privacy": "Privacy",
     "terms": "Termini",
     "resources": {
       "title": "Risorse",
       "tools": "My tools stack",
       "design": "Design resources",
       "stack": "Tech stack",
       "newsletter": "Newsletter"
     }
   }
   ```

2. **UPDATE Footer.tsx** (line 84-88):
   ```tsx
   <h3 className="text-2xl md:text-3xl mb-4">
     <span className="text-[#0D7EFF]">Mattia Filippo</span>{' '}
     <span className="text-[#FF006E]">De Luca</span>
   </h3>
   <p className="text-white/80 text-sm md:text-base mb-2">
     {t('bio')}
   </p>
   <p className="text-white/60 text-xs md:text-sm mb-6">
     {t('location')}
   </p>
   ```

---

## RIEPILOGO AZIONI

### FILES TO UPDATE:

1. **`messages/it.json`**:
   - ✅ Hero (NO CHANGE - già corretto)
   - ⚠️ Journey (UPDATE subtitle, all 4 milestones, skills, certifications, endMessage)
   - ⚠️ WorkTogether (UPDATE badge, subtitle split, modes, cta)
   - ⚠️ Footer (UPDATE bio, location)

2. **`components/sections/WhatImUpTo.tsx`**:
   - ⚠️ UPDATE hardcoded translations (badge, description, currentWork detail, learning detail)

3. **`components/sections/WorkTogether.tsx`**:
   - ⚠️ UPDATE subtitle rendering to use part1/part2
   - ⚠️ UPDATE CTA section to match new structure

4. **`components/sections/AskMeAnything.tsx`**:
   - ⚠️ UPDATE hardcoded translations (description, chatMode, formMode)

5. **`components/layout/Footer.tsx`**:
   - ⚠️ UPDATE bio rendering to use new keys

6. **`components/sections/Blog.tsx`**:
   - ✅ NO CHANGE - content già appropriato

7. **`components/sections/Hero.tsx`**:
   - ✅ NO CHANGE - content già corretto

### VERIFICATION CHECKLIST:

- [ ] Hero section mostra headline autentica
- [ ] Journey milestones raccontano storia completa (Selfrules → Flowing/CliensPiù → ActiveProspect → QubicaAMF)
- [ ] Skills e certifications per ogni milestone corretti
- [ ] Journey endMessage: "12 anni di fallimenti trasformati in esperienza"
- [ ] WhatImUpTo mostra contenuto dettagliato da homepage_content_complete.md
- [ ] WorkTogether badge = "Let's work together"
- [ ] WorkTogether subtitle split in part1 e part2
- [ ] WorkTogether 3 modes con features corretti
- [ ] WorkTogether CTA: "Pronto a costruire qualcosa che conta?"
- [ ] AskMeAnything description esteso con "anche quelle scomode"
- [ ] Footer bio: "parla designer, scrive codice, costruisce prodotti"
- [ ] Footer location: "Basato in Italia 🇮🇹 | Lavoro Remote 🌍"

---

**FINE WORKFLOW**
