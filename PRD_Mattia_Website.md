# PRD - Sito Web Personale Mattia

## 1. Brand Identity

### 1.1 Design - Neobrutalism

#### Principi visuali fondamentali
- **Filosofia**: Design audace e onesto che celebra l'imperfezione funzionale
- **Ispirazione diretta**: dodonut.com, rubens.design, react.gg, nicchan.me, aboutmonica.com, elian.codes, itsthatlady.dev
- **Approccio**: Illustration-First con elementi grafici custom come protagonisti visivi

#### Sistema colori
- **Colore primario**: #FFD93D (Giallo brillante)
- **Colore secondario**: #6C5CE7 (Viola elettrico)
- **Palette shade**:
  - Background principale: #FAFAFA
  - Background secondario: #1A1A1A (dark mode)
  - Accent CTA: #FF6B6B (rosso corallo)
  - Border brutalist: #000000 (4-6px solid)
  - Shadow offset: 8px 8px 0px #000000

#### Elementi caratteristici
- **Bordi spessi**: 4-6px solid black su tutti gli elementi interattivi
- **Ombre hard**: No blur, offset 8px con colore pieno
- **Forme geometriche**: Rettangoli arrotondati (border-radius: 8-12px), cerchi pieni, forme organiche irregolari
- **Grid system**: Layout strutturato con whitespace generoso (padding minimo 32px)
- **Typography**:
  - Heading: Space Grotesk (bold, black)
  - Body: Inter (regular, medium)
  - Accent: JetBrains Mono (code blocks)

### 1.2 Tone of Voice

#### DNA comunicativo
La fusione di Romei (pragmatismo radicale) + Toon (accessibilità umana) + Sinek (purpose-driven storytelling) crea una voce unica che:
- **Smonta le complessità inutili** con ironia costruttiva
- **Parte sempre dal "perché"** prima del "cosa"
- **Parla come un amico esperto** che ha già fatto i tuoi stessi errori

#### Regole di scrittura

##### Autenticità e vulnerabilità
- Inizia dai problemi reali, non dalle soluzioni perfette
- Racconta i fallimenti come momenti di apprendimento
- **Esempio**: "Ho sprecato 3 mesi su un contratto di 50 pagine che nessuno ha mai letto. Oggi uso un accordo di 2 pagine e funziona meglio."

##### Conversazionalità strategica
- Elimina il gergo tecnico quando non necessario
- Usa metafore quotidiane per concetti complessi
- **Esempio**: "Un'API è come un cameriere: prende il tuo ordine (request) e ti porta il piatto (response). Non ti interessa come cucinano in cucina."

##### Purpose-driven narrative
- Ogni contenuto inizia con il "perché questo conta per te"
- Collega sempre il tecnico all'impatto umano
- **Esempio**: "Perché ottimizzare i tempi di pagamento? Perché ogni secondo risparmiato è un cliente meno frustrato che tornerà."

##### Ironia costruttiva
- Smaschera le assurdità del settore tech
- Proponi sempre un'alternativa migliore
- **Esempio**: "Abbiamo inventato meeting per decidere quando fare altri meeting. Geniale come usare una scala per salire su un'altra scala."

##### Linguaggio visivo e sensoriale
- Crea scene mentali invece di astrazioni
- Usa i cinque sensi nelle descrizioni
- **Esempio**: "Immagina: sono le 23, il deploy è fallito, senti il ronzio del laptop surriscaldato mentre cerchi disperatamente quel bug nelle 2000 righe di codice non commentato."

##### Regole di formattazione
- **Sentence case sempre**: solo maiuscola iniziale (es. "Come migliorare", non "Come Migliorare")
- **Paragrafi brevi**: max 3-4 righe per mantenere il ritmo
- **"Noi" invece di "tu dovresti"**: creiamo inclusività

## 2. Sito Web

### 2.1 Principi

