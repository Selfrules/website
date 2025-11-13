# [BL-004] Generazione Pool Argomenti con Agenti

## Metadata
- **Story ID**: BL-004 | **Epic**: [EPIC-006](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 💻 **Claude Code Locale** (agenti)
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** content creator **Voglio** un pool di argomenti rilevanti da scrivere **Così che** abbia sempre idee per nuovi articoli

## Criteri di Accettazione
- [ ] **AC1**: copywriter-hybrid genera pool di argomenti basati su esperienza Mattia
- [ ] **AC2**: hormozi-conversion-optimizer valida potenziale conversion degli argomenti
- [ ] **AC3**: Argomenti categorizzati in bucket: Prodotto, Strategia, Design, Development, Leadership
- [ ] **AC4**: Ogni argomento ha: titolo, angle, target audience, potenziale SEO
- [ ] **AC5**: Pool di almeno 30-50 argomenti

## Bucket di Argomenti
- **Prodotto**: Product strategy, roadmap, user research, metrics
- **Strategia**: Business strategy, go-to-market, positioning
- **Design**: UX/UI, design system, accessibility, design thinking
- **Development**: Frontend, architecture, performance, best practices
- **Leadership**: Team management, mentoring, decisioni difficili

## Implementazione

### 1. Context per Agenti
```typescript
// Fornire agli agenti:
const mattiaContext = {
  background: `
    PM/Designer/Developer con esperienza in:
    - Flowing: ridotto pagamenti da 7 a 3 click (+12% velocità)
    - [Altre esperienze dal CV/Journey section]
  `,
  expertise: ['Product Management', 'UX/UI Design', 'Frontend Development'],
  values: ['Pragmatismo', 'Accessibilità', 'Purpose-driven'],
  toneOfVoice: 'Romei pragmatism + Toon accessibility + Sinek purpose',
};
```

### 2. Prompt per copywriter-hybrid
```
Genera un pool di 50 argomenti per articoli blog basati sul background di Mattia.

Per ogni argomento, includi:
- Titolo working (può essere raffinato dopo)
- Angle/Hook (perché è interessante)
- Target audience (chi beneficia)
- Bucket (Prodotto/Strategia/Design/Dev/Leadership)
- Potenziale SEO (keyword opportunity)

Gli argomenti devono:
1. Derivare da esperienza reale di Mattia
2. Risolvere problemi concreti
3. Essere specifici, non generici
4. Seguire tone of voice: pragmatico, accessibile, purpose-driven

Esempi:
✅ "Da 7 click a 3: come semplificare checkout senza perdere conversione"
✅ "Perché la tua roadmap fallisce (e 3 principi per fixarla)"
❌ "Come fare product management" (troppo generico)
❌ "I migliori tool per designer" (listicle senza valore)
```

### 3. Validazione hormozi-conversion-optimizer
```
Per ogni argomento generato, valuta:
1. Lead generation potential (basso/medio/alto)
2. Authority building (quanto dimostra expertise)
3. CTA naturali (quali CTA si integrano bene)

Suggerisci modifiche per aumentare conversion senza sacrificare autenticità.
```

### 4. Output Format
```markdown
# Pool Argomenti Blog

## Prodotto (15 argomenti)

### ARG-001: Da 7 click a 3: anatomia di un checkout semplificato
- **Angle**: Case study reale Flowing con risultati misurabili
- **Target**: PM, Product Designer che lavorano su checkout/payment
- **SEO**: "semplificare checkout", "ottimizzare payment flow"
- **Conversion Potential**: Alto (può portare a consulenze su UX optimization)
- **CTA Naturale**: "Vuoi ottimizzare il tuo checkout? Parliamone"

### ARG-002: ...

## Strategia (10 argomenti)
...
```

## Esecuzione
```bash
# In Claude Code Locale
1. Preparare context con background Mattia
2. Lanciare copywriter-hybrid per generazione argomenti
3. Lanciare hormozi-conversion-optimizer per validazione
4. Consolidare output in file markdown
5. Review manuale e selezione top 20 per priorità
```

## Output File
- `/content/blog-topics-pool.md` - Pool completo
- `/content/blog-topics-priority.md` - Top 20 prioritizzati

## Test/Validation
- [ ] Almeno 50 argomenti generati
- [ ] Tutti i bucket coperti (Prodotto, Strategia, Design, Dev, Leadership)
- [ ] Nessun argomento generico/clickbait
- [ ] Tutti basati su esperienza reale
- [ ] Tone of voice coerente

## Definition of Done
- [ ] copywriter-hybrid eseguito
- [ ] hormozi-conversion-optimizer eseguito
- [ ] Pool di 50+ argomenti generato
- [ ] Argomenti categorizzati per bucket
- [ ] Ogni argomento ha metadata completo
- [ ] Top 20 prioritizzati
- [ ] File markdown creati
- [ ] Review manuale completata

## Note per Claude Code
Questo task richiede **Claude Code Locale** perché usa agenti. Assicurati di:
- Fornire context completo su Mattia
- Essere specifico nei prompt
- Validare che argomenti siano concreti, non generici
