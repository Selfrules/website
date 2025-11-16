# [CC-010] Verifica Qualità Traduzioni IT/EN

## Metadata
- **Story ID**: CC-010 | **Epic**: [EPIC-003](./../epic.md)
- **Priorità**: 🔴 Altissima | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 💻 **Claude Code Locale** (richiede copywriter-hybrid)
- **Stato**: 📋 Todo | **Data**: 2025-11-16

## User Story
**Come** visitatore internazionale **Voglio** traduzioni naturali e non letterali **Così che** possa leggere contenuti che suonano madrelingua

## Contesto
Il sito è bilingue IT/EN. Le traduzioni devono essere:
- **Non letterali**: Adattate al contesto culturale
- **Naturali**: Come le scriverebbe un madrelingua
- **Coerenti**: Stesso tone of voice in entrambe le lingue
- **Idiomatiche**: Usare espressioni locali quando appropriato

Livello target:
- **Italiano**: Madrelingua
- **Inglese**: B2 (conversazionale ma professionale)

## Criteri di Accettazione
- [ ] **AC1**: Identificare traduzioni letterali o innaturali
- [ ] **AC2**: Suggerire riformulazioni idiomatiche
- [ ] **AC3**: Mantenere tone of voice equivalente (non identico)
- [ ] **AC4**: Verificare che metafore funzionino in entrambe le lingue
- [ ] **AC5**: Controllare lunghezza testi (IT tende a essere più lungo)

## Pattern Problematici da Cercare

### 1. Traduzioni Letterali
❌ **Sbagliato**:
```
IT: "Ho fallito come designer"
EN: "I failed as a designer" (corretto ma troppo letterale)
```

✅ **Migliore**:
```
IT: "Ho fallito come designer"
EN: "My design career didn't go as planned" (più idiomatico)
```

### 2. Espressioni Idiomatiche
❌ **Sbagliato**:
```
IT: "Sulla mia pelle"
EN: "On my skin" (non ha senso in inglese)
```

✅ **Migliore**:
```
IT: "Sulla mia pelle"
EN: "The hard way" (equivalente idiomatico)
```

### 3. Tone of Voice
❌ **Sbagliato**:
```
IT: "Non vendo ore. Non vendo consulenze."
EN: "I don't sell hours. I don't sell consultancy." (troppo formale)
```

✅ **Migliore**:
```
IT: "Non vendo ore. Non vendo consulenze."
EN: "I don't sell hours. I don't sell consulting." (più conversazionale)
```

### 4. Metafore Culturali
❌ **Sbagliato**:
```
IT: "Come tagliare i tempi di pagamento da 7 click a 3"
EN: "How to cut payment times from 7 clicks to 3" (ok)
```

✅ **Migliore**:
```
IT: "Come tagliare i tempi di pagamento da 7 click a 3"
EN: "Cutting payment times from 7 clicks to 3" (più diretto, stile US)
```

## Implementazione

### Step 1: Confronto Side-by-Side
```bash
# Estrarre tutte le coppie IT/EN:
- Hero section
- Journey section (tutte le 4 experiences)
- WhatImUpTo section
- WorkTogether section (3 modalità + 4 testimonial)
- Blog section
- Footer
```

### Step 2: Audit con copywriter-hybrid
```bash
@copywriter-hybrid

Analizza la qualità delle traduzioni IT/EN.

Per ogni coppia di testi, verifica:

1. **Naturalezza**: Suona come madrelingua o come traduzione?
2. **Equivalenza Tono**: Stesso livello di formalità/informalità?
3. **Idiomi**: Espressioni locali appropriate?
4. **Metafore**: Funzionano in entrambe le culture?
5. **Lunghezza**: Differenze che rompono il layout?

Livelli target:
- IT: Madrelingua italiano
- EN: B2 conversazionale (non perfetto, ma naturale)

Output per ogni coppia:
📍 TESTO ANALIZZATO
✅ OK / ⚠️ MIGLIORABILE
💡 SUGGERIMENTO (se applicabile)

Focus su:
- Hero headlines
- CTAs principali
- Experience descriptions
- Testimonials
```

### Step 3: Prioritizzazione
Identificare:
1. **Critical**: Hero, CTAs principali (fix immediato)
2. **High**: Experience cards, WorkTogether (fix entro 1 settimana)
3. **Medium**: Footer, labels secondari (fix quando possibile)

### Step 4: Applicazione
- Aggiornare `/messages/it.json`
- Aggiornare `/messages/en.json`
- Testare su entrambe le lingue
- Verificare layout (alcune frasi più lunghe potrebbero rompere UI)

## Files
- `/messages/it.json`
- `/messages/en.json`
- Tutti i componenti che usano `useTranslations()`

## Definition of Done
- [ ] Tutte le coppie IT/EN analizzate
- [ ] Traduzioni letterali identificate
- [ ] Suggerimenti di riformulazione generati
- [ ] Critical e High priority implementati
- [ ] Test su entrambe le lingue
- [ ] Verifica layout non rotto
- [ ] Tone of voice equivalente (non identico) in IT e EN
- [ ] Nessun "Englishism" in italiano
- [ ] Nessun "Italianism" in inglese

## Note
Questo è uno dei lavori più delicati. Una brutta traduzione distrugge l'autenticità del tone of voice. Meglio una traduzione che tradisce leggermente il contenuto ma mantiene il tone, che una traduzione letterale che suona robotica.

**Regola d'oro**: Se un madrelingua legge e pensa "questa è chiaramente una traduzione", abbiamo fallito.