1. **User-friendly navigation**: Menu sticky minimale, max 5 voci principali
2. **Responsive design**: Mobile-first, breakpoint a 768px e 1440px
3. **Readability**: Line-height 1.6, font-size minimo 16px su mobile
4. **Visual appeal**: Illustrazioni custom, animazioni purposeful
5. **Fast load times**: Target <2s FCP, <100ms INP
6. **Clear calls to action**: Un solo CTA primario per sezione

### 2.2 Struttura

#### Hero Section
- **Headline provocatoria**: "Ho fallito come designer. Poi come developer. Ora sono un Product Manager che sa davvero cosa costruire."
- **Sottotitolo purpose-driven**: "Perché? Perché ho imparato che il prodotto perfetto non esiste. Esiste solo quello che risolve problemi reali."
- **CTA primario**: "Parliamone → Book a call" (calendario integrato)
- **Elemento visivo**: Illustrazione animata che mostra il percorso designer → dev → PM

#### My Journey Section
- **Timeline interattivo** con stepper verticale:
  - 2012-2018: Designer & Business Owner → "Ho imparato che il design senza strategia è decorazione"
  - 2016-2020: Full-stack Developer → "Ho capito che il codice perfetto che nessuno usa è codice inutile"
  - 2021-oggi: Product Manager → "Ora unifico design, tech e business per costruire cose che contano"
- **Certificazioni** con badge verificabili
- **Skills matrix** visualizzata come grafico radar interattivo

#### Latest Thinking (Blog)
- **Categorie**:
  - Design: "Come il neobrutalism mi ha insegnato l'onestà visiva"
  - Dev: "Perché ho smesso di ottimizzare e ho iniziato a shippare"
  - Product: "OKR che funzionano vs OKR che sembrano fighi"
  - Personale: "Quello che nessuno ti dice sul remote working"
  - Ask me anything: Risposte pubblicate dalle domande degli utenti
- **Card articoli** con tempo di lettura, categoria, snippet

#### Work Together Section
- **Tre modalità di collaborazione**:
  1. **Consulenze strategiche**: "Sblocchiamo il tuo prodotto in 90 minuti"
  2. **Brainstorming sessions**: "Due cervelli, un problema, infinite soluzioni"
  3. **Mentorship**: "Il percorso che avrei voluto qualcuno mi mostrasse"
- **Social proof**: Testimonianze brevi e verificabili

#### What I'm Up To Section
- **Lavoro attuale**: "Product Manager @ QubicaAMF - Sto rendendo i pagamenti 12% più veloci"
- **Learning in public**: "Questa settimana: come l'AI sta cambiando il mio workflow"
- **Spotify integration**: "Soundtrack del momento" (player embedded)

#### Ask Me Anything Section
- **Due modalità**:
  1. **Chatbot AI**: "Chatta con il mio gemello digitale" (Claude API)
  2. **Domanda diretta**: "Chiedi in anonimo, rispondo in 48h"
- **Profilazione intelligente** per follow-up targettizzati

### 2.3 Features

#### Funzionalità Core
1. **Bilinguismo ITA/ENG**: Toggle in header, contenuti localizzati
2. **Book a call**: Integrazione Google Calendar con slot disponibili
3. **AI Chatbot**: Claude API con context personalizzato sul mio background
4. **Spotify Player**: Now Playing widget con API Spotify
5. **Blog Engine**: Markdown-based con Claude per generazione bozze
6. **Analytics**: Event tracking custom per behavior analysis
7. **Dark Mode**: Toggle con persistenza in localStorage

#### Back Office (Admin Only)
1. **Article Creator**:
   - Input: topic + keywords
   - Claude genera bozza nel mio tone of voice
   - Editor per refinement
   - Scheduling pubblicazione

2. **Conversation Manager**:
   - Dashboard conversazioni chatbot
   - Categorizzazione automatica (lead/networking/curiosi)
   - Quick reply con suggerimenti AI

3. **Analytics Dashboard**:
   - Heatmap comportamenti utente
   - Funnel conversion analysis
   - Claude insights: "Top 3 improvements questa settimana"

### 2.4 Architettura Tecnica

#### Stack Frontend
- **Framework**: Next.js 14 con App Router
- **Styling**: Tailwind CSS + CSS Modules per componenti custom
- **Animazioni**: Framer Motion per micro-interazioni e transizioni
- **State Management**: Zustand per stato globale leggero
- **TypeScript**: Per type safety end-to-end

#### Stack Backend
- **Runtime**: Node.js con Express/Fastify
- **Database**: PostgreSQL con Prisma ORM
- **Cache**: Redis per sessioni e rate limiting
- **Queue**: BullMQ per job asincroni (email, notifications)

#### Integrazioni API
- **Claude API**: Anthropic SDK per chatbot e content generation
- **Google Calendar API**: OAuth2 flow per booking
- **Spotify Web API**: Token refresh automatico
- **Analytics**: Mixpanel per eventi, Sentry per error tracking

#### Infrastructure
- **Hosting**: Vercel per frontend, Railway/Fly.io per backend
- **CDN**: Cloudflare per asset statici
- **Storage**: Cloudinary per immagini ottimizzate
- **CI/CD**: GitHub Actions con preview deployments

#### Architettura Decisioni Chiave
- **Jamstack approach**: Pre-rendering per SEO, client-side per interattività
- **API Gateway pattern**: Singolo punto di ingresso per tutte le external API
- **Webhook architecture**: Per real-time updates da Spotify/Calendar
- **Progressive Enhancement**: Funziona senza JS, migliora con JS

#### Security & Performance
- **Rate limiting**: Per endpoint con sliding window
- **CORS policy**: Whitelist domini specifici
- **Image optimization**: WebP con fallback, lazy loading nativo
- **Code splitting**: Route-based con preload dei critical path

## 3. Copy Brand-Aligned

### 3.1 Profilo

**Headline**: Product Manager che ha fatto il percorso al contrario

**Bio principale**:
"Sono partito dal design. Ho imparato a programmare. Ora guido prodotti.

Questo percorso 'sbagliato' mi ha insegnato una cosa fondamentale: i migliori Product Manager non sono quelli che hanno studiato product management. Sono quelli che hanno sporcato le mani con i pixel, debuggato codice alle 3 di notte, e capito che alla fine conta solo una cosa: risolvere problemi reali per persone reali.

Oggi in QubicaAMF trasformo questa esperienza ibrida in risultati concreti: -12% nei tempi di pagamento, +9% di adoption, -25% di incidenti post-release. Non sono numeri casuali. Sono il risultato di saper parlare la lingua dei designer, capire i developer, e tradurre tutto in valore di business.

Il mio superpotere? Posso prototipare un'idea al mattino, scrivere le API specs a pranzo, e presentare il business case nel pomeriggio. Non perché sono un tuttofare, ma perché ho imparato che la velocità di esecuzione batte la perfezione teorica. Sempre."

### 3.2 Esperienze (Riscrittura)

#### Product Manager @ QubicaAMF
*Agosto 2023 - Presente*

"Gestisco integrazioni POS e sistemi di pagamento per il settore bowling. Sembra nicchia? Lo è. Ed è esattamente per questo che ogni ottimizzazione conta il doppio.

Ho ridotto i tempi medi di pagamento del 12% in 6 mesi. Come? Non con magia, ma ascoltando i cassieri frustrati alle 22 di sabato sera. Ho scoperto che il problema non era la velocità del sistema, ma il numero di click necessari. Da 7 a 3. Problema risolto.

L'adoption delle integrazioni è cresciuta del 9%. Il segreto? Ho smesso di mandare PDF di 40 pagine e ho iniziato a fare video di 3 minuti. A volte la soluzione migliore non è tecnica.

Quando i payment failure sono scesi del 10%, non è stato per un algoritmo complesso. È bastato un sistema di retry intelligente che capisce la differenza tra 'carta scaduta' e 'connessione lenta'. 

La cosa di cui sono più orgoglioso? Aver ridotto gli incidenti post-release del 25% semplicemente mettendo Product, Support e Engineering nella stessa stanza (virtuale) ogni venerdì."

#### Product Owner @ ActiveProspect
*Gennaio 2021 - Maggio 2023*

"Lead generation B2B per Fortune 500. Traduzione: aiutavo grandi aziende a trovare clienti migliori, più velocemente.

Ho imparato che quando un cliente enterprise dice 'urgente', significa 'per ieri'. E quando dice 'semplice modifica', significa riprogettare metà piattaforma.

Il mio ruolo? Traduttore. Prendevo requisiti complessi da clienti che parlavano in ROI e li trasformavo in user story che gli engineer potevano effettivamente costruire. Nel mezzo, conducevo ricerche utente con CMO di multinazionali che mi insegnavano più sul business in 30 minuti di quanto avessi imparato in anni.

Il risultato più importante? Aver ottimizzato i workflow di validazione lead riducendo i falsi positivi del 30%. In dollari? Milioni risparmiati. In soddisfazione? Impagabile."

#### Design & Development @ FLOWING  
*Gennaio 2016 - Dicembre 2020*

"Cinque anni a costruire piattaforme web API-first. Ho scritto codice che ancora gira in produzione. Ho disegnato interfacce che gli utenti ancora usano. Ma soprattutto, ho imparato che la differenza tra un buon prodotto e un grande prodotto sta nei dettagli che nessuno nota... finché non mancano.

Ho capito che documentare bene oggi significa dormire tranquilli domani. Che un'architettura scalabile non è over-engineering, è prevenzione. E che il miglior codice è quello che non devi scrivere."

#### Business Owner & Web Designer @ Selfrules
*Marzo 2012 - Dicembre 2018*

"Ho fondato un'agenzia. Ho fallito. Ho imparato. Ho ricominciato. Ho avuto successo. Ho venduto.

In 6 anni ho capito che essere imprenditore significa dire molti più 'no' che 'sì'. Che il cliente non ha sempre ragione, ma ha sempre le sue ragioni. E che la differenza tra sopravvivere e prosperare sta nel saper dire: 'Questo non fa per noi'.

20+ progetti consegnati, ma il vero learning? Capire il P&L, gestire il cash flow, e soprattutto imparare che ogni decisione di prodotto è una decisione di business."

### 3.3 Certificazioni (Presentazione)

**Il mio stack di certificazioni** *(verificabili su blockchain)*:

- **AI for Product** → "Perché il futuro è augmented, non replaced"
- **Product Leader** → "Leadership non è dare ordini, è allineare visioni"  
- **Product Marketing** → "Il miglior prodotto che nessuno conosce è un fallimento"
- **Google Project Management** → "Perché anche il caos ha bisogno di un metodo"
- **Certified ScrumMaster** → "Agile fatto bene > Agile fatto"
- **Certified Product Owner** → "Il PO che sa solo dire no, non è un PO"

## 4. Prompt per Inizializzazione

### 4.1 Setup Iniziale con Claude Code

```
Crea un progetto Next.js 14 per un sito web personale/portfolio con le seguenti caratteristiche:

BRAND:
- Design system neobrutalist con bordi neri spessi (4-6px), ombre hard (8px offset), colori primari #FFD93D e #6C5CE7
- Typography: Space Grotesk per heading, Inter per body
- Sentence case per tutti i titoli

STRUTTURA:
- Homepage one-pager con sezioni: Hero, My Journey, Latest Thinking (blog), Work Together, What I'm Up To, Ask Me Anything
- Sistema di routing per blog posts individuali
- Dark mode toggle con persistenza

FEATURES PRINCIPALI:
- Multilingua ITA/ENG con i18n
- Integrazione Google Calendar per booking calls
- Blog engine con Markdown/MDX
- Sistema di analytics custom

TECH STACK:
- Next.js 14 con App Router e TypeScript
- Tailwind CSS per styling
- Framer Motion per animazioni
- Zustand per state management
- PostgreSQL + Prisma per database

STRUTTURA FOLDER:
/app
  /[locale]
    page.tsx (homepage)
    /blog
      page.tsx (blog listing)
      /[slug]
        page.tsx (blog post)
    /api
      /calendar
      /chat
      /analytics
/components
  /ui (design system components)
  /sections (homepage sections)
/lib
  /api (integrations)
  /utils
/content
  /blog (MDX files)
/public
  /fonts
  /images

Inizializza con:
- Config base di Tailwind con design tokens neobrutalist
- Component library base (Button, Card, Section)
- Sistema di traduzione base
- Font loading ottimizzato
- SEO metadata setup

Il tone of voice del contenuto deve essere:
- Diretto e senza fronzoli (Romei style)
- Conversazionale ma strategico (Toon style)  
- Purpose-driven, partendo sempre dal "perché" (Sinek style)
- Uso di ironia costruttiva per evidenziare problemi e proporre soluzioni
```

### 4.2 Prompt per Content Generation

```
Genera contenuti per il mio sito web seguendo questo tone of voice:

ISPIRAZIONE:
- Jacopo Romei: pragmatismo radicale, via negativa
- Kate Toon: conversazionale, accessibile, umoristico
- Simon Sinek: purpose-driven, inizia sempre con il perché

REGOLE DI SCRITTURA:
1. Parti sempre dal problema, non dalla soluzione
2. Usa metafore quotidiane per concetti complessi
3. Ironia costruttiva: smaschera assurdità proponendo alternative
4. Crea scene mentali concrete invece di astrazioni
5. Sentence case sempre (solo maiuscola iniziale)
6. Paragrafi max 3-4 righe
7. Usa "noi" invece di "tu dovresti"

ESEMPI DI FRASI NEL MIO STILE:
- "Ho sprecato 3 mesi su un contratto di 50 pagine che nessuno ha mai letto"
- "Un'API è come un cameriere: prende il tuo ordine e ti porta il piatto"
- "Abbiamo inventato meeting per decidere quando fare altri meeting"

Genera: [specificare tipo di contenuto]
```

### 4.3 Prompt per Claude Chatbot

```
Sei il gemello digitale di Mattia, un Product Manager con background unico:
- 6 anni design → "Il design senza strategia è decorazione"
- 5 anni development → "Il codice perfetto che nessuno usa è inutile"
- 4+ anni product → "Unifico design, tech e business"

PERSONALITÀ:
- Pragmatico come Romei: vai dritto al punto
- Accessibile come Toon: zero gergo inutile  
- Purpose-driven come Sinek: parti sempre dal perché

RISPONDI:
- Con esempi concreti dal mio background
- Usando ironia costruttiva per problemi comuni
- Proponendo sempre soluzioni pratiche
- Max 3-4 frasi per concetto

TONO:
- Come un collega esperto che ha già fatto i tuoi errori
- Mai supponente, sempre disponibile
- Focus su valore pratico immediato

NON:
- Usare buzzword vuote
- Dare consigli generici
- Essere troppo formale
- Rispondere con liste puntate (usa prosa)
```

---

## Note di Implementazione

Questo PRD è un documento living che evolverà con il progetto. Ogni sezione è pensata per essere:
- **Azionabile**: Chiaro abbastanza da iniziare subito l'implementazione
- **Flessibile**: Adattabile based on feedback e learning
- **Misurabile**: Con metriche implicite di successo

Il prossimo step è validare l'architettura tecnica con un POC delle features core prima di procedere con lo sviluppo completo.